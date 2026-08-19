# Cross-Family Blind Rating, Round 2 — With the Range Fix

> Item set frozen at `238b427` before any rater ran; statistic committed at `10b8007` before the
> first run. Both checkable in git. Data: `interrater-round2-2026-08-19.json`.
> Reproduce: `python3 scripts/score-interrater.py ground-truth/interrater-round2-2026-08-19.json`.
>
> Round 1 returned an uninformative ICC because I selected only load-bearing cells, all scored 2–3.
> This set is 18 cells, **10 of them scored 0–1** by the incumbent. Incumbent sd rises 0.34 → 1.30.

## 1. The result inverts round 1

| | exact | mean \|diff\| |
|---|---|---|
| opus-control (same family as incumbent) | 8/18 (44%) | 0.89 |
| sonnet | 10/18 (56%) | 0.67 |
| fable | 7/18 (39%) | 0.83 |

| ICC(2,1) | |
|---|---|
| **across the three blind raters** | **+0.801** — "good" by the threshold declared in advance |
| incumbent + the three raters | +0.652 |

Round 1's reading was "the strengths are a property of the rater." With range in the item set, that
is refuted. **The three raters agree with each other at 0.801, across three families and two
capability tiers. Adding the incumbent is what pulls the figure down to 0.652.**

The variance is not "which model." It is me.

## 2. Blinding failed, and not through the raters' fault

`opus-control` and `fable` each reported, unprompted, that this repo's `CLAUDE.md` was
auto-injected into their context before their first tool call. The harness loads project
instructions into every subagent; the instruction *"do not read `/home/user/lessons`"* was
therefore unenforceable, and I wrote it not knowing that. **This applies retroactively to round 1.**

Lines that leak into every rater and touch this item set:

| `CLAUDE.md` line | Items primed |
|---|---|
| `pre-call … Deep-dived — 224 commits, measured stopping rule + DoD` | 18 (`measured-stopping-rule @ pre-call`), 9 (`dod-…`) |
| `git log --author … undercounts by up to 6.7× and misses agent surfaces entirely` | 1 (`agent-identity-collapse @ anti-silo`) — **6.7× is anti-silo's own figure** |
| `proofminer … hidden-agent authoring` | items 7, 8, 10, 13–15 (all `@ proofminer`) |

Two of the affected items are among the four unanimous rater/incumbent agreements (#18, #9), which
is exactly where a prime would show. Their agreement should be discounted.

**One rater of three did not report the leak.** sonnet opened its answer asserting no `lessons`
content was read. That is not a lie — it did not *read* the repo — but the injection happened to it
too. A self-report of blinding is not evidence of blinding.

**The fix, for the next run**: run raters with a working directory outside this repo, or move
`CLAUDE.md` aside for the duration. Instruction cannot solve it.

## 3. My deviation has a direction

| Cells | n | mean(raters) − incumbent |
|---|---|---|
| I scored **0–1** | 10 | **+0.83** — the raters see more than I did |
| I scored **2–3** | 8 | **−0.58** — the raters see less than I did |

I polarize. Cells that carried a story I had just written get a 3; cells in repos I had already
characterised for some *other* pattern get a 0 without being looked at. Three independent raters,
agreeing with each other at 0.801, put both ends nearer the middle.

The two clearest cases sit on opposite sides:

- **#4 `contract-check-as-ci-gate @ Agent-Architect`: I scored 1, all three scored 3.** Verified —
  `.github/workflows/ci.yml` asserts `trap["pipeline_state"]["stage_3_afce_score"] == 60`, verifies
  `trap.json` was produced, greps that `Used by:` never leaks into the buyer deliverable, and runs
  `pipeline/tests/`. I had assigned this pattern to MATI and anti-silo and never looked here.
- **#12 `adversarial-second-surface @ anti-silo`: I scored 3, all three scored 1.** Their reason is
  the same one sonnet gave in round 1 and I recorded as unresolved: no surface is audit-only. fable
  put it plainly — *"the review doc was committed by the building surface itself and Claude ships
  many feat: commits."* opus added that anti-silo's trailers name **four** model versions
  (`Sonnet 5` ×13, `Opus 4.8 (1M context)` ×11, `Opus 5 (1M context)` ×9, `Fable 5` ×2), so the
  "second surface" is not one surface at all.

## 4. Changes adopted

**The adoption rule was not pre-registered — this is a limitation.** Having seen the data, I am
using the most conservative rule I can state: **adopt the median of the three raters only where all
three moved in the same direction from the incumbent.** Seven of eighteen items qualify.

| # | Cell | Was | Now |
|---|---|---|---|
| 1 | `agent-identity-collapse @ anti-silo` | 1 | **2** |
| 4 | `contract-check-as-ci-gate @ Agent-Architect` | 1 | **3** |
| 5 | `programmatic-branch-naming @ pre-call` | 0 | **2** |
| 7 | `measured-stopping-rule @ proofminer` | 0 | **1** |
| 8 | `bypass-log @ proofminer` | 0 | **1** |
| 11 | `adversarial-second-surface @ MATI` | 3 | **2** |
| 12 | `adversarial-second-surface @ anti-silo` | 3 | **1** |

Items where the raters split (3, 6, 10, 16, 17) keep the incumbent score, and the split is recorded.

### Consequences

- **`programmatic-branch-naming` promotes.** pre-call 0→2 alongside proofminer 3 clears
  `≥2 in ≥2 repos`. It was a single-repo candidate. **Promoted count 33 → 34.**
- **`adversarial-second-surface` is downgraded from `strong-3-repos` to `moderate-4-repos`.** Its
  cells are now MATI 2, anti-silo 1, Agent-Architect 2, proofminer 3, `_crm` 2. It still clears the
  promotion gate — **but only on cells that were never re-rated.** proofminer's 3 and
  Agent-Architect's 2 are incumbent scores from a rater with a measured polarising bias. That is
  now the first item for the next round, and the promotion should be read as provisional.
- `contract-check-as-ci-gate` and `agent-identity-collapse` were already promoted; both gain a repo.

## 5. Verdict

Round 1 said the strengths might be arbitrary. That was the wrong read, produced by a broken
sample. **The strengths are reproducible across model families — at ICC 0.801 — and the incumbent
scorer is a measurable outlier with a directional bias.** The correct action is not to distrust the
matrix but to distrust *me* on cells I have not been forced to defend.

Standing confounds: within-vendor only; one pass per rater; **blinding failed by harness injection**
on at least six items; the adoption rule is post-hoc; n=18.
