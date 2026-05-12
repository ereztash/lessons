# Competitive Moat

## Why no one else does this (yet)

The combination of three things is the moat:

1. **AI-tool-aware classifier** — knows the difference between a Lovable commit and a Claude Code commit; uses this distinction to diagnose dormancy cause, not just report it
2. **Playbook prescription library** — maps tier + dormancy pattern → specific, tested workflow (not generic advice)
3. **Evidence base** — built from real portfolio analysis, not guesswork; hypotheses validated at n=25

No competitor has all three. Most have zero.

---

## Competitive landscape

### GitHub itself
- What it has: repo insights, traffic, commit graph
- What it lacks: AI-tool attribution, dormancy diagnosis, tier scoring, playbook prescription
- Threat level: Low (GitHub won't build a niche solo-builder workflow tool)

### Waydev / LinearB / Gitprime
- What they have: team productivity metrics, engineering analytics
- What they lack: solo-builder focus, AI-tool attribution, dormancy diagnosis
- Price: $20–$50/user/month (team pricing, enterprise sales motion)
- Threat level: Low (wrong segment, wrong price, wrong motion)

### CodeClimate / SonarQube
- What they have: code quality, test coverage, complexity metrics
- What they lack: workflow patterns, dormancy analysis, AI-tool detection
- Threat level: Low (code quality ≠ workflow health)

### Octowatch / Starred (repo tracking tools)
- What they have: repo watching, changelog tracking
- What they lack: health scoring, AI attribution, prescription
- Threat level: Low (passive observation vs. active diagnosis)

### An LLM prompt ("just ask ChatGPT")
- What it has: flexibility, natural language output
- What it lacks: GitHub OAuth, real commit data, persistent portfolio view, alerts
- Threat level: Medium-low. Some users will DIY. But DIY is the 2-hour version; RepoHealth is the 60-second version. The tool's value is the integration + persistence, not the reasoning.

### A new entrant copying RepoHealth
- Threat level: Medium after PMF is proven
- Defense: playbook library is the hardest part to copy; it's built from 200+ hours of repo analysis (this repo's entire content). A fast-follower can copy the UI; they cannot copy the research.

---

## Defensibility layers

**Layer 1 — Research depth (months 1–6)**  
The playbook library and dormancy taxonomy are the product of 200+ hours of manual repo analysis across 25 repos. A competitor starting from scratch needs that research first. We already have it.

**Layer 2 — Classifier accuracy (months 3–12)**  
As n grows (user repos scanned), the classifier improves. Edge cases surface (e.g., repos with CLAUDE.md but zero human commits, like org-fortify). Accuracy is a compounding advantage.

**Layer 3 — Data network effects (year 2)**  
Aggregate anonymized scan data reveals cross-portfolio patterns: which AI tools produce the highest F2 ratio? Which dormancy patterns are reversible? This dataset has no analog and can't be recreated from public data alone.

**Layer 4 — Community + brand (year 2)**  
The "4-feature tier classifier" vocabulary, if it catches on in the Lovable/Claude Code communities, becomes self-reinforcing. Builders will reference their tier in forums; tools will integrate with RepoHealth.

---

## What we need to be true for the moat to hold

1. GitHub doesn't add native AI-attribution features to Insights (possible, not certain)
2. Lovable or Claude Code doesn't build a health-check product themselves (low probability — not their core product)
3. The playbook library stays ahead of any fast-follower (requires continuous research investment)

---

## Minimum viable moat (at launch)

At MVP launch, the moat is thin: a fast-follower could replicate the classifier in a weekend. The launch moat is:
- First mover in this exact niche (AI-tool-aware solo-builder repo health)
- The playbook content (PDF + in-app) as a real product artifact
- The ereztash brand as the "person who did the 25-repo analysis" — a founder-market fit story that's authentic and hard to fake
