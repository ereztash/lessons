# Conviction Statement

> Honest signal vs. noise split. Written 2026-05-12.

---

## What I'm confident about

**The classifier works.**

H1–H8 confirmed at n=25. The 4-feature tier classifier correctly identified every Tier A repo in the portfolio without false positives. The Tier D pre-filter correctly excluded all 9 non-software repos. The dormancy taxonomy (6 patterns) covered 100% of the dormant repos in the sample. This is not a guess — it's validated against real data.

**The pain is real and specific.**

The ICP knows exactly what the problem feels like: they can name 3 repos they haven't opened in 2 months. The time cost is measurable (8–16 hours to audit 25 repos manually vs. 60 seconds with the tool). The "why did this die" question is unanswered by any existing tool.

**The tech is straightforward.**

The classifier is pure TypeScript functions operating on GitHub API responses. The hardest technical challenge (the classification logic) is already solved and documented in this repo. The remaining work is UI, auth, and payments — all well-trodden ground.

**The content library is a real asset.**

6 shipped playbooks, 11 distilled insights, a 25-repo dataset, 8 validated hypotheses, and a self-application test. This took 200+ hours of research. A fast-follower can copy the UI in a weekend; they cannot copy this library.

**Break-even is trivially achievable.**

$75/mo fixed costs. Break-even at 5 Pro subscribers. Warm-network outreach should generate that in Week 1 or 2. There is no scenario where the product loses money unless it has zero users.

---

## What I'm uncertain about

**Market size.**

The ICP (solo AI-paired builder, 5–25 repos, TypeScript) is real but I don't know how large it is. My estimate (500K–1M globally) is a top-down guess. If the actual addressable market is 10–50K, the $100K ARR Year 1 target requires 50%+ market penetration, which is unrealistic. **I'll know more at Month 1 from organic signup velocity.**

**Free→Pro conversion rate.**

I've assumed 15%. My evidence is: the free tier shows enough value to hook users, and the paywall triggers are at genuine pain points (private repos, 4th repo detail). But I've never run a consumer SaaS before. The actual CVR could be 5% (means 60 MRR not 475 at Month 2) or 30% (means $1,140 MRR). **I'll know more at Month 2.**

**Israeli market segment specificity.**

The portfolio data shows 37% Hebrew-content repos, suggesting a material Israeli builder segment. But this data is from one person's portfolio (n=1 for this signal). The inference that "there's a large Israeli indie builder segment" is plausible but not proven. **I'll validate by tracking sign-up geography in Month 1.**

**Whether playbook prescriptions are the right in-product feature.**

I believe "diagnose + prescribe" is more valuable than "diagnose only." But the prescription ("use this playbook") is a soft nudge, not automation. A user might prefer: "show me the 3 commits I need to make to move this repo from Tier B to Tier A." That's a more specific prescription and might have higher perceived value. **I'll ask the first 10 users directly.**

**Retention.**

The hypothesis is that weekly digests + dormancy alerts create enough pull to keep subscribers. But if users scan their portfolio once, see the results, and feel "done," they'll churn after Month 1. The product needs a hook that brings them back. The current bet is: builders create repos at a high rate, so there's always a new repo to score. **I'll measure 30-day return visit rate immediately.**

---

## Honest kill criteria

If any of the following are true at the stated checkpoint, I'll stop SaaS development and redirect to playbook-only sales:

| Criterion | Checkpoint |
|-----------|------------|
| Zero paying users | Week 4 |
| < 10 sign-ups total | Week 4 |
| Free→Pro CVR < 3% (after 50 free users) | Month 2 |
| MRR < $200 | Month 3 |
| 30-day return visit rate < 20% | Month 2 |

Playbook sales (Gumroad) are independent of SaaS viability and will continue regardless.

---

## What success looks like (12 months)

**Minimum success**: 50 Pro subscribers ($950 MRR), 200 Gumroad playbook sales ($7,000 one-time), total Year 1 revenue $18,000. The research pays for itself as a content marketing asset.

**Base success**: 500 Pro subscribers ($9,500 MRR), 500 Gumroad sales, total Year 1 revenue $100,000. Becomes a meaningful side income stream.

**Stretch success**: 2,000 Pro subscribers ($38,000 MRR), Team tier growth, total Year 1 revenue $400,000. Warrants going full-time.

I'm building toward base success. The stretch case would be a pleasant surprise, not the plan.

---

## The honest version of the pitch

This is a niche tool for a real problem. The research is solid, the classifier works, the content is defensible. The market might be too small to be venture-scale; it doesn't need to be. If it generates $50–100K/year, it's worth the 3 months of build time. If it doesn't, the playbook library and the research have already generated value as distribution assets for the next thing.

This is a bet worth taking. It's not a guaranteed win.
