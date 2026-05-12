/**
 * Four-Feature Tier Classifier.
 *
 * Implements the algorithm from
 * `/products/playbooks/four-feature-tier-classifier.md` with the D-tier
 * extension for truly never-touched repos:
 *
 *   F1 hasNonTemplateDeps  — package.json has ≥1 dep NOT in TEMPLATE_DEPS
 *   F2 humanCommitsExist   — human-authored commit count ≥ 1
 *   F3 prsExist            — pr count ≥ 1
 *   F4 docsPresent         — docs/ folder OR substantial README
 *
 *   score = count(true)
 *
 *   score = 4               → Tier A (mature)
 *   score = 2-3             → Tier B (developing)
 *   score = 1               → Tier C (prototype-stalled)
 *   score = 0 AND ≥10 commits → Tier C (bot-only abandonment)
 *   score = 0 AND <10 commits → Tier D (never-touched skeleton)
 */

import type { FetchedRepo } from "../fetcher/repo-fetcher.js";
import type { Tier, TierResult } from "../types.js";

const BOT_ABANDONMENT_COMMIT_THRESHOLD = 10;

export function classifyTier(repo: FetchedRepo): TierResult {
  const hasNonTemplateDeps = repo.pkg.exists && repo.pkg.hasDomainDeps;
  const humanCommitsExist = repo.commits.buckets.human >= 1;
  const prsExist = repo.prs.count >= 1;

  // F4: docs are present if EITHER:
  //   (a) docs/ folder exists, OR
  //   (b) CLAUDE.md exists at root, OR
  //   (c) README is substantial AND has no template placeholder.
  // The spec says "docs/ folder OR substantial README"; we add CLAUDE.md
  // because the playbook explicitly mentions it ("Does the repo root contain
  // a CLAUDE.md file, OR does it contain a docs/ folder").
  const docsPresent =
    repo.docs.hasDocsFolder ||
    repo.docs.hasClaudeMd ||
    repo.readme.isSubstantial;

  const features = {
    hasNonTemplateDeps,
    humanCommitsExist,
    prsExist,
    docsPresent,
  };

  const score = Object.values(features).filter(Boolean).length;
  const tier = mapScoreToTier(score, repo.commits.buckets.total);
  const rationale = buildRationale(features, score, tier, repo);

  return { tier, score, features, rationale };
}

function mapScoreToTier(score: number, totalCommits: number): Tier {
  if (score === 4) return "A";
  if (score >= 2) return "B";
  if (score === 1) return "C";
  // score === 0
  if (totalCommits >= BOT_ABANDONMENT_COMMIT_THRESHOLD) return "C";
  return "D";
}

function buildRationale(
  features: TierResult["features"],
  score: number,
  tier: Tier,
  repo: FetchedRepo,
): string {
  const parts: string[] = [];
  parts.push(`score ${score}/4`);

  const hits: string[] = [];
  if (features.hasNonTemplateDeps) hits.push("domain deps");
  if (features.humanCommitsExist) hits.push("human commits");
  if (features.prsExist) hits.push("PRs");
  if (features.docsPresent) hits.push("docs");
  if (hits.length > 0) parts.push(`features: ${hits.join(", ")}`);

  const misses: string[] = [];
  if (!features.hasNonTemplateDeps) misses.push("no domain deps");
  if (!features.humanCommitsExist) misses.push("no human commits");
  if (!features.prsExist) misses.push("no PRs");
  if (!features.docsPresent) misses.push("no docs/CLAUDE.md/substantial README");
  if (misses.length > 0 && tier !== "A") {
    parts.push(`missing: ${misses.join(", ")}`);
  }

  if (tier === "C" && score === 0) {
    parts.push(
      `${repo.commits.buckets.total} commits — bot-only abandonment shape`,
    );
  }
  if (tier === "D") {
    parts.push(
      `${repo.commits.buckets.total} commits — template skeleton, never developed`,
    );
  }

  return parts.join("; ");
}
