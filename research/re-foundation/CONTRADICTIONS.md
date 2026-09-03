# CONTRADICTIONS — Statements in This Repository That Disagree With Each Other or With Measurement

> Built 2026-09-03 against `f4fc70a`. Every row was verified in this session by reading the named
> file or running the named command. Nothing here is fixed by this file; §7 says which round owns
> each fix.
>
> Ordered by consequence, not by file.

---

## 1. A gate that has never passed, in a repository about gates

| Statement | Where | Measurement | Verdict |
|---|---|---|---|
| the repository has CI | `.github/workflows/node.js.yml`, added `958a8ab` 2026-05-12 | **14 workflow runs, 14 `conclusion: failure`, 0 successes**, 2026-05-12 to 2026-09-02 | the gate has never once produced a passing verdict |
| `npm ci` will install dependencies | the workflow's first step | there is **no `package.json` at the repository root** | the step cannot succeed as written |
| `npm test` runs tests | `saas/app/package.json` → `"test": "vitest run"` | **zero `*.test.ts`, `*.spec.ts`, `__tests__/` or `vitest.config.*` files exist** anywhere in the tree | the command would assert nothing even if it ran |
| `gate-reliability.md` enumerates this repository's gates | `ground-truth/gate-reliability.md` §2 | the table lists four gates. **CI is not among them** | the repository's own gate audit omits the only gate that runs automatically |

**Consequence.** This is the most serious contradiction in the repository and it is also its most
useful asset: a live, four-month, self-inflicted instance of the exact failure class the candidate
product proposes to sell against. `ASSURANCE_MODEL_FIT.md` §2.10 uses it as the case that motivates
the `UNCONSUMED` gate state.

---

## 2. The shipped classifier code was never updated to the measurement that demoted it

| Statement | Where | Measurement | Verdict |
|---|---|---|---|
| Tier A = three or more of F1–F4 | `saas/app/src/lib/classifier/tier.ts::computeTier` | `results-2026-08-19.md`: 20% exact agreement, **8 of 10 over-rated, 0 under-rated** | the code implements the rule the measurement found biased by about one tier |
| the fix is F5 plus a recency term | `results-2026-08-19.md` §5.1, `f5-rescore-2026-08-19.md` | `computeTier` reads only `scores.f1`–`f4` | **F5 exists in the research and in `score-portfolio.sh`, and does not exist in the product code** |
| "The classifier works. H1–H8 confirmed at n=25." | `saas/spec/11-conviction-statement.md` | the same instrument, measured against an answer key | the confidence statement is refuted by a later measurement in the same repository |

---

## 3. Portfolio size: four different denominators are current simultaneously

| Statement | Where | Measured value |
|---|---|---|
| "Twenty-five repositories under `ereztash`" | `README.md` line 35 | 40 |
| "Full tier data for all 30 repos" | `CLAUDE.md` line 81 | `repo-index.md` holds **32** entries |
| "Dataset size n=30" | `LOG.md` environment table | 40 scored |
| "**40 repos** via `list_repos`… all 40 now scored" | `LOG.md`, two rows below | correct |
| "the 44-repository history" | the re-foundation brief, §16 | **40**, per `list_repos` 2026-08-19 with `has_more=false` |

`LOG.md` contradicts itself two rows apart. The brief that commissioned this audit carries a fifth
number. **No document in the repository derives its denominator; each states one.** §19 of the brief
applies directly.

---

## 4. Phase and status claims

| Statement | Where | Contradicted by |
|---|---|---|
| "**Latest update**: 2026-05-13 — Phase 8 complete" | `README.md` line 5 | the last content commit is 2026-08-19, and four major rounds (ingestion, ground truth, F5, cohort 2, gap closure) landed after it |
| "Current phase: Phase 4 + gap-closure + +5-repo ingestion round complete" | `LOG.md` | `README.md` says Phase 8. Neither names the other |
| "Insights distilled: 11" | `MEMORY.md` line 18 | **17**, counted this session and confirmed by `check-lessons-contract.py` ("17 insights") |
| "Raw observations gathered: 64" | `MEMORY.md` line 10 | `LOG.md` says 76 |
| "Promoted cross-repo patterns: 24" | `MEMORY.md` line 11 | `patterns-matrix.md` §3.3 says 29; `LOG.md` says 29 |
| "Target branch `claude/analyze-workflow-optimization-3NhlH`, last verified 2026-05-12" | `LOG.md` environment table | four subsequent rounds used `claude/analyze-additional-repos-v0s691` |

`MEMORY.md` is described by `pipelines/execution-rules.md` Rule 6 as "the single source of truth for
state". Four of its state numbers are stale, and one (insight count) is checkable by a script that
already runs.

---

## 5. Product identity: three names in one tree

| Name | Where |
|---|---|
| **RepoHealth** | `saas/spec/00-README.md`, `saas/app/package.json` (`"name": "repohealth"`) |
| **PortfolioPilot** | `saas/scanner/package.json` (`"name": "@portfoliopilot/scanner"`, description "PortfolioPilot MVP") |
| **Genesis Mode** | `saas/spec/02b-genesis-mode.md`, presented as a mode of the same product |

3,412 lines of scanner ship under a product name that appears nowhere in the spec directory.

---

## 6. Evidence and claim-strength contradictions

| Statement | Where | Contradicted by |
|---|---|---|
| the playbook does not over-rate | `four-feature-tier-classifier.md`, as shipped 2026-05-12 | measured: all 8 errors were over-estimates. **Corrected in place 2026-08-19**; recorded here because the correction is the evidence that the original shipped wrong |
| Rule 1 guarantees an evidence pointer | `pipelines/execution-rules.md` Rule 1, original text | 43 of 43 pointers across 15 shipped insights resolved to this repository's own prose. **Amended 2026-08-19** |
| the monetization gate is a gate | Rule 4, "any insight with score < 4 is parked" | **12 of 12 audited candidates scored 4/5 or 5/5. Nothing has ever failed it.** `MEMORY.md`'s own verdict table is the evidence |
| 10 of 17 insights carry `may-assert-cause: yes` | measured this session | each rests on ≤6 repositories belonging to one operator. R2 permits it; `METHOD_LINEAGE.md` §3 shows no principle reaches operator-independence |
| "the classifier correctly identified every Tier A repo… without false positives" | `saas/spec/11` | under F5, Tier A goes from 13 repos to 3 of 40 |

---

## 7. Ownership of each fix

Nothing in this table is fixed by this file. Assignment:

| # | Fix | Owner round | Blocking? |
|---|---|---|---|
| 1 | point CI at `saas/app`, or make it check what the repository actually has (the contract gate); add the CI gate to `gate-reliability.md` | **this round** — it is the cheapest true statement available and it is currently false | yes, for any claim about this repository's own discipline |
| 2 | either update `computeTier` to the measured rule or mark the module superseded in place | migration round | no, the code is not deployed |
| 3 | derive every denominator from `ground-truth/scores-*.tsv` rather than restating it | §19 reconciliation round | no |
| 4 | reconcile `README.md`, `LOG.md`, `MEMORY.md` phase and count claims against a single derived source | authority-map round | no |
| 5 | choose one product name or record both as historical | product round | no |
| 6 | re-audit the 10 `may-assert-cause: yes` insights against `METHOD_LINEAGE.md` §3 | adversarial round | **yes**, for anything sold |

---

## 8. What this file deliberately does not call a contradiction

- `research/repo-index.md`'s superseded tier lines. Its own header says they are superseded and
  states why they are deliberately unrewritten: replacing one unvalidated number with another
  before the prediction resolves would hide that neither is tested. **That is a correct decision
  recorded correctly.**
- `saas/spec/*`'s commercial numbers. They are hypotheses that were never tested, not claims that
  were contradicted. `ASSET_REGISTER.md` marks them `HISTORICAL`.
- `maya-walkthrough.md`. It is marked hypothetical in its own §1 and by LOG anti-pattern #9.
- The 2026-08-19 retraction in `patterns-matrix.md` §2.2. A correction that was itself wrong,
  retracted in place rather than deleted, is the repository working as designed.
