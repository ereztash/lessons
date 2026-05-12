/**
 * Publish-Button Satisfiability Scorer.
 *
 * Higher score = more likely the repo was "finished" the moment the operator
 * pressed Lovable's Publish button. ≥50 is the flag threshold.
 *
 *   +30  README still has template placeholder
 *   +25  last commit message contains Lovable / Publish / Deploy preview tells
 *   +20  0 PRs AND >30 days since last commit
 *   +15  100% of commits are bot-authored
 *   +10  no domain-specific deps
 *
 * See `/products/playbooks/publish-button-intent-triage.md`.
 */

import type { FetchedRepo } from "../fetcher/repo-fetcher.js";
import type { PublishButtonResult } from "../types.js";

const FLAG_THRESHOLD = 50;
const DORMANT_DAYS = 30;
const LAST_COMMIT_SIGNATURES: readonly RegExp[] = [
  /edited ui in lovable/i,
  /\blovable\b.*\b(update|publish|sync)\b/i,
  /update site info for publish/i,
  /\bpublish\b/i,
  /deploy preview/i,
  /^changes$/i,
  /^update$/i,
];

export function scorePublishButton(repo: FetchedRepo): PublishButtonResult {
  const reasons: { reason: string; points: number }[] = [];

  // +30: README placeholder
  if (repo.readme.hasTemplatePlaceholder) {
    reasons.push({
      reason: `README still contains template placeholder(s): ${repo.readme.detectedPlaceholders.join(", ")}`,
      points: 30,
    });
  }

  // +25: last commit message matches the publish-button signature
  const lastCommit = repo.commits.summaries[0];
  if (lastCommit) {
    const subject = lastCommit.subject ?? "";
    const matched = LAST_COMMIT_SIGNATURES.some((re) => re.test(subject));
    if (matched) {
      reasons.push({
        reason: `last commit subject reads like a publish-button click: "${subject}"`,
        points: 25,
      });
    }
  }

  // +20: 0 PRs and >30 days dormant
  if (repo.prs.count === 0 && repo.commits.daysSinceLastCommit > DORMANT_DAYS) {
    reasons.push({
      reason: `no PRs and ${repo.commits.daysSinceLastCommit} days since last commit`,
      points: 20,
    });
  }

  // +15: 100% bot commits
  const total = repo.commits.buckets.total;
  if (total > 0 && repo.commits.buckets.human === 0) {
    reasons.push({
      reason: `100% of ${total} commits are bot-authored`,
      points: 15,
    });
  }

  // +10: no domain-specific deps
  if (!repo.pkg.hasDomainDeps) {
    reasons.push({
      reason: repo.pkg.exists
        ? "package.json has no domain-specific deps (template scaffold only)"
        : "no package.json found",
      points: 10,
    });
  }

  const rawScore = reasons.reduce((sum, r) => sum + r.points, 0);
  const score = Math.min(100, rawScore);

  return {
    score,
    flagged: score >= FLAG_THRESHOLD,
    reasons,
  };
}
