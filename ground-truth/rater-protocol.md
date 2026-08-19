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

**Blinding failed in both 2026-08-19 runs and instruction cannot fix it.** The harness auto-injects
this repo's `CLAUDE.md` into every subagent before its first tool call. It names
`measured stopping rule + DoD` for pre-call, `6.7×` (anti-silo's own undercount figure) and
`proofminer … hidden-agent`, priming at least six items. Two raters of three reported this
unprompted; the third asserted it had not read the repo, which was true and beside the point.
**A self-report of blinding is not evidence of blinding.**

**Round 3 tested the structural fix and it also failed.** `CLAUDE.md` was moved out of the
repository and confirmed absent from disk for the whole run; all three raters received its full
contents anyway and quoted them back. The harness assembles project instructions at **session**
level, not by per-subagent disk read. **No in-session subagent can be blinded by any means available
from inside the session.** A genuinely blind rating requires a rater outside it — a separate
session whose project roots do not include this repo.

**What does work, and is now mandatory:** every rater must emit, as its first output line,
`BLINDING: <verbatim account of what was injected>`. Round 2's raters offered assurances; round 3's
quoted the leak, which let the affected items be identified and discounted. The leak is then
measured rather than assumed, and items its text names are excluded from the agreement claim.

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

**Amended after the first run — applies to the NEXT run, not retroactively.** Selecting only
load-bearing cells means selecting only cells already scored 2 or 3. The 2026-08-19 set had
incumbent sd = 0.34 with 13 of 15 items scored 3, and on a range-restricted set ICC collapses even
under near-perfect agreement — it returned 0.143 between two raters agreeing on 12 of 15 items.
**At least a third of items must be cells the incumbent scored 0 or 1.** The statistic was
pre-registered correctly and handed a sample it cannot speak about; that is a selection defect, and
it is fixed here rather than by changing the statistic after the fact.

## 6. Re-running

```bash
python3 scripts/score-interrater.py ground-truth/interrater-2026-08-19.json
```
