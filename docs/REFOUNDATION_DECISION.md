# RE-FOUNDATION DECISION

> Dated 2026-09-03. Baseline `f4fc70a`. Produced after `BASELINE.md`, `ASSET_REGISTER.md`,
> `METHOD_LINEAGE.md`, `PRODUCT_LINEAGE.md`, `THESIS_TEST.md`, `ASSURANCE_MODEL_FIT.md`,
> `CONTRADICTIONS.md` and `DO_NOT_TOUCH.md`.

---

# DECISION: `PROCEED_SERVICE_ONLY` — SALE GATED

> **Narrowed 2026-09-03, the same day, after the adversarial pass required by §28 of the brief.**
> The pass did not refute the decision. It refuted the claim that this round had already
> instrumented itself against its own thesis: it found that **R4 of the contract gate could never
> fire**, that this round's first positive control covered only the three rules already known good,
> and that four figures in the first draft of these documents did not resolve to the files they
> cited. Those are fixed, the fixes are verified, and the corrections are recorded in place rather
> than overwritten. The four conditions in "Engineering authorization" now gate the sale, not just
> the platform. Full report: `research/re-foundation/ADVERSARIAL_PASS.md`.

The **methodological** thesis is supported. The **commercial platform** thesis is not supported,
and it is unsupported rather than refuted, which is a different and more useful verdict.

| Sub-thesis | Verdict | Decisive evidence |
|---|---|---|
| A reusable assurance system genuinely emerged from the portfolio | **SUPPORTED, within one portfolio** | 13 principles implemented as executable code in repositories sharing no code, across TypeScript, Python and JavaScript (`METHOD_LINEAGE.md` §2). **Drawn from 8 of 40 repositories, and those 8 were selected by exhibiting the mechanism** (`METHOD_LINEAGE.md` §3, added after the adversarial pass) |
| The problem is real | **SUPPORTED** | this repository is an instance: 14 of 14 CI runs failed over 4 months, unread, while its README announced a completed phase |
| The object model can represent real cases | **completeness check passed, not a testable sub-thesis** | v1.0 failed 3 of 10 portfolio cases and strained on a 4th; v1.1 expresses all 10. **No case is registered that v1.1 could fail**, so this cannot come back negative and does not belong in the same column as a measurement (`ASSURANCE_MODEL_FIT.md` §6, corrected after the adversarial pass) |
| The framing is novel | **REFUTED** | claim/argument/evidence is the assurance-case discipline (GSN, DO-178C); the commercial shape is Vanta's |
| AI-native agencies will pay for it | **UNSUPPORTED** | n=0 buyers, n=0 external projects, n=0 revenue. Nobody has been asked |
| A cross-project failure lineage is the moat | **UNSUPPORTED, zero instances** | no artifact in 40 repositories tracks a failure class across projects |

`PROCEED_ASSURANCE_PLATFORM` is deferred behind **eleven** preregistered thresholds in
`product/FIELD_PREREGISTRATION.md`, all of which currently read zero — and behind a limit that
deferral does not remove: **P4 counts a failure class recurring across three projects without asking
whether the constant is the code or the auditor.** A full pass would still leave the platform's
central premise partly unmeasured. That is recorded in `FIELD_PREREGISTRATION.md` §3 rather than
left to be discovered after five pilots.

---

## BLUF — what Lessons actually is after the audit

Lessons is not a research repository that grew a SaaS. It is **one operator's working assurance
method, discovered independently across eight of his own repositories and then instrumented on
itself** — a corpus of 40 repositories, 76 observations, 29 promoted patterns, 16 recorded failures
(#11–#26; #1–#10 are prophylactic and measure nothing, per `gate-reliability.md` §1),
one measured accuracy result, one measured gate-reliability result, one open preregistered
prediction, and one working six-rule gate engine.

Its most valuable asset is not the SaaS, the playbooks, or the classifier. It is the discovery that
**a green check nobody has seen go red is not evidence**, arrived at four times on four substrates,
the fourth of them today when the adversarial pass found that this round's own R4 could never
fire and that its first positive control had been pointed at the three rules already known good:
in repositories (F1–F4 measures apparatus, and apparatus became cheap), in its own promotion gate
(a 4/5 criterion nothing has ever failed), and in its own scripts (two of five gates could never
fire, and half the scripts written in one day shipped with a defect that would have produced a
confident wrong answer).

That finding is sellable as a service now. It is not yet sellable as a platform, because it has
never been observed outside this operator's work.

## What changed — which earlier thesis no longer controls

**RepoHealth no longer controls.** Its core claim, *"the classifier works, H1–H8 confirmed at
n=25"*, was measured against a 10-repo answer key on 2026-08-19: **20% exact agreement, 8 of 10
over-rated, 0 under-rated, Spearman ρ = 0.77.** Every error runs one direction. The mechanical cause
is that all 8 mis-rated repositories lack an external consumer and are 30+ days stale, and F1–F4
measures neither.

The classifier is not deleted. ρ = 0.77 is a real ordering signal and `results-2026-08-19.md` §5.1
says so. It is demoted from *the product* to *one adapter's heuristic*.

**The solo-builder ICP no longer controls**, and it was structurally doomed rather than merely
unlucky: an assurance case is worth what it costs to be wrong in front of someone else, and a solo
builder asserts readiness to nobody. Zero playbooks sold is consistent with that, not with bad
distribution.

**Genesis is not superseded. It was pointed at the wrong target.** Its 18-question elicitation
protocol asks what must never happen, which state transitions are illegal, what constraint holds at
every moment, and what failure mode appears in similar systems. Those are questions about claims and
invariants. The protocol survives; `.claude/tier-a.contract.yml`, which compiles toward the demoted
F1–F4, does not.

## What survives

| Asset | Why it survives |
|---|---|
| `LOG.md` | the only asset whose value has been measured: it supplies the failure denominator for four gates |
| `ground-truth/` in full | the only accuracy measurement, the only gate-reliability measurement, the only preregistered test, the only waiver register |
| `scripts/check-lessons-contract.py` | a working assurance engine, R1–R6, verified passing this session, each rule ported from a repo that already had it |
| `insights/_template.md` | a claim record with authority fields: `evidence-resolves-to` (measured, not asserted), `may-report`, `may-assert-cause`, `reversibility`, `score-history` |
| `portfolio-as-one-mechanism.md` | the assurance model in embryo: C4 provenance, C5 promotion, C6 authority, C9 calibration |
| `authorship-attribution.md` + `detect-agent-authorship.sh` | the measurement that makes agent-aware invalidation possible |
| Genesis elicitation + validator + stability test | the claim-elicitation instrument |
| `pipelines/dual-repo-session.md` | the only artifact describing this system operating on a repository that is not itself |
| GitHub ingestion, outcome collector | thesis-independent adapters |

## Core IP — what is genuinely hard to reproduce

1. **A measured failure ledger with denominators.** **Sixteen observed failures** (#11–#26), of
   which twelve carry a gate class. **Corrected 2026-09-03**: an earlier draft said "twenty-three",
   which counts #1–#10, the prophylactic rows `gate-reliability.md` §1 says "measure nothing".
   The ordering "the riskiest gates build the tools" is a **hypothesis over four unequal
   denominators (6, 8, 40, 134) with no intervals**, not a measured prior, and per file the gate
   figure is 2 of 6 rather than 0.500 (`gate-reliability.md` §6 C4–C5). It may not be sold as
   "a number no competitor has".
2. **Positive-control discipline — and `lessons` is not its strongest implementation.**
   **Corrected 2026-09-03**: `ereztash/--Android`, excluded from this round by an enumeration error
   (`ENUMERATION_CORRECTION.md`), runs each gate's positive control *first* and fails the whole
   build with `NOT-A-GATE` if the control comes back green, "regardless of what the gate said about
   the real tree". Its controls are planted defects, including a real assembled APK carrying the
   INTERNET permission. That is the rule as a build gate; what follows is the same rule as a script,
   in this repository, and it is the weaker instance.
   R2 and R3 passed vacuously for a full round. **R4 passed vacuously for two**, including through
   this round's own first positive control, which covered exactly R1, R2 and R3 — the three already
   known good. Fixed and verified 2026-09-03: `scripts/gate-positive-control.sh` now breaks the
   corpus once per rule and R1, R2, R3, R4 and R6 each go red. R5 is the `--bypass` mechanism and
   emits no verdict, so it cannot be controlled this way; `gate-reliability.md` §6 C2 corrects the
   claim that it once was.
3. **The reality ladder, with the corpus behind each rung.** R2 synthetic against R5 real is not an
   abstraction here: 49/49 against 2/3, printed side by side.
4. **Agent attribution.** In 3 of 12 measured repositories an agent commits under the operator's
   git identity (MATI 55/86, proofminer 193/229, `lessons` 14/37), so author-name counting
   undercounts agent work. **Corrected 2026-09-03**: the 12-repo file's maximum is **6.7×**; the 23×
   is `_crm` and comes from `2026-08-19-cohort2.md` §4, outside that table, and `CLAUDE.md` still
   said 6.7×. Both detectors have a documented blind spot and the set has one negative control, so
   the honest claim is "a finding about a naive method", not "nothing else in the market can do
   this".

What is **not** IP: the object model (assurance cases, 30 years old), the workflow shape (Vanta),
the classifier (measured to over-rate), the playbooks (unsold).

## Product wedge — who pays first, for what

**The AI Delivery Assurance Audit**, delivered by hand, to an **AI-native software agency or
implementation consultancy** on a client project it is about to hand over.

Four mechanical reasons, not a TAM argument: a dated high-stakes event exists (handoff); the
readiness assertion is made to a party who can dispute it; the failure classes repeat across
projects, so anything reusable compounds; and the displaced cost is a named budget line, the senior
engineer currently doing an unstructured pre-handoff read.

## Anti-ICP

Solo builders (nobody to be wrong in front of; the ICP that produced zero sales). Regulated
safety-critical vendors (thirty years of prior art, tooling and specialists; quarters-long sales
cycles; nothing in this corpus about safety-critical development). Enterprise platform teams (they
build it). Anyone with no dated moment at which someone must assert readiness.

## First sellable deliverable

The assurance case specified in `product/ASSURANCE_THESIS.md` §5: claims discovered and classified
across PROVEN / PROVISIONAL / NOT-MEASURED / FIELD-REQUIRED / WAIVED / CONTRADICTED, plus release
blockers, false-green checks, unconsumed gate results, unsupported external claims, silent waivers,
the claim-to-evidence map with reality mismatches, and the highest-return repairs.

**Evidence that it is worth its fee with no platform, stated at the strength it actually has:** a
structured read of this repository produced four true, previously unjoined findings in under an
hour. **Narrowed 2026-09-03** (`ASSURANCE_MODEL_FIT.md` §7): none of the four required the object
model, two were partly on record already so what was new was the join, and the auditor had just
read the whole corpus, so the hour does not transfer. P6 now measures hours on a repository the
auditor has not read.

## Platform boundary

In: claim, evidence (with reality level and producer), authority, gate with positive-control status,
waiver with expiry, field requirement with owner, reversal, lineage. Adapters for GitHub, Actions,
the coding agents, deploy targets, browser automation, scanners, and field-evidence upload.

Out: running the tests, reviewing the code, writing the code, deciding what the claims are, and
anything that requires a stranger.

Surfaces: exactly one at first, the **Release View**, because it is the only one the first paid
workflow needs.

## Evidence index

| Decision | Anchor |
|---|---|
| RepoHealth superseded | `ground-truth/results-2026-08-19.md` §1–§3 |
| the classifier orders but over-rates | ρ = 0.77; 8 of 10 over-rated, 0 under-rated |
| tiers are provisional | `f5-rescore-2026-08-19.md` §5; `prediction-2026-08-19.md` |
| the assurance method is real and independently invented | `METHOD_LINEAGE.md` §2 (13 rows at level 6) |
| the method is operator-bound | `METHOD_LINEAGE.md` §3 (nothing at level 7) |
| the object model works at v1.1 | `ASSURANCE_MODEL_FIT.md` §6. **v1.2 after 2026-09-03**: the three repositories the enumeration error excluded are now expressed directly, and `--Android` exposed **G7**, a waiver offered and declined, which v1.1 could not distinguish from one never offered |
| the problem is real | `BASELINE.md` §2 (14/14 red CI, unread, 4 months) |
| the framing is not novel | `THESIS_TEST.md` §A.1, §A.2 |
| the moat has zero instances | `THESIS_TEST.md` §B |
| the gate discipline is measurable | `gate-reliability.md` §2–§3 |

## Uncertainty — what remains portfolio-only

Everything except the object model's expressiveness. Specifically: all 13 level-6 principles; the
reality ladder; the audit's usefulness to anyone other than this operator; every price; every hours
estimate; the claim that failure classes repeat across projects; and whether claim elicitation can be
performed by someone who did not invent the questions.

**One operator. One portfolio. One agent family. Forty repositories, six of whose most important
findings come from repositories that are 80 to 94 percent agent-written under that one operator's
git identity.**

## Falsifiers

The eight in `product/FIELD_PREREGISTRATION.md` §3, and one that applies now: if a second
labeller, applying `ground-truth/rubric.md` §3 blind, produces materially different labels, then
the accuracy measurement that this entire decision rests on is itself unreliable, and the decision
must be re-derived.

## 30-day action — the smallest sequence producing external commercial evidence

| # | Action | Produces |
|---|---|---|
| 1 | Fix this repository's CI so its gate has a consumer, and add CI to `gate-reliability.md` | the cheapest true statement available, currently false |
| 2 | Write the audit method as a runnable checklist from `ASSURANCE_THESIS.md` §5, with the reality ladder and the positive-control test | the deliverable's production process |
| 3 | Run it end to end on `lessons` and on **one** other repository in the portfolio, timed | the hours estimate for P6, and a sample report |
| 4 | Anonymize the `lessons` case into a two-page sample assurance case | the sales artifact, whose credibility comes from it being self-inflicted |
| 5 | Approach **five** AI-native agencies with the sample and one question: *"before your last client handoff, who decided it was ready, and what did they look at?"* | qualification, and the first external contact |
| 6 | Convert **one** to a paid pilot; create `product/pilots/1-*.md` **before** the audit starts | P1 = 1, and the first non-self data point this method has ever had |

No code beyond step 1 and the checklist in step 2.

## Engineering authorization

**Four conditions gated the first sale. All four are now discharged** (2026-09-03). The audit may be
performed, shown and invoiced, within the scope limits the corpus supports and no wider: every
causal claim in `products/` is now either withdrawn or explicitly scoped to this portfolio.

| | Condition | Status |
|---|---|---|
| 1 | positive-control every rule of the contract gate that emits a verdict | **done** — R1, R2, R3, R4, R6 each observed to go red; R4's regex fixed |
| 2 | correct the 23× citation, the "23 failures" figure and the P=0.500 reading before any of them reaches a sales artifact | **done** — corrected here, in `ASSURANCE_THESIS.md`, `THESIS_TEST.md` and `gate-reliability.md` §6 |
| 3 | add an agent-family-independence threshold before the preregistration is treated as frozen | **done** — P11, added before any pilot, which is the last moment §5 rule 1 allows |
| 4 | **re-audit the 10 insights carrying `may-assert-cause: yes` against `METHOD_LINEAGE.md` §3** and re-derive the 4 playbooks declaring `Claim strength: causal` | **done 2026-09-03, then repaired the same day.** After the demotion the operator opened the portfolio; all 17 unresolvable pointers were re-anchored against live repositories, every cited figure re-counted and held exactly (40 trailers, 69 deletions, a 14-day gap, zero merged PRs), R1 re-measured `hard`, and all seven claims were restored **by the gate rather than by argument**. Corpus resolution moved `hard` 5→12, `mixed` 12→5. One pointer did not return: an absence has no artifact to cite. Original audit: | The template had always required `hard` evidence in ≥2 repos for a causal claim; **R2 never checked it, and 7 of the 10 measured `mixed`.** Those 7 are demoted to `may-assert-cause: no`, each with an appended score-history entry. The 3 that hold now carry **`cause-scope: portfolio`**, because no principle here has been observed outside one operator's work. **R6 then demanded two playbook demotions on its own** — `editorial-commit-voice-escalation` and `resumer-day-prep` are now `observational`. R2 enforces the condition it used to only document, and 3 new positive-control cases prove the new checks go red |

**Authorized now:**
- fix `.github/workflows/node.js.yml`;
- the audit checklist as a document;
- small scripts that reduce analyst hours on work already being done by hand;
- the v1.1 schema **as files inside an audited repository**, version-controlled by its owner.

**Not authorized:** multi-tenant storage, accounts, billing, a hosted API, a dashboard, a GitHub App
running continuously against client repositories, any pricing page, and any material describing
cross-project failure lineage as an existing capability.

**Not authorized as cleanup:** no mass file move. `ASSET_REGISTER.md` assigns a disposition to every
asset and `DO_NOT_TOUCH.md` freezes 5 artifact classes. Where the candidate tree in §10 of the brief
would improve navigation, **a map is cheaper and safer than a move**, and `docs/AUTHORITY_MAP.md` is
that map.

## The governing rule, applied

> Do not make the repository look more coherent than the evidence says it is.

A reusable assurance system did emerge. Thirteen principles, implemented as code in repositories
that share no code, across three languages. That is real, and this decision makes it explicit and
executable.

It emerged in eight of forty repositories, and those eight were selected by exhibiting the
mechanism. It emerged in one person's work, with one agent family, and nothing here has ever been
tested on anyone else's. And the round that found all this shipped its own gate with a rule that
could not fire, behind a positive control pointed at the three rules already known good. That is
also real, and it is why this decision refuses to sell a platform, and gates the first invoice.
