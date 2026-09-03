# METHOD LINEAGE — Where Each Assurance Principle Actually Came From

> Built 2026-09-03. Every row is traced to a named artifact in a named repository, not to a
> summary. Where a field is not known, it reads `unknown` rather than an inference.
>
> **The single most important result in this file is negative and appears in §3: no principle
> reaches category 7. Every one of them has been observed only inside one operator's portfolio,
> and in most cases only inside one operator's collaboration with one vendor's agents.**

---

## 1. The generalization ladder

The brief requires distinguishing seven levels. They are defined here before any principle is
placed on them, so that placement is a reading rather than a preference.

| # | Level | Test to reach it |
|---|---|---|
| 1 | personal preference | the operator does it; no artifact enforces it |
| 2 | portfolio convention | appears in ≥2 repos, but as the same copied text or the same habit |
| 3 | repeated cross-domain mechanism | appears in ≥2 repos **that share no code**, on different substrates |
| 4 | explicit transferred method | a repo names the source repo it took the mechanism from |
| 5 | executable assurance mechanism | implemented as code or a check that can fail, not as prose |
| 6 | candidate general methodological principle | 3, 4 and 5 hold, and the mechanism is stated independently of any substrate |
| 7 | externally replicated principle | reproduced by a **different operator**, on a **different portfolio**, without the author present |

**The gate between 6 and 7 is the commercial gate.** Everything below 7 is one person's method,
however well instrumented. `THESIS_TEST.md` §C and `product/FIELD_PREREGISTRATION.md` exist because
of this line.

## 2. The register

| Principle | First evidence | Other domains | Independent occurrence? | Explicit transfer? | Failure that produced it | Executable implementation? | Current strongest implementation | Generalization level |
|---|---|---|---|---|---|---|---|---|
| **Evidence authority cannot exceed evidence** | `proofminer/docs/AUTHORITY.md`: *"A weak trace should not become a confident outbound asset just because the interface can generate one"* | anti-silo (`eligible.py`), MATI, CRM, lessons | **yes** — 4 repos, 3 languages, no shared code | yes — lessons R6 names proofminer | proofminer's own interface rendering confident output from weak input (8 of Claude's 16 commits are stops) | **yes** — `proofminer/src/engine/authority.js`; `lessons` R6 in `check-lessons-contract.py` | proofminer's six-axis engine | **6** |
| **Provenance before promotion** | `CRM_Google_ai/core/provenance.py` — flags a score whose *language origin* was the coach, not the client | anti-silo `trust_origin` + source hashes; Agent-Architect `07-evidence-grounding`; lessons R1 | **yes** — 4 repos | yes — `check-lessons-contract.py` docstring names `provenance.py` | in lessons: 43 of 43 evidence pointers across 15 shipped insights resolved to prose the repo wrote about itself, and the gate passed all of them | **yes** — `provenance.py`; lessons R1, measured not asserted (`evidence-resolves-to`) | CRM's, because it inspects *language origin*, not pointer existence | **6** |
| **Claim strength separate from observation strength** | `MATI/lib/organizational-signals.ts` — `maySurfaceToOrganization` and `mayAssertCausality` are independent booleans | proofminer `AUTHORITY.md`; lessons R2 (`may-report` / `may-assert-cause`) | **yes** — 3 repos | yes — the insight template names MATI | 17 Phase-2 patterns were promoted on one bit and sold as causal playbooks | **yes** — MATI's function; lessons R2 | MATI's, because it is five graded rungs, not two | **6** |
| **One authority per question** | `pre-call/docs/market-ready.md` §1: *"One file, not two. A DOD in one place and an agent supervising it in another place are two documents that must agree"* | lessons (`check-lessons-contract.py`: *"The rules ARE this file; there is no second document to drift against"*) | 2 repos | **yes, explicitly** — lessons ported it and says so | pre-call measured its own spec drift and got **3 out of 3** | **yes** — collapsing spec and checker into one file | pre-call's, because the drift was measured before the fix | **5** (2 repos, one of them the porting one) |
| **Thresholds fixed before outcome** | `pre-call/docs/market-ready.md` — D1–D6 thresholds with status recorded as 0 | lessons `prediction-2026-08-19.md` (frozen `scores-*.tsv`) | 2 repos | yes — lessons R4 names pre-call | unknown for pre-call; in lessons, the F5 error analysis was circular on first draft (LOG #15) | **yes** — R4 threshold-provenance; frozen TSVs | lessons', because the freeze is a committed file with a resolution date | **5** |
| **Preregistration** | `lessons/ground-truth/prediction-2026-08-19.md` + `resolve-prediction.py` written before the data exists | **none found elsewhere in the portfolio** | **no** — single repo | n/a | F5 cannot be validated against the labels it is a proxy for; the only non-circular test left was a prediction | **yes** — the resolver script is committed and dormant until 2026-11-17 | lessons' | **5** |
| **Reversal conditions** | `prediction-2026-08-19.md`: *"FALSIFIED if ρ_new ≤ ρ_old… not to adjust the rule until it passes"* | pre-call `13924aa` "A kill test, next to the definition of done"; `saas/spec/11` kill criteria table | 2 repos | no | in lessons, the classifier had shipped with no statement of what would retire it | **yes** — the falsifier is in the frozen document | pre-call's, because the kill test sits physically beside the DoD | **5** |
| **Refuse / defer rather than fabricate** | `proofminer` Claude commits: *"The text layer was fabricating evidence. Stop it."*, *"Stop claiming certainty the inputs do not support"* | `CRM/core/consent.py` (defaults `local_only`, fails closed); MATI's extractor carrying no free text by construction | **yes** — 3 repos | no | a generation path that cannot tell a weak input from a strong one will render confidence either way | **yes** — `consent.py` fails closed; MATI's extractor is typed so free text cannot pass | CRM's, because the default is refusal | **6** |
| **NOT-MEASURED ≠ PASS** | `lessons` LOG anti-pattern #11: *"'AI tools: none detected' is never a finding — it is an unrun measurement"* | pre-call D4 status: *"no — tested today: `not_configured`"* | 2 repos | no | `Benchmark.ATS` was recorded "AI tools: none detected"; 2 of its 4 commits were Claude's. The one checkable case was wrong | **yes** — `detect-agent-authorship.sh` reports a range and names the blind spot | lessons', because it produced a rule and a script | **5** |
| **A gate must be shown to fail** | `MATI` — Claude found MATI's regex contract checks passing vacuously | `lessons` LOG #21–#22: R2 and R3 could never fire; found only by deliberately breaking a file | **yes** — 2 repos, and the second reproduced the defect **while porting the fix for the first** | yes — LOG #22 names MATI | two of five newly shipped gates passed vacuously | **yes** — each of R1, R2, R3, R5 was fired once on a broken file | lessons', because the failure is recorded with its denominator (`gate-reliability.md`: P ≥ 0.500) | **6** |
| **Positive controls** | `Benchmark.ATS` — 50 labelled résumés + `ats_validation_script.py` computing `overall_accuracy` against source-of-truth JSON | `lessons` `detect-agent-authorship.sh` uses `All_Erez-s_Connections` as an explicit true-negative control; `score-classifier.py` + `rubric.md` | **yes** — 2 repos, different substrates (résumés, repos) | yes — `rubric.md` names Benchmark.ATS as the working template | lessons measured stability and conformance for four phases and never accuracy | **yes** — both are runnable harnesses | Benchmark.ATS's, and it has been dormant 274 days | **6** |
| **Test reality must match claim reality** | `pre-call/docs/stopping-rule.html` — no-budget detector 49/49 on synthetic (P=0.00) and **2/3 on six real calls (P=0.33)**, printed side by side | anti-silo: deployment staleness became a test *after* a deploy silently went stale; `rubric.md` excludes a Lovable "publish" commit from the `serving` signal | **yes** — 3 repos | no | pre-call: unknown. anti-silo: a deploy went stale silently. lessons: publishing was being counted as consumption | **yes** — the synthetic/real split is in the published table; the rubric's exclusion is in code | pre-call's, because both numbers are kept visible and the worse one is real | **6** |
| **Failed history is provenance** | `Agent-Architect` — prompts are version-numbered source and old versions are never deleted | proofminer `archive/pre-rewrite-agent-work`; lessons `LOG.md` append-only + patterns-matrix §2.2 retraction written in place | **yes** — 3 repos | no | lessons: a "correction" to a promoted pattern was itself wrong and survived four commits (LOG #23) | **yes** — LOG append-only rule; a branch, not a delete | proofminer's, because the abandoned direction is retrievable by name | **6** |
| **Adversarial second surface** | `MATI` — Claude Code never built a feature in that repo; its entire role is audit | Agent-Architect (Haiku audits Opus, findings committed); anti-silo; proofminer (`codex/*` and `claude/*` branches merged hours apart); groundstate-protocol (Codex caught a P1 race in PR #10) | **yes** — **5 repos**, the most replicated principle in the corpus | no | the builder cannot audit itself because the builder is the thing generating the confidence | **yes** — separate branch prefixes, separate models, committed findings | proofminer's, because 8 of the auditor's 16 commits are epistemic stops rather than bug fixes | **6** |
| **Derived state before ownership** | `CRM_Google_ai/core/provenance.py` — a score whose language came from the analyst is PROVENANCE-RISK and *"must not celebrate or price on it until ownership is verified"* | `MATI/lib/organizational-signals.ts::extractOrganizationalSignals` carries no free text by construction | **yes** — 2 repos | no | unknown | **yes** — both | CRM's | **6** |
| **Field outcomes cannot be replaced by more engineering** | `pre-call/docs/market-ready.md`: *"Every condition here requires a stranger. None of them can be completed by writing code."* D1 status: **0** | **none found elsewhere** | **no** — single repo | no | the operator's strongest capability (writing code) could satisfy every previous definition of done | **yes** — six binary conditions with recorded status, all currently unmet | pre-call's | **5** |
| **Bypass / waiver must be explicit** | `pre-call/docs/market-ready.md` — יומן עקיפות (bypass log) | `lessons` `ground-truth/bypass-log.md` + `check-lessons-contract.py --bypass "<reason>"` | 2 repos | **yes** — lessons R5 names pre-call | *"a gate with no record of being bypassed is indistinguishable from a gate nobody has needed to bypass"* | **yes** — the flag refuses to run without a reason and appends to the log | pre-call's, because it sits beside a drift meter and a credit ledger | **5** |
| **Claims must state what could reverse them** | `prediction-2026-08-19.md` falsifier clause | `saas/spec/11-conviction-statement.md` kill-criteria table; pre-call kill test | 2 repos + 1 internal | no | none recorded; adopted prophylactically | partly — the kill criteria were never wired to anything that checks them | prediction's | **5** |
| **Instrument repair must not rescue the hypothesis** | `lessons` LOG #16: *"Fix the rule, do not adjudicate around it"* | `prediction-2026-08-19.md` contamination rule 3: *"No rule tuning before resolution"* | 1 repo, 2 artifacts | no | the first labelling rule scored `executable` by source-file count and would have mislabelled two repos; the temptation was to adjudicate the two repos rather than fix the rule | **yes** — the rubric change is versioned and `score-classifier.py` asserts `rubric_version` matches | lessons' | **5** |
| **Measurement and intervention must not silently change together** | `prediction-2026-08-19.md` contamination rule 2: *"Do not act on the prediction in a way that causes it… any work started in order to satisfy S1 must be recorded here and the test excluded"* | LOG #15 (circular evidence for F5) | 1 repo | no | the first draft of the F5 recommendation cited as evidence a separation that the label definition guaranteed | **yes** — the rule is written into the frozen document | lessons' | **5** |
| **User-facing claim must stay narrower than the measurement** | `results-2026-08-19.md` §5.3: the playbook's claim *"should read 'orders a portfolio; over-rates roughly one tier'"* | `pre-call/README.md` states the market for whom the product does not work, before describing what it does; lessons R6 | **yes** — 2 repos | no | `four-feature-tier-classifier.md` shipped at $29–$59 claiming it never over-rates; measured, all 8 errors were over-estimates | **yes** — R6 blocks a playbook out-claiming its insights | pre-call's, because a stated non-market is harder to walk back than a hedge | **6** |
| **Causal claims need higher authority than descriptive claims** | `MATI` `mayAssertCausality` | anti-silo `eligible.py`: `grounding_eligible_does_not_mean:` … *semantic truth*; lessons `may-assert-cause` + R6 | **yes** — 3 repos | yes | see "claim strength" above | **yes** | anti-silo's disclaimer, because it enumerates what eligibility does **not** mean | **6** |
| **One successful local run does not imply deployed or user reality** | `anti-silo` — deployment staleness became a test after a deploy silently went stale | pre-call D4: *"without enforcement it is not a sale, it is an agreement"*; `rubric.md` `serving` explicitly refuses a Lovable publish commit as evidence of a consumer | **yes** — 3 repos, 3 substrates (deploy, payment, publish) | no | in each case a local success had been read as an external one | **yes** — a staleness test, a key check, a rubric exclusion | anti-silo's, because it converted the incident into a standing test | **6** |

## 3. The level distribution, and the finding

| Level | Principles | Count |
|---|---|---|
| 1 personal preference | none survived to this register | 0 |
| 2 portfolio convention | none survived; the copied-code cases (`COR-SYS`/`ampaign-craft`, 8 byte-identical files) are convention but not method | 0 |
| 3 repeated cross-domain mechanism | subsumed — every level-6 row satisfies 3 | 0 standing alone |
| 4 explicit transferred method | subsumed — 5 rows carry an explicit port | 0 standing alone |
| **5 executable assurance mechanism** | one authority per question; thresholds fixed before outcome; preregistration; reversal conditions; NOT-MEASURED ≠ PASS; field outcomes; bypass/waiver; reversal statements; instrument repair; measurement/intervention separation | **10** |
| **6 candidate general methodological principle** | authority ≤ evidence; provenance before promotion; claim strength separate; refuse rather than fabricate; a gate must be shown to fail; positive controls; test reality matches claim reality; failed history is provenance; adversarial second surface; derived state before ownership; user-facing claim narrower; causal needs higher authority; local run ≠ deployed reality | **13** |
| **7 externally replicated** | **none** | **0** |

### Why nothing is at level 7

Every repository in the corpus is owned by `ereztash`. Every one of the 40 was authored with the
same small set of agents, mostly Claude, under one person's conventions. Six of the thirteen
level-6 principles were observed in repos whose commit histories are 80–94% agent-written under
that one operator's git identity (`authorship-attribution.md`).

That has a specific consequence which must not be softened: **independent occurrence across repos
is evidence that the mechanism is not substrate-specific. It is not evidence that the mechanism is
operator-independent.** The repos share no code. They do share an author, a toolchain, and in most
cases a single model family. A principle can converge across nine substrates and still be one
person's habit expressed nine times.

The only measurement in this corpus that could distinguish the two is the one that has never been
run: the same method, applied by someone else, to a portfolio that is not this one.

### What would move a principle from 6 to 7

For each level-6 row, the same test: a second operator applies the mechanism to a repository the
author has never seen, and it catches a defect the operator's existing process did not. That is
what `product/FIELD_PREREGISTRATION.md` registers, and it is why the decision in
`docs/REFOUNDATION_DECISION.md` authorizes a service and not a platform.

## 4. Principles that were investigated and are **not** in the register

Recorded so the absence is deliberate rather than an oversight.

| Candidate from the brief | Why it is not a row |
|---|---|
| "one authority per question" as a *repository governance* rule | it is in the register as a **drift-surface** rule (pre-call's one-file collapse). The governance version, a table saying which document answers which question, does not exist anywhere in the portfolio and is being **created** by this round (`docs/AUTHORITY_MAP.md`). A rule invented today is not a lineage entry. |
| "reality levels" as a ladder | the corpus contains reality *distinctions* (synthetic vs real calls; local vs deployed; publish vs consumed; agreement vs enforced payment) but **no repo defines an ordered ladder**. `ASSURANCE_MODEL_FIT.md` §3 derives one; it is therefore a construction of this round, not a finding. |
| "cross-project failure lineage" | `LOG.md` is single-project. `patterns-matrix.md` is cross-repo but tracks patterns, not failures. No artifact in the portfolio tracks a **failure class** across projects. This is a proposed capability with no lineage. |
| "agent permissions" as an enforced set | `CRM_Google_ai/AGENTS.md` is a concurrency contract (lane split, one-writer-per-file, freeze, handshake) between Codex and Claude, and it is the closest artifact. It governs *collision*, not *authority*. No repo restricts what an agent may **conclude**. |
