# chess-mind-patterns — Pull Request Patterns

## Summary

**Zero pull requests, ever.** `mcp__github__list_pull_requests(state='all', perPage=100)` returns `[]`. No open, no closed, no merged, no draft. The single branch `main` contains the entire commit graph; there is no `claude/*` auto-branch, no `feature/*` branch, no Lovable working branch. All 175 commits land directly on `main`.

## Comparison to peer repos

| Repo | PRs (all states) | Branches | Workflow shape |
|---|---|---|---|
| `cor-sys` | 16 (13 merged, 3 closed-unmerged) | many `claude/*` auto-branches | Claude Code's `/cor-ship` opens a PR per push; human merges in 8-11s median |
| `groundstate-protocol` | 10 (per prior phase) | several | Mixed direct + PR |
| `chess-mind-patterns` | **0** | 1 (`main` only) | Direct-to-main, two committer surfaces (Lovable agent + GitHub web/local CLI) |

The PR-absence is a *data point*, not an oversight. Two facts explain it:

1. **Lovable's gpt-engineer-app commits directly to the default branch** — it does not open PRs. All 171 bot commits land on `main` without a PR ceremony. This is the Lovable platform default: edits in the Lovable web UI commit straight through.
2. **The operator's three commits also land directly on `main`** — they are authored as `ereztash`, not as a `claude/*` auto-PR from Claude Code. This implies the operator ran Claude Code locally (or in a session that committed-and-pushed without the PR step), or used `git push` from a shell rather than a `/cor-ship`-style slash command.

Notably the cor-sys operator *did* use `/cor-ship` in cor-sys (yielding the 8-11s median TTM ritual). The same operator, in the same week (cor-sys's PR#16 absorbed CampaignCraft on 2026-04-09; chess-mind-patterns' last commit was 2026-03-23), shipped chess-mind-patterns *without* that workflow. The simplest hypothesis: the chess-mind-patterns project was not yet bootstrapped with cor-sys's `.claude/commands/cor-ship.md` slash command. cor-sys's slash commands were added 2026-03-17 (`50f9166`), six days before the chess-mind-patterns resumption — early enough that the operator *could* have adopted them but apparently chose not to for a hobby/prototype repo.

## What PR absence says about workflow maturity

PRs in single-operator AI-augmented repos provide three things: (a) an audit/notarization trail visible in the GitHub UI; (b) a place to attach a CI run; (c) a chance for the operator to read the diff before merge. chess-mind-patterns ships none of these: there is no CI workflow file (no `.github/workflows/`), no audit trail (commits are notarized only by their authorship), and the operator presumably read the diff in their Claude Code session rather than on GitHub.

The trade-off:

- **Pro:** Lower ceremony — the 72-minute three-commit sprint would have been ~5-10 minutes longer with PRs at cor-sys's 11s median TTM, ~30 minutes longer if PRs blocked on a CI run.
- **Con:** No artifact survives to remind the operator (or a future collaborator) of the resumption sprint's scope. The three commit subjects are the only structured record.

For the resumption-vs-abandonment playbook, the PR absence is *neutral* — both abandoned and resumed Lovable repos in this 4-repo set are likely to share zero PRs (since Lovable itself does not open them). The differentiator is the *commit-subject prefix*: bot-only repos stop at `Add X` / `Save plan` subjects; resumed repos add `feat:` blocks with declared scopes.

## Branch hygiene

Only `main` exists. No stale `claude/*`, no `lovable-working/*`, no `cursor/*`. The repo is single-tip throughout its 16-month wall-clock lifespan. This is the cleanest possible branch state — but it is achieved by *never branching*, not by disciplined cleanup.
