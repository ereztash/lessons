# Prompt 04 — SaaS Product Spec from Validated Data

> Paste this AFTER Prompt 03 completed and `hypothesis-validation.md` confirms or refines the thesis.

---

Write the complete SaaS product spec at `/saas/spec/` in the lessons repo. This document set takes the project from "interesting research" to "100% conviction, building Monday."

## CRITICAL CONSTRAINT: thesis honesty

First, read `research/portfolio-scan/hypothesis-validation.md`. Based on the n=26 verdicts:

- **If H1 + H2 both CONFIRMED**: full SaaS spec, conviction-high tone, build immediately.
- **If H1 or H2 REFINED**: full SaaS spec with refinements baked in; conviction tone is honest about scope changes.
- **If H1 or H2 REFUTED**: write the spec for a PIVOTED product. Maybe it's not portfolio-triage SaaS; maybe it's [different product the data supports]. Conviction-statement section explicitly acknowledges the pivot.

Do NOT write the spec as if H1+H2 are confirmed when they aren't. Honesty is the moat.

## Inputs (read fully)

- `research/portfolio-scan/26-repos.md`
- `research/portfolio-scan/hypothesis-validation.md`
- `products/playbooks/*` (all 6 playbooks — the IP)
- `products/pricing-hypotheses.md`
- `products/launch-checklist.md`
- `saas/scanner/README.md` + scanner code (existing MVP)
- `research/cross-repo/synthesis.md`

## Deliverables

One commit containing these 12 files under `/saas/spec/`:

### `00-README.md` (~1 KB)
Index of the spec. Order in which to read. Time-to-read per file. "Start here if you're: ereztash | investor | technical co-founder | early hire."

### `01-product-thesis.md` (~2 KB)
- The 1-paragraph elevator pitch
- "Why now" — the AI-tooling explosion in 2024-2026 makes portfolio triage urgent
- The audience pain in 1 paragraph (drawn from n=26 data: most builders have >20 repos, can't decide which to revive)
- The 1-sentence promise: "Scan your AI-built repo portfolio in 11 minutes. Get a triage report worth 30+ hours of decisions."

### `02-product-spec.md` (~8-10 KB)
- User flows: signup → GitHub OAuth → first scan → report → upgrade prompt
- Every screen: landing page, signup, onboarding, dashboard, repo-detail, settings, billing, weekly-digest email
- Every feature: tier classification, publish-button score, resumption recommendations, AI tool diversity insights, editorial voice tracker, embedded playbook viewer
- Notification rules: weekly digest (Monday 8am user-local-time), real-time alerts (when a repo transitions tier), upgrade prompts (at scan 4 of free tier)
- Empty states + error states
- Mobile experience
- Search + filter on dashboard
- Export: PDF report (for solo customers), CSV (for team customers)

### `03-architecture.md` (~4-5 KB)
- Tech stack (anchor to cor-sys's stack):
  - Frontend: Next.js 16 App Router + Tailwind v4 + shadcn/ui
  - Backend: Next.js API routes
  - Auth: Supabase Auth with GitHub OAuth provider
  - DB: Supabase Postgres
  - Billing: Stripe
  - Email: Resend
  - Hosting: Vercel
- Data model:
  - `users` (id, email, github_username, subscription_tier, created_at)
  - `scans` (id, user_id, status, started_at, completed_at)
  - `repo_snapshots` (id, scan_id, repo_name, tier, four_feature_score, publish_button_score, resumption_readiness_score, ai_tools, recommendation, hours_to_act)
  - `tier_history` (id, user_id, repo_name, tier, scanned_at) — for longitudinal trends
  - `digest_sends` (id, user_id, sent_at, content_summary)
- GitHub API integration: Octokit, OAuth scope `repo` + `read:user`, rate-limit handling (5000/hr/user)
- Background scan execution: Vercel cron OR Supabase Edge Functions OR Inngest
- Caching strategy: 6-hour cache per scan; invalidate on `push` webhook (Supabase function)

### `04-pricing.md` (~3 KB)
For each tier:
- **Free**: 3 repos, weekly refresh manual-trigger only, no email digest, no recommendations history. Goal: convert via upgrade prompt after first useful scan.
- **Solo — $19/mo or $190/yr**: unlimited repos, daily refresh, weekly digest, recommendations history (90 days), all playbooks embedded, CSV export.
- **Team — $79/mo per 5 seats**: everything in Solo + shared portfolio view + Slack integration + roles (admin/member) + retention (1 year).
- **Enterprise — $299+/mo**: custom retention, SSO, multi-org, white-label option, on-demand consulting.

Value metric: REPOS SCANNED PER MONTH. Justification: aligns with customer's portfolio growth.

Trial: 14-day Solo trial, no credit card required. Upgrade prompt at day 10 + day 13 + day 14.

Expansion triggers: adding 4th repo on Free → Solo CTA; team member invited → Team CTA.

Discounts: launch promo (50% off first 3 months for first 50 customers); annual plan saves 17% (= 2 free months).

### `05-gtm-90day.md` (~6 KB)
Week-by-week deliverables. Each week has: theme, 3-5 specific actions, success metric.

- **Week 1 (Launch)**: Publish 6 playbooks as free PDFs on Gumroad with CTA "Get your portfolio scanned free". LinkedIn post per playbook. Reach 100 LinkedIn impressions, 10 PDF downloads, 3 sign-ups.
- **Week 2 (Community seeding)**: Post in Lovable Discord #showcase, Bolt.new Discord, v0.dev Discord, Cursor Discord. One post per community per week. Goal: 30 sign-ups.
- **Week 3-4 (Content cadence)**: Daily LinkedIn post about portfolio triage. Weekly Substack issue. Goal: 100 free-tier users.
- **Week 5-8 (Conversion focus)**: Optimize the upgrade flow. A/B test trial length. Add testimonials. Goal: 15 paying Solo customers ($285 MRR).
- **Week 9-12 (Team tier launch)**: Outbound to small AI-tooling teams (Lovable, Bolt, v0 customer success channels). Goal: 3 Team accounts ($237 MRR added, total $522 MRR).
- **Week 13 (Milestone)**: 50 paying customers, $1000 MRR, decide on hire #1 (likely DevRel or growth marketer).

### `06-target-audience.md` (~3 KB)
3 ICPs with sizing + acquisition channel:

- **ICP1 — Solo Lovable/Bolt/v0 builder**: 1-3 yrs tenure, 10-30 repos, $50-150K income. Size estimate: 50K-100K worldwide (based on Lovable + Bolt + v0 user counts). Channel: Discord + LinkedIn + Substack.
- **ICP2 — Solo Cursor / Claude Code builder**: senior IC moonlighting on side projects, 5-20 repos. Size estimate: 30K-50K. Channel: HackerNews + Twitter + LinkedIn.
- **ICP3 — Small AI-tooling team**: 2-5 person AI consultancy or studio, shared portfolio. Size estimate: 5K-10K teams. Channel: founder LinkedIn + Twitter + Y Combinator forum.

Total addressable: ~100K solo + 10K teams = TAM ~$50M at $25/mo blended ARPU.

### `07-moat.md` (~3 KB)
- **Proprietary classifier**: Four-Feature + Publish-Button + Resumption Readiness scores. Research-backed (n=26 portfolios studied). Anyone can copy the names; only ereztash has the validated weights and edge-case handling.
- **Personal compounding dataset**: every customer's scan adds anonymized data to the classifier training set (with consent). Network effect: classifier accuracy improves with more customers.
- **Brand**: ereztash becomes "the portfolio triage person" in the AI builder community. Substack + LinkedIn presence.
- **Switching cost**: scan history accumulates. After 6 months, customer has 26 weeks of tier-history per repo. Hard to leave.
- **Bundled IP**: 6 playbooks (initial $215-$445 retail) included in Solo+ subscription = strong perceived value.

### `08-unit-economics.md` (~3 KB)
- CAC (estimated, per channel):
  - LinkedIn organic: $0 direct, ~5 hours/post × 6 posts to first customer = ~$300 "founder-time"
  - Substack: similar
  - Paid (deferred to month 6+): $30-50 per Solo customer estimated
- LTV (Solo $19/mo): assuming 12-month median retention, LTV = $228 gross; $205 net after Stripe fees
- LTV/CAC: 4-6x via organic; 1-2x via paid (paid is unprofitable until brand established)
- Gross margin: 88% (Vercel + Supabase + GitHub API cost ~$2/customer/mo; Stripe 3%; Resend negligible)
- Payback period: 1-2 months via organic, 4-6 months via paid
- Operating cost (founder-only): $200/mo infra + $0 salary = sustainable at 50 Solo customers ($1000 MRR) for break-even

### `09-risk-register.md` (~4 KB)
For each risk: probability (low/med/high), impact (low/med/high), mitigation, kill-switch:

- **GitHub API breaking change**: low / high / use stable Octokit + monitor changelog / 6-month migration runway
- **Lovable / Bolt / v0 build their own portfolio tool**: med / high / move fast, build moat via dataset; pivot to cross-vendor neutrality if displaced
- **AI-builder market plateaus**: low / med / diversify to non-AI code triage; broaden to GitHub-portfolio-triage for any solo dev
- **Audience doesn't perceive pain**: med / high / launch with free tier + free playbooks; if Week 4 has <100 free users, pivot positioning
- **Pricing power weak**: med / med / start Solo high ($19), add discount tiers; collect willingness-to-pay survey at signup
- **Founder burnout**: med / high / hire #1 at $1k MRR; raise small angel round if needed for hire #2 at $5k MRR
- **Privacy concerns about scanning private repos**: high / high / clear data policy + SOC2-track from month 6; never store code, only metadata

Kill-switch: if Week 12 has <30 paying customers AND no clear inflection trajectory, sunset and document learnings.

### `10-mvp-roadmap.md` (~5 KB)
Day-by-day for 21 days, Day 1 = decision to build:

- Day 1-2: Vercel + Supabase + Stripe + Resend accounts. Domain. Repo init.
- Day 3-4: Auth (Supabase Auth + GitHub OAuth). Landing page.
- Day 5-7: Scanner integration (import from /saas/scanner/, run server-side, store in Supabase).
- Day 8-10: Dashboard. Repo-detail page. Tier badges. Resumption recs.
- Day 11-13: Stripe billing (subscription tier sync). Trial mechanics.
- Day 14-16: Weekly digest email (Resend). Cron job (Vercel cron or Inngest).
- Day 17-19: Polish (loading states, empty states, mobile). Settings page. Cancel flow.
- Day 20: Test E2E. First scan against ereztash's 26 repos as smoke test.
- Day 21: LAUNCH — first LinkedIn post + Gumroad PDFs + free-tier signups open.

Deliverable for the prior Prompt 05 ("MVP build"): the code in `/saas/app/` matches this roadmap.

### `11-conviction-statement.md` (~2 KB)
The honest bet. Two sections:

**Why I'd bet 6 months on this (5-6 reasons, evidence-anchored)**
- The n=26 validation shows H1 + H2 [hold / refined / refuted — use real verdict]
- The audience is verifiable on Discord (Lovable has 50K+ members in May 2026)
- The classifier is research-IP, not generic; defensible
- The build cost is low (3 weeks solo with Claude Code, ~$200 in infra)
- The pricing model is proven (SaaS, well-understood)
- The founder has personal need (the 26 repos prove the use-case is real)

**Where conviction is incomplete (residual doubt)**
- True market validation requires real sales; pricing power is theoretical
- Distribution capacity is unclear (founder's LinkedIn audience size matters)
- Competitor reaction is unknown (will Lovable build this in-house?)

**The bet**: 6 months of evenings, $1000 in tools + ads, target 50 paying customers by month 6. If achieved → quit day job and go full time. If not → sunset and keep playbooks live for passive income.

## Quality bar

- Every number cites a source (n=26 data, public benchmarks, or explicitly labeled "assumption pending validation")
- No hand-waving. "Sell to AI builders" is not GTM; "Post in Lovable Discord #showcase every Friday with one free playbook + one free portfolio scan" is GTM
- Be specific in pricing rationale; "hours-saved * $50/hr = $X" is a real calculation, not vibes
- Conviction-statement explicitly distinguishes evidence from hope

## Delivery

Single `mcp__github__push_files` call. Retry up to 4 times.

Report in chat <500 words:
- Commit SHA
- 1-paragraph conviction summary (would the founder build this Monday?)
- 3 strongest reasons FOR
- 2 strongest reasons AGAINST
- The single most important assumption that still needs validation

End of Prompt 04.
