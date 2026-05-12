# chess-mind-patterns — Commit Archaeology

All evidence pointers use the form `chess-mind-patterns@<7-char-sha>`.

## Headline numbers

| Metric | Value |
|---|---|
| Total commits | 175 |
| Distinct authors | 3 (Lovable, gpt-engineer-app[bot]/lovable-dev[bot], ereztash) |
| Bot commits (gpt-engineer-app) | 171 |
| Human commits (ereztash) | 3 |
| Lovable template stubs | 1 (`b331aa1`, 2025-01-08 back-dated to 2025-01-01) |
| PRs | 0 (any state) |
| Issues | 0 (any state) |
| Branches | 1 (`main` only) |
| Merge commits | 0 |
| `Co-Authored-By` trailers (bot) | 0 |
| `Co-Authored-By` trailers (human) | 3 (all 'Claude Sonnet 4.6') |
| `X-Lovable-Edit-ID` trailers | ~120+ (all bot commits with non-trivial subjects) |

## Bot blast distribution (2026-03-08 14:38 → 2026-03-09 01:06)

171 commits in 10 hours 28 minutes. Mean cadence: 16.3 commits/hour. Approximate hourly buckets:

| Hour (UTC, 2026-03-08/09) | Bot commits | Theme |
|---|---|---|
| 14:00 | 2 | plan save + initial scaffold |
| 15:00 | 24 | color detection bugs, narrative engine, win-pattern UI, polish |
| 16:00 | 13 | framer-motion animations across tabs |
| 17:00 | 18 | OG meta, sharing, footer credit, chess.js install |
| 18:00 | 17 | PDF export, QA fixes, multi-bug refactor |
| 19:00 | 0 | (silence) |
| 20:00 | 0 | (silence) |
| 21:00 | 0 | (silence) |
| 22:00 | 26 | training layers, time management, candidate moves, evals/CPL, metacognition, learning trajectory |
| 23:00 | 14 | metacognition, learning trajectory, breakpoint detection |
| 00:00 | 19 | breakpoint sliders, rich tooltips, real-time alerts |
| 01:00 | 1 | final 'Add animated breakpoint dots' (`18426b1`) — end of session |

The three-hour silence between 19:00 and 22:00 looks like an operator break (typing prompts elsewhere or stepping away), not a tooling failure — when work resumes at 22:00 the new subject domains (training, time management, candidate moves) imply a new prompt batch was queued.

## Commit subject morphology (bot phase)

The bot uses a small fixed vocabulary:

| Subject pattern | Count (approx) | Interpretation |
|---|---|---|
| `Add <feature>` | ~55 | First commit of a new prompt cycle |
| `Preceding changes` | ~25 | Mid-prompt incremental save (Lovable internal checkpoint) |
| `Changes` | ~10 | Generic incremental |
| `Save plan in Lovable` | ~8 | Plan-save marker between micro-phases |
| `Fix <X>` / `Fixed <X>` | ~9 | Bug-fix cycle |
| `Update <X>` / `Updated <X>` | ~6 | Refinement |
| `Enhance <X>` / `Enhanced <X>` / `Improve <X>` / `Improved <X>` / `Refined` / `Refactored` | ~15 | QA pass |
| Hebrew / Chinese subjects | 3 | Operator-prompt language leakage (see below) |

There are zero `feat:` / `fix:` conventional-commit headers in the bot phase. There are zero scope-prefixed subjects. There are zero commit bodies referencing tests, CI, or other commits by SHA. Every non-trivial bot commit body ends with `X-Lovable-Edit-ID: edt-<uuid>`.

## Cross-language commit subjects (the Hebrew/Chinese anomaly)

Three bot commits leak operator-typed prompt text:

| SHA | Time (UTC) | Subject | Note |
|---|---|---|---|
| `961f40d` | 2026-03-08 18:52:49 | `שופר ייצוא דו״חות` | Hebrew: 'Report export improved' — at the end of the PDF-export QA hour |
| `ef98955` | 2026-03-08 23:05:50 | `Add metacognition分析` | English + Chinese 分析 ('analysis') — at the start of the metacognition cluster |
| `a8794c6` | 2026-03-09 00:32:28 | `הוסף breakpoints Tooltip` | Hebrew: 'Add breakpoints Tooltip' — between two English subjects of the same theme |

All three sit at *transitions* between bot micro-phases, where a new operator prompt would naturally land. The Lovable agent appears to derive commit subjects directly from the user prompt's leading verb phrase — when the operator types in Hebrew, the agent echoes the Hebrew. The same operator code-switches mid-stream (`Add metacognition分析` is one prompt with a code-point that survived a paste from a research note). This is a *user-to-claude* signal masquerading as a bot artifact.

## Human commits — full structural breakdown

All three commits authored 2026-03-23 by `ereztash <ereztash@users.noreply.github.com>`, committed directly to `main`, no PR. All three carry the trailer `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`.

| SHA | Time (UTC) | Title | +adds | -dels | New files | Modified files |
|---|---|---|---|---|---|---|
| `875fe1c` | 21:34:18 | `feat: add TL;DR, pattern recommendations, transition signal & demo mode` | 1421 | 24 | 8 | 1 (`src/pages/Index.tsx`) |
| `f590fe6` | 22:16:42 | `feat: full course replacement — Phase 1-5 implementation` | 2102 | 23 | 8 | 2 (`TLDRCard.tsx` from commit A, `Index.tsx`) |
| `2c7ced2` | 22:46:36 | `feat: Lichess deep-links, demo puzzle seeding, ELO goal setter, PWA + notifications` | 939 | 22 | 5 | 6 (`PersonalPuzzles.tsx`, `SkillTree.tsx`, `TLDRCard.tsx`, `spaced-repetition.ts` — all from commits A/B — plus `index.html` and `Index.tsx`) |
| **Total** | 72 min | — | **4462** | **69** | **22** | — |

All 69 deletions are confined to files the bot or a prior human commit created. Zero bot-originated files are deleted at any point.

## Bot vs human file-touch overlap

Files touched only by the bot (kept verbatim by the human): `AnalysisLoading.tsx`, `BlunderPatterns.tsx`, `CandidateMoves.tsx`, `ChessHeader.tsx`, `CoachingTips.tsx`, `CriticalMoments.tsx`, `DailyTrainingPlan.tsx`, `EvalChart.tsx`, `FamousPlayerComparison.tsx`, `GameList.tsx`, `GamePhaseTimeline.tsx`, `GameStatsChart.tsx`, `ImprovementRoadmap.tsx`, `LanguageToggle.tsx`, `LearningTrajectory.tsx`, `MBTICard.tsx`, `MaterialChart.tsx`, `MetacognitiveAnalysis.tsx`, `NavLink.tsx`, `OpeningRepertoire.tsx`, `PDFExport.tsx`, `PersonalityNarrative.tsx`, `PgnDropZone.tsx`, `PieceHeatmap.tsx`, `PlatformImport.tsx`, `ShareableCard.tsx`, `SharedResultView.tsx`, `StrengthsWeaknesses.tsx`, `TimeControlSplit.tsx`, `TimeManagement.tsx`, `TrendsCharts.tsx`, `WinLossCorrelation.tsx`, `WinPatternAnalysis.tsx`, and most of `src/lib/` (`breakpoints.ts`, `candidate-moves-engine.ts`, `chess-analyzer.ts`, `chess-engine.ts`, `coaching-tips.ts`, `eval-analysis.ts`, `metacognition-engine.ts`, `narrative-engine.ts`, `pgn-parser.ts`, `platform-import.ts`, `share-utils.ts`, `time-analysis.ts`, `training-engine.ts`, `utils.ts`). **~50 bot-only files retained.**

Files touched only by the human: `TLDRCard.tsx`, `MicroMission.tsx`, `PatternRecommendations.tsx`, `EloGoal.tsx`, `PersonalPuzzles.tsx`, `SkillTree.tsx`, `TournamentCountdown.tsx`, `TrainingROI.tsx`, `useTabEngagement.ts`, `pattern-recommendations.ts`, `reframe-engine.ts`, `transition-signal.ts`, `spaced-repetition.ts`, `skill-dag.ts`, `causal-explanations.ts`, `training-roi.ts`, `lichess-links.ts`, `elo-goal.ts`, `public/demo-games.pgn`, `public/manifest.json`, `public/sw.js`. **21 human-only files.**

Files touched by both: `src/pages/Index.tsx` (the wiring file — modified in all 3 human commits to mount new components into the existing layout) and `index.html` (modified once for PWA meta tags). **2 shared files.**

The human/bot file ratio (21/~50) reveals a ~40% surface expansion in a single 72-minute session, with the human concentrated in a narrow seam (Index.tsx) and otherwise additive.

## Reactive vs designed dependency adds

`chess.js@^1.4.0` enters via `c1c2685` 2026-03-08 17:39:46 with the body 'Installed the chess.js package to resolve build errors' — i.e., the bot built features needing chess.js, the build broke, then it bolted on chess.js. This is reactive, not designed. The same pattern is implicit for `framer-motion`, `html2canvas`, `recharts`, `chess.js`, `lovable-tagger` — all package.json entries are bot-introduced; the operator's only dependency-affecting commit is `2c7ced2`, which adds *no* new npm dependencies (Lichess is a URL builder, PWA is plain manifest + service worker).

## Final commit cadence picture

```
2025-01-08 ──── b331aa1 (template stub)
          │
          │  14 months no activity
          │
2026-03-08 14:38 ──── bot blast begins
        │  ░░░░░░░░░░░░░░░░░░░░░░░░ 171 commits in 10h28m
2026-03-09 01:06 ──── bot blast ends (18426b1)
          │
          │  14 days 20h 28m dormancy
          │
2026-03-23 21:34 ──── human resumes (875fe1c)
        │  ███ 3 commits in 72 minutes
2026-03-23 22:46 ──── HEAD (2c7ced2)
          │
          │  50 days no activity (as of 2026-05-12)
```
