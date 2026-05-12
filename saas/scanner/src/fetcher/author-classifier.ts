/**
 * Author classification for a single commit.
 *
 * Each rule is intentionally narrow so changes to one tool's bot identity
 * don't require touching other rules. Order matters: we match the most
 * specific identifiers first.
 *
 * Calibrated against the four research repos (cor-sys, groundstate-protocol,
 * chess-mind-patterns, core-unified-consciousness). See
 * /research/cross-repo/synthesis.md section 8.
 */

import type { AuthorClass, CommitAuthorBuckets } from "../types.js";

export interface ClassifierInput {
  name: string;
  email: string;
  body: string;
}

/**
 * Returns the author class for a commit. Bot detection is case-insensitive
 * on name; email is matched lowercased.
 */
export function classifyAuthor(input: ClassifierInput): AuthorClass {
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim().toLowerCase();
  const body = input.body ?? "";
  const nameLc = name.toLowerCase();

  // --- Claude --------------------------------------------------------------
  if (email === "noreply@anthropic.com" || /\bclaude\b/i.test(name)) {
    return "claude";
  }

  // --- Cursor --------------------------------------------------------------
  if (email.includes("cursoragent") || nameLc === "cursor agent") {
    return "cursor";
  }

  // --- gpt-engineer --------------------------------------------------------
  if (nameLc === "gpt-engineer-app[bot]") {
    return "gpt-engineer";
  }

  // --- Lovable -------------------------------------------------------------
  if (nameLc.includes("lovable")) {
    return "lovable";
  }

  // --- Bolt (only the bot variant; ignore humans named "bolt") -------------
  if (nameLc.includes("bolt") && nameLc.includes("bot")) {
    return "bolt-bot";
  }

  // --- v0 (only the bot variant; ignore humans named "v0") -----------------
  if (nameLc.includes("v0") && nameLc.includes("bot")) {
    return "v0-bot";
  }

  // --- Copilot -------------------------------------------------------------
  if (email.includes("copilot@github.com")) {
    return "copilot";
  }

  // --- Codex (name match OR body marker per spec) --------------------------
  if (nameLc === "codex" || /caught by codex/i.test(body)) {
    return "codex";
  }

  // --- Generic bot fallthrough --------------------------------------------
  if (nameLc.endsWith("[bot]")) {
    return "bot-other";
  }

  return "human";
}

/** Returns true if the commit body contains a `Co-Authored-By: Claude` trailer. */
export function hasClaudeCoAuthor(body: string | undefined | null): boolean {
  if (!body) return false;
  // Allow `Co-Authored-By:` or `Co-authored-by:`, optionally followed by
  // any name containing "Claude" before the email.
  return /co-authored-by:\s*[^\n]*claude/i.test(body);
}

/** Initialize empty buckets. */
export function emptyBuckets(): CommitAuthorBuckets {
  return {
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
  };
}

/** Increment the appropriate bucket for one classified commit. */
export function tallyBucket(
  buckets: CommitAuthorBuckets,
  cls: AuthorClass,
  coAuthored: boolean,
): void {
  buckets[cls] += 1;
  buckets.total += 1;
  if (coAuthored && cls !== "claude") {
    // Don't double-count when the top author is already Claude. We're
    // tracking *additional* Claude involvement, not duplicating it.
    buckets["claude-coauthored"] += 1;
  }
}
