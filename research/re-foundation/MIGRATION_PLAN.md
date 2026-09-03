# MIGRATION PLAN — After `PROCEED_SERVICE_ONLY`

> Written 2026-09-03, after `docs/REFOUNDATION_DECISION.md`. Scoped to what that decision
> authorizes, which is a service and not a platform.
>
> **No mass rewrite. No clean-slate rebuild. No mass file move.** Where the candidate tree in §10 of
> the brief would improve navigation, `docs/AUTHORITY_MAP.md` is the map, and a map is cheaper and
> safer than a move: every move must preserve links, citations, git discoverability, scripts,
> research reproduction and provenance, and a map preserves all six by construction.

---

## 0. What has already been done in this round

| Change | Why it was in scope | Verified |
|---|---|---|
| `.github/workflows/node.js.yml` replaced with the contract gate plus a positive control | `REFOUNDATION_DECISION.md` 30-day action step 1; the previous workflow failed 14 of 14 runs and nothing consumed the result | both jobs run green locally; the positive control fires R1, R2 and R3 on a deliberately broken file |
| `scripts/gate-positive-control.sh` added | makes "a green check never observed to go red is not evidence" executable rather than remembered | run: all three rules fired |

Deliberately **not** done: a TypeScript typecheck in CI. Measured 2026-09-03, `npx tsc --noEmit`
in `saas/app` reports 8 errors, in code this plan marks `ARCHIVE`. A blocking check would be red; a
`continue-on-error` check would be an UNCONSUMED gate. Recorded as a finding instead.

---

## 1. KEEP AS RESEARCH CORPUS — historical evidence, untouched

`research/cor-sys/`, `groundstate-protocol/`, `chess-mind-patterns/`, `core-unified-consciousness/`,
`mati/`, `anti-silo/`, `agent-architect/`, `crm-google-ai/`, `agency-insight-analyzer/`,
`pre-call/`, `proofminer/`, `portfolio-scan/`, `self-application/`, and all of `ground-truth/`.

**Action: none.** No move, no rename, no edit. `DO_NOT_TOUCH.md` covers five classes within it.
One optional, additive change: append the clone's `git remote get-url origin` to
`research/groundstate-protocol/`, closing LOG anti-pattern #18. Append only.

## 2. PROMOTE TO METHODOLOGY CORE — cross-domain principles

Create `methodology/` as **an index, not a copy**. Each entry is a pointer plus the level from
`METHOD_LINEAGE.md` §2, so the corpus stays the single source and the index cannot drift into a
second version of it.

| Promoted | Source stays at |
|---|---|
| 13 level-6 principles | `research/re-foundation/METHOD_LINEAGE.md` §2 |
| the reality ladder R0–R6 | `ASSURANCE_MODEL_FIT.md` §3 |
| the four carry-forward rules | `DO_NOT_TOUCH.md` §6 |
| the 23 anti-patterns | `LOG.md`, append-only, never renumbered |

**Constraint:** `methodology/` may contain no claim absent from the corpus, and every entry carries
its generalization level. **Nothing may be written at level 7.**

## 3. MIGRATE TO ASSURANCE ENGINE — executable mechanisms

| Mechanism | Today | Target | Note |
|---|---|---|---|
| R1–R6 contract rules | `scripts/check-lessons-contract.py` | `assurance/engine/` | **move only when a second consumer exists.** One consumer plus one file is the correct architecture today |
| claim schema | `insights/_template.md` | `assurance/schema/claim.md` | extend to v1.1 (`ASSURANCE_MODEL_FIT.md` §5): `produced_by`, `derives_from`, `claim_set_status`, `result_consumed_by`, `Evidence.subject`, field-requirement owner |
| promotion register | `research/cross-repo/patterns-matrix.md` | stays | it is corpus and engine at once; splitting it breaks citations |
| waiver register | `ground-truth/bypass-log.md` | stays | frozen; the engine reads it |
| positive-control register | `scripts/gate-positive-control.sh` | `assurance/controls/` | one control exists; a directory for one file is premature |

**Rule: no directory is created for fewer than two members.** The corpus's own evidence for this is
`saas/`, where three product names and 18,519 lines of scaffolding surround zero users.

## 4. REUSE AS ADAPTER

| Asset | Lines | Role |
|---|---|---|
| `saas/app/src/lib/github/scanner.ts` | 104 | GitHub ingestion |
| `saas/scanner/src/fetcher/` | — | rate-limited fetch, retry, author classification |
| `scripts/detect-agent-authorship.sh` | — | **the differentiator**: agent attribution, without which agent-aware invalidation cannot be built |
| `scripts/collect-outcome-evidence.sh` | — | evidence collection |

**Action: none now.** Adapters are extracted when the audit checklist needs them, not before.

## 5. REFRAME

| Asset | From | To |
|---|---|---|
| Genesis elicitation (18 questions, `elicitation-questions.ts`, `elicitor.ts`, `llm-elicitor.ts`, `validator.ts`, `stability-test.ts`) | compile a Tier-A scaffold | **compile an assurance contract**: claims, invariants, required evidence, reality floors, field requirements |
| `.claude/tier-a.contract.yml` renderer | F1–F4 requirements | `assurance.contract.*`: claims with reality floors, gates only for mechanically testable claims, field-required for the rest |
| `pipelines/dual-repo-session.md` | working on `lessons` plus a target repo | the shape of a client engagement |
| `products/playbooks/*` | products at $29–$129 | audit checklist sections. **2 of 7 survive**: `ai-cross-review-setup` (adversarial second surface) and `ai-review-event-instrumentation` |
| `.claude/skills/monetization-auditor.md` | a 4/5 gate nothing has ever failed | an authority evaluator, or retire it |

**Genesis constraint:** do not generate a gate for a claim that cannot be mechanically tested.
An ungated claim becomes `FIELD-REQUIRED` with an owner, never a gate that always passes.

## 6. SUPERSEDE — marked, never deleted

`saas/spec/00`, `01`, `02`, `03`, `07`; `saas/app/src/lib/classifier/`;
`saas/app/supabase/migrations/`; `products/pricing-hypotheses.md`; `products/launch-checklist.md`;
`index/MOC-MONETIZATION.md`.

**Action:** one `> SUPERSEDED YYYY-MM-DD by <path>. Retained as the record of <what>.` line at the
top of each. No content edits. `docs/AUTHORITY_MAP.md` §3 is the register.

The most important marking: `saas/app/src/lib/classifier/tier.ts` still returns Tier A at three
features, after the measurement that demoted it. It is not deployed, so it is marked rather than
fixed.

## 7. FIELD TEST — commercial assumptions

Every commercial assumption in the repository, without exception: price points, hours saved, the
ICP, willingness to pay, the moat, whether failure classes repeat, and whether elicitation works
without its author. All ten conditions are registered in `product/FIELD_PREREGISTRATION.md` and all
ten currently read zero.

## 8. DELETE — mechanically dead duplicates with no historical role

**Nothing is deleted.** Three candidates were assessed in `ASSET_REGISTER.md` §10 and all three are
load-bearing provenance for `PRODUCT_LINEAGE.md`. The largest, `saas/scanner/src/classifier/` and
`src/report/` at roughly 2,000 lines, is the only executable record of the PortfolioPilot naming and
of the editorial-voice and publish-button detectors.

## 9. Sequence

| Order | Step | Gate before starting |
|---|---|---|
| 1 | **done** — CI gate plus positive control | — |
| 2 | supersession markers (§6) | `AUTHORITY_MAP.md` §3 exists |
| 3 | derive the drift-prone counts instead of stating them (`AUTHORITY_MAP.md` §5) | §2 done |
| 4 | write the audit checklist from `ASSURANCE_THESIS.md` §5 | — |
| 5 | run the audit on `lessons` and one other portfolio repo, timed | §4 done |
| 6 | anonymize the `lessons` case into a two-page sample | §5 done |
| 7 | five agency conversations | §6 done |
| 8 | first paid pilot, `product/pilots/1-*.md` created **before** the audit | §7 done |
| 9 | schema v1.1 as files inside an audited repository | after pilot 1 |
| 10 | anything multi-tenant | **all ten thresholds in `FIELD_PREREGISTRATION.md` §2** |

Steps 2 through 8 involve no new application code. Step 10 is currently unreachable, by design.

## 10. What would make this plan wrong

- The prospective test resolves against F5 on 2026-11-17, which would mean the corpus's most recent
  instrument correction failed and every tier-derived statement needs re-deriving.
- A second, blind labeller produces materially different ground-truth labels, which would undermine
  the accuracy measurement this whole decision rests on.
- The first external audit produces no finding the team did not already have, which refutes the
  service, not only the platform.
