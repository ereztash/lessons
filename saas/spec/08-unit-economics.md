# Unit Economics

## Assumptions

| Parameter | Value | Source |
|-----------|-------|--------|
| Pro plan price | $19/mo | Pricing spec |
| Annual plan price | $180/yr ($15/mo) | Pricing spec |
| Monthly/annual split | 60% monthly / 40% annual | Typical B2C SaaS |
| Free→Pro CVR | 15% | Conservative; similar tools 10–20% |
| Monthly churn (Pro) | 3% | Typical indie SaaS B2C |
| Annual churn (annual plan) | 20% | Typical B2C annual |
| Blended ARPU | $17.20/mo | 0.6 × $19 + 0.4 × $15 |
| CAC (organic/content) | $0 | Build-in-public, no paid ads at launch |
| CAC (paid, Month 4+) | $40 | Estimated LinkedIn/X retargeting |
| Stripe fees | 2.9% + $0.30 | Standard |

---

## LTV calculation

**Monthly plan customer**:
- Average lifespan: 1 / 3% churn = 33 months
- Gross LTV: 33 × $19 = $627
- Stripe net: 33 × $18.15 = $599

**Annual plan customer**:
- Average lifespan: 1 / (20%/12) churn = 60 months
- Gross LTV: 60 × $15 = $900
- Stripe net: 60 × $14.36 = $862

**Blended LTV**: 0.6 × $599 + 0.4 × $862 = $704

---

## CAC and payback

**At launch (organic only)**:
- CAC: ~$0 (content + warm network)
- LTV:CAC ratio: infinite (practically)
- Payback period: 0 months

**At scale (blended organic + paid)**:
- CAC: $40 (estimated)
- LTV:CAC ratio: $704 / $40 = 17.6× (excellent; threshold is 3×)
- Payback period: $40 / $17.20 = 2.3 months

---

## Break-even

**Monthly fixed costs (MVP)**:

| Cost | Monthly |
|------|----------|
| Vercel Pro | $20 |
| Supabase Pro | $25 |
| Resend (email) | $20 |
| Domain + misc | $10 |
| **Total** | **$75** |

**Break-even subscriber count**: $75 / $17.20 = **5 Pro subscribers**

Break-even is achievable in Week 2 of launch if warm-network outreach converts 5 users. Infrastructure cost is negligible at this scale.

---

## MRR targets

| Month | Pro subscribers | Team subscribers | Gumroad sales | MRR | Cumulative revenue |
|-------|----------------|-----------------|---------------|-----|-------------------|
| 1 | 5 | 0 | 10 × avg $35 | $95 | $445 |
| 2 | 25 | 0 | 30 × avg $35 | $475 | $2,020 |
| 3 | 100 | 5 | 60 × avg $35 | $2,145 | $6,580 |
| 6 | 263 | 15 | 100 × avg $35 | $5,742 | $32,000 |
| 12 | 500 | 30 | 150 × avg $35 | $11,000 | $100,000 |

**Year 1 revenue target**: $100,000 ARR  
**Year 1 net profit** (after ~$5K infra + $0 payroll): ~$95,000

---

## Sensitivity analysis

| Scenario | CVR | Churn | MRR at Month 6 |
|----------|-----|-------|------------------|
| Bear | 5% | 6% | $1,200 |
| Base | 15% | 3% | $5,742 |
| Bull | 25% | 1.5% | $12,000 |

Even the bear case ($1,200 MRR) is profitable given $75/mo fixed costs. The product doesn't require venture scale to be worthwhile.

---

## One-time playbook revenue (separate P&L)

Playbooks are margin-pure (no COGS beyond Gumroad 10% fee):
- Launch pricing: avg $39/playbook
- Gumroad net: $35/sale
- Year 1 target: 500 sales = **$17,500 one-time**
- Bundle attach rate: 30% of buyers upgrade to Pro within 30 days → additional SaaS conversion
