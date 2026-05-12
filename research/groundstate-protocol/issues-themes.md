# groundstate-protocol — Issues Themes

> Layer: Claude. Source: list_issues state=OPEN and state=CLOSED on `ereztash/groundstate-protocol`.

## Headline

**Zero issues. Ever.** Both `state=OPEN` and `state=CLOSED` return `totalCount=0` with `hasNextPage=false`. The repo has 40 commits and 10 merged PRs but no GitHub issues — neither opened nor closed.

This is the **same pattern as cor-sys** (which also had zero issues across 71 commits). The PR-driven, single-operator + AI-surfaces model does not produce GitHub issues.

## Theme clusters

| Theme | Issues | Resolution mode | Notes |
|---|---|---|---|
| (none — sparse) | -- | -- | Issue tracker is unused as of 2026-05-06 |

## Where issue-shaped knowledge lives instead

Unlike cor-sys (which routes issue-shaped knowledge through `LOG.md` + `docs/`), groundstate-protocol has **no documented learning surface**. There is no CLAUDE.md, no LOG.md, no .claude/ directory, no `docs/` folder (only `README.md` at root). The functions GitHub Issues normally serve are distributed thus:

| Function issues normally serve | Where it lives in groundstate-protocol |
|---|---|
| Bug log | **Commit messages** — e.g. `f77d0a9` 'Fix duplicate-submit risk in DiagnosticForm step-two skip path' documents the bug, root cause, and fix in 18 lines of commit body |
| Backlog / TODO | **PR body 'flags' sections** — PR#9 and PR#10 each have `## דגלים` lists naming pending items (`ACCESS_KEY` placeholder, `MEASUREMENT_ID` placeholder, ClientProof attribution still anonymous, founder photo path) |
| Reproduction reports | **Codex review threads on PRs** — PR#10 references 'Codex review on PR #10 caught a real P1' but the Codex thread itself is not visible through the public list_pull_requests output |
| 'Won't fix' decision log | **Commit body reasoning** — e.g. `1756944` body documents WHY 'hidden discipline' frame was discarded after 42 minutes (academic, heavy Hebrew, CV-like, wrong grammar) |
| Discussion threads | none |
| Help / how-to | `README.md` only (2.1 KB) |

## Implications for synthesis

1. **`issues_count = 0`** is again confirmed as a single-operator-AI-paired repo signature. This is the second of two cor-sys-cohort repos to show the pattern. It is unlikely any other repo in the operator's set has issues either.
2. **groundstate-protocol does NOT have a LOG.md or anti-pattern table.** Where cor-sys accumulates 12 numbered anti-patterns across sessions, groundstate-protocol leaves its learnings *only* in commit and PR bodies. The bug-knowledge here is **chronologically ordered (commit graph)** but not **typologically clustered (no anti-pattern table)**. A future Claude session opening this repo cold cannot navigate to 'lessons from past sessions' the way cor-sys can.
3. **The Codex review on PR#10 is the only observable cross-AI review event.** The flagged P1 (duplicate-submit race in DiagnosticForm's step-two skip path) was a real concurrency bug — the kind that *would* normally be opened as an issue in a team workflow. Here it was caught in-PR, fixed in-PR, with the fix's commit body explicitly thanking Codex.

## Data-quality note

The MCP `list_issues` call returns `{"issues":[],"totalCount":0,"pageInfo":{"hasNextPage":false,"hasPreviousPage":false}}` for both OPEN and CLOSED. Pagination cursor confirms no further pages. The result is authoritative.

## Cross-repo comparison anchor

| Repo | Issues | LOG.md present | Anti-pattern table | Cross-AI review observed |
|---|---|---|---|---|
| cor-sys | 0 | yes (`LOG.md` 7.3 KB) | yes (12 rows) | no (single-AI: Claude or Cursor, never both reviewing each other) |
| groundstate-protocol | 0 | **no** | **no** | **yes — Codex caught P1 on PR#10, Claude fixed** |

The absence of LOG.md in groundstate-protocol may be intentional (the repo is a brand surface, not a tool — its 'state of art' is the rendered page, not a process artifact). But the cost is real: bug knowledge here exists only as commit-graph archaeology.
