# chess-mind-patterns — Architecture Notes

## Stack at HEAD (2c7ced2, 2026-03-23 22:46 UTC)

- **Build:** Vite 5.4.19 + `@vitejs/plugin-react-swc` 3.11.0 (chess-mind-patterns@2c7ced2:vite.config.ts)
- **Runtime:** React 18.3.1 + react-dom 18.3.1
- **Routing:** `react-router-dom` 6.30.1, single page (`/`) + 404 fallback (chess-mind-patterns@2c7ced2:src/App.tsx)
- **Styling:** Tailwind CSS 3.4.17 + tailwindcss-animate + shadcn-ui (52 components in `src/components/ui/`)
- **State / data:** `@tanstack/react-query` 5.83.0; localStorage everywhere (no backend, no Supabase, no API client)
- **Forms / validation:** `react-hook-form` 7.61.1 + `zod` 3.25.76
- **Animations:** `framer-motion` 12.35.1 (introduced by bot during the 16:30 cluster on 2026-03-08)
- **Charts:** `recharts` 2.15.4
- **PDF export:** `html2canvas` 1.4.1
- **Chess domain:** `chess.js` 1.4.0 (only domain library; introduced reactively at `c1c2685` on 2026-03-08 17:39 with body 'to resolve build errors')
- **Testing:** Vitest 3.2.4 + jsdom + Testing Library — but only **one test file ships**: `src/test/example.test.ts` (143 bytes, presumably the Lovable template default) plus `src/test/setup.ts`. **No real test coverage exists.**
- **Tooling marker:** `lovable-tagger@1.1.13` is in devDependencies; this is Lovable's per-file marker used to track which lines were AI-generated
- **Build script:** `npm run dev`, `npm run build`, `npm run build:dev`, `npm run lint`, `npm run test` — standard set, no deploy script

## Brand and visual identity

The Tailwind config (chess-mind-patterns@2c7ced2:tailwind.config.ts) defines a custom chess palette layered on top of the shadcn-ui token set:

```
chess: {
  gold, gold-light, dark, darker,
  surface, surface-hover,
  success, danger
}
```

plus a custom `pulse-gold` keyframe animation (`box-shadow 0 0 0 0 hsl(43 76% 52% / 0.4) → 0 0 20px 5px ... / 0.1`). Fonts: Inter for sans, Playfair Display for display. This is a deliberate brand layer — gold-on-dark is the chess-rating-system aesthetic (FIDE arbiter pin colours).

The brand layer was introduced during the bot phase and survived the human phase verbatim. The human did not change colours.

## File-level architecture

### `src/lib/` — engines (24 files)

| File | Origin | LOC (approx by file size) | Purpose |
|---|---|---|---|
| `breakpoints.ts` | bot | 2.4K | Detect step-change moments in metacognitive resonance |
| `candidate-moves-engine.ts` | bot | 17.7K | Generate plausible move alternatives per position |
| `causal-explanations.ts` | human (`f590fe6`) | 9.5K | Mechanism + fix for 12 weakness labels + 4 category fallbacks |
| `chess-analyzer.ts` | bot | 16.2K | Top-level orchestrator wrapping chess.js |
| `chess-engine.ts` | bot | 19.3K | PGN evaluation pipeline |
| `coaching-tips.ts` | bot | 11.4K | Static coaching copy keyed to pattern IDs |
| `elo-goal.ts` | human (`2c7ced2`) | 5.4K | ELO range → priority-skill mapping, localStorage persistence |
| `eval-analysis.ts` | bot | 9.6K | Centipawn-loss + eval-trace processing |
| `lichess-links.ts` | human (`2c7ced2`) | 7.9K | 20 skill IDs → Lichess training-mode URLs |
| `metacognition-engine.ts` | bot | 17.6K | Per-move resonance, PE, KL-divergence, JS-divergence, blind-spot detection |
| `narrative-engine.ts` | bot | 45.5K | The single largest engine — generates persona-narrative copy |
| `pattern-recommendations.ts` | human (`875fe1c`) | 13.2K | Exploit/fix/lever recommendations per phase from win-loss correlation |
| `pgn-parser.ts` | bot | 7.0K | PGN tokenisation |
| `platform-import.ts` | bot | 5.1K | Chess.com / Lichess archive import |
| `reframe-engine.ts` | human (`875fe1c`) | 2.3K | MBTI-consistent positive reframe of weaknesses |
| `share-utils.ts` | bot | 1.5K | URL-encoded share payloads |
| `skill-dag.ts` | human (`f590fe6`) | 17.7K | 20-skill DAG, mastery scoring, getNextSkill() |
| `spaced-repetition.ts` | human (`f590fe6`, modified `2c7ced2`) | 13.3K | SM-2 algorithm + demo-puzzle seeding |
| `time-analysis.ts` | bot | 10.1K | Clock-driven move-time analytics |
| `training-engine.ts` | bot | 14.6K | Static training-plan generator (pre-human) |
| `training-roi.ts` | human (`f590fe6`) | 4.5K | Before/after delta per pattern, localStorage snapshots |
| `transition-signal.ts` | human (`875fe1c`) | 1.5K | Detect style-transition moments |
| `utils.ts` | bot/template | 0.2K | shadcn-ui `cn()` helper |

The bot engines are *analytic* — they take PGN data and produce metrics. The human engines are *actionable* — they take metrics and produce next-action recommendations (SM-2 review cards, DAG next-skill, ROI deltas, Lichess deep-links, causal explanations).

### `src/components/` — view layer (41 components, excluding `ui/`)

Bot-only (kept verbatim): `AnalysisLoading`, `BlunderPatterns`, `CandidateMoves`, `ChessHeader`, `CoachingTips`, `CriticalMoments`, `DailyTrainingPlan`, `EvalChart`, `FamousPlayerComparison`, `GameList`, `GamePhaseTimeline`, `GameStatsChart`, `ImprovementRoadmap`, `LanguageToggle`, `LearningTrajectory`, `MBTICard`, `MaterialChart`, `MetacognitiveAnalysis`, `NavLink`, `OpeningRepertoire`, `PDFExport`, `PersonalityNarrative`, `PgnDropZone`, `PieceHeatmap`, `PlatformImport`, `ShareableCard`, `SharedResultView`, `StrengthsWeaknesses`, `TimeControlSplit`, `TimeManagement`, `TrendsCharts`, `WinLossCorrelation`, `WinPatternAnalysis`.

Human-only: `EloGoal`, `MicroMission`, `PatternRecommendations`, `PersonalPuzzles`, `SkillTree`, `TLDRCard`, `TournamentCountdown`, `TrainingROI`.

The bot built ~33 analytic widgets (one per metric or per game-phase view). The human built 8 'verbs' (review puzzle, set ELO goal, follow skill tree, see top-3 TL;DR, do micro-mission, see pattern recs, see ROI, see countdown). The 33-to-8 ratio reveals the *attention-economy* split: the bot was producing dense detail-tabs; the human's commit was a *consolidation* into a small number of highly-actionable surfaces.

### `src/pages/Index.tsx` — the wiring seam (41 KB)

`Index.tsx` is the single page where everything is composed. It is the *only* file modified in all three human commits. The diff shape across commits A/B/C:

- Commit A: +82 / -24 — mount TLDRCard at top, sort tabs by `useTabEngagement`, add Demo button + auto-scroll
- Commit B: +28 / -2 — mount Personal Puzzles / Skill Tree / Tournament / Training ROI at top of Growth tab; call `saveSnapshot()` on every analysis; `addPuzzlesFromMoments()` injects puzzles from game critical moments; `buildSkillGraph()` + `computeROI()` added to `trendsComputed`
- Commit C: +10 / -2 — wire Lichess links, ELO goal, demo seeding

The operator never refactored the bot's `Index.tsx` structure — they *prepended* their action layer at the top of each tab. This is the architectural shape of additive resumption: the new diagnostic-action seam sits above the bot's analytics, not behind it.

## What does NOT exist

- No `CLAUDE.md`, `AGENTS.md`, `LOG.md`, `skill.md`, or any operator-facing doc in the repo
- No `.claude/` directory, no slash commands
- No `docs/` directory
- No `.github/workflows/` — no CI at all (vitest exists but is never run automatically)
- No `README.md` content beyond the unmodified Lovable template (still says `REPLACE_WITH_PROJECT_ID`)
- No deployment config (`vercel.json`, `netlify.toml`, none)
- No environment file (`.env.example`, none); the app has no backend
- No Supabase, no Anthropic API, no OpenAI API — entirely client-side
- Despite Vitest being installed, only the template's `example.test.ts` ships; the human commits did not add tests
- Both `bun.lock` (146 KB) and `package-lock.json` (296 KB) exist — the Lovable agent uses bun; the human likely added the npm lockfile when running locally, but neither is gitignored

## PWA layer (commit `2c7ced2`)

The final human commit adds the *only* deployment-grade artifacts:

- `public/manifest.json` — 464 bytes; defines `theme_color`, name, short_name, icons (placeholder)
- `public/sw.js` — 1.6 KB service worker with notification permission flow
- `index.html` modifications — meta `theme-color` + manifest link tag + service-worker registration script (15 LOC delta)

This converts the static analyzer into an installable PWA with push-notification support — the right shape to keep a spaced-repetition app actually *usable* without an app store. It is a 53 LOC change that takes the project from prototype-only to potentially-usable.

## Summary

chess-mind-patterns ships as a **two-layer app on one branch**: a dense bot-generated analytic surface (~33 widgets, ~24 engines, ~250 KB of TS) and a thin human-welded action layer (~8 widgets, ~6 engines, ~75 KB) wired together via a single 41 KB `Index.tsx`. There is no operator infrastructure (no CLAUDE.md, no docs, no CI), no backend, no deploy config — the PWA is the deployment vector. The architecture works because the bot produced something *self-contained enough* that the operator could add a parallel layer without ever having to debug the bot's internals.
