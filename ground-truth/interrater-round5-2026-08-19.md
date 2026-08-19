# Round 5 — the never-rated cells, stratified

**Items frozen at `ea4654d`, scorers at `2190889` and `ace87e8`, all pushed before any rater ran.**
Raters: sonnet, haiku, fable. 18 items, 10 patterns, 10 repos, incumbent sd **1.199**.

The 95 never-rated cells were enumerated mechanically — every cell in the Round 2–9 matrix minus
the 47 rated in rounds 1–4 — not recalled. They sit 44 / 3 / 15 / 33 across incumbent 0/1/2/3.

## 1. The headline inverts Round 3

| | round 2 | round 3 | **round 5** |
|---|---|---|---|
| ICC across the three blind families | +0.801 | +0.909 | **+0.491** |
| ICC with the incumbent added | +0.652 | +0.676 | **+0.535** |

Round 3 concluded: *"the instrument reproduces; the incumbent is the variance."* On cells nobody
had ever examined, **neither half of that holds.** The raters agree with each other at 0.491, and
**adding the incumbent raises the figure rather than lowering it** — the reverse of both prior
rounds. On the unexamined frontier the incumbent is not the outlier, because there is no consensus
for it to be outside of.

Round 3's reading was a property of its item set. Those cells lived in repos already characterised
in write-ups, where the evidence is salient and any careful reader finds the same artifacts. These
cells are the ones nothing had looked at, and they are where the instrument actually gets tested.

### 1.1 Sensitivity — the drop is not the contamination

| subset | n | ICC raters | ICC + incumbent |
|---|---|---|---|
| all items | 18 | +0.491 | +0.535 |
| minus the two contaminated items (§3) | 16 | +0.628 | +0.637 |
| minus the five primed items | 13 | +0.429 | +0.464 |
| minus contaminated **and** primed | 11 | +0.606 | +0.587 |

Removing the contaminated items lifts it to 0.628 — still far below 0.801 and 0.909. **The drop is
real.**

And the second row is the one worth stopping on: **removing the primed items makes agreement
worse, in every combination.** The shared leak was manufacturing consensus. Until now that was a
fear stated in every round's limitations section; here it is a number. *Contamination inflates
measured reliability* — so a leaky blind round does not merely risk a wrong answer, it reports
more confidence than it earned.

## 2. The pre-registered prediction: CONFIRMED, a third time

Frozen before the data, direction only: mean(rater − incumbent) **> 0** on incumbent-0/1 items and
**< 0** on incumbent-2/3 items.

| | round 2 | round 3 | **round 5** |
|---|---|---|---|
| incumbent 0–1 | +0.83 | +1.17 | **+0.542** |
| incumbent 2–3 | −0.58 | −0.47 | **−0.233** |

Three disjoint item sets, same two signs. **The polarising bias is a stable property of the
incumbent**, not an artefact of any one selection: cells it has not opened get scored too low, and
cells it has just written up get scored too high. The magnitude is roughly halved this round, which
the prediction did not claim and which is not read as anything.

## 3. The session contaminated the artifact it was rating

One rater scored items 4 and 5 as **3**, citing `git rev-parse --abbrev-ref HEAD` returning
`claude/analyze-additional-repos-v0s691`. **That is this session's own branch.** The task
instructions required a branch of that name in every repository and the harness checked it out in
all 40, so `git rev-parse HEAD`, `git branch --show-current` and `git status` return an agent
branch name in every repo in the portfolio regardless of its real default branch.

The three raters differed by exactly how far they verified:

| rater | score | method |
|---|---|---|
| one | 3 | `git rev-parse --abbrev-ref HEAD` — the checked-out label |
| two | 1 | noticed `main` and `origin/main` exist at the same tip: *"'no trunk was ever created' fails; only the HEAD label matches"* |
| three | **0** | `git ls-remote --symref origin HEAD` → `refs/heads/main` — went to the remote, live |

Verified independently: both repos are `origin/main`. **The correct score is 0 and the frozen rule
held them at 0**, but by a split, not by knowing.

**Portfolio-wide re-check of the pattern, from remote refs rather than local checkouts.** Exactly
two repositories of 40 have a genuine agent default branch — `Agent-Architect`
(`origin/claude/agent-architect-test-fixtures-mA6dz`, no main or master exists at all) and
`keepath` (`origin/HEAD` → `origin/claude/modular-system-design-kJg0a`). Both were already 3.
**`claude-branch-as-default-branch` = strong-2-repos survives and now rests on remote refs.**

This is a different and worse class of leak than `CLAUDE.md`. That one contaminates what a rater
*knows*; this one contaminates what a rater *observes*. Every rating round in this session ran
against working trees the rating session itself had modified, and no protocol step ever checked.

## 4. A leak channel nobody had enumerated

One rater disclosed that the parent session's **task list** is injected into subagents as recurring
system reminders, carrying 18 titles verbatim — *"Deep-dive `_crm`: archaeology + architecture"*,
*"Re-test 17 promoted patterns + promote new ones in patterns-matrix"*, *"Design the ground-truth
rubric with disjoint evidence"*, *"Score the F1–F4 classifier against the labels"*.

Every blinding audit so far enumerated `CLAUDE.md` and memory files. **None looked at the task
list**, which names the deep-dived repos and the fact that patterns are scored and promoted.

## 5. What changed

Frozen adoption rule: a cell moves only where all three raters move the same direction; the new
score is their median. **3 adopted, 11 held, 4 unanimous confirms.**

| cell | was | now | why |
|---|---|---|---|
| `language-splits-by-agent-surface` @ pre-call | 1 | **0** | Unanimous. All three checked every commit: **0 of 224 subjects contain a Hebrew character**; the Hebrew present is quoted UI strings inside English prose. The incumbent 1 was a trace that is not there |
| `adversarial-second-surface` @ pre-call | 2 | **1** | Unanimous down. The review-only artifacts exist (`docs/design-persona.md` — an explicitly fictional reviewer who never builds — and `tools/design-audit.js`), but **no distinct second AI surface**: the review commits carry the same Claude trailers as the build commits. Self-directed review by one surface is not the pattern |
| `authority-boundary-as-named-artifact` @ anti-silo | 2 | **3** | Unanimous up. `anti_silo/grounding_permit.py` encodes a locate/draft/advise/decide/act ladder where `decide` is never fully granted and `act` is never granted at all, with its own tests, a named README section, and a `GROUNDING_PERMIT.md/.json` artifact emitted per run. The incumbent under-counted a module it had already read |

**Promotion consequences.** One crossing of the ≥2 threshold: `adversarial-second-surface` @ pre-call
loses a supporting cell. Cells at ≥2 go 5 → **4** (MATI, Agent-Architect, proofminer, `_crm`), so
the pattern **stays promoted** and its existing `moderate-4-repos` label becomes exactly accurate
rather than one repo optimistic. `authority-boundary-as-named-artifact` goes strong-3 → **strong-5**.
**Promoted count unchanged at 33.**

## 6. The rule protected a cell a rater got wrong

Item 15, `authority-boundary-as-named-artifact` @ MATI: one rater scored **0** — *"No boundary
document or module found; no SECURITY.md, no contracts/ directory"* — against the other two at 3.

Checked directly: `docs/organizational-signal-contract.md` exists (5127 bytes, *"Authority after
detection"* at line 77), `lib/organizational-signals.ts` exists (8375 bytes), and
`scripts/check-organizational-signal-contract.mjs` exists. **The rater searched for the wrong
filenames and reported absence.** This is anti-pattern 28 — an unexamined cell and an empty one are
different claims — now produced by a blind rater rather than by the incumbent, and it is the second
time this round that a 0 meant *did not find* rather than *is not there*.

Requiring unanimity is what stopped it from landing.

## 7. Limitations

- Five items were primed by injected text, named in advance; §1.1 shows the priming *raised*
  agreement, so the honest headline is the primed-excluded figure, which is lower still.
- Two items were contaminated by the session's own checkout. They were caught, but only because
  one rater quoted the command it ran rather than asserting a conclusion.
- Three raters, one session, one harness, one vendor. n=18.
- Eleven of eighteen cells end this round exactly where they started, with three raters
  disagreeing about them. That is the real state of the unexamined frontier: **77 of the 95
  never-rated cells remain never rated**, and the 18 sampled suggest they are less settled than the
  matrix's single-scorer numbers make them look.
