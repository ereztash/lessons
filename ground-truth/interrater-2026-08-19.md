# Cross-Family Blind Rating — Result

> Run 2026-08-19 under `ground-truth/rater-protocol.md`, which froze the incumbent scores at
> `6952391` and committed the statistic at `10b8007` **before any rater ran**. Both are in git.
> Data: `interrater-2026-08-19.json`. Reproduce: `python3 scripts/score-interrater.py`.
>
> The question, ported from `_crm/docs/G1_KILLTEST_2026-06-14.md`: **are this repo's pattern
> strengths a property of the repositories, or of the model that scored them?**

## 1. The numbers

| | exact agreement with incumbent | mean \|diff\| | max |
|---|---|---|---|
| sonnet | **12 / 15 (80%)** | 0.27 | 2 |
| haiku | 8 / 15 (53%) | 1.13 | 3 |

| ICC(2,1), two-way random, absolute agreement, single measure | |
|---|---|
| incumbent + sonnet (same capability tier) | **+0.143** |
| incumbent + haiku | +0.034 |
| sonnet + haiku (cross-family, blind) | **+0.068** |
| all three | +0.057 |

Against the threshold declared in advance (≥0.75 good, ≤0.5 poor), every figure reads **poor**.

## 2. The statistic I pre-registered is the wrong one for the sample I chose

Sonnet agrees with the incumbent on 12 of 15 items and its mean absolute difference is 0.27 — and
the ICC between them is **0.143**. Those two facts are not in tension; they expose a design error.

ICC asks how much of the total variance sits **between items** rather than between raters. The
incumbent scores in this set have almost none: mean 2.87, **sd 0.34**, and 13 of 15 items are a 3.
That is by construction — §5 of the protocol selected items *because* they were load-bearing, which
means every one had already been scored 2 or 3. On a range-restricted set, ICC collapses even under
near-perfect agreement.

So: **the pre-registered statistic is uninformative here, and the fault is mine, not the raters'.**
I chose the estimator correctly and then handed it a sample it cannot speak about. Recording this
rather than quietly switching to the agreement percentages is the whole point of pre-registering.

The measures that survive range restriction — exact agreement and mean \|diff\| — are in §1, and
they say something clear.

**Fix for the next run**, added to the protocol and *not* applied retroactively: the item set must
include cells scored 0 and 1. Roughly a third of items should be ones the incumbent rated absent.

## 3. What the agreement figures do show: a capability gradient, not model arbitrariness

| Rater | mean | sd | range |
|---|---|---|---|
| incumbent (opus 5) | 2.87 | 0.34 | 2–3 |
| sonnet | 2.73 | 0.57 | 1–3 |
| haiku | 1.87 | **1.41** | 0–3 |

Haiku's six large misses cluster on exactly one kind of item: those needing a **multi-step**
inspection — count commits by author, *and* check whether bodies are empty, *and* read branch
names. On item 1 it wrote *"Claude commits use noreply@anthropic.com identity with Co-Authored-By
trailers; no identity collapse detected"* — true of MATI's five Claude commits and blind to the
81 authored as `ereztash`, which is the entire pattern. On item 8 it reported no commercial
documents in Agent-Architect, which ships `product/OFFER.md`, `PRODUCT_DEFINITION.md` and
`landing.html`.

Those are **factually adjudicable and wrong**, not interpretive differences. This is `_crm`'s
confound #2 reproduced exactly — family conflated with capability — and it means the low ICC cannot
be read as "the strengths are arbitrary."

## 4. What the raters found that the incumbent did not

This is the part that justified the exercise regardless of any statistic.

**A verified correction, adopted.** Item 6, `contract-check-as-ci-gate @ anti-silo`: incumbent 2,
sonnet 3. Sonnet cited `tests/test_reachability.py` (every declared verdict state must be
reachable), `tests/test_grounding_permit.py` (an evidence-tier × audience permission matrix) and
`tests/test_file_length.py` (a 250-line module ceiling), all run by `python -m pytest -q` in
`.github/workflows/ci.yml`. **Verified — all three files exist and CI runs them.** The incumbent
score was an under-count of domain-policy gates. Corrected to 3 in the matrix.

**Evidence the incumbent missed.** On item 10 sonnet cited a *second* self-kill in `_crm` beyond
the G1 test the deep-dive found: `LOG.md:1824` "Adversarial falsification battery + the reproduced
headline number", recording `META-XGBoost … FAILED` and `BOTH … FAILED their permutation tests =>
the cross-domain transfer is first-person agency, not a deep construct. Reported as a negative, not
buried.` **Verified at those line numbers.** `_crm` has two self-refuting tests, not one.

**A count the incumbent got less precisely.** Item 14: sonnet reported 225 of 257 commits under
`Erez (COR-SYS)` **across two email addresses**. Verified: `Erez2812345@gmail.com` ×144 and
`hnoar.hr@gmail.com` ×81. The deep-dive recorded the name and missed the second address entirely —
which strengthens `per-project-git-identity` rather than weakening it.

**A fabricated citation, from the stronger rater.** Sonnet's justification for item 7 cites
`docs/OFFER.md` in anti-silo. **That file does not exist** — anti-silo's docs are
`ADVERSARIAL_REVIEW`, `CONSULTANT_PILOT`, `DISTRIBUTION`, `INVESTOR_BRIEF`, `LAUNCH_READINESS`,
`SECOND_BRAIN`. The score may still be right (`LAUNCH_READINESS.md` is real and was cited too), but
part of the reasoning was invented. A blind rater's justification is evidence to check, not evidence.
This is the failure `proofminer`'s reviewer was hired to stop — *"The text layer was fabricating
evidence. Stop it."* — appearing in a rater brought in to check for exactly that.

## 5. A substantive challenge the incumbent did not resolve

Items 3 and 4, `adversarial-second-surface`. Sonnet scored MATI **1** (incumbent 3) and anti-silo
**2** (incumbent 3), and gave the same reason for both: the pattern's definition says the second
surface *never ships a feature*, but in MATI the review branch also shipped a test suite, bug fixes
and a state migrator, and in anti-silo the richest adversarial episode was committed together with
its own fixes.

That is a real hit, made independently on two repos, against a definition this repo wrote. **The
promotion survives** — the rule is strength ≥2 in ≥2 repos, and anti-silo 2 plus proofminer 3 clears
it under sonnet's scores. The *strength* claim does not.

It is **not being resolved by rewriting the definition**, which is the move the prediction file
already forbids: tightening a rule after seeing a disconfirming rating is tuning until it passes.
The scores stay as scored, the challenge is recorded in the matrix, and it is now the first item for
a third rating or an explicit definitional decision.

## 6. Verdict

Ported honestly from `_crm`'s G1, which downgraded its own claim rather than defending it:

> **The pattern strengths in `patterns-matrix.md` have not been shown to be model-independent.**
> Within one capability tier they largely reproduce (12/15 exact, mean |diff| 0.27). Across tiers
> they do not. The pre-registered ICC cannot adjudicate this because the item set is
> range-restricted by my own selection, and that is a defect in this test, not a result from it.

Confounds that stand, all of them `_crm`'s: within-vendor only (all Anthropic); family conflated
with capability; one pass per family, so within-pass anchoring is uncontrolled; n=15.

What is *not* in doubt after this run: one incumbent score was too low, `_crm` has a second
self-kill nobody had recorded, and the stronger rater fabricated a file path. All three were found
by letting a different model look.
