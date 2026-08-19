# Blind Rater Protocol — Cross-Family Pattern Strength

> Ported from `_crm/docs/G1_KILLTEST_2026-06-14.md`, which asked whether its ICC(2,1)=0.89 was
> construct reliability or Opus self-consistency, rated five items blind across three model
> families, and found the figure collapsed from 0.94 within-family to **0.115** across families.
>
> Established 2026-08-19. The question here is the same one: **are this repo's pattern strengths a
> property of the repos, or of the model that scored them?**

## 1. What is being rated, and why this and not the labels

`ground-truth/results-2026-08-19.md` measured the tier classifier, but its labels are *derived in
code* by `score-classifier.py::derive()` from mechanical signals — no model judgment enters, so
there is no rater variance to measure there.

Model judgment enters this repository in exactly one load-bearing place: the **0–3 strength scores**
in `research/cross-repo/patterns-matrix.md`. Thirty-three promoted patterns rest on them, the
promotion rule is `strength ≥ 2 in ≥ 2 repos`, and every one of those scores was assigned by a
single model in a single session. That is the cell `_crm` would call untested.

## 2. The scale, handed to every rater verbatim

```
0 — absent. No evidence in the repo at HEAD.
1 — weak. A faint trace; one occurrence; not load-bearing for the workflow.
2 — moderate. Multiple occurrences; load-bearing; visible to a reader skimming the repo.
3 — strong. A defining feature of the repo's identity at HEAD; cannot be missed.
```

Taken unchanged from the legend already in `patterns-matrix.md`, so the scale is not a variable.

## 3. Blinding

`_crm`'s confound #1 was rubric mismatch: its Opus raters used the full project rubric while the
other families used a condensed one, so some disagreement was wording rather than model. That is
avoided here by construction:

1. Every rater receives **the identical prompt** — same pattern definitions, same scale, same repo
   paths.
2. Raters are pointed at the **target repositories only**. They are instructed not to open the
   `lessons` repo, which is where the existing scores live. A rater that never sees
   `patterns-matrix.md` cannot anchor to it.
3. Raters are not told what the incumbent score is, that an incumbent exists, or which patterns
   were promoted.

## 4. Declared in advance

- **The incumbent scores are frozen** in git before any rater runs (`git log` on
  `research/cross-repo/patterns-matrix.md` establishes the timestamp).
- **The statistic** is fixed before the data arrives: exact agreement, mean absolute difference,
  and ICC(2,1) two-way random, absolute agreement, single measure, over the rater × item matrix.
- **The read**: ICC ≥ 0.75 is conventionally "good"; ≤ 0.5 is poor. A cross-family ICC that lands
  far below the within-family figure means the strengths are a property of the rater.
- **What this cannot show.** All raters available here are Anthropic families, so this is a
  within-vendor test, exactly as `_crm`'s was. It also conflates family with capability — the same
  confound `_crm` named — and each family makes a single pass, so within-pass anchoring is not
  controlled.

## 5. Items

Fifteen pattern × repo cells, chosen because each one is load-bearing: it sits at or above the
promotion threshold, or it is the second repo that carried a pattern over the line. Listed in
`ground-truth/interrater-2026-08-19.md` with each rater's score beside the incumbent.

## 6. Re-running

```bash
python3 scripts/score-interrater.py ground-truth/interrater-2026-08-19.json
```
