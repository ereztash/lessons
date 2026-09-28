# Failure Lineage — Failure Classes Across Projects

> Created 2026-09-28. `produced_by: agent (Claude)`, in a session with the operator; not yet reviewed
> by him. `METHOD_LINEAGE.md` §4 recorded that *"no artifact in the portfolio tracks a failure class
> across projects"*. This is the first such artifact.
>
> **Status: portfolio-internal.** Every instance below is this operator's repository, so none of it
> counts toward `product/FIELD_PREREGISTRATION.md` **P4**, which counts client projects. It also sits
> inside the limit that registration names in advance: *"every class has the same auditor and the
> same agent family behind it"*. See §4.

---

## 1. Rules for a row

1. **Every pointer resolves**: `repo@sha:path`, with the quoted line. A pointer that cannot be opened
   is not evidence (`LOG.md` #28, #31).
2. **An absence is an observation, not a pointer** (`LOG.md` #31). "Nobody was asked" is cited through
   the document that says so, never as a pointer to nothing.
3. **Lineages count once.** `decision-lab` is a snapshot of `lichess_app@373b235`; the two are one
   project for counting (`research/re-foundation/DECISION_LAB_EVIDENCE.md` §0).
4. **Reported is not verified.** An instance taken from another document of this repository without
   re-reading its source is marked *reported*, and is not counted.
5. Each row states whether a gate existed, and whether it caught the failure.

## 2. The classes

### FC-1 — Declared ready, then no external contact

**Definition.** A repository records a state equivalent to "only field evidence remains" or "sale
authorised", and no participant, buyer or order follows.

| Project | Declared | Pointer | What followed | Gate present? Caught? |
|---|---|---|---|---|
| `lessons` | 2026-09-03 | `lessons@252f144:docs/REFOUNDATION_DECISION.md`: *"Four conditions gated the first sale. All four are now discharged (2026-09-03)."* and *"Nobody has been asked"* | no commit on `main` after `252f144` (observed 2026-09-28) | P3 measures it; nothing forces a contact. **No** |
| `lichess_app` → `decision-lab` | 2026-09-03 | `lichess_app@5c3fddc` *"the pre-human ceiling stated"*; `docs/PRE_HUMAN_CEILING.md` | 698 commits across both ranges; `decision-lab@aaf37fa:research/player-path/field/REGISTERED_STIMULUS.json` `"participantsRun": 0` | `GATE-FIELD-SAFETY`, which binds only once `participantsRun` > 0. **No** |
| `Agent-Architect` | by 2026-05-24 | `agent-architect@17ca35f:product/PRODUCT_DEFINITION.md` § "Why this is sellable now"; `product/OFFER.md` line 43, *"₪ 2,400 להזמנה"* | `docs/status.md`: *"Market readiness \| No"*; head commit dated 2026-05-24 | a paid-beta protocol exists; nothing forces an offer. **No** |
| `pre-call` | — | *reported*: `METHOD_LINEAGE.md` §2, *"six binary conditions with recorded status, all currently unmet"* | not re-read | not counted |

**Verified projects: 3.**

### FC-2 — A green check never observed red

**Definition.** A check reports success on a property it was never shown able to detect.

| Project | Pointer | Gate present? Caught? |
|---|---|---|
| `lessons` | `LOG.md` #21, #22 (R2, R3 could never fire); #27 (R4 unfireable through two rounds) | the checks themselves. Caught by deliberate breakage and an adversarial pass, **not by the gates** |
| `lichess_app` → `decision-lab` | `docs/VALUE_CLARITY.md` § "The one control that came back green"; `research/player-path/FIELD_RUN_CURRENT.md` re-freeze row 10: a frozen candidate carrying eight defects *"each of which made P1 to P5 evidence false"* | 65 gates with controls. Caught by an adversarial audit, **not by the gates** |
| `MATI` | *reported*: `METHOD_LINEAGE.md` §2, regex contract checks *"passing vacuously"* | not counted |

**Verified projects: 2.**

### FC-3 — A document that stopped being true, while a check existed

**Definition.** A committed statement becomes false and stays in place, although the repository has
a check covering that area.

| Project | Pointer | Gate present? Caught? |
|---|---|---|
| `lessons` | `README.md` header: *"Three statements in the text below are measurably false as of 2026-09-03"*; `docs/AUTHORITY_MAP.md`: CI *"14 runs, 14 failures"* while the README announced a completed phase | contract gate R1–R6 does not scan `README.md` (`LOG.md` #28). **No** |
| `lichess_app` → `decision-lab` | `research/player-path/FIELD_RUN_CURRENT.md`: the re-freeze history opens *"Eleven moves"* above a table of 14 rows; `docs/MASTER_PRODUCT_DEBT.md` R-21, *"This row has now been wrong in both directions"*; R-46, a self-contradicting row *"Found while auditing the row, not by any check"* | `GATE-DOCS` and `GATE-FIELD-AUTHORITY-CURRENT` cover these documents; neither reads these statements. **No** for all three |
| `Agent-Architect` | `docs/status.md` (*"Market readiness \| No"*) and `product/PRODUCT_DEFINITION.md` (*"Why this is sellable now"*) state opposite answers to one question | no authority map. **No** |

**Verified projects: 3.**

## 3. What the rows share

In all three classes, where a gate existed it did not catch the failure; an adversarial read, a
deliberate breakage or a later audit did. FC-1 is the only class with no detector at all in any
project: nothing in the portfolio measures the time between "ready" and the first external contact.

## 4. The constant, stated before anyone counts

Every instance shares the operator, the agent family (Claude), and the auditor of this file
(Claude). This file therefore **cannot separate** "a failure class of AI-built repositories" from "a
habit of this operator and this agent family". What would separate them is the same class found in a
project by another operator, audited by someone else: P4 together with P10 and P11.

## 5. Adding a row

Append only. Date the row, follow §1, and state the gate. A row may be demoted with a dated note; it
is never deleted (`DO_NOT_TOUCH.md` §3, by analogy with `LOG.md`).
