# Round 4 — blind rating of the sharpened identity rule

**Date:** 2026-08-19 · **Items frozen and pushed at `0d0b517`, scorer at `452ec29`, both before any
rater ran.** · Raters: sonnet, haiku, fable — three families, byte-identical prompt (all three read
the same file rather than receiving transcribed copies).

## 1. What was tested, and what deliberately was not

Round 3's raters split 0/0/2 on `per-project-git-identity @ anti-silo`. Round 8 established the
split was **definitional, not observational**, and replaced the judgment with an executable rule.

This round does not ask whether raters agree with each other about a definition — that question is
unanswerable by adding raters and was not put to them. It asks: **does a reader handed the
sharpened rule reach the same answer the rule's implementation reaches?** If yes, the sharpening
removed the ambiguity. If no, the rule is a judgment wearing a rule's clothes.

**ICC was deliberately not the statistic, and the reason was recorded in advance rather than
discovered afterwards.** The population has 3 non-zero repos in 38; between-item variance in any
honest sample is near-zero, and Round 5 measured exactly what that does — sd 0.34 producing
ICC 0.143 at 80 % exact agreement (anti-pattern 24). Pre-registering a statistic this sample cannot
answer would have repeated that defect knowingly.

## 2. Result

| item | reference | sonnet | haiku | fable |
|---|---|---|---|---|
| COR-SYS | 3 | 3 | 3 | 3 |
| `_crm` | 3 | 3 | 3 | 3 |
| ex2 | 1 | 1 | 1 | 1 |
| anti-silo | 0 | 0 | 0 | 0 |
| dod-validator | 0 | 0 | 0 | 0 |
| nuxtjs-boilerplate | 0 | 0 | 0 | 0 |
| MATI | 0 | 0 | 0 | 0 |
| proofminer | 0 | 0 | 0 | 0 |

**Pooled exact-match 24/24 = 1.000** against a declared all-zeros baseline of 0.625.
**8 of 8 items unanimous and correct.** Every rater cleared the separately-declared non-zero gate
3/3, so none of this is the null model in disguise.

**VERDICT: EXECUTABLE BY A READER.** Both pre-declared gates met.

For contrast, this is the same pattern that produced a 0/0/2 rater split one round earlier. The
disagreement was in the definition, exactly as diagnosed, and writing the definition down removed
it completely.

## 3. The scores reproduce perfectly. The reasons do not.

Reason-correctness was pre-registered as a separate measure because Round 8 found a rater whose
score was right and whose stated ground was false. Every number each rater gave was checked
against git:

| rater | reasons fully correct | what was wrong |
|---|---|---|
| fable | **8/8** | nothing. 50 / 248 / 7 / 83 / 3 / 2 / 95 / 224 human commits all exact; correctly placed `Erez\|Erez2812345@gmail.com` in anti-silo **and** dod-validator; correctly counted `ereztash\|erez2812345@gmail.com` in 34 repos |
| sonnet | 3/8 | identities and sharing all correct, but "appears in 32 other repos" is off by one (33) and repeats across items 4–8 |
| haiku | 3/8 | gave COR-SYS a denominator of 33 for a 50-commit repo and called it "100 % majority" when it is 64 %; gave `_crm` 225 for 248; listed "Claude bot" among *human* identities on three items |

**Score-correctness 24/24 = 1.000. Reason-correctness 14/24 = 0.583.**

A rater can land the right score on arithmetic that does not survive checking. Had the scores been
accepted on the strength of their justifications, two of three raters would have been trusted for
the wrong reason — and had the justifications been accepted on the strength of the scores, the same.
This is the second consecutive round in which the two dissociate, and it is now a measured property
of the instrument rather than an anecdote.

## 4. The poll — unanimous, and it settles the ordering problem Round 8 could not

Declared in advance as **opinion, not measurement**, with the consequence of each outcome written
down before the vote so it could not be re-read afterwards.

**All three chose STRICT.** Unprompted, all three named the same ground: `_crm`'s marker says
`(COR-SYS)`, a *different* project, and crediting it rewards exactly the cross-project identity
bleed the claim denies. fable called it "a leftover config"; sonnet, "identity bleed across
projects"; haiku, "incongruence".

This matters for a specific reason. Round 8 disclosed that `--strict` was written **after** seeing
that `_crm`'s marker names another project, and reported the strict result as a counterfactual
rather than the headline precisely because that ordering is post-hoc. Three raters with no stake in
the outcome, shown both readings and asked which answers the claim, chose the same one.
**The demotion no longer rests on a rule its author reached for after seeing the data.**

Per the pre-declared consequence: `per-project-identity-as-practice` holds at **one** repo and
**stays demoted**. No score changes. Round 8's matrix rows stand as written.

Two raters also applied LOOSE correctly while believing STRICT was right, and said so in the same
breath — fable: *"the rule requires a parenthesised token, not that it name this repo"*, then voted
STRICT. Separating rule-application from opinion worked as designed.

## 5. Blinding: the fix this repo prescribes is now measured, and it does not work

`CLAUDE.md`'s identity paragraph was removed from disk before any rater ran and restored after.
This is the fix **anti-pattern 25 itself prescribes** ("move the file aside") and it had never
actually been tried at paragraph granularity.

**Two of three raters pasted the injected block verbatim, and it contained the removed paragraph** —
the portfolio aggregate *and* the name of the answer-key script. The removal had no effect on what
subagents received.

That closes the question opened in Round 3:

| attempt | round | result |
|---|---|---|
| instruct the rater not to read the repo | 1–2 | failed |
| remove the whole `CLAUDE.md` from disk | 3 | failed |
| remove only the leaking paragraph | **4** | **failed** |

Three methods, three failures. **In-session subagent blinding is not achievable by any means
available in this session, and this is now demonstrated rather than inferred.** The only measure
that has ever worked is the mandatory `BLINDING:` first line, which this round showed at its best:
one rater pasted the leak verbatim *and* enumerated what it gave away — "repo descriptions of 6 of
the 8 scored repos … asserts a portfolio identity count … names the forbidden script" — then stated
exactly which access it had used (`git log` against `lessons`, because `lessons` is on the portfolio
list it was required to check).

### 5.1 What the leak could and could not do — and where it helps my own result too much

Pre-declared rule: strike any item the leak answers. Applying it honestly:

- **No item is struck.** The leaked text carries portfolio *aggregates* (10 pairs, 8 one person,
  4 names × 5 emails), not per-repo scores. It cannot be arithmetically converted into any of the
  eight answers, and every rater's reasoning names identities and commit counts obtainable only by
  running git.
- **But the crux item is weakened, and by my own hand.** Item 4 (anti-silo) tests whether a rater
  checks the *whole portfolio* — its majority identity looks repo-unique from inside and is not.
  A rater primed with "8 of these identities are one person" is more likely to go looking for
  exactly that. The leak plausibly made the hardest item easier. **The 24/24 should be read with
  that discount on item 4**, not as a clean sweep.

The general finding is worth more than this round's number: **recording a result contaminates the
next blind test of it.** Round 8's write-up put its own answer key into the file the harness injects
into every subagent. Any repo that documents its findings in `CLAUDE.md` is disabling its own
future evaluations of those findings, and the more diligent the documentation, the worse the effect.

## 6. Limitations

- Item 4's difficulty was reduced by the leak (§5.1). The verdict rests on 7 uncompromised items
  plus one discounted one; it would still pass on 7.
- Three raters, one session, one harness. An out-of-session rater remains the only real blind test
  and is still not available here.
- The rule was tested for *executability*, not for *correctness*. That a reader reproduces the
  rule's output says nothing about whether the rule captures the thing the row claims — which is
  what the poll addresses, and a poll is not evidence.

## 7. Reproduce

```sh
python3 scripts/score-round4.py ground-truth/interrater-round4-2026-08-19.json
```

The scorer was dry-run before any data existed on three inputs whose verdicts are known: all-zeros
(0.625 → NOT EXECUTABLE, despite beating zero), perfect (1.000 → EXECUTABLE), and 22/24 with one
rater at 1/3 on the non-zero items (0.917 → still NOT EXECUTABLE). Both gates fire independently.
