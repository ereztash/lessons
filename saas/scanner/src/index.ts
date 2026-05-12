#!/usr/bin/env node
/**
 * PortfolioPilot Scanner — CLI entry.
 *
 * Pipeline:
 *   1. Parse CLI flags (commander)
 *   2. Load env config (.env via dotenv)
 *   3. Discover repos via Octokit (authenticated user, filtered)
 *   4. Per-repo fetch (commits, PRs, issues, tree, package.json, README, src sample)
 *   5. Per-repo classify (tier, publish-button, resumption, AI diversity, voice)
 *   6. Build cross-repo summary + insights
 *   7. Render Markdown + HTML reports to output/
 */

import { Command } from "commander";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadConfig } from "./config.js";
import { fetchPortfolio } from "./fetcher/index.js";
import type { FetchedRepo } from "./fetcher/repo-fetcher.js";
import { classifyTier } from "./classifier/tier-classifier.js";
import { scorePublishButton } from "./classifier/publish-button-test.js";
import { scoreResumption } from "./classifier/resumption-readiness.js";
import { analyzeAiDiversity } from "./classifier/ai-tool-diversity.js";
import { analyzeEditorialVoice } from "./classifier/editorial-voice.js";
import { renderMarkdownReport } from "./report/markdown-report.js";
import { renderHtmlReport } from "./report/html-report.js";
import { buildSummary } from "./report/summary.js";
import type {
  CliOptions,
  PortfolioReport,
  RepoAnalysis,
  Tier,
  TierResult,
  PublishButtonResult,
  ResumptionResult,
} from "./types.js";
import { createLogger } from "./util/logger.js";

async function main(): Promise<void> {
  const program = new Command();
  program
    .name("portfolio-scanner")
    .description(
      "Scan a GitHub user's repos, classify each into Tier A/B/C/D, and emit a portfolio report.",
    )
    .version("0.1.0")
    .option("--include-archived", "Include archived repos", false)
    .option("--include-forks", "Include forks", false)
    .option(
      "--output-dir <dir>",
      "Override output directory (default: $OUTPUT_DIR or ./output)",
    )
    .option(
      "--format <md|html|both>",
      "Output format (default: both)",
      (v) => {
        if (v !== "md" && v !== "html" && v !== "both") {
          throw new Error(`--format must be md | html | both (got "${v}")`);
        }
        return v;
      },
      "both",
    )
    .option(
      "--max-repos <n>",
      "Process at most N repos (debugging)",
      (v) => {
        const n = parseInt(v, 10);
        if (!Number.isFinite(n) || n <= 0) {
          throw new Error(`--max-repos must be a positive integer (got "${v}")`);
        }
        return n;
      },
    )
    .option("--verbose", "Verbose progress output", false);

  program.parse(process.argv);
  const raw = program.opts<{
    includeArchived: boolean;
    includeForks: boolean;
    outputDir?: string;
    format: "md" | "html" | "both";
    maxRepos?: number;
    verbose: boolean;
  }>();

  const logger = createLogger(raw.verbose);

  // -------------------------------------------------------------------------
  // Config
  // -------------------------------------------------------------------------

  let config: ReturnType<typeof loadConfig>;
  try {
    config = loadConfig();
  } catch (e) {
    logger.error(describe(e));
    process.exitCode = 2;
    return;
  }

  const outputDir = raw.outputDir
    ? resolve(process.cwd(), raw.outputDir)
    : config.outputDir;

  const options: CliOptions = {
    includeArchived: raw.includeArchived,
    includeForks: raw.includeForks,
    outputDir,
    format: raw.format,
    maxRepos: raw.maxRepos,
    verbose: raw.verbose,
  };

  logger.step(`PortfolioPilot Scanner v0.1.0`);
  logger.debug(`Output directory: ${outputDir}`);
  logger.debug(`Format: ${options.format}`);
  logger.debug(
    `Include archived: ${options.includeArchived} · Include forks: ${options.includeForks}`,
  );

  // -------------------------------------------------------------------------
  // Fetch
  // -------------------------------------------------------------------------

  let fetched: Awaited<ReturnType<typeof fetchPortfolio>>;
  try {
    fetched = await fetchPortfolio({ config, options, logger });
  } catch (e) {
    logger.error(`Portfolio fetch failed: ${describe(e)}`);
    process.exitCode = 1;
    return;
  }

  if (fetched.repos.length === 0) {
    logger.warn(
      `No eligible repos found for @${config.githubUsername}. ` +
        "If you expected repos, check your GITHUB_TOKEN scope (needs 'repo') " +
        "and your GITHUB_USERNAME value.",
    );
    process.exitCode = 0;
    return;
  }

  // -------------------------------------------------------------------------
  // Classify each repo
  // -------------------------------------------------------------------------

  logger.step(`Classifying ${fetched.repos.length} repos…`);

  const analyses: RepoAnalysis[] = fetched.repos.map((fr) => {
    const tier = classifyTier(fr);
    const publishButton = scorePublishButton(fr);
    const resumption = scoreResumption(fr, tier.tier);
    const aiDiversity = analyzeAiDiversity(fr);
    const editorialVoice = analyzeEditorialVoice(fr);
    const nextStep = computeNextStep(fr, tier, publishButton, resumption);

    logger.success(
      `Scanned ${fr.metadata.name} (Tier ${tier.tier}, score ${tier.score}/4)`,
    );

    const analysis: RepoAnalysis = {
      metadata: fr.metadata,
      commits: fr.commits,
      prs: fr.prs,
      issues: fr.issues,
      docs: fr.docs,
      readme: fr.readme,
      pkg: fr.pkg,
      srcQuality: fr.srcQuality,
      tier,
      publishButton,
      resumption,
      aiDiversity,
      editorialVoice,
      nextStep,
      errors: fr.errors,
    };
    return analysis;
  });

  // -------------------------------------------------------------------------
  // Report
  // -------------------------------------------------------------------------

  const summary = buildSummary(analyses, config.githubUsername);
  const report: PortfolioReport = { summary, repos: analyses };

  await mkdir(outputDir, { recursive: true });
  const dateSlug = todayDateSlug();

  const writes: Promise<void>[] = [];
  let mdPath: string | null = null;
  let htmlPath: string | null = null;

  if (options.format === "md" || options.format === "both") {
    mdPath = resolve(outputDir, `portfolio-report-${dateSlug}.md`);
    writes.push(writeFile(mdPath, renderMarkdownReport(report), "utf-8"));
  }
  if (options.format === "html" || options.format === "both") {
    htmlPath = resolve(outputDir, `portfolio-report-${dateSlug}.html`);
    writes.push(writeFile(htmlPath, renderHtmlReport(report), "utf-8"));
  }

  try {
    await Promise.all(writes);
  } catch (e) {
    logger.error(`Failed to write report(s): ${describe(e)}`);
    process.exitCode = 1;
    return;
  }

  logger.step(`Done.`);
  if (mdPath) logger.success(`Markdown report: ${mdPath}`);
  if (htmlPath) logger.success(`HTML report: ${htmlPath}`);
  logger.info("");
  logger.info(`Suggested next action: ${summary.suggestedNextAction}`);
}

/**
 * Compute a one-line "next step" recommendation for a single repo.
 */
function computeNextStep(
  repo: FetchedRepo,
  tier: TierResult,
  publishButton: PublishButtonResult,
  resumption: ResumptionResult,
): string {
  if (repo.metadata.isArchived) {
    return "Already archived — no action needed.";
  }

  if (publishButton.flagged) {
    return "Archive without guilt — looks publish-button-satisfied (success condition met by Lovable Publish).";
  }

  switch (tier.tier) {
    case "A":
      return tier.score === 4
        ? "Continue investment; this is your production-grade work."
        : "Write the missing CLAUDE.md (≤30 min) to reach a clean 4/4.";
    case "B":
      if (resumption.applicable && resumption.strongCandidate) {
        return `Strong resumption candidate (score ${resumption.score}/100, ~${resumption.estimatedHoursToResume}h). Run a 72-minute sprint per /products/playbooks/resumer-day-prep.md.`;
      }
      return repo.commits.daysSinceLastCommit > 30
        ? "Stage a resumption sprint within 14 days or archive after a final review."
        : "Add ONE more feature this week to push toward Tier A.";
    case "C":
      return "Likely finished by its own success condition. Archive unless you have a clear behavioral-success reason to resume.";
    case "D":
      return "Archive without guilt — template skeleton, never developed.";
    default:
      return "Re-classify after next commit batch.";
  }
}

function todayDateSlug(): string {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mi = String(d.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}${mi}Z`;
}

function describe(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return JSON.stringify(err);
}

// Silence eslint-no-floating-promises by catching at the top.
main().catch((e: unknown) => {
  // eslint-disable-next-line no-console
  console.error(e instanceof Error ? e.message : String(e));
  process.exit(1);
});

// Re-export Tier for downstream consumers (kept narrow for IDE help).
export type { Tier };
