# Lessons — A Repository of Monetizable Workflow Insights

> Battle-tested playbooks for solo AI-paired builders, extracted from cross-repo analysis of real Lovable + Claude Code + Cursor projects. Every insight is evidence-anchored. Every playbook passes a 5-criterion monetization gate.

**Latest update**: 2026-05-13 — Phase 8 complete: Genesis Mode CLI prototype built and verified. Compile pipeline runs kolzchut fixture to sharpness 100/100. Stability test infrastructure live (frozen prompt v1.0.0, Jaccard + stdDev metrics).

## Featured Playbooks

| Playbook | Target buyer | Hours saved | Price |
|----------|--------------|-------------|-------|
| [Publish-Button Intent Triage](products/playbooks/publish-button-intent-triage.md) | Solo AI-paired builders with ≥3 Lovable/Bolt/v0 repos and ≥1 abandoned | 2-6 hrs/misallocated repo | $39 – $79 |
| [Four-Feature Tier Classifier](products/playbooks/four-feature-tier-classifier.md) | Solo builders with portfolios of 5+ LLM-tool-paired repos | 1-3 hrs/portfolio review | $29 – $59 |
| [Dual-AI-Surface Workflow](products/playbooks/dual-ai-surface-workflow.md) | Solo builders paying for BOTH a visual-preview AI and a code-writing AI | 3-8 hrs/project | $49 – $99 |
| [AI Cross-Review Setup](products/playbooks/ai-cross-review-setup.md) | Solo builders shipping production-adjacent code with a single AI | 2-4 hrs/caught bug | $59 – $129 |
| [Resumer Day Prep](products/playbooks/resumer-day-prep.md) | Solo Lovable-builders on month 2+ with dormant repos | 1-3 hrs/resumption attempt | $39 – $79 |
| [Editorial Commit Voice Escalation](products/playbooks/editorial-commit-voice-escalation.md) | Solo builders running quarterly portfolio reviews | 2-5 hrs/portfolio review | $29 – $59 |

**Bundles**:
- [Lovable Resumption Trilogy](products/pricing-hypotheses.md#the-lovable-resumption-trilogy-99-launch-129-list) — 4 playbooks at $99 launch
- [Multi-AI Workflow Pack](products/pricing-hypotheses.md#the-multi-ai-workflow-pack-129-launch-179-list) — 2 paid playbooks + bonus at $129 launch

Full pricing rationale: [/products/pricing-hypotheses.md](products/pricing-hypotheses.md).

## How to buy

- **Gumroad** (primary): _link placeholder — launching soon_
- **LinkedIn / X**: follow `@ereztash` for launch announcements and weekly insight drops
- **Substack**: _link placeholder — newsletter coming with each playbook’s source story_
- **Direct**: email for $100+ tier playbooks bundled with a 30-minute consult

Launch checklist: [/products/launch-checklist.md](products/launch-checklist.md).

## Why this exists

Twenty-five repositories under `ereztash` span the full spectrum of AI+human collaboration maturity — from the most disciplined (cor-sys, ampaign-craft with hundreds of PRs, custom skills, anti-pattern logs) to the most abandoned (Lovable-only projects that stalled on day one). Hidden inside their git histories is a body of workflow knowledge: what works, what fails, what generalizes.

**This repo extracts that knowledge into monetizable form** — first as playbooks, then as a SaaS product. Every insight is evidence-anchored. Every playbook passes a 5-criterion monetization gate.

## Who this is for

- **Solo builders** who want a workflow that scales past the prototype phase
- **Indie hackers and consultants** integrating AI agents (Claude Code, Cursor, Codex, Lovable, v0.dev) into their development process
- **Small teams** wanting a vocabulary for AI-paired workflow patterns
- **Researchers** interested in human+AI collaboration patterns at the git-artifact level
- **Buyers** of the playbooks under [/products/playbooks/](products/playbooks/)

## Repo structure

```
lessons/
├── README.md                    ← you are here
├── CLAUDE.md                    — Gate 0 protocol + quick rules
├── LOG.md                       — environment, anti-patterns, session history
├── MEMORY.md                    — current state index
├── skill.md                     — 5 skills + 6 commands quick-ref
├── .claude/                     — full skill + command definitions
├── research/
│   ├── cor-sys/                 — deep-dive: cor-sys repo
│   ├── groundstate-protocol/    — deep-dive: groundstate-protocol repo
│   ├── chess-mind-patterns/     — deep-dive: chess-mind-patterns repo
│   ├── core-unified-consciousness/
│   ├── cross-repo/
│   │   ├── patterns-matrix.md   — 35-row matrix, 17 promoted patterns
│   │   └── synthesis.md         — H1-H5 verdicts at n=4
│   ├── portfolio-scan/
│   │   ├── 26-repos.md          — all 25 repos classified (Tier A-D)
│   │   └── hypothesis-validation.md  — H1-H8 verdicts at n=25
│   └── self-application/
│       └── maya-walkthrough.md  — self-application test on 6th repo
├── products/
│   ├── playbooks/               — 6 shipped playbooks
│   ├── pricing-hypotheses.md
│   └── launch-checklist.md
├── insights/                    — 11 distilled insights by dimension
├── index/                       — MOC per dimension
├── pipelines/                   — execution protocols
└── saas/
    ├── spec/                    — 13-file product spec (incl. Genesis Mode)
    │   ├── 00-README.md
    │   ├── 01-product-thesis.md
    │   ├── 02-product-spec.md
    │   ├── 02b-genesis-mode.md  — bidirectional classifier + compiler model
    │   ├── 03-architecture.md
    │   ├── 04-pricing.md
    │   ├── 05-gtm-90day.md
    │   ├── 06-target-audience.md
    │   ├── 07-moat.md
    │   ├── 08-unit-economics.md
    │   ├── 09-risk-register.md
    │   ├── 10-mvp-roadmap.md
    │   └── 11-conviction-statement.md
    └── app/                     — Next.js 14 MVP
        ├── src/
        │   ├── app/             — App Router (landing, auth, dashboard, repo detail)
        │   ├── components/      — TierBadge, FeatureChecks, PortfolioDashboard
        │   └── lib/
        │       ├── classifier/  — 4-feature classifier (pure TypeScript)
        │       ├── github/      — Octokit scanner (batch 6 repos/call)
        │       └── supabase/    — server + browser clients
        ├── scripts/genesis/     — Genesis Mode CLI (forward compiler)
        │   ├── types.ts         — ProjectSpec IR + ValidationReport types
        │   ├── elicitation-questions.ts  — 18 domain-discovery questions (5 dims)
        │   ├── elicitation-prompt.ts     — frozen system prompt v1.0.0
        │   ├── elicitor.ts      — fixture loader + LLM router
        │   ├── llm-elicitor.ts  — Anthropic SDK call (temperature=0)
        │   ├── validator.ts     — 8 compile-time blockers (E001–E008)
        │   ├── compiler.ts      — validate → renderAll gate
        │   ├── templates.ts     — 7 file renderers (CLAUDE, LOG, README, …)
        │   ├── stability-test.ts — N-run Jaccard + stdDev reliability check
        │   ├── index.ts         — CLI entry (--domain / --intent / --out)
        │   └── domains/
        │       └── kolzchut.ts  — Hebrew civic-rights fixture (7 entities, 7 invariants)
        └── supabase/
            └── migrations/      — initial schema (profiles, repo_scans, RLS)
```

## Hypothesis tracker

| ID | Hypothesis | n=4 | n=25 |
|----|-----------|-----|------|
| H1 | Lovable-heavy repos → no LOG.md, no PR discipline | Confirmed | **Extended**: 100% Lovable-only repos score 0/4 |
| H2 | Publish-button satisfiability predicts abandonment | Confirmed | **Extended**: strongest single predictor of Tier C/D |
| H3 | LOG.md anti-pattern lists drive repo health | Refined | **Refined**: bot-generated LOG.md doesn’t count |
| H4 | AI tool diversity correlates with tier | Confirmed | **Confirmed**: Tier A avg 3.2 tools vs Tier D avg 1.0 |
| H5 | Editorial commit voice predicts continued health | Confirmed | **Confirmed**: all 6 Tier A repos show escalating density |
| H6 | Claude-batch operator-absent = distinct failure mode | _(new)_ | **Confirmed** (keepath: full monorepo built, never resumed) |
| H7 | Tier D repos not recoverable via existing playbooks | _(new)_ | **Confirmed** (9/25 repos need pre-filter) |
| H8 | Age predicts dormancy | _(new)_ | **Confirmed** (100% of pre-2026 repos dormant) |

Full verdicts: [research/portfolio-scan/hypothesis-validation.md](research/portfolio-scan/hypothesis-validation.md)

## Portfolio tier distribution (n=25)

| Tier | Count | % | Repos |
|------|-------|---|-------|
| **A** — healthy | 6 | 24% | ampaign-craft, COR-SYS, groundstate-protocol, lessons, Algo-trade, CandiApp |
| **B** — partial | 9 | 36% | cor-sys, brain-healer-hub, org-fortify, kolzchut, pilot, keepath, hr-smb, benchmark-ats, nextjs-ai-chatbot |
| **C** — dormant | 1 | 4% | focuos |
| **D** — non-software | 9 | 36% | onto-trade, masse-agent, metatrader, ex2, nuxtjs-boilerplate, … |

Full table: [research/portfolio-scan/26-repos.md](research/portfolio-scan/26-repos.md)

## SaaS product: RepoHealth

The methodology in this repo is now productized as a hosted tool.

**Spec** (13 files in [saas/spec/](saas/spec/)):
- Product thesis, full feature spec, architecture, pricing, 90-day GTM, ICP, moat, unit economics, risk register, MVP roadmap, conviction statement, Genesis Mode spec

**MVP** ([saas/app/](saas/app/)) — Next.js 14 + Supabase + Octokit:
- GitHub OAuth → scan all repos → classify with 4-feature scorer → portfolio dashboard
- Repo detail: Tier badge, F1–F4 evidence, dormancy diagnosis, AI tool attribution, playbook prescription
- Free / Pro ($19/mo) / Team ($49/mo) tiers
- Supabase Postgres with RLS; schema in `supabase/migrations/`

To run locally: see [saas/app/README.md](saas/app/README.md).

### Genesis Mode — the forward compiler

The same 4-feature classifier runs in two directions:

| Direction | Mode | What it does |
|-----------|------|--------------|
| Reverse (existing) | RepoHealth scan | Measures F1–F4 post-hoc on any repo |
| **Forward (new)** | **Genesis compile** | Enforces F1–F4 ex-ante from a paragraph of intent |

Genesis CLI ([saas/app/scripts/genesis/](saas/app/scripts/genesis/)):
- **Elicitation** — 18 questions across 5 dimensions extract a `ProjectSpec` IR from the domain
- **Validator** — 8 compile-time blockers (E001–E008) reject generic output at build time
- **Compiler** — IR → 7 files: `CLAUDE.md`, `LOG.md`, `README.md`, `docs/spec.md`, `ontology.json`, `tier-a.contract.yml`, `package.json`
- **Stability test** — runs LLM elicitation N times, measures pairwise entity Jaccard + sharpness stdDev; exits 0 only if Jaccard ≥ 80% and stdDev ≤ 5 (publishable threshold)

Verified: `npx tsx scripts/genesis/index.ts -d kolzchut -o /tmp/kolzchut` → **Sharpness 100/100**, 7 files written.

Spec: [saas/spec/02b-genesis-mode.md](saas/spec/02b-genesis-mode.md)

## Roadmap

- [x] Phase 0 — Scaffold
- [x] Phase 1 — Per-repo deep dive (4 repos, 43 observations)
- [x] Phase 2 — Cross-repo synthesis (17 promoted patterns)
- [x] Phase 3 — Skills/commands infrastructure (5 skills, 6 commands)
- [x] Phase 4 — Monetization audit + playbook shipping (6 playbooks)
- [x] Gap-closure — launch checklist, self-application test, CampaignCraft profile
- [x] Phase 5 — Portfolio scan (n=25, H6–H8, Tier D discovery)
- [x] Phase 6 — SaaS spec (13-file product spec grounded in n=25 data)
- [x] Phase 7 — MVP build (Next.js classifier + dashboard + auth + Supabase)
- [x] Phase 8 — Genesis Mode CLI (bidirectional classifier, LLM elicitor, stability test)
- [ ] Launch — Gumroad setup, deploy to Vercel, first 30-day pricing refresh
- [ ] Research — run stability test across 3+ domains, publish inter-rater reliability report

## Navigate this repo

| Goal | Go to |
|------|-------|
| Buy a playbook | [/products/playbooks/](products/playbooks/) |
| Raw research (n=4) | [/research/cross-repo/synthesis.md](research/cross-repo/synthesis.md) |
| Full portfolio scan (n=25) | [/research/portfolio-scan/](research/portfolio-scan/) |
| Insights by dimension | [/insights/](insights/) |
| Pricing | [/products/pricing-hypotheses.md](products/pricing-hypotheses.md) |
| Launch checklist | [/products/launch-checklist.md](products/launch-checklist.md) |
| SaaS product spec | [/saas/spec/](saas/spec/) |
| Genesis Mode spec | [/saas/spec/02b-genesis-mode.md](saas/spec/02b-genesis-mode.md) |
| Genesis Mode CLI | [/saas/app/scripts/genesis/](saas/app/scripts/genesis/) |
| Run the MVP locally | [/saas/app/README.md](saas/app/README.md) |
