# Cross-Family Blind Rating, Round 3 — The Cells Never Rated

> 18 cells no blind rater had seen, 8 of them scored 0–1 by the incumbent. Frozen at `902f738`
> and pushed before any rater ran. Data: `interrater-round3-2026-08-19.json`.
> Reproduce: `python3 scripts/score-interrater.py ground-truth/interrater-round3-2026-08-19.json`.
>
> Purpose: round 2 downgraded `adversarial-second-surface` on MATI and anti-silo, leaving its
> promotion resting on three cells scored only by the incumbent. Those three are items 9–11.

## 1. Result

| | exact | mean \|diff\| |
|---|---|---|
| opus-control | 11/18 (61%) | 0.78 |
| sonnet | 11/18 (61%) | 0.94 |
| fable | 12/18 (67%) | 0.61 |

| ICC(2,1) | round 2 | **round 3** |
|---|---|---|
| across the three blind raters | +0.801 | **+0.909** |
| incumbent + the three raters | +0.652 | +0.676 |

**Eleven of eighteen items have perfect four-way agreement** — all three raters and the incumbent on
the same number. The raters agree with each other at 0.909, which is high by any convention.
Adding the incumbent still costs a quarter of that.

## 2. The blinding fix failed, and the blinding *check* is what worked

`CLAUDE.md` was moved out of the repository before the run and confirmed absent from disk
throughout. **All three raters received its full contents anyway**, and quoted it back verbatim —
including `_crm … a kill test that refuted its own metric`, which is the answer to item 12, and
`proofminer … largest hidden-agent repo`.

The harness assembles project instructions at **session** level. It does not read the file per
subagent. **No in-session subagent can be blinded by anything I control** — not by instruction
(rounds 1–2), not by removing the file (round 3). A genuinely blind rating needs a rater outside
this session.

What did work is the change I made to the *check*: every rater was required to report, as its first
output line, what had been injected. In round 2 one rater said "I did not read that repo", which was
true and uninformative. This round all three quoted the leak, and one added that where its finding
matched the injected claim it had re-derived it from primary evidence. **The difference between a
promise of blinding and a measurement of blinding is one required output line.**

Items 12, 13 and 9 are the ones the leak names. Their agreement should be discounted; the other
fifteen are unaffected by any text in the injected files.

## 3. The polarising bias reproduces on cells never rated before

| Cells | round 2 | **round 3** |
|---|---|---|
| incumbent scored 0–1 | +0.83 | **+1.17** |
| incumbent scored 2–3 | −0.58 | **−0.47** |

Same shape, larger on the low end, on a completely fresh item set. Where I score 0 I am, on average,
more than a full point below three independent raters. The mechanism is visible in the two worst
cells:

- **`contract-check-as-ci-gate @ CRM_Google_ai`: I scored 0, raters 3, 3, 2.** The repo has **84
  test modules**, including `test_no_pii_in_research_outputs.py` (regex-forbidding a real client
  name, company name and amount fields from committed research outputs), `test_architecture.py`
  and `test_audit_docs.py`, all run by CI. I had classified the repo as "a mirror with no original
  work" and never opened its `tests/` directory. The classification was right and the inference
  from it was wrong.
- **`dod-unsatisfiable-by-code @ MATI`: I scored 2, all three scored 0.** MATI has three markdown
  files and none contains a definition of done; exhaustive greps for DoD/acceptance/stranger across
  files and all commit messages return nothing. My 2 came from PR #18's body — a DoD on an open
  branch, not in the repo at HEAD. **The scale I wrote says "no evidence in the repo at HEAD".
  I scored from what I had read rather than from what exists.**

## 4. Changes adopted

Same rule as round 2 — median of the three raters where all three moved the same direction. Six of
eighteen qualify.

| # | Cell | Was | Now |
|---|---|---|---|
| 1 | `model-version-in-trailer` @ anti-silo | 0 | **3** |
| 4 | `commercial-doc-as-spec` @ CRM_Google_ai | 0 | **2** |
| 5 | `gate-left-behind-by-the-fix` @ Agent-Architect | 1 | **2** |
| 7 | `contract-check-as-ci-gate` @ CRM_Google_ai | 0 | **3** |
| 9 | `adversarial-second-surface` @ proofminer | 3 | **2** |
| 17 | `dod-unsatisfiable-by-code` @ MATI | 2 | **0** |

### Consequences

**`dod-unsatisfiable-by-code` is DEMOTED.** Its cells become pre-call 3, proofminer 1, MATI 0 —
one repo at ≥2, below the gate. It was promoted in Round 3 of the matrix on a MATI score I derived
from a PR body. **Promoted count 34 → 33.**

**`adversarial-second-surface` survives, and is no longer provisional.** The three cells its
promotion rested on were the point of this round: Agent-Architect and `_crm` came back **2 and 2,
unanimous, matching the incumbent exactly**; proofminer came down from 3 to 2. Four repos at ≥2 on
rated evidence. Its strength label stays `moderate-4-repos`.

**Three patterns gain a repo**: `model-version-in-trailer` (anti-silo, now 4 repos),
`contract-check-as-ci-gate` (CRM_Google_ai), `commercial-doc-as-spec` (CRM_Google_ai),
`gate-left-behind-by-the-fix` (Agent-Architect, now 3 repos at ≥2).

**`per-project-git-identity` is now at risk.** Item 16 split 0, 0, 2 against my 2 — no adoption
under the rule, but two of three raters found no project-specific identity in anti-silo, on the
argument that `Erez`/`ereztash` is the same generic identity used everywhere and only `_crm` carries
a project marker (`Erez (COR-SYS)`). If anti-silo is 0, the pattern has one repo and fails the gate.
**Flagged as contested; next round's first item.**

## 5. Verdict

The strengths are reproducible: three families agree at **0.909** on cells none had seen. The
instrument is not the problem. **The incumbent is**, with a bias that is now measured twice on
disjoint item sets and points the same way both times: I inflate what I have just written about and
zero what I have not looked at.

Standing confounds: within-vendor only; one pass per rater; **blinding is impossible for in-session
subagents and was breached in all three rounds**; the adoption rule remains post-hoc; n=18.
