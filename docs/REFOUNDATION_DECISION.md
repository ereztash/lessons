# RE-FOUNDATION DECISION

> Dated 2026-09-03. Baseline `f4fc70a`. Produced after `BASELINE.md`, `ASSET_REGISTER.md`,
> `METHOD_LINEAGE.md`, `PRODUCT_LINEAGE.md`, `THESIS_TEST.md`, `ASSURANCE_MODEL_FIT.md`,
> `CONTRADICTIONS.md` and `DO_NOT_TOUCH.md`.

---

# DECISION: `PROCEED_SERVICE_ONLY`

The **methodological** thesis is supported. The **commercial platform** thesis is not supported,
and it is unsupported rather than refuted, which is a different and more useful verdict.

| Sub-thesis | Verdict | Decisive evidence |
|---|---|---|
| A reusable assurance system genuinely emerged from the portfolio | **SUPPORTED** | 13 principles implemented as executable code in repositories sharing no code, in 3 languages, most predating any taxonomy that names them (`METHOD_LINEAGE.md` §2) |
| The problem is real | **SUPPORTED** | this repository is an instance: 14 of 14 CI runs failed over 4 months, unread, while its README announced a completed phase |
| The object model can represent real cases | **SUPPORTED at v1.1** | v1.0 failed 3 of 10 portfolio cases; v1.1 represents all 10 (`ASSURANCE_MODEL_FIT.md` §6) |
| The framing is novel | **REFUTED** | claim/argument/evidence is the assurance-case discipline (GSN, DO-178C); the commercial shape is Vanta's |
| AI-native agencies will pay for it | **UNSUPPORTED** | n=0 buyers, n=0 external projects, n=0 revenue. Nobody has been asked |
| A cross-project failure lineage is the moat | **UNSUPPORTED, zero instances** | no artifact in 40 repositories tracks a failure class across projects |

`PROCEED_ASSURANCE_PLATFORM` is deferred behind ten preregistered thresholds in
`product/FIELD_PREREGISTRATION.md`, all of which currently read zero.

---

## BLUF — what Lessons actually is after the audit

Lessons is not a research repository that grew a SaaS. It is **one operator's working assurance
method, discovered independently nine times across his own portfolio and then instrumented on
itself** — a corpus of 40 repositories, 76 observations, 29 promoted patterns, 23 recorded failures,
one measured accuracy result, one measured gate-reliability result, one open preregistered
prediction, and one working six-rule gate engine.

Its most valuable asset is not the SaaS, the playbooks, or the classifier. It is the discovery that
**a green check nobody has seen go red is not evidence**, arrived at three times on three substrates:
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

1. **A measured failure ledger with denominators.** Twenty-three recorded failures, four gate
   classes with P floors, and the finding that the riskiest gates are the ones that *build* the
   tools rather than the ones that judge claims. A competitor can copy the idea in an afternoon and
   cannot copy the numbers.
2. **Positive-control discipline, with a real instance.** R2 and R3 passing vacuously for a full
   round, found only by deliberately breaking a file. Almost nobody does this, and having done it
   once is what makes it a checklist item rather than a slogan.
3. **The reality ladder, with the corpus behind each rung.** R2 synthetic against R5 real is not an
   abstraction here: 49/49 against 2/3, printed side by side.
4. **Agent attribution.** Author names undercount agent work by up to 23× (`_crm`: 211 trailers, 9
   authors). Nothing else in the market can compute which claims an overnight agent run invalidated,
   because the obvious signal is wrong by an order of magnitude and that has not been published.

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

**Evidence that it is worth its fee with no platform:** run against this repository in under an
hour, the model produced four true findings that no document here had recorded (`ASSURANCE_MODEL_FIT.md`
§7), on a subject whose entire purpose is evidence discipline.

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
| the object model works at v1.1 | `ASSURANCE_MODEL_FIT.md` §6 |
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

A reusable assurance system did emerge. It emerged nine times, in three languages, in repositories
sharing no code, mostly before anything named it. That is real, and this decision makes it explicit
and executable.

It emerged in one person's work, and nothing here has ever been tested on anyone else's. That is
also real, and this decision refuses to sell a platform on it.
