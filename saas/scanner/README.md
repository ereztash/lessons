# PortfolioPilot Scanner

A TypeScript CLI that scans every repo owned by a GitHub user, classifies each into Tier A / B / C / D using the Four-Feature Tier Classifier, and emits a portfolio-wide Markdown + HTML report with actionable next steps per repo and across the portfolio.

This is the MVP technical core of **PortfolioPilot**, a forthcoming SaaS for solo AI-paired builders. The scanner is designed to be run locally first by the founder against their own 26 repos, then evolved into a hosted product.

## Why this exists

A solo builder with 10+ AI-paired repos (Lovable, Claude Code, Cursor, v0, Bolt, etc.) accumulates them faster than they can mentally track. Returning to a dormant repo, they spend 10-20 minutes reconstructing intent. The Four-Feature Tier Classifier replaces this disoriented review with a mechanical 30-seconds-per-repo scoring that returns a tier (A/B/C/D) plus a recommended action (continue / resume / archive). The full research base is in this repository:

- [`/products/playbooks/four-feature-tier-classifier.md`](../../products/playbooks/four-feature-tier-classifier.md) — the core algorithm
- [`/products/playbooks/publish-button-intent-triage.md`](../../products/playbooks/publish-button-intent-triage.md) — the abandonment diagnostic
- [`/products/playbooks/resumer-day-prep.md`](../../products/playbooks/resumer-day-prep.md) — resumption-readiness logic and 72-minute sprint
- [`/products/playbooks/dual-ai-surface-workflow.md`](../../products/playbooks/dual-ai-surface-workflow.md) — AI tool detection rationale
- [`/research/cross-repo/synthesis.md`](../../research/cross-repo/synthesis.md) — cross-repo patterns
- [`/research/cross-repo/patterns-matrix.md`](../../research/cross-repo/patterns-matrix.md) — the 17 promoted patterns

## Setup

### Prerequisites

- **Node.js ≥ 20** (uses ES2022 + native fetch + modern Octokit)
- **npm** (or pnpm / yarn — examples use npm)
- A **GitHub Personal Access Token** with `repo` and `read:user` scopes

### 1. Get a GitHub token

Create a token here: https://github.com/settings/tokens (classic) or use a fine-grained PAT.

**Required scopes (classic):**
- `repo` — read commits, PRs, issues, contents (including private repos in scope)
- `read:user` — read your username + basic profile

**Required permissions (fine-grained):**
- Repository access: All repositories (or just the ones you want scanned)
- Repository permissions: Contents (read), Metadata (read), Pull requests (read), Issues (read)
- Account permissions: Email addresses (read, optional)

### 2. Configure `.env`

```bash
cd saas/scanner
cp .env.example .env
# Edit .env and fill in:
#   GITHUB_TOKEN=<your token>
#   GITHUB_USERNAME=<your GitHub username, e.g., ereztash>
```

### 3. Install + build

```bash
npm install
npm run build
```

## Usage

### Quick scan (default options)

```bash
npm run scan
```

This builds, then runs the scanner with defaults:
- Skip archived repos
- Skip forks
- Both Markdown and HTML output
- Output to `./output/`
- Normal verbosity

### Dev mode (no build step, via tsx)

```bash
npm run dev -- --verbose
```

### CLI flags

```
portfolio-scanner [options]

Options:
  --include-archived       Include archived repos (default: skip)
  --include-forks          Include forks (default: skip)
  --output-dir <dir>       Override output directory (default: ./output)
  --format <md|html|both>  Output format (default: both)
  --max-repos <n>          Process at most N repos (debugging)
  --verbose                Verbose progress output
  -h, --help               Show help
```

### Example commands

```bash
# Scan 5 repos in verbose mode, HTML only, to a custom directory
npm run dev -- --max-repos 5 --format html --output-dir /tmp/scan --verbose

# Full scan, include forks and archived for an audit
npm run scan -- --include-archived --include-forks

# Markdown only, for piping into a Claude session later
npm run scan -- --format md
```

### Sample console output

```
▶ PortfolioPilot Scanner v0.1.0
▶ Discovering repos for @ereztash…
✓ Discovered 26 owned repos; 24 eligible after filters; scanning 24.
▶ Fetching per-repo data (concurrency 3)…
✓ Scanned cor-sys (Tier A, score 4/4)
✓ Scanned groundstate-protocol (Tier B, score 3/4)
✓ Scanned chess-mind-patterns (Tier B, score 2/4)
✓ Scanned core-unified-consciousness (Tier C, score 0/4)
▶ Classifying 24 repos…
▶ Done.
✓ Markdown report: /Users/erez/code/lessons/saas/scanner/output/portfolio-report-2026-05-12T1430Z.md
✓ HTML report:     /Users/erez/code/lessons/saas/scanner/output/portfolio-report-2026-05-12T1430Z.html

Suggested next action: Run the 72-minute resumer sprint on: chess-mind-patterns, ...
```

## Interpretation guide

### What each tier means

| Tier | Feature score | Meaning | What to do |
|------|---------------|---------|------------|
| **A** | 4/4 | Managed system. Domain deps + human commits + PRs + docs all present. | Continue investment. Treat as production-grade. |
| **B** | 2-3/4 | Developing, has real signal. | If <30 days dormant: stage a 72-minute resumption sprint. If >30 days dormant: archive after one final classifier review. |
| **C** | 1/4, OR 0/4 with ≥10 commits | Prototype-stalled or publish-button satisfied. Bot-only abandonment shape. | Archive without guilt — the repo is finished by its own success condition. |
| **D** | 0/4 with <10 commits | Never-developed template skeleton. | Archive immediately. |

### Score breakdown (the four features)

1. **Non-template domain deps** — does `package.json` have ANY dep not in the template allowlist? (React/Vite/Tailwind/shadcn/Radix don't count; `chess.js`, `supabase`, `stripe`, `@anthropic-ai/sdk` etc. do)
2. **Human commits exist** — at least one commit by a non-bot author
3. **PRs exist** — at least one PR (merged or closed-unmerged) ever
4. **Docs present** — `docs/` folder OR `CLAUDE.md` OR substantial README (>500 chars, no template placeholders)

### Publish-button satisfiability score (0-100)

Higher = more likely "finished" by pressing Lovable's Publish button. ≥50 → flagged ⚑.

- +30 README still contains template placeholder (`REPLACE_WITH_PROJECT_ID`, `Lovable App`, `vite_react_shadcn_ts`)
- +25 last commit message reads like a publish-button click (`Edited UI in Lovable`, `Publish`, `Deploy preview`, generic `Changes`)
- +20 0 PRs and >30 days since last commit
- +15 100% of commits are bot-authored
- +10 no domain-specific deps

### Resumption readiness score (0-100)

Only for Tier B/C. Higher = easier to resume in a single 72-minute sprint. ≥60 → strong candidate ★.

- +25 domain-specific dep present (commitment device)
- +20 ≥1 human commit
- +15 last commit ≤90 days ago
- +15 substantial README (>500 chars, no placeholders)
- +15 ≥1 doc file (CLAUDE.md, LOG.md, docs/, INTENT.md, MEMORY.md)
- +10 no `@ts-nocheck` rampant in sampled `src/` (first 5 .ts files)

### AI tool diversity

Buckets each commit's author into: `human` / `claude` / `cursor` / `gpt-engineer` / `lovable` / `bolt-bot` / `v0-bot` / `copilot` / `codex` / `bot-other`. Also counts `Co-Authored-By: Claude` trailers separately.

Then surfaces gaps:
- Claude active but no Codex/Copilot review-surface anywhere → suggest "Add AI cross-review"
- Lovable-only repo → suggest "Add code-writing AI (Claude or Cursor)"
- Claude + Cursor both present → flag as "healthy dual-AI write surface"
- Lovable + Claude both present → flag as "dual-surface cadence active"

## Troubleshooting

### "GITHUB_TOKEN is missing" or "still the placeholder"

You haven't created `.env` from `.env.example` or your token still reads `ghp_replace_with_real_token`. Edit `.env` with a real PAT.

### "Token returned 0 repos but none owned by @USERNAME"

Your `GITHUB_USERNAME` doesn't match the token's owner. Check both values. Note: the scanner only counts repos where the user is the **owner** (not org repos you collaborate on).

### Hit primary rate limit

GitHub allows ~5000 requests/hour for authenticated users. The scanner uses `@octokit/plugin-throttling` which auto-defers when you hit the limit and waits the duration in the `Retry-After` header. For a 26-repo portfolio, you'll use approximately:
- 26 × 3 commit pages (worst case) = 78
- 26 × 5 PR pages = 130
- 26 × 2 issue endpoints = 52
- 26 × ~6 content endpoints = 156
- ~10 misc + retries

Total ≈ 500 requests, well under the limit.

### Private repos not appearing

Confirm your token has the `repo` scope (not just `public_repo`). Fine-grained PATs need explicit access to each private repo.

### "fetch failed" appears in a repo's error list

The scanner degrades gracefully — one bad repo doesn't kill the scan. Check `.errors[]` in the report to see what failed (deleted repo, empty repo, 502 from edge, etc.). Common causes:
- Empty repos return 409 on `/commits` (handled silently)
- Repos without `package.json` return 404 (handled silently)
- Network jitter triggers retry with exponential backoff (up to 4 attempts)

### Scanner runs but output is empty

Did you pass `--max-repos 0`? Re-run without that flag. Also confirm `output/` is writable.

## Roadmap

### v0.1 (current MVP)

- Local CLI, single-user, GitHub-only data source
- Markdown + HTML reports
- Four classifiers (tier / publish-button / resumption / AI diversity)
- Editorial voice analyzer (citations + conventional prefixes)
- Polite rate limiting (concurrency 3, exponential backoff, throttling plugin)

### v0.2 (planned)

- Persistent JSON output for diffing scans over time ("what changed since last scan?")
- INTENT.md detection + linting (per publish-button-intent-triage playbook)
- Slack / email digest delivery
- `--repo <name>` flag for single-repo deep scans
- ICS calendar export of suggested resumption sprints

### v1.0 (SaaS)

- Hosted web UI (Next.js + Supabase + Vercel)
- Multi-user, OAuth-based GitHub install
- Weekly portfolio digest emailed automatically
- Team / org portfolios
- Cross-portfolio benchmarking (anonymized)
- Direct integration with PortfolioPilot's resumption-sprint scheduling

## License

UNLICENSED / proprietary during MVP phase. To be re-licensed (likely MIT or Elastic 2.0) at v1.0 launch.

## Contributing

The scanner is currently founder-built and not accepting external PRs. If you find a bug while running it on your own portfolio, open an issue with the failing repo's tier rationale and we'll triage.
