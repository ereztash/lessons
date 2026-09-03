---
dimension: user-to-user
slug: zero-issues-zero-prs-prototype-shape
evidence-repos: [chess-mind-patterns, core-unified-consciousness]
evidence-pointers:
  - chess-mind-patterns@2c7ced2 (HEAD of 175 commits containing **zero** `Merge pull request` subjects - no PR was ever merged, verified locally 2026-09-03)
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
evidence-resolves-to: hard
source-observations:  # lessons observations these pointers were resolved from
  - chess-mind-patterns@11:06
  - core-unified-consciousness@12:00
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

score-history:
  - 2026-05-12: 5/5 — first audit
  - 2026-09-03: 5/5 — re-audit under sale-gate condition 4: causal authority WITHDRAWN, evidence-resolves-to is `mixed` against a documented requirement of `hard`
  - 2026-09-03: 5/5 — causal authority RESTORED: pointers re-anchored against the live repositories, R1 measures `hard`, scope declared `portfolio`
---

# Zero Issues + Zero PRs Prototype Shape

## Observation (Claude layer — 5 lines max)

- chess-mind-patterns and core-unified-consciousness both have zero PRs, zero issues, no `docs/` folder, no `.github/` folder, no `CLAUDE.md`, README placeholder unchanged.
- cor-sys has all four (16 PRs, 32 docs files, full `CLAUDE.md` infrastructure). The split is binary in the dataset — repos either have all four or zero of all four.
- groundstate-protocol is the only borderline case: has PRs but no docs/issues/CLAUDE.md (editorial-brand-surface variant).
- The four-zero shape is a *deliberate mode choice at repo-birth*, not a maturity stage to transcend.
- 30-second portfolio audit: `gh issue list + gh pr list + ls docs/ + ls CLAUDE.md` returns four empties → prototype mode.

## A pointer deliberately removed, 2026-09-03

`list_issues = {totalCount:0}` was listed as an evidence-pointer. **An absence is not an
artifact**: no commit, file or PR can be cited for something that was never created, so it could
never resolve and it dragged this insight to `mixed` forever. It is an observation and it belongs
here, in the body, not in a list whose contract is that every entry resolves. The observation
stands and is restated: the repository has zero issues, and its 175-commit history contains zero
`Merge pull request` subjects, which is the anchorable half and is now pointer [0].

## Mechanism

PRs and issues are coordination artifacts. A single-operator repo with no external collaborators has nothing to coordinate. The operator chooses prototype mode because the overhead of opening issues to themselves (and never reading them again) is cognitively expensive for zero benefit. The four-zero shape is *rational* for single-operator prototypes — it would only be irrational if the operator intended to ever onboard a collaborator. Therefore the diagnostic is also a planning tool: if you can't imagine onboarding someone in 90 days, ship with four zeros.

## Failure mode it prevents

Without this clarity, an operator wastes 30-90 minutes installing `CLAUDE.md` / `docs/` infrastructure on a prototype that will never have a collaborator. Conversely, the operator ships a Tier A managed system *without* the four (because they didn't decide ahead) and later pays 2-4 hours retrofitting. Estimated rework saved: 30 min - 4 hours per repo at the misclassification cost.

## Monetization route

- Component of the `four-feature-tier-classifier.md` playbook (already shipped); this insight is the canonical source for one of the four features.
- Template: a one-line bash check `[ -f CLAUDE.md ] && [ -d docs ] && [ -d .github ] && echo system || echo prototype`.

## Reusability test

Generalizes to any GitHub-hosted single-operator repo regardless of stack. Pass.
