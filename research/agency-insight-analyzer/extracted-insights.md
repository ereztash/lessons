# agency-insight-analyzer — Raw Insight Candidates

> Phase 1 survey, 2026-08-19. Repo: `ereztash/agency-insight-analyzer` — "Agency Debrief":
> upload a coaching transcript, get a mirror-not-judge report. TanStack Start + shadcn.
> Verified locally: 17 commits (13 non-merge), 2 PRs, 2026-06-11 → 2026-06-12. Dormant 68 days.

---

## 2026-08-19 10:10 — The bot-blast-to-human-resumption gap is 11 hours, not 5 weeks

**Dimension guess**: user-to-user
**Evidence**: 11 `gpt-engineer-app[bot]` commits 2026-06-11 20:46–21:32 (9 of them inside 5 minutes); first Claude commit @c02b2a0 2026-06-12 08:47; both PRs merged by 13:37 the same day
**Observation**: The promoted `bot-blast-then-human-resumption` pattern was measured at gaps of 37 days (groundstate-protocol) and 14 days (chess-mind-patterns). Here the gap is overnight, and the resumption is not a pivot: the Lovable blast built the Agency Debrief app, and Claude's two PRs extend the same product — free-form speaker names with role mapping, then a frictionless upload flow plus a learning-consent banner.
**Mechanism hypothesis**: Gap length is the variable that predicts what resumption does. A long gap resumes as a **pivot** (groundstate: the grounding tool became a landing page; the old flow was demoted to an archive route). A short gap resumes as **continuation**. The mechanism is memory: after five weeks the operator no longer holds the product idea and re-decides it; overnight they still hold it and merely extend it. Refines the pattern with a testable threshold rather than treating all resumptions alike.

---

## 2026-08-19 10:12 — Claude's commit body argues from the product's stated principle

**Dimension guess**: claude-to-user
**Evidence**: agency-insight-analyzer@9d1bc62 — *"Two additive, user-facing enhancements aligned with the 'mirror, not judge' principle"*; the body then specifies consent persistence (`agency_insight_consent`, not re-asked for 30 days) and a parser tolerant of `role`/`speaker` and `content`/`text` field variants
**Observation**: The commit body opens by naming the product principle the change serves, and only then describes the change. Both Claude commits in the repo do this; none of the 11 bot commits do (their subjects are `Changes`, `Work in progress`, `Update site info for publish`).
**Mechanism hypothesis**: Third independent instance of `editorial-commit-voice-escalation`, and it isolates the mechanism. The escalation is not "longer messages over time" — it is **the arrival of a justification layer**: the commit stops describing the diff and starts arguing that the diff is correct. A bot with no product model cannot produce that layer, which is why the register jump is discontinuous at the surface boundary rather than gradual.

---

## 2026-08-19 10:14 — A Lovable template from a newer generation, and the operator's Hebrew reaches the bot

**Dimension guess**: user-to-claude
**Evidence**: seed commit `template: tanstack_start_ts_2026-06-08` (vs `vite_react_shadcn_ts_2026-03-20` in brain-healer-hub); bot commit @b066dee subject `הוסף תמיכת עברית-אנגלית` ("add Hebrew-English support")
**Observation**: The scaffold is TanStack Start, three months newer than the Vite/shadcn template seeded into the other Lovable repos, and one bot commit subject is in Hebrew — the bot echoing the operator's prompt language into the commit log.
**Mechanism hypothesis**: Two dating signals worth recording. The template string dates the repo's *generation* independently of its first commit, useful for ordering a portfolio built on the same tool over a year. And a bot commit in Hebrew is a verbatim prompt echo, which makes bot commit subjects a partial transcript of what the operator asked for — the only surviving record of the prompt side of a Lovable session.
