# Product Spec

## Core surfaces

### 1. Portfolio Dashboard (primary surface)

**Input**: GitHub OAuth → read access to public + private repos  
**Output**: Tier table for all repos with drill-down

```
┌─────────────────────────────────────────────────────────────────┐
│ RepoHealth — Your Portfolio                          [Scan now] │
├──────────────────┬──────┬──────┬──────┬──────┬───────┬─────────┤
│ Repo             │  F1  │  F2  │  F3  │  F4  │ Tier  │ Action  │
├──────────────────┼──────┼──────┼──────┼──────┼───────┼─────────┤
│ ampaign-craft    │  ✓   │  ✓   │  ✓   │  ✓   │   A   │ ─       │
│ algo-trade       │  ✓   │  ✓   │  ✗   │  ✗   │   B   │ Add PRs │
│ focuos           │  ✗   │  ✗   │  ✗   │  ✗   │   C   │ Triage  │
│ cor-sys          │  ✓   │  ✓   │  ✓   │  ✓   │   A   │ ─       │
│ onto-trade       │  ✗   │  ─   │  ─   │  ─   │   D   │ Archive │
└──────────────────┴──────┴──────┴──────┴──────┴───────┴─────────┘
```

**Key interactions**:
- Click repo → opens Repo Detail view
- "Scan now" → triggers fresh GitHub API pull (rate-limited to 1/hour on free)
- Filter by tier (A/B/C/D)
- Sort by: last commit, tier score, repo name
- Export to CSV (paid tier)

### 2. Repo Detail View

For each repo, display:

**Header**
- Repo name, description, language, stars, last commit date
- Tier badge (A/B/C/D) with score breakdown (F1 ✓/✗, F2 ✓/✗, F3 ✓/✗, F4 ✓/✗)

**Dormancy Diagnosis** (the differentiator)
- Pattern detected: one of 6 dormancy types:
  - `publish-button-satisfied` — Lovable/Bolt/v0 detected, no human commits after deploy
  - `operator-absent` — Claude direct commits found, last branch `claude/*` never merged
  - `bot-only` — all commits from AI bots, zero human commits
  - `non-software` — no code files detected (Tier D pre-filter)
  - `abandoned-early` — <5 commits total, last commit >90 days ago
  - `healthy` — no dormancy pattern detected
- Evidence: 2-3 bullet points citing specific commits, file counts, or author names

**AI Tool Attribution**
- Detected tools: Lovable, Claude Code, Cursor, Bolt, v0, Copilot (from commit author fingerprints)
- Human commit ratio: X% human / Y% bot
- Last human commit: date

**Prescription** (maps tier + dormancy pattern → playbook)

| Tier | Dormancy | Prescription |
|------|----------|--------------|
| A | healthy | No action needed |
| B | publish-button-satisfied | [Publish-Button Intent Triage playbook] |
| B | operator-absent | Schedule resume session |
| B | abandoned-early | Run [Four-Feature Classifier] to re-score after 1 sprint |
| C | any | [Resumer Day Prep playbook] |
| D | non-software | Archive or convert to notes repo |

**Commit voice score** (paid feature)
- Editorial density trend: sparse → narrative → opinionated
- Last 10 commit messages visualized
- H5 proxy: is the voice escalating or flatlining?

### 3. Playbook Library (in-app, gated)

- Free: see playbook names + one-sentence descriptions
- Paid: full playbook content rendered in-app
- Links back to Gumroad for standalone purchase

### 4. Alerts (paid)

- Weekly digest: repos that changed tier
- Dormancy alert: repo silent for 30 days and was Tier B
- New bot-commit spike: >5 consecutive bot commits without human follow-up

## Feature flags by tier

| Feature | Free | Pro ($19/mo) | Team ($49/mo) |
|---------|------|-------------|---------------|
| Portfolio scan | ✓ (public repos) | ✓ (all repos) | ✓ |
| Repo detail + diagnosis | ✓ (3 repos) | ✓ (unlimited) | ✓ |
| AI tool attribution | ✓ | ✓ | ✓ |
| Playbook prescriptions | names only | full content | full content |
| Commit voice score | ✗ | ✓ | ✓ |
| Alerts + digest | ✗ | ✓ | ✓ |
| CSV export | ✗ | ✓ | ✓ |
| Team members | ✗ | ✗ | up to 5 |
| API access | ✗ | ✗ | ✓ |

## Data model

```typescript
type Repo = {
  id: string                    // GitHub repo ID
  owner: string
  name: string
  language: string | null
  lastCommitAt: Date
  scores: FeatureScores
  tier: 'A' | 'B' | 'C' | 'D'
  dormancyPattern: DormancyPattern
  aiTools: AITool[]
  humanCommitRatio: number      // 0–1
  commitVoiceScore: number | null  // 0–10, paid only
  scannedAt: Date
}

type FeatureScores = {
  f1: boolean  // non-template production dep
  f2: boolean  // any human/direct commit
  f3: boolean  // any PR
  f4: boolean  // CLAUDE.md or docs/
}

type DormancyPattern =
  | 'healthy'
  | 'publish-button-satisfied'
  | 'operator-absent'
  | 'bot-only'
  | 'non-software'
  | 'abandoned-early'

type AITool =
  | 'lovable'
  | 'claude-code'
  | 'cursor'
  | 'bolt'
  | 'v0'
  | 'copilot'
  | 'unknown-bot'
```

## AI tool detection logic

| Tool | Commit author fingerprint |
|------|---------------------------|
| Lovable | `Lovable <lovable-dev[bot]@...>` |
| Claude Code | `Claude <noreply@anthropic.com>` |
| Cursor | commit message starts with `[cursor]` or author matches Cursor app ID |
| Bolt | `Bolt <bolt[bot]@...>` |
| v0 | commit from `v0-dev[bot]` |
| Copilot | `GitHub Copilot <...@github.com>` |

## Scoring algorithm

```
F1 = repo has ≥1 non-template production dependency
     (package.json with deps beyond create-next-app defaults,
      requirements.txt with ≥3 packages beyond hello-world,
      or any non-empty pyproject.toml / Cargo.toml)

F2 = ≥1 commit with a human author
     (not matching any known bot fingerprint)

F3 = ≥1 merged or open pull request

F4 = CLAUDE.md exists at root OR docs/ directory exists with ≥1 .md file

Score = F1 + F2 + F3 + F4  (0–4)
Tier = A if score ≥ 3, B if score 1–2, C if score 0 and F2=true, D if pre-filter fails

Tier D pre-filter:
  - No files at all (empty repo) → D
  - All files are images/PDFs/CSVs with no code → D
  - README-only repo with no code files → D
```

## Scan frequency and rate limits

- On sign-up: full scan of all repos (GitHub API pagination)
- Free: 1 rescan/day (manual trigger)
- Pro: 1 rescan/hour + background daily scan
- GitHub rate limit: 5,000 req/hr authenticated; estimated ~20 API calls per repo for full scan → supports ~250 repos/hr per token
- For large portfolios (>100 repos): scan in background, notify via email when complete
