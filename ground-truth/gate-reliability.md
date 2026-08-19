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
