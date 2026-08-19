# pre-call — Raw Insight Candidates

> Phase 1 deep-dive, 2026-08-19. Repo: `ereztash/pre-call` — "PRE-CALL / POST-CALL", discovery-call
> preparation and a proposal that returns the buyer's pain and value in their own words.
> Proprietary licence, live at `https://pre-call-swart.vercel.app/`.
> Verified locally: 224 commits (185 non-merge), 44 PRs, 25 branches, 2026-08-06 → 2026-08-19.
> **Active today.** Tier A under the F5 rule — one of three in a 40-repo portfolio.

---

## 2026-08-19 12:10 — A stopping rule with a measured failure probability, not an estimated one

**Dimension guess**: user-to-user
**Evidence**: `docs/stopping-rule.html` — Annett & Duncan 1967 Hierarchical Task Analysis; `P × C > acceptable`; header reads "400 runs · 131 commits · 633 functions × 5 routes"; `consequenceIfWrong` on five commitments in `assets/pc-commitments.js`
**Observation**: The repo publishes its own decomposition-stopping rule as a research artifact. It states the rule as a **product, not a threshold on either factor**: keep decomposing only while (probability the step is performed wrongly) × (what it costs when that happens) is too high. A step that fails often but costs nothing — stop. A costly step that never fails — stop. What makes it an instrument rather than an opinion is stated in the document itself: **P was measured across 400 runs and C is written in the code.** The measurement table carries per-failure-mode probabilities with before→after movement: number extraction from spoken words 0/96 (P=1.00), method chip naming a method with no data 144→0 (P=0.72→0.00), demo route reaching a price 0→22/22 (1.00→0.00), no-budget detector 49/49 on synthetic (0.00) but **2/3 on six real calls (0.33)** — the synthetic and real figures reported side by side, with the real one worse.
**Mechanism hypothesis**: This is component C9 (calibration and ground truth) implemented better than anywhere else in the portfolio — including `lessons`, whose own gap analysis (`portfolio-as-one-mechanism.md` §6.1) says it measures stability and conformance but never accuracy. pre-call measures accuracy per failure mode, keeps the synthetic-vs-real gap visible, and ties the stopping decision to it. The portable rule: a stopping rule is only an instrument if both of its factors are measured; otherwise it is a preference wearing a formula.

---

## 2026-08-19 12:13 — A definition of done that no amount of code can satisfy

**Dimension guess**: user-to-user
**Evidence**: `docs/market-ready.md` (added in two commits: `e39c76a` "A definition of done that no amount of code can satisfy", +127 lines; `13924aa` "A kill test, next to the definition of done", +88 lines); six binary conditions D1–D6 with thresholds, threshold provenance, and status
**Observation**: The document opens by naming what it refuses to measure — *"not tests, not weight, not coverage, not design, not documentation. Those are already high and are not what is missing."* — and then states the point: **"Every condition here requires a stranger. None of them can be completed by writing code."** D1 requires ten strangers to arrive with ≥4 having no prior acquaintance, sourced from Faulkner's 10-participant coverage figure, with the ≥4 justified as a caveat rather than a sample. Current status is recorded in the table as **0**. D4 requires one stranger to have paid *and* `POSTCALL_KEYS` configured so the key is enforced — *"without enforcement it is not a sale, it is an agreement"* — and its status reads **"no — tested today: `not_configured`"**. D2's threshold is explicitly marked **"a line that was set, not derived."**
**Mechanism hypothesis**: Three disciplines in one artifact that the rest of the portfolio does not have together. Thresholds are locked before the round. Each threshold names where it came from, and the arbitrary one is labelled arbitrary. And the DoD is deliberately unsatisfiable by the activity the operator is best at and most likely to substitute — writing more code. Compare `lessons`, which ships playbooks gated on a 4/5 monetization score that any well-written insight passes. Portable rule: a definition of done that your strongest capability can satisfy is not a gate, it is a treadmill.

---

## 2026-08-19 12:16 — The DoD and its supervising agent live in one file, because the drift was measured

**Dimension guess**: claude-to-claude
**Evidence**: `docs/market-ready.md` §1 — *"One file, not two. A DOD in one place and an agent supervising it in another place are two documents that must agree, and that is exactly the drift surface this repo has already measured on itself three out of three times."*; sections "מד הסחיפה" (drift meter), "פנקס האשראי — זהו הכיול" (the credit ledger — this is the calibration), "יומן עקיפות" (bypass log)
**Observation**: The repo measured its own specification drift, got 3 out of 3, and responded by collapsing the spec and its supervisor into a single file so they cannot disagree. It then added a drift meter and a **bypass log** — a record of the times the gate was gone around.
**Mechanism hypothesis**: Every other repo in the portfolio that installs a gate (MATI's contract checks, anti-silo's 250-line guard, `lessons`' promotion rule) assumes the gate holds. This one instruments the gate's own failure. The bypass log is the artifact that makes an authority boundary honest: a gate with no record of being bypassed is indistinguishable from a gate nobody has needed to bypass. `lessons` has no equivalent — its LOG.md records mistakes, not evasions.

---

## 2026-08-19 12:19 — Branch names are claims about what is wrong, not names of features

**Dimension guess**: claude-to-user
**Evidence**: `claude/provenance-must-be-answered`, `claude/telemetry-says-it-is-not-durable`, `claude/reachable-from-outside`, `claude/ledger-that-works-on-day-one`, `claude/entry-and-quality`; commit subjects `af621b3` "three review findings, all three real", `6055784` "Keep the period the client named, and stop deleting the buyer's receipt"
**Observation**: Of 25 branches, the `claude/*` ones are named as assertions or complaints rather than as features. `telemetry-says-it-is-not-durable` names a finding; `provenance-must-be-answered` names an obligation. Commit subjects follow: they state a judgment ("all three real") rather than describe a diff.
**Mechanism hypothesis**: Sharpens `editorial-commit-voice-escalation` and `branch-as-sprint-container` together. A branch named for a feature closes when the feature exists. A branch named for a claim closes when the claim stops being true, which is a different and harder exit condition — and it is legible in `git branch -r` without opening anything. Portable: name the branch after the thing that must stop being true.

---

## 2026-08-19 12:22 — One documentation file per module, and a weight budget split by what moved

**Dimension guess**: user-to-claude
**Evidence**: `docs/modules/` — a README plus 16 module files (`pc-flow.md`, `pc-ladder.md`, `pc-commitments.md`, `pc-transcript.md`, `pc-numerals.md`, `pc-viz.md`, …) one per `assets/pc-*.js`; `091f162` "Move file headers to docs/modules, split the weight budget by what moved"; 32 `*.test.js` files beside the modules
**Observation**: Module documentation was moved out of file headers into a parallel `docs/modules/` tree, and the code-weight budget was re-split "by what moved". Nearly every module has a co-located test file.
**Mechanism hypothesis**: In-file header comments are invisible to a reader browsing the repo and they drift silently because nothing reads them. A parallel doc tree with one file per module is greppable, diffable in review, and its absence for a new module is visible. This is the `contract-check-as-ci-gate` instinct applied to documentation: make the artifact's absence detectable.

---

## 2026-08-19 12:25 — The README states the boundary of its own market

**Dimension guess**: user-to-user
**Evidence**: `README.md` — *"The product is intended for sellers of automation and process-improvement services. This is not an audience chosen for the sake of a message: the value engine rests on a process that can be quantified — time saved, hourly cost and defects — and on the scope templates of this vertical. For someone selling a service that does not quantify that way, the price here will come out of the other methods and the tool's central claim will not work."*; also *"The system does not promise a proposal will close. Budget, competition, execution quality and who is in the room are outside its control."*
**Observation**: The README names, unprompted, the customer for whom the product does not work and the outcome it does not control — before describing what it does.
**Mechanism hypothesis**: Second instance of `commercial-doc-as-spec`, in a stronger form. anti-silo and Agent-Architect commit business documents that constrain what the code may claim; pre-call commits a **negative** scope claim, which is harder to write and much harder to walk back. A stated non-market is a testable commitment: the moment the operator sells to someone outside it, the README is the record of the decision.
