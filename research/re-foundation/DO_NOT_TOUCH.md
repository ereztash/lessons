# DO NOT TOUCH — Artifacts Protected From the Re-Foundation

> Built 2026-09-03. §17 of the brief: research may inform product, and product convenience may
> never alter historical evidence. This file names what may not be edited, moved, renamed or
> "cleaned up" by any migration, and what it would cost to break each one.
>
> A migration that needs one of these to move must move a **pointer**, not the artifact.

---

## 1. Hard freeze — editing these destroys a measurement in progress

| Artifact | Why | What breaks |
|---|---|---|
| `ground-truth/prediction-2026-08-19.md` | a pre-registered prospective test, **open, resolving 2026-11-17**. Today is 2026-09-03; **75 days remain** | its own contamination rule 3: *"If F5's definition changes before 2026-11-17, this prediction is void and must be re-registered."* It is the repository's only non-circular test |
| `ground-truth/scores-2026-08-19.tsv` | the frozen registered scores, cohort 1 (31 repos) | contamination rule 1: *"Re-scoring a repo after seeing its outcome invalidates the test"* |
| `ground-truth/scores-2026-08-19-cohort2.tsv` | frozen scores, cohort 2 (9 repos) | same |
| `scripts/resolve-prediction.py` | the analysis, written before the data exists, so the analysis cannot be chosen after seeing the outcome | editing it after 2026-08-19 converts a preregistered analysis into a post-hoc one |
| `scripts/score-portfolio.sh` | it defines F5 operationally | changing F5's definition voids the prediction |

**Also frozen by rule 2 of the same document:** do not start work on `MATI`, `anti-silo` or
`pre-call` *in order to* satisfy secondary test S1. Ordinary work on them is expected and fine; work
motivated by the prediction must be recorded in the prediction file and the test excluded.

## 2. Frozen evidence — the answer key and its derivation

| Artifact | Why |
|---|---|
| `ground-truth/rubric.md` v1.1 | the labelling rule. `score-classifier.py` asserts `rubric_version` matches, so a rubric change cannot be scored against stale labels by accident. Changing it requires a new version and a new label set, never an edit |
| `ground-truth/labels-2026-08-19.json` / `.md` | the 10-repo answer key, including the §3 adjudications recorded rather than folded into the numbers |
| `ground-truth/results-2026-08-19.md` | the first and only accuracy measurement in this repository. **Every "provisional" marker elsewhere in the corpus traces to it** |
| `ground-truth/f5-rescore-2026-08-19.md` | the rescore of all 31, including its own statement that F5 is not validated |
| `ground-truth/gate-reliability.md` | the P×C measurement of this repository's own gates, with `LOG.md` as its denominator. **If `LOG.md`'s anti-pattern table is ever renumbered or edited, this measurement silently becomes wrong** |
| `ground-truth/bypass-log.md` | the waiver register. A bypass log that can be edited is not a bypass log |

## 3. Append-only — may grow, may never be rewritten

| Artifact | Rule | Enforced by |
|---|---|---|
| `LOG.md` anti-pattern table (23 entries) | append only, never edit a past row; **never renumber** | `pipelines/execution-rules.md` Rule 7; `gate-reliability.md` §1 depends on the numbering |
| `LOG.md` session history | append only | Rule 7 |
| `research/cross-repo/patterns-matrix.md` §2.2 | the retraction of a correction that was itself wrong, written in place *because* a retraction that erases what it retracts teaches nothing | LOG anti-pattern #23 |
| `insights/*/score-history` | append, never overwrite | `check-lessons-contract.py` R3 |

## 4. Superseded but protected — the record of a thesis that was refuted

These are marked `SUPERSEDE` or `HISTORICAL` in `ASSET_REGISTER.md`. **Superseded is not deletable.**
Each is the primary evidence for a transition in `PRODUCT_LINEAGE.md`.

| Artifact | What it is evidence of |
|---|---|
| `saas/spec/01-product-thesis.md` | what was believed about the classifier before it was measured |
| `saas/spec/07-moat.md` | a moat argument built on an unmeasured instrument. It is the corpus's best worked example of the failure `THESIS_TEST.md` was written to avoid |
| `saas/spec/11-conviction-statement.md` | confidence stated in advance and then refuted, beside an uncertainty list that proved accurate. **The most instructive single document in `saas/`** |
| `saas/spec/09-risk-register.md` | ten risks, none of which was "the classifier may be inaccurate", which is what happened |
| `research/portfolio-scan/26-repos.md` | the n=25 scan. It is the **input to the out-of-time test** in `results-2026-08-19.md` §4; deleting it removes the only contamination-proof prediction the corpus has resolved |
| `research/portfolio-scan/hypothesis-validation.md` | H1–H8 at n=25 |
| `research/cross-repo/synthesis.md` | the Phase 2 verdicts at n=4 |
| `handoff/01`–`05` | the prompt sequence that generated Phase B. It is the provenance of the RepoHealth thesis |

## 5. Negative controls and hypotheticals

| Artifact | Why it is protected |
|---|---|
| `research/core-unified-consciousness/` | the corpus's **only abandonment negative control**. LOG anti-pattern #4: H2 cannot be claimed at all without it |
| `research/self-application/maya-walkthrough.md` | explicitly hypothetical. LOG #9 forbids citing it as data. **Protected so the marking survives**, not because the content is valuable |
| `All_Erez-s_Connections` as the true-negative control in `detect-agent-authorship.sh` | removing it removes the detector's only demonstrated negative |

## 6. Rules that a migration must carry forward, not just files

A file move can silently drop an invariant. These four must be re-asserted wherever their subject
lands:

1. **A green check never observed to go red is not evidence.** Every gate is fired once on a
   deliberately broken input before its passing is believed. (`gate-reliability.md` §3, LOG #22)
2. **`evidence-resolves-to` is measured, not asserted.** (`check-lessons-contract.py` R1)
3. **A ground-truth label may never be used as evidence for the feature it was defined by.**
   (LOG #15)
4. **Never state an AI-contribution figure from `git log --author` alone.** Run both detectors and
   report a range when cadence bursts exceed identified AI commits. (LOG #11, `CLAUDE.md`)

## 7. What is explicitly **not** protected

So the freeze cannot be used to block necessary work:

- `README.md`, `CLAUDE.md`, `MEMORY.md`, `skill.md` — current-facing, must be updated, and three of
  the four are measurably stale (`CONTRADICTIONS.md` §3–§4).
- `.github/workflows/node.js.yml` — it should be fixed, and its 14 failed runs are already recorded
  in `BASELINE.md` §2 and in `CONTRADICTIONS.md` §1, so fixing it destroys no evidence.
- `saas/app/src/*`, `saas/scanner/src/*` — code, not evidence. Subject to the migration plan.
- `products/pricing-hypotheses.md`, `products/launch-checklist.md` — hypotheses with a zero
  denominator; may be superseded openly.
- The four dimension MOCs — navigation.

## 8. The single sentence

> **Nothing that was measured, frozen, predicted, refuted or retracted may be edited to make the
> repository look more coherent. Everything that merely states a current belief may be.**
