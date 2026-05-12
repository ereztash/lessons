# Pipeline — Execution Rules

> Always loaded during any pipeline run. Hard rules for the lessons agent.

## Rule 1 — Evidence or defer
No insight, observation, or pattern enters the repo without an evidence pointer (commit SHA, file path, PR#, issue#).

**Enforcement**: `insight-distiller` and `monetization-auditor` reject inputs missing evidence pointers.

## Rule 2 — Two layers, never duplicate
Claude-layer files (dense) and Human-layer files (narrative) carry COMPLEMENTARY content, never the same content twice.

**Test**: if a Human-layer paragraph and a Claude-layer bullet say the same thing, delete one.

## Rule 3 — Phase gates are non-negotiable

| Phase | Gate |
|-------|------|
| 0 | All scaffold files exist; cross-refs resolve |
| 1 | 4 `extracted-insights.md` filled; ≥20 raw observations across repos |
| 2 | `patterns-matrix.md` ≥8 rows; 4 MOCs each have ≥3 patterns |
| 3 | 5 skills + 6 commands tested on a hypothetical 6th repo |
| 4 | ≥3 playbooks shipped with target-buyer + rework-hours-saved |

Skipping a phase = failure. If a gate cannot be met, halt and ask user.

## Rule 4 — Monetization gate is 4/5
Any insight with `monetization-score: <4` is parked, not shipped.

## Rule 5 — No invented patterns
If a cross-repo pattern is hypothesized but evidence is in <2 repos, it is a candidate, not a pattern. Stays in `extracted-insights.md` as "candidate".

## Rule 6 — MEMORY.md is the single source of truth for state
Any state question (current phase, last repo, open candidates) answered by reading `MEMORY.md` first. Update via `/lesson-checkpoint`.

## Rule 7 — Append-only LOG.md
The anti-patterns table and session history in `LOG.md` are append-only. Never edit a past row.

## Rule 8 — Skill cap = 5, Command cap = 6
No new skill or command added unless 3 sessions in a row would have invoked it. Cap enforced in `LOG.md`.

## Rule 9 — Hebrew machine-files are forbidden
Machine-consumed files (skills, LOG, MEMORY, pipelines, .claude/*) are English only. User-facing files (index, profile, README) bilingual.

## Rule 10 — Context >70% → MONITOR mode
When context window passes 70%, stop new file reads. Summarize + `/clear` candidate decision.
