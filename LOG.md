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
| Current phase | Phase 0 → Phase 1 (cor-sys) | 2026-05-12 |

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
| 1 | _(seed — no mistakes recorded yet)_ | _(rule will appear when first mistake is documented)_ |

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

## Session History

| Date | Phase | Focus | Outcome |
|------|-------|-------|---------|
| 2026-05-12 | Phase 0 | Scaffold | 30 files seeded; cross-references wired |
