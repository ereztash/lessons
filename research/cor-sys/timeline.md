# cor-sys — Narrative Timeline

> Human-readable origin story of the cor-sys repo. Layer: Human (broader audience).
> Source: 71 commits, 16 PRs, 0 issues, root-level workflow files (CLAUDE.md, LOG.md, skill.md, index/CLAUDE.md).
> Period covered: 2026-03-15 (initial commit) -> 2026-04-09 (last merge to master).

---

## Origin (2026-03-15)

cor-sys was seeded on **2026-03-15 16:26 UTC** with a single 'Initial commit: COR-SYS consulting CRM platform' (`ed1eff0`, COR-SYS Dev). The first push was already a working Next.js 16 + Supabase application: client CRUD, a 3-block diagnostic questionnaire (ICP / Pathologies / Metrics), L1/L2 sprint routing logic based on entropy score, a plan results page, and a Decision Latency Calculator. The repo arrived as a *product*, not a starter. The commit body acknowledges Claude Sonnet 4.6 as co-author from message one — Claude is in the loop *before* GitHub is.

The identity 'COR-SYS Dev' (email `97252@cor-sys.local`) is the local Windows machine. The author 'ereztash' (`erez2812345@gmail.com`) is the same human acting through the GitHub web UI for merges and uploads. 'Claude' (`noreply@anthropic.com`) is Claude Code committing directly. 'Cursor Agent' (`cursoragent@cursor.com`) is Cursor's cloud agent. Four author classes, one human operator, three machine surfaces.

## Phase 1 — COR-SYS Dev era (Mar 15 -> Mar 26)

For the first 11 days the repo is almost exclusively COR-SYS Dev commits (Claude-paired locally, but signed as the developer). The arc is recognizable: scaffold (`ed1eff0`), add core feature surfaces (`282d1ae` org DSM diagnostic engine; `67f7d64` assessment flow + PDF reports), then **2026-03-17 19:32** — the pivotal `77fa8a8` 'feat(cbr): Phase 1 — CBR data layer, resilience formula & Edmondson PSI'. This single commit lays down: pgvector HNSW index, three CBR tables, the resilience formula `LG = 0.571*(-DDR) + 0.429*(DPSI)`, and the Edmondson 7-item PSI questionnaire with reverse-scored items. The repo's intellectual centre of gravity arrives in commit 5 of 71.

Later the same evening (Mar 17 23:22), `50f9166` adds **`CLAUDE.md` + `LOG.md` + five slash commands** in one shot — the project becomes self-aware of its own AI collaboration pattern within 36 hours of initial commit. This commit also defines GATE 0: *Claude must read LOG.md before any tool call.* The five commands `/cor-checkpoint /cor-formula /cor-migrate /cor-ship /cor-debrief` are introduced together, with `/cor-ship` explicitly noting 'no gh' — gh CLI was already known not to be installed.

On Mar 18 12:04, `ff7395d` adds `skill.md` and updates CLAUDE.md with the **GATE 0 tiered loading protocol** (~1,500 tokens mandatory, Tier 1/2 on demand). The four heuristic skills (`delta-diagnostic`, `axis-router`, `stress-probe`, `symmetry-classifier`) are named here for the first time in repo form, though they reference `index/CLAUDE.md` for full definitions.

Mar 25-26 is the **MVP stabilization checkpoint** (`d2ec021`, `185faa6`, `51d5795`): the SC dimension is added to the DSM, the ROUND::numeric anti-pattern is logged after three rounds of PostgreSQL ROUND failures, and graceful OpenAI fallback is added when embeddings are unavailable (the OpenAI account had hit a 429 quota — this rework is what motivated anti-pattern #10 and the **Pre-Build Validation Protocol** added later to LOG.md).

## Phase 2 — Multi-author phase (Mar 27 -> Mar 28)

Four PRs land Mar 27 (5, 6, 7, 8) — all 'feat/tooling-and-project-memory' branches, all merged within 8-16 seconds. The pace is feature-per-PR but commit-per-PR (PR#3 had `additions: 105, commits: 1`). PRs are not for review — they are *audit trails* of a single committer working through the GitHub web merge UI.

Mar 28 brings the **first non-COR-SYS-Dev machine voice**: PR #10 from `cursor/dsm-b64e` (Cursor Agent, 5 commits batched 15:08-15:17 UTC). Cursor uses the `feat(scope):` convention crisply — `feat(synthesis):`, `feat(viewer):`, `feat(content):`, `fix(taxonomy):`. The DSM 7x21 synthesis layer, PSG/ZSG ambiguity resolution, and IUS framework reference panel all arrive in this single 9-minute Cursor burst.

Later Mar 28 (`069aba2`, `7271fd8`) adds the valuation framework doc and the public calibration casebook — the first Hebrew strings appear in `docs/icp-and-sales.md` references and `calibration-cases.ts`. Bilingual content was always *latent* in research PDFs (the repo has `מנוע DSM ארגוני_ מחקר ופיתוח.pdf` and `בניית ספריות התערבות ארגוניות מבוססות ראיות.pdf` from the beginning), but Hebrew enters TypeScript source on this date.

## Phase 3 — ereztash strategic phase (continuous through Mar 17 -> Apr 9)

ereztash never authors a code commit. All 17 ereztash-signed commits are: PR merges (13), 'Add files via upload' (3 — `a9d1b98`, `ba9bcdc`, `3d1e014`), or one 'Update README.md' (`1d14833`). The 'Add files via upload' commits are exclusively assets: PDFs, .pptx, .docx — strategic / research material the human carries in via web UI. The split is clean: **machine authors code, human authors strategy and brand**.

All 16 PRs are merged by ereztash. Time-to-merge median is **11 seconds**. The PR is a publication ritual, not a review gate.

## Phase 4 — April refinement: USTT + Hebrew encoding war (Apr 3 -> Apr 9)

April 3 opens with PR #13 (`1ab0c54`) — the **first commit signed directly by `Claude <noreply@anthropic.com>`** (not the COR-SYS Dev local identity). USTT primitives (12 structural primitives + 5 atomic operations + 3 meta-categories) arrive as a research-derived structural root-cause layer atop the existing pathology taxonomy. Three PRs (#12, #14, #15) close *unmerged* with bodies that explicitly say 'superseded by direct master push' — Claude opened them, then ereztash bypassed them with direct master pushes. The branch lifecycle inverted.

The rest of April 3-4 is the **Hebrew encoding war**: ten consecutive Claude-signed commits (`bb3d459` -> `e18b37e`) wrestle with a cloud proxy that corrupts raw UTF-8 Hebrew bytes in JS chunks. The escalation is visible in the commit messages:

1. `bb3d459` repair mojibake (CP862-decoded Hebrew restored to UTF-8)
2. `04a4184` chore: cache invalidation comment
3. `86cf90e` debug: add console.log to trace mojibake source
4. `f53a9a2` hardcode Hebrew with unicode escapes
5. `72b3efd` remove sections IV+VII due to persistent encoding issue
6. `f40ed7a` redirect dsm-org-reference to dsm-org
7. `7719d64` test: add red canary banner
8. `5c2bf0d` force-dynamic + no-cache headers
9. `6fbb735` create /knowledge/dsm-v2 route to bypass proxy cache
10. `31c607f` convert Hebrew to unicode escapes in all .ts data files
11. `29ed2d9` restore sections, remove canary
12. `e44a570`, `d23bbba` force-dynamic on login/root pages
13. `e18b37e` **final fix**: force ASCII-only JS output via patch-package + Next.js SWC minifier patch — root cause was the cloud proxy CDN, not the code.

This 24-hour sequence is the most striking learning artifact in the repo. The escalation from `fix:` to `debug:` to `test: red canary` to a patch-package monkey-patch is preserved verbatim in the commit graph.

April 9 brings the last and largest merge: PR #16 (`182a6b3`, 1 minute 14 second TTM) folds the entire **CampaignCraft** project (Vite/React Supabase Edge Functions stack) into cor-sys as a `/growth/` route group. 40+ growth engines, 60 shadcn/ui components, 27 Radix packages, 5 growth migration files, all in one commit. CampaignCraft 'ceases to exist as a standalone project' per the PR body. cor-sys becomes the unification target for everything else the operator builds.

## Inflection points

| When | What shifted | Evidence |
|------|--------------|----------|
| 2026-03-17 23:22 | Repo becomes self-aware (CLAUDE.md + LOG.md + 5 commands) | `50f9166` |
| 2026-03-18 12:04 | GATE 0 tiered loading; 4 heuristic skills named | `ff7395d` |
| 2026-03-25 | First documented anti-pattern (ROUND::numeric) added to LOG.md | `185faa6` |
| 2026-03-28 | Multi-machine collaboration begins (Cursor Agent enters) | `49f9ada`, PR#10 |
| 2026-04-03 | First commit signed directly `Claude <noreply@anthropic.com>` | `1ab0c54` |
| 2026-04-03..04 | Hebrew encoding war — patch-package monkey-patch as resolution | `bb3d459` -> `e18b37e` |
| 2026-04-09 | CampaignCraft absorbed; cor-sys becomes unification platform | `182a6b3`, PR#16 |

## Currently-active threads (as of 2026-04-09)

- **Open branches**: `claude/add-ustt-primitives-wiqLc`, `claude/merge-repositories-fgOXE` (already merged content; branches still present)
- **Open PRs**: none open. 13 merged, 3 closed-as-superseded.
- **Open issues**: none. The repo has **zero issues recorded** in its history — neither opened nor closed.
- **OpenAI billing top-up** remains the only documented external dependency unresolved in LOG.md.

## Why this matters (for the cross-repo synthesis)

cor-sys is the *mature* template of a single-operator, multi-AI-surface workflow. Three properties define it:

1. The **LOG.md double-loop artifact** is mandatory pre-tool reading and grows with every session.
2. **PRs are notarization, not review** — 11-second median TTM, single merger, zero abandoned-as-stale.
3. **Machine boundaries are author-class-explicit** — the same human appears as 4 author identities depending on which surface is doing the typing.

The next 4 repos will be measured against these three.
