/**
 * Cross-repo portfolio summary builder.
 *
 * Takes the full list of RepoAnalysis and produces a PortfolioSummary —
 * counts per tier, lists of flagged repos, total hours-to-resume, AI-tool
 * coverage by tool, and a one-liner suggested next action.
 */

import type {
  AiTool,
  PortfolioSummary,
  RepoAnalysis,
  Tier,
} from "../types.js";

export function buildSummary(
  analyses: RepoAnalysis[],
  username: string,
): PortfolioSummary {
  const scannedAt = new Date().toISOString();
  const totalRepos = analyses.length;

  const countsByTier: Record<Tier, number> = { A: 0, B: 0, C: 0, D: 0 };
  const reposLikelyPublishButtonSatisfied: string[] = [];
  const reposStrongResumptionCandidates: string[] = [];
  let totalEstimatedHoursToResume = 0;

  const reposByAiTool: Record<AiTool, string[]> = {
    claude: [],
    cursor: [],
    "gpt-engineer": [],
    lovable: [],
    bolt: [],
    v0: [],
    copilot: [],
    codex: [],
  };

  for (const a of analyses) {
    countsByTier[a.tier.tier] += 1;
    if (a.publishButton.flagged) {
      reposLikelyPublishButtonSatisfied.push(a.metadata.name);
    }
    if (a.resumption.applicable && a.resumption.strongCandidate) {
      reposStrongResumptionCandidates.push(a.metadata.name);
    }
    if (a.resumption.applicable) {
      totalEstimatedHoursToResume += a.resumption.estimatedHoursToResume;
    }
    for (const tool of a.aiDiversity.toolsDetected) {
      reposByAiTool[tool].push(a.metadata.name);
    }
  }

  const insights = buildInsights(
    analyses,
    countsByTier,
    reposLikelyPublishButtonSatisfied,
    reposByAiTool,
  );

  const suggestedNextAction = buildNextAction(
    countsByTier,
    reposStrongResumptionCandidates,
    reposLikelyPublishButtonSatisfied,
  );

  return {
    scannedAt,
    username,
    totalRepos,
    countsByTier,
    reposLikelyPublishButtonSatisfied,
    reposStrongResumptionCandidates,
    totalEstimatedHoursToResume: roundHours(totalEstimatedHoursToResume),
    reposByAiTool,
    insights,
    suggestedNextAction,
  };
}

function buildInsights(
  analyses: RepoAnalysis[],
  countsByTier: Record<Tier, number>,
  publishButtonSatisfied: string[],
  reposByAiTool: Record<AiTool, string[]>,
): string[] {
  const out: string[] = [];

  // Tier counts headline
  out.push(
    `Portfolio tier breakdown: A=${countsByTier.A}, B=${countsByTier.B}, ` +
      `C=${countsByTier.C}, D=${countsByTier.D}.`,
  );

  // Domain-deps coverage
  const noDomainDeps = analyses.filter(
    (a) => a.pkg.exists && !a.pkg.hasDomainDeps,
  );
  if (noDomainDeps.length >= 2) {
    out.push(
      `${noDomainDeps.length} repos have package.json but no domain-specific deps — ` +
        `candidates for archival or for adding a commitment-device dep on resume.`,
    );
  }

  // Lovable-only single-surface count
  const lovableOnly = analyses.filter(
    (a) =>
      a.aiDiversity.hasLovableRenderSurface &&
      !a.aiDiversity.hasClaudeWriteSurface,
  );
  if (lovableOnly.length >= 1) {
    out.push(
      `${lovableOnly.length} repos are Lovable-only (no Claude write surface). ` +
        `Per dual-AI-surface playbook, these are stuck at Tier C unless Claude is added.`,
    );
  }

  // Publish-button flags
  if (publishButtonSatisfied.length >= 1) {
    out.push(
      `${publishButtonSatisfied.length} repos flagged as likely publish-button-satisfied. ` +
        `Recommended: archive without guilt rather than retroactively installing CLAUDE.md.`,
    );
  }

  // Review-surface coverage gap
  const claudeRepos = reposByAiTool.claude.length;
  const reviewRepos = reposByAiTool.codex.length + reposByAiTool.copilot.length;
  if (claudeRepos >= 3 && reviewRepos === 0) {
    out.push(
      `Claude is active in ${claudeRepos} repos but no Codex/Copilot review-surface exists anywhere. ` +
        `Consider adding AI cross-review to ≥1 high-value repo.`,
    );
  }

  // Dormancy distribution
  const dormant60 = analyses.filter(
    (a) => a.commits.daysSinceLastCommit > 60,
  ).length;
  if (dormant60 >= 3) {
    out.push(
      `${dormant60} repos are dormant >60 days. Quarterly portfolio review window is past due.`,
    );
  }

  // Tier D = archive candidates
  if (countsByTier.D >= 1) {
    out.push(
      `${countsByTier.D} Tier-D repos (never-developed template skeletons) — ` +
        `archive without guilt.`,
    );
  }

  return out;
}

function buildNextAction(
  countsByTier: Record<Tier, number>,
  strongResumption: string[],
  publishButtonSatisfied: string[],
): string {
  if (strongResumption.length >= 1) {
    return (
      `Run the 72-minute resumer sprint on: ${strongResumption.slice(0, 3).join(", ")}` +
      (strongResumption.length > 3
        ? ` (+${strongResumption.length - 3} more strong candidates)`
        : "") +
      ". Start with the freshest one."
    );
  }
  if (publishButtonSatisfied.length >= 1) {
    return (
      `Archive ${publishButtonSatisfied.length} publish-button-satisfied repo(s) ` +
      `(${publishButtonSatisfied.slice(0, 3).join(", ")}${publishButtonSatisfied.length > 3 ? "…" : ""}) ` +
      "before re-running the scan."
    );
  }
  if (countsByTier.A >= 1) {
    return "Your Tier-A repos look healthy. Consider promoting one Tier-B repo to Tier A by adding CLAUDE.md.";
  }
  return "No actionable signals yet — re-run after your next commit batch.";
}

function roundHours(h: number): number {
  return Math.round(h * 10) / 10;
}
