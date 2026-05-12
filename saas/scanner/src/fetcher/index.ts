/**
 * Fetcher orchestrator — list all repos for the configured user, then fan out
 * per-repo fetches under the rate limiter.
 *
 * Returns FetchedRepo[] in the order the user/repo list endpoint returned them
 * (which is roughly recently-updated-first by default). The classifier layer
 * then enriches each one.
 */

import { Octokit } from "@octokit/rest";
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";
import { createRateLimiter } from "./rate-limiter.js";
import { fetchRepo, type FetchedRepo } from "./repo-fetcher.js";
import type { AppConfig, CliOptions } from "../types.js";
import type { Logger } from "../util/logger.js";

const ScannerOctokit = Octokit.plugin(retry, throttling);

export interface FetchPortfolioArgs {
  config: AppConfig;
  options: CliOptions;
  logger: Logger;
}

export interface FetchPortfolioResult {
  repos: FetchedRepo[];
  skippedArchived: number;
  skippedForks: number;
  totalDiscovered: number;
}

export async function fetchPortfolio(
  args: FetchPortfolioArgs,
): Promise<FetchPortfolioResult> {
  const { config, options, logger } = args;

  const octokit = new ScannerOctokit({
    auth: config.githubToken,
    userAgent: "portfoliopilot-scanner/0.1.0",
    throttle: {
      // Primary rate limit: GitHub allows ~5000 req/hr authenticated. The
      // throttling plugin auto-defers when we hit it. We retry once per limit
      // event before giving up.
      onRateLimit: (retryAfter: number, opts: { method: string; url: string }, _octo: unknown, retryCount: number): boolean => {
        logger.warn(
          `Hit primary rate limit on ${opts.method} ${opts.url}; ` +
            `waiting ${retryAfter}s (retry #${retryCount + 1})`,
        );
        return retryCount < 1;
      },
      onSecondaryRateLimit: (retryAfter: number, opts: { method: string; url: string }): boolean => {
        logger.warn(
          `Hit secondary rate limit on ${opts.method} ${opts.url}; ` +
            `waiting ${retryAfter}s`,
        );
        return true;
      },
    },
  });

  const limiter = createRateLimiter({
    concurrency: 3,
    maxRetries: 4,
    baseDelayMs: 800,
    logger,
  });

  logger.step(`Discovering repos for @${config.githubUsername}…`);

  // Use the authenticated-user endpoint so private repos in scope appear.
  // We compare each entry's owner.login against the configured username so we
  // don't accidentally scan org repos the user merely has access to.
  const allEntries: Awaited<
    ReturnType<typeof octokit.repos.listForAuthenticatedUser>
  >["data"] = [];

  let page = 1;
  // Hard upper bound: 10 pages × 100 = 1000 repos. Plenty for a personal account.
  const MAX_REPO_PAGES = 10;
  while (page <= MAX_REPO_PAGES) {
    try {
      const resp = await limiter.run(
        `repos:p${page}`,
        async () =>
          await octokit.repos.listForAuthenticatedUser({
            per_page: 100,
            page,
            affiliation: "owner",
            sort: "pushed",
            direction: "desc",
          }),
      );
      allEntries.push(...resp.data);
      if (resp.data.length < 100) break;
      page += 1;
    } catch (e) {
      logger.error(`Failed to list repos page ${page}: ${describe(e)}`);
      break;
    }
  }

  // Filter to repos owned by the configured username (defensive — affiliation
  // is "owner", but this also covers username typos).
  const owned = allEntries.filter(
    (r) => r.owner?.login?.toLowerCase() === config.githubUsername.toLowerCase(),
  );
  if (owned.length === 0 && allEntries.length > 0) {
    logger.warn(
      `Token returned ${allEntries.length} repos but none owned by ` +
        `@${config.githubUsername}. Check GITHUB_USERNAME.`,
    );
  }

  let skippedArchived = 0;
  let skippedForks = 0;
  const eligible = owned.filter((r) => {
    if (r.archived && !options.includeArchived) {
      skippedArchived += 1;
      return false;
    }
    if (r.fork && !options.includeForks) {
      skippedForks += 1;
      return false;
    }
    return true;
  });

  const slice =
    typeof options.maxRepos === "number" && options.maxRepos > 0
      ? eligible.slice(0, options.maxRepos)
      : eligible;

  logger.success(
    `Discovered ${owned.length} owned repos; ` +
      `${eligible.length} eligible after filters; scanning ${slice.length}.`,
  );
  if (skippedArchived > 0) {
    logger.debug(
      `Skipped ${skippedArchived} archived repos (use --include-archived to include).`,
    );
  }
  if (skippedForks > 0) {
    logger.debug(
      `Skipped ${skippedForks} forks (use --include-forks to include).`,
    );
  }

  logger.step(`Fetching per-repo data (concurrency 3)…`);

  // The limiter caps concurrency internally; firing them all at once is safe.
  const repos = await Promise.all(
    slice.map((entry) =>
      fetchRepo({
        octokit,
        owner: config.githubUsername,
        repoName: entry.name,
        limiter,
        logger,
        repoListEntry: entry,
      }).catch((e: unknown) => {
        logger.error(`Repo ${entry.name} failed: ${describe(e)}`);
        // Return a stub so the report still includes the repo with an error
        // banner; we don't want a single bad repo to break the whole scan.
        return makeStubRepo(entry, describe(e));
      }),
    ),
  );

  return {
    repos,
    skippedArchived,
    skippedForks,
    totalDiscovered: owned.length,
  };
}

function makeStubRepo(
  entry: {
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
  },
  errMsg: string,
): FetchedRepo {
  return {
    metadata: {
      name: entry.name,
      fullName: entry.full_name,
      description: entry.description,
      htmlUrl: entry.html_url,
      isPrivate: entry.private,
      isFork: entry.fork,
      isArchived: entry.archived,
      defaultBranch: entry.default_branch,
      createdAt: entry.created_at ?? "",
      updatedAt: entry.updated_at ?? "",
      pushedAt: entry.pushed_at ?? "",
      languages: {},
      daysSinceLastPush: 0,
    },
    commits: {
      fetched: 0,
      summaries: [],
      buckets: {
        human: 0,
        claude: 0,
        cursor: 0,
        "gpt-engineer": 0,
        lovable: 0,
        "bolt-bot": 0,
        "v0-bot": 0,
        copilot: 0,
        codex: 0,
        "bot-other": 0,
        "claude-coauthored": 0,
        total: 0,
      },
      lastCommitDate: null,
      daysSinceLastCommit: 0,
    },
    prs: { count: 0, merged: 0, closedUnmerged: 0, open: 0, summaries: [] },
    issues: { openCount: 0, closedCount: 0 },
    docs: {
      hasDocsFolder: false,
      docsFileCount: 0,
      hasClaudeMd: false,
      hasLogMd: false,
      hasMemoryMd: false,
      hasIntentMd: false,
    },
    readme: {
      raw: null,
      length: 0,
      isSubstantial: false,
      hasTemplatePlaceholder: false,
      detectedPlaceholders: [],
    },
    pkg: {
      exists: false,
      name: null,
      dependencies: [],
      domainSpecificDeps: [],
      hasDomainDeps: false,
      raw: null,
    },
    srcQuality: { sampled: false, tsNoCheckCount: 0, sampleFileCount: 0 },
    errors: [`fetch failed: ${errMsg}`],
  };
}

function describe(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return JSON.stringify(err);
}
