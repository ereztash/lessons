# Resumer Day Prep — The 72-Minute Lovable Resumption Sprint

> Tagline: You have one ~72-minute window to resume a dormant Lovable repo before context decays — here's how to use every minute.

> **Claim strength: causal.** both backing insights carry `may-assert-cause: yes` — strong-2-repos, sharpened by the gap-length threshold.
> The mechanism may be stated as a mechanism.

## Target buyer

**Solo Lovable-builders on month 2+ who have one or more dormant repos and want to resume the most promising one in a single sitting without descending into refactor-paralysis.**

More specifically: indie hackers, consultants, and tech leads who have bootstrapped a Lovable project, gone silent for 1-6 weeks, and now want to come back productively before context evaporates further.

## Rework hours saved per session

**1-3 hours per resumption attempt** — the cost of a failed resumption sprint that produces no shippable artifact (typically: 90 minutes of trying to refactor, context degrades, session ends in frustration with no merge).

If the playbook converts even one failed attempt per month into a shippable one, the annual saved time is 12-36 hours.

## Problem statement

A Lovable repo dormant for 1-6 weeks sits at a fragile state: the bot's choices were accepted at commit time but the operator's memory of those choices has decayed. A naive resumer opens the repo, starts refactoring "to understand the code," and burns the first 90 minutes on a refactor that doesn't ship the feature they came back for. By the time they're 90 minutes in, context has degraded further, and the session ends with no shippable artifact. The dormant repo gets demoted to "abandoned with extra steps." The resumer-day-prep playbook prevents this collapse by codifying the 72-minute window rules observed in the dataset: don't refactor; layer; touch only the wiring file; ship external integrations together in the final commit. The trade-off is that the architecture becomes layered rather than refactored — but a shipped layered feature is worth infinitely more than an unshipped refactor.

## The playbook

### The 72-minute breakdown

**0-15 min: Orient (do not change code)**

1. Open the repo in your local editor.
2. Run `git log --pretty=format:'%an %s' --max-count=20` and read.
3. Open Lovable, view the rendered preview, take a screenshot. (This is your visual anchor.)
4. Open the dependency manifest (package.json). Identify the ONE non-template dependency (chess.js, Web3Forms, GA4, etc.). This is the project's *commitment device* and the clue to its success condition.
5. Open the wiring file (`src/pages/Index.tsx` or `src/App.tsx` for Lovable defaults). Read it top to bottom. Identify the integration seam.
6. Write a 3-line plan: (a) the feature I will ship this session; (b) the integration it requires; (c) the wiring-file edit it lives behind.

**15-45 min: Layer (additive only, no refactor)**

1. Create new files for new features. Do NOT delete bot-generated files (they are immutable substrate).
2. Add new engines / hooks / components as siblings of the bot-generated ones.
3. Resist any urge to rename, reorganize, or rewrite. If something feels wrong, note it in /docs/POSTPONED.md and continue.
4. Run `npm run dev` periodically; verify the app still renders. Lovable's preview should still match within tolerance.

**45-60 min: Wire (the only file you'll modify)**

1. Open the wiring file (Index.tsx / App.tsx).
2. Import your new modules.
3. Hook them into the existing JSX tree at the seam point.
4. Run the app once; verify wiring works. Commit with a clean `feat: ...` message.

**60-72 min: Ship external integrations together**

1. If the feature requires Lichess deep-links / PWA manifest / service worker / external API keys: add them ALL in this final commit.
2. Half-shipped integrations get stuck behind unresolved API keys or auth flows; together they go in cleanly.
3. Final commit message: `feat: <feature> with <integration-1> + <integration-2> + <integration-N>`.
4. Push, open PR if your tier wants one, otherwise direct-merge.
5. Close laptop. Do not extend the session past 72 minutes; the marginal commit is unlikely to ship cleanly.

### Pre-sprint checklist (run the day BEFORE the sprint)

```markdown
## Pre-sprint check — <date>
- [ ] Success condition is still behavioral (re-run the publish-button intent triage if uncertain)
- [ ] Wiring file is identified (path: ____________)
- [ ] The ONE feature to ship is named (feature: ____________)
- [ ] External integrations are pre-staged (API keys at hand, PWA manifest drafted, service worker logic sketched)
- [ ] Lovable's preview is currently working (no broken-build state to fix first)
- [ ] I have 72-90 minutes of uninterrupted time scheduled
```

### Anti-refactor mantra

When you feel the urge to refactor:

1. **Note it** in /docs/POSTPONED.md with a date.
2. **Layer instead** — your new code sits as a sibling, not a replacement.
3. **Wire only** — the integration seam is the wiring file. Touch nothing else.
4. **Ship the feature** — the refactor can be a future session that you may or may not run. The feature MUST ship today.

The dataset evidence: zero bot-generated files were deleted by any human resumer across the 4 repos. Treat this as a rule, not a coincidence.

### The 4:1 diagnostic

Before starting the sprint, check the analytics:action ratio:

- Count bot-built analytics widgets (cards, dashboards, charts, read-only displays).
- Count action widgets you plan to add (forms, buttons, integrations, write-side flows).
- Aim for ~4 analytics : 1 action ratio in the resumed state.

If you find yourself wanting to build a 5th action when only 2 analytics exist, you may be over-actioning a render-mode project; revisit the publish-button intent triage.

## Evidence

- **chess-mind-patterns** — 72-minute sprint on 2026-03-23 producing 3 `feat:`-prefixed commits totalling 4,462 line additions and 22 new files. Zero bot-file deletions; wiring concentrated in Index.tsx; PWA + Lichess + SM-2 integrations all land in the final commit. Reference: chess-mind-patterns@11:00, chess-mind-patterns@11:03, chess-mind-patterns@11:07.
- **chess-mind-patterns** — analytics:action ratio at the resumed state is 33 bot-built analytic widgets vs 8 human-added action widgets (≈4:1). Reference: chess-mind-patterns@11:04.
- **chess-mind-patterns** — Index.tsx is the single integration seam where action widgets plug into analytics engines, preserving Lovable's bot work as immutable substrate. Reference: chess-mind-patterns@11:09.
- **groundstate-protocol** — 37-day silence followed by Claude pivot on 2026-04-14 with `dc90fee` adding Landing.tsx + Header.tsx + SignupForm.tsx and demoting GroundState to `/groundstate` archive route. The resumption was decisive and additive. Reference: groundstate-protocol@11:00.

## When to use

- A Lovable repo that has been dormant for 1-6 weeks and you want to revive
- Any AI-platform-bootstrapped repo with a clear wiring file and bot-built analytics layer
- A session where you have 72-90 minutes of uninterrupted time blocked
- After running the publish-button intent triage and confirming the success condition is behavioral (not demonstrative)

## When NOT to use

- Repos with broken builds (fix the build first; do not attempt a feature sprint on a non-running app)
- Repos where the success condition is demonstrative (Publish-button-satisfiable — there's nothing to resume; finish at Tier C)
- Sessions <60 minutes (you cannot complete the 4-phase breakdown in less time; defer)
- Repos dormant >12 weeks (context decay is too high; consider re-bootstrapping rather than resuming)

## Adoption checklist

1. [ ] I have classified my dormant repos using the publish-button intent triage; the target repo is behavioral-success.
2. [ ] I have run the pre-sprint check the day before the sprint.
3. [ ] I have 72-90 minutes blocked with no interruptions.
4. [ ] I have identified the wiring file path and one feature to ship.
5. [ ] I have pre-staged external integration assets (API keys, PWA manifest, service worker sketch).
6. [ ] I have committed to NOT deleting any bot-generated file during the sprint.
7. [ ] I have a /docs/POSTPONED.md ready to capture refactor urges without acting on them.
8. [ ] I have a final-commit message template ready: `feat: <feature> with <integrations>`.

## Cross-references

- Insight source: `/insights/user-to-user/resumer-day-prep.md`
- Companion playbook: `/products/playbooks/publish-button-intent-triage.md` (run this FIRST to confirm the repo deserves resumption)
- Companion playbook: `/products/playbooks/dual-ai-surface-workflow.md` (the cadence to maintain DURING the sprint)
- Companion playbook: `/products/playbooks/four-feature-tier-classifier.md` (the score that triggered the resumption decision)
- Pricing row: `/products/pricing-hypotheses.md`
