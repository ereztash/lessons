# CampaignCraft Absorption — Mini-Profile of the 5th Repo Data Point

> CampaignCraft was a standalone Vite/React project absorbed into COR-SYS as PR #16, commit `182a6b3f1214070c29e580aece24df1ea42eca46`, merged 2026-04-09 15:19 UTC. This file documents what we can recover about the absorbed project to treat it as a partial 5th-repo data point for cross-repo synthesis.

## Source data

- PR: `mcp__github__pull_request_read(owner='ereztash', repo='COR-SYS', pullNumber=16)`
- Commit: `mcp__github__get_commit(owner='ereztash', repo='COR-SYS', sha='182a6b3')`
- Files in HEAD: `src/app/(growth)/`, `src/app/api/growth/`, `src/lib/growth/`

## Original purpose (from PR body)

> "Complete integration of CampaignCraft (Vite/React) into COR-SYS (Next.js). CampaignCraft ceases to exist as a standalone project."

From the absorbed file taxonomy, CampaignCraft was a *growth-engine application* — a multi-page tool covering:

- A wizard flow (`src/app/(growth)/wizard/`)
- A differentiation analysis page (`src/app/(growth)/differentiate/`)
- A central hub dashboard (`src/app/(growth)/hub/`)
- Landing, pricing, plans, profile, retention, sales, dashboard sub-routes
- A `legacy/` route group preserving the Vite-era surface

The core domain artifacts in `src/lib/growth/`:

- `hebrewCopyOptimizer.ts` (17,967 bytes) — Hebrew-language copy optimization engine
- `israeliMarketCalendar.ts` (10,469 bytes) — Israeli market calendar (holidays, sales cycles)
- `industryBenchmarks.ts` (8,118 bytes) — industry benchmark data
- `colorSemantics.ts` (9,020 bytes) — color semantic mapping
- `whatsappTemplates.ts` (6,933 bytes) — WhatsApp marketing templates
- `toolRecommendations.ts` (6,535 bytes) — tool recommendation engine
- `adaptiveFormRules.ts`, `adaptiveTabRules.ts` — adaptive UI rule engines
- `glossary.ts`, `roiCalculator.ts`, `pricingTiers.ts`, `socialProofData.ts`, `smartDefaults.ts`, `textAdapter.ts`, `minimalFormDefaults.ts`, `differentiationFormRules.ts`

The domain reads as an Israeli-market-focused growth-marketing toolkit, likely B2B SaaS-oriented (judging by `pricingTiers.ts`, `roiCalculator.ts`, and the differentiation/positioning wizard flow). The Hebrew copy-optimization engine and the Israeli market calendar place the target audience clearly: small-to-medium Israeli businesses needing localized marketing support.

## Tech surface (from PR #16 body)

- **40+ growth engines** in `src/lib/engines/growth/` (blackboard architecture, 33 analysis engines, research orchestrator with sub-agents)
- **60 shadcn/ui components** merged
- **41 custom growth components**
- **27 Radix UI packages** (the foundational primitives for shadcn/ui)
- **react-query** for server-state caching
- **framer-motion** for animation
- **recharts** for charts
- **zod** for runtime validation
- **react-hook-form** for form state
- **Tailwind v4 @theme tokens** for shadcn/ui CSS variables

This is a *heavy* frontend surface — far beyond a Lovable-bootstrapped repo's defaults. The component-and-engine count suggests CampaignCraft was at Tier A in its own right before absorption, with substantial documentation and architectural intent.

## 10 Edge Functions → Next.js API routes

The PR body says 10 Supabase Edge Functions were converted to Next.js API routes under `src/app/api/growth/`. Inspecting the HEAD route folder, we see these 10 functions:

1. `agent-executor/` — agent orchestration entry point
2. `ai-coach/` — AI-coach inference endpoint
3. `create-checkout/` — Stripe checkout session creation
4. `differentiation-agent/` — sub-agent for differentiation analysis
5. `embed-content/` — vector-embed generation (likely OpenAI or Anthropic embeddings)
6. `generate-copy/` — copy-generation endpoint
7. `meta-token-exchange/` — Meta (Facebook) OAuth token exchange
8. `queue-processor/` — async-job processor
9. `research-agent/` — sub-agent for research orchestration
10. `stripe-webhook/` — Stripe webhook receiver

The stack reveals the production surface: Stripe billing, Meta API integration, agent orchestration with multiple specialized sub-agents (research, differentiation, coach), and a queue-processor for async work. This is a *commercial product*, not a prototype. The repo had monetization, third-party OAuth, and async-job infrastructure pre-absorption.

## 5 database migrations with `growth-` prefix

The PR body cites 5 migrations were copied with `growth-` prefix. We could not enumerate them at HEAD (the `supabase/migrations` path resolves to `src/lib/supabase/` at HEAD, suggesting the migrations may have been re-organized post-absorption). The fact of 5 schema-evolution checkpoints indicates CampaignCraft had a non-trivial data model — likely auth (Supabase Auth), user profiles, campaign-state tables, analytic events, and billing-state tables.

## 688/706 test pass rate

PR #16 body: "Build passes, 688/706 tests pass (44/48 test files)." That's an 18-test failure rate (~2.5%) and 4 test files (~8.3%) failing entirely. The PR was merged with this failure rate, suggesting:

1. The 18 failing tests were known to be platform-specific (Vite/jsdom assumptions that don't hold in Next.js/SSR).
2. The 4 failing test files were entirely Vite-specific (e.g., import.meta.env tests, Vite-specific build assertions).
3. The operator accepted the regression as a *known-debt artifact* of the absorption rather than blocking on a full green test run.

Without the specific failing test names we cannot enumerate, but the pattern (acceptable test-debt at the absorption boundary) is consistent with the COR-SYS "layering, not refactoring" stance observed in the chess-mind resumption (cor-sys@10:00, chess-mind@11:03).

## @ts-nocheck rationale

PR #16 body: "All growth module code uses @ts-nocheck (CC used strictNullChecks: false)." CampaignCraft's TypeScript config had `strictNullChecks: false`; COR-SYS uses the strict config. Rather than rewriting ~100+ files to satisfy strict null checks, the absorber chose to:

1. Mark every absorbed file with `// @ts-nocheck` at the top, telling TypeScript to skip the file entirely.
2. Defer the strict-null-check rewrite as a separate (likely never-shipped) task.
3. Ship the absorption with the *known debt* visible in the file headers.

This is identical to the test-debt acceptance pattern. The operator chose visible debt over delayed shipping. The `@ts-nocheck` markers are a *self-documenting tombstone* — any future Claude session can `git grep '@ts-nocheck'` and see the absorbed surface area instantly.

## Why this counts as the 5th repo data point

CampaignCraft was an independent project before absorption. Its pre-absorption state is recoverable from the PR diff (43,761 additions, 229 deletions, 282 changed files in one commit) and the file inventory at HEAD. We can score CampaignCraft on the 4-feature Tier classifier *as-of pre-absorption*:

| Feature | CampaignCraft (pre-absorption inferred) | Score |
|---------|-----------------------------------------|-------|
| Any non-template production dependency? | yes (Stripe, Meta API, Supabase, react-query, framer-motion, zod) | 1 |
| Any human commit ever? | yes (substantial codebase, not bot-only) | 1 |
| Any PR ever? | unknown (separate repo, not surveyed) | unknown |
| Any CLAUDE.md / docs/? | unknown — but the absorbed surface includes only code, no docs files were merged | 0 (provisional) |
| **Feature count** | **2-3/4** | **Tier A/B borderline** |

CampaignCraft is Tier B+ minimum based on the absorbed surface area, likely Tier A given the production-grade infrastructure (Stripe webhooks, OAuth, queue processor). It is the *only* observed case in the 5-repo set of an **absorbed-rather-than-shipped** outcome — the project did not abandon, did not continue independently, did not get archived; it *merged into a larger system* and ceased to exist as a standalone artifact.

This is a fundamentally different end-state from the four other repos:

- **cor-sys**: continues as managed system (Tier A, active).
- **groundstate-protocol**: continues as editorial brand surface (Tier B-functional-A, active).
- **chess-mind-patterns**: dormant after one resumption (Tier B, frozen).
- **core-unified-consciousness**: abandoned at publish (Tier C, abandoned).
- **CampaignCraft**: absorbed into a larger system (Tier A→A-merged, terminal-but-positive).

The absorption end-state is a 5th category that the 4-tier ladder doesn't capture. We propose adding it as a *terminal-positive* outcome distinct from Tier A active maintenance.

## New candidate pattern — absorbed-rather-than-shipped

Proposed addition to the patterns matrix:

```
| absorbed-rather-than-shipped | 3 | 0 | 0 | 0 | weak-1-repo (CampaignCraft via cor-sys) | No-but-conceptually-promotable | user-to-user |
```

The pattern: a domain-rich, production-adjacent project that *could* have shipped independently chose instead to be absorbed into a parent system. Mechanism: when the operator already maintains a Tier A system (cor-sys) and a related side-project (CampaignCraft) reaches Tier B+, the cost of independent maintenance (separate CI, separate deploy, separate docs, separate auth) exceeds the cost of absorption. Absorption is the *winning* end-state for related projects under a single operator.

The pattern cannot promote to the matrix at strength-2-repos because we only have one absorbed instance in the dataset. But it is a candidate for the parking lot with a clear note: *if a second observed absorption surfaces, promote*.

## Most-interesting findings (3-5)

1. **CampaignCraft had production-grade infrastructure (Stripe + Meta OAuth + queue processor + sub-agent orchestration) before absorption** — making it Tier A in its own right. This contradicts a naive reading of the absorption as "merging a prototype into a parent." The merge was Tier-A-into-Tier-A.

2. **The absorption commit accepted 18 failing tests + 4 failing test files + 100+ `@ts-nocheck` markers as visible debt** rather than blocking on a full clean merge. This is the "layering, not refactoring" pattern at absorption scale — the operator chose to ship the absorption with self-documenting debt over delaying the merge.

3. **The domain artifacts (`hebrewCopyOptimizer.ts`, `israeliMarketCalendar.ts`, `whatsappTemplates.ts`) reveal CampaignCraft's target audience (Israeli SMBs) and confirm the hebrew-bilingual-cognition-medium pattern at the application level** — this is not just the operator's documentation style; it is the *product surface*. The bilingual cognition extends from the operator's CLAUDE.md authoring into the deployed product itself.

4. **The 10 Edge Functions → Next.js API routes conversion is a one-shot platform migration** — Supabase Edge Functions (Deno runtime) and Next.js API routes (Node runtime) have meaningfully different request/response shapes, async patterns, and dependency models. Converting 10 functions in a single 43,761-line PR is aggressive; the test-debt pattern suggests the operator accepted partial-correctness as a tradeoff for one-shot completion.

5. **Absorption-rather-than-shipping is a new end-state** absent from the original 4-repo dataset. The 4-tier ladder (A managed, B resumed, C abandoned, plus Lovable-only Rung 0) does not capture this case. It should be added as a *terminal-positive* end-state to the synthesis.

## What CampaignCraft's profile adds to cross-repo synthesis

- **Confirms hebrew-bilingual-cognition-medium at the product surface**, not just the documentation surface (3rd-repo evidence at the product layer).
- **Adds a 5th end-state** (absorbed) to the maturity ladder.
- **Refines the four-feature tier classifier**: a Tier A repo with commercial deps (Stripe, OAuth) is distinguishable from a Tier A managed-system-without-revenue (cor-sys-as-internal-tool). The commercial-dep signature is a candidate sub-feature.
- **Provides a 3rd repo with Supabase as the BaaS layer** (cor-sys uses it too, and groundstate explicitly chose Web3Forms/Calendly to avoid it). The contrast sharpens the third-party-saas-replaces-backend pattern's boundary.

## Caveats

- We do not have CampaignCraft's git history before absorption. The PR diff is a single 43,761-line commit; everything before it is invisible to us.
- We do not know the exact 18 failing tests or the 4 failing test files.
- We do not know if CampaignCraft had its own PRs, issues, or `CLAUDE.md` — the absorption merged code, not coordination artifacts.
- The Tier classification (A/B borderline) is inferred from the absorbed surface, not from a direct survey of the original repo.

## Cross-references

- Source PR: `https://github.com/ereztash/COR-SYS/pull/16`
- Source commit: `https://github.com/ereztash/COR-SYS/commit/182a6b3f1214070c29e580aece24df1ea42eca46`
- cor-sys observation: `/research/cor-sys/extracted-insights.md` § cor-sys@10:10 (CampaignCraft absorption noted at the meta level)
- Patterns matrix: `/research/cross-repo/patterns-matrix.md` (new row proposed: `absorbed-rather-than-shipped`)
- Synthesis: `/research/cross-repo/synthesis.md` (5th end-state to be added in a future revision)
