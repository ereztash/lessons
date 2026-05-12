# Technical Architecture

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | SSR for SEO, server components for data fetching, familiar to target audience |
| Auth | Supabase Auth (GitHub OAuth) | GitHub OAuth is required for API access; Supabase handles sessions |
| Database | Supabase Postgres | Scan results, user accounts, playbook purchases |
| Background jobs | Supabase Edge Functions + pg_cron | Scheduled rescans, alert digests |
| GitHub API | Octokit REST + GraphQL | REST for commits/PRs/files, GraphQL for batch repo metadata |
| Cache | Supabase Redis (via Upstash) | GitHub API response cache to avoid rate limits |
| Payments | Stripe | Pro/Team subscriptions + one-time playbook purchases |
| Email | Resend | Weekly digest, dormancy alerts, welcome sequence |
| Deployment | Vercel | Zero-config Next.js hosting |
| Monorepo | Turborepo (optional) | Only if MVP grows to separate API + web packages |

## Data flow

```
User → GitHub OAuth → Supabase Auth
                          ↓
               Store GitHub access token
                          ↓
           Trigger scan (Edge Function)
                          ↓
     GitHub API (commits, PRs, file tree, authors)
                          ↓
              Apply classifier (TypeScript)
                          ↓
         Write scan results → Supabase Postgres
                          ↓
       Next.js server component reads results
                          ↓
              Render portfolio dashboard
```

## Database schema (simplified)

```sql
-- Users (managed by Supabase Auth)
create table public.profiles (
  id uuid primary key references auth.users(id),
  github_username text not null unique,
  plan text not null default 'free',  -- 'free' | 'pro' | 'team'
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Scans (one per GitHub repo per scan run)
create table public.repo_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  github_repo_id bigint not null,
  owner text not null,
  name text not null,
  language text,
  last_commit_at timestamptz,
  f1 boolean not null default false,
  f2 boolean not null default false,
  f3 boolean not null default false,
  f4 boolean not null default false,
  tier text not null,  -- 'A' | 'B' | 'C' | 'D'
  dormancy_pattern text not null,
  ai_tools text[] not null default '{}',
  human_commit_ratio numeric(4,3),
  commit_voice_score numeric(4,1),
  raw_evidence jsonb,  -- JSON blob of supporting commit SHAs, file names
  scanned_at timestamptz default now()
);

create index on public.repo_scans(user_id, scanned_at desc);
create index on public.repo_scans(user_id, tier);

-- Latest scan per repo (materialized view for dashboard speed)
create view public.latest_scans as
  select distinct on (user_id, github_repo_id) *
  from public.repo_scans
  order by user_id, github_repo_id, scanned_at desc;

-- Playbook purchases (for in-app unlock)
create table public.playbook_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  playbook_slug text not null,
  stripe_payment_intent text,
  purchased_at timestamptz default now(),
  unique(user_id, playbook_slug)
);

-- Alert subscriptions
create table public.alert_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  alert_type text not null,  -- 'tier-change' | 'dormancy' | 'bot-spike'
  enabled boolean not null default true,
  updated_at timestamptz default now()
);
```

## Classifier service (TypeScript)

Live in `src/lib/classifier/`. Pure functions, no side effects, fully testable.

```
src/lib/classifier/
  index.ts          — main classifyRepo() entry point
  features.ts       — F1, F2, F3, F4 detection logic
  dormancy.ts       — 6-pattern dormancy diagnosis
  ai-tools.ts       — bot fingerprint matching
  commit-voice.ts   — editorial density scoring
  tier.ts           — score → tier mapping
  types.ts          — shared TypeScript types
```

## GitHub API usage per repo scan

| Data needed | API call | Rate cost |
|-------------|----------|-----------|
| Repo metadata | `GET /repos/{owner}/{repo}` | 1 |
| File tree (root) | `GET /repos/{owner}/{repo}/git/trees/HEAD` | 1 |
| package.json (if exists) | `GET /repos/{owner}/{repo}/contents/package.json` | 1 |
| Commits (last 50) | `GET /repos/{owner}/{repo}/commits?per_page=50` | 1 |
| Pull requests (count) | `GET /repos/{owner}/{repo}/pulls?state=all&per_page=1` | 1 |
| CLAUDE.md check | `GET /repos/{owner}/{repo}/contents/CLAUDE.md` | 1 |
| docs/ check | `GET /repos/{owner}/{repo}/contents/docs` | 1 |
| **Total** | | **~7 calls/repo** |

At 5,000 req/hr: ~700 repos/hr per user token. Sufficient for the ICP (5–50 repos).

## Security

- GitHub token stored encrypted in Supabase (vault extension)
- Token scoped to read-only: `repo:read` for private repos, `public_repo` for public
- No code is ever stored — only metadata (commit authors, file names, PR counts)
- RLS (Row Level Security) on all tables: users only see their own scans
- Stripe webhook verified with signature header
- All API routes protected with `getUser()` server-side check

## Scalability assumptions

- MVP target: 0–500 users, 0–25,000 repos total
- Supabase free tier: 500MB DB, 50,000 MAU — sufficient for launch
- Edge Function timeout: 30s — enough for ≤50 repos in one scan call
- Large portfolios (>50 repos): split into background job with progress polling
