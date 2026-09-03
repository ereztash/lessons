# Gate Reliability — P × C for `lessons`' Own Gates

> Ported from `pre-call/docs/stopping-rule.html`: Annett & Duncan's 1967 hierarchical task analysis
> stops decomposing when **P × C** falls below acceptable — P being the probability a step is
> performed wrongly and C what it costs when that happens. pre-call made it an instrument rather
> than an opinion by measuring P over 400 runs and writing C into the code. This is the same rule
> turned on this repository.
>
> Established 2026-08-19, closing gap 1 of `research/cross-repo/portfolio-as-one-mechanism.md` §6.

## 1. Where P comes from

`LOG.md` carries 19 numbered anti-patterns. **They are not one kind of thing**, and reading them as
one would inflate the denominator and flatter every gate:

- **#1–#10 are anticipated.** Each is phrased "Phase N risk: …" or "Gap-closure risk: …". They were
  written prophylactically, before the failure occurred. They measure nothing.
- **#11–#19 are observed.** Each records a failure that actually happened, all of them during the
  2026-08-19 sessions.

Three more were observed while building this file and are recorded below as #20–#22.

**Every P here is a floor, not an estimate.** A failure log counts *detected* failures. The gate
applied most often and audited least is the one whose true P is furthest above its measured one.

## 2. The measurement

| Gate | What it decides | Applications | Detected failures | **P ≥** | C — cost when it is wrong |
|---|---|---|---|---|---|
| **Evidence-or-defer** | may a claim be written down | 134 (76 observations + 58 matrix rows) | 4 — #11, #12, #18, #19 | **0.030** | a wrong claim reaches a playbook that is sold |
| **Classifier (F1–F5)** | what tier a repo is | 40 repos | 4 repos — #13 (1), #14 (3) | **0.100** | effort is routed to the wrong repo |
| **Instrument design** | does the tool measure the named property | 8 (6 scripts + rubric + migration) | 3 — #15, #16, #20 | **0.375** | the measurement is void **and looks valid** |
| **Gate correctness** | does the check fire when it should | 6 scripts | 3 — #17, #21, #22 | **0.500** | a false verdict, or a gate that passes vacuously |

### The three found today

| # | Failure | Gate |
|---|---|---|
| 20 | The insight migration split evidence lines on commas, corrupting pointers that carry a comma inside parentheses (`repo@sha (Index.tsx +82/-24), repo@sha2` became four fragments) | instrument design |
| 21 | `check-lessons-contract.py::listfield` required a trailing newline, so the **last** field of any front-matter read as empty. It reported "missing `score-history`" on 15 files that had it | gate correctness |
| 22 | `field()` did not strip `# why` comments, so `may-assert-cause: yes  # 6 repos` never equalled `"yes"`; and R3 substring-matched the score numerator against the whole history line, where `"2"` matches the `2` in `2026-05-12`. **R2 and R3 could never fire.** Found by deliberately breaking a file to test whether each rule had teeth | gate correctness |

## 3. What the product says

| Gate | P ≥ | C | P × C | Verdict |
|---|---|---|---|---|
| Gate correctness | 0.500 | highest | **highest** | **keep decomposing** |
| Instrument design | 0.375 | highest | **high** | **keep decomposing** |
| Classifier | 0.100 | medium | low | stop — bounded by the accuracy disclosure on the playbook |
| Evidence-or-defer | 0.030 | high | low-medium | stop — but see §4 |

**The two riskiest gates in this repository are not the ones that judge claims. They are the ones
that build the tools that judge claims.** Half the scripts written today shipped with a defect that
would have produced a confident wrong answer — one of them was a pre-registered test's verdict
function, which would have printed `REFUTED` on an empty outcome.

That is where to keep decomposing, and it produces one operational rule:

> **Every script that emits a verdict must be run against its degenerate case before it is trusted**
> — empty input, zero variance, all-equal ranks — **and every gate must be shown to fail on a
> deliberately broken input before its passing is believed.** A green check that has never been
> observed to go red is not evidence.

Adopted as LOG anti-pattern #21–#22 and applied to `check-lessons-contract.py` before this file was
written: each of R1, R2, R3, R5 was fired once on a broken file, and R2 and R3 failed that test.

## 4. Why the evidence gate's low P should not be trusted

P for evidence-or-defer reads 0.030, the lowest of the four — and it is the least believable number
here. That gate is applied 134 times per session and audited only when something downstream forces
a re-check. Three of its four detected failures (#12, #18, #19) were found *by accident* while doing
unrelated work; only #11 was found by looking.

The comparison that makes this concrete: before today, **43 of 43 evidence pointers across 15
shipped insights resolved to prose this repo wrote about itself**, not to any commit, file or PR —
and the gate had passed all of them, because Rule 1 checks that a pointer *exists*. R1 now measures
what it resolves to. The failure had been standing since Phase 4 and cost nothing to detect once
something looked.

After re-anchoring, measured across all 17 insights: **5 `hard`, 12 `mixed`, 0 `prose`** (was 13
`prose`). `mixed` means real commit/file/PR pointers alongside fragments that resolve to nothing —
a state the gate reports but does not block, since only `prose` disqualifies an insight from backing
a playbook. That threshold is **set, not derived**: it is where the bar sits today, and tightening
it to require `hard` is a decision for a session with the appetite to re-open twelve insights.

## 5. Re-running

```bash
python3 scripts/check-lessons-contract.py            # the five gates
python3 scripts/check-lessons-contract.py --explain  # and why each exists
```

Update this file when a new failure is recorded in `LOG.md`. The denominators come from
`MEMORY.md` (observations, matrix rows), `ground-truth/scores-*.tsv` (repos) and `scripts/` (count).


---

## 6. Correction, appended 2026-09-03 (re-foundation adversarial pass)

Appended rather than edited, on the model of `patterns-matrix.md` §2.2: a correction that erases
what it corrects teaches nothing. §1–§5 above are left exactly as written on 2026-08-19.

**C1. The denominator moved and this file did not follow its own §5.** §1 reads "`LOG.md` carries
19 numbered anti-patterns". It carries 23: #23 landed in `528041c`, after this file was created in
`5be7bd6`, and #24–#26 were added by the re-foundation round. §5 says "Update this file when a new
failure is recorded in `LOG.md`", and that rule was not applied. Observed failures are now **#11–#26
= 16**, of which 12 carry a gate class in the §2 table.

**C2. "R1, R2, R3, R5 was fired once on a broken file" (§3, last line) was never possible for R5.**
R5 is the `--bypass` mechanism. It appears in no `violations.append()` in
`check-lessons-contract.py` and cannot emit a verdict, so it cannot be broken into one. The claim
should read **R1, R2, R3**.

**C3. R4 could not fire at all, and this file did not catch it.** Its pattern began
`\b(?:>=|<=|≥|≤)`, and a leading `\b` before `>` requires a word character immediately to the left,
so every threshold in `rubric.md` written with a space before the operator was invisible. Measured
2026-09-03, the match set against the live rubric was **empty**: the loop body never executed.
Its provenance search was also a raw substring match over every line containing the digits, which
is LOG anti-pattern #22's defect a second time. Fixed 2026-09-03; on first run it found a real
violation (the `≥7` work-session gap had no stated provenance), now labelled set-not-derived.

**C4. P for gate correctness is not 0.500.** §2 reads "6 scripts | 3 failures | P ≥ 0.500", but
#21 and #22 are two defects in **one** file, `check-lessons-contract.py`, and #17 is
`resolve-prediction.py`. **Per script the figure is 2 of 6 = 0.333.** The numerator counted defects
and the denominator counted scripts. With R4 now added as a third defective rule in the same file,
the per-file figure is unchanged at 2 of 6 and the per-rule figure is 3 of 6 rules that emit
verdicts.

**C5. The four P values in §2–§3 are not comparable, and §4 already says so about one of them.**
They are computed over denominators of 6, 8, 40 and 134 and printed in one column with no interval.
3/6 has a Wilson 95% interval of roughly [0.19, 0.81]. The §3 conclusion — "the riskiest gates are
the ones that build the tools" — is therefore a **hypothesis over four unequal denominators, not a
measured prior**, and must not be sold as one.

**C6. What survives all of the above.** Three scripts written on 2026-08-19 shipped with a
verdict-affecting defect, in two of six files; a fourth defect (R4) shipped in the same file and
survived a further round. Firing a gate on a deliberately broken input found every one of them and
no green run found any. That is the finding, and it is now enforced by
`scripts/gate-positive-control.sh`, which covers R1, R2, R3, R4 and R6.

**C7. A fourth vacuously passing rule, found the same week by looking in the other direction.**
`insights/_template.md` has documented, since the gap-closure round, that `may-assert-cause: yes`
"Requires strength >=2 in >=2 repos AND evidence-resolves-to: hard". **R2 never checked it.** It
checked that the field existed and that it was coherent with `may-report`, and nothing else. Measured
2026-09-03 under sale-gate condition 4: **7 of the 10 insights asserting cause resolved to `mixed`**,
so seven causal claims had stood for four months against a condition written down and never
enforced.

That makes four rules in this one file found passing vacuously: R2 and R3 in the gap-closure round,
R4 in the adversarial pass, and R2's documented-but-unchecked condition here. The generalisation is
sharper than the original rule and is adopted as LOG anti-pattern #29:

> **A condition written in a template and not written in the checker is not a condition.**
> Two documents that must agree will disagree, and the one nobody executes is the one that drifts.
> This is pre-call's "one file, not two", arriving a second time by a different route.

Updated counts after the re-audit: **3** insights may assert cause (down from 10), all three
`evidence-resolves-to: hard` and all three carrying `cause-scope: portfolio`. **2 of 4 causal
playbooks were demoted to observational**, and R6 demanded both demotions on its own rather than
being told.
