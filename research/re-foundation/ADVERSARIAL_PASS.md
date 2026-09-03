# ADVERSARIAL PASS — §28 of the Brief

> Run 2026-09-03 in a fresh context, immediately after `docs/REFOUNDATION_DECISION.md` was written.
> Mission given to the adversary: *prove that the proposed new Lessons thesis is merely an
> attractive reinterpretation of a personal portfolio and does not deserve to become a B2B
> platform.* Constraints: it could narrow the thesis, not broaden it; refutation only, no redesign;
> every attack anchored to a file, a line, a number or a demonstrable logical flaw.
>
> **This record is kept in full, including the attacks that failed, because a refutation is
> first-class evidence and an adversarial pass whose misses are deleted cannot be audited.**
> Every attack below marked *verified* was re-checked independently before it was acted on.

---

## Verdict

**`PROCEED_SERVICE_ONLY` survives. The "Authorized now" clause did not.** The decision is narrowed
to `PROCEED_SERVICE_ONLY — SALE GATED`, with four conditions on the first invoice.

The pass did not refute the thesis. It refuted the round's claim to have already instrumented
itself against that thesis, which is a sharper and more useful result.

---

## Attacks that landed, and what was done

### A1. The round's Core IP was not applied to the round's own gate. **Verified. Fixed.**

`check-lessons-contract.py` R4's pattern was `\b(?:>=|<=|≥|≤)\s*(\d+)\b`. A leading `\b` before `>`
requires a word character immediately to its left, so every threshold in `ground-truth/rubric.md`
written with a space before the operator was invisible. Independently re-measured:

```
re.findall(r"\b(?:>=|<=|≥|≤)\s*(\d+)\b", open("ground-truth/rubric.md").read())  ->  []
```

The match set was **empty**. The loop body never executed. R4 could not produce a verdict, and it
was the one rule the 2026-08-19 round never fired and the one rule this round's first positive
control did not cover — that control tested R1, R2 and R3, the three already known good.

Its provenance search also reproduced LOG anti-pattern #22 a second time: it joined every line
containing the digits as a substring, so a threshold of `77` matched the unrelated sentence
*"77 remote branches … because"*.

R5 was separately found to emit no verdict at all: it appears in no `violations.append()`. It is the
`--bypass` mechanism, so it cannot be positive-controlled the way R1–R4 and R6 can.

**Fixed 2026-09-03.** The pattern no longer carries the leading `\b`; provenance is searched inside
the threshold's own `##` section rather than anywhere the digits appear. On first run the repaired
rule found a **real violation**: the `≥7` work-session gap in `rubric.md` §2 had no stated
provenance. It is now labelled *set, not derived*, with the rule and every label unchanged, so
`rubric_version` stays 1.1 and `score-classifier.py` still reproduces the same ten rows.
`scripts/gate-positive-control.sh` now covers R1, R2, R3, R4 and R6, and all five were observed to
go red.

### A2. The technical differentiator was cited to a file that does not contain its number. **Verified. Fixed.**

Four documents cited "authorship undercounts agent work by up to **23×**" to
`research/cross-repo/authorship-attribution.md`, "measured across 12 repositories". That file has
**no `_crm` row** and a **maximum of 6.7×** (anti-silo, 40 trailers against 6 authors). The 23×
belongs to `_crm` and lives in `research/portfolio-scan/2026-08-19-cohort2.md` §4, outside the
cited set. `CLAUDE.md` meanwhile still told every session 6.7×.

This is the `evidence-resolves-to` failure the repository built R1 to catch, committed in
`product/`, which R1 does not cover.

Substantively the attack narrows the claim further: `_crm`'s 23× is a ratio between two git fields
where the corrective field is present on 211 of 231 commits and readable with one `grep`. The
genuinely hidden case relies on the cadence detector, whose own documentation says it is blind to
Claude Code, which *"by cadence looks exactly like a human"*. Identity is blind to any agent under
the operator's git config. The intersection is unmeasured, the set has one negative control, and
`pre-call` is a counter-case with attribution intact.

**Fixed** in `ASSURANCE_THESIS.md`, `THESIS_TEST.md`, `REFOUNDATION_DECISION.md` and `CLAUDE.md`.
The surviving claim is "a finding about a naive method", not "nothing else in the market can do it".

### A3. "23 recorded failures" inflates the ledger 1.77×. **Verified. Fixed.**

`gate-reliability.md` §1 is explicit: #1–#10 are prophylactic and *"measure nothing"*; #11 onward
are observed. Observed is 13 at the time of the attack and 16 after this round's #24–#26. The P
table uses 12. Corrected to 16 with the composition stated.

### A4. The headline P ordering is not a measurement. **Verified. Corrected in place.**

`0.500 > 0.375 > 0.100 > 0.030` is printed in one column over denominators of 6, 8, 40 and 134 with
no intervals, and §4 of the same file calls the number at the bottom *"the least believable number
here"*. Worse, the numerator and denominator have different units: #21 and #22 are two defects in
**one** file. Per script the figure is **2 of 6 = 0.333**, and 3/6 carries a Wilson 95% interval of
roughly [0.19, 0.81].

Recorded as `gate-reliability.md` §6 C4–C5, appended rather than edited. "The riskiest gates build
the tools" is now labelled a hypothesis and is barred from sales material.

### A5. The lineage register draws from 8 of 40 repositories, selected for having the mechanism. **Verified. Conceded.**

Parsing §2's *First evidence* column: pre-call 5, MATI 4, lessons 4, CRM_Google_ai 2, proofminer 2,
anti-silo 1, Agent-Architect 1, Benchmark.ATS 1. Zero rows from the other thirty-two.

The promotion test is "≥2 repos sharing no code", and the pool of ≥2 exists because it exhibits the
property. `METHOD_LINEAGE.md` §3 conceded operator bias and agent bias; it did not concede selection
on the dependent variable. It does now, with the consequence stated: the wedge buyer's client
repositories will resemble the thirty-two, and §2.7 already records what the model returns for one
of those — an assurance case with no content.

### A6. No threshold tested the agent-family confound. **Verified. Fixed, in the last window available.**

P10 tested operator independence only. The modal first pilot is an agency shipping Claude-written
code, audited by this operator working with Claude: same-agent on both sides, and it passes all ten.
The decision named "one agent family" as decisive in its own BLUF and then froze a threshold set
that could not detect it.

**P11 added** before any pilot, which is the last moment `FIELD_PREREGISTRATION.md` §5 rule 1
allows. §2b (a fee floor for P3) and the section renumbering were made in the same window, for the
same reason.

### A7. The service was authorized over the round's own blocking item, silently. **Verified. Fixed.**

`CONTRADICTIONS.md` §7 row 6 marks the re-audit of the ten `may-assert-cause: yes` insights
*blocking: yes, for anything sold*. Neither the decision nor the preregistration made discharging it
a precondition; §1 listed it as a permitted activity. No entry exists in `bypass-log.md`.

A blocking condition accepted with no owner and no expiry is a **silent waiver**, which is a line
item in the deliverable this round proposes to sell. The decision is now `SALE GATED` on four
conditions; three are discharged and this one is **not**.

### A8. The one-hour demonstration does not demonstrate the object model. **Verified. Narrowed.**

The four findings are reachable with `ls`, `grep` and reading two files. None required Claim,
Evidence, reality level, Authority, PositiveControl, Waiver, FieldRequirement, Reversal, Lineage or
Policy. Two were partly on record, so what was new was the join. And the auditor had read the whole
corpus first, so the hour does not transfer. `ASSURANCE_MODEL_FIT.md` §7 carries all three
qualifications, and P6 now requires a repository the auditor has not previously read.

### A9. The one economic threshold was anchored to a rate that does not exist. **Verified. Fixed.**

P6's justification, "at 20 hours a fixed-fee audit is viable at the rate this ICP pays a senior
engineer", cited a rate written nowhere in the repository. P3 counted payment with no floor, so five
token payments would satisfy P1 and P3 while refuting the business. §2b now requires the displaced
day rate to be written before outreach, and records that it is **not yet written**, so P3 is
currently unscoreable by design.

### A10. The model-fit verdict is unfalsifiable and was tabled beside measurements. **Verified. Reclassified.**

Expressiveness on the ten cases the model was derived from cannot return negative for any
sufficiently general schema, and no case is registered that v1.1 could fail. It is now labelled a
completeness check rather than a supported sub-thesis, and the decision's table says so.

### A11. `gate-reliability.md` went stale one commit after it was written, and the contradiction register missed it. **Verified. Corrected in place.**

It says `LOG.md` carries 19 anti-patterns; the file carried 23 before this round. Anti-pattern #23
landed in `528041c`, after `gate-reliability.md` was created in `5be7bd6`, and the file's own §5
update rule was not applied. `CONTRADICTIONS.md` claimed every row was verified this session and
recorded the CI omission but not this one. Recorded as §6 C1 and as a new `CONTRADICTIONS.md` row.

---

## Attacks that failed

Recorded because an adversarial pass that lists only its hits is a sales document.

| Attack | Where it is already handled |
|---|---|
| Survivorship bias, broad form | `ASSURANCE_MODEL_FIT.md` §2.7–§2.8 use `chess-mind-patterns` and `core-unified-consciousness` as explicit negative controls (the narrow form became A5) |
| Same-operator bias | `METHOD_LINEAGE.md` §3, level 7 = 0; P10 |
| Same-agent bias as a stated risk | named in `METHOD_LINEAGE.md` §3 and in the BLUF (the unhandled part was the missing threshold, A6) |
| Post-hoc taxonomy | `THESIS_TEST.md` §A.1 concedes the model is 30-year-old prior art; §4 refuses lineage status to constructs invented this round |
| Circular learning | `ASSURANCE_MODEL_FIT.md` §6 says it outright: expressiveness, not correctness |
| Lack of external replication | level 7 = 0; the whole preregistration exists for it |
| Buyers not caring | `THESIS_TEST.md` §C: "the denominator for every willingness-to-pay score is zero" |
| Competitors solving enough | §A's 13-row table, §A.2 on Vanta, and a registered falsifier |
| False moat | zero-instance declared in five places and barred from outbound material |
| Consultancy disguised as SaaS | P5 plus the falsifier "consultancy, not SaaS" |
| Too bespoke to automate | P6 with a 40-hour falsifier, plus P10 |
| Buyer-score arithmetic | all eight row totals re-added and correct |
| "The classifier is still the product" | demoted with a measurement in the decision's second paragraph |
| "They only wrote, they fixed nothing" | the CI workflow was replaced and 30-day action #1 is done (what survived is A1: what was built did not do what it said) |

---

## The two strongest arguments the adversary produced

**Against the platform.** Everything reusable in this corpus is reusable because one person is
constant, and P4 cannot tell that apart from a platform-worthy failure class. The most-replicated
principle in the register is *adversarial second surface*, in five repositories, and it is a
workflow decision the operator makes on every project rather than a property of any codebase. It
recurs because he recurs. A full pass on all eleven thresholds would still leave the platform's
premise partly unmeasured. Recorded as a falsifier row in `FIELD_PREREGISTRATION.md` §3.

**Against even the service.** The product is a verdict, and the apparatus that produces verdicts
here shipped R4 unfireable through two rounds, undetected by a positive control pointed at the three
rules already known good. Selling an assurance case produced by that apparatus transfers this
operator's false-green problem to a client with less ability to detect it, and the deliverable's own
headline line item is "false-green checks: gates never observed to fail". Nothing in
`ASSURANCE_THESIS.md` §9 requires a positive control on the audit's own output, and P7 measures
whether findings are *accepted*, which by P8's own logic cannot detect a wrong finding, only an
unpopular one.

**This second argument is not fully closed.** Condition 1 of the sale gate closes it for the
contract gate. It does not close it for the audit deliverable, which has no positive control of its
own. That is an open item, recorded here rather than answered.
