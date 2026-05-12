# core-unified-consciousness — Commit Archaeology

> Bot-only commit history. 56 commits total, of which 1 is the Lovable template seed and 55 are gpt-engineer-app[bot] edits across a ~17-hour window with a 14h37m dead interval in the middle.

## Author bucket

| Author identity | Email | Count | % | Role |
|---|---|---|---|---|
| `Lovable` | `noreply@lovable.dev` | 1 | 1.8% | Template publisher (Island 0) |
| `gpt-engineer-app[bot]` (login `lovable-dev[bot]`) | `159125892+gpt-engineer-app[bot]@users.noreply.github.com` | 55 | 98.2% | Per-prompt edit committer (Islands 1+2) |
| Human (any) | — | **0** | 0% | absent |
| Claude (Co-Authored-By trailer) | — | **0** | 0% | absent |

**Total**: 56 commits, 100% machine-authored, 100% direct-to-main. No Co-Authored-By trailers anywhere; no `feat:` conventional-commit prefixes anywhere; no human review surface anywhere.

## Activity windows

| Window | UTC range | Duration | Commits | Rate (per hour) | Note |
|---|---|---|---|---|---|
| Island 0 — template seed | 2025-01-01 00:00:00 | (instant) | 1 | n/a | Backdated to 2025-01-01; commit identity `Lovable`, not `lovable-dev[bot]` |
| Island 1 — active sprint | 2026-03-08 15:51:06 → 18:04:01 | 2h12m55s | 54 | 24.4/hour, **0.41/min** | Single Lovable session, multiple plan iterations |
| dead interval | 2026-03-08 18:04 → 2026-03-09 08:41 | 14h37m | 0 | 0 | Operator overnight pause |
| Island 2 — publish polish | 2026-03-09 08:41:46 | (instant) | 1 | n/a | One-shot publish-ready edit |
| post-publish silence | 2026-03-09 08:41 → today | **64+ days** | 0 | 0 | Permanent, as of 2026-05-12 |

Compare chess-mind-patterns Island 1 (10h28m, 171 commits, 16.3/hour) — core-unified's sprint is **50% faster per commit** but **77% shorter in total**, generating roughly **one-third the commit count**.

## Commit-subject first-word frequency (n=55 bot commits)

| Verb / opener | Count | Notes |
|---|---|---|
| `Add` | 17 | Standard Lovable feature verb |
| `Preceding` (full: `Preceding changes`) | 12 | Lovable's internal batch separator |
| `Added` | 7 | Past-tense variant — flips between `Add` and `Added` |
| `Changes` | 7 | Generic catch-all subject; no payload description |
| `Save` (full: `Save plan in Lovable`) | 4 | Plan snapshots — markers of operator iteration |
| `Update` | 3 | Includes `Update plan` (2x) and `Update site info for publish` (HEAD) |
| `Merge`, `Cleaned`, `Enhance`, `Implement`, `Port` | 1 each | One-off verbs at meaningful structural transitions |

The `Save plan in Lovable` pattern is diagnostic — it signals the operator returned to the Lovable plan editor and re-prompted, which is the visible analogue of a human pressing 'commit' inside the platform. Four such markers in 133 minutes implies roughly one plan-iteration every 33 minutes.

## Notable commits

| SHA | UTC | Subject | Significance |
|---|---|---|---|
| `b331aa1` | 2025-01-01 | `template: new_style_vite_react_shadcn_ts_testing_2026-01-08` | Template seed. Author=`Lovable`, not `lovable-dev[bot]`. Same template name as chess-mind-patterns. |
| `9d9327a` | 2026-03-08 15:51:06 | `Update plan` | First bot commit. The session opens with two consecutive `Update plan` commits (`9d9327a` and `570c809`, 2 seconds apart) — the operator likely typed and re-typed the project prompt. |
| `bc9aed0` | 2026-03-08 15:58:07 | `Save plan in Lovable` | First `Save plan` marker — 7 minutes into the session, the operator commits to a plan structure. |
| `0cc25e5` | 2026-03-08 16:02:22 | `Port Alma and related engines` | First *meaningful* code commit. The verb `Port` implies the operator pasted existing source (likely from a prior Hebrew-language notebook or a previous iteration in another repo) — Alma, Ella, Erez, Roee, Shahar are all Hebrew given names appearing as TypeScript class files. |
| `19b1628` | 2026-03-08 16:02:45 | `Implement core engine and UI` | 23 seconds after `0cc25e5` — the engine layer was committed in two parallel-feeling commits. |
| `697324a` | 2026-03-08 16:16:45 | `Add ML analysis & transparency` | Closes the 'ML' micro-arc. After this, a 11m23s gap precedes the next plan save. |
| `24d6915` | 2026-03-08 16:44:46 | `Add Research page with content` | First content-heavy commit (the Research page is 25 KB). |
| `4fc33a8` | 2026-03-08 17:01:46 | `Add animations to Research page` | Closes the animation arc. 38m56s gap follows. |
| `2228be1` | 2026-03-08 17:45:11 | `Cleaned to a 3-page plan` | **Architectural pivot.** The bot consolidates 10 pages into 3 (Index, Demo, DeepDive); the other 7 page files remain on disk but lose their routes — instant dead code. |
| `9adbcc8` | 2026-03-08 17:45:31 | `Merge DeepDive and Demo pages with 3-page plan` | Follow-up to the pivot, 20s later. |
| `0f32edc` | 2026-03-08 18:04:01 | `Added product verticals to landing` | Last commit of Island 1. Adds Mental Health AI / Autonomous Decisions / Adaptive Education sections. Removes `.lovable/plan.md` — the bot is cleaning up scratch state on the way out. |
| `ecd8b5c` | 2026-03-09 08:41:46 | `Update site info for publish` | **HEAD.** Body: `Edited UI in Lovable`. Diff: +11/-6 in `index.html`, +8/-267 in `bun.lock`. Trailer 'Edited UI in Lovable' is Lovable's marker for an in-platform UI tweak (not a chat-mode prompt). |

## Commit subjects vs. real diffs — a sampling mismatch

The 12 `Preceding changes` commits and 7 `Changes` commits (35% of all commits) carry *zero descriptive content* in their subjects. This is markedly different from chess-mind-patterns, whose bot commits at least named the feature (`Add WinPatternAnalysis UI`, `Refined game analysis`, `Add breakpoint sliders`). In core-unified, the bot evidently fell into a `Changes` / `Preceding changes` rut between plan saves — likely because the per-prompt edit was too small to merit a verb, but Lovable still emits a commit. The signature: **35% subject-noise is correlated with abandonment** in this dataset (chess-mind's noise rate was lower, and chess-mind was resumed).

## What did NOT happen

- **No build-fix commits.** Compare chess-mind-patterns `c1c2685` 'Add chess.js dependency to resolve build errors'. In core-unified, the bot never invoked an externally-named library, so no late-dependency-injection happened. The repo's package.json stayed at template defaults from start to end.
- **No language-prompt leak.** Despite the operator being Hebrew-fluent (proven by `LangContext` shipping with en/he toggle and isRTL handling), zero commit subjects are in Hebrew. The operator typed prompts in English. Contrast chess-mind-patterns where 3 of 171 commits had non-English subjects.
- **No conventional-commit prefix.** Nothing starts with `feat:` / `fix:` / `chore:`. The Co-Authored-By trailer is absent throughout.
- **No `X-Lovable-Edit-ID` trailer on most commits.** Only one commit (`0f32edc`, the second-to-last) carries the `edt-<uuid>` trailer. The rest use the platform's older 'plan save' format. This may indicate the operator was running on an earlier Lovable version that did not yet stamp every edit.

## Bucketing summary

- **Plan / meta commits**: 6 (`Update plan` x3, `Save plan in Lovable` x4 — wait, `Save plan in Lovable` shows 4 in subjects but the count above includes 3 `Update` total; the `Update site info for publish` is also `Update`)
- **Subject-noise commits** (`Preceding changes`, `Changes`): 19
- **Substantive code commits** (`Add X`, `Added X`, `Implement X`, `Port X`, `Cleaned`, `Merge`, `Enhance`): 30

Ratio of substantive to total: **30/55 = 54.5%**. Compare chess-mind-patterns approximate ratio (substantive vs. plan/noise) ~75%. core-unified's bot session was **noisier per unit of work** than chess-mind's, which is consistent with a shorter session where plan iteration is amortised over fewer real-feature commits.
