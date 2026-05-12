# SaaS Spec — RepoHealth

> AI-repo health scanner for solo builders.
> Grounded in n=25 portfolio scan. Spec written 2026-05-12.

## File index

| File | Contents |
|------|----------|
| [01-product-thesis.md](01-product-thesis.md) | The core bet: one sentence, three risks, one belief |
| [02-product-spec.md](02-product-spec.md) | Feature spec: surfaces, flows, data model |
| [03-architecture.md](03-architecture.md) | Technical stack and data pipeline |
| [04-pricing.md](04-pricing.md) | Pricing tiers, upgrade triggers, bundle logic |
| [05-gtm-90day.md](05-gtm-90day.md) | 90-day go-to-market sequence |
| [06-target-audience.md](06-target-audience.md) | ICP definition: who pays, who churns |
| [07-moat.md](07-moat.md) | Competitive moat and defensibility |
| [08-unit-economics.md](08-unit-economics.md) | CAC, LTV, payback, break-even |
| [09-risk-register.md](09-risk-register.md) | Top 10 risks with mitigations |
| [10-mvp-roadmap.md](10-mvp-roadmap.md) | Phased MVP scope (Week 1 → 12) |
| [11-conviction-statement.md](11-conviction-statement.md) | Honest signal vs. noise split |

## One-line pitch

**RepoHealth** scans your GitHub portfolio, scores every repo with the 4-feature tier classifier, explains *why* repos went dormant, and prescribes the exact playbook to revive or retire each one — in 60 seconds.

## Evidence base

This spec is grounded in:
- 25-repo portfolio scan ([research/portfolio-scan/26-repos.md](../research/portfolio-scan/26-repos.md))
- 8 confirmed hypotheses ([research/portfolio-scan/hypothesis-validation.md](../research/portfolio-scan/hypothesis-validation.md))
- 6 shipped playbooks ([products/playbooks/](../products/playbooks/))
- 17 promoted cross-repo patterns ([research/cross-repo/patterns-matrix.md](../research/cross-repo/patterns-matrix.md))

## Build location

MVP source: [../app/](../app/) (Next.js 14, Supabase, GitHub OAuth)
