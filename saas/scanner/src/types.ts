/**
 * PortfolioPilot Scanner — shared types.
 *
 * Every cross-module shape lives here. This file is the single source of truth
 * for what a "Repo" looks like as it flows fetcher -> classifier -> report.
 */

/** Authorship class for a single commit (see fetcher/author-classifier.ts). */
export type AuthorClass =
  | "human"
  | "claude"
  | "cursor"
  | "gpt-engineer"
  | "lovable"
  | "bolt-bot"
  | "v0-bot"
  | "copilot"
  | "codex"
  | "bot-other";

/** All known AI tools we surface for diversity analysis. */
export type AiTool =
  | "claude"
  | "cursor"
  | "gpt-engineer"
  | "lovable"
  | "bolt"
  | "v0"
  | "copilot"
  | "codex";

/** Tier label produced by the Four-Feature Tier Classifier. */
export type Tier = "A" | "B" | "C" | "D";

/** One bucket of commit counts per author class for a single repo. */
export interface CommitAuthorBuckets {
  human: number;
  claude: number;
  cursor: number;
  "gpt-engineer": number;
  lovable: number;
  "bolt-bot": number;
  "v0-bot": number;
  copilot: number;
  codex: number;
  "bot-other": number;
  /**
   * Commits whose body carries `Co-Authored-By: Claude` even though the top-level
   * author wasn't Claude. Tracked separately so we don't double-count.
   */
  "claude-coauthored": number;
  /** Total commits fetched (all classes summed; co-authored not added in). */
  total: number;
}

/** Minimal commit record we keep around for downstream analysis. */
export interface CommitSummary {
  sha: string;
  authorName: string;
  authorEmail: string;
  date: string;
  subject: string;
  body: string;
  authorClass: AuthorClass;
  isClaudeCoAuthored: boolean;
}

/** A single PR's relevant fields. */
export interface PullRequestSummary {
  number: number;
  state: "open" | "closed";
  merged: boolean;
  title: string;
  createdAt: string;
  mergedAt: string | null;
  closedAt: string | null;
}

/** A single issue's relevant fields. */
export interface IssueSummary {
  number: number;
  state: "open" | "closed";
  title: string;
  createdAt: string;
  closedAt: string | null;
}

/** Result of inspecting a repo's root tree for docs signals. */
export interface DocsSignals {
  hasDocsFolder: boolean;
  docsFileCount: number;
  hasClaudeMd: boolean;
  hasLogMd: boolean;
  hasMemoryMd: boolean;
  hasIntentMd: boolean;
}

/** Result of inspecting the README content. */
export interface ReadmeSignals {
  raw: string | null;
  length: number;
  isSubstantial: boolean;
  hasTemplatePlaceholder: boolean;
  /** Which placeholder strings were found (for explanation in reports). */
  detectedPlaceholders: string[];
}

/** Result of parsing package.json. */
export interface PackageSignals {
  exists: boolean;
  name: string | null;
  /** All production dep names (devDeps excluded). */
  dependencies: string[];
  /** Production deps that are NOT in the template allowlist. */
  domainSpecificDeps: string[];
  hasDomainDeps: boolean;
  /** Raw parsed object kept around in case future scorers need it. */
  raw: Record<string, unknown> | null;
}

/** Sample-based check of TypeScript source quality. */
export interface SrcQualitySignals {
  /** Did we sample at least one .ts file under src/? */
  sampled: boolean;
  /** How many `@ts-nocheck` occurrences across sampled files. */
  tsNoCheckCount: number;
  /** Sample size we actually read. */
  sampleFileCount: number;
}

/** The output of `classifier/tier-classifier.ts`. */
export interface TierResult {
  tier: Tier;
  score: number;
  features: {
    hasNonTemplateDeps: boolean;
    humanCommitsExist: boolean;
    prsExist: boolean;
    docsPresent: boolean;
  };
  rationale: string;
}

/** Publish-button satisfiability scoring breakdown. */
export interface PublishButtonResult {
  score: number;
  flagged: boolean;
  reasons: { reason: string; points: number }[];
}

/** Resumption-readiness scoring breakdown. */
export interface ResumptionResult {
  applicable: boolean;
  score: number;
  strongCandidate: boolean;
  reasons: { reason: string; points: number }[];
  estimatedHoursToResume: number;
}

/** AI tool diversity analysis output. */
export interface AiDiversityResult {
  toolsDetected: AiTool[];
  hasClaudeWriteSurface: boolean;
  hasLovableRenderSurface: boolean;
  hasDualSurface: boolean;
  hasReviewSurface: boolean;
  suggestions: string[];
}

/** Editorial-voice analysis output. */
export interface EditorialVoiceResult {
  conventionalCommitCount: number;
  conventionalCommitRatio: number;
  citationCount: number;
  hasResearchCitations: boolean;
  voiceEscalation: "absent" | "stalled" | "monotonic";
}

/** Repo metadata pulled from the GitHub API. */
export interface RepoMetadata {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  languages: Record<string, number>;
  /** Days since pushedAt at scan time. */
  daysSinceLastPush: number;
}

/** The full per-repo analysis bundle. */
export interface RepoAnalysis {
  metadata: RepoMetadata;
  commits: {
    fetched: number;
    summaries: CommitSummary[];
    buckets: CommitAuthorBuckets;
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
  tier: TierResult;
  publishButton: PublishButtonResult;
  resumption: ResumptionResult;
  aiDiversity: AiDiversityResult;
  editorialVoice: EditorialVoiceResult;
  /** Top recommended next step (one-liner). */
  nextStep: string;
  /** Any error captured during fetch (graceful degradation). */
  errors: string[];
}

/** Cross-repo portfolio summary. */
export interface PortfolioSummary {
  scannedAt: string;
  username: string;
  totalRepos: number;
  countsByTier: Record<Tier, number>;
  reposLikelyPublishButtonSatisfied: string[];
  reposStrongResumptionCandidates: string[];
  totalEstimatedHoursToResume: number;
  reposByAiTool: Record<AiTool, string[]>;
  insights: string[];
  /** Top-line suggested next portfolio action. */
  suggestedNextAction: string;
}

/** Final bundle written to disk by the reporter. */
export interface PortfolioReport {
  summary: PortfolioSummary;
  repos: RepoAnalysis[];
}

/** CLI options after commander parsing. */
export interface CliOptions {
  includeArchived: boolean;
  includeForks: boolean;
  outputDir: string;
  format: "md" | "html" | "both";
  maxRepos: number | undefined;
  verbose: boolean;
}

/** Loaded + validated env config. */
export interface AppConfig {
  githubToken: string;
  githubUsername: string;
  outputDir: string;
}
