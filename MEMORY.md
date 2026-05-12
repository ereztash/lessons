# MEMORY — State Index

> Lightweight snapshot of current state. Updated by `/lesson-checkpoint` or end-of-session. Single source of truth for "where are we?"

## Current State

- **Phase**: 4 + gap-closure round complete; all gates green
- **Last-touched repo**: lessons (gap-closure round shipping commits)
- **Active research targets**: 4 deep-dived (cor-sys, groundstate-protocol, chess-mind-patterns, core-unified-consciousness) + 1 absorbed-project mini-profile (CampaignCraft inferred via cor-sys PR#16)
- **Raw observations gathered**: 43 across 4 repos + CampaignCraft profile additions
- **Promoted cross-repo patterns**: 17 (passing the ≥2 repos × strength≥2 gate)
- **Single-repo candidates**: 16 (one added during gap-closure: absorbed-rather-than-shipped)
- **Skills built**: 5 of 5 planned (workflow-archaeologist, insight-distiller, monetization-auditor, dimension-router, cross-repo-comparator)
- **Commands built**: 6 of 6 planned (lesson-capture, lesson-distill, lesson-review, lesson-monetize, lesson-cross-check, lesson-ship)
- **Insights distilled**: 11 (5 prior Phase-4 + 6 new in gap-closure round)
- **Insights monetized (passed audit)**: 11 (all 5/5 or 4/5)
- **Insights in parking lot (failed audit)**: 0 — all 12 candidates passed 4/5 or higher; the 12th was distilled but its evidence-anchored criterion failed on the absorbed-rather-than-shipped pattern (only 1 repo), so it stayed at synthesis level
- **Playbooks shipped**: 6 + 1 meta-playbook (publish-button-intent-triage, four-feature-tier-classifier, dual-ai-surface-workflow, ai-cross-review-setup, resumer-day-prep, editorial-commit-voice-escalation, ai-review-event-instrumentation)

## Phase 4 + Gap-Closure Shipping Summary

| Playbook | Target Buyer | Hours Saved | Price Range |
|----------|--------------|-------------|-------------|
| Publish-Button Intent Triage | Solo AI-paired builders with ≥3 Lovable/Bolt/v0 repos and ≥1 abandoned without local clone | 2-6 hrs/misallocated repo; 8-15 hrs/portfolio | $39-$79 |
| Four-Feature Tier Classifier | Solo AI-paired builders with portfolios of 5+ LLM-tool-paired repos | 1-3 hrs/portfolio review; 8-20 hrs/year | $29-$59 |
| Dual-AI-Surface Workflow | Solo builders paying for both visual-preview AI and code-writing AI | 3-8 hrs/project; 2-3 projects/year converted | $49-$99 |
| AI Cross-Review Setup | Solo builders shipping production-adjacent code with a single AI | 2-4 hrs/caught bug; 4-12 hrs/quarter | $59-$129 |
| Resumer Day Prep | Solo Lovable-builders month-2+ with dormant repos | 1-3 hrs/resumption attempt; 12-36 hrs/year | $39-$79 |
| **Editorial Commit Voice Escalation** (gap-closure) | Solo builders with 5+ repos running quarterly portfolio reviews | 2-5 hrs/portfolio review; 8-20 hrs/year | $29-$59 |
| AI Review Event Instrumentation (meta, bundle-only) | Solo builders who already own ai-cross-review-setup | Compounds over 12 months | Bundle-only |

## Monetization Audit Verdicts (12 candidates total across Phase 2 + gap-closure)

| Candidate | Score | Verdict |
|-----------|-------|---------|
| publish-button-satisfiability-intent-triage | 5/5 | PASS — shipped as publish-button-intent-triage.md |
| four-feature-tier-classifier-cli | 5/5 | PASS — shipped as four-feature-tier-classifier.md |
| dual-ai-surface-workflow | 5/5 | PASS — shipped as dual-ai-surface-workflow.md |
| ai-cross-review-setup | 5/5 | PASS — shipped as ai-cross-review-setup.md |
| resumer-day-prep | 5/5 | PASS — shipped as resumer-day-prep.md |
| editorial-commit-voice-escalation (gap-closure) | 5/5 | PASS — shipped as editorial-commit-voice-escalation.md (insight + playbook + pricing row) |
| auto-pr-on-claude-branch (gap-closure) | 5/5 | PASS — shipped as distilled insight (no full playbook; could bundle later) |
| pr-body-verbosity-correlates-with-ttm (gap-closure) | 5/5 | PASS — shipped as distilled insight |
| claude-coauthored-trailer-convention (gap-closure) | 5/5 | PASS — shipped as distilled insight |
| conventional-commit-prefix-on-claude-commits (gap-closure) | 5/5 | PASS — shipped as distilled insight |
| zero-deletion-of-bot-generated-files (gap-closure) | 5/5 | PASS — shipped as distilled insight |
| lovable-render-claude-write-coexistence (gap-closure) | 5/5 | PASS — distilled (playbook already shipped: dual-ai-surface-workflow) |
| non-template-domain-dep-predicts-resumption (gap-closure) | 5/5 | PASS — distilled (component of four-feature-tier-classifier playbook) |
| third-party-saas-replaces-backend (gap-closure) | 5/5 | PASS — distilled (no standalone playbook yet; candidate for next batch) |
| zero-issues-zero-prs-prototype-shape (gap-closure) | 5/5 | PASS — distilled (component of four-feature-tier-classifier playbook) |

**Patterns audited but not distilled at insight-level**: 4 promoted patterns remain without dedicated insight files (these became cross-references inside existing insights and were judged audience-narrow or component-only):

- **hebrew-bilingual-cognition-medium** — audit verdict 3/5 (Reusable fails: HE+EN-specific; not portable to monolingual English audience). PARKED. Could revive as a niche playbook ("bilingual-CLAUDE.md template") in a future batch.
- **branch-as-sprint-container** — audit verdict 4/5 (passes), but the insight is implicit in `auto-pr-on-claude-branch` (same artifact, different framing). Consolidated into that insight to avoid duplication.
- **bot-blast-then-human-resumption** — audit verdict 5/5, but the insight is the source for `resumer-day-prep` playbook; ship-level coverage exists.
- **test-scaffold-installed-never-used** — audit verdict 3/5 borderline (Time-saving weak in standalone form; encodable but rework-hours estimate is light). PARKED as bundle-companion candidate for resumer-day-prep.

## Promoted patterns count per dimension

| Dimension | Count | Patterns |
|-----------|-------|----------|
| claude-to-user | 3 | editorial-commit-voice-escalation; auto-pr-on-claude-branch; pr-body-verbosity-correlates-with-ttm |
| user-to-claude | 2 | hebrew-bilingual-cognition-medium; branch-as-sprint-container |
| claude-to-claude | 5 | claude-coauthored-trailer-convention; conventional-commit-prefix-on-claude-commits; test-scaffold-installed-never-used; zero-deletion-of-bot-generated-files; ai-cross-review-multi-agent-handoff |
| user-to-user | 7 | lovable-render-claude-write-coexistence; non-template-domain-dep-predicts-resumption; bot-blast-then-human-resumption; readme-placeholder-survives-to-head; zero-issues-zero-prs-prototype-shape; third-party-saas-replaces-backend; publish-button-as-success-condition; four-feature-tier-classifier-monotonic |

## Hypothesis Verdicts (from Phase 2 synthesis)

| Hyp | Statement | Verdict |
|-----|-----------|---------|
| H1 | 4-feature Tier classifier cleanly partitions repos | confirmed (lower-bound, not upper-bound, on health); extended by CampaignCraft profile to suggest a commercial-dep-signature sub-feature |
| H2 | Publish-button satisfiability predicts abandonment | confirmed (strongest single predictor); generalizes to v0.dev per Maya self-application test |
| H3 | LOG.md is the enforcement mechanism | refined (the *habit* causes; the file format is incidental) |
| H4 | AI tool diversity predicts maturity | confirmed (monotonic with tier) |
| H5 | Editorial voice escalation predicts health | confirmed (directionally; usable after 5-10 commits); shipped as standalone playbook in gap-closure round |

## Phase Gates Status

| Phase | Gate | Status |
|-------|------|--------|
| 0 | Skeleton exists, cross-refs resolve | done (commit `a648ff3`) |
| 1 | 4 `extracted-insights.md` filled, ≥20 raw observations | done (43 observations across 4 repos) |
| 2 | `patterns-matrix.md` has ≥8 rows + synthesis written + 4 MOCs populated | done (35 matrix rows, 17 promoted; commit `a9fc349`) |
| 3 | 5 skills + 6 commands operational | done (Phase 3+4 commit) |
| 4 | ≥3 playbooks shipped | done (5 playbooks Phase 4; +1 in gap-closure round = 6 total + 1 meta) |
| **Gap-closure** | 8 identified gaps closed | **done (2026-05-12); see `commit-msg` of gap-closure commits** |

All 5 original gates + gap-closure round closed.

## Gap-Closure Round Summary (2026-05-12)

| Gap | Outcome |
|-----|---------|
| 1. Ship editorial-commit-voice-escalation | DONE — insight + playbook + pricing row (5/5 audit) |
| 2. Audit remaining promoted patterns; ship insights | DONE — 6 additional insights shipped (auto-pr-on-claude-branch, pr-body-verbosity, claude-coauthored-trailer, conventional-commit-prefix, zero-deletion, lovable-render-claude-write, non-template-domain-dep, third-party-saas, zero-issues-zero-prs); 4 patterns parked or consolidated |
| 3. Self-application test on hypothetical Maya repo | DONE — PASS; gate held against single-repo evidence; 2 new edge cases discovered (v0.dev placeholder rubric, commercial-dep-signature refinement) |
| 4. CampaignCraft mini-profile | DONE — 5th-repo partial data point profiled; absorbed-rather-than-shipped candidate row added to patterns-matrix |
| 5. AI cross-review instrumentation playbook | DONE — meta-playbook `ai-review-event-instrumentation.md` shipped as depends-on companion; bundle-only pricing |
| 6. Launch checklist | DONE — `/products/launch-checklist.md` with pre-launch + week 1-4 sequence + metric instrumentation |
| 7. README polish | DONE — Featured Playbooks table, How-to-buy section, Latest update date marker |
| 8. State updates | DONE — MEMORY.md (this file), LOG.md (session row + anti-patterns), patterns-matrix.md (absorbed candidate row), MOCs (insight back-links) |

## Open Questions (deferred to follow-up sessions)

- [ ] Should the Tier classifier ship as a GitHub Action publicly, or stay as a private CLI? (Decision pending operator preference.)
- [ ] Pricing currency for international buyers (USD vs ILS vs both)?
- [ ] Does the user want playbooks published publicly (Gumroad / LinkedIn) or kept internal? Defaults assumed Gumroad-first per launch checklist.
- [ ] Should the playbooks be available bilingual HE+EN, or English-only? Current shipping is English-only; HE versions could be a follow-up batch.
- [ ] Will a second observed absorption case ever surface (to promote `absorbed-rather-than-shipped` to the matrix)?
- [ ] Does the `chess.js`-style "single domain dep" signal generalize beyond Lovable-bootstrapped repos to v0.dev (per Maya self-application test prediction)?
- [ ] After 30 days of Gumroad sales, refresh pricing confidence per launch-checklist.md § Metric instrumentation.

## Data Gaps (post-gap-closure)

- **5th deep-dive repo still not run — but CampaignCraft mini-profile partially closes this.** The mini-profile relies on the absorbed surface, not on a direct git survey. A true 5th deep dive remains a follow-up.
- **No data on operator's external context.** Resumption-predictor is plausibly an *external* fact (tournament approaching, deadline, contract signed) that is not visible in any repo. Unchanged from Phase 2.
- **One observed AI-cross-review event only.** Per the gap-5 instrumentation playbook, future events will compound the dataset. Without instrumentation adoption, the data gap persists.
- **No Tier-D negative.** All four repos have at least *some* commits. A genuine Tier-D (empty repo, never used) is absent. Unchanged.
- **No v0.dev-bootstrapped repo data.** Maya self-application test was hypothetical only; a real v0.dev repo survey is a future task.
- **No commercial-dep-signature confirmation.** CampaignCraft has Stripe/OAuth deps, but it's a single inferred case; a second commercial repo would let us split the four-feature classifier's "any non-template dep" feature into "any commercial dep" + "any domain dep."
- **No real distribution validation.** Pricing hypotheses are theoretical; will need 30-day Gumroad sales data to refresh confidence column.

## Follow-up suggestions for next session (if any)

1. **Run the launch checklist** — set up Gumroad, generate PDFs, publish the 4 entry-tier playbooks + the Lovable Resumption Trilogy bundle.
2. **Real 5th repo deep dive** — pick a v0.dev or Bolt.new repo from the operator's portfolio (or a public template) and run the workflow-archaeologist skill against it; verify the 17 promoted patterns hold.
3. **30-day metric refresh** — after first Gumroad sales, update `pricing-hypotheses.md` Confidence column per launch-checklist.md.
4. **Cross-review instrumentation adoption** — start using the `fix(ai-cross-review): ...` commit convention on the next observed event to begin compounding the dataset.
5. **Bilingual ship decision** — if Israeli buyers are ≥10% of first-30-day sales, queue HE+EN versions of the 2 highest-converting playbooks.
6. **Second-absorption observation** — if another absorbed-rather-than-shipped case appears, promote the pattern from candidate to matrix row at strength-2-repos.
