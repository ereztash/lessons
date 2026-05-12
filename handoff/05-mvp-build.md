# Prompt 05 — MVP Build (Next.js + Supabase + Stripe)

> Paste this AFTER Prompt 04 completed and `/saas/spec/` exists with conviction-statement supporting a build.

---

Build the SaaS MVP web app at `/saas/app/` in the lessons repo. The output is a deployable Next.js 16 application implementing the spec in `/saas/spec/02-product-spec.md`.

## CONTEXT (read first)

- `/saas/spec/02-product-spec.md` — features, UX flows, what the user sees
- `/saas/spec/03-architecture.md` — tech stack, data model, integrations
- `/saas/spec/04-pricing.md` — tier structure, trial mechanics
- `/saas/spec/10-mvp-roadmap.md` — 21-day build plan
- `/saas/scanner/src/classifier/*` — existing classifier code (REUSE, don't reimplement)
- `/saas/scanner/src/fetcher/*` — existing fetcher code (REUSE)

## Tech stack (lock in, no substitutions)

- Next.js 16 (App Router, Server Components, Server Actions)
- TypeScript strict mode
- Tailwind v4 + shadcn/ui (matches cor-sys's stack — reuse component conventions)
- Supabase Auth (GitHub OAuth provider)
- Supabase Postgres
- Stripe (Subscription billing)
- Resend (transactional + digest email)
- Octokit (GitHub API — already in scanner package)
- Hosting: Vercel

## File structure (target)

```
/saas/app/
  README.md                     # Setup, deploy, run instructions
  package.json
  next.config.ts
  tsconfig.json                 # strict mode
  postcss.config.mjs
  tailwind.config.ts
  .env.example                  # all required env vars listed
  .gitignore                    # node_modules, .next, .env.local, etc.
  middleware.ts                 # Supabase auth middleware

  supabase/
    migrations/
      0001_initial_schema.sql   # users, scans, repo_snapshots, tier_history, digest_sends
    seed.sql                    # dev seed data

  src/
    app/
      layout.tsx                # Root layout (font, metadata, providers)
      page.tsx                  # Landing page
      globals.css
      api/
        auth/
          callback/route.ts     # Supabase OAuth callback
          signout/route.ts
        scan/
          start/route.ts        # POST: start a scan (returns scan_id)
          status/[scanId]/route.ts  # GET: poll scan status
        webhook/
          stripe/route.ts       # Stripe webhook (subscription events)
          github/route.ts       # GitHub webhook (push events, invalidate cache)
        cron/
          weekly-digest/route.ts # Vercel cron, sends digests
      (auth)/
        layout.tsx              # Auth-gated layout
        dashboard/
          page.tsx              # Portfolio overview
          [repo]/page.tsx       # Per-repo detail page
          history/page.tsx      # Scan history + tier-trend chart
          settings/page.tsx     # Profile + billing portal
        onboarding/
          page.tsx              # First-scan walkthrough
      pricing/
        page.tsx                # Pricing page (links to playbooks)
      playbooks/
        page.tsx                # Playbook index (sells the bundled IP)
        [slug]/page.tsx         # Render one playbook from /products/playbooks/*

    components/
      ui/                       # shadcn/ui primitives (button, card, badge, etc.)
      tier-badge.tsx            # Color-coded tier label (A=green, B=blue, C=yellow, D=red)
      portfolio-summary.tsx     # Top-line stats card
      repo-card.tsx             # One repo with tier + score
      resumption-rec.tsx        # Recommendation panel with hours-saved estimate
      ai-tool-diversity.tsx     # AI tool badges
      tier-trend-chart.tsx      # Sparkline of tier over time (Recharts)
      upgrade-prompt.tsx        # Modal/inline CTA to upgrade tier
      empty-state.tsx           # Reusable empty state with CTA
      loading-skeleton.tsx

    lib/
      classifier/               # Re-exports from ../../scanner/src/classifier
      github/
        client.ts               # Octokit factory with user's OAuth token
        scan-repo.ts            # Orchestrates per-repo data fetch (reuses scanner logic)
      supabase/
        server.ts               # SSR client (createClient from @/lib/supabase/server)
        client.ts               # Browser client
        admin.ts                # Service-role client (for webhooks)
      stripe/
        client.ts
        sync-subscription.ts    # Sync Stripe state to Supabase
      resend/
        client.ts
        send-digest.ts          # Compose + send weekly digest
        templates/
          weekly-digest.tsx     # React Email template
          welcome.tsx
          tier-change-alert.tsx
      auth/
        get-user.ts             # Server-side auth helper
        require-subscription.ts # Tier gating helper
      types.ts                  # All TypeScript interfaces (User, Scan, RepoSnapshot, etc.)
      utils.ts                  # cn(), formatDate(), etc.

    hooks/
      use-scan-status.ts        # Polls /api/scan/status until done
      use-subscription.ts       # Returns current tier

  public/
    logo.svg
    favicon.ico
```

## Data model (Supabase Postgres)

Write to `supabase/migrations/0001_initial_schema.sql`:

```sql
-- Users (synced from Supabase Auth via trigger)
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  github_username text,
  github_id bigint,
  subscription_tier text default 'free' check (subscription_tier in ('free','solo','team','enterprise')),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  trial_ends_at timestamptz,
  created_at timestamptz default now()
);

-- Scans (each portfolio scan)
create table scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending','running','complete','failed')),
  started_at timestamptz default now(),
  completed_at timestamptz,
  error_message text,
  repo_count integer default 0
);

-- Repo snapshots (one row per repo per scan)
create table repo_snapshots (
  id uuid primary key default gen_random_uuid(),
  scan_id uuid not null references scans(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  repo_name text not null,
  default_branch text,
  visibility text,
  archived boolean default false,
  is_fork boolean default false,
  last_pushed_at timestamptz,
  primary_language text,
  commit_count integer,
  pr_count integer,
  issue_count integer,
  human_commit_count integer,
  author_classes jsonb,         -- {claude: N, cursor: N, ...}
  domain_deps jsonb,            -- array of strings
  readme_status text,           -- filled | placeholder | missing
  has_docs_folder boolean,
  has_claude_md boolean,
  has_log_md boolean,
  four_feature_score integer,   -- 0-4
  tier text not null check (tier in ('A','B','C','D')),
  publish_button_score integer, -- 0-100
  resumption_readiness_score integer, -- 0-100 (null for A and D)
  ai_tools jsonb,               -- ['claude', 'cursor', ...]
  recommendation text,          -- revive | absorb | archive | keep | invest
  recommendation_reasoning text,
  hours_to_act integer,
  created_at timestamptz default now()
);

-- Tier history (longitudinal trend per repo)
create table tier_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  repo_name text not null,
  tier text not null,
  four_feature_score integer,
  scanned_at timestamptz default now(),
  unique(user_id, repo_name, scanned_at)
);

-- Digest send log (avoid duplicates)
create table digest_sends (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  sent_at timestamptz default now(),
  content_summary jsonb
);

-- RLS policies
alter table users enable row level security;
alter table scans enable row level security;
alter table repo_snapshots enable row level security;
alter table tier_history enable row level security;
alter table digest_sends enable row level security;

create policy "users_own_row" on users for all using (auth.uid() = id);
create policy "scans_own" on scans for all using (auth.uid() = user_id);
create policy "snapshots_own" on repo_snapshots for all using (auth.uid() = user_id);
create policy "tier_history_own" on tier_history for all using (auth.uid() = user_id);
create policy "digest_sends_own" on digest_sends for all using (auth.uid() = user_id);

-- Trigger to sync auth.users → public.users
create or replace function handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, github_username, github_id, trial_ends_at)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'user_name',
    (new.raw_user_meta_data->>'provider_id')::bigint,
    now() + interval '14 days'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users for each row execute procedure handle_new_user();
```

## Critical implementation requirements

1. **Reuse scanner logic** — import classifier + fetcher from `../scanner/src/classifier` and `../scanner/src/fetcher`. DO NOT duplicate. Update scanner imports if needed to be importable from the app package.

2. **Free tier caps** — enforce in `/api/scan/start/route.ts`:
   - Free: max 3 repos per scan, 1 scan per 7 days
   - Solo: unlimited repos, 1 scan per hour
   - Team: same as Solo per seat

3. **Trial mechanics**:
   - On signup, set `trial_ends_at = now() + 14 days`, `subscription_tier = 'solo'` (trial = full Solo access)
   - On day 10, send email "3 days left in trial"
   - On day 13, in-app banner
   - On trial expiry without conversion: downgrade to 'free', email "Welcome to Free tier"

4. **Weekly digest cron** — Vercel cron at Monday 8am UTC. For each Solo+ user:
   - Re-scan their portfolio
   - Compose digest: tier changes since last week + top resumption recommendation + 1 playbook tip
   - Send via Resend
   - Log to `digest_sends`

5. **Stripe webhook** — handle `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`. Sync to `users.subscription_tier`.

6. **Error handling** — GitHub rate limit: exponential backoff. Missing package.json: skip dep check, mark feature as fail. Deleted repo: skip with warning. Auth expired: redirect to re-OAuth.

7. **Loading states** — skeletons for all data-bound components. Suspense boundaries around server components.

8. **Empty states** — "No repos found" → check token scope CTA. "No scans yet" → "Run your first scan" CTA.

## Pages (must implement, no stubs)

- `/` (landing) — hero + value prop + 6 playbook cards + pricing teaser + CTA "Scan your portfolio free"
- `/dashboard` (auth-gated) — portfolio summary + repo grid + sort/filter + scan button
- `/dashboard/[repo]` — per-repo detail with all scores, history sparkline, recommendation explanation
- `/dashboard/history` — scan history list + tier-trend chart per repo (last 6 months)
- `/dashboard/settings` — profile + GitHub re-auth + Stripe customer portal link + cancel flow
- `/onboarding` — 4-step walkthrough on first signup (only shown once)
- `/pricing` — 3-tier comparison table + FAQ + testimonial slot
- `/playbooks` — index of 6 playbooks (renders from `/products/playbooks/*.md`)
- `/playbooks/[slug]` — full playbook render (gated for free vs paid)

## README requirements

Write `/saas/app/README.md`:
- 1-paragraph overview
- Setup section:
  - Create Supabase project + run migration
  - Create Stripe account + add products (Solo $19/mo + Team $79/mo) + get webhook secret
  - Create Resend account + verify domain
  - Create GitHub OAuth App + get client ID/secret
  - Copy `.env.example` to `.env.local` and fill
  - `npm install`
  - `npm run dev`
- Deploy section:
  - Vercel: `vercel deploy --prod`
  - Set env vars in Vercel dashboard
  - Configure Stripe webhook URL
  - Configure GitHub OAuth callback URL
- Cost section: monthly infrastructure cost at 0/10/50/100 users
- Roadmap section: v1.1 features (multi-user team workspace, Slack integration, SOC2 prep)

## Quality bar

- **Strict TypeScript** — no `any` without comment justification
- **Working migrations** — `supabase db reset && supabase db push` should produce a working DB
- **Build succeeds** — `npm run build` produces a deployable Next.js app without errors
- **No mocking** — all integrations are real (Supabase, Stripe, Resend, GitHub API)
- **Production-ready** — this is the MVP, not a prototype. Ship-quality code.

## Delivery

Likely too large for single `push_files` call. Split into logical commits:

- Commit 1: scaffolding (package.json, configs, migrations, types, README)
- Commit 2: auth + landing + dashboard pages
- Commit 3: scan API + scanner integration + repo-detail page
- Commit 4: Stripe billing + trial mechanics + settings
- Commit 5: weekly digest cron + email templates + final polish

Each commit retries up to 4 times with exponential backoff on conflict.

Report in chat <500 words:
- All commit SHAs
- File counts per directory
- 3 implementation decisions worth flagging (e.g., chose Vercel cron over Inngest because X)
- Deploy guide: exact commands to run to go from this code to a live URL
- Any TODOs explicitly left for v1.1

## Post-build smoke test (run mentally)

Walk through the user journey:
1. New user lands on `/`
2. Clicks "Scan your portfolio free"
3. Signs in with GitHub
4. Lands on `/onboarding`, clicks "Start scan"
5. Scan runs (10-60 sec), redirects to `/dashboard`
6. Sees 26 repos sorted by tier
7. Clicks one Tier B repo → sees recommendation “Revive: 4 hours work” with reasoning
8. Clicks "Upgrade to Solo" → Stripe checkout → returns to dashboard with all features unlocked
9. Next Monday 8am: receives weekly digest email with this week's tier changes

If any step in the mental walkthrough is broken in the code, fix it before declaring done.

End of Prompt 05.
