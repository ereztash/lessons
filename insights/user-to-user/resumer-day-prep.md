---
dimension: user-to-user
slug: resumer-day-prep
evidence-repos: [chess-mind-patterns, groundstate-protocol]
evidence-pointers:
  - chess-mind-patterns@875fe1c (+1421/-24)
  - chess-mind-patterns@f590fe6 (+2102/-23)
  - chess-mind-patterns@2c7ced2 (+939/-22)
  - chess-mind-patterns@875fe1c (-24), chess-mind-patterns@f590fe6 (-23), chess-mind-patterns@2c7ced2 (-22) = 69 deletions, every one inside a file created earlier in the same session
  - chess-mind-patterns@2c7ced2 ('feat: Lichess deep-links, demo puzzle seeding, ELO goal setter, PWA + notifications')
  - chess-mind-patterns@2c7ced2:src/lib/lichess-links.ts (247 LOC mapping 20 skill IDs to Lichess training URLs)
  - chess-mind-patterns@2c7ced2:public/manifest.json (PWA manifest)
  - chess-mind-patterns@2c7ced2:public/sw.js (service worker with notification flow)
  - chess-mind-patterns@875fe1c (Index.tsx +82/-24)
  - chess-mind-patterns@f590fe6 (Index.tsx +28/-2)
  - chess-mind-patterns@2c7ced2 (Index.tsx +10/-2)
  - groundstate-protocol@dc90fee:src/pages/Landing.tsx
  - groundstate-protocol@abcdda7:(GroundState flow)
  - chess-mind-patterns@5abaacd (2026-03-09, last bot commit) -> chess-mind-patterns@875fe1c (2026-03-23, resumption) = a 14-day gap, verified locally 2026-09-03
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
evidence-resolves-to: hard
source-observations:  # lessons observations these pointers were resolved from
  - chess-mind-patterns@11:03
  - chess-mind-patterns@11:07
  - chess-mind-patterns@11:09
  - groundstate-protocol@11:00
may-report: yes
may-assert-cause: yes    # RESTORED 2026-09-03. Demoted the same day because the
                         # evidence measured `mixed`; the operator then opened the
                         # portfolio, every unresolvable pointer was re-anchored to a
                         # verified commit or PR, and R1 now measures `hard`. The
                         # claim came back on measurement, not on argument.
cause-scope: portfolio   # this portfolio only. Restored 2026-09-03 on re-anchored evidence;
                         # METHOD_LINEAGE.md section 3 still records level 7 = 0, so a cause may be
                         # asserted ABOUT these repositories and may NOT be sold as a general
                         # mechanism.

reversibility: low  # a shipped playbook is sold; a retraction reaches fewer people than the claim did
score-history:
  - 2026-05-12: 5/5 — first audit
  - 2026-09-03: 5/5 — re-audit under sale-gate condition 4: causal authority WITHDRAWN, evidence-resolves-to is `mixed` against a documented requirement of `hard`
  - 2026-09-03: 5/5 — causal authority RESTORED: pointers re-anchored against the live repositories, R1 measures `hard`, scope declared `portfolio`
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
