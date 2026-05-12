# Product Thesis

## The one-sentence bet

Solo AI-paired builders accumulate dead repos faster than they can diagnose them, and the cost of that accumulation — context loss, misdirected effort, tech debt — is measurable and solvable with a 4-signal classifier that runs on public git artifacts.

## Why now

Three forces converged in 2025-2026:

1. **AI tool proliferation** — Lovable, Cursor, Claude Code, Bolt, v0 each produce distinct commit fingerprints. Portfolio fragmentation is a direct output of tool diversity. A builder using 3+ AI tools simultaneously has 3+ repos in various states of neglect by design, not failure.

2. **Publish-button satisfiability** (H2, confirmed n=25) — Lovable-first repos hit a threshold where the operator's success condition ("I can share a URL") is satisfied before the repo is production-worthy. 100% of Lovable-only repos in the portfolio scored 0/4 on the tier classifier. This is systematic, not accidental.

3. **GitHub as the ground truth** — No survey needed. Commit authors, commit message density, PR presence, CLAUDE.md presence — all are public signals. RepoHealth reads what's already there.

## The three non-obvious claims

**Claim 1: Dormancy is diagnosable, not just observable.**

Most tools tell you a repo hasn't been touched in 90 days. RepoHealth tells you *why*: publish-button satisfied (Lovable repos), operator absent after Claude batch-build (keepath pattern), or non-software content misclassified as a code project (Tier D pre-filter). The "why" is worth paying for. The "what" is free on GitHub.

**Claim 2: The Israeli indie-hacker market is underserved and directly addressable.**

37% of the sampled portfolio is in Hebrew or mixed-language repos. The ereztash portfolio has 25 repos, suggesting a builder who uses AI tools aggressively. This profile (Israeli solo builder, multi-tool, high repo creation rate) is a real segment with no Hebrew-first developer tool currently targeting them.

**Claim 3: Playbook prescription beats raw metrics.**

Builders don't need another dashboard. They need to know: "is this repo revivable, and if so, what's the first step?" Mapping tier score → playbook recommendation closes the gap between insight and action. No competitor does this.

## What we're NOT building

- A general GitHub analytics dashboard (that's Waydev, LinearB, Gitprime)
- A code quality tool (that's SonarQube, CodeClimate)
- A team productivity tracker (this is for *solo* builders)
- An AI code generator (we analyze AI-generated code, we don't generate it)

## The core belief

If the 4-feature classifier generalizes to the 6th, 7th, and 100th repo (H1 confirmed at n=25, self-application test passed against Maya hypothetical), then it can be productized as a service. The hard part is the classifier logic and the playbook library. Both already exist in this repo. The remaining work is a UI and an API.
