# Pricing

## Tiers

### Free
**$0 / month**

- Scan public repos only
- Portfolio table (all repos, Tier badge visible)
- Repo detail: dormancy diagnosis (3 repos/month)
- AI tool attribution
- Playbook names + one-sentence descriptions
- No alerts, no export, no commit voice score

**Goal**: low-friction entry. Get the tier table in front of the user before asking for money.

---

### Pro
**$19 / month** (annual: $15/mo, billed $180/year)

Everything in Free, plus:
- Scan private repos
- Unlimited repo detail views
- Full playbook prescriptions in-app (all 6 playbooks)
- Commit voice score (H5 proxy)
- Weekly digest email
- Dormancy alerts (30-day silence on Tier B repos)
- CSV export

**Goal**: the "I need to act on this" tier. Pricing anchored at 1/2 the cost of the cheapest standalone playbook ($29).

---

### Team
**$49 / month** (annual: $39/mo, billed $468/year)

Everything in Pro, plus:
- Up to 5 team members (shared portfolio view)
- API access (REST endpoints for tier scores)
- Slack integration (dormancy alerts to channel)
- Priority support

**Goal**: agencies, micro-teams. Not the MVP focus — ship in Month 3.

---

## One-time playbook purchases (standalone)

Mirrored from [products/pricing-hypotheses.md](../../products/pricing-hypotheses.md):

| Playbook | Launch | List |
|----------|--------|------|
| Publish-Button Intent Triage | $39 | $79 |
| Four-Feature Tier Classifier | $29 | $59 |
| Dual-AI-Surface Workflow | $49 | $99 |
| AI Cross-Review Setup | $59 | $129 |
| Resumer Day Prep | $39 | $79 |
| Editorial Commit Voice Escalation | $29 | $59 |

Playbook purchases unlock the playbook in-app AND get a PDF download link. Pro subscribers get all 6 included.

## Upgrade triggers (in-product)

1. **Scan private repos** — shown when user has ≥1 private repo and tries to scan it
2. **4th repo detail** — free tier locks after 3; paywall with upgrade CTA
3. **Full playbook** — blurred below the fold on free; "Unlock for $X or go Pro for $19/mo"
4. **CSV export** — CTA on dashboard export button
5. **Dormancy alert setup** — shown when diagnosis = dormant Tier B

## Pricing rationale

**Why $19 (not $29 or $9)?**

The ICP (solo AI-paired builder, 5–25 repos) already pays:
- Lovable: $25–99/mo
- Cursor: $20/mo
- Claude Pro: $20/mo
- Vercel Pro: $20/mo

$19 is "another tool subscription" at the same price point as Claude Pro. Below $29 (cheapest standalone playbook), so Pro feels like a deal. Above $9 ("toy") to signal serious tooling.

**Why annual discount?**

$15/mo annual ($180/year) vs $19/mo monthly creates 3× incentive for annual: saves $48/year. Annual customers have 3× higher LTV and churn half as fast.

## Bundle logic

- **Lovable Resumption Trilogy** ($99 launch): Publish-Button + Four-Feature + Resumer Day Prep + AI Cross-Review — 4 playbooks bundled
- **Multi-AI Workflow Pack** ($129 launch): Dual-AI-Surface + AI Cross-Review + bonus meta-playbook

Bundles are Gumroad-only at launch; integrated into in-app purchase flow in Month 2.

## Revenue model

- **Primary**: monthly SaaS subscriptions (Pro tier)
- **Secondary**: one-time playbook purchases (Gumroad + in-app)
- **Tertiary**: Team tier annual contracts (Month 3+)

Target MRR at 6 months: $5,000 (263 Pro subscribers at $19/mo)
