-- Enable UUID extension
create extension if not exists "pgcrypto";

-- User profiles (extends Supabase auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  github_username text not null unique,
  plan text not null default 'free' check (plan in ('free', 'pro', 'team')),
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on sign-up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, github_username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'user_name', new.email)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Repo scans
create table public.repo_scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  github_repo_id bigint not null,
  owner text not null,
  name text not null,
  language text,
  last_commit_at timestamptz,
  f1 boolean not null default false,
  f2 boolean not null default false,
  f3 boolean not null default false,
  f4 boolean not null default false,
  tier text not null check (tier in ('A', 'B', 'C', 'D')),
  dormancy_pattern text not null,
  ai_tools text[] not null default '{}',
  human_commit_ratio numeric(4,3) check (human_commit_ratio between 0 and 1),
  raw_evidence jsonb,
  scanned_at timestamptz not null default now()
);

create index on public.repo_scans (user_id, scanned_at desc);
create index on public.repo_scans (user_id, tier);
create index on public.repo_scans (user_id, github_repo_id, scanned_at desc);

alter table public.repo_scans enable row level security;

create policy "Users can view own scans"
  on public.repo_scans for select
  using (auth.uid() = user_id);

create policy "Users can insert own scans"
  on public.repo_scans for insert
  with check (auth.uid() = user_id);

-- Latest scan per repo (view for dashboard)
create view public.latest_scans as
  select distinct on (user_id, github_repo_id) *
  from public.repo_scans
  order by user_id, github_repo_id, scanned_at desc;

-- Playbook purchases
create table public.playbook_purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  playbook_slug text not null,
  stripe_payment_intent text,
  purchased_at timestamptz not null default now(),
  unique (user_id, playbook_slug)
);

alter table public.playbook_purchases enable row level security;

create policy "Users can view own purchases"
  on public.playbook_purchases for select
  using (auth.uid() = user_id);

-- Alert subscriptions
create table public.alert_subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  alert_type text not null check (alert_type in ('tier-change', 'dormancy', 'bot-spike')),
  enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (user_id, alert_type)
);

alter table public.alert_subscriptions enable row level security;

create policy "Users can manage own alerts"
  on public.alert_subscriptions for all
  using (auth.uid() = user_id);
