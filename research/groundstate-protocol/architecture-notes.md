# groundstate-protocol — Architecture Notes

> Layer: Both (machine + human). Dense; file paths, hot files, pivot points.
> Source: root listing (`get_file_contents path=''`), `src/` subtree (inferred from commit subjects + PR bodies), commit archaeology, PR body component lists.

## Top-level inventory (main @ 27ba4b5)

```
/
├── .gitignore             (0.25 KB)
├── README.md              (2.1 KB)
├── bun.lock               (147 KB)        # primary lockfile
├── bun.lockb              (245 KB)        # legacy binary lockfile (Bun)
├── components.json        (0.4 KB)        # shadcn/ui config
├── eslint.config.js       (0.75 KB)
├── index.html             (1.45 KB)
├── package-lock.json      (293 KB)        # both npm + Bun lockfiles coexist
├── package.json           (2.9 KB)
├── postcss.config.js      (0.08 KB)
├── public/                (dir)           # static assets, presumably favicon, og-image, /founder.jpg placeholder
├── src/                   (dir)           # main app code
├── tailwind.config.ts     (3.6 KB)
├── tsconfig.app.json      (0.66 KB)
├── tsconfig.json          (0.39 KB)
├── tsconfig.node.json     (0.47 KB)
├── vite.config.ts         (0.48 KB)
└── vitest.config.ts       (0.39 KB)
```

Notably **absent** (compared to cor-sys):
- No `CLAUDE.md` at root
- No `LOG.md` at root  
- No `skill.md` at root
- No `.claude/` directory
- No `index/CLAUDE.md` bilingual master entry
- No `docs/` folder (only `README.md`)
- No `.github/workflows/` mentioned in commit history
- No `supabase-migration-*.sql` files — the form uses Web3Forms (third-party API), not a self-hosted backend
- No `patches/` directory

This is a **brand surface, not a tool platform**. The agent-collaboration infrastructure that cor-sys internalized is absent here. Claude operates with **no project-memory artifact** — every Claude Code session opens cold.

## Stack inventory

- **Build**: Vite 5 (via `vite.config.ts`) — fast HMR, ESM-native
- **Framework**: React (no Next.js, no SSR — a static SPA)
- **Style**: Tailwind CSS with custom `tailwind.config.ts` extending tokens — palette tokens include `cor-opportunity`, `cor-success`, `cor-warning`, `cor-insight` (added in `7a83270` 2026-04-14)
- **Components**: shadcn/ui (via `components.json`)
- **Animation**: Framer Motion 12.x (added in `7a83270`)
- **Fonts**: Heebo (Hebrew-optimized) + Inter (Latin) — both loaded
- **Form**: react-hook-form + zod + Web3Forms submission (added in `8434927` Phase 3)
- **Testing**: Vitest (`vitest.config.ts` present; npm test runs 1/1 per PR#9 body)
- **Lockfile choice**: **both** `bun.lock` and `package-lock.json` committed — likely Lovable produces bun.lock and Claude Code uses npm; both are kept to maintain Lovable preview compatibility
- **Package manager**: presumably npm at the Claude-Code surface (per PR body 'npm run build' and 'npm test' lines), Bun at the Lovable surface
- **Routing**: `/` -> Landing, `/groundstate` -> archived GroundState grounding tool (added in `dc90fee` 2026-04-14)
- **Calendly integration**: react-calendly with PopupModal + InlineWidget (added in `8701a5b` PR#2)
- **Analytics**: GA4 (`src/lib/analytics.ts` — added in `8434927`, MEASUREMENT_ID = 'G-PLACEHOLDER')
- **Form backend**: Web3Forms (`src/lib/web3forms.ts` — added in `8434927`, ACCESS_KEY = 'PLACEHOLDER_REPLACE_ME')

## Landing page component inventory (inferred from commit subjects + PR body 'Section order' lines)

Final section order on main @ 27ba4b5 (from `af24284` body):

`Hero -> Origin -> Sequence -> FullPackage -> ClientProof -> MidPageCTA -> ProcessPreview -> Commitment -> NotForEveryone -> FAQ -> Form`

| Component (inferred path under `src/components/landing/`) | Purpose | First commit | Notes |
|---|---|---|---|
| `Hero.tsx` | Page hero with H1 + CTAs + founder mark + first-viewport testimonial | `dc90fee` (Apr 14) | Rewritten 5+ times: ConstellationVisual hero -> PrismVisual hero -> hidden-discipline copy -> buyer-side copy -> COR-SYS copy -> editorial restraint copy. The single hottest component in the repo. |
| `Origin.tsx` | Founder context section | `8434927` (May 6) | Added in COR-SYS rebrand |
| `Sequence.tsx` | 4-stage sequence cards (01-04 drop-caps) | `8434927` (May 6) | Replaces SprintTimelineSection from PR#2 era; each card prefills DiagnosticForm stage via context provider |
| `FullPackage.tsx` | Full package CTA card (4,500 NIS) with 'Recommended' badge | `8434927` (May 6) + `af24284` badge addition | Decoy-effect target plan |
| `ClientProof.tsx` | Structured testimonial (attribution, outcome, initials, optional photo) | `8434927` (May 6) | Rewritten in `f02609a` (PR#9) as magazine pull-quote |
| `MidPageCTA.tsx` | Quiet mid-page off-ramp to form | `af24284` (May 6) | Single-CTA-at-bottom hypothesis fix; positioned after ClientProof + ProcessPreview |
| `ProcessPreviewSection.tsx` | 4 timestamped beats (00:00 -> 00:17) of what happens in the first call | `af24284` (May 6) | Genesys 2026 process-transparency lift |
| `Commitment.tsx` | Guarantee section | `8434927` (May 6) | -- |
| `NotForEveryone.tsx` | Filter section ('this is not for you if...') | `8434927` (May 6) | -- |
| `FAQSection.tsx` | Accordion FAQ | `8701a5b` (PR#2) | Reordered in `c4867f5` (PR#4) per serial-position effect (price first, value-differentiator last) |
| `DiagnosticForm.tsx` | Web3Forms 2-step progressive form (step 1: name/email/phone/stage; step 2: challenge/time-windows + skip button) | `8434927` step-1 only -> `af24284` 2-step split -> `f77d0a9` isSending race fix | The form is the conversion target; receives full attention in May 6 sprint |
| `FounderMark.tsx` | Typographic initials placeholder 'א.ט' (Erez Tal-Shir) with photoSrc prop | `af24284` (May 6) | ConsultingSuccess 39-95% lift |
| `StickyMobileCTA.tsx` | Persistent bottom CTA on mobile after hero exit | `c4867f5` (PR#4) | Fitts's Law + Kivetz/Urminsky/Zheng goal gradient |
| `Header.tsx` | Top nav with brand + CTA | `dc90fee` (Apr 14) | -- |
| `LandingFooter.tsx` | Footer with links | `8701a5b` (PR#2) | -- |

### Removed components (deleted in `8434927` 2026-05-06)

- `TrustStrip.tsx` (4-item icon strip; added PR#4, removed PR#8)
- `SprintTimelineSection.tsx` (scroll-animated timeline; added PR#2, removed PR#8)
- `DeliverablesSection.tsx` (6 deliverables grid; added PR#2, removed PR#8)
- `OutcomesSection.tsx` (4 metrics; added PR#2, removed PR#8)
- `ChessSection.tsx` (B->A reverse-engineering moves; added PR#3, removed PR#8)
- `ProblemSection.tsx` (3 tracks A/B/Data; added PR#2, removed PR#8)
- `MethodologySection.tsx` (4-phase protocol; added PR#2, removed PR#8)
- `PricingSection.tsx` (founding tier price card; added PR#2, removed PR#8)
- `CalendlyProvider.tsx` (context wrapper; added PR#2, removed PR#8 in favor of Web3Forms-reveal-Calendly flow)
- `SignupForm.tsx` (initial signup form; added `dc90fee`, deleted PR#2)

The **section turnover is high**: 8 components built in PR#2 + PR#3 + PR#4 were *all* deleted in PR#8 ~3 weeks later. The COR-SYS pivot was effectively a rewrite.

### Visual / decorative components

- `ConstellationVisual.tsx` (SVG 3-orbit hero visual: psychology / engineering / business; CSS keyframe rotations `orbit-a/b/c`; added `8701a5b` PR#2; replaced by PrismVisual in PR#3)
- `PrismVisual.tsx` (replaced Constellation in PR#3; hidden on mobile, smaller monochrome on desktop in PR#9)
- `Reveal.tsx` primitives (`<Reveal>`, `<RevealGroup>`, `<RevealItem>` for Framer Motion staggered animation; respects prefers-reduced-motion; added PR#2)

## Hot files (most-touched proxy)

From commit-archaeology subject lines (cumulative editorial changes):

| File (inferred) | Approx. touches | Why hot |
|---|---|---|
| `Hero.tsx` | 7+ | Editorial battleground: Protocol Ocean Blue hero -> hidden-discipline -> buyer-side -> COR-SYS -> editorial restraint -> founder-mark addition |
| `ProblemSection.tsx` (then removed) | 4+ (Apr 14 + PR#3 + PR#4 + PR#6 + PR#7) | Tracked Hero's editorial pivots until deleted in PR#8 |
| `DiagnosticForm.tsx` | 3 (PR#8 introduce, PR#10 2-step split, `f77d0a9` Codex P1 fix) | The conversion target; receives concentrated polish |
| `Landing.tsx` | 6+ | Section reorder happens here every sprint: 10-section PR#2 -> 4-section pre-COR-SYS -> 9-section COR-SYS PR#8 -> 11-section final PR#10 |
| `tailwind.config.ts` + `index.css` | 3 (PR#1 tokens, PR#3 PrismVisual styling, PR#9 palette deepening to HSL(25 60% 39%)) | Palette is part of editorial voice |
| `src/lib/web3forms.ts` | 1 (PR#8) | Stable since introduction; ACCESS_KEY placeholder unchanged |
| `src/lib/analytics.ts` | 1 (PR#8) | Stable since introduction; MEASUREMENT_ID placeholder unchanged |
| `App.tsx` (routing) | 1 (PR#1 era) | Once-set: `/` -> Landing, `/groundstate` -> archived GroundState |

## Pivot points (where major features first appear / are removed)

| Engine / Feature | First appears | Removed / Replaced | Pivot characterization |
|---|---|---|---|
| GroundState grounding flow | `b9e8a1c` 2026-03-08 | not removed — archived at `/groundstate` | demoted from main route to archive on `dc90fee` (Apr 14) |
| Ambient Web Audio hum | `6c5229c` 2026-03-08 | unknown — possibly orphaned | last touched March 8 |
| Hebrew RTL support | `abcdda7` 2026-03-08 | present throughout | foundation feature |
| Landing.tsx (Protocol Ocean Blue, 4-section) | `dc90fee` 2026-04-14 | replaced by editorial 10-section in `8701a5b` | 4-section was a stub |
| Editorial 10-section + Calendly | `8701a5b` 2026-04-14 (PR#2) | Calendly-only CTAs replaced by Web3Forms+Calendly-reveal in `8434927` (PR#8) | Editorial pattern survived rebrand; Calendly-only flow did not |
| Constellation hero visual | `8701a5b` 2026-04-14 | replaced by Prism in `81393164` (PR#3) | 5-day lifespan |
| Prism hero visual | `81393164` 2026-04-19 | hidden on mobile, smaller monochrome on desktop in PR#9 | preserved through COR-SYS rebrand |
| Chess section (reverse-engineering moves) | `81393164` 2026-04-19 | removed in `8434927` (PR#8) | 17-day lifespan |
| Hidden-discipline frame | `fe751b3` 2026-04-19 11:36 | discarded in `1756944` 2026-04-19 12:18 | **42-minute lifespan** — fastest-discarded frame in repo |
| Buyer-side reframe ('never paid you for what you sell') | `1756944` 2026-04-19 12:18 | survives until COR-SYS rebrand | 17-day lifespan |
| Protocol Ocean Blue brand | `dc90fee` 2026-04-14 | discarded in `8434927` 2026-05-06 | 22-day lifespan |
| COR-SYS brand (Erez Tal-Shir) | `8434927` 2026-05-06 | current | -- |
| Web3Forms diagnostic form + Calendly reveal | `8434927` 2026-05-06 | current | replaces Calendly-only |
| 2-step progressive form | `af24284` 2026-05-06 | current | research-driven (HubSpot 40K-page study) |
| FounderMark | `af24284` 2026-05-06 | current | placeholder 'א.ט'; photoSrc prop ready for real portrait |
| GA4 analytics scaffolding | `8434927` 2026-05-06 | current | MEASUREMENT_ID placeholder |
| Recommended badge on FullPackage | `af24284` 2026-05-06 | current | Decoy effect target-plan marker ('הבחירה הנפוצה') |

## Editorial voice timeline (codified in commits)

The page's *voice* — separate from its code — evolved through observable phases:

| Phase | Voice signature | First commit | Example phrase |
|---|---|---|---|
| 1. Lovable boilerplate | Generic verbs | `91c0160` Mar 8 | 'Update plan', 'Save plan', 'Changes' |
| 2. Lovable descriptive | Action + thing | `b9e8a1c` Mar 8 | 'Implement GroundState main flow' |
| 3. Claude-pivot product copy | 'Protocol Ocean Blue' brand voice | `dc90fee` Apr 14 | 'Create landing page for Protocol Ocean Blue' |
| 4. Claude design-system | Token + library names | `7a83270` Apr 14 | 'Add behavioral color tokens' / 'COR SYS behavioral tokens (cor-opportunity/success/warning/insight)' |
| 5. Claude editorial | Metaphor-named patterns | `81393164` Apr 19 | 'Reframe landing around the prism metaphor' / 'reverse-engineering chess section' |
| 6. Claude research-cited | Primary literature in body | `c4867f5` Apr 19 | 'Dai/Milkman/Riis 2014; Tversky & Kahneman 1974; Levav & Fitzsimons 2006' |
| 7. Claude neurostorytelling | Scene-based copy revision | `e0543f9` Apr 19 | 'protagonist; antagonist has a face; promise lands as a scene' |
| 8. Claude identity-frame attempt | Hybrid practitioner naming | `fe751b3` Apr 19 | 'hidden-discipline flip' |
| 9. Claude buyer-side reframe | Customer-perspective restart | `1756944` Apr 19 | 'never paid you for what you sell' |
| 10. Claude editorial restraint | Conversion-strategy minimalism | `f02609a` May 6 | 'editorial restraint, single action color' / 'one color does the work of conversion' |
| 11. Claude research-driven systematic | Cited research per change | `af24284` May 6 | '11 sources: HubSpot 40K, KlientBoost, ConsultingSuccess, Genesys 2026, Digital Applied 2026, Decoy Effect' |
| 12. Claude responsive to cross-AI review | Codex-acknowledging fix language | `f77d0a9` May 6 | 'Codex review on PR #10 caught a real P1' |

This 12-step voice progression is the **single most useful editorial-evolution map** in the cohort. The voice does not regress — once research-cited language appeared in phase 6 (Apr 19), no subsequent Claude commit dropped back to phase 3 generic descriptive subjects.

## Architecture comparison to cor-sys

| Property | cor-sys | groundstate-protocol |
|---|---|---|
| Framework | Next.js 16 (SSR + App Router) | Vite + React (SPA) |
| Backend | Supabase (Postgres + RLS + pgvector HNSW) | Web3Forms (third-party form-to-email) + Calendly |
| Database | self-hosted Supabase project | none — no DB |
| Routing | `/clients`, `/assess`, `/dsm-org`, `/dsm-org-reference`, `/login`, ... (CRM app) | `/` (Landing) + `/groundstate` (archived) |
| Analytics | telemetry in `src/lib/ux-metrics.ts` | GA4 placeholder ID |
| Internationalization | bilingual HE+EN code/docs | Hebrew-only UI copy; English code |
| CLAUDE.md present | yes (1.8 KB) | **no** |
| LOG.md present | yes (7.3 KB) | **no** |
| skill.md present | yes (2.0 KB) | **no** |
| .claude/ commands | 8 slash commands | **none** |
| docs/ folder | 32 files, 270 KB | **none** (README only) |
| migrations | 25+ root-level .sql files | **none** |
| Number of commits | 71 | 40 |
| Number of PRs | 16 (13 merged, 3 closed-as-superseded) | 11 (10 merged, 1 closed reverse-PR) |
| Number of issues | 0 | 0 |
| Claude commits / total | 16/71 = 22.5% | 15/40 = 37.5% |
| Bot commits / total | 0 | 14/40 = 35.0% (lovable-dev[bot]) |
| Human commits / total | 17/71 = 23.9% (all merges + 4 uploads) | 10/40 = 25.0% (all merges) |
| Cross-AI review observed | no | **yes** (Codex on PR#10) |
| Repo role in operator's portfolio | internal CRM / engine platform / unification target | outbound brand surface / consulting front |

The two repos are **complementary halves** of the same operator's stack: cor-sys is the internal tool, groundstate-protocol is the public face. Neither is a 'fork' of the other; they share zero code but share the same designer (Claude Code) and same operator (ereztash).
