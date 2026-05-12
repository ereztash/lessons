# Lessons — A Repository of Monetizable Workflow Insights

> Battle-tested playbooks for solo AI-paired builders, extracted from cross-repo analysis of real Lovable + Claude Code + Cursor projects. Every insight is evidence-anchored. Every playbook passes a 5-criterion monetization gate.

**Latest update**: 2026-05-12 — 6 playbooks shipped, 11 distilled insights live, gap-closure round complete.

## Featured Playbooks

| Playbook | Target buyer | Hours saved | Price |
|----------|--------------|-------------|-------|
| [Publish-Button Intent Triage](products/playbooks/publish-button-intent-triage.md) | Solo AI-paired builders with ≥3 Lovable/Bolt/v0 repos and ≥1 abandoned | 2-6 hrs/misallocated repo | $39 – $79 |
| [Four-Feature Tier Classifier](products/playbooks/four-feature-tier-classifier.md) | Solo builders with portfolios of 5+ LLM-tool-paired repos | 1-3 hrs/portfolio review | $29 – $59 |
| [Dual-AI-Surface Workflow](products/playbooks/dual-ai-surface-workflow.md) | Solo builders paying for BOTH a visual-preview AI and a code-writing AI | 3-8 hrs/project | $49 – $99 |
| [AI Cross-Review Setup](products/playbooks/ai-cross-review-setup.md) | Solo builders shipping production-adjacent code with a single AI | 2-4 hrs/caught bug | $59 – $129 |
| [Resumer Day Prep](products/playbooks/resumer-day-prep.md) | Solo Lovable-builders on month 2+ with dormant repos | 1-3 hrs/resumption attempt | $39 – $79 |
| [Editorial Commit Voice Escalation](products/playbooks/editorial-commit-voice-escalation.md) | Solo builders running quarterly portfolio reviews; want a 30-second "alive or not?" signal | 2-5 hrs/portfolio review | $29 – $59 |

**Bundles**:

- [Lovable Resumption Trilogy](products/pricing-hypotheses.md#the-lovable-resumption-trilogy-99-launch-129-list) — 4 playbooks at $99 launch (saves 27-64% vs individual)
- [Multi-AI Workflow Pack](products/pricing-hypotheses.md#the-multi-ai-workflow-pack-129-launch-179-list) — 2 paid playbooks + 1 bonus meta-playbook at $129 launch

Full pricing rationale: [/products/pricing-hypotheses.md](products/pricing-hypotheses.md).

## How to buy

- **Gumroad** (primary): _link placeholder — launching soon_
- **LinkedIn / X**: follow `@ereztash` for launch announcements and weekly insight drops
- **Substack**: _link placeholder — newsletter coming with each playbook's source story_
- **Direct**: email for $100+ tier playbooks bundled with a 30-minute consult

Launch checklist (for me, the seller): [/products/launch-checklist.md](products/launch-checklist.md).

## Why this exists

Five repositories under `ereztash` represent five distinct stages of AI+human collaboration maturity — from the most disciplined (cor-sys with custom skills and anti-pattern logs) to the most abandoned (core-unified-consciousness with 100% bot-authored commits that stalled on day one). Hidden inside their git histories, PR patterns, and code is a body of workflow knowledge: what works, what fails, what generalizes.

**This repo extracts that knowledge into monetizable form.** Every insight is evidence-anchored to specific commits, files, or PRs (43 raw observations across 4 deep-dived repos plus a 5th absorbed-project profile). Every insight passes a 5-criterion monetization gate before being shipped as a playbook.

## Who this is for

- **Solo builders** who want a workflow that scales past the prototype phase
- **Indie hackers and consultants** integrating AI agents (Claude Code, Cursor, Codex, Lovable, v0.dev) into their development process
- **Small teams** wanting a vocabulary for AI-paired workflow patterns
- **Researchers** interested in human+AI collaboration patterns at the git-artifact level
- **Buyers** of the playbooks under [/products/playbooks/](products/playbooks/) — battle-tested workflow templates

## How it's organized (two layers, never duplicate)

### Claude-operational layer (machine-readable)
Dense, decision-tree style. Read by Claude every session.
- `CLAUDE.md` — Gate 0 protocol, quick rules
- `LOG.md` — environment, anti-patterns, session history
- `MEMORY.md` — current state index
- `skill.md` — 5 skills + 6 commands quick-ref
- `.claude/skills/*` — full skill definitions
- `.claude/commands/*` — full command definitions
- `pipelines/*` — execution protocols

### Human-narrative layer (storytelling)
Full reasoning, examples, customer framing. Read by buyers and by ereztash.
- `README.md` (this file) — front door
- `research/<repo>/timeline.md` — per-repo evolution stories
- `research/cross-repo/synthesis.md` — cross-repo narrative
- `products/playbooks/*` — productized insights
- `products/pricing-hypotheses.md` — monetization map
- `products/launch-checklist.md` — distribution-readiness checklist

## The 4 Dimensions

Insights are classified into one of:

1. **Claude → User** — how Claude communicates, paces, hands off
2. **User → Claude** — how the user prompts, scopes, supplies context
3. **Claude → Claude** — context management, multi-agent handoff, self-correction
4. **User → User** — the user's personal workflow leverage

Each dimension has its own MOC (Map of Content) under [/index/](index/).

## The Monetization Gate

An insight ships only if it passes 4 of 5 criteria:

1. **Reusable** — generalizes to a 6th repo not in the dataset
2. **Defensible** — non-obvious, would be paid for
3. **Time-saving** — prevents ≥1 hour of rework per session
4. **Encodable** — can become a skill/command/template
5. **Evidence-anchored** — observed in ≥2 of the 4 source repos

The gate has been applied to 12 candidates so far. 11 passed and shipped as distilled insights; 6 of those became full playbooks. The 6th distilled insight (`absorbed-rather-than-shipped`) is parked until a second-repo case appears.

## What's in this repository

- **6 playbooks** shipped under [/products/playbooks/](products/playbooks/)
- **1 meta-playbook** (AI Review Event Instrumentation) shipped as a bundle-only companion
- **11 distilled insights** under [/insights/](insights/) organized by dimension
- **4 deep-dive repo surveys** under [/research/<repo>/](research/) — cor-sys, groundstate-protocol, chess-mind-patterns, core-unified-consciousness
- **1 absorbed-repo mini-profile** ([CampaignCraft](research/cor-sys/campaigncraft-absorption-detail.md)) as the 5th-repo partial data point
- **1 cross-repo synthesis** at [/research/cross-repo/synthesis.md](research/cross-repo/synthesis.md) — H1-H5 hypothesis verdicts, the maturity ladder, the publish-button-satisfiability finding
- **1 self-application test** ([Maya hypothetical](research/self-application/maya-walkthrough.md)) verifying the system holds against a 6th-repo data shape
- **5 skills + 6 commands** under [/.claude/](.claude/) for re-running the analysis on new repos

## Roadmap

- [x] Phase 0 — Scaffold (commit `a648ff3`)
- [x] Phase 1 — Per-repo deep dive (4 repos, 43 observations)
- [x] Phase 2 — Cross-repo synthesis (17 promoted patterns, commit `a9fc349`)
- [x] Phase 3 — Skills/commands self-application infrastructure (5 skills, 6 commands)
- [x] Phase 4 — Monetization audit + playbook shipping (5 playbooks shipped)
- [x] Gap-closure round — 6th playbook + 6 distilled insights + CampaignCraft profile + launch checklist + self-application test (2026-05-12)
- [ ] Launch — Gumroad setup and first 30-day pricing refresh (next)

## Navigating this repo

- Want to **buy a playbook**? → [/products/playbooks/](products/playbooks/) (and see the Featured Playbooks table above)
- Want raw research? → [/research/](research/)
- Want polished insights by dimension? → [/insights/](insights/)
- Want to understand the workflow itself? → [/index/CLAUDE.md](index/CLAUDE.md)
- Want pricing? → [/products/pricing-hypotheses.md](products/pricing-hypotheses.md)
- Want launch sequence? → [/products/launch-checklist.md](products/launch-checklist.md)
