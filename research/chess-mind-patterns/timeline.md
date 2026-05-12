# chess-mind-patterns — Human Timeline

## One-paragraph summary

`chess-mind-patterns` is a Vite + React + shadcn-ui chess pattern analyzer that was first sketched as a Lovable template stub on 2025-01-08, then exploded into existence on **2026-03-08** in an 11-hour, 171-commit Lovable (gpt-engineer-app) generation blast that stalled at 2026-03-09 01:06 UTC. The repo sat dormant for **14 days, 20 hours, 28 minutes**. On 2026-03-23 between 21:34 and 22:46 UTC — a single 72-minute evening session — the operator (ereztash) returned and shipped **three Co-Authored-By-Claude commits** that added a complete progression layer (TL;DR card, SM-2 spaced repetition, Skill DAG, Tournament Countdown, Training ROI, Lichess deep-links, ELO goal setter, PWA manifest) **without removing any of the bot's prior analytic components**. This is the canonical 'resumption' shape: bot generates the dense diagnostic surface; the operator does not refactor, deletes nothing, and welds a parallel action-and-feedback layer on top using Claude Code in a single concentrated burst.

## Phase 0 — Template seed (2025-01-08)

A single Lovable platform commit `b331aa1` ('template: new_style_vite_react_shadcn_ts_testing_2026-01-08', authored as `Lovable <noreply@lovable.dev>` on the back-dated 2025-01-01 timestamp) sits at the root of history. This is the Vite + React + shadcn-ui + Vitest baseline that every Lovable chess-mind-patterns prompt would build on top of. README.md still ships unmodified at HEAD with the literal placeholder string `REPLACE_WITH_PROJECT_ID` in the project URL — the operator never wrote a README.

## Phase 1 — The bot blast (2026-03-08 14:38 → 2026-03-09 01:06 UTC)

For **10 hours 28 minutes**, the Lovable agent (committing as `gpt-engineer-app[bot]`, GitHub login `lovable-dev[bot]`, ID 159125892) produced **171 commits**. Average rate: 16.3 commits/hour, one every ~3 minutes 40 seconds. Burst rate during dense sections (e.g., 'Save plan in Lovable' followed by 6-12 micro-commits with the marker `Preceding changes`) reached 14 commits in 90 seconds.

The blast unfolded in roughly seven micro-phases visible in commit subjects:

1. **14:38–15:05** — header polish, comparisons, plan saves
2. **15:11–15:43** — color-detection bug-hunt loop, then Win/Loss Pattern UI and storytelling components (`narrative-engine.ts`, `PersonalityNarrative.tsx`)
3. **15:53–16:30** — 'world-class polish', framer-motion animations across tabs and cards
4. **16:30–17:50** — shareable link / OG meta / author credit / footer contact
5. **17:39** — `chess.js` dependency added with the commit body 'Installed the chess.js package to resolve build errors' (`c1c2685`); this is the only place chess.js enters the repo and it arrives as bug-fix, not design
6. **18:30–22:35** — PDF export, QA fixes, time-management, candidate moves, evals + CPL, learning trajectory
7. **22:54–01:06** — metacognition engine + UI, breakpoint detection logic with animated breakpoint dots, breakpoint sliders, rich breakpoint tooltips, real-time breakpoint alerts

Commit subjects show three notable language anomalies: `a8794c6` 'הוסף breakpoints Tooltip' (Hebrew), `961f40d` 'שופר ייצוא דו״חות' (Hebrew, 'improved report export'), and `ef98955` 'Add metacognition分析' (English + Chinese 分析 meaning 'analysis'). All three subjects appear at lull points in the timeline (transitions between micro-phases) and are bracketed by all-English subjects — strongly consistent with the hypothesis that these subjects are direct echoes of operator-typed prompts in the Lovable UI, where the operator typed in Hebrew (their primary language; the Chinese is more likely a stray code-point from copy/paste). The agent did not 'choose' a language — it mirrored its prompt.

The blast ends abruptly at `18426b1` 'Add animated breakpoint dots' on 2026-03-09 01:06:10 UTC. There is no commit signalling exhaustion, no `WIP` marker, no plan-save final state. The Lovable session simply stops, mid-feature (breakpoints are working but not visibly integrated with the metacognition layer the previous hour just shipped).

## Phase 2 — Dormancy (2026-03-09 01:06 → 2026-03-23 21:34, 14 days 20h 28min)

No commits. No issues opened. No PRs. No branches created (the repo retains exactly one branch — `main` — for its entire history). The Lovable preview surface presumably remains live, but the GitHub-visible record shows a hard stop.

## Phase 3 — The 72-minute resumption (2026-03-23 21:34 → 22:46 UTC)

The operator returns. Authorship is now `ereztash <ereztash@users.noreply.github.com>`, committed directly to `main`. All three commits carry `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` trailers — Claude Code is now the pairing partner, not Lovable's gpt-engineer-app. The commit subjects switch from the bot's terse imperatives (`Add X`, `Fix Y`, `Changes`) to multi-line conventional-commit `feat:` blocks with itemised body listings.

### Commit A — `875fe1c` at 21:34:18 UTC (+72 min before close)

Title: `feat: add TL;DR, pattern recommendations, transition signal & demo mode`. 9 files, 1421 additions, 24 deletions, all 24 deletions concentrated in `src/pages/Index.tsx` (the bot-generated wiring file). 8 new files: `TLDRCard.tsx`, `MicroMission.tsx`, `PatternRecommendations.tsx`, `useTabEngagement.ts`, `pattern-recommendations.ts`, `reframe-engine.ts`, `transition-signal.ts`, `public/demo-games.pgn` (443-line PGN anonymised as 'Demo Player').

### Commit B — `f590fe6` at 22:16:42 UTC (+42 min)

Title: `feat: full course replacement — Phase 1-5 implementation`. The body explicitly names each phase: Personal Puzzle Generator (Spaced Repetition, SM-2), Skill Dependency Graph (20-skill DAG), Causal Explanation Layer, Tournament Countdown, Training ROI Loop. 10 files, 2102 additions, 23 deletions. 8 new files plus modifications to `TLDRCard.tsx` (from commit A, 30 minutes earlier) and `Index.tsx`. The phrase 'full course replacement' implies a prior plan document existed in the operator's Claude Code session — the GitHub record only shows the implementation deliverable.

### Commit C — `2c7ced2` at 22:46:36 UTC (+30 min, repo HEAD)

Title: `feat: Lichess deep-links, demo puzzle seeding, ELO goal setter, PWA + notifications`. 11 files, 939 additions, 22 deletions. 5 new files (`EloGoal.tsx`, `elo-goal.ts`, `lichess-links.ts`, `public/manifest.json`, `public/sw.js`) plus 6 modifications to commits A/B output and `index.html`. This commit converts a static analyzer into a PWA with notification opt-in and external Lichess practice integration — a deployment-grade step.

Across the three commits: **22 new files, 4462 additions, 69 deletions in 72 minutes.** All deletions are inside files the bot originally created, never wholesale removals. No bot-generated component file is deleted across the entire repo's history.

## Phase 4 — Indefinite pause (2026-03-23 22:46 → present, 2026-05-12)

No commits since `2c7ced2`. 50 days have elapsed. The repo retains its three branches-of-zero (only `main`), zero PRs, zero issues — the same emptiness as the bot phase, but on top of a now-shippable PWA.

## What this timeline reveals

The operator treats Lovable as a **diagnostic surface generator** (bot phase produces 30+ analytic widgets) and Claude Code as a **progression-layer welder** (human-led phase adds the actionable spine). Between the two roles is a multi-week incubation where the operator presumably uses the Lovable preview personally, deciding what is missing. The resumption is concentrated (72 minutes) and structured (three commits with declared scopes: 'TL;DR / patterns', 'Phase 1-5 course', 'integrations + PWA'). The bot's output is not refactored — it is annexed.
