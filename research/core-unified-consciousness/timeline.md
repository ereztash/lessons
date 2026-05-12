# core-unified-consciousness — Timeline (Human Narrative)

> Phase 1 deep dive, written 2026-05-12. The repo is the **negative control** in the four-repo dataset: bootstrapped on the same Lovable template as chess-mind-patterns, blasted by the same gpt-engineer-app bot on the same day, never resumed by a human. The narrative is therefore *short by design* — there is almost nothing to tell, and the absence is itself the story.

---

## At a glance

- **Total commits**: 56 (1 Lovable template seed + 55 bot edits)
- **Authors**: `Lovable` (1), `gpt-engineer-app[bot]` (55). **Zero human commits.**
- **PRs**: 0. **Issues**: 0. **Branches**: only `main`.
- **Activity window**: 2026-03-08 15:51 UTC → 2026-03-09 08:41 UTC, then 64 days of silence to today (2026-05-12).
- **HEAD**: `ecd8b5c` "Update site info for publish" — a one-line index.html edit and a 267-line bun.lock cleanup. No domain code in the final commit.
- **README**: still contains three literal `REPLACE_WITH_PROJECT_ID` strings. **Never touched** after the template stub.
- **Project name**: still `vite_react_shadcn_ts` in `package.json`. **Never renamed.**

---

## The three time-islands

### Island 0 — 2025-01-01 (template seed)

One commit: `b331aa1` `template: new_style_vite_react_shadcn_ts_testing_2026-01-08`, authored by `Lovable <noreply@lovable.dev>` with a frozen 2025-01-01 timestamp. This is the same template-stub mechanism documented in chess-mind-patterns and groundstate: Lovable backdates the seed so the repo gains a stable 'birth' record that precedes any operator action. The author identity here is `Lovable` (not `lovable-dev[bot]`), which is the *template-publishing* identity distinct from the per-edit bot identity that takes over from commit 2 onward.

### Island 1 — 2026-03-08 15:51 → 18:04 UTC (active bot blast, ~2h13m)

54 of the 55 bot commits land in this 133-minute window. Rate: **~24 commits/hour** (compare chess-mind-patterns: 16.3/hour over 10h28m). The repo goes from empty template to a 10-page React site with 9 'engine' files, two context providers, two language modes, framer-motion animations, an SEO landing page with product verticals, and what the bot calls 'ML pattern classification'. The session ends mid-stride: the final commit of the sprint adds product verticals to the landing page and removes a 41-line `.lovable/plan.md` file — i.e., the bot was *clearing scratch state* as it went, not exhausting a backlog.

### Island 2 — 2026-03-09 08:41 UTC (single publish commit, 14h37m after Island 1)

One commit: `ecd8b5c` 'Update site info for publish' with trailer 'Edited UI in Lovable'. The diff is trivial — 11 additions and 6 deletions in `index.html` (likely a meta/OG tag tweak), plus a 267-line deletion in `bun.lock` (a lockfile dedupe). No source code is touched. The trailer 'Edited UI in Lovable' is the operator's own click trail through the Lovable web UI, which Lovable echoed into a commit body. After this commit, **no further activity** is recorded on the repo.

---

## What the operator was doing (inferred)

Reading the bot's commit subjects in order, the trajectory traces a marketing-site arc:

1. `15:51` — plan seed (`Update plan` x2, `Save plan in Lovable`)
2. `15:58–16:02` — engine layer (`Port Alma and related engines`, `Implement core engine and UI`)
3. `16:05–16:16` — ML layer (`Add ML feature analyzer`, `Add ml-based feature analyzer`, `Add animated agent connections and ML analysis`, `Added ML pattern classification`, `Enhance ML: classify states`, `Add ML analysis & transparency`)
4. `16:28–16:31` — branding and locale (`Add icons to landing nav`, `Added innovation showcase`, `Add KORA playground and RTL`, `Added KORA playground page`, `Add KORA Playground page`)
5. `16:36–16:44` — language context (`Added global language context`, `Add global language context`)
6. `16:44–17:01` — Research page (`Added Research page`, `Add Research page`, `Add Research page with content`, six `Preceding changes` and `Changes` micro-batches, `Add animated agent connections`)
7. `17:01–17:45` — animations and plan reset (`Add framer-motion animations`, `Add animations to Research page` x3, `Save plan in Lovable`)
8. `17:45` — site-architecture refactor (`Cleaned to a 3-page plan`, `Merge DeepDive and Demo pages with 3-page plan`)
9. `18:02–18:04` — landing page closing flourish (`Save plan in Lovable`, three `Preceding changes` micro-batches, `Add applications section to index`, `Added product verticals to landing`)
10. `08:41` next morning — publish polish (`Update site info for publish`)

The `Cleaned to a 3-page plan` commit at 17:45 is a *late re-architecture*: the bot had built out 10 pages (Index, Demo, Dashboard, Playground, Architecture, Analysis, Research, KoraPlayground, DeepDive, NotFound) and the operator then asked Lovable to consolidate them to three (Index, Demo, DeepDive), creating six `<Navigate replace />` redirects in `App.tsx`. The other seven page files survive on disk as **dead code** — never deleted, not routed.

---

## Why it stopped

The repo's HEAD message is `Update site info for publish`. The 'publish' verb is the Lovable platform's term for promoting a preview to a public URL — i.e., the operator pressed Lovable's *Publish* button, generated an OG image (the `pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/...` URL in `index.html` is a Lovable CDN), and walked away. Nothing in the repo indicates a blocker, a build failure, or a discarded idea. There is no `TODO` left in the source that an operator might have promised to return to. The README is unfilled because the operator never set the project URL — likely because they were viewing the live preview directly inside Lovable and never needed to share the project ID externally.

In other words: the repo was not abandoned because it broke — it was abandoned because *it was finished from the operator's point of view*, where 'finished' means the Lovable preview demoed the concept well enough that no further effort was warranted. The 'concept' here is a marketing landing page for an AI/consciousness research framing (the index.html OG title is still 'Lovable App', so even the concept's name was not crystallised). Compare chess-mind-patterns, where the operator returned 14 days later with Claude Code to weld practical features (Lichess deep-links, PWA, SM-2 spaced repetition) onto the bot's analytic substrate — that work shape (external integrations + behavioural compactness) has *no analogue* in core-unified-consciousness because there was no behavioural product to wire to.

---

## What is conspicuously absent

- **No human commits.** Not even a README edit. The operator never opened a local editor against this repo.
- **No PRs, no branches.** Direct-to-main from the bot, with no operator-side review surface.
- **No issues, no labels.** No backlog, no bug list, no future-work parking lot.
- **No CLAUDE.md, no AGENTS.md, no docs/.** No instruction surface to onboard Claude Code if resumption were attempted.
- **No CI, no `.github/`.** No build verification beyond what runs inside Lovable's preview sandbox.
- **No external integrations.** Zero API keys, zero `.env.example`, zero database calls, zero service workers, zero PWA manifest. Compare chess-mind-patterns' final commit, which added all four of those.
- **No domain dependency.** The 51 production dependencies are 100% the Vite + React + shadcn-ui + framer-motion template default. Nothing chess-like, nothing ML-like (despite the bot's 'ML analyzer' file), nothing AI-like.

---

## Single-sentence summary

core-unified-consciousness is a 133-minute Lovable preview demo that was published once and then forgotten — the operator made no marks on it whatsoever, and the bot's output sits as it was generated.

*Evidence pointers:* `core-unified-consciousness@b331aa1` (template), `core-unified-consciousness@9d9327a` (first bot commit), `core-unified-consciousness@0f32edc` (last sprint commit), `core-unified-consciousness@ecd8b5c` (publish commit / HEAD), `core-unified-consciousness@ecd8b5c:README.md` (REPLACE_WITH_PROJECT_ID x3), `core-unified-consciousness@ecd8b5c:package.json` (name='vite_react_shadcn_ts'), `core-unified-consciousness@ecd8b5c:src/App.tsx` (3 active routes + 6 redirects).
