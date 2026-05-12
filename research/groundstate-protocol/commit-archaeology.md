# groundstate-protocol — Commit Archaeology

> Layer: Claude (machine-consumed). Schema-strict, tables, no narrative.
> Source: full `list_commits` paginate (40 entries, main branch).
> SHA = short 7-char. Author class normalized to {Lovable, lovable-dev[bot], Claude, ereztash}.

## Schema

```
Date (UTC) | SHA | Author class | Prefix | Subject | File-set hint
```

Prefix taken from message head where present. `--` = no conventional prefix. `Merge` = GitHub merge commit.

## Author class statistics

| Author class | Email pattern | Count | % | First seen | Last seen |
|---|---|---|---|---|---|
| Claude | `noreply@anthropic.com` | 15 | 37.5% | 2026-04-14 | 2026-05-06 |
| lovable-dev[bot] (gpt-engineer-app[bot]) | `159125892+gpt-engineer-app[bot]@users.noreply.github.com` | 14 | 35.0% | 2026-03-08 | 2026-05-06 |
| ereztash | `erez2812345@gmail.com` | 10 | 25.0% | 2026-04-14 | 2026-05-06 |
| Lovable (template) | `noreply@lovable.dev` | 1 | 2.5% | 2025-01-01 (synthetic) | 2025-01-01 |
| **Total** | | **40** | 100% | | |

Key transitions:

- **Apr 14 = Claude's first appearance.** Before this date the repo is 100% bot/template. After this date the repo is dominated by Claude with bot commits becoming sparse interruptions.
- **Apr 19 = first Claude-only day** (6 Claude commits, 0 bot, 4 ereztash merges).
- **May 6 = co-active day** (5 Claude commits, 1 bot commit `e8a12bc` at 12:57 between PR#8 and PR#9, 4 ereztash merges).
- ereztash is **exclusively a merger**. Zero direct code-authored commits by the human. All 10 ereztash commits are `Merge pull request #N` GitHub merge commits.

## Prefix-usage table

| Prefix | Count | % | First use | Notes |
|---|---|---|---|---|
| Merge | 10 | 25.0% | `824bc0e` (Apr 14) | One per merged PR; ereztash-only |
| Free-form descriptive (Claude) | 14 | 35.0% | `dc90fee` (Apr 14) | E.g. 'Create landing page', 'Reframe Hero', 'Apply neurostorytelling pass' |
| `Update plan` / `Save plan in Lovable` / `Changes` (bot) | 4 | 10.0% | `4353a32` (Mar 8) | Earliest bot voice |
| `Implement` / `Add` / `Hebrew RTL support` (bot descriptive) | 8 | 20.0% | `b9e8a1c` (Mar 8) | Mid bot voice |
| `Work in progress` / `Lovable update` (bot) | 2 | 5.0% | `33b1066` (May 6) | Late bot voice |
| `Fix duplicate-submit risk` (Claude descriptive) | 1 | 2.5% | `f77d0a9` (May 6) | Codex review response |
| `template:` (Lovable seed) | 1 | 2.5% | `b331aa1` (synthetic) | -- |
| **NO instance of `feat:` / `fix:` / `chore:` / `docs:` Conventional Commits** | 0 | 0% | -- | The repo never adopts Conventional Commits |

**Convention stabilization:** The repo does *not* converge on Conventional Commits. Claude commits use **descriptive imperative subjects** (`Create landing page for Protocol Ocean Blue`, `Reframe Hero and Problem around the hidden-discipline flip`, `Apply neurostorytelling pass to all landing copy`). Bot commits use generic verbs (`Add`, `Update`, `Implement`, `Changes`). The two voices coexist throughout — Claude does not retrofit bot commits into a convention, and the bot does not adopt Claude's descriptive style.

## Date clusters

| Window | Commits | Dominant author | Activity character |
|---|---|---|---|
| 2025-01-01 (synthetic) | 1 | Lovable | Template seed |
| 2026-03-08 06:27-06:39 (12 min) | 8 | lovable-dev[bot] | GroundState protocol scaffolded (grounding flow, ambient hum, Hebrew RTL) |
| 2026-03-09 .. 2026-04-13 | 0 | — | **5-week silence** |
| 2026-04-14 13:25-20:01 (6h 36m) | 6 | Claude (4) + ereztash merges (2) + bot (1) | Landing page added; Protocol Ocean Blue brand introduced; design system foundation |
| 2026-04-15 .. 2026-04-18 | 0 | — | **5-day silence** |
| 2026-04-19 08:55-14:09 (5h 14m) | 10 | Claude (6) + ereztash merges (4) | Narrative redesign sprint — prism metaphor -> behavioral research -> neurostorytelling -> hidden-discipline -> buyer-side reframe -> cleanup |
| 2026-04-20 .. 2026-05-05 | 0 | — | **17-day silence** |
| 2026-05-06 12:44-14:53 (2h 9m) | 9 | Claude (5) + ereztash merges (4) + bot (1) | COR-SYS rebrand; editorial restraint; research-driven conversion lift; Codex P1 fix |

**Pacing:** Three sprint days separated by silences of 5 weeks / 5 days / 17 days. The repo is worked in discrete sessions, not continuously. Each session takes the page from one stable state to the next stable state. The longest session is April 14 (initial pivot + design system + editorial scroll), the densest is April 19 (narrative iteration). The mass-changes session is May 6 (brand pivot + research-driven + Codex fix).

## Significant commits (selected)

| Date | SHA | Author | Prefix | Subject | File-set hint |
|---|---|---|---|---|---|
| 2025-01-01 (synthetic) | `b331aa1` | Lovable | template: | new_style_vite_react_shadcn_ts_testing_2026-01-08 | Vite + React + shadcn/ui template scaffold |
| 2026-03-08 06:27 | `91c0160` | lovable-dev[bot] | Update plan | Plan file updated during planning mode (X-Lovable-Edit-ID) | plan file |
| 2026-03-08 06:28 | `6a901af` | lovable-dev[bot] | Save plan in Lovable | -- | plan file |
| 2026-03-08 06:29 | `9b634aa` | lovable-dev[bot] | Changes | -- | unknown |
| 2026-03-08 06:30 | `b9e8a1c` | lovable-dev[bot] | -- | Implement GroundState main flow | first product code |
| 2026-03-08 06:30 | `a947ae1` | lovable-dev[bot] | -- | GroundState main flow built (4-state grounding protocol with crisis safety brake) | grounding flow + crisis detection |
| 2026-03-08 06:33 | `ccdee12` | lovable-dev[bot] | -- | Add ambient sound toggle | toggle UI |
| 2026-03-08 06:33 | `9fc9cc1` | lovable-dev[bot] | -- | Add ambient sound hook | useAmbientSound hook |
| 2026-03-08 06:36 | `6c5229c` | lovable-dev[bot] | -- | Add ambient sound hook (with implementation body) | useAmbientSound full impl |
| 2026-03-08 06:39 | `fa70c6c` | lovable-dev[bot] | -- | Add ambient sound toggle (duplicate subject) | toggle wiring |
| 2026-03-08 06:39 | `abcdda7` | lovable-dev[bot] | -- | **Hebrew RTL support and crisis UI** | RTL layout + crisis flow |
| 2026-04-14 13:25 | `dc90fee` | **Claude** | -- | **Create landing page for Protocol Ocean Blue** | Landing.tsx + Header.tsx + SignupForm.tsx + App.tsx routes |
| 2026-04-14 17:33 | `7a83270` | Claude | -- | Add behavioral color tokens and design system foundation | index.css COR SYS tokens + framer-motion 12.x |
| 2026-04-14 17:41 | `824bc0e` | ereztash | Merge | PR#1 | -- |
| 2026-04-14 19:23 | `8701a5b` | Claude | -- | **Rebuild Protocol Ocean Blue landing as editorial scroll experience** | 10-section landing + Calendly + ConstellationVisual |
| 2026-04-14 20:01 | `057da0f` | ereztash | Merge | PR#2 | -- |
| 2026-04-14 20:04 | `0e45449` | lovable-dev[bot] | -- | Update site info for publish (Edited UI in Lovable) | site metadata |
| 2026-04-19 08:55 | `8139316` | Claude | -- | **Reframe landing around the prism metaphor** | PrismVisual + ChessSection + 3 parallel tracks |
| 2026-04-19 09:15 | `1b5e2bb` | ereztash | Merge | PR#3 | -- |
| 2026-04-19 09:58 | `c4867f5` | Claude | -- | **Tune landing copy and layout for conversion with behavioral research** (Dai/Milkman/Riis 2014; Tversky & Kahneman 1974; Levav & Fitzsimons 2006; Cialdini 1984; Gollwitzer 1999; Ebbinghaus 1885; Murdock 1962) | Hero loss-frame + Pricing anchor + FAQ reorder + StickyMobileCTA |
| 2026-04-19 10:37 | `896bb63` | ereztash | Merge | PR#4 | -- |
| 2026-04-19 10:41 | `29599c5` | Claude | -- | Rewrite Hero copy with neurostorytelling precision | Hero.tsx |
| 2026-04-19 11:11 | `e0543f9` | Claude | -- | **Apply neurostorytelling pass to all landing copy** | every section rewritten as scenes |
| 2026-04-19 11:36 | `fe751b3` | Claude | -- | **Reframe Hero and Problem around the hidden-discipline flip** | Hero + ProblemSection |
| 2026-04-19 11:41 | `0ca7336` | Claude | -- | Universalize the hidden-discipline frame | Hero + Problem |
| 2026-04-19 11:46 | `6583586` | ereztash | Merge | PR#5 | -- |
| 2026-04-19 12:18 | `1756944` | Claude | -- | **Reframe from buyer's side: 'never paid you for what you sell'** | Hero + Problem (hidden-discipline frame replaced) |
| 2026-04-19 13:39 | `06beed6` | ereztash | Merge | PR#6 | -- |
| 2026-04-19 14:07 | `6c75965` | Claude | -- | scrub residual 'דיסציפלינה' mentions | ProblemSection + MethodologySection |
| 2026-04-19 14:09 | `5151a20` | ereztash | Merge | PR#7 | -- |
| 2026-05-06 12:44 | `8434927` | Claude | -- | **Rewrite landing page to COR-SYS, 4-stage sequence, diagnostic form** | -8 old sections / +7 new sections / Web3Forms + Calendly reveal / GA4 / palette pivot |
| 2026-05-06 12:48 | `f587921` | ereztash | Merge | PR#8 | -- |
| 2026-05-06 12:56 | `33b1066` | lovable-dev[bot] | Work in progress | -- | bot interruption |
| 2026-05-06 12:57 | `e8a12bc` | lovable-dev[bot] | Lovable update | 'בדוק שהטקסט החדש נראה טוב בתצוגה' (X-Lovable-Edit-ID) | preview check |
| 2026-05-06 13:13 | `f02609a` | Claude | -- | **Conversion-strategy pass: editorial restraint, single action color** | CTA hierarchy 3 levels + drop-cap stage numerals + form numerals 01.-06. + first-person CTA |
| 2026-05-06 13:53 | `32c4f59` | ereztash | Merge | PR#9 | -- |
| 2026-05-06 14:02 | `af24284` | Claude | -- | **Research-driven conversion lift: founder mark, progressive form, process preview** (11 sources: HubSpot 40K-page, KlientBoost, ConsultingSuccess, Genesys 2026, Digital Applied 2026, Decoy Effect) | FounderMark + 2-step form + ProcessPreviewSection + MidPageCTA + Recommended badge |
| 2026-05-06 14:07 | `f77d0a9` | Claude | -- | **Fix duplicate-submit risk in DiagnosticForm step-two skip path** (Codex review on PR #10 caught P1) | DiagnosticForm isSending guard |
| 2026-05-06 14:53 | `27ba4b5` | ereztash | Merge | PR#10 | HEAD of main |

## Transition points (numbered)

1. **T0 — Template seed** (2025-01-01 synthetic, `b331aa1`): Lovable starter `new_style_vite_react_shadcn_ts_testing_2026-01-08`.
2. **T1 — Bot-only product phase** (2026-03-08, 8 commits in 12 min): GroundState grounding tool scaffolded by lovable-dev[bot]. Hebrew RTL and crisis UI present from this phase. Pure bot voice.
3. **T2 — Claude enters, pivots project** (2026-04-14 13:25, `dc90fee`): Repo pivots from grounding tool to landing page. GroundState becomes an archive route. First Claude Code session-link signature.
4. **T3 — Editorial scroll experience** (2026-04-14 19:23, `8701a5b`, PR#2): The 10-section pattern that the rest of the repo refines. Calendly integration. ConstellationVisual hero.
5. **T4 — Behavioral-research vocabulary debut** (2026-04-19 09:58, `c4867f5`, PR#4): First commit body citing primary research (7 anchors). 'Conversion lift' vocabulary enters the repo.
6. **T5 — Neurostorytelling editorial voice** (2026-04-19 11:11, `e0543f9`): Every section rewritten as scenes. The 'protagonist + named antagonist + scene' pattern is established.
7. **T6 — Hidden-discipline frame attempted and discarded** (2026-04-19 11:36 -> 12:18, `fe751b3` -> `1756944`): Frame proposed, universalized, then dropped within 42 minutes for being 'too academic'. The discard commit body explicitly names the reason ('דיסציפלינה is heavy Hebrew, the list of profession pairs read like a CV, the grammar of מסתתר את was wrong').
8. **T7 — COR-SYS brand pivot** (2026-05-06 12:44, `8434927`, PR#8): Protocol Ocean Blue dropped. 8 sections deleted, 7 added. Palette dark teal -> cream/copper/dark-turquoise. Web3Forms diagnostic form with Calendly reveal post-submit.
9. **T8 — Research-driven conversion lift** (2026-05-06 14:02, `af24284`, PR#10): 11 cited sources in commit body. FounderMark + 2-step progressive form + ProcessPreview + MidPageCTA + Recommended badge — each keyed to a specific research finding.
10. **T9 — First Codex-review caught P1** (2026-05-06 14:07, `f77d0a9`): Codex review on PR#10 flagged a duplicate-submit race condition in the form's step-two skip path. Claude fixed it within 5 minutes. First observable cross-AI review event in the repo.
