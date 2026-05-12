/**
 * Resumption-Readiness Scorer.
 *
 * Only meaningful for Tier B/C repos (Tier A is already healthy; Tier D is a
 * template skeleton with nothing to resume). Higher score = easier to resume
 * inside the 72-minute window from `/products/playbooks/resumer-day-prep.md`.
 *
 *   +25  domain-specific dep present (commitment device)
 *   +20  ≥1 human commit exists
 *   +15  last commit ≤ 90 days ago (context not yet decayed)
 *   +15  README has substantial filled-in description
 *   +15  ≥1 doc file exists (CLAUDE.md, LOG.md, docs/*, INTENT.md)
 *   +10  no `@ts-nocheck` rampant in src/ (sampled first 5 .ts files)
 *
 *   ≥60 → strong resumption candidate.
 *
 * Also returns a coarse estimate of hours to resume (1.5h = one sprint;
 * scaled by how much context is missing).
 */

import type { FetchedRepo } from "../fetcher/repo-fetcher.js";
import type { ResumptionResult, Tier } from "../types.js";

const STRONG_THRESHOLD = 60;
const FRESH_DAYS = 90;
const TS_NOCHECK_RAMPANT_THRESHOLD = 2;

export function scoreResumption(
  repo: FetchedRepo,
  tier: Tier,
): ResumptionResult {
  const applicable = tier === "B" || tier === "C";
  if (!applicable) {
    return {
      applicable: false,
      score: 0,
      strongCandidate: false,
      reasons: [],
      estimatedHoursToResume: 0,
    };
  }

  const reasons: { reason: string; points: number }[] = [];

  // +25: domain-specific dep
  if (repo.pkg.hasDomainDeps) {
    const example = repo.pkg.domainSpecificDeps[0];
    reasons.push({
      reason: `commitment-device dep present${example ? ` (e.g. ${example})` : ""}`,
      points: 25,
    });
  }

  // +20: ≥1 human commit
  if (repo.commits.buckets.human >= 1) {
    reasons.push({
      reason: `${repo.commits.buckets.human} human commit(s) on record`,
      points: 20,
    });
  }

  // +15: last commit ≤ 90 days
  if (
    repo.commits.lastCommitDate &&
    repo.commits.daysSinceLastCommit <= FRESH_DAYS
  ) {
    reasons.push({
      reason: `last commit ${repo.commits.daysSinceLastCommit} days ago (still fresh)`,
      points: 15,
    });
  }

  // +15: README substantial
  if (repo.readme.isSubstantial) {
    reasons.push({
      reason: `README is substantial (${repo.readme.length} chars, no placeholders)`,
      points: 15,
    });
  }

  // +15: at least one doc file
  if (
    repo.docs.hasDocsFolder ||
    repo.docs.hasClaudeMd ||
    repo.docs.hasLogMd ||
    repo.docs.hasIntentMd ||
    repo.docs.hasMemoryMd
  ) {
    const which: string[] = [];
    if (repo.docs.hasClaudeMd) which.push("CLAUDE.md");
    if (repo.docs.hasLogMd) which.push("LOG.md");
    if (repo.docs.hasMemoryMd) which.push("MEMORY.md");
    if (repo.docs.hasIntentMd) which.push("INTENT.md");
    if (repo.docs.hasDocsFolder)
      which.push(`docs/ (${repo.docs.docsFileCount} files)`);
    reasons.push({
      reason: `doc files exist: ${which.join(", ")}`,
      points: 15,
    });
  }

  // +10: no rampant @ts-nocheck
  if (
    repo.srcQuality.sampled &&
    repo.srcQuality.tsNoCheckCount < TS_NOCHECK_RAMPANT_THRESHOLD
  ) {
    reasons.push({
      reason: `no @ts-nocheck rampant in sampled src/ (${repo.srcQuality.sampleFileCount} files)`,
      points: 10,
    });
  }

  const rawScore = reasons.reduce((sum, r) => sum + r.points, 0);
  const score = Math.min(100, rawScore);

  return {
    applicable: true,
    score,
    strongCandidate: score >= STRONG_THRESHOLD,
    reasons,
    estimatedHoursToResume: estimateHoursToResume(score, repo),
  };
}

/**
 * Heuristic estimate of resume cost.
 *
 *   80-100 → 1.5h (one sprint)
 *   60-79  → 2.5h
 *   40-59  → 4.0h
 *   <40    → 6.0h  (more re-bootstrap than resume)
 *
 * Then add 1h if dormant >180 days (context decay surcharge).
 */
function estimateHoursToResume(score: number, repo: FetchedRepo): number {
  let base: number;
  if (score >= 80) base = 1.5;
  else if (score >= 60) base = 2.5;
  else if (score >= 40) base = 4.0;
  else base = 6.0;

  if (repo.commits.daysSinceLastCommit > 180) base += 1.0;
  return base;
}
