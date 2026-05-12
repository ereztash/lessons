# cor-sys — PR Pattern Analysis

> Layer: Claude. Source: list_pull_requests (state=all), 16 PRs (#1..#16).
> All times UTC. TTM = `merged_at - created_at` for merged PRs; for closed-unmerged PRs the lifetime is `closed_at - created_at`.

## Per-PR summary table

| PR# | Title (truncated) | Source branch | Author | Created (UTC) | State | TTM | Body shape | Notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Feat/tooling and project memory | feat/tooling-and-project-memory | ereztash | 2026-03-17 19:37 | merged | 10s | empty | First PR; placeholder body |
| 2 | Feat/tooling and project memory | feat/tooling-and-project-memory | ereztash | 2026-03-17 22:59 | merged | 52s | empty | Same branch re-merge |
| 3 | docs: add CLAUDE.md entry point | feat/tooling-and-project-memory | ereztash | 2026-03-17 23:23 | merged | 9s | bulleted (`-` list, ~600 char) | The self-aware moment; describes both CLAUDE.md/LOG.md AND 5 slash commands (gitignored) |
| 4 | merge: CBR engine, DSM Phase 3, tooling | feat/tooling-and-project-memory | ereztash | 2026-03-26 06:17 | merged | 21s | single-sentence summary | Bundle commit |
| 5 | feat(cbr): SOTA intervention selection | feat/tooling-and-project-memory | ereztash | 2026-03-27 11:36 | merged | 8s | 2-sentence + 'Made-with: Cursor' tag | Cursor-authored body |
| 6 | feat(agents): autopoietic runtime | feat/tooling-and-project-memory | ereztash | 2026-03-27 15:59 | merged | 8s | 1-paragraph + 'Made-with: Cursor' | Cursor-authored |
| 7 | feat(ux): user-mode language layer | feat/tooling-and-project-memory | ereztash | 2026-03-27 17:46 | merged | 16s | 1-paragraph + 'Made-with: Cursor' | Cursor-authored; ModeBlurb pattern |
| 8 | Feat/tooling and project memory | feat/tooling-and-project-memory | ereztash | 2026-03-27 22:32 | merged | 15s | empty | Third empty-body merge of same branch |
| 9 | Feat/tooling and project memory | feat/tooling-and-project-memory | ereztash | 2026-03-28 11:44 | merged | 8s | empty | Fourth empty-body merge |
| 10 | feat: DSM model synthesis (ZSG/PSG) | cursor/dsm-b64e | ereztash | 2026-03-28 15:18 | merged | 4 min 3s | **rich Cursor template** (~2.6 KB): Summary / Changes / Tests / Architecture diagram + Cursor open-in buttons | Longest body; longest TTM among merged |
| 11 | Cursor: Apply local changes for cloud agent | cursor/cloud-agent-1774710109623-9fhjd | ereztash | 2026-03-28 15:22 | merged | 11s | empty | Cursor handoff scaffolding |
| 12 | feat: integrate USTT primitives into DSM-Org | claude/add-ustt-primitives-wiqLc | ereztash | 2026-04-03 10:57 | **closed (NOT merged)** | 5h 38m closed | 2-line + 'superseded by direct master push' | Claude opened; bypassed |
| 13 | Add USTT primitives module | claude/ustt-primitives-implementation-VAsUq | ereztash | 2026-04-03 11:17 | merged | 9s | 2-sentence summary + Claude session link | USTT module shipped |
| 14 | Claude/add ustt primitives wiq lc | claude/add-ustt-primitives-wiqLc | ereztash | 2026-04-03 12:36 | **closed (NOT merged)** | 9 min closed | 'superseded by direct master push' | Auto-opened by Claude Code; bypassed |
| 15 | Claude/add ustt primitives wiq lc | claude/add-ustt-primitives-wiqLc | ereztash | 2026-04-03 12:47 | **closed (NOT merged)** | 7 min 25s closed | empty | Same branch; bypassed |
| 16 | feat: merge CampaignCraft into COR-SYS | claude/merge-repositories-fgOXE | ereztash | 2026-04-09 15:17 | merged | 1 min 14s | **rich Claude template** (~1.4 KB): bullet-list of key changes + Claude session link | Largest absorption commit |

## Branch-naming statistics

| Branch prefix | Count | % | Period |
|---|---|---|---|
| `feat/*` | 9 | 56.2% | Mar 17 — Mar 28 (PRs 1-9) |
| `claude/*` | 5 | 31.2% | Apr 3 — Apr 9 (PRs 12-16) |
| `cursor/*` | 2 | 12.5% | Mar 28 (PRs 10, 11) |

Observations:
- The `feat/tooling-and-project-memory` branch was reused for **9 consecutive PRs (#1-#9)** before being abandoned. It is the spine of the COR-SYS Dev era.
- `claude/*` branches are **auto-named by Claude Code** (suffix `-wiqLc`, `-VAsUq`, `-fgOXE` are random session-style slugs). Three different claude/* branches were created Apr 3 alone — one merged (#13), two led to closed-unmerged PRs (#12, #14, #15 — three closure events on the same branch).
- `cursor/*` branches are auto-named by Cursor cloud agent (`dsm-b64e`, `cloud-agent-1774710109623-9fhjd`). They are scratch identifiers — single-use.

## Time-to-merge distribution

13 merged PRs:

| Bucket | Count | PRs |
|---|---|---|
| < 15 seconds | 8 | #1, #3, #5, #6, #9, #11, #13, #4 |
| 15-60 seconds | 3 | #2, #7, #8 |
| 1-5 minutes | 2 | #10 (4m), #16 (1m 14s) |
| > 5 minutes | 0 | — |

- **Median TTM: 11 seconds.**
- **Mean TTM: 37 seconds.**
- **Min: 8 seconds.** Max: 4 minutes 3 seconds (#10).
- The only two PRs > 60s TTM (#10, #16) are also the **two longest bodies**. Both contain full architectural changes (#10 DSM synthesis; #16 CampaignCraft absorption). Hypothesis: long-body PRs trigger a brief human read pass; short-body PRs are instant.

## Closed-unmerged PRs (PRs #12, #14, #15)

All three are on the same `claude/add-ustt-primitives-wiqLc` branch, opened on 2026-04-03. PRs #12 and #14 carry explicit body text: 'Closed — merged directly to master / superseded by direct master push. All changes already on master in commit bb3d459.' PR #15 has no body.

Mechanism: Claude Code (running with PR-auto-open enabled) opened multiple PRs from the same auto-named branch during the Hebrew encoding war. ereztash bypassed them by pushing directly to master (commit `bb3d459`) and then closing the PRs without merge. The branch remained 'behind' master after the push, so subsequent auto-PRs from the same branch HEAD also could not fast-forward.

This is the **branch-PR desynchronization anti-pattern** — three failed PRs on the same branch in 2 hours.

## Body-shape patterns

4 body shapes observable:

| Shape | Count | Where |
|---|---|---|
| Empty | 6 | PRs #1, #2, #8, #9, #11, #15 — `feat/tooling` placeholder merges and Cursor scaffolding |
| Short summary (1-3 sentences, no template) | 3 | PRs #4, #12, #14 — bridging commits + supersession notices |
| Bulleted list (\~600 char) | 1 | PR #3 — first self-aware PR; carries the new-tooling description |
| 'Made-with: Cursor' tag + 1-paragraph | 3 | PRs #5, #6, #7 — Cursor-authored bodies in the COR-SYS Dev era; consistent format |
| Rich Claude template (\~1-3 KB: Summary / Changes / Architecture / session-link) | 2 | PRs #10 (Cursor), #16 (Claude) — also the longest-TTM merges |
| Claude session link (`https://claude.ai/code/session_*`) | 5 | PRs #12, #13, #14, #15, #16 — all Apr 3+ |

The **'session_XXX' link suffix** is a Claude Code signature appearing in all April Claude-authored PR bodies. The `Made-with: Cursor` tag is the Cursor analogue in March bodies. Together these are author-class-revealing footers — useful for cross-repo author attribution.

## Notable PRs (called out by characteristic)

- **PR #3 — the self-aware PR.** Introduces CLAUDE.md/LOG.md/skill.md and the 5 slash commands in 105 LOC across 2 files. 9-second TTM. Most-important infrastructure shift in the repo.
- **PR #10 — the longest body.** Cursor Agent's DSM synthesis layer: full Markdown architecture diagram, 15 unit tests, 125 tests passing, ZSG/PSG ambiguity resolution. Only PR with `## Tests` and `## Architecture` sections.
- **PR #13 — the first Claude-direct PR merged.** USTT primitives. 9-second TTM. Demonstrates Claude Code's `/cor-ship` workflow is functional.
- **PR #16 — the cross-repo absorption.** CampaignCraft (entire separate Vite/React project) merged into cor-sys as a `/growth/` route group. 1 minute 14 seconds TTM. The body explicitly states 'CampaignCraft ceases to exist as a standalone project.' Test coverage noted: 688/706 passing, 44/48 test files.
- **PRs #12, #14, #15 — the three abandoned PRs.** All on `claude/add-ustt-primitives-wiqLc`. Bypassed by direct master push. Net waste: 3 PR notifications + 3 branch entries; cost: trivial. But: the only place in the repo where the PR workflow degrades.

## Inferred rules (for cross-repo synthesis)

1. **PRs are notarization, not review.** Single merger (ereztash), 11s median TTM, zero abandoned-as-stale-from-disagreement. The PR exists to leave an audit trail visible on GitHub, not to gate merges.
2. **Branch names reveal the typing surface.** `feat/*` = developer-named (intentional, reused). `claude/*` = Claude Code auto-named (session-slug). `cursor/*` = Cursor cloud agent auto-named (UUID-ish). Author-class is inferable from branch alone in 16/16 cases.
3. **Long PR bodies correlate with long TTMs but only weakly.** The two > 1-min TTMs are the two longest bodies, but most rich-template Claude bodies (e.g., #13) still merge in 9s. The strong predictor is *risk of breakage* (#10 = 5 new files + 15 tests; #16 = 80+ new files): a heavier change buys a 1-4 min human pause.
4. **Footer signatures identify the author surface.** `https://claude.ai/code/session_*` = Claude Code. `Made-with: Cursor` + `<a href="https://cursor.com/agents/...">` = Cursor cloud. Absence of footer + bullet body = human-edited via web UI.
