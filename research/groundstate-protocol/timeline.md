# groundstate-protocol — Narrative Timeline

> Human-readable origin story of the groundstate-protocol repo. Layer: Human (broader audience).
> Source: 40 commits, 10 merged + 0 open PRs, 0 issues, Vite + React + shadcn/ui stack.
> Period covered: 2025-01-01 (Lovable template) -> 2026-05-06 (last merge to main).

---

## Origin (2025-01-01 -> 2026-03-08)

The repo's first commit is dated **2025-01-01 00:00 UTC** with the message `template: new_style_vite_react_shadcn_ts_testing_2026-01-08` (author `Lovable <noreply@lovable.dev>`, SHA `b331aa1`). The date is a Lovable artefact — the template was *created* on 2026-01-08 (the suffix says so), but Lovable stamps its template commits with a fixed `2025-01-01T00:00:00Z` timestamp. This is the only Lovable-as-author commit in the entire 40-commit history.

From **2026-03-08 06:27 -> 06:39** (12 minutes), the gpt-engineer-app[bot] (Lovable's CI committer, formally `lovable-dev[bot]`) pushes the first real product: eight commits scaffolding the **GroundState protocol** — a 4-state grounding flow (deconstruction -> grounding -> resolution, with crisis safety brake), Web Audio ambient hum, breathing visuals, and Hebrew RTL support. Commits are terse and bot-shaped: `Update plan`, `Save plan in Lovable`, `Changes`, `Implement GroundState main flow`, `Add ambient sound toggle`, `Add ambient sound hook`, `Add ambient sound toggle` (duplicate), `Hebrew RTL support and crisis UI`. Each commit body — when populated — carries an `X-Lovable-Edit-ID: edt-...` trailer and is co-authored to ereztash through a Lovable proxy address.

This is **Phase 0**: a Lovable-only repo. Claude is absent. Human commits are absent. The project name is GroundState — a mental-health-adjacent grounding tool, not a consulting landing page.

## Phase 1 — Claude enters (2026-04-14)

A **five-week silence** follows the March 8 burst. The next commit is on **2026-04-14 13:25** — `dc90fee` 'Create landing page for Protocol Ocean Blue' by **`Claude <noreply@anthropic.com>`**. The pivot is total:

- The repo *adds* a Landing.tsx page with 4 sections (Hero / Problem / Sprint 30 / Signup).
- It *preserves* the original GroundState flow at the `/groundstate` route — the grounding tool is now an archive, not the main product.
- It introduces **'Protocol Ocean Blue'** as a brand. The repo is being repositioned from a public-good grounding tool into a marketing site for the operator's consulting offer.
- The commit body carries `https://claude.ai/code/session_01G5EduLx35go4EqFRjcKQ72` — the first Claude Code session signature in the repo.

Four hours later (2026-04-14 17:33), `7a83270` lands the **design system foundation**: COR SYS behavioral tokens (`cor-opportunity`, `cor-success`, `cor-warning`, `cor-insight`), motion duration/easing tokens, reduced-motion media query, Heebo Hebrew font, Framer Motion 12.x. This is PR#1 — the first Claude/* branch in the repo (`claude/optimize-landing-page-eEgZ4`). TTM: 8 minutes 49 seconds.

Later that evening (2026-04-14 19:23), `8701a5b` rebuilds the 4-section landing into a **10-section editorial scroll experience** with Calendly integration replacing the simulated form. Methodology, Deliverables bento, Outcomes metrics, Pricing card, FAQ, dedicated inline-booking section all arrive. The constellation visual (three orbits: psychology / engineering / business) shows up in the hero. This is PR#2 — first appearance of the editorial pattern that the rest of the repo refines.

A single gpt-engineer-app[bot] commit interrupts at 20:04 (`0e45449` 'Update site info for publish') — the Lovable surface and the Claude surface are *co-active* the same evening. After this point, bot commits become rare.

## Phase 2 — Narrative redesign sprint (2026-04-19)

On **2026-04-19** between 08:55 and 14:09, a 5-hour-14-minute editorial-and-narrative sprint lands six Claude-authored commits across one branch (`claude/landing-page-redesign-i1Mwg`) and four merged PRs (#3, #4, #5, #6, #7). The commit messages read like an editor's running diary:

1. `81393164` 08:55 — 'Reframe landing around the prism metaphor'. Replace sequential 4-phase methodology with three parallel tracks (A / B / Data). PrismVisual replaces ConstellationVisual. Flat ₪2,000 pricing.
2. `c4867f59` 09:58 — 'Tune landing copy and layout for conversion with **behavioral research**'. The commit body cites 7 research anchors: Dai/Milkman/Riis 2014, Tversky & Kahneman 1974, Levav & Fitzsimons 2006, Cialdini 1984, Gollwitzer 1999, Ebbinghaus 1885, Murdock 1962. This is the **first time conversion-research vocabulary appears** in the repo. The voice has changed from 'add feature' to 'apply primary literature'.
3. `e0543f98` 11:11 — 'Apply **neurostorytelling pass** to all landing copy'. Every section rewritten so the reader is protagonist, the antagonist has a face, every promise lands as a scene.
4. `29599c51` 10:41 — Hero rewritten with 'neurostorytelling precision'. Protagonist's internal state + named villain before the promise.
5. `fe751b3c` 11:36 — 'Reframe Hero and Problem around the **hidden-discipline flip**'. The page now frames the buyer as a hybrid practitioner (social worker who codes / coach who engineers systems / engineer with psycho-social understanding) hiding a 'second discipline' that is the actual edge.
6. `0ca7336c` 11:41 — 'Universalize the hidden-discipline frame'. Strip the three specific profession pairs in favor of the universal pattern.
7. `1756944` 12:18 — 'Reframe from buyer's side: never paid you for what you sell'. The hidden-discipline frame is *dropped* — too academic, the Hebrew דיסציפלינה too heavy. New frame: 'they never paid you for what you're selling — they paid you for something else you do without thinking. Name it -> you have a business.'
8. `6c75965` 14:07 — 'scrub residual דיסציפלינה mentions' (PR#7). The cleanup pass — the frame switched, the vocabulary catches up.

The arc visible across this sprint: behavioral-research-anchored copy -> neurostorytelling scenes -> identity-frame (hidden discipline) -> universalized identity-frame -> *buyer-side* reframe -> cleanup. This is **iterative copywriting with version control as the editor's notebook** — the prior version is never lost, the reasoning is preserved in commit bodies, and the human merger validates each step by clicking 'Merge' within seconds.

## Phase 3 — COR-SYS repositioning (2026-05-06)

A **17-day silence** follows the April sprint. The next commits arrive on **2026-05-06**, and they are decisive: the page is rewritten end-to-end into the COR-SYS brand.

- **`8434927` 12:44 (PR#8)** — 'Rewrite landing page to COR-SYS, 4-stage sequence, diagnostic form'. Drops Protocol Ocean Blue. Replaces the single-price prism narrative with a 4-stage sequence (1,000-1,900 NIS per stage) plus a 4,500 NIS full package. Replaces Calendly-only CTAs with a Web3Forms diagnostic form (react-hook-form + zod, Israeli phone validation) that *reveals* an inline Calendly widget after successful submission. Adds GA4 analytics scaffolding (form_start, form_submit, cta_click, scroll_depth 25/50/75/100). Switches palette from dark teal to cream/copper/dark-turquoise. **Deletes 8 old sections** (TrustStrip, SprintTimelineSection, DeliverablesSection, OutcomesSection, ChessSection, ProblemSection, MethodologySection, PricingSection) and adds **7 new sections** (Origin, Sequence, FullPackage, NotForEveryone, Commitment, ClientProof, DiagnosticForm). The repo is now an outbound consulting front for `ארז טל-שיר` / COR-SYS.
- **`f02609a` 13:13 (PR#9)** — 'Conversion-strategy pass: editorial restraint, single action color'. The repo's first **PR body with a Hebrew RTL table** documenting the CTA hierarchy. Hero split into overline + dominant H1 + subtitle. Stage numerals 01-04 promoted to drop-cap monumental treatment. Form fields prefixed '01.'–'06.' Submit copy changed to first-person 'אני רוצה לקבוע 20 דקות'. Palette: copper deepened to HSL(25 60% 39%) for WCAG AA contrast.
- A single bot commit (`e8a12bc` 12:57) sneaks in between PR#8 and PR#9 — a Lovable preview prompt 'בדוק שהטקסט החדש נראה טוב' ('check the new text looks good'). The operator was clearly running Lovable preview alongside Claude Code edits — the two surfaces are not in conflict, they are sequenced.
- **`af24284` 14:02 (PR#10)** — 'Research-driven conversion lift: founder mark, progressive form, process preview'. The body cites 11 sources: HubSpot 40K-page form study, KlientBoost, ConsultingSuccess, Genesys 2026 stats, Digital Applied 2026, Decoy Effect research. Each change is keyed to a specific evidence-based lift opportunity: faces increase conversion 39-95%, 6-field forms convert ~11.4% vs. 3-field ~25%, 80% read only Hero / 57-64% never scroll past first viewport, anonymous testimonials underperform, process transparency reduces friction, recommended badge guides choice. New components: FounderMark (typographic initials placeholder 'א.ט' with photoSrc prop), ProcessPreviewSection (4 timestamped beats 00:00->00:17 keyed to the 20-minute promise), MidPageCTA. The diagnostic form is split into 2 steps with a 'skip and send' escape hatch.
- **`f77d0a9` 14:07** — 'Fix duplicate-submit risk in DiagnosticForm step-two skip path'. The commit body acknowledges **Codex review on PR #10 caught a real P1**: the skip button bypassed react-hook-form's handleSubmit, so on slow networks duplicate lead submissions were possible. Claude introduces a single `isSending` state gating submitFinal at entry, cleared in a finally block. This is the first observable **AI-cross-review** event in the repo — Codex flagged it, Claude fixed it.

The May 6 sprint shipped 4 PRs (#8, #9, #10, plus a same-branch merge #11) in 2 hours 9 minutes, and produced the page that lives on main as `27ba4b5`.

## Inflection points

| When | What shifted | Evidence |
|------|--------------|----------|
| 2025-01-01 | Lovable template seed (synthetic timestamp) | `b331aa1` |
| 2026-03-08 | First product — GroundState grounding tool, Hebrew RTL | 8 lovable-dev[bot] commits 06:27-06:39 |
| 2026-04-14 13:25 | Claude enters; pivots repo to landing page | `dc90fee` |
| 2026-04-14 19:23 | Editorial 10-section scroll experience with Calendly | `8701a5b` PR#2 |
| 2026-04-19 09:58 | Behavioral-research-cited copy vocabulary debut | `c4867f5` PR#4 |
| 2026-04-19 11:11 | 'Neurostorytelling' editorial voice | `e0543f9` |
| 2026-05-06 12:44 | Brand pivot Protocol Ocean Blue -> COR-SYS | `8434927` PR#8 |
| 2026-05-06 14:02 | Research-driven conversion lift (11 cited sources) | `af24284` PR#10 |
| 2026-05-06 14:07 | First Codex-flagged P1 caught + fixed | `f77d0a9` |

## Currently-active threads (as of 2026-05-06)

- **Open branches**: 5 `claude/*` branches (audit-landing-page, create-landing-page, landing-page-design, landing-page-redesign, optimize-landing-page) + 9 `lovable-sync-*` branches with epoch-millisecond timestamps (the youngest dated 2026-05-10 by epoch decoding). Branches accumulate; they are not pruned.
- **Open PRs**: zero. Every PR is closed/merged.
- **Open issues**: zero. No issues ever opened.
- **Placeholders documented in PR#9 body**: `src/lib/web3forms.ts` ACCESS_KEY = 'PLACEHOLDER_REPLACE_ME'; `src/lib/analytics.ts` MEASUREMENT_ID = 'G-PLACEHOLDER'. ClientProof attribution still anonymous.

## Why this matters (for the cross-repo synthesis)

groundstate-protocol is the **maturation case study** in this repo set: it begins as a Lovable-only template (Phase 0), passes through a bot-only product phase (Phase 1, March), bot+Claude co-active (Phase 2, April 14 + May 6 interruptions), and finally Claude-only with bot+Lovable as background surfaces (Phase 3). Compared to cor-sys (which had no Lovable origin and went straight to multi-AI authorship), groundstate-protocol shows the **lifecycle of a Lovable template transitioning into a Claude-driven product**.

Three properties define the maturation:

1. **Bot commits never fully stop** — `e8a12bc` on 2026-05-06 12:57 inserts itself between two major Claude PRs. The Lovable preview surface remains a 'check how this looks' tool even after Claude owns the codebase.
2. **Editorial voice evolves in observable steps**: 'Update plan' -> 'Changes' -> 'Add ambient sound hook' -> 'Create landing page for Protocol Ocean Blue' -> 'Tune landing copy and layout for conversion with behavioral research (Dai/Milkman/Riis 2014, ...)' -> 'Research-driven conversion lift: founder mark, 2-step form, process preview (11 sources)'. The voice moves from machine-shorthand to cited-research within ~9 weeks.
3. **The repo is an outbound brand surface** — there is no CLAUDE.md, no LOG.md, no .claude/ commands. The Claude session-link footer is the *only* meta-tooling artifact. Unlike cor-sys which internalized its agent workflow, groundstate-protocol externalizes the operator's positioning. The two repos divide labor: cor-sys = internal CRM, groundstate-protocol = public face.
