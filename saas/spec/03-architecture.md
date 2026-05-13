# Technical Architecture

## Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14 (App Router) | SSR for SEO, server components for data fetching, familiar to target audience |
| Auth | Supabase Auth (GitHub OAuth) | GitHub OAuth is required for API access; Supabase handles sessions |
| Database | Supabase Postgres | Scan results, user accounts, playbook purchases, genesis projects |
| Background jobs | Supabase Edge Functions + pg_cron | Scheduled rescans, alert digests, scaffold generation |
| GitHub API | Octokit REST + GraphQL | REST for commits/PRs/files, GraphQL for batch repo metadata |
| Cache | Supabase Redis (via Upstash) | GitHub API response cache to avoid rate limits |
| Payments | Stripe | Pro/Team subscriptions + one-time playbook purchases |
| Email | Resend | Weekly digest, dormancy alerts, welcome sequence |
| Deployment | Vercel | Zero-config Next.js hosting |
| CLI runtime | tsx + commander | Single binary `npx genesis` distribution |
| LLM (Genesis extraction) | Claude 4.7 via Anthropic API | Elicitation extraction from natural language input |

## The bidirectional architecture

The system has **one classifier service** that operates in two directions:

```
  Reverse (audit)                          Forward (compile)
  ────────────────                          ─────────────────
  GitHub repo → Octokit                    Natural-language intent → LLM elicitation
        ↓                                          ↓
  features.ts: measure F1–F4               compiler.ts: render F1–F4-compliant scaffold
        ↓                                          ↓
  tier.ts: score → A/B/C/D                 validator.ts: sharpness checks
        ↓                                          ↓
  dormancy.ts: 6 pattern diagnosis         output: file tree
        ↓                                          ↓
  repo_scans (Postgres)                    project_genesis (Postgres)
        ↓                                          ↓
             both write to → latest_scans + drift_alerts
```

**Shared library**: `src/lib/classifier/` is the single source of truth. Both modes import from it.

## Data flow

### Reverse (RepoHealth) flow

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
         Write scan results → repo_scans
                          ↓
       Next.js server component reads results
                          ↓
              Render portfolio dashboard
```

### Forward (Genesis) flow

```
User → intent paragraph (web form OR CLI)
                          ↓
           POST /api/genesis/elicit
                          ↓
        Claude 4.7 extracts ProjectSpec IR
                          ↓
         User reviews extracted IR (web)
                          ↓
           POST /api/genesis/compile
                          ↓
     validator.ts: sharpness checks (block on E001–E007)
                          ↓
     compiler.ts: render scaffold file tree
                          ↓
         Write project_genesis row + scaffold to Supabase Storage
                          ↓
  Response: zip URL + repo-create button (creates GitHub repo with scaffold)
                          ↓
  If repo created: link project_genesis.repo_id → repo_scans for ongoing audit
```

## Database schema

```sql
-- Users (managed by Supabase Auth)
create table public.profiles (
  id uuid primary key references auth.users(id),
  github_username text not null unique,
  plan text not null default 'free',
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- ===== Reverse Mode (RepoHealth) =====

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
  tier text not null,
  dormancy_pattern text not null,
  ai_tools text[] not null default '{}',
  human_commit_ratio numeric(4,3),
  commit_voice_score numeric(4,1),
  raw_evidence jsonb,
  scanned_at timestamptz default now()
);
create index on public.repo_scans(user_id, scanned_at desc);
create index on public.repo_scans(user_id, tier);

create view public.latest_scans as
  select distinct on (user_id, github_repo_id) *
  from public.repo_scans
  order by user_id, github_repo_id, scanned_at desc;

-- ===== Forward Mode (Genesis) =====

create table public.elicitation_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  raw_intent text not null,                  -- the user's paragraph
  language text not null default 'en',
  llm_model text not null,                   -- e.g. 'claude-sonnet-4-6'
  extracted_spec jsonb not null,             -- the ProjectSpec IR
  user_reviewed boolean not null default false,
  user_edits jsonb,                          -- diff vs extracted_spec
  started_at timestamptz default now(),
  completed_at timestamptz
);
create index on public.elicitation_sessions(user_id, started_at desc);

create table public.project_genesis (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  elicitation_id uuid not null references public.elicitation_sessions(id),
  project_name text not null,
  domain text not null,
  language text not null,
  final_spec jsonb not null,                 -- IR after user review
  contract_yml text not null,                -- emitted sharpness contract
  scaffold_storage_path text not null,       -- Supabase Storage path to zipped scaffold
  validation_report jsonb not null,          -- ValidationReport from validator.ts
  github_repo_id bigint,                     -- if user created GitHub repo from scaffold
  github_repo_url text,
  generated_at timestamptz default now()
);
create index on public.project_genesis(user_id, generated_at desc);
create index on public.project_genesis(github_repo_id) where github_repo_id is not null;

-- ===== Cross-mode (drift detection links forward → reverse) =====

create table public.drift_alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  genesis_id uuid not null references public.project_genesis(id),
  scan_id uuid not null references public.repo_scans(id),
  drift_type text not null,                  -- 'feature_lost' | 'sharpness_decayed' | 'anti_pattern_removed'
  drift_detail jsonb not null,
  acknowledged boolean not null default false,
  detected_at timestamptz default now()
);
create index on public.drift_alerts(user_id, detected_at desc) where not acknowledged;

-- ===== Playbook purchases (unchanged) =====

create table public.playbook_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id),
  playbook_slug text not null,
  stripe_payment_intent text,
  purchased_at timestamptz default now(),
  unique(user_id, playbook_slug)
);
```

## API endpoints

### Reverse mode (existing)

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/scan/start` | Trigger background scan of user's repos |
| `GET`  | `/api/scan/status/:jobId` | Poll scan progress |
| `GET`  | `/api/repos` | List latest scan per repo for current user |
| `GET`  | `/api/repos/:id` | Repo detail with full evidence |

### Forward mode (new)

| Method | Path | Purpose | Auth |
|--------|------|---------|------|
| `POST` | `/api/genesis/elicit` | Submit intent paragraph → returns elicitation_id + extracted ProjectSpec | required |
| `GET`  | `/api/genesis/elicit/:id` | Fetch elicitation session for review | required |
| `PATCH` | `/api/genesis/elicit/:id` | Submit user edits to the extracted IR | required |
| `POST` | `/api/genesis/compile` | Validate IR + emit scaffold; body `{ elicitation_id }` | required |
| `GET`  | `/api/genesis/:id` | Get project_genesis row + signed scaffold URL | required, owner only |
| `POST` | `/api/genesis/:id/create-repo` | Create GitHub repo from scaffold + link for ongoing audit | required, owner only |

### CLI integration

The `npx genesis` CLI is a thin client over `/api/genesis/elicit` + `/api/genesis/compile`. Auth via Personal Access Token stored in `~/.config/repohealth/token`.

Local-only mode (no API call): runs validator + compiler against a pre-extracted `project.spec.json` provided by the user. Useful for power users who want to hand-author the IR. **This is the prototype mode** — see `saas/app/scripts/genesis/`.

## Classifier service (TypeScript)

Lives in `src/lib/classifier/`. Pure functions, no side effects, fully testable. Both modes import from this.

```
src/lib/classifier/
  index.ts          — entry points: classifyRepo() (reverse) + compileProject() (forward)
  features.ts       — F1, F2, F3, F4 measurement (reverse) AND construction (forward)
  dormancy.ts       — 6-pattern dormancy diagnosis (reverse only)
  ai-tools.ts       — bot fingerprint matching (reverse only)
  commit-voice.ts   — editorial density scoring (reverse only)
  tier.ts           — score → tier mapping (shared)
  types.ts          — shared TypeScript types incl. ProjectSpec IR
  genesis/
    elicitor.ts     — LLM-driven elicitation OR fixture-based loader
    validator.ts    — sharpness constraints checker (compile-time blocker)
    compiler.ts     — ProjectSpec → scaffold output
    templates/      — renderers per file type (CLAUDE.md, LOG.md, etc.)
```

## GitHub API usage per repo scan (unchanged)

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

## LLM usage per Genesis compile

| Call | Tokens (est.) | Cost (Claude Sonnet 4.6) |
|------|---------------|--------------------------|
| Elicitation extraction (intent → IR) | ~3,000 in / ~2,000 out | ~$0.04 |
| Voice-sample generation (optional refinement) | ~500 in / ~500 out | ~$0.01 |
| **Total per genesis** | ~6,000 tokens | **~$0.05** |

At $19/mo Pro tier with unlimited genesis: cost-of-goods stays under $1/user/month even at heavy use.

## Security

- GitHub token stored encrypted in Supabase (vault extension)
- Token scoped to read-only: `repo:read` for private repos, `public_repo` for public; **Genesis create-repo flow requests `repo:write` only at that point**
- No code is ever stored — only metadata (reverse) or scaffold artifacts (forward, in Supabase Storage with TTL)
- RLS on all tables: users only see their own data
- Stripe webhook verified with signature header
- All API routes protected with `getUser()` server-side check
- CLI tokens (PATs) revocable from `/settings/cli-tokens`

## Drift detection (forward → reverse loop)

When a user creates a GitHub repo via Genesis, `project_genesis.github_repo_id` is set. From then on:

1. The repo is auto-included in the user's nightly scan (RepoHealth side)
2. After each scan, compare current tier features against `project_genesis.final_spec` + `contract_yml`
3. If F1–F4 score drops, OR anti-patterns in CLAUDE.md no longer match the contract, OR vocabulary terms are leaking → insert into `drift_alerts`
4. Pro tier: emails the user. Team tier: posts to Slack.

This is the **continuous Tier A enforcement** that makes the hosted service worth paying for. The CLI alone gives you the day-zero scaffold; the hosted service keeps it Tier A through month 12.

## Scalability assumptions

- MVP target: 0–500 users, 0–25,000 repos audited, 0–1,000 projects genesis-created
- Supabase free tier (500MB DB, 50,000 MAU): sufficient for launch
- Edge Function timeout: 30s. Genesis compile fits comfortably; elicitation LLM call may need 20–60s for complex domains → use background job with polling
- Storage: scaffold zips ~50KB each. 1,000 projects = 50MB. Negligible.
