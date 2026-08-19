# Pre-Registered Prediction — Does F5 Beat F1–F4?

> Registered **2026-08-19**, before any of the outcome is knowable. Resolves **2026-11-17** (90 days).
> Frozen inputs: `scores-2026-08-19.tsv` (31 repos, tiers under both rules).
>
> This exists because `f5-rescore-2026-08-19.md` §5 cannot validate F5 — F5 is a proxy for the
> signal the ground-truth labels are defined by, so scoring it against them is circular. A
> prediction about events that have not happened is the only non-circular test available.

## The claim under test

F5 (external consumer) plus a recency term makes the tier classifier a better predictor of which
repos actually advance than F1–F4 alone.

## Primary test

For each of the 31 repos, count **substantive commits** landed between 2026-08-19 and 2026-11-17
(excluding merges, dependabot, whole-tree syncs, and Lovable `template:` seeds — the same filter
`collect-outcome-evidence.sh` already applies), across all refs.

Compute Spearman ρ between commit count and tier rank under each rule:

- **ρ_new** — tier under the F5 rule (A=4, B=3, C=2, D=1)
- **ρ_old** — tier under the F1–F4 rule

> **PREDICTED: ρ_new > ρ_old.**
>
> **FALSIFIED if ρ_new ≤ ρ_old.** In that case F5 adds nothing, and the honest response is to drop
> it and re-open the error analysis — not to adjust the rule until it passes.

## Secondary tests

| # | Prediction | Falsified if |
|---|---|---|
| S1 | ≥1 of the 2 new-A repos (`MATI`, `anti-silo`) receives substantive commits | neither does |
| S2 | ≤2 of the 12 new-C repos receive substantive commits | ≥3 do |
| S3 | `groundstate-protocol` — new-B, F5=0, but committed to 17 days ago — advances. It is the clearest case of the rule and recency disagreeing | it does not advance |
| S4 | Of the 9 old-A repos demoted to B, ≤3 advance | ≥4 do |

## Power, stated in advance

With 2 repos in class A, S1 has almost no statistical power — one repo going quiet flips it. The
primary test uses all 31 repos and one continuous outcome, which is why it is primary. Even so,
n=31 with a heavily skewed outcome (most repos will land zero commits) means a ρ difference under
about 0.15 should be read as noise, not as a result. **This test can refute F5. It cannot
establish it — at best it fails to refute it.**

## Contamination rules

1. **The scores file is frozen.** `scores-2026-08-19.tsv` is committed today. Re-scoring a repo
   after seeing its outcome invalidates the test.
2. **Do not act on the prediction in a way that causes it.** Working on `MATI` or `anti-silo`
   *because* they were scored A would manufacture the result. All three A repos were already
   active before being scored, so ordinary work on them is expected — but any work started *in
   order to* satisfy S1 must be recorded here and the test excluded.
3. **No rule tuning before resolution.** If F5's definition changes before 2026-11-17, this
   prediction is void and must be re-registered against the new definition.

## Resolving it

```bash
REF_DATE=2026-11-17 bash scripts/score-portfolio.sh <name> <path>   # re-score (for the record)
python3 scripts/resolve-prediction.py                               # computes both rho values
```

`scripts/resolve-prediction.py` reads the frozen TSV, counts commits in the window, and prints
both correlations with the verdict. It is written now, against unknown data, so the analysis
cannot be chosen after seeing the outcome.

## Registered scores

Frozen at `ground-truth/scores-2026-08-19.tsv` (31 rows). Class counts:

| Rule | A | B | C | D |
|---|---|---|---|---|
| old (F1–F4) | 13 | 12 | 0 | 6 |
| new (F1–F5) | 2 | 11 | 12 | 6 |

---

## Amendment — same day, 2026-08-19

Nine repositories that no scan had seen were found and scored after this prediction was written
(`research/portfolio-scan/2026-08-19-cohort2.md`). They are registered here as **cohort 2**, in a
separate frozen file: `ground-truth/scores-2026-08-19-cohort2.tsv`.

**Why this does not contaminate the test.** The prediction window opens 2026-08-19 and no outcome
exists for any repo yet — there is nothing to have seen. Cohort 2 was scored by the same script on
the same rule, and `scores-2026-08-19.tsv` was not edited. Both files are frozen from now.

**What changes.** The A class goes from 2 repos to 3: `pre-call` joins `MATI` and `anti-silo`.
Two of the four repos that are actually active (`pre-call`, `proofminer`) were absent from the
original 31, which means the original registration was made on a portfolio missing half its live
work — a limitation worth stating even though the fix arrived the same day.

| Cohort | repos | new-A | new-B | new-C | new-D |
|---|---|---|---|---|---|
| 1 (original) | 31 | 2 | 11 | 12 | 6 |
| 2 (amendment) | 9 | 1 | 6 | 0 | 2 |
| **combined** | **40** | **3** | **17** | **12** | **8** |

**Resolution.** The primary test runs on the **combined 40**, which is the stronger test and was
fixed before any outcome existed. `resolve-prediction.py` accepts multiple score files:

```bash
python3 scripts/resolve-prediction.py ground-truth/repo-paths.tsv \
  ground-truth/scores-2026-08-19.tsv ground-truth/scores-2026-08-19-cohort2.tsv
```

Secondary tests S1–S4 keep their original thresholds and are read against cohort 1 alone, since
they were stated against those class sizes. S1 additionally gets a cohort-2 reading (1 of 1).
