# core-unified-consciousness — Pull Request Patterns

> The repo has **zero** pull requests. This file documents the absence and uses cross-repo comparison to argue that the absence is structurally significant rather than incidental.

## Direct observation

```
mcp__github__list_pull_requests(owner='ereztash', repo='core-unified-consciousness', state='all')
=> []
```

Further confirmation:
- Only branch is `main` (`mcp__github__list_branches` returns a single entry with sha `ecd8b5c`).
- All 56 commits are direct-to-main with bot author identity.
- No `<sha> Merge pull request #N` commits anywhere in the log.
- No fork relationship, no head/base branch annotations.
- The HEAD commit `ecd8b5c` is reached via a direct `git push` from the gpt-engineer-app[bot], **not** via a PR merge.

## Why the absence is structural, not incidental

The gpt-engineer-app[bot] (Lovable's commit author identity) **never opens PRs**. Lovable's platform writes commits straight to `main` because the operator's view-of-truth is the Lovable preview, not a GitHub review thread. This is consistent across all four repos in the dataset:

| Repo | Total commits | PRs | PRs from gpt-engineer-app[bot] | PRs from human |
|---|---|---|---|---|
| cor-sys | many | many | 0 | many |
| groundstate | (small) | 0 | 0 | 0 |
| chess-mind-patterns | 175 | 0 | 0 | 0 |
| **core-unified-consciousness** | **56** | **0** | **0** | **0** |

The relevant axis is therefore not *whether the bot writes PRs* (it never does — confirmed by 4-of-4) but *whether the operator ever ran a workflow that produced PRs*. In cor-sys, the operator graduated from Lovable to Claude Code with branch-and-PR discipline, generating dozens of PRs (per the cor-sys deep dive). In the three Lovable-only repos, no PR discipline emerged because no human ever interacted via git.

## Interpretation: PR-count as resumption-readiness signal

A Lovable-bootstrapped repo with **non-zero human PRs** has crossed the threshold from 'platform prototype' to 'project the operator collaborates on'. PR creation requires:
1. A local clone (the operator's machine has the repo checked out)
2. A branch (the operator chose a name and a scope)
3. A push (the operator authenticated to GitHub directly)
4. A merge decision (the operator either self-merged or assigned a reviewer)

None of these four steps was ever taken on core-unified-consciousness. This is the **strongest single signal** that the repo lives entirely inside Lovable's surface — the operator never developed a workflow seam outside the platform. Compare chess-mind-patterns, which *also* has zero PRs but **does** have three direct-to-main human commits with `feat:` prefixes and `Co-Authored-By: Claude` trailers — those commits show the operator skipped the PR step (no review need, single-operator repo) but **did** develop a local-clone + Claude-Code workflow. core-unified-consciousness is one level below chess-mind on this axis: not only no PRs, but no human commits at all.

## Three-tier classification (with current placement)

- **Tier A (PR-disciplined)**: cor-sys. Operator runs branches, merges, reviews. Claude Code is a first-class committer.
- **Tier B (direct-commit resumed)**: chess-mind-patterns. Operator skips PRs but uses Claude Code via direct commits with `feat:` + `Co-Authored-By`.
- **Tier C (Lovable-only, abandoned)**: **core-unified-consciousness** and groundstate. No operator-side git activity ever. The bot owns the entire history.

The Tier C cohort is the negative control: zero human marks of any kind. Tier B is the boundary case (some human marks, but no PR). Tier A is the mature shape. *The 'never-resumed' cluster is exactly Tier C* — implying PR discipline is not necessary for resumption (chess-mind proves this) but **any** form of human git interaction *is*. The presence-vs-absence of human commits separates *will-resume* from *will-not-resume* more cleanly than any PR-related signal.

## What this rules out

- It rules out a story in which the operator started a local-clone workflow, hit a friction point, and gave up. They never started.
- It rules out a story in which a teammate was supposed to review. There is no teammate; the bot's commits never had a reviewer slot to fill.
- It rules out a story in which the project was a multi-author effort. There is exactly one human in the loop, and they only interacted with Lovable's web UI (proven by the 'Edited UI in Lovable' trailer on the HEAD commit).

## Recommendation for synthesis

When scoring future repos for resumption likelihood, the binary 'any human commit ever?' check is a more sensitive predictor than 'any PR ever?'. PRs are sufficient but not necessary. **Direct-to-main human commits are necessary for the Tier B → Tier A trajectory but not strictly necessary for the Tier C → Tier B promotion** (since Tier B itself can subsist on direct commits). The diagnostic question for any future Lovable repo is therefore: *does the commit log contain even one row whose author is not `gpt-engineer-app[bot]` and not `Lovable`?*

*Evidence pointers:* `core-unified-consciousness` branch listing (only `main`), `core-unified-consciousness@<all-56-shas>` (all bot-authored), `mcp__github__list_pull_requests` empty array.
