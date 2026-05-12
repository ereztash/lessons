# MEMORY — State Index

> Lightweight snapshot of current state. Updated by `/lesson-checkpoint` or end-of-session. Single source of truth for "where are we?"

## Current State

- **Phase**: 4 — playbooks shipped; project complete, all gates closed
- **Last-touched repo**: lessons (Phase 3 + 4 shipping commit)
- **Active research targets**: all 4 repos done (cor-sys, groundstate-protocol, chess-mind-patterns, core-unified-consciousness)
- **Raw observations gathered**: 43 across 4 repos
- **Promoted cross-repo patterns**: 17 (passing the ≥2 repos × strength≥2 gate)
- **Single-repo candidates**: 15 (retained as data, not promoted)
- **Skills built**: 5 of 5 planned (workflow-archaeologist, insight-distiller, monetization-auditor, dimension-router, cross-repo-comparator)
- **Commands built**: 6 of 6 planned (lesson-capture, lesson-distill, lesson-review, lesson-monetize, lesson-cross-check, lesson-ship)
- **Insights distilled**: 5 (publish-button-satisfiability, tier-classifier-cli, dual-ai-surface-workflow, ai-cross-review-setup, resumer-day-prep)
- **Insights monetized (passed audit)**: 5 (all 5/5)
- **Insights in parking lot (failed audit)**: 0 — all 5 candidates passed 4/5 or higher
- **Playbooks shipped**: 5 of 3-5 target (publish-button-intent-triage, four-feature-tier-classifier, dual-ai-surface-workflow, ai-cross-review-setup, resumer-day-prep)

## Phase 4 Shipping Summary

| Playbook | Target Buyer | Hours Saved | Price Range |
|----------|--------------|-------------|-------------|
| Publish-Button Intent Triage | Solo AI-paired builders with ≥3 Lovable/Bolt/v0 repos and ≥1 abandoned without local clone | 2-6 hrs/misallocated repo; 8-15 hrs/portfolio | $39-$79 |
| Four-Feature Tier Classifier | Solo AI-paired builders with portfolios of 5+ LLM-tool-paired repos | 1-3 hrs/portfolio review; 8-20 hrs/year | $29-$59 |
| Dual-AI-Surface Workflow | Solo builders paying for both visual-preview AI and code-writing AI | 3-8 hrs/project; 2-3 projects/year converted | $49-$99 |
| AI Cross-Review Setup | Solo builders shipping production-adjacent code with a single AI | 2-4 hrs/caught bug; 4-12 hrs/quarter | $59-$129 |
| Resumer Day Prep | Solo Lovable-builders month-2+ with dormant repos | 1-3 hrs/resumption attempt; 12-36 hrs/year | $39-$79 |

## Monetization Audit Verdicts (5 candidates from Phase 2)

| Candidate | Score | Verdict |
|-----------|-------|---------|
| publish-button-satisfiability-intent-triage | 5/5 | PASS — shipped as publish-button-intent-triage.md |
| four-feature-tier-classifier-cli | 5/5 | PASS — shipped as four-feature-tier-classifier.md |
| dual-ai-surface-workflow | 5/5 | PASS — shipped as dual-ai-surface-workflow.md |
| ai-cross-review-setup | 5/5 | PASS — shipped as ai-cross-review-setup.md |
| resumer-day-prep | 5/5 | PASS — shipped as resumer-day-prep.md |

All 5 candidates passed. Zero went to parking lot.

## Promoted patterns count per dimension

| Dimension | Count | Patterns |
|-----------|-------|----------|
| claude-to-user | 3 | editorial-commit-voice-escalation; auto-pr-on-claude-branch; pr-body-verbosity-correlates-with-ttm |
| user-to-claude | 2 | hebrew-bilingual-cognition-medium; branch-as-sprint-container |
| claude-to-claude | 5 | claude-coauthored-trailer-convention; conventional-commit-prefix-on-claude-commits; test-scaffold-installed-never-used; zero-deletion-of-bot-generated-files; ai-cross-review-multi-agent-handoff |
| user-to-user | 8 | lovable-render-claude-write-coexistence; non-template-domain-dep-predicts-resumption; bot-blast-then-human-resumption; readme-placeholder-survives-to-head; zero-issues-zero-prs-prototype-shape; third-party-saas-replaces-backend; publish-button-as-success-condition; four-feature-tier-classifier-monotonic |

## Hypothesis Verdicts (from Phase 2 synthesis)

| Hyp | Statement | Verdict |
|-----|-----------|---------|
| H1 | 4-feature Tier classifier cleanly partitions repos | confirmed (lower-bound, not upper-bound, on health) |
| H2 | Publish-button satisfiability predicts abandonment | confirmed (strongest single predictor) |
| H3 | LOG.md is the enforcement mechanism | refined (the *habit* causes; the file format is incidental) |
| H4 | AI tool diversity predicts maturity | confirmed (monotonic with tier) |
| H5 | Editorial voice escalation predicts health | confirmed (directionally; usable after 5-10 commits) |

## Phase Gates Status

| Phase | Gate | Status |
|-------|------|--------|
| 0 | Skeleton exists, cross-refs resolve | done (commit `a648ff3`) |
| 1 | 4 `extracted-insights.md` filled, ≥20 raw observations | done (43 observations across 4 repos) |
| 2 | `patterns-matrix.md` has ≥8 rows + synthesis written + 4 MOCs populated | done (35 matrix rows, 17 promoted; commit `a9fc349`) |
| 3 | 5 skills + 6 commands operational | done (this commit) |
| 4 | ≥3 playbooks shipped | done (5 playbooks shipped, this commit) |

All 5 gates closed. Project complete.

## Open Questions (deferred to follow-up sessions)

- [ ] Should the Tier classifier ship as a GitHub Action publicly, or stay as a private CLI? (Decision pending operator preference.)
- [ ] Pricing currency for international buyers (USD vs ILS vs both)?
- [ ] Does the user want playbooks published publicly (Gumroad / LinkedIn) or kept internal? Defaults assumed Gumroad-first; revisit.
- [ ] Should the playbooks be available bilingual HE+EN, or English-only? Current shipping is English-only; HE versions could be a follow-up batch.
- [ ] Should a 6th playbook be commissioned from the editorial-commit-voice-escalation insight? Currently in the MOC as a strong-3-repos pattern but not yet distilled to /insights/.
- [ ] Does the `chess.js`-style "single domain dep" signal generalize beyond Lovable-bootstrapped repos to Next.js-bootstrapped or hand-bootstrapped? (Requires a 5th non-Lovable repo's data.)

## Data Gaps (unchanged from Phase 2)

- **Fifth repo not deep-dived.** CLAUDE.md mentions 5 repos in scope; only 4 were Phase-1'd.
- **No data on operator's external context.** Resumption-predictor is plausibly an *external* fact (tournament approaching, deadline, contract signed) that is not visible in any repo.
- **One observed AI-cross-review event only.** The Codex + Claude pattern (groundstate@11:05) is a single data point.
- **No Tier-D negative.** All four repos have at least *some* commits. A genuine Tier-D (empty repo, never used) is absent.

## Follow-up suggestions for next session (if any)

1. **Self-application test** — run the four-feature tier classifier against a 5th repo (or a non-Lovable repo) and verify the partition holds.
2. **Bundle launch** — package the "Lovable Resumption Trilogy" ($99) and the "Multi-AI Workflow Pack" ($129) on Gumroad with copy.
3. **Distill the parking-lot candidates** — editorial-commit-voice-escalation, hebrew-bilingual-cognition-medium (with bundle framing), branch-as-sprint-container are the strongest unshipped candidates.
4. **Sixth-repo verification** — run /lesson-cross-check against a fresh repo to test the cross-repo-comparator skill on new data.
5. **Adoption tracking** — instrument Gumroad / LinkedIn for first-month sales data; revisit pricing confidence levels after 30-60 days.
