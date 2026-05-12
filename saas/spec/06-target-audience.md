# Target Audience

## Primary ICP (Ideal Customer Profile)

**Solo AI-paired builder, 5–25 repos, TypeScript/JavaScript dominant**

### Profile

- **Who**: Individual developer or indie hacker using 2+ AI coding tools simultaneously
- **Tech stack**: TypeScript + Next.js primary; Python secondary (ML/trading scripts)
- **AI tools**: At least one visual-preview tool (Lovable, Bolt, v0) AND one code-writing tool (Claude Code, Cursor)
- **Portfolio**: 5–25 GitHub repos, mix of active and dormant, frequently creates new repos
- **Business model**: B2B SaaS, fintech tool, or consulting side projects; not a consumer app builder
- **Pain**: Knows they have dormant repos but can't quickly answer "which ones are worth reviving?" without spending 20+ minutes per repo
- **Trigger to buy**: Just realized they've been paying for Lovable and haven't opened 3 of their repos in 2 months

### Demographic evidence (from portfolio scan)

- 37% of sampled repos contain Hebrew content → Israeli-origin builder is material
- 4 repos classified as fintech/trading (algo-trade, onto-trade, metatrader, ex2) → builder with fintech interest
- 2 repos classified as HR/workforce (hr-smb, candiapp) → interest in B2B SaaS
- Multi-tool usage: 6 Tier A repos all use 3+ AI tools → tool diversity is a health signal

### Quantified pain

| Pain point | Measured cost |
|-----------|---------------|
| Diagnosing dormancy cause | 20–40 min per repo (manual git log review) |
| Running 4-feature classifier manually | 15–30 min per repo |
| Portfolio-level audit (25 repos) | 8–16 hours |
| RepoHealth automated audit (25 repos) | ~60 seconds |
| **Time saved per portfolio review** | **8–16 hours** |

---

## Secondary ICP

**Agency/consultancy tech lead, 2–5 client repos + own projects**

- Pays for Team tier ($49/mo)
- Uses RepoHealth to onboard new clients: "here's what shape your codebase is in before we start"
- Shares portfolio view with clients as a deliverable
- Less price-sensitive than solo builders
- Will adopt in Month 3 when Team tier ships

---

## Anti-ICP (who we don't serve)

| Segment | Why excluded |
|---------|-------------|
| Enterprise dev teams (20+ devs) | Wrong tool (they need Waydev/LinearB); no budget approval path for $19 tool |
| Pure backend/DevOps engineers | No Lovable/v0 usage; F4 (CLAUDE.md) and F3 (PRs) are standard — classifier is less useful |
| Researchers / academics | Won't pay for workflow insights; would prefer open-source |
| Non-technical founders using no-code | No GitHub; outside the product's surface area |

---

## Jobs-to-be-done

### Primary JTBD
> "When I look at my GitHub repo list, I want to instantly know which repos are dead weight and which are worth my next sprint — so I can stop wasting context-switch time on repos I should have archived months ago."

### Secondary JTBD
> "When I'm about to restart a dormant project, I want to know WHY it went dormant (not just that it did) — so I can avoid repeating the same mistake."

### Tertiary JTBD
> "When I'm doing a quarterly review of my side-project portfolio, I want a one-page health report I can share with a co-founder or investor — so I don't have to manually compile it from git logs."

---

## Why not churn

Retention is driven by the same lifecycle patterns the classifier measures:
- Builder creates a new repo → wants to see it scored → stays subscribed
- Builder runs a sprint → tier changes → digest email confirms progress → positive feedback loop
- Builder gets dormancy alert → re-engages with repo before abandoning → attributes to tool

**Expected annual churn**: 30–40% (high end of SaaS B2C typical). Offset by high new-user inflow (ICP creates repos fast).

---

## Market size (rough)

- GitHub MAU: ~100M (2024)
- Developers using ≥2 AI coding tools: estimated 5–10% of active devs = 5–10M
- Solo builders with 5–25 repos using AI tools: estimated 500K–1M globally
- Willingness to pay $19/mo for dev tooling: estimated 2–5% = **10,000–50,000 potential Pro subscribers**
- At $19/mo: $190K–$950K ARR addressable (solo segment alone)
- Not a venture-scale market; right-sized for a profitable indie SaaS
