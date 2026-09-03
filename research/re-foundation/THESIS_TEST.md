# THESIS TEST — An Attempt to Disprove the AI Delivery Assurance Thesis

> Written 2026-09-03, before any product document. The mission of this file is to refute the
> candidate thesis, not to support it. Where it fails to refute, that is recorded as *survived*,
> which is weaker than *supported*.
>
> **Sourcing note.** §A compares the thesis against a competitive landscape drawn from general
> knowledge current to roughly mid-2026, not from a live market scan run in this session. Product
> capabilities move; every named vendor claim below is marked `[unverified]` and must be re-checked
> against current documentation before it is used in a sales conversation or a pitch. The
> *structural* argument in §B does not depend on any single vendor's current feature list.

---

## The thesis under test

**Problem claim.** AI-native delivery organizations have a valuable unresolved problem between
"AI produced code" and "we are justified in claiming this client project is ready."

**Solution claim.** A continuous assurance layer that models claims, required evidence, evidence
authority, gates, positive controls, waivers, field requirements and release authority.

Two claims, and they can fail independently. §A–§B attack the solution claim. §C attacks the buyer.
§D chooses the wedge. §E states what actually killed part of the thesis.

---

## A. Existing market substitutes

For each category: what it solves, what it leaves, and whether the residue is real.

| Category | Representative tools | What it already solves | What it does **not** touch |
|---|---|---|---|
| AI code review | CodeRabbit, Qodo, Greptile, Copilot review `[unverified]` | is *this diff* correct, idiomatic, risky | says nothing about what the *project* claims, or whether a claim still holds after the diff |
| Static analysis / security | Sonar, Semgrep, Snyk, CodeQL | rule violations, known vulnerability classes, coverage | rules are about code properties, not about project promises; "data never leaves the device" is not a lint rule |
| Policy-as-code | OPA/Conftest, Sentinel, Kyverno | machine-checkable policy over config and infra, with a deny decision | the policy subject is configuration. Nothing binds a policy to a *claim*, and nothing records that a policy was never exercised |
| CI/CD quality gates | GitHub required checks, rulesets, environments, protection rules | blocking a merge on a check result | **this is the substrate, and it is free.** It carries no record of what a check is evidence *for*, no record of whether the check has ever failed, and no owner |
| Compliance automation | **Vanta, Drata, Secureframe** `[unverified]` | **the closest analogue by far**: control → required evidence → continuous collection → gap list → exception with an owner and an expiry → auditor-ready report | **the claim set is given by the framework** (SOC 2, ISO 27001). The hard part of delivery assurance is that the claims are project-specific and must be elicited |
| Observability | Datadog, Sentry, OpenTelemetry | what the running system did | evidence of behaviour, not a mapping from behaviour to a promise |
| Engineering intelligence | Faros, LinearB, Jellyfish, Swarmia | throughput, DORA, bottlenecks | measures the process, never the justification |
| Agent governance / evals | LangSmith, Braintrust, Langfuse, Promptfoo `[unverified]` | evaluating **AI features inside a product** | not about software *built by* agents; the artifact under test is the model output, not the delivery |
| Software delivery assurance / requirements traceability | Jama, Polarion, codebeamer | requirement → test → result traceability, in regulated development | heavyweight, human-authored, priced and sold to regulated industries, agent-unaware |
| **Assurance cases** | **GSN (Goal Structuring Notation), safety cases, DO-178C, ISO 26262, AdvoCATE** | **claim → argument → evidence is a formal discipline that predates this repository by three decades** | authored by hand, by specialists, for certification; not continuous, not agent-aware, not cheap |
| Technical due diligence | boutique firms, `[unverified]` | a point-in-time readiness read for an acquirer | manual, expensive, episodic, not a system |
| Agent orchestration | LangGraph, CrewAI, agent frameworks | coordinating agents | authority to *act*, never authority to *conclude* |

### A.1 The first serious blow to novelty

**The core object model is not new.** Claim → argument → evidence, with evidence sufficiency,
confidence, and defeaters, is the assurance-case literature. `product/ASSURANCE_THESIS.md` must not
present it as an invention, and no sales material may imply it is. Two consequences:

1. **Positive.** The shape has survived thirty years of adversarial use in aviation and automotive
   safety. A structure that survives certification review is not a taxonomy invented to make a
   portfolio look coherent. This directly blunts the "post-hoc taxonomy" attack in §28 of the brief.
2. **Negative.** "We invented a claims model" is false and would not survive one informed buyer.
   The defensible claim is narrower: *making an assurance case cheap enough, and agent-aware enough,
   to be worth producing for a three-month client project rather than a ten-year airframe.*

### A.2 The second serious blow

**Vanta exists and is a large business.** It proves the shape sells: controls, evidence,
continuous checks, gaps, exceptions with owners and expiries, and a report a third party accepts.
An honest reading is that the assurance thesis is **Vanta's shape applied to delivery claims instead
of security controls.** That is a real positioning, and it is not a moat. The difference that
matters commercially is that Vanta's claim set is fixed by an external framework and can therefore
be sold as a product on day one, whereas delivery claims are project-specific and must be elicited
per engagement. **That difference is exactly what makes this a service before it is a platform**,
and it is the strongest single argument in `docs/REFOUNDATION_DECISION.md`.

---

## B. Unique residue

Subtracting everything above, what remains that is both defensible and plausibly valuable.

| Residue | Survives subtraction? | Evidence in this corpus | Honest value read |
|---|---|---|---|
| **A gate must be proven able to fail (positive control)** | **yes** | LOG #22: R2 and R3 could never fire and passed vacuously for a full round; found only by deliberately breaking a file. `gate-reliability.md` measures P(gate correctness) ≥ 0.500 across 6 scripts | **the strongest residue.** No competitor sells "prove your check can go red." It is cheap to run and it produces findings immediately |
| **NOT-MEASURED is a distinct state from PASS** | **yes** | LOG #11: *"'none detected' is never a finding, it is an unrun measurement."* The one checkable case was wrong | high. Every green dashboard in the market conflates these two |
| **Reality level of evidence** | **yes** | pre-call's no-budget detector: 49/49 synthetic, **2/3 on six real calls**, printed side by side. `rubric.md` refuses a Lovable publish commit as evidence of a consumer | high, and it is the finding buyers recognise fastest: "your tests pass against a mock" |
| **Field-required claims** | **yes** | pre-call `market-ready.md`: *"Every condition here requires a stranger. None can be completed by writing code."* D1 status: 0 | high **as an intervention**, low as software. It is the part of the deliverable a tool cannot produce |
| **Claim-level authority, separate from observation** | partly | MATI's `mayAssertCausality`; lessons R2/R6 | real, but it reads as governance overhead unless tied to a decision someone is about to make |
| **Evidence-to-claim mapping** | **no, not alone** | — | this is the assurance-case literature and Vanta's core loop. It is table stakes, not residue |
| **Agent-aware evidence staleness** | **yes, and it is the most defensible technical residue** | `authorship-attribution.md`: author names undercount agent work by up to 23×; 193 of proofminer's 229 commits are hidden-agent | nobody else can compute "which claims did last night's agent run invalidate" because nobody else has established that the obvious attribution signal is wrong by an order of magnitude |
| **Preservation of failed and refuted evidence** | partly | LOG append-only; patterns-matrix §2.2 retracts in place; proofminer's `archive/` branch | valuable inside a practice, hard to price |
| **Reversal conditions on claims** | partly | the prediction's falsifier clause | good discipline, no buyer has asked for it |
| **Cross-project failure lineage** | **unproven** | **no artifact in the portfolio does this.** `LOG.md` is single-project; `patterns-matrix` tracks patterns, not failures | this is the proposed moat and it currently has **zero implementations and zero data**. It must not be claimed |
| **Project-specific assurance compilation** | **yes** | Genesis's 18-question elicitation protocol already asks for invariants, illegal state transitions, and what must never happen | this is the piece Vanta structurally cannot have, because its claims come from a framework |

### B.1 What the residue adds up to

Three things survive subtraction cleanly and are supported by measurements in this repository:

1. **Gates that have never been shown to fail are not evidence.**
2. **NOT-MEASURED is not PASS, and unmeasured is the default state of most claims.**
3. **Evidence has a reality level, and most evidence sits below the level the claim needs.**

One thing survives as a technical differentiator: **agent-aware invalidation**, which depends on a
measurement (author-name undercounting) that this corpus made and that is not general knowledge.

One thing is claimed and has no support at all: **cross-project failure lineage.** It is the
proposed moat, and §15 of the brief is right that it is potentially the core moat, but there is not
one instance of it anywhere in 40 repositories. It is a hypothesis about a future dataset.

---

## C. Buyer comparison

Scored 1 (worst) to 5 (best). Scores are judgments from the corpus and from general market
knowledge, not from any conversation with a buyer. **The denominator for every willingness-to-pay
score in this table is zero: no one has been asked.**

| Buyer | Pain | WTP | Frequency | Projects | Value of auditability | Access | Sales cycle | Pilotable manually | Existing budget | Differentiation | Build cost (low=good) | **Total** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Solo AI builder | 2 | 1 | 3 | 2 | 1 | 5 | 5 | 5 | 1 | 2 | 5 | **32** |
| Startup CTO | 3 | 2 | 3 | 2 | 2 | 4 | 4 | 4 | 2 | 3 | 4 | **33** |
| Enterprise engineering team | 4 | 4 | 4 | 5 | 4 | 1 | 1 | 2 | 5 | 2 | 1 | **33** |
| **AI-native software agency** | **5** | **4** | **5** | **5** | **5** | **4** | **4** | **5** | **3** | **5** | **4** | **49** |
| Digital transformation consultancy | 4 | 5 | 4 | 5 | 5 | 2 | 2 | 3 | 5 | 4 | 2 | **41** |
| Regulated software vendor | 5 | 5 | 2 | 3 | 5 | 1 | 1 | 2 | 5 | 1 | 1 | **31** |
| Technical due-diligence provider | 4 | 5 | 2 | 4 | 5 | 2 | 3 | 5 | 4 | 3 | 4 | **41** |
| Enterprise client receiving outsourced AI-built software | 5 | 3 | 3 | 3 | 5 | 2 | 2 | 4 | 3 | 4 | 3 | **37** |

### C.1 Why the agency wins, mechanically

Not because the score is highest. Because of four specific properties:

1. **A dated, high-stakes event exists.** Client handoff. Assurance is worthless without a moment
   at which someone must assert readiness, and the agency has one per project.
2. **The assertion is made to a party who can dispute it.** An agency tells a client "this is
   ready." A solo builder tells nobody. **An assurance case has value exactly in proportion to the
   cost of being wrong in front of someone else**, which is why the solo-builder ICP of Phases B–C
   produced zero sales and was structurally going to.
3. **Repetition.** Multiple projects, same failure classes, so any reusable policy compounds. This
   is the only buyer for whom the proposed cross-project moat could ever accrue.
4. **They already know the pain and cannot name it.** An agency shipping agent-written code has a
   senior engineer doing an unstructured pre-handoff read. That is the budget line the service
   displaces, and it is a real cost with a real hourly rate.

### C.2 Why the regulated vendor is a trap

Highest pain and highest willingness to pay, and it should be refused. Assurance cases already
exist there, with tooling, standards and specialists; the sales cycle is measured in quarters; and
this corpus contains nothing about safety-critical development. Entering there means competing on
the one axis where thirty years of prior art is strongest.

---

## D. Initial use case

| Use case | Pain | Differentiation | WTP | Speed to evidence | Build cost | Score |
|---|---|---|---|---|---|---|
| 1. Portfolio health | 2 | 1 (measured to over-rate by a tier) | 1 | fast | low | reject |
| 2. Genesis project creation | 3 | 4 | 2 | **slow — evidence arrives only when the project ends** | medium | defer |
| 3. Continuous AI code governance | 4 | 2 (CodeRabbit, Sonar, policy-as-code) | 3 | medium | **high** | reject |
| **4. Release-readiness assurance** | **5** | **4** | **4** | **fast** | **low** | **wedge** |
| **5. Client-project assurance report** | **5** | **5** | **4** | **fastest** | **lowest** | **wedge** |
| 6. Technical due diligence | 4 | 3 | 5 | fast | low | second market |
| 7. Regulated AI software assurance | 5 | 1 | 5 | slow | very high | reject |
| 8. Research methodology tooling | 2 | 5 | 1 | slow | medium | not a business |

**4 and 5 are the same deliverable seen from two sides**: the agency's internal question ("what
blocks this release?") and the external artifact ("what can we safely tell the client?"). They
share one production process, so building for one builds both.

Selected wedge: **the AI Delivery Assurance Audit, delivered as a service, on a client project a
delivery firm is about to hand over.** Specified in `product/ASSURANCE_THESIS.md` §5.

---

## E. What this test actually refuted

Two things, and they are not small.

**E.1 The platform thesis is not supported.** Not refuted, unsupported, which is a different and
more honest verdict. Every input to it is internal: one operator, one portfolio, one agent family,
zero external projects, zero buyers, zero revenue. §15's learning loop and the cross-project failure
lineage that constitutes the proposed moat have **zero instances in 40 repositories.** Building a
multi-tenant platform on that is the exact error `saas/spec/` made in Phase B: writing a moat
document before a measurement.

**E.2 The novelty framing is refuted.** "An assurance layer with claims, evidence and gates" is
prior art, both formally (GSN, safety cases) and commercially (Vanta's shape). Any document that
presents the object model as new is wrong and will be caught. The narrower survivable claims are:

- making an assurance case cheap enough to be worth producing for a twelve-week client project;
- eliciting project-specific claims instead of inheriting them from a framework;
- treating a gate as unproven until it has been observed to fail;
- knowing which claims an agent's overnight run just invalidated, which requires knowing that the
  obvious attribution signal undercounts by up to 23×.

**What survived.** The problem claim survived: the gap between "AI produced code" and "we are
justified in asserting readiness" is real, and this repository is itself an instance of it, with
14 of 14 CI runs red for four months while its own README announced completion.

**What is not established.** That anyone will pay to close it. That question is not answerable by
any amount of further work inside this repository, and `product/FIELD_PREREGISTRATION.md` fixes the
thresholds for answering it before the first outreach.
