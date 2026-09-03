# FIELD PREREGISTRATION — The Anti-Build Rule

> Registered **2026-09-03**, before any outreach and before any external project exists.
> Every threshold below is fixed now, on purpose, so that none of them can be derived from the
> results afterwards.
>
> Ported from `pre-call/docs/market-ready.md` (thresholds locked before the round, each naming its
> provenance, the arbitrary one labelled arbitrary) and from
> `ground-truth/prediction-2026-08-19.md` (a falsifier stated in advance, and contamination rules).
>
> **This file is frozen on the same terms as `ground-truth/prediction-2026-08-19.md`.** Changing a
> threshold after the first pilot voids the registration and requires a new one, dated, with the
> old one retained.

---

## 0. The rule

> **No multi-tenant platform is built until the manual assurance workflow has been completed on
> external client projects, at the thresholds in §2, by the deadline in §4.**

"External" means: a repository this operator did not author, in an organization this operator does
not own, with at least one person outside this operator receiving the output. **No repository in
the `ereztash` portfolio counts.** That exclusion is the entire point: `METHOD_LINEAGE.md` §3 shows
that no principle in this corpus has ever been observed outside one operator's work.

## 1. What is authorized before the thresholds are met

- The audit **as a service**, performed by hand, on external projects.
- Scripts that reduce analyst hours on work already being done by hand.
- The claim/evidence/gate schema as **files in the audited repository**, version-controlled by the
  client, with no server.
- Fixing this repository's own contradictions (`CONTRADICTIONS.md` §7).

## 1b. What is **not** authorized

- Multi-tenant storage, accounts, billing, a dashboard, a hosted API.
- A GitHub App or Action that runs continuously against client repositories.
- Any material describing cross-project failure lineage as a capability. It has **zero instances**.
- Any pricing page.

---

## 2. Thresholds, fixed 2026-09-03

| # | Condition | Threshold | Provenance |
|---|---|---|---|
| **P1** | independent external projects completing the full manual workflow | **≥ 5** | Faulkner's 10-participant coverage figure, halved because each project yields many findings rather than one observation. **This halving is a judgment, not a derivation, and is labelled as such** |
| **P2** | of those, projects in **different organizations** | **≥ 3** | one organization's process is one organization's process; three is the minimum at which "different org" is not an accident |
| **P3** | projects that **paid**, with money received, not agreed, **at ≥ the fee floor in §2b** | **≥ 3 of 5** | pre-call D4: *"without enforcement it is not a sale, it is an agreement."* Reality level **R6**. The fee floor was added 2026-09-03: without it, five token payments satisfy P1 and P3 while refuting the business |
| **P4** | failure classes appearing in **≥ 3 different projects** | **≥ 2 classes** | the platform's only justification is reuse. Two classes across three projects is the weakest evidence that would still be evidence |
| **P5** | projects requesting **continuous** monitoring, unprompted, after delivery | **≥ 3 of 5** | asking for continuity is the only signal that distinguishes a platform from a report. It must be unprompted, and the transcript must show it |
| **P6** | analyst hours per project, median, **on a repository the auditor has not previously read** | **≤ 20** | **Set, not derived, and its earlier provenance was hollow**: the first draft justified 20 hours by "the rate this ICP pays a senior engineer", a rate that appears nowhere in this repository. It is a time budget, and it becomes an economic threshold only against the fee floor in §2b. The "not previously read" clause was added 2026-09-03: `ASSURANCE_MODEL_FIT.md` §7 measured an hour on a corpus the auditor had just read end to end, which does not transfer |
| **P7** | findings the delivery team **accepts** (agrees is real and worth acting on), median per project | **≥ 60%** | below 60% the output is documentation theatre. **Set, not derived** |
| **P8** | projects where **≥ 1 finding was release-blocking** and was not already known to the team | **≥ 4 of 5** | this is the value claim. If a team already knew everything, the audit is a formatting exercise |
| **P9** | projects where **≥ 1 false-green or unconsumed gate** was found | **≥ 3 of 5** | the sharpest differentiator in `ASSURANCE_THESIS.md` §1.2. If it does not generalize past this repository, the differentiator is one anecdote |
| **P10** | claim elicitation completed **without the original author of the method present** | **≥ 1 project** | the single test that separates a method from a person. Without this, there is nothing to build |
| **P11** | projects whose code was written **predominantly by an agent family other than the one the auditor works with** (measured with `scripts/detect-agent-authorship.sh`, both detectors, before the audit) | **≥ 2 of 5** | **Added 2026-09-03, before any pilot, after the adversarial pass.** `METHOD_LINEAGE.md` §3 names one operator, one portfolio and **one agent family** as the confound, and P1–P10 tested only operator independence. Without P11 the modal first pilot is an agency shipping Claude-written code, audited by an operator working with Claude, which is same-agent on both sides and passes every other threshold while leaving the confound exactly where it was |

**Platform authorized only if all ten hold.** Not a majority. Nine of ten is a failure, and the
response is to say which one failed and why, not to average.

---

## 2b. The fee floor

**A project counts toward P3 only at a fee of ≥ the analyst's own displaced day rate × 2 days.**
That rate is not in this repository and must be written here, by the operator, **before the first
outreach**. Until it is written, P3 cannot be scored, and that is deliberate: `saas/spec/08` priced
a business on a rate nobody had stated, and `products/pricing-hypotheses.md` priced seven playbooks
on a $100/hr indie rate with a zero denominator.

| | |
|---|---|
| Displaced day rate | **not yet written** |
| Therefore the P3 fee floor | **not yet computable** |

## 3. What would falsify the platform thesis

Stated now, so no result can be reinterpreted later.

| Falsifier | Verdict if observed |
|---|---|
| **P5 < 3** — nobody asks for continuous monitoring | **consultancy, not SaaS.** Keep selling audits; never build the platform |
| **P4 = 0** — no failure class repeats across projects | the moat does not exist. Platform refused permanently, not deferred |
| **P6 > 40 hours** median | the workflow cannot be automated down to a fee; it is bespoke consulting |
| **P7 < 40%** | the findings are not findings |
| **P8 ≤ 1 of 5** | teams already know their state; the problem is not real |
| **P9 ≤ 1 of 5** | the differentiator was one repository's pathology, namely this one |
| **P10 = 0** after five projects | the method is operator-bound. Nothing is sellable as a system, and the honest product is the operator's time |
| **P11 < 2** | the method is agent-family-bound. Everything in `METHOD_LINEAGE.md` §2 may be one model family's habits, and the platform is refused |
| **P4 ≥ 2, but every class has the same auditor and the same agent family behind it** | P4 as written cannot separate a reusable failure class from a constant operator. Stated here as a **known limit of this registration** rather than discovered later: a full pass on P1–P11 still leaves the platform's central premise partly unmeasured |
| Every finding in ≥ 4 of 5 projects is one CodeRabbit, Sonar or a CI dashboard already surfaces | `THESIS_TEST.md` §A wins. Thesis refuted |

## 4. Deadline and stopping rule

| | |
|---|---|
| Registered | 2026-09-03 |
| First external project must start by | **2026-10-15** |
| Thresholds evaluated | **2027-03-03** (six months) |
| If P1 < 5 by the deadline | **the thesis is not refuted, it is unattempted.** Record which of access, offer or interest failed, and either re-register once with a stated reason or stop. Re-registering twice is a decision to keep the hypothesis alive rather than test it, and is forbidden |
| Maximum re-registrations | **1** |

**Section numbering was corrected 2026-09-03** (two sections were numbered "## 2"), before any
external project began and therefore before §5 rule 1's freeze applies. P11 and §2b were added in
the same window, for the same reason: after the first pilot starts, neither could be added without
voiding the registration.

## 5. Contamination rules

Ported directly from `ground-truth/prediction-2026-08-19.md` §Contamination.

1. **No threshold may be changed after the first external project begins.** If one must change,
   this registration is void, the reason is recorded here, and a new file is dated.
2. **No self-owned repository counts toward any P.** Auditing `lessons` is valuable and is not
   evidence. The four findings in `ASSURANCE_MODEL_FIT.md` §7 are a demonstration, not a data point.
3. **P5 must be unprompted.** Asking "would you want this continuously?" invalidates that project's
   P5 reading. The request must appear in the client's own words, and the artifact is quoted here.
4. **P7 is recorded by the delivery team, not by the auditor**, in writing, per finding.
5. **A finding accepted after the auditor argued for it still counts for P7 and does not count for
   P8**, because P8 is about what the team did not already know.
6. **No pilot may be run on a project where the operator also writes the code.** That collapses
   auditor and author, which is the failure `adversarial-second-surface` exists to prevent, observed
   independently in five repositories.

## 6. Recording

One file per project at `product/pilots/<n>-<anonymized-slug>.md`, created **before** the audit
starts, containing the intake, the claim set as elicited, and the hours estimate. Findings are
appended. **A pilot file created after the findings does not count**, on the same logic as
`resolve-prediction.py` being written before the data.

Running tally, updated per pilot and never rewritten:

| | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
|---|---|---|---|---|---|---|---|---|---|---|
| target | ≥5 | ≥3 | ≥3 | ≥2 | ≥3 | ≤20h | ≥60% | ≥4 | ≥3 | ≥1 |
| **2026-09-03** | **0** | **0** | **0** | **0** | **0** | — | — | **0** | **0** | **0** |

Every condition currently reads zero. That is the correct starting value and it is recorded rather
than left blank, on the model of pre-call's D1 status: **0**.
