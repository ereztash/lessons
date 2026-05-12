# MEMORY — State Index

> Lightweight snapshot of current state. Updated by `/lesson-checkpoint` or end-of-session. Single source of truth for "where are we?"

## Current State

- **Phase**: 2 — cross-repo synthesis complete; Phase 3 (insight distillation + skills/commands) next
- **Last-touched repo**: lessons (cross-repo synthesis written)
- **Active research targets**: all 4 repos done (cor-sys, groundstate-protocol, chess-mind-patterns, core-unified-consciousness)
- **Raw observations gathered**: 43 across 4 repos
- **Promoted cross-repo patterns**: 17 (passing the ≥2 repos × strength≥2 gate)
- **Single-repo candidates**: 15 (retained as data, not promoted)
- **Skills built**: 0 of 5 planned (scaffold placeholders only)
- **Commands built**: 0 of 6 planned (scaffold placeholders only)
- **Insights distilled**: 0 (Phase 3 starts here)
- **Insights monetized (passed audit)**: 0
- **Playbooks shipped**: 0 of 3 target

## Promoted patterns count per dimension

| Dimension | Count | Patterns |
|-----------|-------|----------|
| claude-to-user | 3 | editorial-commit-voice-escalation; auto-pr-on-claude-branch; pr-body-verbosity-correlates-with-ttm |
| user-to-claude | 2 | hebrew-bilingual-cognition-medium; branch-as-sprint-container |
| claude-to-claude | 5 | claude-coauthored-trailer-convention; conventional-commit-prefix-on-claude-commits; test-scaffold-installed-never-used; zero-deletion-of-bot-generated-files; ai-cross-review-multi-agent-handoff |
| user-to-user | 7 | lovable-render-claude-write-coexistence; non-template-domain-dep-predicts-resumption; bot-blast-then-human-resumption; readme-placeholder-survives-to-head; zero-issues-zero-prs-prototype-shape; third-party-saas-replaces-backend; publish-button-as-success-condition; four-feature-tier-classifier-monotonic |

(Note: user-to-user has 8 patterns but the dimension column in patterns-matrix shows 7 distinct rows + four-feature-tier classifier; total 8.)

## Top Playbook Candidates (3-5 named, for Phase 4)

These are the highest-leverage promoted patterns ranked by monetization fit and cross-repo strength.

1. **publish-button-satisfiability-intent-triage** (user-to-user) — A 5-minute interview at repo-birth that classifies the operator's success condition as behavioral or demonstrative and emits a recommended infrastructure tier. Evidence: core-unified@12:00, core-unified@12:07, groundstate@11:00. Strongest single predictor in dataset.
2. **four-feature-tier-classifier-cli** (user-to-user) — A one-shot CLI / GitHub Action that scores a repo on (non-template dep, human commit, PR, CLAUDE.md/docs) and recommends next action (resume / promote / archive). Evidence: core-unified@12:09, synthesis § 7. Maps directly to portfolio triage.
3. **dual-ai-surface-workflow** (user-to-user) — A playbook that codifies Lovable-as-render + Claude-Code-as-write cadence, with the explicit handoff signature operators can recognize after the fact. Evidence: groundstate@11:01, chess-mind@11:04. Generalizes to any visual-preview-AI + code-AI pair.
4. **ai-cross-review-setup** (claude-to-claude) — Two templates: Claude + Codex concurrent review (groundstate@11:05) and Claude + Cursor batch handoff (cor-sys@10:11). Highest leverage for multi-AI workflow. Pairs naturally with the auto-PR-on-claude-branch pattern.
5. **resumer-day-prep** (user-to-user) — A playbook for the 72-minute Lovable-resumption window: don't refactor bot code; layer action engines on analytics engines; touch only the wiring file; ship external integrations together in the final commit. Evidence: chess-mind@11:03, chess-mind@11:07, chess-mind@11:09.

## Hypothesis Verdicts (from Phase 2 synthesis)

| Hyp | Statement | Verdict |
|-----|-----------|---------|
| H1 | 4-feature Tier classifier cleanly partitions repos | confirmed (lower-bound, not upper-bound, on health) |
| H2 | Publish-button satisfiability predicts abandonment | confirmed (strongest single predictor) |
| H3 | LOG.md is the enforcement mechanism | refined (the *habit* causes; the file format is incidental) |
| H4 | AI tool diversity predicts maturity | confirmed (monotonic with tier) |
| H5 | Editorial voice escalation predicts health | confirmed (directionally; usable after 5-10 commits) |

## Open Questions for Phase 3 + 4

- [ ] Of the 17 promoted patterns, which 3-5 should become the first shipped playbooks? (Top candidates above are the seed.)
- [ ] Should the Tier classifier be a GitHub Action, a CLI, or a manual checklist?
- [ ] Pricing currency for playbooks (USD vs ILS)?
- [ ] Does the user want playbooks published publicly or kept internal?
- [ ] Should bilingual HE+EN extend to the playbook-facing surface, or stay English only?
- [ ] Are there hidden repos in the operator's portfolio that would break the 4-feature classifier? (Data gap: the dataset is 4 repos out of 5 surveyed.)
- [ ] Does the `chess.js`-style "single domain dep" signal generalize beyond Lovable-bootstrapped repos to Next.js-bootstrapped or hand-bootstrapped repos?

## Data Gaps Identified in Phase 2

- **Fifth repo not deep-dived.** CLAUDE.md mentions 5 repos in scope; only 4 were Phase-1'd. The fifth (CampaignCraft / absorbed-into-cor-sys per cor-sys@10:10) is not separately tractable.
- **No data on operator's external context.** Resumption-predictor is plausibly an *external* fact (tournament approaching, deadline, contract signed) that is not visible in any repo. The dataset cannot test this hypothesis.
- **One observed AI-cross-review event only.** The Codex + Claude pattern (groundstate@11:05) is a single data point; n=1 limits generalizability of the multi-agent claim.
- **No Tier-D negative.** All four repos have at least *some* commits. A genuine Tier-D (empty repo, never used) is absent; the dataset's lower bound is core-unified at rung 0 with 54 bot commits.

## Phase Gates Status

| Phase | Gate | Status |
|-------|------|--------|
| 0 | Skeleton exists, cross-refs resolve | done (commit `a648ff3`) |
| 1 | 4 `extracted-insights.md` filled, ≥20 raw observations | done (43 observations across 4 repos) |
| 2 | `patterns-matrix.md` has ≥8 rows + synthesis written + 4 MOCs populated | done (35 matrix rows, 17 promoted; this commit) |
| 3 | 5 skills + 6 commands tested via self-application | pending |
| 4 | ≥3 playbooks shipped | pending |

## Next Session Plan

1. **Phase 3 kickoff — insight distillation**
   - Pick top 5 playbook candidates from the list above
   - For each: write the `/insights/<pattern-name>.md` file using `/insights/_template.md`
   - Score each on monetization-audit dimensions; flag any that fail
2. **Skill / command authoring**
   - `cross-repo-comparator` skill (consumes patterns-matrix.md, emits delta diff)
   - `insight-distiller` skill (consumes a MOC, emits insight files)
   - `tier-classifier` command (scores a repo by the 4-feature classifier)
   - `resumer-day-prep` command (emits a one-page checklist for a Lovable-resumption sprint)
3. **Self-application test**
   - Run `tier-classifier` against all 4 source repos; verify outputs match the synthesis's tier assignments
   - Run `cross-repo-comparator` against a fifth repo (or a re-pull of cor-sys to verify idempotence)
4. **Phase 4 prep**
   - Pick 3 playbooks for first shipment; assign monetization-audit scores
