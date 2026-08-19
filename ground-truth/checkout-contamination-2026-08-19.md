# Verified before the round closed: the session contaminated the artifact being rated

One round-5 rater scored items 4 and 5 (`claude-branch-as-default-branch` @ CRM_Google_ai and
@ agency-insight-analyzer) as **3**, citing `git rev-parse --abbrev-ref HEAD` returning
`claude/analyze-additional-repos-v0s691`.

That is **this session's own branch**. The task instructions required a branch of that name in
every repo, and the harness checked it out in all 40. So `git rev-parse HEAD`,
`git branch --show-current` and `git status` return an agent branch name in every repository in
the portfolio, whatever that repository's actual default branch is.

## Ground truth, from remote refs

```
CRM_Google_ai            origin/main            -> correct score 0
agency-insight-analyzer  origin/main            -> correct score 0
```

## Portfolio-wide re-check of the pattern (origin/HEAD, or the sole remote branch, excluding this session's)

Exactly **two** repositories of 40 have a genuine agent default branch:

```
Agent-Architect   origin/claude/agent-architect-test-fixtures-mA6dz   (no main/master exists at all)
keepath           origin/claude/modular-system-design-kJg0a           (origin/HEAD points at it)
```

Both were already scored 3. **The promotion `claude-branch-as-default-branch` = strong-2-repos
survives, and now rests on remote refs rather than on a local checkout.** No promotion is lost.

## Why this is worse than the injected-text leak

The `CLAUDE.md` leak contaminates what a rater *knows*. This contaminates what a rater *observes*.
Every rating round in this session has been run against working trees the rating session itself
modified, and no protocol step ever checked for it. It was found only because one rater quoted the
command it ran instead of asserting a conclusion — the same `BLINDING`-line discipline, applied to
evidence rather than to context.

## The second rater saw through it

The other rater scored items 4 and 5 as **1**, not 3, and said why:

> "git HEAD = refs/heads/claude/analyze-additional-repos-v0s691, **but a trunk exists**: main
> (local + origin/main) holds the Initial-commit lineage and points at the same tip d65f1cc —
> 'no trunk was ever created' fails; only the HEAD label matches."

So the contamination is detectable from inside the repo by anyone who checks `origin/` instead of
the checked-out label. One rater checked and one did not. **The contamination is real either way;
what varied is whether the rater verified before concluding.**

## A leak channel nobody had enumerated

The same rater disclosed something no prior round caught: the parent session's **task list** is
injected into subagents as recurring system reminders, carrying 18 task titles verbatim —
"Deep-dive _crm: archaeology + architecture", "Re-test 17 promoted patterns + promote new ones in
patterns-matrix", "Design the ground-truth rubric with disjoint evidence", "Score the F1-F4
classifier against the labels".

Every blinding audit so far enumerated `CLAUDE.md` and memory files. **None of them looked at the
task list**, which names the deep-dived repos and the fact that patterns are scored and promoted —
context adjacent to the item set in every round run this session.
