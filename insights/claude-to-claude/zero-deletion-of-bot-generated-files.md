---
dimension: claude-to-claude
slug: zero-deletion-of-bot-generated-files
evidence-repos: [chess-mind-patterns, core-unified-consciousness]
evidence-pointers:
  - chess-mind-patterns@11:03
  - core-unified-consciousness@12:04
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

# Zero Deletion of Bot-Generated Files

## Observation (Claude layer — 5 lines max)

- chess-mind-patterns' human resumer added 22 new files and 4,462 LOC in a 72-minute sprint and deleted *zero* bot-originated files. All 69 deletion lines were confined to wiring-file modifications or same-session revisions.
- core-unified-consciousness' mid-session refactor `Cleaned to a 3-page plan` consolidated 10 pages to 3 routes via `<Navigate>` redirects but did not delete the orphaned page files — 84 KB / 25% of `src/` survives as dead code.
- The pattern holds for both resumed (chess-mind) and abandoned (core-unified) Lovable repos: bot output is treated as immutable substrate.
- Architecture grows by layering, not refactoring; the wiring file (`Index.tsx`, `App.tsx`) becomes the only integration seam and grows unboundedly.
- Velocity-optimal for a single sprint; architecturally fragile over time.

## Mechanism

Bot-generated files are cognitively expensive to evaluate (the resumer wasn't there when they were created, so they have to read each one to know what to delete). The cheaper move is to layer new code on top. This is rational under time pressure (72-minute sprint) but compounds: the next sprint sees even more layered code and is even less likely to delete. Dead code accumulates as a one-way ratchet.

## Failure mode it prevents

Without an explicit dead-code budget, a resumed Lovable repo accumulates 25%+ dead source within 2-3 sprints. The cost is paid at deploy (larger bundle size), at audit (security reviewer flags unreferenced code), and at next-resumption (more files to mentally model). Estimated rework saved: 1-3 hours per repo per year on bundle-size optimization plus 1-2 hours per audit response.

## Monetization route

- Skill artifact: `dead-code-budget-audit` — uses `ts-prune` or `knip` to find unreferenced exports and flags repos exceeding a 20% dead-source threshold.
- Template: a one-screen "layer don't delete" sprint rule + a quarterly clean-up checklist.
- Bundled with `resumer-day-prep.md`: "during the 72-minute sprint do not delete; schedule the clean-up sprint for week N+2."

## Reusability test

The pattern generalizes to any LLM-bootstrapped codebase (Bolt, v0, Replit Agent, even ChatGPT-Canvas-exported projects). The layering-vs-refactoring bias is a general property of resumers, not a Lovable-specific one. Pass.
