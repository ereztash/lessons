# cor-sys — Commit Archaeology

> Layer: Claude (machine-consumed). Schema-strict, tables, no narrative.
> Source: full `list_commits` paginate (71 entries, master branch).
> SHA = short 7-char. Author class normalized to {COR-SYS Dev, Claude, ereztash, Cursor Agent}.

## Schema

```
Date (UTC) | SHA | Author class | Prefix | Subject | File-set hint
```

Prefix taken from message head. `--` = no conventional prefix. `Merge` = GitHub merge commit.

## Author class statistics

| Author class | Email pattern | Count | % | First seen | Last seen |
|---|---|---|---|---|---|
| COR-SYS Dev | `97252@cor-sys.local` + `Erez2812345@gmail.com` | 33 | 46.5% | 2026-03-15 | 2026-03-29 |
| ereztash | `erez2812345@gmail.com` | 17 | 23.9% | 2026-03-17 | 2026-04-09 |
| Claude | `noreply@anthropic.com` | 16 | 22.5% | 2026-04-03 | 2026-04-09 |
| Cursor Agent | `cursoragent@cursor.com` | 5 | 7.0% | 2026-03-28 | 2026-03-28 |
| **Total** | | **71** | 100% | | |

Key transition: **Apr 3 is the boundary** — before Apr 3 only one Claude-direct commit exists (none, in fact: prior Claude work is co-authored under COR-SYS Dev). After Apr 3, COR-SYS Dev commits stop appearing entirely. Identity convention shifted mid-project.

## Prefix-usage table

| Prefix | Count | % | Stabilized | Notes |
|---|---|---|---|---|
| `feat` / `feat(scope)` | 19 | 26.8% | from commit #2 (282d1ae) | Most-used; `feat(scope)` adopted by Cursor commits |
| `fix` / `fix(scope)` | 17 | 23.9% | from commit #25 onward | All concentrated post-Mar 25 |
| Merge | 14 | 19.7% | from PR#1 (Mar 17) | GitHub-generated; one per merged PR |
| `docs` | 5 | 7.0% | from `ce0ab9f` (Mar 18) | LOG.md updates + README rewrites |
| `chore` / `chore(scope)` | 5 | 7.0% | from `9840eb1` (Mar 17) | Tooling, .gitignore, CI config |
| `Add files via upload` | 3 | 4.2% | -- | ereztash-only; GitHub web UI uploads (PDFs/PPTX) |
| `Add` (other) | 2 | 2.8% | -- | unprefixed Adds; transitional |
| `Update` | 1 | 1.4% | -- | README touch-up via web |
| `Initial commit` | 1 | 1.4% | -- | seed (`ed1eff0`) |
| `security` | 1 | 1.4% | `7b7a778` | One-off `.gitignore` of `.mcp.json` |
| `test` | 1 | 1.4% | `7719d64` | Single 'red canary' diagnostic commit during Hebrew war |
| `debug` | 1 | 1.4% | `86cf90e` | Single console.log trace during Hebrew war |
| `Cursor:` | 1 | 1.4% | `86a72c5` | Cursor's own merge-style commit |

**Convention stabilization:** `feat(scope):` and `fix(scope):` are the dominant pair from Mar 27 onward. Pre-Mar 17, prefixes are inconsistent (`Initial`, `Add files`, raw verbs). By the time PR#5 lands on Mar 27, every commit on the active branch carries a `<prefix>(scope):` head. This stabilization coincides with adoption of `/cor-ship` slash command (introduced Mar 17 in PR#3).

## Date clusters

| Window | Commits | Dominant author | Activity character |
|---|---|---|---|
| 2026-03-15..16 | 3 | COR-SYS Dev | Scaffold (full app, assessment, DSM engine) |
| 2026-03-17..18 | 9 | COR-SYS Dev + ereztash merges | CBR Phase 1/2 + CLAUDE.md + LOG.md introduction |
| 2026-03-25..26 | 4 | COR-SYS Dev | MVP stabilization; first anti-pattern logged |
| 2026-03-27..29 | 16 | COR-SYS Dev + Cursor (Mar 28) | Burst week: agents, CBR, valuation, business ignition |
| 2026-03-30..04-02 | 0 | — | Silent window |
| 2026-04-03..04 | 14 | Claude (direct) | USTT primitives + 10-commit Hebrew encoding war |
| 2026-04-09 | 2 | Claude + ereztash merge | CampaignCraft absorption (PR#16) |

## Significant commits (selected)

| Date | SHA | Author | Prefix | Subject | File-set hint |
|---|---|---|---|---|---|
| 2026-03-15 16:26 | `ed1eff0` | COR-SYS Dev | -- | Initial commit: COR-SYS consulting CRM platform | full Next.js scaffold + Supabase RLS |
| 2026-03-15 17:39 | `282d1ae` | COR-SYS Dev | feat | add organizational DSM diagnostic engine | first `src/lib/dsm-engine.ts` |
| 2026-03-16 00:08 | `67f7d64` | COR-SYS Dev | feat | assessment flow, auth, diagnostics UI, PDF reports | assess routes + research docs |
| 2026-03-17 15:29 | `4c86bbf` | COR-SYS Dev | feat | full COR-SYS platform: diagnostics, assessments, PDF, docs | broad |
| 2026-03-17 16:41 | `9840eb1` | COR-SYS Dev | chore | VSCode config, project memory index, .gitignore | tooling |
| 2026-03-17 19:32 | `77fa8a8` | COR-SYS Dev | feat(cbr) | Phase 1: CBR data layer, resilience formula, Edmondson PSI | migrations + resilience-formula + corsys-questionnaire |
| 2026-03-17 19:43 | `7b7a778` | COR-SYS Dev | security | add .mcp.json to .gitignore (contains secrets) | .gitignore |
| 2026-03-17 22:59 | `e30542d` | COR-SYS Dev | feat(cbr) | Phase 2: embedding service, similarity search, CBR API | src/lib/cbr/ |
| 2026-03-17 23:22 | `50f9166` | COR-SYS Dev | docs | **add CLAUDE.md entry point, LOG.md double-loop learning** | CLAUDE.md, LOG.md, .claude/commands/ |
| 2026-03-18 12:04 | `ff7395d` | COR-SYS Dev | chore(tooling) | **add skill.md, GATE 0 token management protocol** | skill.md, CLAUDE.md |
| 2026-03-18 12:11 | `ce0ab9f` | COR-SYS Dev | docs | rewrite README — DSM engine, CBR pipeline, resilience formula | README.md |
| 2026-03-18 12:55 | `7798092` | COR-SYS Dev | feat(cbr) | Phase 3: Intelligence Layer, UI wiring, build fix | recommend.ts, calibration.ts, trajectory.ts |
| 2026-03-25 11:11 | `d2ec021` | COR-SYS Dev | feat(mvp) | stabilize Phase 3: SC dimension, CBR engine, UI polish | score_sc + DSM SC |
| 2026-03-25 11:12 | `185faa6` | COR-SYS Dev | docs(log) | session 2026-03-25: MVP stabilization + ROUND::numeric anti-pattern | LOG.md |
| 2026-03-25 11:17 | `51d5795` | COR-SYS Dev | fix(cbr) | graceful fallback when OpenAI embedding unavailable | src/lib/cbr/* |
| 2026-03-27 11:14 | `f11cb35` | COR-SYS Dev | feat(cbr) | SOTA intervention selection + UX reliability upgrades | PSI 7-item, CBR calibration |
| 2026-03-27 14:40 | `25b2adc` | COR-SYS Dev | feat(agents) | autopoietic runtime, cached agent services, operator UX | agents-runtime SQL + agents lib |
| 2026-03-27 17:22 | `823cffa` | COR-SYS Dev | feat(ux) | user-mode language layer across all core flows | ModeBlurb pattern |
| 2026-03-27 22:31 | `7d0c2d5` | COR-SYS Dev | chore(ci) | GitHub Actions workflow for build and test | .github/workflows |
| 2026-03-27 22:32 | `f317e65` | COR-SYS Dev | feat(ui) | loading states, a11y primitives, nav polish, ux telemetry | UI primitives |
| 2026-03-28 09:36 | `069aba2` | COR-SYS Dev | -- | Add valuation framework doc and public calibration case grounding | calibration-cases.ts + docs/valuation-framework.md |
| 2026-03-28 09:36 | `7271fd8` | COR-SYS Dev | docs | expand LOG entry for 2026-03-28 calibration commit | LOG.md |
| 2026-03-28 11:43 | `215139b` | COR-SYS Dev | fix(auth) | attach Supabase session cookies on OAuth callback redirect | src/proxy.ts |
| 2026-03-28 11:51 | `96dbefb` | COR-SYS Dev | chore(next) | rename middleware to proxy (Next.js 16 convention) | src/proxy.ts |
| 2026-03-28 11:54 | `0c59c18` | COR-SYS Dev | docs | reference src/proxy.ts instead of deprecated middleware | docs |
| 2026-03-28 15:01 | `86a72c5` | COR-SYS Dev | Cursor: | Apply local changes for cloud agent | git scaffolding for Cursor handoff |
| 2026-03-28 15:08 | `cee079e` | Cursor Agent | fix(taxonomy) | resolve ZSG ambiguity — add PSG code | dsm-org-taxonomy.ts |
| 2026-03-28 15:10 | `00e9931` | Cursor Agent | feat(synthesis) | dsm-synthesis mapping layer with 15 tests | src/lib/diagnostic/dsm-synthesis.ts |
| 2026-03-28 15:12 | `e898d1e` | Cursor Agent | feat(content) | dsm-content-index linking 7x21 subtopics to pathology/playbook/axis | src/lib/diagnostic/dsm-content-index.ts |
| 2026-03-28 15:14 | `e319f61` | Cursor Agent | feat(viewer) | sequencing rules + 7x21 DSM overview in DsmOrgViewer | DsmOrgViewer.tsx |
| 2026-03-28 15:17 | `49f9ada` | Cursor Agent | feat(viewer) | IUS framework reference panel with AIM/IAM/FIM/MVC | DsmOrgViewer.tsx |
| 2026-03-28 16:51 | `2b9fb68` | COR-SYS Dev | feat(diagnostic) | unified treatment pipeline, ZSG split, plan snapshot | diagnostic/ + actions/ |
| 2026-03-29 13:38 | `755f19d` | COR-SYS Dev | feat | operating context for OMS, portfolio stats, business ignition module | client-context-labels + business-ignition |
| 2026-03-29 14:48 | `564df6c` | COR-SYS Dev | fix | avoid selecting operating_context before Supabase migration | actions |
| 2026-03-29 14:57 | `af6f2ba` | COR-SYS Dev | fix | resilient client save for operating_context + safer migration | actions + migration |
| 2026-03-29 16:25 | `36f1354` | COR-SYS Dev | fix | force-dynamic clients list + broader revalidatePath after client save | clients page |
| 2026-04-03 09:20 | `1ab0c54` | **Claude** | -- | **Add USTT primitives module — structural root-cause layer** | src/lib/ustt-primitives.ts (NEW) |
| 2026-04-03 12:27 | `bb3d459` | Claude | fix | repair Hebrew encoding + integrate USTT primitives in DSM-Org taxonomy | dsm-org-taxonomy.ts |
| 2026-04-03 16:15 | `04a4184` | Claude | chore | cache invalidation comment to dsm-org-taxonomy | dsm-org-taxonomy.ts |
| 2026-04-03 20:19 | `86cf90e` | Claude | debug | console.log to trace mojibake source in DsmOrgViewer | DsmOrgViewer.tsx |
| 2026-04-03 20:22 | `f53a9a2` | Claude | fix | hardcode Hebrew with unicode escapes in DsmOrgViewer IV+VII | DsmOrgViewer.tsx |
| 2026-04-03 20:30 | `72b3efd` | Claude | fix | remove sections IV+VII from DsmOrgViewer (persistent encoding) | DsmOrgViewer.tsx |
| 2026-04-03 20:54 | `f40ed7a` | Claude | fix | replace dsm-org-reference with redirect to dsm-org | route file |
| 2026-04-03 21:26 | `7719d64` | Claude | test | add red canary banner to verify browser loads fresh code | DsmOrgViewer.tsx |
| 2026-04-03 21:38 | `5c2bf0d` | Claude | fix | force-dynamic + no-cache headers to bust proxy/ISR caching | route handlers |
| 2026-04-03 21:48 | `6fbb735` | Claude | fix | create /knowledge/dsm-v2 route to bypass proxy cache | new route |
| 2026-04-03 22:19 | `31c607f` | Claude | fix | **convert Hebrew to unicode escapes in all .ts data files** | dsm-org-taxonomy, action-plan, pathology-kb |
| 2026-04-04 14:06 | `29ed2d9` | Claude | feat | restore sections IV+VII to DsmOrgViewer, remove canary banner | DsmOrgViewer.tsx |
| 2026-04-04 14:12 | `e44a570` | Claude | fix | force-dynamic to login page (build without Supabase env) | login page |
| 2026-04-04 14:39 | `d23bbba` | Claude | fix | force-dynamic to root page to prevent prerender failure | root page |
| 2026-04-04 15:18 | `e18b37e` | Claude | fix | **force ASCII-only JS output to prevent Hebrew encoding corruption** | next.config patch + patches/ |
| 2026-04-09 15:13 | `182a6b3` | Claude | feat | **merge CampaignCraft into COR-SYS as unified growth module** | 40+ growth engines + 60 shadcn + 12 pages |

## Transition points (numbered)

1. **T1 — Project becomes self-documenting** (2026-03-17 23:22, `50f9166`): CLAUDE.md + LOG.md + 5 slash commands in single commit. Mandatory pre-tool reading is enforced.
2. **T2 — Token-management protocol formalized** (2026-03-18 12:04, `ff7395d`): GATE 0 tiered loading (~1500 tok mandatory). 4 heuristic skills named.
3. **T3 — First anti-pattern logged** (2026-03-25 11:12, `185faa6`): the ROUND::numeric PostgreSQL trap. LOG.md transitions from static reference to growing artifact.
4. **T4 — Multi-machine collaboration** (2026-03-28 15:08-15:17, `cee079e`..`49f9ada`): Cursor Agent enters with 5 commits in 9 minutes, all `feat(scope):` formatted.
5. **T5 — Identity convention flips** (2026-04-03 09:20, `1ab0c54`): first commit signed `Claude <noreply@anthropic.com>` directly, not co-authored under COR-SYS Dev.
6. **T6 — Hebrew encoding war + patch-package resolution** (2026-04-03 12:27 -> 2026-04-04 15:18, `bb3d459`..`e18b37e`): 13 commits escalating across CDN/proxy/SWC minifier layers.
7. **T7 — Repo absorbs adjacent product** (2026-04-09 15:13, `182a6b3`): CampaignCraft merged in one commit; cor-sys becomes the unification platform.
