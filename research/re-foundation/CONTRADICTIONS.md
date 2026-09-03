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
| 6 | re-audit the 10 `may-assert-cause: yes` insights against `METHOD_LINEAGE.md` §3 | adversarial round | **DISCHARGED 2026-09-03.** 7 of 10 failed the template's own documented condition (`hard` evidence, ≥2 repos) that R2 never checked; demoted. 3 hold, scoped to this portfolio. R6 forced 2 playbook demotions. R2 now enforces the condition, with positive controls |

---

## 8. Found by the adversarial pass, 2026-09-03 — including in this round's own work

Appended the same day. §1–§7 above are left as written.

### 8.1 In the corpus

| Statement | Where | Measurement | Verdict |
|---|---|---|---|
| "`LOG.md` carries **19** numbered anti-patterns" | `ground-truth/gate-reliability.md` §1 | it carried **23** before this round and carries **26** now. #23 landed in `528041c`, *after* gate-reliability was created in `5be7bd6` | the file's own §5 says "update this file when a new failure is recorded in `LOG.md`". It was not, one commit later. **And §1–§7 of this file, which claims every row was verified this session, missed it** |
| "R1, R2, R3, **R5** was fired once on a broken file" | `gate-reliability.md` §3 | R5 appears in **no** `violations.append()` in `check-lessons-contract.py`. It is the `--bypass` mechanism and emits no verdict | it was never possible to fire R5 on a broken file. Corrected in §6 C2 |
| "Gate correctness \| 6 scripts \| 3 failures \| P ≥ 0.500" | `gate-reliability.md` §2 | #21 and #22 are two defects in **one** file; #17 is a second file. **Per script: 2 of 6 = 0.333** | numerator counts defects, denominator counts scripts. Corrected in §6 C4 |
| Promoted cross-repo patterns | `MEMORY.md` (**24**), `MEMORY.md` again (**28**), `patterns-matrix.md` §3.3 (**29**) | three values, two of them in the same file | §4 above recorded only the 24-vs-29 pair |

### 8.2 In this round's own documents

Recorded at the same weight as everything else, because a re-foundation that exempts itself is the
failure it is auditing.

| Claim in the first draft | Reality | Fixed |
|---|---|---|
| "`check-lessons-contract.py` — R1–R6, **verified passing** this session" | passing was verified; **firing was not**. R4's regex began `\b(?:>=\|<=\|≥\|≤)`, and a leading `\b` before `>` requires a word character to its left, so its match set against the live rubric was **empty**. R4 could not produce a verdict, through two rounds | regex and provenance scoping rewritten; positive control extended to R4 and R6; the repaired rule immediately found a real violation |
| "the positive control proves the gate can go red" | it covered **R1, R2, R3** — the three rules already known good from the previous round. The one rule never fired was the broken one | `gate-positive-control.sh` now covers R1, R2, R3, R4, R6 and states why R5 cannot be covered |
| "undercounts by up to **23×** \| `authorship-attribution.md`, measured across 12 repositories" | that file has **no `_crm` row** and a maximum of **6.7×**. The 23× is in `2026-08-19-cohort2.md` §4 | corrected in four documents; `CLAUDE.md`, which said 6.7×, now carries both with their sources |
| "**23** recorded failures" | observed failures are **#11 onward**; #1–#10 are prophylactic and `gate-reliability.md` §1 says they "measure nothing" | corrected to 16 |
| "discovered independently **nine times**" | `METHOD_LINEAGE.md` yields **13 principles across 8 repositories**. "Nine" was borrowed from `portfolio-as-one-mechanism.md`, whose own figure `MEMORY.md` had already revised to 11 | corrected in the decision and the README |
| "could not represent **6 of the 10** cases" | the §6 table says **3 fails, 1 strain, 6 added fields**. Field count was conflated with case count | corrected in place |
| "most predating any taxonomy that names them" | `METHOD_LINEAGE.md` §2 has **no date column and no dates** | removed |
| the service is "authorized now" | `CONTRADICTIONS.md` §7 row 6 marks the causal-insight re-audit **blocking for anything sold**, and nothing discharged or waived it | decision narrowed to `SALE GATED`; the item is condition 4 and is **still open** |

### 8.3 Found after the operator opened the portfolio, same day

| Claim in this round | Reality | Fixed |
|---|---|---|
| "the brief named three repositories … none of the four exists in this portfolio" | **three of the four exist.** `lichess_app` (pushed today), `--Android`, `strategic-portal`. All three cloned and verified against their remotes | retracted in `ENUMERATION_CORRECTION.md`; LOG #26 retracted by #30 |
| "the portfolio is 40 repos" | **44 today**, 40 at the 2026-08-19 freeze. The four newcomers all postdate the freeze and the frozen set is a strict subset | the derivation in `AUTHORITY_MAP.md` §5 now carries a tense |
| "the brief's 44 is a fifth number" (§3 above) | **the brief was correct** | §3's row on the brief is superseded by this one |
| Core IP #2 cites this repository's own positive control as the instance | `--Android/scripts/run_gates.py` runs each control first and fails the build with `NOT-A-GATE` if it comes back green. **Stronger, and a build gate rather than a script** | re-attributed in the decision |
| anti-pattern #27, "a rule added without its control", recorded as a new finding | `lichess_app/vitest.controls.config.ts` already solves it, and names the same failure: a control suite that collects no files exits 1, "which looks like a passing control while proving nothing" | recorded in `ENUMERATION_CORRECTION.md` §3.2 |

## 9. What this file deliberately does not call a contradiction

- `research/repo-index.md`'s superseded tier lines. Its own header says they are superseded and
  states why they are deliberately unrewritten: replacing one unvalidated number with another
  before the prediction resolves would hide that neither is tested. **That is a correct decision
  recorded correctly.**
- `saas/spec/*`'s commercial numbers. They are hypotheses that were never tested, not claims that
  were contradicted. `ASSET_REGISTER.md` marks them `HISTORICAL`.
- `maya-walkthrough.md`. It is marked hypothetical in its own §1 and by LOG anti-pattern #9.
- The 2026-08-19 retraction in `patterns-matrix.md` §2.2. A correction that was itself wrong,
  retracted in place rather than deleted, is the repository working as designed.
