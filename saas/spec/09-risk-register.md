# Risk Register

## Scoring: Likelihood (1-5) × Impact (1-5) = Risk Score

---

### R1: GitHub rate limiting prevents scalable scanning
**Likelihood**: 3 | **Impact**: 4 | **Score**: 12

**Description**: Each repo scan consumes ~7 GitHub API calls. A user with 100 repos needs 700 calls. At 5,000 calls/hr per authenticated token, this is fine per user but may hit limits during concurrent scans at launch.

**Mitigation**:
- Store GitHub token per user and use their quota, not a shared app token
- Cache scan results in Supabase; rescan triggers rate-limited (1/hr free, 1/hr Pro)
- Implement exponential backoff and queue large scans as background jobs
- Monitor API usage via GitHub API response headers (`X-RateLimit-Remaining`)

---

### R2: Classifier false positives/negatives erode trust
**Likelihood**: 3 | **Impact**: 4 | **Score**: 12

**Description**: A user sees their active repo classified as Tier C, or their dead repo as Tier A. Trust in the product collapses.

**Evidence of risk**: org-fortify has LOG.md but all Lovable-bot commits — a naive classifier would score it F4=true (docs present) and F2=false. This is correct, but a user who wrote that LOG.md manually would feel misclassified.

**Mitigation**:
- Show evidence for each feature score ("F2 = false because 0/47 commits have human authorship")
- Allow user to override any score with one-click feedback
- Use feedback data to improve classifier edge cases (Month 2+)
- Add confidence level to each diagnosis ("High confidence" vs. "Low confidence")

---

### R3: Market too small to reach MRR targets
**Likelihood**: 2 | **Impact**: 5 | **Score**: 10

**Description**: Solo AI-paired builders with 5–25 repos is a niche. If the addressable market is 10,000 not 500,000, reaching 500 Pro subscribers requires 5% market penetration.

**Mitigation**:
- Validate market size before Month 2 spend (track organic signup rate)
- Expand ICP to include agency tech leads (Team tier) if solo market signals weakness
- Playbook sales on Gumroad are market-size-independent (each sale is a signal)
- Keep burn at $75/mo; product is profitable at 5 subscribers regardless

---

### R4: GitHub changes OAuth scopes or API access
**Likelihood**: 2 | **Impact**: 4 | **Score**: 8

**Description**: GitHub deprecates or restructures the API endpoints we use; OAuth scopes change; rate limits tighten.

**Mitigation**:
- Use stable REST v3 endpoints + GraphQL (both have long deprecation cycles)
- Abstract GitHub API calls behind a service layer; swap implementation if needed
- Monitor GitHub changelog
- Don't build on undocumented endpoints

---

### R5: Lovable / Claude Code builds native health-check feature
**Likelihood**: 2 | **Impact**: 4 | **Score**: 8

**Description**: Lovable or Anthropic ships a portfolio health dashboard natively, making RepoHealth redundant.

**Mitigation**:
- Build ahead of this risk: ship in Month 1, establish brand before potential competitor exists
- Native tools are unlikely to be multi-tool-aware (Lovable won't rank Claude Code commits highly)
- The playbook content is cross-tool and cross-platform; not replicable by a single vendor
- Pivot path: if Lovable ships health check, become the "multi-tool" answer (Lovable + Claude + Cursor combined view)

---

### R6: Low free→Pro conversion (< 5%)
**Likelihood**: 3 | **Impact**: 3 | **Score**: 9

**Description**: Users get value from the free tier (tier table visible, 3 repo details) and don't upgrade.

**Mitigation**:
- Design upgrade triggers at the exact moment of value realization (4th repo detail, private repo scan, playbook prescription)
- A/B test paywall copy: "Unlock full diagnosis" vs. "See why this repo went dormant"
- Offer 7-day Pro trial on sign-up (lowers friction to first paid experience)
- If CVR stays below 5% at Month 2, tighten free tier (2 repo details, not 3)

---

### R7: Churn too high for SaaS economics
**Likelihood**: 2 | **Impact**: 4 | **Score**: 8

**Description**: If monthly churn > 6%, LTV drops below $300 and the unit economics break at any paid CAC.

**Mitigation**:
- Weekly digest is a habit-formation mechanism (keeps users in-product)
- Dormancy alerts create re-engagement moments
- Annual plan incentive reduces effective churn rate
- Monitor churn by cohort at Month 1

---

### R8: Founder time constraint (single-person team)
**Likelihood**: 4 | **Impact**: 3 | **Score**: 12

**Description**: ereztash is building this alongside active projects (ampaign-craft, algo-trade, others). Development velocity will be limited.

**Mitigation**:
- MVP scope is intentionally minimal (see [10-mvp-roadmap.md](10-mvp-roadmap.md))
- Use Claude Code for development to 10× solo velocity
- Ship playbooks on Gumroad Week 1 (zero dev time, immediate revenue signal) before investing in SaaS build
- Set a kill criterion: if MRR < $500 by Month 3, pause SaaS and focus on playbook sales only

---

### R9: Privacy / data concerns from users
**Likelihood**: 3 | **Impact**: 3 | **Score**: 9

**Description**: Users don't want a third-party scanning their private repos, even read-only.

**Mitigation**:
- Privacy-first framing: "We only read commit metadata, never code"
- No code is ever stored; only: commit author names, commit message length, PR counts, file names at root
- Privacy policy clearly states: no code storage, no content indexing, token is read-only
- Offer public-repo-only mode (free tier default) as a trust-building entry point

---

### R10: Tier D pre-filter misclassifies legitimate projects
**Likelihood**: 2 | **Impact**: 2 | **Score**: 4

**Description**: A data science repo with only `.ipynb` files and CSVs is classified as Tier D (non-software), even though it's actively worked on.

**Mitigation**:
- Include `.ipynb`, `.py`, `.R`, `.jl` in the "code file" detection list
- "Non-software" definition: zero files with recognized code extensions, not "no package.json"
- User can manually re-classify a repo's tier

---

## Risk summary matrix

| Risk | Score | Status |
|------|-------|--------|
| R1: GitHub rate limiting | 12 | Mitigated by per-user token |
| R2: Classifier false positives | 12 | Mitigated by evidence display + override |
| R8: Founder time constraint | 12 | Mitigated by minimal MVP scope |
| R6: Low CVR | 9 | Mitigated by upgrade trigger design |
| R9: Privacy concerns | 9 | Mitigated by no-code-storage policy |
| R3: Market size | 10 | Monitor in Month 1 |
| R4: GitHub API changes | 8 | Low probability |
| R5: Competitor from tool vendors | 8 | First-mover mitigation |
| R7: High churn | 8 | Monitor at Month 1 |
| R10: Tier D misclassification | 4 | Easy fix in classifier |
