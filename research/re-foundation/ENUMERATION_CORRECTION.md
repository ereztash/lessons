# ENUMERATION CORRECTION — Three Repositories the Re-Foundation Wrongly Called Absent

> Written 2026-09-03, hours after `docs/REFOUNDATION_DECISION.md`. The operator granted access to
> the portfolio and the first thing that access produced was a refutation of this round's own work.
>
> **Retracts LOG anti-pattern #26 and the "Note on the brief" in the re-foundation PR.** Written in
> place rather than by deleting what it corrects, on the model of `patterns-matrix.md` §2.2.

---

## 1. What I claimed, and what is true

**Claimed** (`ASSURANCE_MODEL_FIT.md` §0, LOG anti-pattern #26, the PR body):

> The brief named three repositories — `lichess_app`, `--Android`, `strategic-portal` — and a
> "lichess ladder" of reality levels. None of the four exists in this portfolio or this repository.

**True, measured 2026-09-03:**

| Repo | Exists | Visibility | Last push | HEAD |
|---|---|---|---|---|
| `lichess_app` | **yes** | public | **2026-09-03, today** | `60d84ae` |
| `--Android` | **yes** | public | 2026-08-27 | `3b30134` |
| `strategic-portal` | **yes** | public | 2026-08-30 | `b137b30` |
| the "lichess ladder" | no such artifact | — | — | — |

Three of the four claims were wrong. All three repositories are cloned and verified against their
remotes.

## 2. Why the error happened, which is the part worth keeping

`list_repos` on 2026-09-03 returns **44** repositories with `has_more=false`. The frozen scan files
cover **40**. The difference is exactly four:

```
--Android          pushed 2026-08-27
strategic-portal   pushed 2026-08-30
portal   (private) pushed 2026-08-30
lichess_app        pushed 2026-09-03
```

**Every one of them postdates the 2026-08-19 freeze**, and the frozen set is a strict subset of
today's: `comm -13` returns nothing in the other direction. So the 40 was correct on 2026-08-19 and
is not correct now.

The defect was not the number. It was the tense. I read a frozen, 15-day-old enumeration and wrote
**"does not exist in this portfolio"**, a claim about the present, when the enumeration only
supported **"is not in the 2026-08-19 scan"**, a claim about a past measurement. One `git ls-remote`
would have settled it and I did not run it, because I treated a committed file as current state.

`LOG.md` anti-pattern #19 already carries this rule — *"a statement about a portfolio is only as
wide as the enumeration behind it"* — and I broke it while writing a document whose subject is
evidence discipline. **And the brief's "44 repositories", which I recorded as an error in the
brief, was correct.**

## 3. What the exclusion cost, which is much more than a count

The three are not peripheral. Two of them hold the **strongest implementations in the portfolio of
the exact principles this round named as its core IP**, and both were excluded from
`METHOD_LINEAGE.md` by the enumeration error rather than by any judgment.

### 3.1 `--Android` implements "a gate must be shown to fail" as a build-failing mechanism

`lessons` shipped `scripts/gate-positive-control.sh` this morning as an application of the rule.
`--Android` already had it, stricter, and as a build gate rather than a separate script.

`scripts/run_gates.py`, line 2:

> *"Run every repo gate, and refuse to record any of them as PASSED unless its positive control was
> demonstrated RED in this same run. For each gate we run the control FIRST. If the control does not
> go red, the gate is reported as **NOT-A-GATE** and the whole run fails — regardless of what the
> gate said about the real tree."*

The controls are planted defects, not synthetic assertions: an INTERNET permission plus
`okhttp`/`java.net`/`WebView` source; `AES/ECB` with a fixed IV, a hardcoded key, MD5 and a seeded
RNG; one flipped byte in a committed lexicon artifact; one flipped byte in an upstream source before
hashing; **a real assembled APK carrying INTERNET and `java.net` usage**. Its README states the law
in one line: *"שער שמעולם לא נכשל לא הוכח כשער"* — a gate that never failed was never proven to be
a gate.

Three more mechanisms in the same repository, each of which this round registered as a principle
while citing a weaker implementation elsewhere:

- **`GATE-DOC-1` fails the build when two documents disagree.** `RELEASE_READINESS.md` states its
  device-blocked list twice, was wrong twice, and replaced the hand-kept claim with a generated
  block checked by a gate — *"because the mechanism that produced both errors was a claim kept in
  step by hand."* That is `CONTRADICTIONS.md` §3 and `AUTHORITY_MAP.md` §5, already executable.
- **`GATE-WITHDRAWN-1` fails the build if a withdrawn feature returns.** A real-word error layer was
  shipped, measured against a human labeller, failed a stopping rule **registered before the
  labelling**, and was withdrawn. *"ויתור היה זמין ולא נלקח"* — a waiver was available and was not
  taken. Preregistration, a refutation preserved as a gate, and a declined waiver, in one episode.
- **`RELEASE_READINESS.md` verdict: NOT READY**, with *"there is no 'ready except for'"*. That is
  the release-authority object in `ASSURANCE_THESIS.md` §2, written by hand and honoured.

Its three stated project laws are, verbatim, three rows of `METHOD_LINEAGE.md` §2: a claim is never
wider than the measurement that produced it; thresholds are chosen after a baseline exists and are
not moved to make a suite go green; what cannot be verified is written `UNVERIFIED` rather than
softened.

### 3.2 `lichess_app` enforces "evidence must postdate the claim" in the type system

- The only function that raises a claim's grade accepts a `ProspectiveDrillResult` **and has no
  overload for anything else** (`shared/claim.ts`, `claim-grade-protocol.ts`). Retrospective
  evidence cannot promote a claim, because the type will not permit it.
- **`refuted` is terminal**: `beginDrill` refuses a refuted claim forever. A refutation is
  permanent, enforced rather than documented.
- `shared/promise.ts` is one-authority-per-question with the drift failure named in the file: four
  surfaces carried their own copy of the product's promise, two disagreed during an edit, and *"a
  trial cannot measure a drift it is itself producing"*. The two copies that cannot import
  (`index.html` and a PNG) are held by a test.
- `vitest.controls.config.ts` exists because a control suite that collects no files exits 1, and
  *"which looks like a passing control while proving nothing."* **That is LOG anti-pattern #27,
  which I recorded this morning as a new finding. It was already solved here.**
- `tests/gates/` holds `prereg.test.ts`, `claim-anchor.test.ts`, `falsification`, `stale.test.ts`,
  `measurement.test.ts`, `authority` fixtures.

### 3.3 `strategic-portal`

A Hebrew strategic portal, *"מכאב לפרומפט שעובד"*, with `tests/`, `.github/`, `vercel.json` and a
service worker. Not an assurance implementation, and it is a legitimate portfolio member that the
scan never saw.

## 4. What this changes, and what it does not

### Changed

| Statement | Was | Is |
|---|---|---|
| Portfolio size | "40" | **44 today, 40 at the 2026-08-19 freeze.** Both are correct with their date attached; neither is correct without one |
| The brief's "44 repositories" | recorded as an error | **correct** |
| LOG anti-pattern #26 | "the brief named artifacts that do not exist" | **retracted.** Three of the four exist. The real lesson is #30 |
| `ASSURANCE_MODEL_FIT.md` §0 substitutions | necessary | **unnecessary for all three.** The cases can now be expressed directly |
| Core IP #2, "positive-control discipline, with a real instance" | cited `lessons`' own R2/R3/R4 failures | **`--Android` is the stronger instance**, and it is a build gate rather than a script |
| "current strongest implementation" for 3 rows of `METHOD_LINEAGE.md` §2 | pre-call, lessons | **`--Android`** for gate-must-fail, threshold provenance, and claim-narrower-than-measurement |
| `METHOD_LINEAGE.md` §3's "8 of 40, selected for exhibiting the mechanism" | a selection concession | **sharper**: two of the most complete implementations were excluded by an enumeration error, not by selection |

### Not changed

- **Level 7 is still 0.** `--Android` and `lichess_app` are the same operator, and largely the same
  agent family. Adding them raises the corpus's quality and moves nothing toward
  operator-independence. `product/FIELD_PREREGISTRATION.md` P10 and P11 are untouched.
- **The commercial verdict is unchanged.** n=0 buyers, n=0 external projects, n=0 revenue.
  `PROCEED_SERVICE_ONLY` stands.
- **The frozen artifacts stay frozen.** `scores-2026-08-19*.tsv` cover 40 and must not be edited;
  `prediction-2026-08-19.md` resolves on that set. The four newcomers are **outside the prediction's
  frame by construction** — they did not exist when it was registered — and adding them now would
  void it. Recorded here rather than acted on.

## 5. The rule this produces

Adopted as LOG anti-pattern #30:

> **A committed enumeration is a measurement with a date, not the current state of the world.**
> Any sentence of the form "X does not exist" needs a live check, not a file. Where a live check is
> not available, the only supportable sentence names the enumeration and its date: "X is not in the
> 2026-08-19 scan."
>
> The corollary that cost the most here: **an instruction that names an artifact you cannot find is
> evidence that your index is stale, not that the artifact is imaginary.** Anti-pattern #26 drew the
> opposite inference and was wrong on three of four counts.
