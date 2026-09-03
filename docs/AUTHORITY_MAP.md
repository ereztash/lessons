# AUTHORITY MAP — One Authority Per Question

> Created 2026-09-03. Ported from `pre-call/docs/market-ready.md` §1: *"One file, not two. A DOD in
> one place and an agent supervising it in another place are two documents that must agree, and that
> is exactly the drift surface this repo has already measured on itself three out of three times."*
>
> **This map is itself the authority for "which document answers which question".** Where a document
> not named below states an answer, that statement is decorative and may be ignored. Where two
> documents disagree, the one named here wins and the other is a defect.

---

## 1. The map

| Question | Current authority | Not the authority (common mistake) |
|---|---|---|
| What is Lessons? | `docs/REFOUNDATION_DECISION.md` § BLUF | `README.md` (measurably stale, `CONTRADICTIONS.md` §4) |
| What product are we testing? | `product/ASSURANCE_THESIS.md` | `saas/spec/01-product-thesis.md` (**superseded**) |
| What is proven? | `ground-truth/results-2026-08-19.md` and `ground-truth/gate-reliability.md` | any narrative document, including `research/cross-repo/synthesis.md` |
| What is only portfolio-derived? | `research/re-foundation/METHOD_LINEAGE.md` §3 | the insight files, which carry `may-assert-cause: yes` on 10 of 17 |
| What commercial hypothesis is active? | `product/FIELD_PREREGISTRATION.md` | `products/pricing-hypotheses.md` (**historical**), `saas/spec/04`, `05`, `08` (**historical**) |
| What research is frozen? | `research/re-foundation/DO_NOT_TOUCH.md` | nothing else claims this |
| What defines product gates? | `scripts/check-lessons-contract.py` (R1–R6). **The rules ARE the file** | `insights/_template.md`, which documents the schema but does not enforce it |
| What is historical only? | `research/re-foundation/ASSET_REGISTER.md`, `Disposition` column | file location; `saas/` contains current, superseded and historical assets in one tree |
| How many repositories are in the portfolio? | `ground-truth/scores-2026-08-19.tsv` + `-cohort2.tsv`, **counted, never stated** | `README.md` (25), `CLAUDE.md` (30), `LOG.md` (both 30 and 40), the brief (44) |
| What tier is repo X? | **no current authority.** `f5-rescore-2026-08-19.md` is unvalidated by design; `repo-index.md` says so in its own header | any tier number anywhere. All are provisional until 2026-11-17 |
| Is F5 better than F1–F4? | **unanswered.** `ground-truth/prediction-2026-08-19.md`, resolving 2026-11-17 | `f5-rescore-2026-08-19.md`, which produces the scores but cannot validate them |
| What may an agent do in this repository? | `product/ASSURANCE_THESIS.md` §4 and `CLAUDE.md` Gate 0 | a passing test |
| What failed before, and what rule came from it? | `LOG.md` anti-pattern table, append-only, **never renumbered** | `MEMORY.md`, which summarizes and drifts |
| What is the current session state? | `MEMORY.md` **for narrative state only.** Every number in it is derived elsewhere and must be checked before citing | `MEMORY.md` for counts (4 of its numbers are stale) |
| Does this repository's CI pass? | **GitHub Actions run history.** 14 runs, 14 failures | the presence of `.github/workflows/node.js.yml`, which proves only that a file exists |
| What am I allowed to sell? | `product/FIELD_PREREGISTRATION.md` §1–§2 | `products/playbooks/*`, none of which has been sold |

## 2. Questions with **no** authority, deliberately

Naming these is the point of the map. An unanswered question with a named absence is safer than an
answer with a hidden weakness.

| Question | Why there is no authority | What would create one |
|---|---|---|
| Is the tier classifier accurate enough to sell? | measured at 20% exact, 8 of 10 over-rated, on a self-audit by a single non-blind labeller | a second, blind labeller applying `rubric.md` §3 |
| Does any principle here hold for a second operator? | every one of 40 repositories is this operator's | `product/FIELD_PREREGISTRATION.md` P10 |
| Will anyone pay for an assurance audit? | nobody has been asked | P3 |
| Does a failure class repeat across client projects? | **zero instances in the corpus** | P4 |
| Is Genesis's compiled scaffold worth anything? | two fixtures, both by this operator, neither built from | one external project built from a compiled contract |
| Is the CRP spec valid? | its own commit message records that it was written after seeing `lessons` | a repository not designed as a CRP |

## 3. Supersession, marked rather than deleted

| Superseded | By | Date | The old document is kept because |
|---|---|---|---|
| `saas/spec/01-product-thesis.md` ("the classifier works") | `ground-truth/results-2026-08-19.md` | 2026-08-19 | it is the record of what was believed before measurement |
| `saas/spec/07-moat.md` | `research/re-foundation/THESIS_TEST.md` §A–§B | 2026-09-03 | it is the corpus's clearest worked example of a moat argued without a measurement |
| `saas/spec/00-README.md` (RepoHealth as *the* product) | `product/ASSURANCE_THESIS.md` | 2026-09-03 | provenance for Phase B |
| `research/portfolio-scan/26-repos.md` tier column | `ground-truth/f5-rescore-2026-08-19.md`, itself provisional | 2026-08-19 | it is the **input** to the out-of-time test |
| `research/cross-repo/synthesis.md` H1/H4 verdicts | `results-2026-08-19.md` | 2026-08-19 | correct record of n=4 conclusions |
| `pipelines/execution-rules.md` Rule 1, original form | its own 2026-08-19 amendment, in place | 2026-08-19 | the amendment names what the original missed |
| `products/pricing-hypotheses.md`, `launch-checklist.md` | `product/FIELD_PREREGISTRATION.md` | 2026-09-03 | a record of pricing method with a zero denominator |

**Nothing above is deleted, rewritten, or quietly corrected.** `DO_NOT_TOUCH.md` §4 covers the set.

## 4. Reading order for a new session

1. `LOG.md` — what failed before
2. `MEMORY.md` — narrative state, numbers not trusted
3. `docs/AUTHORITY_MAP.md` — this file, for which document answers what
4. `docs/REFOUNDATION_DECISION.md` — what the repository currently is
5. `research/re-foundation/DO_NOT_TOUCH.md` — before editing anything under `ground-truth/`

## 5. Drift control

Every count in this repository has a derivation and none should be typed into prose.

| Number | Derived from | Command |
|---|---|---|
| repositories in portfolio | frozen score files | `cut -f1 ground-truth/scores-2026-08-19*.tsv \| grep -v '^repo$' \| sort -u \| wc -l` |
| insights | `insights/` | `python3 scripts/check-lessons-contract.py` prints it |
| evidence resolution mix | insight front-matter | `grep -h '^evidence-resolves-to:' insights/*/*.md \| sort \| uniq -c` |
| causal claims | insight front-matter | `grep -h '^may-assert-cause:' insights/*/*.md \| sed 's/ *#.*//' \| sort \| uniq -c` |
| playbooks | `products/playbooks/` | `ls products/playbooks/*.md \| wc -l` |
| promoted patterns | `patterns-matrix.md` | the matrix is the register; the count is read from it, never restated |
| anti-patterns | `LOG.md` | append-only table |
| CI health | GitHub Actions | `actions_list` |

**Rule: `source → derivation → rendered declaration`. A number typed into three files is a number
that will disagree with itself in three files, which is `CONTRADICTIONS.md` §3.**
