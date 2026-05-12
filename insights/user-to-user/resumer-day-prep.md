---
dimension: user-to-user
slug: resumer-day-prep
evidence-repos: [chess-mind-patterns, groundstate-protocol]
evidence-pointers:
  - chess-mind-patterns@11:03
  - chess-mind-patterns@11:07
  - chess-mind-patterns@11:09
  - groundstate-protocol@11:00
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
related-playbook: products/playbooks/resumer-day-prep.md
created: 2026-05-12
---

# Resumer Day Prep — The 72-Minute Lovable Resumption Window

## Observation (Claude layer — 5 lines max)

- The resumption shape across the dataset is trimodal: bot-blast, silence, human burst. The burst lasts ≤72 minutes (chess-mind: 72-min sprint, 3 commits, 4,462 LOC, 22 new files; groundstate: 5-week silence then sustained editorial).
- Across all observed resumptions, zero bot-generated files are deleted by the resumer — the bot's output is treated as immutable substrate; the resumer LAYERS on top.
- The resumer touches only the wiring file (Index.tsx, App.tsx) as the integration seam — every new feature plugs into the existing monolithic component rather than refactoring it.
- External integrations (Lichess deep-links, PWA service worker, SM-2 SR engine) ship together in the FINAL commit of the sprint, suggesting they were pre-planned as a single shippable block.
- The action-engine to analytics-engine ratio is the diagnostic: bot built analytics; resumer adds actions on top (chess-mind: 4:1 ratio).

## Mechanism

The resumer is operating under sharp time-budget constraints (likely a single sitting before context loss). Refactoring bot code is high-cost and low-reward because the bot's choices were already accepted at commit time. Layering is low-cost and high-reward because it adds new capability without re-litigating prior decisions. The wiring file becomes the integration seam by default — it's the only file every feature must touch, so it absorbs the coupling load. Shipping external integrations together respects the 72-minute window: half-shipped integrations get stuck behind unresolved API keys or auth flows.

## Failure mode it prevents

A naive resumer opens the dormant repo and starts refactoring "to understand the code" — burning 1-3 hours on a refactor that doesn't ship the feature they wanted. By the time they're 90 minutes in, context has degraded and the session ends with no shippable artifact. The resumer-day-prep rule (don't refactor; layer; touch wiring only; ship integrations together) preserves the full 72-minute window for net-new feature work, saving 1-3 hours per resumption attempt and converting failed attempts (no shippable artifact) into shippable ones.

## Monetization route

- Playbook section: "The 72-Minute Resumption Sprint" with hour-by-hour checklist (0-15 min: orient; 15-45 min: layer; 45-60 min: wire; 60-72 min: ship integrations).
- Pre-sprint checklist template: confirm the success condition is still behavioral, confirm the wiring file is identified, confirm the integration code is pre-staged.
- Optional companion command /lesson-resume-prep that scans a dormant repo and emits the wiring-file path + analytics:action engine ratio.

## Reusability test

Substitute any AI-coding-platform repo with a bot-blast followed by silence. The trimodal shape recurs; the wiring-file diagnostic still works (find the most-touched file in the bot phase); the integration-ship-together rule still applies. Pass.
