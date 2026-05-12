/**
 * AI Tool Diversity Analysis.
 *
 * Surfaces:
 *   - which AI tools have ever authored a commit in this repo
 *   - whether the repo has a healthy dual-surface (Lovable-render + Claude-write)
 *   - whether it has a review surface (Codex or Copilot)
 *   - actionable gap suggestions
 *
 * See `/products/playbooks/dual-ai-surface-workflow.md` for the cadence rules.
 */

import type { FetchedRepo } from "../fetcher/repo-fetcher.js";
import type { AiDiversityResult, AiTool, CommitAuthorBuckets } from "../types.js";

const TOOL_BUCKET_MAP: { tool: AiTool; bucket: keyof CommitAuthorBuckets }[] = [
  { tool: "claude", bucket: "claude" },
  { tool: "cursor", bucket: "cursor" },
  { tool: "gpt-engineer", bucket: "gpt-engineer" },
  { tool: "lovable", bucket: "lovable" },
  { tool: "bolt", bucket: "bolt-bot" },
  { tool: "v0", bucket: "v0-bot" },
  { tool: "copilot", bucket: "copilot" },
  { tool: "codex", bucket: "codex" },
];

export function analyzeAiDiversity(repo: FetchedRepo): AiDiversityResult {
  const buckets = repo.commits.buckets;
  const toolsDetected: AiTool[] = [];

  for (const { tool, bucket } of TOOL_BUCKET_MAP) {
    if (buckets[bucket] > 0) toolsDetected.push(tool);
  }

  // Claude co-authorship counts as a "claude" presence even if no direct
  // Claude authorship exists (this surfaces the cor-sys pattern where the
  // human shell wraps Claude's work).
  if (!toolsDetected.includes("claude") && buckets["claude-coauthored"] > 0) {
    toolsDetected.push("claude");
  }

  const hasClaudeWriteSurface = toolsDetected.includes("claude");
  const hasCursor = toolsDetected.includes("cursor");
  const hasLovableRenderSurface = toolsDetected.includes("lovable");
  const hasOtherRender =
    toolsDetected.includes("bolt") || toolsDetected.includes("v0");
  const hasReviewSurface =
    toolsDetected.includes("codex") || toolsDetected.includes("copilot");

  const hasWriteSurface = hasClaudeWriteSurface || hasCursor;
  const hasRenderSurface = hasLovableRenderSurface || hasOtherRender;
  const hasDualSurface = hasWriteSurface && hasRenderSurface;

  const suggestions: string[] = [];

  // Per spec:
  //   Claude present + no Codex/Copilot ever → suggest "Add AI cross-review"
  if (hasClaudeWriteSurface && !hasReviewSurface) {
    suggestions.push(
      "Claude is present but no review-AI ever ran. Add Codex or Copilot for AI cross-review (caught real P1 in groundstate PR#10).",
    );
  }

  //   Only Lovable → suggest "Add code-writing AI"
  if (hasLovableRenderSurface && !hasWriteSurface) {
    suggestions.push(
      "Lovable-only repo. To leave Tier C, add a code-writing AI (Claude Code or Cursor) the next time you open the repo.",
    );
  }

  //   Claude + Cursor → dual-AI write surface flag (healthy)
  if (hasClaudeWriteSurface && hasCursor) {
    suggestions.push(
      "Healthy dual-AI write surface (Claude + Cursor). Maintain the cadence: Claude interactive, Cursor batch.",
    );
  }

  // Dual-surface health (lovable + claude is the cleanest dual-surface)
  if (hasLovableRenderSurface && hasClaudeWriteSurface) {
    suggestions.push(
      "Dual-surface cadence active (Lovable renders, Claude writes). Maintain polarity: don't change code via Lovable UI.",
    );
  }

  return {
    toolsDetected,
    hasClaudeWriteSurface,
    hasLovableRenderSurface,
    hasDualSurface,
    hasReviewSurface,
    suggestions,
  };
}
