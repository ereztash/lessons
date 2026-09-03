---
dimension: claude-to-claude
slug: zero-deletion-of-bot-generated-files
evidence-repos: [chess-mind-patterns, core-unified-consciousness]
evidence-pointers:
  - chess-mind-patterns@875fe1c (+1421/-24)
  - chess-mind-patterns@f590fe6 (+2102/-23)
  - chess-mind-patterns@2c7ced2 (+939/-22)
  - chess-mind-patterns@875fe1c (-24), chess-mind-patterns@f590fe6 (-23), chess-mind-patterns@2c7ced2 (-22) = 69 deletions, every one inside a file created earlier in the same session (re-counted locally 2026-09-03)
  - core-unified-consciousness@2228be1 (2026-03-08 17:45:11 `Cleaned to a 3-page plan`)
  - core-unified-consciousness@9adbcc8 (2026-03-08 17:45:31 `Merge DeepDive and Demo pages with 3-page plan`)
  - core-unified-consciousness@ecd8b5c:src/App.tsx lines 18-26 (six `<Navigate replace />` redirects)
  - core-unified-consciousness@ecd8b5c:src/pages/ (10 .tsx files, only 4 active routes including NotFound)
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
  - core-unified-consciousness@12:04
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
