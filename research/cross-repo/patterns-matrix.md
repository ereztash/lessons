# Cross-Repo Patterns Matrix (Claude Layer)

> Structured pattern × repo matrix. Each row is one observed pattern; each column is presence/strength in a repo (0=absent, 1=weak, 2=moderate, 3=strong).
>
> **Promotion rule**: a pattern is promoted (to a MOC) iff strength ≥ 2 in ≥ 2 repos.

## Matrix

| Pattern | cor-sys | groundstate | chess-mind | core-unified | Strength | Promoted? | Dimension |
|---------|---------|-------------|------------|--------------|----------|-----------|-----------|
| claude-coauthored-trailer-convention | 3 | 3 | 3 | 0 | strong-3-repos | Yes | claude-to-claude |
| conventional-commit-prefix-on-claude-commits | 3 | 3 | 3 | 0 | strong-3-repos | Yes | claude-to-claude |
| lovable-render-claude-write-coexistence | 0 | 3 | 2 | 0 | moderate-2-repos | Yes | user-to-user |
| non-template-domain-dep-predicts-resumption | 3 | 1 | 2 | 0 | strong-2-repos | Yes | user-to-user |
| bot-blast-then-human-resumption | 0 | 2 | 3 | 1 | strong-2-repos | Yes | user-to-user |
| editorial-commit-voice-escalation | 2 | 3 | 2 | 0 | strong-3-repos | Yes | claude-to-user |
| hebrew-bilingual-cognition-medium | 3 | 3 | 2 | 0 | strong-3-repos | Yes | user-to-claude |
| auto-pr-on-claude-branch | 3 | 3 | 0 | 0 | moderate-2-repos | Yes | claude-to-user |
| pr-body-verbosity-correlates-with-ttm | 3 | 3 | 0 | 0 | moderate-2-repos | Yes | claude-to-user |
| readme-placeholder-survives-to-head | 0 | 0 | 3 | 3 | strong-2-repos | Yes | user-to-user |
| test-scaffold-installed-never-used | 0 | 1 | 3 | 2 | moderate-2-repos | Yes | claude-to-claude |
| zero-deletion-of-bot-generated-files | 0 | 1 | 3 | 3 | strong-2-repos | Yes | claude-to-claude |
| zero-issues-zero-prs-prototype-shape | 0 | 0 | 3 | 3 | strong-2-repos | Yes | user-to-user |
| branch-as-sprint-container | 2 | 3 | 0 | 0 | moderate-2-repos | Yes | user-to-claude |
| third-party-saas-replaces-backend | 0 | 3 | 2 | 0 | moderate-2-repos | Yes | user-to-user |
| ai-cross-review-multi-agent-handoff | 2 | 3 | 0 | 0 | moderate-2-repos | Yes | claude-to-claude |
| meta-tooling-co-shipped-with-product | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-user |
| log-md-monotonic-anti-pattern-counter | 3 | 0 | 0 | 0 | weak-1-repo | No | claude-to-claude |
| skills-as-research-decision-tree-translation | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-claude |
| pre-build-validation-protocol-retrofit | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-claude |
| bug-locus-walk-up-the-stack | 3 | 0 | 0 | 0 | weak-1-repo | No | claude-to-claude |
| slash-commands-as-session-lifecycle | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-claude |
| docs-folder-as-issue-tracker | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-user |
| repo-as-unification-absorption-target | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-user |
| cursor-fire-and-forget-batch-burst | 3 | 0 | 0 | 0 | weak-1-repo | No | claude-to-claude |
| pr-template-encodes-style-guide | 0 | 3 | 0 | 0 | weak-1-repo | No | claude-to-user |
| lovable-sync-branch-noise | 0 | 3 | 0 | 0 | weak-1-repo | No | user-to-user |
| mid-session-refactor-dead-code-survives | 0 | 0 | 0 | 3 | weak-1-repo | No | claude-to-claude |
| personification-engine-naming | 0 | 0 | 0 | 3 | weak-1-repo | No | user-to-claude |
| port-verb-implies-external-prior-artifact | 0 | 0 | 0 | 3 | weak-1-repo | No | user-to-claude |
| subject-noise-rate-elevated-in-abandoned | 0 | 0 | 1 | 3 | weak-1-repo | No | claude-to-user |
| publish-button-as-success-condition | 0 | 2 | 0 | 3 | moderate-2-repos | Yes | user-to-user |
| wiring-seam-monolithic-index-component | 0 | 0 | 3 | 0 | weak-1-repo | No | claude-to-claude |
| analytics-then-action-bot-human-split | 0 | 0 | 3 | 0 | weak-1-repo | No | user-to-user |
| four-feature-tier-classifier-monotonic | 3 | 1 | 2 | 0 | strong-2-repos | Yes | user-to-user |

## Promoted patterns by dimension

- **claude-to-user** (3): editorial-commit-voice-escalation; auto-pr-on-claude-branch; pr-body-verbosity-correlates-with-ttm
- **user-to-claude** (3): hebrew-bilingual-cognition-medium; branch-as-sprint-container; (also see claude-to-user overlap)
- **claude-to-claude** (5): claude-coauthored-trailer-convention; conventional-commit-prefix-on-claude-commits; test-scaffold-installed-never-used; zero-deletion-of-bot-generated-files; ai-cross-review-multi-agent-handoff
- **user-to-user** (8): lovable-render-claude-write-coexistence; non-template-domain-dep-predicts-resumption; bot-blast-then-human-resumption; readme-placeholder-survives-to-head; zero-issues-zero-prs-prototype-shape; third-party-saas-replaces-backend; publish-button-as-success-condition; four-feature-tier-classifier-monotonic

Total promoted: **17 patterns**. Single-repo patterns (15) remain as data, not insights.

## Strength scoring legend

- **0** — absent (no evidence in the repo at HEAD)
- **1** — weak (a faint trace; one occurrence; not load-bearing for the workflow)
- **2** — moderate (multiple occurrences; load-bearing; visible to a reader skimming the repo)
- **3** — strong (defining feature of the repo's identity at HEAD; cannot be missed)

## Cross-references

- Skill: `/.claude/skills/cross-repo-comparator.md`
- Pipeline: `/pipelines/cross-repo-diff.md`
- Narrative companion: `/research/cross-repo/synthesis.md`
- Source observation files:
  - `/research/cor-sys/extracted-insights.md` (12 observations)
  - `/research/groundstate-protocol/extracted-insights.md` (10 observations)
  - `/research/chess-mind-patterns/extracted-insights.md` (10 observations)
  - `/research/core-unified-consciousness/extracted-insights.md` (11 observations)
