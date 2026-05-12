/**
 * Per-repo data fetcher.
 *
 * Pulls everything the classifier needs:
 *   - up to 300 most recent commits (3 pages × 100)
 *   - all PRs (state=all, paginated)
 *   - issues (open + closed, capped at 100 each)
 *   - root tree (1-level deep)
 *   - package.json
 *   - README.md
 *   - languages + metadata
 *
 * All failures degrade gracefully into the returned `errors` array; we never
 * throw out of the per-repo pipeline because one bad repo shouldn't kill the
 * whole portfolio scan.
 */

import type { Octokit } from "@octokit/rest";
import {
  classifyAuthor,
  emptyBuckets,
  hasClaudeCoAuthor,
  tallyBucket,
} from "./author-classifier.js";
import { partitionDeps } from "../classifier/template-deps.js";
import type {
  CommitSummary,
  DocsSignals,
  IssueSummary,
  PackageSignals,
  PullRequestSummary,
  ReadmeSignals,
  RepoMetadata,
  SrcQualitySignals,
} from "../types.js";
import type { RateLimiter } from "./rate-limiter.js";
import type { Logger } from "../util/logger.js";

const MAX_COMMIT_PAGES = 3; // 3 × 100 = 300 commits cap
const PAGE_SIZE = 100;
const README_SUBSTANTIAL_LENGTH = 500;
const SRC_SAMPLE_LIMIT = 5;

/** Strings that signal an unmodified Lovable template README/scaffold. */
const PLACEHOLDER_TOKENS: readonly string[] = [
  "REPLACE_WITH_PROJECT_ID",
  "Lovable App",
  "vite_react_shadcn_ts",
  "lovable.dev/projects/", // generic Lovable scaffold URL
];

export interface FetchedRepo {
  metadata: RepoMetadata;
  commits: {
    fetched: number;
    summaries: CommitSummary[];
    buckets: ReturnType<typeof emptyBuckets>;
    lastCommitDate: string | null;
    daysSinceLastCommit: number;
  };
  prs: {
    count: number;
    merged: number;
    closedUnmerged: number;
    open: number;
    summaries: PullRequestSummary[];
  };
  issues: {
    openCount: number;
    closedCount: number;
  };
  docs: DocsSignals;
  readme: ReadmeSignals;
  pkg: PackageSignals;
  srcQuality: SrcQualitySignals;
  errors: string[];
}

export interface FetchRepoArgs {
  octokit: Octokit;
  owner: string;
  repoName: string;
  limiter: RateLimiter;
  logger: Logger;
  /** Minimal repo metadata from the user/repo list endpoint. */
  repoListEntry: {
    name: string;
    full_name: string;
    description: string | null;
    html_url: string;
    private: boolean;
    fork: boolean;
    archived: boolean;
    default_branch: string;
    created_at: string | null;
    updated_at: string | null;
    pushed_at: string | null;
  };
}

export async function fetchRepo(args: FetchRepoArgs): Promise<FetchedRepo> {
  const { octokit, owner, repoName, limiter, logger, repoListEntry } = args;
  const errors: string[] = [];

  const now = Date.now();
  const pushedAt = repoListEntry.pushed_at ?? repoListEntry.updated_at ?? new Date().toISOString();
  const daysSinceLastPush = Math.max(
    0,
    Math.floor((now - new Date(pushedAt).getTime()) / 86_400_000),
  );

  // Languages — small, single request.
  let languages: Record<string, number> = {};
  try {
    languages = await limiter.run(
      `${repoName}:languages`,
      async () =>
        (await octokit.repos.listLanguages({ owner, repo: repoName })).data,
    );
  } catch (e) {
    errors.push(`languages: ${describe(e)}`);
  }

  const metadata: RepoMetadata = {
    name: repoListEntry.name,
    fullName: repoListEntry.full_name,
    description: repoListEntry.description,
    htmlUrl: repoListEntry.html_url,
    isPrivate: repoListEntry.private,
    isFork: repoListEntry.fork,
    isArchived: repoListEntry.archived,
    defaultBranch: repoListEntry.default_branch,
    createdAt: repoListEntry.created_at ?? "",
    updatedAt: repoListEntry.updated_at ?? "",
    pushedAt,
    languages,
    daysSinceLastPush,
  };

  // Commits ----------------------------------------------------------------
  const commits = await fetchCommits(
    octokit,
    owner,
    repoName,
    limiter,
    errors,
  );
  const lastCommitDate = commits.summaries[0]?.date ?? null;
  const daysSinceLastCommit = lastCommitDate
    ? Math.max(
        0,
        Math.floor((now - new Date(lastCommitDate).getTime()) / 86_400_000),
      )
    : daysSinceLastPush;

  logger.debug(
    `${repoName}: fetched ${commits.summaries.length} commits ` +
      `(human=${commits.buckets.human}, claude=${commits.buckets.claude}, ` +
      `lovable=${commits.buckets.lovable})`,
  );

  // PRs --------------------------------------------------------------------
  const prs = await fetchPrs(octokit, owner, repoName, limiter, errors);
  logger.debug(
    `${repoName}: fetched ${prs.count} PRs (merged=${prs.merged}, open=${prs.open})`,
  );

  // Issues -----------------------------------------------------------------
  const issues = await fetchIssues(octokit, owner, repoName, limiter, errors);
  logger.debug(
    `${repoName}: ${issues.openCount} open issues, ${issues.closedCount} closed`,
  );

  // Tree + docs ------------------------------------------------------------
  const docs = await fetchDocsSignals(
    octokit,
    owner,
    repoName,
    repoListEntry.default_branch,
    limiter,
    errors,
  );

  // package.json -----------------------------------------------------------
  const pkg = await fetchPackageJson(octokit, owner, repoName, limiter, errors);

  // README -----------------------------------------------------------------
  const readme = await fetchReadme(octokit, owner, repoName, limiter, errors);

  // src/ ts quality sample -------------------------------------------------
  const srcQuality = await fetchSrcQuality(
    octokit,
    owner,
    repoName,
    repoListEntry.default_branch,
    limiter,
    errors,
  );

  return {
    metadata,
    commits: {
      fetched: commits.summaries.length,
      summaries: commits.summaries,
      buckets: commits.buckets,
      lastCommitDate,
      daysSinceLastCommit,
    },
    prs,
    issues,
    docs,
    readme,
    pkg,
    srcQuality,
    errors,
  };
}

// ---------------------------------------------------------------------------
// commits
// ---------------------------------------------------------------------------

async function fetchCommits(
  octokit: Octokit,
  owner: string,
  repo: string,
  limiter: RateLimiter,
  errors: string[],
): Promise<{
  summaries: CommitSummary[];
  buckets: ReturnType<typeof emptyBuckets>;
}> {
  const summaries: CommitSummary[] = [];
  const buckets = emptyBuckets();

  for (let page = 1; page <= MAX_COMMIT_PAGES; page += 1) {
    try {
      const resp = await limiter.run(
        `${repo}:commits:p${page}`,
        async () =>
          await octokit.repos.listCommits({
            owner,
            repo,
            per_page: PAGE_SIZE,
            page,
          }),
      );
      const data = resp.data;
      for (const c of data) {
        const author = c.commit.author ?? { name: "", email: "", date: "" };
        const message = c.commit.message ?? "";
        const newlineIdx = message.indexOf("\n");
        const subject = newlineIdx >= 0 ? message.slice(0, newlineIdx) : message;
        const body = newlineIdx >= 0 ? message.slice(newlineIdx + 1) : "";

        const cls = classifyAuthor({
          name: author.name ?? "",
          email: author.email ?? "",
          body,
        });
        const coAuthored = hasClaudeCoAuthor(body);

        summaries.push({
          sha: c.sha,
          authorName: author.name ?? "",
          authorEmail: author.email ?? "",
          date: author.date ?? "",
          subject,
          body,
          authorClass: cls,
          isClaudeCoAuthored: coAuthored,
        });
        tallyBucket(buckets, cls, coAuthored);
      }
      if (data.length < PAGE_SIZE) break; // last page
    } catch (e) {
      // 409 = empty repo (no commits yet). Don't treat as an error.
      if (isStatus(e, 409)) {
        break;
      }
      errors.push(`commits page ${page}: ${describe(e)}`);
      break;
    }
  }

  return { summaries, buckets };
}

// ---------------------------------------------------------------------------
// PRs
// ---------------------------------------------------------------------------

async function fetchPrs(
  octokit: Octokit,
  owner: string,
  repo: string,
  limiter: RateLimiter,
  errors: string[],
): Promise<{
  count: number;
  merged: number;
  closedUnmerged: number;
  open: number;
  summaries: PullRequestSummary[];
}> {
  const summaries: PullRequestSummary[] = [];
  let merged = 0;
  let closedUnmerged = 0;
  let open = 0;

  let page = 1;
  // Hard cap to avoid huge orgs blowing up the scan. 5 × 100 = 500 PRs.
  const MAX_PR_PAGES = 5;

  while (page <= MAX_PR_PAGES) {
    try {
      const resp = await limiter.run(
        `${repo}:prs:p${page}`,
        async () =>
          await octokit.pulls.list({
            owner,
            repo,
            state: "all",
            per_page: PAGE_SIZE,
            page,
          }),
      );
      const data = resp.data;
      for (const pr of data) {
        const isMerged = pr.merged_at !== null && pr.merged_at !== undefined;
        const state = pr.state === "open" ? "open" : "closed";
        if (state === "open") open += 1;
        else if (isMerged) merged += 1;
        else closedUnmerged += 1;

        summaries.push({
          number: pr.number,
          state,
          merged: isMerged,
          title: pr.title ?? "",
          createdAt: pr.created_at ?? "",
          mergedAt: pr.merged_at ?? null,
          closedAt: pr.closed_at ?? null,
        });
      }
      if (data.length < PAGE_SIZE) break;
      page += 1;
    } catch (e) {
      errors.push(`prs page ${page}: ${describe(e)}`);
      break;
    }
  }

  return {
    count: summaries.length,
    merged,
    closedUnmerged,
    open,
    summaries,
  };
}

// ---------------------------------------------------------------------------
// issues — capped at 100 each direction per spec
// ---------------------------------------------------------------------------

async function fetchIssues(
  octokit: Octokit,
  owner: string,
  repo: string,
  limiter: RateLimiter,
  errors: string[],
): Promise<{ openCount: number; closedCount: number }> {
  let openCount = 0;
  let closedCount = 0;

  async function fetchSide(state: "open" | "closed"): Promise<number> {
    try {
      const resp = await limiter.run(
        `${repo}:issues:${state}`,
        async () =>
          await octokit.issues.listForRepo({
            owner,
            repo,
            state,
            per_page: PAGE_SIZE,
            page: 1,
          }),
      );
      // listForRepo includes PRs. Filter out anything with a pull_request field.
      const realIssues = resp.data.filter(
        (i) => !("pull_request" in i) || i.pull_request === undefined,
      ) as IssueSummary[] | unknown[];
      return realIssues.length;
    } catch (e) {
      errors.push(`issues ${state}: ${describe(e)}`);
      return 0;
    }
  }

  openCount = await fetchSide("open");
  closedCount = await fetchSide("closed");
  return { openCount, closedCount };
}

// ---------------------------------------------------------------------------
// root tree + docs detection
// ---------------------------------------------------------------------------

async function fetchDocsSignals(
  octokit: Octokit,
  owner: string,
  repo: string,
  defaultBranch: string,
  limiter: RateLimiter,
  errors: string[],
): Promise<DocsSignals> {
  const signals: DocsSignals = {
    hasDocsFolder: false,
    docsFileCount: 0,
    hasClaudeMd: false,
    hasLogMd: false,
    hasMemoryMd: false,
    hasIntentMd: false,
  };

  // Root listing
  let rootEntries: { name: string; type: string }[] = [];
  try {
    const resp = await limiter.run(
      `${repo}:tree-root`,
      async () =>
        await octokit.repos.getContent({
          owner,
          repo,
          path: "",
          ref: defaultBranch,
        }),
    );
    if (Array.isArray(resp.data)) {
      rootEntries = resp.data.map((e) => ({ name: e.name, type: e.type }));
    }
  } catch (e) {
    if (!isStatus(e, 404)) {
      errors.push(`tree root: ${describe(e)}`);
    }
    return signals;
  }

  for (const entry of rootEntries) {
    const lower = entry.name.toLowerCase();
    if (entry.type === "dir" && lower === "docs") signals.hasDocsFolder = true;
    if (entry.type === "file") {
      if (lower === "claude.md") signals.hasClaudeMd = true;
      if (lower === "log.md") signals.hasLogMd = true;
      if (lower === "memory.md") signals.hasMemoryMd = true;
      if (lower === "intent.md") signals.hasIntentMd = true;
    }
  }

  if (signals.hasDocsFolder) {
    try {
      const resp = await limiter.run(
        `${repo}:tree-docs`,
        async () =>
          await octokit.repos.getContent({
            owner,
            repo,
            path: "docs",
            ref: defaultBranch,
          }),
      );
      if (Array.isArray(resp.data)) {
        signals.docsFileCount = resp.data.filter(
          (e) => e.type === "file" && e.name.toLowerCase().endsWith(".md"),
        ).length;
      }
    } catch (e) {
      // Not fatal — we already know docs/ exists.
      if (!isStatus(e, 404)) {
        errors.push(`tree docs: ${describe(e)}`);
      }
    }
  }

  return signals;
}

// ---------------------------------------------------------------------------
// package.json
// ---------------------------------------------------------------------------

async function fetchPackageJson(
  octokit: Octokit,
  owner: string,
  repo: string,
  limiter: RateLimiter,
  errors: string[],
): Promise<PackageSignals> {
  const empty: PackageSignals = {
    exists: false,
    name: null,
    dependencies: [],
    domainSpecificDeps: [],
    hasDomainDeps: false,
    raw: null,
  };

  try {
    const resp = await limiter.run(
      `${repo}:pkg`,
      async () =>
        await octokit.repos.getContent({
          owner,
          repo,
          path: "package.json",
        }),
    );
    if (Array.isArray(resp.data) || resp.data.type !== "file") {
      return empty;
    }
    const content = decodeBase64(resp.data.content ?? "");
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(content) as Record<string, unknown>;
    } catch (e) {
      errors.push(`package.json parse: ${describe(e)}`);
      return empty;
    }
    const deps = parsed.dependencies as Record<string, string> | undefined;
    const depNames = deps ? Object.keys(deps) : [];
    const { domainSpecific } = partitionDeps(depNames);
    return {
      exists: true,
      name: typeof parsed.name === "string" ? parsed.name : null,
      dependencies: depNames,
      domainSpecificDeps: domainSpecific,
      hasDomainDeps: domainSpecific.length > 0,
      raw: parsed,
    };
  } catch (e) {
    if (!isStatus(e, 404)) {
      errors.push(`package.json: ${describe(e)}`);
    }
    return empty;
  }
}

// ---------------------------------------------------------------------------
// README
// ---------------------------------------------------------------------------

async function fetchReadme(
  octokit: Octokit,
  owner: string,
  repo: string,
  limiter: RateLimiter,
  errors: string[],
): Promise<ReadmeSignals> {
  const empty: ReadmeSignals = {
    raw: null,
    length: 0,
    isSubstantial: false,
    hasTemplatePlaceholder: false,
    detectedPlaceholders: [],
  };

  try {
    const resp = await limiter.run(
      `${repo}:readme`,
      async () => await octokit.repos.getReadme({ owner, repo }),
    );
    const content = decodeBase64(resp.data.content ?? "");
    const detected = PLACEHOLDER_TOKENS.filter((p) => content.includes(p));
    const length = content.length;
    return {
      raw: content,
      length,
      isSubstantial:
        length > README_SUBSTANTIAL_LENGTH && detected.length === 0,
      hasTemplatePlaceholder: detected.length > 0,
      detectedPlaceholders: detected,
    };
  } catch (e) {
    if (!isStatus(e, 404)) {
      errors.push(`readme: ${describe(e)}`);
    }
    return empty;
  }
}

// ---------------------------------------------------------------------------
// src/ ts quality sample
// ---------------------------------------------------------------------------

async function fetchSrcQuality(
  octokit: Octokit,
  owner: string,
  repo: string,
  defaultBranch: string,
  limiter: RateLimiter,
  errors: string[],
): Promise<SrcQualitySignals> {
  const result: SrcQualitySignals = {
    sampled: false,
    tsNoCheckCount: 0,
    sampleFileCount: 0,
  };

  try {
    const resp = await limiter.run(
      `${repo}:tree-src`,
      async () =>
        await octokit.repos.getContent({
          owner,
          repo,
          path: "src",
          ref: defaultBranch,
        }),
    );
    if (!Array.isArray(resp.data)) return result;

    const tsFiles = resp.data
      .filter((e) => e.type === "file" && /\.(ts|tsx)$/i.test(e.name))
      .slice(0, SRC_SAMPLE_LIMIT);

    if (tsFiles.length === 0) return result;
    result.sampled = true;

    for (const f of tsFiles) {
      try {
        const c = await limiter.run(
          `${repo}:src:${f.name}`,
          async () =>
            await octokit.repos.getContent({
              owner,
              repo,
              path: `src/${f.name}`,
              ref: defaultBranch,
            }),
        );
        if (!Array.isArray(c.data) && c.data.type === "file") {
          const body = decodeBase64(c.data.content ?? "");
          if (body.includes("@ts-nocheck")) result.tsNoCheckCount += 1;
          result.sampleFileCount += 1;
        }
      } catch {
        // Individual file failures are silent; we still count what we got.
      }
    }
  } catch (e) {
    if (!isStatus(e, 404)) {
      errors.push(`src/ sample: ${describe(e)}`);
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function decodeBase64(b64: string): string {
  // GitHub returns content base64-encoded with newlines.
  const cleaned = b64.replace(/\n/g, "");
  return Buffer.from(cleaned, "base64").toString("utf-8");
}

function isStatus(err: unknown, status: number): boolean {
  if (!err || typeof err !== "object") return false;
  return (err as { status?: number }).status === status;
}

function describe(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return JSON.stringify(err);
}
