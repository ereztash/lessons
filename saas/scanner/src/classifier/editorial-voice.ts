/**
 * Editorial Voice Analyzer.
 *
 * Detects:
 *   - conventional-commit prefix ratio (feat:, fix:, chore:, docs:, refactor:,
 *     test:, debug:)
 *   - research-citation density in commit bodies (years + author names in
 *     parens, e.g., "Tversky & Kahneman 1974")
 *   - voice escalation classification (absent / stalled / monotonic)
 *
 * Based on synthesis section 9 (editorial-voice escalation). Only useful as a
 * follow-up signal after ≥5 commits exist.
 */

import type { FetchedRepo } from "../fetcher/repo-fetcher.js";
import type { EditorialVoiceResult } from "../types.js";

const CONVENTIONAL_PREFIX_RE =
  /^(feat|fix|chore|docs|refactor|test|debug|perf|build|ci|style|revert)(\([^)]*\))?!?:\s/i;

// Match "Author 2014", "Tversky & Kahneman 1974", "Ebbinghaus 1885", etc.
// Conservative: requires a capital letter, optional ampersand, then a 4-digit year.
const CITATION_RE = /\b[A-Z][a-zA-Z]+(?:\s*(?:&|and)\s*[A-Z][a-zA-Z]+)?\s+\d{4}\b/g;

const MIN_COMMITS_FOR_VOICE_READ = 5;

export function analyzeEditorialVoice(
  repo: FetchedRepo,
): EditorialVoiceResult {
  const commits = repo.commits.summaries;
  if (commits.length === 0) {
    return {
      conventionalCommitCount: 0,
      conventionalCommitRatio: 0,
      citationCount: 0,
      hasResearchCitations: false,
      voiceEscalation: "absent",
    };
  }

  let conventionalCount = 0;
  let citationCount = 0;
  // Track which commits (by chronological index, oldest=0) carry citations.
  const citationIndices: number[] = [];

  // commits[0] is newest; reverse-iterate so index = chronological.
  for (let i = commits.length - 1; i >= 0; i -= 1) {
    const c = commits[i];
    if (!c) continue;
    if (CONVENTIONAL_PREFIX_RE.test(c.subject)) conventionalCount += 1;
    const matches = c.body.match(CITATION_RE);
    if (matches && matches.length > 0) {
      citationCount += matches.length;
      // Chronological index = (length-1) - i since we reverse-iterate from
      // newest. Store the chronological position.
      citationIndices.push(commits.length - 1 - i);
    }
  }

  const ratio = commits.length > 0 ? conventionalCount / commits.length : 0;
  const hasResearchCitations = citationCount > 0;

  let voiceEscalation: EditorialVoiceResult["voiceEscalation"];
  if (commits.length < MIN_COMMITS_FOR_VOICE_READ) {
    voiceEscalation = "absent";
  } else if (!hasResearchCitations && conventionalCount === 0) {
    voiceEscalation = "absent";
  } else if (hasResearchCitations) {
    // If citations first appear in the second half of the commit history
    // and persist into the most recent commits, treat as monotonic.
    const firstCitationAt = citationIndices[0] ?? 0;
    const lastCitationAt = citationIndices[citationIndices.length - 1] ?? 0;
    const recentTwoThirds = Math.floor((commits.length * 2) / 3);
    if (firstCitationAt < commits.length && lastCitationAt >= recentTwoThirds) {
      voiceEscalation = "monotonic";
    } else {
      voiceEscalation = "stalled";
    }
  } else if (conventionalCount >= 3) {
    // Has conventional commits but no citations. Check if the most recent
    // commits still use them.
    const recentHalf = commits.slice(0, Math.floor(commits.length / 2));
    const recentConv = recentHalf.filter((c) =>
      CONVENTIONAL_PREFIX_RE.test(c.subject),
    ).length;
    voiceEscalation = recentConv > 0 ? "monotonic" : "stalled";
  } else {
    voiceEscalation = "stalled";
  }

  return {
    conventionalCommitCount: conventionalCount,
    conventionalCommitRatio: ratio,
    citationCount,
    hasResearchCitations,
    voiceEscalation,
  };
}
