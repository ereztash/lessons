# Evidence After 2026-09-03 — `lichess_app` and `decision-lab`

> Registered 2026-09-28. `produced_by: agent (Claude)`, in a session with the operator; not yet
> reviewed by him. Per `product/ASSURANCE_THESIS.md` §4 an agent may REGISTER_EVIDENCE and
> RECOMMEND_PROMOTION; PROMOTE is human-required. **This file promotes nothing.
> `METHOD_LINEAGE.md` §2 and §3 are unchanged.** Every recommendation below waits for the operator.
>
> **Update, 2026-09-28:** the operator promoted the three 5 → 6 candidates in §1. The promotion is
> recorded in `METHOD_LINEAGE.md` §6, not here. The strongest-implementation review was not part of
> that decision and still waits.

---

## 0. What was read, and why it was missing

`ENUMERATION_CORRECTION.md` read `lichess_app` at `60d84ae`, the day it was pushed (2026-09-03).
Everything after that date is absent from this repository:

| Repository | Range | Commits (merges included) |
|---|---|---|
| `lichess_app` (public line, frozen) | after 2026-09-03 → `373b235` (2026-09-15) | 510 |
| `decision-lab` (private successor) | `b95d78c` (2026-09-15) → `aaf37fa` (2026-09-28) | 188 |

**The two are one lineage, not two occurrences.** `decision-lab` began as a snapshot of
`lichess_app@373b235` (`decision-lab/SOURCE_PROVENANCE.md`), so they share code. For the
"≥2 repos that share no code" test in `METHOD_LINEAGE.md` §1 they count once.

## 1. New evidence, mapped to the register

Pointers are `repo@sha:path`, with the quoted line. `decision-lab` pointers are at `aaf37fa`.

| Register row (§2) | Level now | New evidence | Executable? | Recommendation |
|---|---|---|---|---|
| **Field outcomes cannot be replaced by more engineering** | 5, pre-call only | `docs/PRE_HUMAN_CEILING.md`: *"What is left, and none of it is code"*; `research/player-path/FIELD_RUN_CURRENT.md`: *"No further repository reasoning can substitute for that"* | **yes** — `GATE-FIELD-SAFETY` *"refuses any re-freeze once the count on `main` is above zero"* (`FIELD_RUN_CURRENT.md`, Stop rules) | candidate **5 → 6**: a second repository sharing no code with pre-call, with a gate. **Read §2 first**: the same repository is the strongest counter-evidence in the corpus |
| **Preregistration** | 5, lessons only | `FIELD_RUN_CURRENT.md` § "Frozen before the first participant"; `research/mechanism/replication100/REPLICATION_100_REPORT.md`: *"Every threshold below was fixed in `COHORT_PREREG.json` before a username was chosen"* | **yes** — the stimulus digest is predicted from a local production build before deploy, then every one of 49 served files is fetched and hashed (`FIELD_RUN_CURRENT.md`, "ROW 14 KEPT THE PREDICTION") | candidate **5 → 6** |
| **Measurement and intervention must not silently change together** | 5, lessons only | `CLAUDE.md`: *"A change to the instrument adds its note there, and a bump updates the ledger's `Current version` line in the same commit"*; every decision stamps `quiet_window_exposure` (`FIELD_RUN_CURRENT.md`) | **yes** — `GATE-QUIET-WINDOW-LINEAGE` (`docs/GATES.md`) | candidate **5 → 6** |
| **Instrument repair must not rescue the hypothesis** | 5, lessons only | `docs/MASTER_PRODUCT_DEBT.md` R-18: a candidate threshold *"REJECTED a second time and stands"*; *"fitting a threshold to a plant this harness drew is the post-hoc move"* | partly — the rule was committed (`docs/decisions/D05-blitz-time.md`) before the harness produced a number; no gate checks it | second occurrence; **stays 5** until a check exists |
| **Reversal conditions** | 5, two repos | `docs/decisions/README.md`: *"There is no `status: solved` without a reversal condition."* | no checker found | third occurrence; **stays 5** |
| **Bypass / waiver must be explicit** | 5, two repos | `FIELD_RUN_CURRENT.md` owner decisions 11–13; every superseded registration kept byte for byte under `research/player-path/field/history/` | yes — the registration and its history are machine-read by `GATE-FIELD-SAFETY` | third occurrence. **Read §2**: explicit waivers recorded the drift and did not stop it |
| **A gate must be shown to fail** / **Positive controls** | 6 | `CLAUDE.md`: *"`gates:controls` must report every control red. A new gate ships with a positive control that goes red on a planted fixture."*; `README.md`: 65 gates, each with a control; `tests/docs/the-table-that-fell-behind.test.ts` holds `docs/GATES.md` to the runner in both directions | yes | no level change. Comparable to `--Android`, not claimed stronger: `--Android` runs controls first inside the build, `decision-lab` runs them as a separate command |
| **One successful local run does not imply deployed or user reality** | 6 | `FIELD_RUN_CURRENT.md` re-freeze row 1: *"For two days the deployed reality and the registered authority named different builds, and nothing in the repository said so"* → `GATE-FIELD-FREEZE-CURRENT`; `tests/deployment` run against the live origin, 13 of 13 | yes | **operator review**: candidate for "current strongest implementation" (predict-then-verify on every served byte, with the incident that produced it) |
| **Adversarial second surface** | 6 | `.claude/agents/fable-scientific-reviewer.md`: a different model, read-only tools, *"Prefer killing a weak hypothesis to rescuing it."*; re-freeze row 10: defects *"each reproduced by two isolated contexts"* | yes | additional occurrence |

## 2. Counter-evidence: what the mechanisms did not prevent

Registered with the same weight as §1, because a register that only grows toward its thesis is the
failure `THESIS_TEST.md` exists to avoid.

| Observation | Pointer |
|---|---|
| 65 gates with controls, and **zero participants** 25 days after the repository declared that only field evidence remained | `lichess_app@5c3fddc` *"the pre-human ceiling stated"* (2026-09-03); `decision-lab@aaf37fa:research/player-path/field/REGISTERED_STIMULUS.json` `"participantsRun": 0` |
| **698 commits** (§0) after that declaration | `git log` over both ranges in §0 |
| An explicit owner ruling, *"from its registration the freeze is real"* (decision 11), released twice within 24 hours (decisions 12, 13), each with a written reason | `FIELD_RUN_CURRENT.md`, "Owner decisions recorded before the run" |
| The rationale that normalised each release, in the repository's own words: *"all with `participantsRun: 0`, which is the only condition under which any of them was free"* | `FIELD_RUN_CURRENT.md`, "Re-freeze history" |
| A frozen candidate that passed its checks and carried eight defects *"each of which made P1 to P5 evidence false"*; found by an adversarial audit, not by a gate | `FIELD_RUN_CURRENT.md`, re-freeze row 10 (`67f5651`) |
| The ceiling declaration falsified the next day, and two of its first repairs falsified in turn | `decision-lab@aaf37fa:docs/PRE_HUMAN_CEILING.md` |

**Reading.** The field-outcome gate binds only once a participant exists; before that, the
principle held as prose and an executable waiver trail recorded each deviation. For the assurance
model this means a recorded waiver and a gate that exists are both compatible with the deviation
becoming the norm. This file states the observation and proposes no model change.

## 3. What this does not change

- **Level 7 is still 0.** Same operator.
- **P11 (`product/FIELD_PREREGISTRATION.md`) is not touched, and this file falls inside its
  confound.** `scripts/detect-agent-authorship.sh`, both detectors, 2026-09-28: `decision-lab`
  `commits=163 claude=85 trailer=140 session=85 bursts=0`; `lichess_app`
  `commits=943 claude=759 trailer=810 session=725 bursts=15`. Both are predominantly Claude-written
  by the identity detector, and this registration was produced by Claude. Same agent family on
  both sides.
- **The §3 selection bias applies again.** This lineage is added because it exhibits the mechanism.
- **The reading was not blind.** The agent read `decision-lab` in depth in the same session, so no
  hours figure from it may feed P6.
