# cor-sys — Issues Themes

> Layer: Claude. Source: list_issues state=OPEN and state=CLOSED on `ereztash/COR-SYS`.

## Headline

**Zero issues. Ever.** Both `state=OPEN` and `state=CLOSED` return totalCount=0. The repo has 71 commits and 16 PRs but no GitHub issues — neither opened nor closed.

## Theme clusters

| Theme | Issues | Resolution mode | Notes |
|---|---|---|---|
| (none — sparse) | -- | -- | Issue tracker is unused as of 2026-04-09 |

## Why this matters

This is a **PR-driven, single-operator repo**. The patterns we expect from a team workflow (issues -> triage -> labels -> assignment -> closed-by-PR) are absent because the team is size 1 plus AI surfaces. The functions that issues normally serve are distributed elsewhere in cor-sys:

| Function issues normally serve | Where it lives in cor-sys instead |
|---|---|
| Bug log | `LOG.md` -> 'Anti-Patterns' table (12 numbered rows with root-cause + rule) |
| Backlog / TODO | `docs/product-roadmap.md` (12.8 KB), `docs/task-table.md` (5.7 KB), `docs/roadmap-to-deploy.md` (7.7 KB) |
| Reproduction reports | Commit bodies and Claude-session links (`https://claude.ai/code/session_*`) inside PRs |
| 'Won't fix' decision log | `docs/product-decisions.md` (5.5 KB) |
| Discussion threads | none — but `docs/calibration-casebook.md` (14.7 KB) captures shipped reasoning |
| Help / how-to | `CLAUDE.md` + `index/CLAUDE.md` + `skill.md` |

## Implications for synthesis

1. **`issues_count = 0` is a feature, not a gap.** It indicates a workflow where: (a) the operator does not need a 'request a feature' inbound channel, (b) bugs become commits within the same session they are discovered, (c) the AI surface (Claude Code or Cursor) does not auto-open issues — only auto-opens PRs.
2. **The Anti-Patterns table in LOG.md is the *de facto* closed-issues archive.** Each row carries the structure `What went wrong / Root cause / Rule`. 12 rows as of master, accumulating monotonically.
3. **For cross-repo comparison:** if another repo in the set *does* have issues, the comparison axis is 'where does bug knowledge accumulate' — LOG.md vs Issues vs commit messages. cor-sys's answer: LOG.md (canonical), commit messages (chronological), PRs (large-batch).

## Data-quality note

The MCP `list_issues` call returns `{"issues":[],"totalCount":0}` for both OPEN and CLOSED. Pagination cursor returns `hasNextPage: false`. The result is authoritative — there is no 'maybe issues exist in another view' caveat needed.
