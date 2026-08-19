---
dimension: user-to-user
slug: zero-issues-zero-prs-prototype-shape
evidence-repos: [chess-mind-patterns, core-unified-consciousness]
evidence-pointers:
  - chess-mind-patterns list_pull_requests = []
  - list_issues = {totalCount:0}
  - chess-mind-patterns@2c7ced2 root listing (no `docs/`, no `.github/`, no `CLAUDE.md`, no `AGENTS.md`, README is unchanged Lovable template); contrast with cor-sys insight 2026-05-12 10:12 (32 docs files, 270 KB)
  - core-unified-consciousness@b331aa1 (template 2025-01-01)
  - core-unified-consciousness@9d9327a (first bot commit 2026-03-08 15:51)
  - core-unified-consciousness@0f32edc (last sprint commit 2026-03-08 18:04)
  - core-unified-consciousness@ecd8b5c (HEAD 2026-03-09 08:41)
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
  - chess-mind-patterns@11:06
  - core-unified-consciousness@12:00
may-report: yes
may-assert-cause: yes  # strong-2-repos; held in Round 2 for the mirror repo
score-history:
  - 2026-05-12: 5/5 — first audit
---

# Zero Issues + Zero PRs Prototype Shape

## Observation (Claude layer — 5 lines max)

- chess-mind-patterns and core-unified-consciousness both have zero PRs, zero issues, no `docs/` folder, no `.github/` folder, no `CLAUDE.md`, README placeholder unchanged.
- cor-sys has all four (16 PRs, 32 docs files, full `CLAUDE.md` infrastructure). The split is binary in the dataset — repos either have all four or zero of all four.
- groundstate-protocol is the only borderline case: has PRs but no docs/issues/CLAUDE.md (editorial-brand-surface variant).
- The four-zero shape is a *deliberate mode choice at repo-birth*, not a maturity stage to transcend.
- 30-second portfolio audit: `gh issue list + gh pr list + ls docs/ + ls CLAUDE.md` returns four empties → prototype mode.

## Mechanism

PRs and issues are coordination artifacts. A single-operator repo with no external collaborators has nothing to coordinate. The operator chooses prototype mode because the overhead of opening issues to themselves (and never reading them again) is cognitively expensive for zero benefit. The four-zero shape is *rational* for single-operator prototypes — it would only be irrational if the operator intended to ever onboard a collaborator. Therefore the diagnostic is also a planning tool: if you can't imagine onboarding someone in 90 days, ship with four zeros.

## Failure mode it prevents

Without this clarity, an operator wastes 30-90 minutes installing `CLAUDE.md` / `docs/` infrastructure on a prototype that will never have a collaborator. Conversely, the operator ships a Tier A managed system *without* the four (because they didn't decide ahead) and later pays 2-4 hours retrofitting. Estimated rework saved: 30 min - 4 hours per repo at the misclassification cost.

## Monetization route

- Component of the `four-feature-tier-classifier.md` playbook (already shipped); this insight is the canonical source for one of the four features.
- Template: a one-line bash check `[ -f CLAUDE.md ] && [ -d docs ] && [ -d .github ] && echo system || echo prototype`.

## Reusability test

Generalizes to any GitHub-hosted single-operator repo regardless of stack. Pass.
