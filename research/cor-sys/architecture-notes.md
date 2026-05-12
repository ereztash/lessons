# cor-sys — Architecture Notes

> Layer: Both (machine + human). Dense; engine boundaries, file paths, hot files, pivot points.
> Source: root + `src/lib/` + `docs/` + migrations directory listings; LOG.md + CLAUDE.md + skill.md content; commit archaeology.

## Top-level inventory (master @ 526237f)

```
/
├── .github/                        # CI workflows (added 2026-03-27, 7d0c2d5)
├── .vscode/                        # IDE config (added 2026-03-17, 9840eb1)
├── CLAUDE.md           (1.8 KB)   # GATE 0 entry point
├── LOG.md              (7.3 KB)   # double-loop learning artifact (12 anti-patterns)
├── skill.md            (2.0 KB)   # 4 heuristic skills + 8 slash commands ref
├── README.md          (16.6 KB)   # public face
├── index/CLAUDE.md     (4.7 KB)   # bilingual HE+EN master entry — full pipeline routing
├── docs/               (32 .md files, ~270 KB)  # business + technical + research
├── src/                            # Next.js 16 app + lib
├── public/                         # static assets
├── scripts/                        # tooling scripts
├── patches/                        # patch-package output (added 2026-04-04, e18b37e)
├── supabase-migration-*.sql        # 18 root-level migration files
├── supabase-schema.sql             # base schema
├── seed-cbr-cases.sql              # CBR seed data (10 rows, NULL feature_vectors — anti-pattern #10)
├── package.json / package-lock.json
├── next.config.ts / postcss.config.mjs / eslint.config.mjs / vitest.config.ts / tsconfig.json
├── demo.html / dsm-org-full.html / preview.html  # standalone HTML views
├── start-corsys.bat / make-shortcut.ps1          # Windows operator convenience
├── 4 Hebrew/English research PDFs (~1.5 MB total)
├── COR-SYS-Conceptualization.pptx (392 KB)
├── DSM-Org-White-Paper.docx (19 KB)
```

**Key fact:** migrations live at root, not under `supabase/migrations/`. This is intentional — they are run manually via Supabase SQL Editor (anti-pattern #9 in LOG.md states `execute_sql=read-only, apply_migration=DDL only`, so DML migrations cannot go through MCP).

## Engine boundaries (with file paths)

| Engine | Primary file | Size | First commit | Role |
|---|---|---|---|---|
| DSM Engine (scoring) | `src/lib/dsm-engine.ts` | 41.7 KB | `282d1ae` (2026-03-15) | DR/ND/UC/SC axes -> pathology types |
| DSM Policy Engine | `src/lib/dsm-policy-engine.ts` | 39.3 KB | (post-Phase 3) | Routing rules; intervention selection |
| DSM Org Taxonomy | `src/lib/dsm-org-taxonomy.ts` | 63.3 KB | (Mar 28 batch) | 7 DSM_ORG_PARTS + 8 pathologies + USTT primitives links |
| CBR | `src/lib/cbr/` (dir) | -- | `e30542d` (2026-03-17 Phase 2) | embedding service, similarity search, recommend, calibration, trajectory |
| Resilience Formula | `src/lib/resilience-formula.ts` | 8.2 KB | `77fa8a8` (2026-03-17 Phase 1) | `LG = 0.571*(-DDR) + 0.429*(DPSI)`, eigenvalue lambda, Kahneman/Tversky 1991 + Edmondson 1999 anchors |
| Diagnostic synthesis | `src/lib/diagnostic/dsm-synthesis.ts` | -- | `00e9931` (2026-03-28, Cursor) | axis scores + clinical signals -> PathologyType[] with confidence |
| Diagnostic content index | `src/lib/diagnostic/dsm-content-index.ts` | -- | `e898d1e` (2026-03-28, Cursor) | 21 ContentLinks bridging 7x21 subtopics to pathology/playbook/axis |
| USTT Primitives | `src/lib/ustt-primitives.ts` | 12.9 KB | `1ab0c54` (2026-04-03, Claude) | 12 structural primitives + 5 atomic ops + 3 meta-categories; structural root-cause layer |
| Calibration cases | `src/lib/calibration-cases.ts` | 60.6 KB | `069aba2` (2026-03-28) | Public calibration grounding; OSINT display policy companion |
| Business Ignition | `src/lib/business-ignition.ts` | 13.2 KB | `755f19d` (2026-03-29) | MECE module; portfolio stats |
| corsys-questionnaire | `src/lib/corsys-questionnaire.ts` | 96.8 KB | `77fa8a8` (2026-03-17 Phase 1) + extended | 3-block questionnaire + Edmondson 7-item PSI |
| Service catalog | `src/lib/service-catalog.ts` | 4.9 KB | (early) | service definitions |
| UX metrics | `src/lib/ux-metrics.ts` | 4.8 KB | `f317e65` (2026-03-27) | telemetry helpers |
| Decision-spine-builder | `src/lib/decision-spine-builder.ts` | 8.2 KB | (mid) | sequencing/decision tree |
| OSINT display policy | `src/lib/osint-display-policy.ts` | 7.1 KB | `069aba2` (2026-03-28) | what calibration data is OK to render publicly |
| Growth (CampaignCraft) | `src/lib/growth/` (dir) | -- | `182a6b3` (2026-04-09) | 40+ growth engines absorbed from CampaignCraft repo |
| Agents runtime | `src/lib/agents/` (dir) | -- | `25b2adc` (2026-03-27) | Alpha/Beta/Gamma/Delta agent APIs |
| Engines | `src/lib/engines/` (dir) | -- | (later expansion) | engine umbrella incl. /growth subtree |
| API | `src/lib/api/` (dir) | -- | (early) | API client helpers |
| Actions | `src/lib/actions/` (dir) | -- | (early; expanded for CBR + clients) | Server Actions |
| Data | `src/lib/data/` (dir) | -- | (Phase 3) | data fetch wrappers |

## Migration sequence (with prerequisites noted)

Root-level SQL files, ordered by first appearance:

1. `supabase-schema.sql` (base schema, initial commit)
2. `supabase-migration-rls.sql` (initial RLS)
3. `supabase-migration-rls-authenticated.sql`
4. `supabase-migration-cbr.sql` (Phase 1, 2026-03-17) — **prereq: pgvector extension** (anti-pattern #6 in LOG.md notes this was missed in early migration; rule now: 'always include prerequisites at TOP of migration files')
5. `supabase-migration-client-assessments.sql`
6. `supabase-migration-client-diagnostics.sql`
7. `supabase-migration-client-plans.sql`
8. `migration-add-score-sc.sql` (Phase 3 stabilization, 2026-03-25) — adds SC dimension; applied manually via SQL Editor due to MCP read-only constraint (anti-pattern #9)
9. `supabase-migration-cbr-calibration.sql`
10. `supabase-migration-diagnostic-config.sql`
11. `supabase-migration-diagnostic-evidence-seed.sql`
12. `supabase-migration-agent-memory.sql` (2026-03-27, `25b2adc`)
13. `supabase-migration-agents-runtime.sql` (2026-03-27)
14. `supabase-migration-rls-authenticated-agent-tables.sql`
15. `supabase-migration-emergence-feedback.sql`
16. `supabase-migration-ux-metrics.sql`
17. `supabase-migration-client-operating-context.sql` (2026-03-29; triggered fix sequence `564df6c` -> `af6f2ba` -> `36f1354` because clients page selected the column before migration applied)
18. `supabase-migration-org-network.sql`
19. `supabase-migration-growth-20260405042823_*.sql` (CampaignCraft seed)
20. `supabase-migration-growth-20260409_001_agent_infrastructure.sql`
21. `supabase-migration-growth-20260409_002_campaign_analytics.sql`
22. `supabase-migration-growth-20260409_003_vector_search.sql`
23. `supabase-migration-growth-20260409_004_event_queue.sql`
24. `supabase-verify-operating-context.sql` (post-flight verification SQL, post `af6f2ba`)
25. `seed-cbr-cases.sql` (10 rows; feature_vectors NULL — anti-pattern #10)

The **CBR migration** is the architectural keystone — its HNSW pgvector index on `feature_vectors` is what enables semantic similarity over case base. Without OpenAI embeddings populated (still pending at last LOG.md entry: 429 quota), this index is cold-start.

## Hot files (most-touched proxy)

From commit-archaeology subject lines:

| File | Approx. touches | Why hot |
|---|---|---|
| `LOG.md` | 4+ (50f9166, 185faa6, 7271fd8, plus implicit refresh) | grows monotonically; double-loop learning artifact |
| `dsm-org-taxonomy.ts` (63 KB) | 5+ (bb3d459, 04a4184, 31c607f, Cursor's cee079e, Mar 28 expansions) | central taxonomy; Hebrew encoding battleground |
| `DsmOrgViewer.tsx` (under `src/components/` — inferred) | 7+ (86cf90e, f53a9a2, 72b3efd, 7719d64, 29ed2d9, Cursor's e319f61, 49f9ada) | the visible UI of taxonomy; site of canary banner / mojibake regression |
| `CLAUDE.md` + `index/CLAUDE.md` + `skill.md` | 3+ (50f9166, ff7395d, later refinements) | agent entry-point cluster |
| `corsys-questionnaire.ts` (96.8 KB) | 3+ (77fa8a8, f11cb35 SOTA upgrade, later PSI extension) | largest src file; questionnaire surface |
| `next.config.ts` + `patches/` | 2 (e18b37e, e44a570) | resolution of Hebrew encoding via SWC minifier patch |
| `README.md` | 2 (ce0ab9f rewrite, 1d14833 update) | rewrites |

## Pivot points (where major engines first appear / last touched)

| Engine | First appears | Last significant touch | Pivot characterization |
|---|---|---|---|
| Initial DSM | `282d1ae` 2026-03-15 | extended in `1ab0c54` (USTT add) | additive only; never replaced |
| CBR | `77fa8a8` 2026-03-17 (Phase 1) | `f11cb35` 2026-03-27 (SOTA selection) | three-phase build-out, then stable |
| Resilience Formula | `77fa8a8` 2026-03-17 | stable | never modified after introduction |
| Edmondson PSI | `77fa8a8` 2026-03-17 (reverse-scored items 1/3/5) | `f11cb35` 2026-03-27 (PSI 7-item formal addition) | activated late |
| DSM Policy Engine | (post-Phase 3) | stable | -- |
| ZSG/PSG split | `cee079e` 2026-03-28 (Cursor) | -- | one-shot ambiguity resolution |
| USTT Primitives | `1ab0c54` 2026-04-03 (Claude) | `bb3d459` (integrated into taxonomy) | added late as structural layer beneath pathologies |
| Growth (absorbed) | `182a6b3` 2026-04-09 | -- | merged from external repo CampaignCraft |
| middleware -> proxy rename | `96dbefb` 2026-03-28 (Next.js 16 convention) | docs follow-up `0c59c18` | one-day forced rename due to framework upgrade |

## Documentation themes (docs/ — 32 files)

Grouped by purpose:

- **Architecture (3):** `architecture-proposed-structure.md`, `architecture-review.md`, `setup-supabase-production.md`
- **DSM theory/method (4):** `dsm-organizational-manual.md`, `dsm-mece-gap-analysis.md`, `research-prompt-dsm-mece-gaps.md`, `research-prompt-questionnaire-design.md`
- **CBR (2):** `cbr-research-synthesis.md`, `cbr-execution-roadmap.md`
- **Business / sales (8):** `business-framework.md`, `business-ignition-mece.md`, `value-proposition.md`, `valuation-framework.md`, `icp-and-sales.md`, `competitive-positioning.md`, `goals-and-kpis.md`, `strategic-plan.md`
- **Roadmap / tasks (3):** `product-roadmap.md`, `task-table.md`, `roadmap-to-deploy.md`
- **Quality/audit (4):** `code-quality-audit.md`, `cursor-errors-audit.md`, `manual-smoke-checklist.md`, `security-rls.md`
- **Calibration / casebook (2):** `calibration-casebook.md`, `product-decisions.md`
- **Design / governance (3):** `color-governance-mece.md`, `spec-color-semantics-governance.md`, `synthesis-html-app.md`
- **Research prompts (3):** `prompt-48-questions.md`, `research-prompt-48-questions-complete.md` (20.8 KB), `research-prompt-dsm-mece-gaps.md`

This distribution makes the **business + sales axis** the largest single docs cluster (8 files). cor-sys is documented as a *product the consultancy sells*, not just a tool — which explains the calibration casebook + valuation framework + ICP companion artifacts that have no direct code counterpart.

## Two-layer documentation architecture (cor-sys-native)

This is the pattern the `ereztash/lessons` repo is replicating:

```
Layer 0 (immutable / mandatory)            Layer 1 (mutable / accumulating)
--------------------------------            -------------------------------
CLAUDE.md                  (1.8 KB)  ---->  LOG.md                  (7.3 KB)
  GATE 0 reading order                        - Environment facts table
  Quick rules                                 - Pre-Build Validation Protocol
  Architecture summary                        - 12 anti-patterns (numbered)
skill.md                   (2.0 KB)           - Codebase patterns
  4 heuristic skills                          - Session history (chronological)
  8 slash commands
index/CLAUDE.md            (4.7 KB)
  bilingual HE+EN master entry
  thinking-style routing -> 13 modes
  pipeline + Board + MOC index
```

The **load order is enforced** (LOG.md before any tool call). The **tier system limits cost** (~1500 tokens mandatory, Tier 1/2 on demand). The **skill.md cascades** explicitly (delta-diagnostic stage 4 -> symmetry-classifier; stress-probe -> delta-diagnostic feed).

## Cross-references for cross-repo synthesis

- cor-sys's anti-pattern #4 ('used `gh pr create` — not installed') -> any other repo using `gh` is doing something cor-sys learned to stop doing.
- cor-sys's anti-pattern #9 (Supabase MCP DML constraint) -> any repo with auto-applied DML migrations through MCP would be a contradictory data point worth investigating.
- cor-sys's Pre-Build Validation Protocol (curl OpenAI / SELECT Supabase / `npm run build` before any new Phase) -> a candidate workflow primitive to extract.
- `index/CLAUDE.md` bilingual format -> potential extraction for any repo serving a non-English operator.
