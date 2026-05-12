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
| Current phase | Phase 1 — cor-sys done, groundstate next | 2026-05-12 |
| cor-sys commit count (verified) | 71 commits, matches Phase 1 survey | 2026-05-12 |
| cor-sys PR count (verified) | 16 PRs (13 merged, 3 closed unmerged) | 2026-05-12 |
| cor-sys issues count (verified) | 0 (open + closed combined) | 2026-05-12 |

## Pre-Research Validation Protocol

Before deep-diving into a repo, verify (≤2 min):

```
1. mcp__github__list_branches(owner, repo) — confirm branch landscape
2. mcp__github__list_commits(owner, repo, perPage=100) — confirm commit count matches expectations
3. mcp__github__list_pull_requests(owner, repo, state='all') — confirm PR count
4. mcp__github__list_issues(owner, repo, state='OPEN'|'CLOSED') — confirm issue presence
```

Mismatch with expectations (Phase 1 exploration data) → re-read original survey before proceeding.

## Anti-Patterns (Rules)

Each anti-pattern is a documented mistake + rule. Append, never edit.

| # | Mistake | Rule |
|---|---------|------|
| 1 | Phase 1 cor-sys deep-dive agent hit rate limit at end of session before returning summary, but had already written all 6 artifacts | Always verify artifacts via `get_file_contents` even if agent returned mid-failure; trust the GitHub state, not the agent's status report. |

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
| pattern | cor-sys | groundstate | chess-mind | core-unified | strength-score |
|---------|---------|-------------|------------|--------------|----------------|
| <name>  | 3       | 2           | 0          | 0            | strong-2-repos |
```

### cor-sys evidence pointer convention (now verified)

Format: `cor-sys@<short-sha>:path/to/file` or `cor-sys#PR-N` or `cor-sys#issue-N`. Verified valid across all 12 observations from Phase 1 cor-sys.

## Session History

| Date | Phase | Focus | Outcome |
|------|-------|-------|---------|
| 2026-05-12 | Phase 0 | Scaffold | 30 files seeded; cross-references wired; commit `a648ff3` |
| 2026-05-12 | Phase 1 cor-sys | Code+git+PR+issues deep dive | 6 artifacts written (timeline 9.5KB, commit-archaeology 11.9KB, pr-patterns 9.2KB, issues-themes 2.5KB, architecture-notes 12.7KB, extracted-insights 19.4KB); 12 raw observations with evidence pointers; commit `59a6e6f` |
| 2026-05-12 | Phase 1 → next | State update | MEMORY.md and LOG.md updated to reflect cor-sys complete; this commit |
