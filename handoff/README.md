# Handoff Prompts — New Claude Code Session with Full 26-Repo Access

> Use these prompts **in order** in a fresh Claude Code session where ereztash has granted GitHub access to all 26 repositories (not just the original 5).

## Prerequisites for the new session

Before using these prompts, ereztash must:
1. Update GitHub App permissions OR `.mcp.json` allowlist to include all 26 repos
2. Start a fresh Claude Code session
3. Confirm `mcp__github__search_repositories(query="user:ereztash", perPage=30)` returns 26+ repos

## Prompt sequence

| # | File | Purpose | Estimated wall-time |
|---|------|---------|---------------------|
| 01 | `01-bootstrap.md` | Load context from lessons repo + confirm full access | 5 min |
| 02 | `02-portfolio-scan.md` | Apply classifier to all 26 repos, write master scan report | 30-60 min |
| 03 | `03-hypothesis-validation.md` | Test 5 hypotheses on n=26 data, refine/refute as needed | 15-30 min |
| 04 | `04-saas-spec.md` | Write full 11-file product spec (thesis → conviction) | 45-90 min |
| 05 | `05-mvp-build.md` | Build Next.js SaaS MVP web app | 90-180 min |

Each prompt is self-contained. The new session does NOT have memory of the prior session — the prompts include all context needed.

## How to use

1. Copy the entire content of `01-bootstrap.md` into the new session's first message
2. Wait for completion + status report
3. If status looks good, paste `02-portfolio-scan.md` as the next message
4. Continue sequentially

Do NOT skip prompts. Each builds on the prior. Skipping = work duplicated or skipped.

## Quality gates (between prompts)

After each prompt, before proceeding to the next:

- **After 01**: Confirm 26+ repos visible. If only 5, access NOT granted — fix MCP allowlist first.
- **After 02**: Skim `/research/portfolio-scan/26-repos.md`. Every repo has Tier + scores. Sanity-check 2-3 repos manually.
- **After 03**: Read `hypothesis-validation.md`. Look for surprise refutations — they're the most valuable findings.
- **After 04**: Read `/saas/spec/11-conviction-statement.md` first — if conviction is honest about uncertainty, the spec is good.
- **After 05**: `npm install && npm run build` in `/saas/app/` should succeed locally before deploy.

## If a prompt fails mid-execution

The new session likely hit a rate limit, context limit, or tool error. To resume:
1. Check `mcp__github__get_file_contents` for partial outputs (in `/research/portfolio-scan/` or `/saas/spec/` or `/saas/app/`)
2. In a new session, paste a recovery prompt: "The previous session was working on [prompt N]. Files already created: [list]. Continue from where it left off."
3. Or: re-paste the same prompt; the model should detect existing artifacts and continue/overwrite intelligently.

## File-system layout this handoff produces

By the end of all 5 prompts, the `ereztash/lessons` repo will have:

```
/research/portfolio-scan/
  26-repos.md                 # The validation dataset
  hypothesis-validation.md    # H1-H5 verdicts at n=26
/saas/scanner/                # (already exists from prior session)
/saas/spec/
  00-README.md
  01-product-thesis.md
  02-product-spec.md
  03-architecture.md
  04-pricing.md
  05-gtm-90day.md
  06-target-audience.md
  07-moat.md
  08-unit-economics.md
  09-risk-register.md
  10-mvp-roadmap.md
  11-conviction-statement.md
/saas/app/
  package.json
  next.config.ts
  tsconfig.json
  src/
    app/
    components/
    lib/
  supabase/migrations/
  README.md
```

After all 5 prompts complete, ereztash has:
- Real validation data on his own 26 repos
- A 100%-conviction product spec (or an honest refutation that triggers pivot)
- A deployable web SaaS MVP

From that point, the path to first paying customer is execution — not research.
