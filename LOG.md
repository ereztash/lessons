# LOG — Enforcement Spine

> This file IS the enforcement mechanism. Read every session. Update at /lesson-checkpoint and end of session.

## Environment Facts

| Fact | Value | Last verified |
|------|-------|---------------|
| Target branch | `claude/analyze-workflow-optimization-3NhlH` | 2026-05-12 |
| GitHub access | `mcp__github__*` MCP tools only | 2026-05-12 |
| `gh` CLI | NOT AVAILABLE — use GitHub MCP | 2026-05-12 |
| Repo scope | 5 repos under ereztash (see CLAUDE.md) | 2026-05-12 |
| Default language (machine files) | English | 2026-05-12 |
| Default language (user-facing /index, /profile) | HE+EN bilingual | 2026-05-12 |
| Current phase | Phase 2 — cross-repo synthesis done; Phase 3 next | 2026-05-12 |
| cor-sys commit count (verified) | 71 commits, matches Phase 1 survey | 2026-05-12 |
| cor-sys PR count (verified) | 16 PRs (13 merged, 3 closed unmerged) | 2026-05-12 |
| cor-sys issues count (verified) | 0 (open + closed combined) | 2026-05-12 |
| Total raw observations gathered (4 repos) | 43 | 2026-05-12 |
| Promoted cross-repo patterns (Phase 2) | 17 (out of 35 matrix rows) | 2026-05-12 |

## Pre-Research Validation Protocol

Before deep-diving into a repo, verify (≤2 min):

```
1. mcp__github__list_branches(owner, repo) — confirm branch landscape
2. mcp__github__list_commits(owner, repo, perPage=100) — confirm commit count matches expectations
3. mcp__github__list_pull_requests(owner, repo, state='all') — confirm PR count
4. mcp__github__list_issues(owner, repo, state='OPEN'|'CLOSED') — confirm issue presence
```

Mismatch with expectations (Phase 1 exploration data) → re-read original survey before proceeding.

## Pre-Synthesis Validation Protocol (added Phase 2)

Before promoting any pattern to a MOC, verify:

```
1. Pattern appears in ≥2 source extracted-insights.md files
2. Each occurrence is scored ≥2 (moderate) in the patterns-matrix
3. Evidence pointers (cor-sys@<sha> form) resolve to real commits/PRs in the source surveys
4. Dimension classification is single — not multi-dimension claim
5. If the pattern is single-repo, it stays in the candidate section of the MOC, not the promoted section
```

Mismatch → reduce to candidate-tier, do not promote.

## Anti-Patterns (Rules)

Each anti-pattern is a documented mistake + rule. Append, never edit.

| # | Mistake | Rule |
|---|---------|------|
| 1 | Phase 1 cor-sys deep-dive agent hit rate limit at end of session before returning summary, but had already written all 6 artifacts | Always verify artifacts via `get_file_contents` even if agent returned mid-failure; trust the GitHub state, not the agent's status report. |
| 2 | Phase 2 risk: claiming a pattern as cross-repo when it actually only appears in one repo with different framings in others | Promotion gate is binary: pattern must appear with strength ≥ 2 in ≥ 2 repos. Single-repo phenomena are valid synthesis findings but stay as candidates, not promoted patterns. The promotion column in patterns-matrix.md is the canonical record. |
| 3 | Phase 2 risk: confusing the matrix dimension ("which dimension does this pattern primarily affect?") with the source-observation dimension-guess (the guess on the raw observation) | The matrix row's dimension is the *final* dimension after cross-repo synthesis; the per-observation dimension-guess is provisional. Resolve in the matrix, not the source files. Each promoted pattern belongs to exactly one MOC. |
| 4 | Phase 2 risk: temptation to over-cite the cor-sys observations (12 of 43 = 28% of dataset) and underweight the abandonment-side observations from core-unified (11 of 43 = 26%) | Both ends of the maturity ladder are equally informative. core-unified's abandonment-diagnostics observations are the *negative control* and are required to claim H2 (publish-button satisfiability) at all. Synthesis must cite both ends, not just the cor-sys end. |

## Codebase Patterns

Reusable templates for outputs. Insert as encountered.

### Insight front-matter (standard)

```markdown
---
dimension: claude-to-user | user-to-claude | claude-to-claude | user-to-user
evidence-repos: [cor-sys, groundstate-protocol]
evidence-pointers:
  - cor-sys@commit-sha:path/to/file
  - groundstate-protocol#PR-12
monetization-score: 4/5  # pass threshold
applicability: solo-builder | small-team | enterprise
---
```

### Patterns-matrix row (standard)

```
| pattern | cor-sys | groundstate | chess-mind | core-unified | strength-score | promoted? | dimension |
|---------|---------|-------------|------------|--------------|----------------|-----------|-----------|
| <name>  | 3       | 2           | 0          | 0            | strong-2-repos | Yes       | user-to-user |
```

### cor-sys evidence pointer convention (now verified)

Format: `cor-sys@<short-sha>:path/to/file` or `cor-sys#PR-N` or `cor-sys#issue-N`. Verified valid across all 12 observations from Phase 1 cor-sys, and now across all 43 observations from Phase 1.

### Phase 2 observation-citation convention (added Phase 2)

When citing a source observation in synthesis.md or a MOC:

- Format: `<repo>@<HH:MM>` referring to the observation's timestamp in its `extracted-insights.md` file
- Example: `cor-sys@10:00` = the 2026-05-12 10:00 observation in `/research/cor-sys/extracted-insights.md`
- Example: `groundstate@11:05` = the 2026-05-12 11:05 observation in `/research/groundstate-protocol/extracted-insights.md`
- This shorthand pairs the cite to the file's heading, allowing fast lookup. Long-form `cor-sys@<sha>:path` is retained when citing the underlying git artifact directly.

## Session History

| Date | Phase | Focus | Outcome |
|------|-------|-------|---------|
| 2026-05-12 | Phase 0 | Scaffold | 30 files seeded; cross-references wired; commit `a648ff3` |
| 2026-05-12 | Phase 1 cor-sys | Code+git+PR+issues deep dive | 6 artifacts written (timeline 9.5KB, commit-archaeology 11.9KB, pr-patterns 9.2KB, issues-themes 2.5KB, architecture-notes 12.7KB, extracted-insights 19.4KB); 12 raw observations with evidence pointers; commit `59a6e6f` |
| 2026-05-12 | Phase 1 → next | State update | MEMORY.md and LOG.md updated to reflect cor-sys complete |
| 2026-05-12 | Phase 1 groundstate-protocol | Lovable→Claude pivot + editorial voice + AI-cross-review study | 10 raw observations; identified Lovable-render/Claude-write coexistence pattern; first observed AI-cross-review event (Codex catching P1 race in PR#10) |
| 2026-05-12 | Phase 1 chess-mind-patterns | Bot-blast + 14-day silence + 72-minute resumption study | 10 raw observations; characterized resumption shape (additive, no bot-file deletions, wiring-seam-only); identified prototype-mode signature (zero PRs / issues / docs) |
| 2026-05-12 | Phase 1 core-unified-consciousness | Negative control / publish-and-walk-away abandonment study | 11 raw observations; refuted Hypothesis C (template choice irrelevant); proposed 4-feature Tier classifier; isolated publish-button-satisfiability as the strongest single predictor |
| 2026-05-12 | Phase 2 cross-repo synthesis | patterns-matrix + synthesis narrative + 4 MOCs populated | 35 matrix rows; 17 promoted patterns across 4 dimensions; H1/H2/H4/H5 confirmed, H3 refined; top 5 playbook candidates named for Phase 4; this commit |
