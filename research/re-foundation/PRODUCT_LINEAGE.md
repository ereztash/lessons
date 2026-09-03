# PRODUCT LINEAGE — What This Repository Believed It Was Selling, and When

> Built 2026-09-03 from commits, spec files and dated research artifacts. Each phase records what
> was believed, on what evidence, and what later contradicted it.
>
> **Rule applied throughout: an older thesis is not called wrong because a later one is broader.**
> A thesis is called refuted only where a named measurement contradicts a claim it actually made.

---

## Phase A — Portfolio research repository
**2026-05-12 · commits `a648ff3` → `a9fc349` · 4 repos, 43 observations**

**What was believed.** The operator's git histories contain extractable workflow knowledge, and
extracting it is worth doing for its own sake. Four dimensions (Claude→User, User→Claude,
Claude→Claude, User→User) organize it.

**Evidence available at the time.** Four deep-dives (cor-sys, groundstate-protocol,
chess-mind-patterns, core-unified-consciousness). 43 raw observations. A 35-row patterns matrix,
17 patterns promoted on a ≥2-repos × ≥strength-2 rule.

**What later contradicted it.** Nothing contradicted the *research* thesis. Two things narrowed it:
`portfolio-as-one-mechanism.md` (2026-08-19) showed the four dimensions were not the corpus's real
structure — the nine components C1–C9 were; and `gate-reliability.md` showed the promotion rule
itself had a measurable failure rate.

**What remains useful.** The observation format, the promotion rule, the append-only LOG, and the
`core-unified-consciousness` survey, which is the corpus's only abandonment negative control.

**What was never validated.** The four-dimension taxonomy. No measurement has ever tested whether
routing an insight to one of four dimensions changes any outcome.

---

## Phase B — Repo classifier and RepoHealth
**2026-05-12 · commits `ae184a9` (n=25 scan) → `c4d34ee` · `saas/spec/` + `saas/app/` + `saas/scanner/`**

**What was believed.** Four features (F1 non-template dependency, F2 non-bot commit, F3 any PR,
F4 docs/CLAUDE.md) partition repositories into health tiers; dormancy is *diagnosable*, not merely
observable; and a scanner that does this in 60 seconds is a product. `saas/spec/11` states the
confidence plainly: *"The classifier works. H1–H8 confirmed at n=25."*

**Evidence available at the time.** The n=25 portfolio scan and eight hypotheses validated against
it. No answer key existed; no accuracy figure was computed; none was requested.

**What later contradicted it.**
- `ground-truth/results-2026-08-19.md`: measured against a 10-repo answer key built from disjoint
  signals, the classifier scored **20% exact agreement, 90% within one tier, 8 of 10 over-rated,
  0 under-rated, Spearman ρ = 0.77.** Every error is in the same direction. With 8 errors, a fair
  coin produces an all-one-direction result once in 128.
- The mechanical cause is stated in the same file: all 8 mis-rated repos lack an external consumer
  and are 30+ days stale, and **F1–F4 measures neither**. *"The classifier is a 2025-era instrument
  reading 2026-era repos."*
- The out-of-time test: of the three repos the May scan called healthy or active, one produced a
  further week of work and none was active 99 days later. The two repos that *were* active
  (MATI, anti-silo) did not exist in the scan.
- `saas/spec/01`'s Claim 2 (an addressable Israeli indie segment inferred from 37% Hebrew repos) is
  contradicted by `saas/spec/11` in the same commit round, which concedes the signal is n=1.

**What remains useful.** ρ = 0.77 is a real ordering signal, and `results-2026-08-19.md` §5.1 says
so explicitly: *"Do not delete the classifier. Re-anchor it."* GitHub ingestion, the authorship
detectors and the outcome collector are thesis-independent.

**What became too narrow.** "Health" as a repository property. The measurement showed the property
that mattered was whether anything outside the repo consumed it, which is a property of the
relationship, not of the repo.

**What was never validated.** Every commercial claim: pricing, CAC, LTV, conversion, market size,
the Israeli segment. Zero sales, zero signups, zero users. The kill criteria in `spec/11` (zero
paying users at week 4) were never evaluated because the launch never happened.

---

## Phase C — Playbook prescription
**2026-05-12 · Phase 3 and 4 shipping rounds · 5 skills, 6 commands, 17 insights, 7 playbooks**

**What was believed.** Prescription beats measurement: mapping tier plus dormancy pattern to a
named playbook closes the gap between insight and action, and buyers pay $29–$129 for the mapping.

**Evidence available at the time.** 17 promoted patterns, a 5-criterion monetization gate at 4/5,
and a self-application test against a *hypothetical* sixth repo (`maya-walkthrough.md`, marked
hypothetical by LOG anti-pattern #9).

**What later contradicted it.**
- The gate is not a gate. pre-call's critique, recorded in `research/pre-call/extracted-insights.md`
  12:13: *"a definition of done that your strongest capability can satisfy is not a gate, it is a
  treadmill."* All 12 audited candidates scored 4/5 or 5/5. Nothing has ever failed the gate.
- `four-feature-tier-classifier.md` was shipped claiming the classifier never over-rates. Measured:
  all 8 errors were over-estimates. The claim was corrected in place on 2026-08-19.
- Rule 1 ("evidence or defer") had passed 43 of 43 pointers across 15 shipped insights that in fact
  resolved to prose this repository wrote about itself.

**What remains useful.** The insight schema. After the 2026-08-19 repair it carries
`evidence-resolves-to` (measured, not asserted), `may-report`, `may-assert-cause`, `reversibility`
and `score-history`. That schema is a claim record with authority fields, and it survives every
subsequent thesis change.

**What was never validated.** That anyone will pay for a playbook. Zero units sold. The launch
checklist was written and never executed.

---

## Phase D — Genesis Mode
**2026-05-13 · commits `99dd290`, `f608827`, `38087d8`, `2402275`, `80c9da2`**

**What was believed.** The classifier is bidirectional. *"F1–F4 are not just measurement features.
They are constructible constraints."* Reverse mode audits an existing repo; forward mode compiles
a new one from an intent paragraph, through an 18-question elicitation protocol, a `ProjectSpec`
intermediate representation, a sharpness validator, and a scaffold compiler that emits `CLAUDE.md`,
`LOG.md`, `README.md`, `docs/spec.md`, `.claude/ontology.json` and `.claude/tier-a.contract.yml`.

**Evidence available at the time.** Two fixtures compiled (kolzchut at sharpness 100/100, lessons
at 98/100). A frozen prompt (v1.0.0) at temperature 0 with a stability test requiring entity
Jaccard ≥ 0.80 and sharpness standard deviation ≤ 5.0. An independent validation in which a fresh
agent built a second CRP linter from the spec text alone and both linters agreed.

**What later contradicted it.**
- The compile target. `tier-a.contract.yml` encodes F1–F4 as requirements. F1–F4 was subsequently
  measured to over-rate by a tier and to miss the only two signals that mattered. **Genesis compiles
  toward a target that the measurement demoted.**
- The stability test measures repeatability, never accuracy. `portfolio-as-one-mechanism.md` §6.1:
  *"A biased extractor scores perfectly on both."*
- The CRP spec records its own circularity in its own commit message: *"spec was written after
  seeing lessons."*

**What remains useful, and it is the most under-rated asset in the repository.** The elicitation
protocol is not about repository health. Its 18 questions ask what must never happen, which state
transitions are illegal, what the constraint true at every moment is, what the failure mode in
similar systems is, and what sentence would make a domain expert wince. **Those are questions about
claims and invariants, not about repository hygiene.** They already elicit the inputs an assurance
contract needs; they were merely pointed at the wrong output.

**What was never validated.** That a generated scaffold changes any project outcome. Two fixtures,
both authored by the same operator, neither built from.

---

## Phase E — Evidence, authority and gate mechanisms surface across the portfolio
**2026-08-19 · commits `315d3ce`, `4c2ebf5`, `9bdfd3c`, `6d84ff1`, `dcfeac5`, `9903bcc`, `5be7bd6`, `421a3d4`, `528041c`**

**What was believed** (and this was a research finding, not a product thesis). The twelve repos in
scope are nine independent implementations of one engine with nine components: intake, deterministic
extraction, rubric scoring, provenance guard, promotion gate, authority boundary, cross-case
aggregation, packaging, calibration. `lessons` is the ninth instance, not a meta-layer above them.

**Evidence available at the time.** File-level identification of each component in each repo. Byte-
level verification that COR-SYS and ampaign-craft share 8 identical type files. The same promotion
gate written three times in three languages by repos sharing no code. Two independent
implementations of a five-factor confidence product.

**What this round contradicted in earlier phases.** Almost everything load-bearing:

| Earlier belief | What contradicted it |
|---|---|
| AI contribution can be counted from `git log --author` | 12-repo measurement: MATI hides 81 of 86 agent commits, `_crm` undercounts 23×, proofminer 193 of 229. `lessons` itself carries 14 hidden-agent commits |
| "AI tools: none detected" is a finding | the one checkable case (`Benchmark.ATS`) was wrong |
| Tier A describes 13 repos | with F5 and recency: 3 of 40 |
| Promotion is one bit | MATI has five rungs and two independent flags |
| Rule 1 guarantees evidence | 43 of 43 pointers resolved to this repo's own prose |
| The gates fire | R2 and R3 could never fire; found only by deliberately breaking a file |
| A correction is a fix | LOG #23: a correction written from the wrong repository survived four commits |

**What remains useful.** All of it. This phase produced the repository's only measurements.

**What was never validated.** That any of it is a product.

---

## Phase F — Candidate current thesis: AI Delivery Assurance
**Proposed 2026-09-03 · tested in `THESIS_TEST.md`**

**What is proposed.** `lessons` becomes the assurance layer for software built by AI agents:
Intent → Claims → Required Evidence → Gates → Authority → Release / Refuse / Defer. First buyer:
AI-native software agencies and implementation consultancies delivering multiple client projects
with coding agents.

**Evidence available now.** Thirteen level-6 principles with executable implementations across
repos sharing no code (`METHOD_LINEAGE.md`). One working gate engine
(`check-lessons-contract.py`, R1–R6, verified passing this session). One measured accuracy result.
One measured gate-reliability result. One open preregistered prospective test. One waiver register.
One failure ledger with 23 entries.

**Evidence that does not exist.** Any external buyer. Any external project. Any external operator.
Any revenue. This is stated at the top of `THESIS_TEST.md` §C and drives the decision.

---

## The one-line lineage

```
A  research corpus            ->  the taxonomy was wrong, the observations were not
B  RepoHealth / F1-F4         ->  measured: orders well (rho=0.77), over-rates by a tier
C  playbook prescription      ->  the gate never rejected anything; nothing was ever sold
D  Genesis forward compiler   ->  right instrument, wrong compile target
E  the portfolio as one engine->  the only phase whose claims were measured
F  AI Delivery Assurance      ->  under test
```

The single sentence that survives every phase transition, because each phase produced it again on
different evidence:

> **The apparatus is cheap now. What stayed expensive is knowing what the apparatus proves.**

Phase B found it in repositories (F1–F4 measures apparatus; MATI acquired all four in eleven hours).
Phase C found it in its own gate (a 4/5 criterion any well-written insight passes). Phase E found it
in its own scripts (half of them shipped with a defect that would have produced a confident wrong
answer). That is the same finding three times, on three substrates, and it is the strongest reason
to take Phase F seriously.
