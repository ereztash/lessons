# Ground-Truth Labelling Rubric v1.1

> The `lessons` four-feature Tier classifier (F1–F4) has never been compared to a known-correct
> answer. `stability-test.ts` measures whether it repeats itself; `crp-lint.ts` measures whether a
> repo conforms to a protocol. Neither is accuracy. This rubric supplies the missing answer key.
>
> Established 2026-08-19 in response to `research/cross-repo/portfolio-as-one-mechanism.md` §6.1.

## 1. The independence requirement

A ground truth that reads the classifier's own features is not a ground truth — it is the
classifier wearing a different hat. This is the exact failure `CRM_Google_ai/core/provenance.py`
guards against: a score whose language came from the analyst rather than the subject.

So the label is built from signals **disjoint** from F1–F4:

| Classifier reads (F1–F4) | This rubric reads |
|---|---|
| a non-template production dependency | whether anything outside the repo consumes it |
| a non-bot commit author | how many times anyone came back after a real break |
| whether a PR exists | whether a review or audit actually happened |
| whether `docs/` or `CLAUDE.md` exists | whether the head has an executable artifact |
| — | how long since the last commit |

Both read git, so full independence is impossible. The partial overlap is stated in §5.

## 2. Signals

Collected by `scripts/collect-outcome-evidence.sh`. Every temporal signal excludes merge commits,
dependabot, whole-tree sync commits, and the Lovable scaffold's synthetic `template:` seed commit
(dated 2025-01-01 00:00 — including it fabricates a 527-day gap in `agency-insight-analyzer`).

- **`serving`** — evidence that something outside the repo consumes it: a live URL in the README
  backed by deployment config, or a pilot/client document naming a real party. A Lovable
  "publish" commit is **not** evidence — that is precisely the publish-button-as-success-condition
  pattern (H2), where publishing substitutes for a consumer.
- **`days_since_commit`** — days to 2026-08-19.
- **`work_sessions`** — commit clusters separated by ≥7 days: how many times anyone came back.
  Replaces "distinct calendar months", which is unreliable: `brain-healer-hub` spans two months
  with a maximum gap of 3 days — one continuous stretch across a month boundary.
  **The 7-day gap is a line that was set, not derived** (added 2026-09-03; the rule and every
  label are unchanged, so `rubric_version` stays 1.1). It was the only threshold in this file with
  no stated provenance, and it stood undetected because R4 in `check-lessons-contract.py` could
  never fire — see that file's R4 comment and `gate-reliability.md` §6.
- **`pr_merges`**, **`review_acts`** — merged PRs; branches or commits naming a review or audit.
- **`executable`** — an executable artifact exists (a declared run/build script, a Python entry
  point, a container, a shell entry). Deliberately **not** size-based: size sits close to F1's
  territory and would leak the classifier back in.

## 3. The rule

Implemented as code in `scripts/score-classifier.py::derive()`. The label is derived, never typed:
change a signal and the label follows.

```
not executable                          -> D  inert          nothing to run
serving AND days_since_commit <= 30     -> A  operating      serves someone, now
managed                                 -> B  managed        tended, but serving no one
otherwise                               -> C  single-burst   made once, left

managed = review_acts > 0  OR  work_sessions >= 2  OR  pr_merges >= 5
```

**Why these cut-points.** `A` requires *both* a consumer and current work, because a served
system that nobody has touched in three months is not operating — it is deployed and abandoned.
`managed` takes three routes because tending shows up differently by repo: a review act
(`Agent-Architect` — one PR, but a Haiku audit and a review-feedback commit), a return after a
break (`ground-state-protocol` — 3 sessions), or PR volume (`COR-SYS` — 13 merges in one stretch).
The `pr_merges >= 5` floor exists so that two same-day PRs merged by their own author do not count
as management; that is a workflow habit, not tending.

## 4. Adjudications

Where the mechanical signal needed a human call, the call is recorded in
`labels-2026-08-19.md` §3 rather than silently folded into the number.

## 5. Limitations — read before citing any number from this set

1. **Single labeller, not blind.** The same session that ran the classifier also wrote these
   labels. The rubric is mechanical to limit leakage, but this is not an independent replication.
   The uncontaminated version needs a second labeller — ideally the operator — applying §3 without
   seeing the tiers. Until then, treat the result as a **self-audit**, not a validation.
2. **No negatives on two signals.** All 10 repos are `executable`, so class `D` is unmeasurable
   here and `executable` contributes no discrimination on this sample. The classifier's Tier C/D
   discrimination is therefore **untested**.
3. **Sample is not random.** These are the 10 repos in session scope. They skew active and
   TypeScript-heavy; the 15 Tier-C/D repos from the n=25 scan are absent.
4. **Partial overlap with F2.** `review_acts` and `pr_merges` are related to F3 ("a PR exists").
   They differ in kind — F3 is a presence bit, these are counts of an act — but they are not
   orthogonal. An error analysis that leaned on them alone would be circular; §6.2 of the results
   does not.
5. **`ampaign-craft` and `lessons` are excluded.** `ampaign-craft` because only `main` was fetched
   and 77 remote branches were not, so its activity cannot be observed. `lessons` because it is
   the classifier's own home — a conflict of interest.

## 6. Re-running

```bash
bash scripts/collect-outcome-evidence.sh <repo> ...     # raw signals
# update ground-truth/labels-<date>.json with the signals + any adjudications
python3 scripts/score-classifier.py ground-truth/labels-<date>.json
```

The script asserts that the labels file's `rubric_version` matches the rule it implements, so a
rubric change cannot be scored against stale labels by accident.
