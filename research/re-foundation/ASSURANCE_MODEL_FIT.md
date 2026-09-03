# ASSURANCE MODEL FIT — Running the Candidate Object Model Against the Portfolio

> Built 2026-09-03. The candidate model from §8 of the brief is expressed against ten repositories
> whose evidence exists in this corpus. The purpose is to find what the model **cannot** represent.
>
> **Result up front: the model as proposed in §8 failed outright on 3 of the 10 cases and strained
> on a 4th, needing 6 added fields in total. By the brief's own test in §9, that means v1 was not
> ready.** §5 states the additions, and §6 re-runs the fit.
>
> **Corrected 2026-09-03 after the adversarial pass**: an earlier draft of this line read "6 of the
> 10 cases", conflating the count of missing *fields* with the count of failing *cases*. The §6
> table is authoritative: 3 `fails`, 1 `strain`, 6 gaps.
>
> **§6 is a completeness check, not a test.** Expressiveness on the ten cases the model was derived
> from cannot come back negative for any sufficiently general schema, and no case is registered that
> v1.1 could fail. It is not a sub-thesis that can be supported or refuted.

---

## 0. Repositories named in the brief — RETRACTED 2026-09-03

> **This section was wrong on three of its four rows and is corrected in place rather than
> rewritten.** `lichess_app`, `--Android` and `strategic-portal` all exist and are all now cloned.
> They were absent from the 2026-08-19 frozen scan because **they entered the portfolio after it**:
> the portfolio is 44 today and was 40 at the freeze, and the four newcomers all have a `pushed_at`
> later than 2026-08-19. I read a committed enumeration as current state and wrote "does not exist"
> where the evidence only supported "is not in the 2026-08-19 scan".
>
> Full retraction, and what the exclusion cost: **`research/re-foundation/ENUMERATION_CORRECTION.md`**.
> The cost was not the count. `--Android` implements this round's own core rule — a gate must be
> shown to fail — as a build-failing mechanism (`NOT-A-GATE`), and `lichess_app` enforces
> "evidence must postdate the claim" in its type system. Both are stronger than anything §2 below
> examines, and both were excluded by the error rather than by judgment.
>
> The original table is kept below so the retraction has something to retract.

### The original claim, as written and as wrong

| Named in §9 of the brief | Status | Substituted with | Why |
|---|---|---|---|
| `lichess_app` | **not present** in the 40-repo portfolio (`list_repos`, 2026-08-19) | `chess-mind-patterns` | it is the portfolio's chess-training app and it integrates Lichess (`src/lib/lichess-links.ts`, 247 lines mapping 20 skill IDs to Lichess training URLs) |
| `--Android` | **not present** | none | no Android or mobile-native repository exists in the portfolio; the slot is left empty rather than filled with a repo that does not fit it |
| `strategic-portal` | **not present** | none | no repository of that or a similar name exists |
| "the lichess ladder" (§8, reality levels) | **no such artifact exists in this repository** | derived from scratch in §3 | the brief instructs not to reuse it blindly; there is nothing to reuse. §3 is therefore a construction of this round, not a corpus finding (see `METHOD_LINEAGE.md` §4) |

The set actually used is ten repositories for which this corpus holds file-level or measurement-level
evidence.

---

## 1. The candidate model, stated compactly

```
Project        a delivery context with a git origin and an owner
Claim          an assertion the project, team, agent or seller makes
Evidence       an artifact that supports or weakens a Claim
Reality level  what level of reality the Evidence actually touched  (see §3)
Authority      what the current evidence permits: observe | report | recommend |
               release | assert-cause | automate | block | unknown
Gate           an executable decision over Evidence
Positive ctrl  proof the Gate can detect the failure class it guards
Reversal cond. evidence that would demote or invalidate the Claim
Waiver         explicit acceptance of insufficient evidence: owner, date, scope,
               reason, expiry
Field req.     a Claim the repository cannot settle
Failure        a refutation, first class and permanent
Lineage        where a rule came from and how it changed
Policy         a reusable assurance rule instantiable into a Project
```

---

## 2. The ten cases

### 2.1 `pre-call` — Tier A, live, 224 commits

| Object | Instance in the repo |
|---|---|
| Claim | D1–D6 in `docs/market-ready.md`: six binary market-readiness conditions |
| Evidence | `docs/stopping-rule.html` measurement table; per-failure-mode probabilities over 400 runs |
| Reality level | **explicitly split**: no-budget detector 49/49 synthetic (R2), 2/3 on six real calls (R5), both printed |
| Authority | the DoD gates the claim "market ready"; current status is `0` on D1 |
| Gate | the six conditions, each with a threshold |
| Positive control | P measured per failure mode with before→after movement (144→0, 0→22/22) |
| Reversal condition | the kill test committed beside the DoD (`13924aa`) |
| Waiver | יומן עקיפות, the bypass log |
| Field requirement | *"Every condition here requires a stranger. None can be completed by writing code."* |
| Failure | D4: *"no — tested today: `not_configured`"* |
| Lineage | thresholds name their source; D2's is labelled *"a line that was set, not derived"* |

**Fit: complete.** This repository is the closest thing in the portfolio to a hand-written assurance
contract, and the model was in effect reverse-engineered from it. That is a warning, not a
validation: fitting the model to the case it was derived from proves nothing.

### 2.2 `proofminer` — Tier B, 229 commits over two days

| Object | Instance |
|---|---|
| Claim | the Visibility Gap headline number the product emits |
| Authority | `docs/AUTHORITY.md` + `src/engine/authority.js`, six axes: Impact, Reversibility, Certainty, Sensitivity, User preference, External context |
| Failure | 8 of the auditor's 16 commits are epistemic stops: *"The text layer was fabricating evidence. Stop it."* |
| Lineage | `archive/pre-rewrite-agent-work` — an abandoned direction preserved by name |
| Evidence provenance | 193 of 229 commits are hidden-agent under the operator's identity; **the only surviving record of which agent produced what is the branch prefix** (`agent/`, `claude/`, `codex/`) |

**Fit: good, with one strain.** Evidence attribution here runs through branch names, not commit
metadata. The model's Evidence object has no producer field, so "which agent generated this" is
unrepresentable. Recorded as **gap G1**.

### 2.3 `_crm` / `CRM_Google_ai` — the mirror pair

| Object | Instance |
|---|---|
| Claim | an Ownership score and a price derived from coaching transcripts |
| Evidence | 3-rater consensus validated against Shrout-Fleiss ICC and Krippendorff's alpha |
| Authority | `core/consent.py` defaults to `local_only` and fails closed |
| Provenance | `core/provenance.py` flags a score whose *language origin* was the coach rather than the client |

**Fit: fails.** `CRM_Google_ai` is a whole-tree mirror of `_crm`, **stale by 182 files in 17 days**,
and it carries `_crm`'s `CLAUDE.md` and `LOG.md` verbatim, which then address the wrong working
tree. The model has one `Project` object with no derivation relation, so:

- evidence collected on the mirror would be credited to a project that did not produce it;
- the mirror's own `LOG.md` is lineage belonging to a different project.

Recorded as **gap G2**. This is not a corner case: the F1–F4 classifier already scored the mirror
3/4 for containing no original work (LOG anti-pattern #13).

### 2.4 `MATI` — Tier A, live, complete production system built in one 11-hour day

| Object | Instance |
|---|---|
| Claim | organizational signals extracted from instructor reflections |
| Authority | `organizationalAuthority`: `detect \| surface \| suggest_inquiry` automatic; `diagnose_cause \| set_policy \| act` human-required or forbidden |
| Gate | three hand-written contract checkers running in CI before the build; a privacy floor of 5 contributors |
| Promotion | five graded rungs, with `maySurfaceToOrganization` and `mayAssertCausality` independent |
| Positive control | **absent, and its absence was measured**: Claude found MATI's regex contract checks passing vacuously |

**Fit: complete, and it is the model's best independent confirmation.** MATI implements Authority,
Gate and graded promotion in TypeScript without any contact with this repository's vocabulary.

### 2.5 `anti-silo` — Tier A, healthy

| Object | Instance |
|---|---|
| Claim | a contradiction or eligibility verdict per source document |
| Evidence tiers | `source_backed`, `corroborated_no_source`, `indexed_unverified`, `refuted_or_blocked` — **this is a reality ladder, independently invented** |
| Gate | `promotion.py`: `blocked_tiers` / `review_tiers` over those tiers |
| Authority | `eligible.py`: `grounding_eligible_does_not_mean:` product usage, user value, field adoption, **semantic truth**, business validation |
| Reversal | deployment staleness became a test after a deploy silently went stale |

**Fit: complete.** `eligible.py`'s enumeration of what eligibility does *not* mean is the sharpest
Authority statement in the corpus and the model represents it directly.

### 2.6 `groundstate-protocol` — Lovable to Claude pivot

| Object | Instance |
|---|---|
| Claim | implicit: "this is publishable" |
| Evidence | a Lovable publish commit |
| Reality level | **the central finding**: publishing is R4-deployed, and it was being read as R6-consumed |
| Failure | Codex caught a P1 race in PR #10 — an adversarial second surface producing a refutation |
| Lineage | 76 Claude trailers across 4 model versions |

**Fit: good.** The model's reality level is what separates "published" from "consumed", which is the
distinction that H2 (publish-button satisfiability) is entirely about.

### 2.7 `chess-mind-patterns` — bot blast then a 72-minute human resumption

| Object | Instance |
|---|---|
| Claim | implicit: "this analyzes a chess player's games" |
| Evidence | 171 bot commits producing ~33 analytic widgets; 3 human commits producing 8 action widgets |
| Reality level | the human's final commit is the only one adding external-world integration (Lichess deep-links, a PWA manifest, a service worker) |
| Gate | none |
| Authority | none |

**Fit: representable, and it exposes something.** A repository with zero gates and zero authority
statements is representable, but every Claim in it is `NOT-MEASURED` and every Authority is
`unknown`. **That is the correct output and it is also useless as a deliverable**, because it says
nothing an owner did not already know. Noted for §5 of `product/ASSURANCE_THESIS.md`: an assurance
case has value only where someone is about to assert something.

### 2.8 `core-unified-consciousness` — the abandonment negative control

| Object | Instance |
|---|---|
| Claim | none stated anywhere |
| Failure | the repo itself; engine modules named `erez.ts`, `alma.ts`, opaque to any future reader |
| Field requirement | why it was abandoned is not answerable from the repository |

**Fit: partial, and it exposes the sharpest gap.** The model can record `NOT-MEASURED` against a
claim **someone stated**. It has no way to record that **no claim was ever stated**, or to say
anything about whether the claim set is complete. Recorded as **gap G3**, and it is the most
important one: an assurance case whose claim set is incomplete is a false green in the most literal
sense.

### 2.9 `Benchmark.ATS` — the research-only calibration harness, dormant 274 days

| Object | Instance |
|---|---|
| Positive control | **this whole repository is one**: 50 labelled résumés plus `ats_validation_script.py` computing `overall_accuracy` against source-of-truth JSON |
| Claim | someone else's extractor is accurate to degree X |
| Failure | it was recorded portfolio-wide as "AI tools: none detected"; 2 of its 4 commits are Claude's. It was the one checkable case and it was wrong |

**Fit: complete, and it is the model's single best asset.** A repository whose entire purpose is a
positive control, sitting unused for nine months, is the clearest demonstration that the missing
capability in this portfolio is not measurement but the discipline of connecting a measurement to a
claim.

### 2.10 `lessons` — this repository

| Object | Instance |
|---|---|
| Claim | README: "Phase 8 complete… compile pipeline verified at sharpness 100/100" |
| Gate | `.github/workflows/node.js.yml` |
| Gate result | **failure, 14 runs out of 14, across four months** |
| Authority consuming that result | **none** |
| Claim | `four-feature-tier-classifier.md`: the classifier does not over-rate |
| Evidence | `results-2026-08-19.md`: 8 of 10 over-rated, 0 under-rated |
| Status | CONTRADICTED, corrected in place 2026-08-19 |
| Waiver | `ground-truth/bypass-log.md` |
| Positive control | R1, R2, R3, R5 each fired once on a deliberately broken file; **R2 and R3 failed that test** |
| Reversal condition | `prediction-2026-08-19.md`: FALSIFIED if ρ_new ≤ ρ_old |
| Field requirement | a second, blind labeller applying `rubric.md` §3 |

**Fit: fails in one specific and important way.** The model can express PASS, FAIL and NOT-MEASURED.
It cannot express **a gate that produced a verdict which no authority consumed.** Fourteen red runs
is not NOT-MEASURED, and it is not a failing gate blocking a release, because nothing was blocked.
It is a fourth state. Recorded as **gap G4**, and it is the case that most directly motivates the
product: the failure was invisible for four months in a repository whose entire subject is
evidence discipline.

A fifth strain, from the same repository: `patterns-matrix.md` §2.2 records **a correction that was
itself wrong, retracted in place**. The model treats Failure as first-class, but Evidence does not
take Evidence as its subject, so "a refutation that was refuted" needs an ad-hoc field. Recorded as
**gap G5**.

---

## 3. Reality levels, derived from the corpus

No repository in the portfolio defines an ordered ladder. This one is constructed from the
distinctions the corpus actually draws, one rung per observed instance.

| Level | Name | The evidence touched | Corpus instance |
|---|---|---|---|
| **R0** | asserted | someone wrote it down | README claims across the portfolio |
| **R1** | static | the artifact exists, parses, lints, typechecks | `crp-lint.ts`; MATI's contract checkers |
| **R2** | isolated execution | code ran against fixtures the team authored | pre-call's no-budget detector, 49/49 **synthetic** |
| **R3** | integrated execution | components ran together with real dependencies | MATI's CI build |
| **R4** | deployed | it ran at the deployed origin, not on localhost | anti-silo's deployment staleness test, added after a deploy silently went stale |
| **R5** | real input | it ran against inputs the team did not author | pre-call's **2 of 3 correct on real calls** (P=0.33) against 49/49 synthetic. The source prints "2/3 on six real calls"; the denominator is ambiguous in the source and unresolved here |
| **R6** | third party acted | someone outside the team performed the action | pre-call D1 (ten strangers, status 0) and D4 (a payment with the key enforced: *"without enforcement it is not a sale, it is an agreement"*) |

**The rule that makes the ladder useful:** a claim carries a **required floor**, and evidence below
that floor is not weak evidence, it is *no* evidence for that claim. H2, the corpus's strongest
finding, is exactly this: a Lovable publish commit is R4, the claim "someone uses this" needs R6,
and the entire publish-button-satisfiability pattern is the gap between them.

---

## 4. Gaps found

| # | Gap | Case that exposed it | Severity |
|---|---|---|---|
| **G1** | `Evidence` has no producer | proofminer: the only agent-attribution record is the branch prefix | high — agent-aware invalidation is a named differentiator and cannot be built without it |
| **G2** | `Project` has no derivation relation | `CRM_Google_ai` mirrors `_crm`, stale by 182 files in 17 days; COR-SYS and ampaign-craft share 8 byte-identical files, 2 already drifted | high — evidence would be credited to the wrong project, silently |
| **G3** | no representation of claim-set completeness | `core-unified-consciousness` states no claim at all | **highest** — an assurance case over an incomplete claim set is a false green by construction |
| **G4** | no state for a verdict nobody consumed | `lessons` CI: 14 failures, 0 consumers, 4 months | high — it is the failure the product exists to catch |
| **G5** | `Evidence` cannot take `Evidence` as its subject | the retracted correction in `patterns-matrix.md` §2.2 | medium |
| **G6** | `Field requirement` has no owner or expiry, though `Waiver` does | pre-call D1 has status 0 and no named owner | medium — an unowned field requirement is indistinguishable from a silent waiver |

## 5. The five additions

```
Evidence.produced_by        : human | agent(<surface>) | tool | unknown        (G1)
Project.derives_from        : Project | null,  with Evidence.covers_revision   (G2)
Project.claim_set_status    : elicited | partial | none,  + discovery_method    (G3)
Gate.result_consumed_by     : Authority | null,  and a fourth Gate state
                              UNCONSUMED alongside PASS | FAIL | NOT-MEASURED  (G4)
Evidence.subject            : Claim | Evidence                                  (G5)
FieldRequirement.owner, .review_by                                              (G6)
```

`Gate.result_consumed_by` is the one that changes the product, not just the schema. It converts the
question from *"did the check pass?"* to *"did anyone act on the check?"*, and the second question
is the one this repository's own history answers with "no, for four months."

## 6. Re-run of the fit with v1.1

| Case | v1 | v1.1 |
|---|---|---|
| pre-call | complete | complete |
| proofminer | strain (G1) | **complete** |
| `_crm` / `CRM_Google_ai` | **fails** (G2) | complete |
| MATI | complete | complete |
| anti-silo | complete | complete |
| groundstate-protocol | complete | complete |
| chess-mind-patterns | complete but empty | complete but empty — **correctly**, see §2.7 |
| core-unified-consciousness | **fails** (G3) | complete: `claim_set_status: none` |
| Benchmark.ATS | complete | complete |
| **lessons** | **fails** (G4, G5) | complete: the CI gate reads `FAIL / UNCONSUMED` |

**Verdict: v1.1 represents all ten cases without ad-hoc fields.** The model is ready to be
implemented as a schema. It is **not** thereby validated: all ten cases come from one operator's
portfolio, and a model derived from ten cases and then fitted to the same ten cases has been
checked for expressiveness, not for correctness. The first honest test is the first external
project, which is what `product/FIELD_PREREGISTRATION.md` registers.

## 7. What this exercise incidentally proved about the product

Running the model produced four findings on `lessons` itself in under an hour, all of them true and
none of them previously recorded anywhere in the repository:

1. the only CI gate has failed 14 times out of 14 and nothing consumes the result;
2. the test command it would run has zero test files behind it;
3. the shipped classifier code still returns Tier A at three features, after the measurement that
   demoted it;
4. the public README asserts a phase and a portfolio size that no current artifact supports.

**Narrowed 2026-09-03 after the adversarial pass, and the narrowing matters.** Three qualifications
the first draft did not carry:

1. **The object model is not load-bearing for any of the four.** Each is reachable with `ls`, `grep`
   and reading two files. None required Claim, Evidence, reality level, Authority, PositiveControl,
   Waiver, FieldRequirement, Reversal, Lineage or Policy. This is evidence that **structured looking**
   works, not that **this structure** did the looking.
2. **Two were partly on record.** The test-scaffold class is a promoted portfolio pattern
   (`index/MOC-CLAUDE-TO-CLAUDE.md`, parked per `MEMORY.md`), and both halves of finding 4 were
   already written down (`README.md` "Twenty-five repositories", `LOG.md` "40 repos"). What was
   unrecorded was the **join**, not the facts.
3. **The hour does not transfer.** The auditor had just read the entire corpus. P6 in
   `product/FIELD_PREREGISTRATION.md` must measure hours on a repository the auditor has not read.

What survives: a structured read produced four true, previously unjoined findings on the hardest
available subject, and it cost no platform. That is an argument for the service. It is not evidence
that the schema produced the findings.
