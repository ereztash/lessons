# ASSURANCE THESIS

> Written 2026-09-03, after `research/re-foundation/THESIS_TEST.md`. The thesis survived in part.
> This document states the part that survived and marks the part that did not, in place.
>
> **Status: SERVICE AUTHORIZED. PLATFORM DEFERRED** behind `product/FIELD_PREREGISTRATION.md`.
> See `docs/REFOUNDATION_DECISION.md`.

---

## 1. The job

> **Lessons turns a project's promises into explicit claims, determines what evidence each claim
> requires and at what level of reality, checks whether that evidence still holds, and prevents a
> team or an agent from promoting the project beyond what has actually been established.**

Category: **AI Delivery Assurance**.
Positioning: **the assurance layer for software built by AI agents.**

### 1.1 What this is not, stated before what it is

Three refusals, each forced by `THESIS_TEST.md` and each binding on all outbound material.

1. **The object model is not new.** Claim, argument, evidence, defeater is the assurance-case
   discipline: GSN, safety cases, DO-178C, ISO 26262. It predates this work by three decades. Any
   material implying invention is false and will be caught by one informed buyer.
2. **The shape is already a business.** Vanta, Drata and Secureframe sell control, required
   evidence, continuous check, gap, exception-with-owner-and-expiry, third-party-ready report. The
   difference is that their claim set arrives from an external framework and this one must be
   elicited per project.
3. **The cross-project learning loop is a hypothesis with zero instances.** No artifact in 40
   repositories tracks a failure class across projects. It may not be described as existing, as a
   moat, or as a reason to buy.

### 1.2 What is actually defensible

Four things survived subtraction in `THESIS_TEST.md` §B, each anchored to a measurement:

| | Claim | Anchor |
|---|---|---|
| 1 | **A gate that has never been observed to fail is not evidence.** | R2 and R3 in this repository passed vacuously for a full round; found only by deliberately breaking a file. P(gate correctness) ≥ 0.500 over 6 scripts |
| 2 | **NOT-MEASURED is a distinct state from PASS, and it is the default.** | "AI tools: none detected" was recorded as a finding; the one checkable case was wrong |
| 3 | **Evidence has a reality level, and most evidence sits below the level its claim needs.** | pre-call's detector: 49/49 synthetic, 2/3 on six real calls. A Lovable publish commit read as consumption |
| 4 | **Agent-aware invalidation.** Knowing which claims an overnight agent run just made stale requires knowing that commit authorship undercounts agent work by up to 23×. | `research/cross-repo/authorship-attribution.md`, measured across 12 repositories |

Points 1 through 3 are method. Point 4 is the only technical differentiator, and it rests on a
measurement that is not general knowledge.

---

## 2. The object model (v1.1)

Derived in `research/re-foundation/ASSURANCE_MODEL_FIT.md`, where v1.0 failed on 3 of 10 portfolio
cases and v1.1 represents all 10.

```
Project
  id, origin, owner
  derives_from      : Project | null          # mirrors and forks: G2
  claim_set_status  : elicited | partial | none, discovery_method   # G3

Claim
  statement, owner, required_reality_floor, status
  status ∈ PROVEN | PROVISIONAL | NOT-MEASURED | FIELD-REQUIRED
         | WAIVED | CONTRADICTED

Evidence
  subject      : Claim | Evidence             # a refutation may be refuted: G5
  reality_level: R0..R6                       # §3
  produced_by  : human | agent(<surface>) | tool | unknown   # G1
  collected_at, covers_revision

Gate            executable decision over Evidence
  result           : PASS | FAIL | NOT-MEASURED | UNCONSUMED   # G4
  result_consumed_by : Authority | null
PositiveControl proof this Gate detects the failure class it guards
Authority       observe | report | recommend | release | assert-cause
                | automate | block | unknown
ReversalCondition  evidence that would demote this Claim
Waiver          owner, date, scope, reason, expiry
FieldRequirement  owner, review_by            # G6
Failure         a refutation, permanent, first class
Lineage         where a rule came from and how it changed
Policy          a reusable assurance rule, instantiable into a Project
```

**The field that changes the product rather than the schema is `Gate.result_consumed_by`.** It moves
the question from *did the check pass* to *did anyone act on the check*. This repository's own answer
to the second question was "no", for four months, across fourteen red CI runs.

---

## 3. Reality levels

| | Level | The evidence touched | Portfolio instance |
|---|---|---|---|
| R0 | asserted | someone wrote it down | a README claim |
| R1 | static | it exists, parses, lints, typechecks | `crp-lint.ts` |
| R2 | isolated execution | ran against fixtures the team authored | 49/49 synthetic |
| R3 | integrated | ran with real dependencies | a CI build |
| R4 | deployed | ran at the deployed origin, not localhost | a staleness test added after a deploy went stale silently |
| R5 | real input | ran against inputs the team did not author | 2/3 on six real calls |
| R6 | third party acted | someone outside the team did the thing | a payment with the key enforced: *"without enforcement it is not a sale, it is an agreement"* |

**Operating rule.** A claim carries a required floor. Evidence below the floor is not weak evidence
for that claim; it is no evidence for it. The corpus's strongest finding is exactly this gap: a
publish commit is R4, "someone uses this" needs R6.

---

## 4. Agent authority

An agent must never infer its own authority from a green test. Defaults, derived from the four
independent implementations in the portfolio (MATI, proofminer, CRM, anti-silo):

| Action | Default | Why |
|---|---|---|
| READ | automatic | |
| PROPOSE | automatic | |
| MODIFY | policy-controlled | scoped by path and by claim impact |
| TEST | automatic | |
| REGISTER_EVIDENCE | automatic, **with `produced_by` recorded** | an agent may add evidence; it may not decide what the evidence proves |
| RECOMMEND_PROMOTION | automatic | |
| PROMOTE | **human-required** | MATI: `maySurfaceToOrganization` and `mayAssertCausality` are independent |
| WAIVE | **human-required, with owner and expiry** | a waiver an agent can grant is not a waiver |
| RELEASE | **human-required** | |
| ASSERT_CAUSALITY | **forbidden without a stated design that supports it** | anti-silo: `grounding_eligible_does_not_mean: … semantic truth` |

Two rules that carry across every adapter:

- **An agent may never raise its own authority**, including by editing the policy that sets it.
- **A change by an agent invalidates the evidence for every claim whose covered revision it
  touched.** That invalidation is automatic; the re-proving is not.

---

## 5. The first sellable deliverable: the AI Delivery Assurance Audit

A service, delivered before any platform exists.

**Input.** A client repository, the product promise as the delivery firm states it to its client,
the deployment, the current CI, the agent workflow, and any requirements the client set.

**Output.** An assurance case:

```
Claims discovered:        N     with discovery method and claim_set_status
PROVEN:                   N     evidence at or above the required reality floor
PROVISIONAL:              N     evidence below the floor
NOT-MEASURED:             N     no evidence of any level
FIELD-REQUIRED:           N     no artifact in the repo can settle it, with owner
WAIVED:                   N     with owner, reason, expiry
CONTRADICTED:             N

Release blockers:         N
False-green checks:       N     gates never observed to fail
Unconsumed gate results:  N     verdicts nobody acted on
Unsupported claims:       N     stated externally, above the evidence
Silent waivers:           N     insufficiency accepted with no owner
```

Plus: the claim-to-evidence map; every reality mismatch; gates with no demonstrated teeth; the
field-required questions with named owners; unowned decisions; and the highest-return repairs
ranked by (claims unblocked) ÷ (hours).

**The audit must be worth its fee with no platform in existence.** The evidence that it can be is
`ASSURANCE_MODEL_FIT.md` §7: run against this repository, in under an hour, it produced four true
findings that no document here had recorded, on the hardest possible subject.

**Anti-ICP.** Solo builders (no second party to whom readiness is asserted, and the Phase B/C ICP
that produced zero sales); regulated safety-critical vendors (thirty years of prior art, tooling and
specialists already there); enterprise platform teams (they will build it); anyone with no dated
event at which someone must assert readiness. An assurance case is worth exactly what it costs to be
wrong in front of someone else.

---

## 6. The counterfactual: why not a good `CLAUDE.md` plus CI

The honest answer is that for a single project, mostly it is.

`CLAUDE.md` plus CI is precisely what this repository has, and the measured outcome is: fourteen of
fourteen CI runs failed for four months with nobody reading them; two of five gates could never
fire; forty-three of forty-three evidence pointers resolved to prose the repository wrote about
itself; and the README announced a completed phase throughout. **A well-designed `CLAUDE.md` plus CI
is a set of checks with no record of what each one is evidence for, no proof any of them can fail,
and no owner for the verdict.**

Three deltas, and they are not equal:

| Delta | Could a `CLAUDE.md` do it? | Honest verdict |
|---|---|---|
| a claim register saying what each check is evidence **for** | yes, with discipline | **not a product.** This is a template and a habit |
| a positive control per gate | yes, with discipline | **not a product**, but almost nobody does it, which is a service finding |
| an owner for every verdict | yes | not a product |
| **claims a repository cannot settle** (R5, R6) | **no** | CI cannot manufacture a stranger. This is the first real delta |
| **which claims last night's agent run invalidated** | **no** | requires cross-surface attribution that the obvious signal gets wrong by up to 23× |
| **a failure class seen on another project** | **no** | requires more than one project, which is why it is a hypothesis and not a feature |

**So the counterfactual holds for one project and breaks at three.** The service is sold on the
first two deltas, which are real today. The platform is justified only by the third, which has zero
instances and is registered as a hypothesis, not built.

## 7. Why the longitudinal corpus improves the product, mechanistically

Not "it makes good marketing stories". Three specific mechanisms:

1. **It supplies the failure classes to look for.** Twenty-three anti-patterns and thirteen level-6
   principles are the audit's checklist. An auditor without them looks for bugs, which is the wrong
   target: 8 of the adversarial surface's 16 commits in `proofminer` were epistemic stops, not bug
   fixes.
2. **It supplies the priors on where checks fail.** `gate-reliability.md` measured P for four gate
   classes and found the riskiest are the ones that *build* the tools, not the ones that judge
   claims. That routes audit hours, and no competitor has that number.
3. **It supplies the attribution method.** Agent-aware invalidation is impossible without knowing
   that author names undercount by up to 23×, which was measured here across twelve repositories.

What the corpus does **not** supply: any evidence that a second operator gets the same results.

---

## 8. Platform boundary

If the platform is ever authorized, this line holds.

**In the platform:** claim registry; evidence registry with reality level and producer; authority
evaluator; gate registry with positive-control status; waiver registry with expiry; field-required
registry with owner; reversal registry; lineage. Adapters for GitHub, Actions, Claude Code, Codex,
Cursor, Vercel, Playwright, scanners, test frameworks, field-evidence upload.

**Not in the platform:** running the tests; reviewing the code; generating the code; deciding what
the claims are (that is elicitation, and it is a human act supported by an instrument); anything
that requires a stranger.

**Adapters, not agent lock-in.** Claude Code is one surface among several already in this portfolio
(`codex/*` and `claude/*` branches merged into `proofminer` hours apart; `AGENTS.md` in `_crm` is a
concurrency contract between two vendors' agents). **The core must still make sense if today's
coding agent disappears**, so no vendor's vocabulary enters the schema.

**Surfaces are built from decisions, not from available data.** The first paid workflow needs
exactly one: the **Release View** — what blocks this exact release. Project Assurance, Claims,
Evidence, Agent Activity, Failure Lineage and Client Report are deferred until a workflow requires
them.

---

## 9. Success metrics

Not counted: scans, gates, policies, findings, tests. Those are apparatus, and this corpus's
central finding is that apparatus became cheap.

| Metric | Why |
|---|---|
| unsupported release claims found | the deliverable |
| false-green checks found (gates never observed to fail) | the sharpest differentiator |
| unconsumed gate results found | the failure this repository committed for four months |
| release-blocking defects found **before** client handoff | the outcome the buyer feels |
| share of findings the delivery team accepts | guards against documentation theatre |
| hours from repo access to a delivered assurance case | the unit cost, and the platform trigger |
| external claims narrowed because of the audit | the safety outcome |
| repeated failure classes across client projects | the only evidence the moat hypothesis will ever get |
| willingness to pay, and to renew continuously | the commercial answer |

**Causality is not claimed for any of these without a design that supports it.** "Defects found
before handoff" is not "defects prevented"; the counterfactual is unobserved, and no material may
imply otherwise.

---

## 10. Falsifiers

The thesis dies if any of these becomes true. Registered here and dated in
`product/FIELD_PREREGISTRATION.md`.

1. Agencies read the assurance case and act on nothing in it.
2. The findings are real but the team already knew all of them.
3. Producing a case costs more analyst hours than the fee will ever support.
4. Every finding is one an existing tool (CodeRabbit, Sonar, a CI dashboard) already surfaces.
5. Failure classes do not repeat across client projects, which kills the platform and leaves a
   consultancy.
6. Claim elicitation cannot be done without the author present, which makes the method
   operator-bound and the whole thing unsellable as a system.
