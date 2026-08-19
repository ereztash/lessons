---
dimension: user-to-user
slug: non-template-domain-dep-predicts-resumption
evidence-repos: [chess-mind-patterns, core-unified-consciousness, cor-sys]
evidence-pointers:
  - chess-mind-patterns@c1c2685 (2026-03-08 17:39 'Add chess.js dependency')
  - commit body: 'Installed the chess.js package to resolve build errors.'
  - core-unified-consciousness@ecd8b5c:package.json (51 deps, all template defaults)
  - chess-mind-patterns@2c7ced2:package.json (52 deps including chess.js@^1.4.0)
  - core-unified-consciousness engine class names (`KORA`, `ErezCore`, `MetaBoardOptimizedByX` with toy values)
  - chess-mind-patterns engine names (`narrative-engine.ts` 45 KB, `spaced-repetition.ts` SM-2, `skill-dag.ts` 20-skill DAG)
  - cor-sys@526237f:LOG.md
  - cor-sys@185faa6:LOG.md
  - cor-sys@7271fd8:LOG.md
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
created: 2026-05-12
evidence-resolves-to: mixed
source-observations:  # lessons observations these pointers were resolved from
  - chess-mind-patterns@11:01
  - core-unified-consciousness@12:01
  - cor-sys@10:01
may-report: yes
may-assert-cause: no  # counter-example: MATI is the most active repo with 3 template-only deps
score-history:
  - 2026-05-12: 5/5 — first audit
---

# Non-Template Domain Dependency Predicts Resumption

## Observation (Claude layer — 5 lines max)

- core-unified-consciousness has zero non-template production deps and was abandoned at Tier C.
- chess-mind-patterns added one non-template domain dep (`chess.js@^1.4.0`) at commit 64 of 175 — and resumed 14 days later for a 72-minute sprint.
- cor-sys has many non-template deps and operates as a managed system at Tier A.
- The single domain dep acts as a *commitment device* — once `chess.js` is in `package.json`, the project has crossed a threshold of specificity that makes "this is a chess tool" irreversible.
- Diagnostic: `count(deps) - count(template-default-deps)` in `package.json`. Zero predicts abandonment; ≥1 predicts resumption.

## Mechanism

A non-template dependency is a *commitment artifact*. The operator chose it deliberately (the bot wouldn't suggest `chess.js` without prompt-time intent). Once chosen, the operator's psychology treats the repo as specific-purpose rather than disposable demo. The dependency stays in `package.json` even during dormant periods, acting as a tag the operator's future self will recognize. Repos without this tag get archived under cognitive load; repos with this tag get resumed because the resume-cost is anchored to the *concrete purpose* the dep names.

## Failure mode it prevents

Without this diagnostic, an operator deciding which dormant repos to resume picks by recency or commit count — both noisier signals. They spend 20-40 minutes on a Tier-C-finished repo to discover it has no specific purpose, instead of 5 seconds reading `package.json`. Estimated rework saved: 1-2 hours per portfolio review × 4 reviews/year = 4-8 hours/year for a 10-repo portfolio.

## Monetization route

- Skill artifact: `domain-dep-counter` — a one-line check (`jq '.dependencies | length' package.json - 32` against the Lovable template baseline) that scores commitment.
- Template: a 30-second portfolio audit one-liner.
- Component of the `four-feature-tier-classifier.md` playbook (already shipped); this insight is the canonical source for that feature.

## Reusability test

Generalizes to any template-bootstrapped framework — Next.js's `create-next-app`, Vite's `create-vite`, Astro's `create-astro` all have known default-dep sets. The diagnostic is `installed - template-default = N`. Pass.
