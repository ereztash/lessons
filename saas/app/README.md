# RepoHealth — Next.js App

AI-repo health scanner for solo builders. Scans your GitHub portfolio, scores every repo with the 4-feature tier classifier, and diagnoses why dormant repos went quiet.

## Quick start

```bash
cd saas/app
npm install
cp .env.example .env.local
# Fill in Supabase + GitHub OAuth credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Setup

### 1. Supabase project

1. Create a project at [supabase.com](https://supabase.com)
2. Run the migration: `supabase db push` or paste `supabase/migrations/0001_initial_schema.sql` into the SQL editor
3. Enable GitHub OAuth: Authentication → Providers → GitHub → add Client ID + Secret from your [GitHub OAuth App](https://github.com/settings/developers)
4. Set callback URL: `https://your-project.supabase.co/auth/v1/callback`

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase project settings
- `NEXT_PUBLIC_APP_URL` (use `http://localhost:3000` for dev)

### 3. GitHub OAuth app

Create at [github.com/settings/developers](https://github.com/settings/developers):
- Homepage URL: `http://localhost:3000`
- Callback URL: `https://your-project.supabase.co/auth/v1/callback`

## Architecture

```
src/
  app/                    — Next.js App Router pages + API routes
    page.tsx              — Landing page
    auth/                 — GitHub OAuth flow
    dashboard/            — Portfolio table (protected)
    repo/[owner]/[repo]/  — Repo detail + diagnosis (protected)
    api/scan/             — POST: trigger portfolio scan
  components/             — Shared UI components
  lib/
    classifier/           — 4-feature tier classifier (pure TypeScript)
      index.ts            — classifyRepo() entry point
      features.ts         — F1–F4 detection
      dormancy.ts         — 6-pattern dormancy diagnosis
      ai-tools.ts         — Bot fingerprint matching
      tier.ts             — Score → tier mapping
      playbooks.ts        — Tier + pattern → playbook prescription
    github/
      scanner.ts          — GitHub API calls + batch scanning
    supabase/
      server.ts           — Supabase server client (App Router)
      client.ts           — Supabase browser client
supabase/
  migrations/             — SQL migrations
```

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Auth | Supabase Auth (GitHub OAuth) |
| Database | Supabase Postgres + RLS |
| GitHub API | Octokit REST |
| Payments | Stripe (add in Week 3) |
| Email | Resend (add in Week 4) |
| Styling | Tailwind CSS |
| Deployment | Vercel |

## Classifier

The classifier is a set of pure TypeScript functions in `src/lib/classifier/`. It takes a `RepoScanInput` (GitHub API responses, pre-fetched) and returns a `RepoScanResult` with:

- `tier`: A / B / C / D
- `dormancyPattern`: one of 6 patterns
- `scores`: F1–F4 boolean flags
- `aiTools`: detected AI tools from commit author fingerprints
- `evidence`: human-readable explanation for each score

See [../spec/02-product-spec.md](../spec/02-product-spec.md) for the full scoring algorithm.

## Roadmap

See [../spec/10-mvp-roadmap.md](../spec/10-mvp-roadmap.md) for the phased build plan (Week 1–4 MVP, then Month 2–3 features).
