# MVP Roadmap

## Scope principle

**Build the minimum that delivers the "aha moment": a user connects GitHub, sees their portfolio table with tier scores in under 60 seconds, clicks one repo, and reads a dormancy diagnosis they couldn't have easily produced themselves.**

Anything that doesn't serve this moment is post-MVP.

---

## MVP: in scope (Weeks 1–4)

### Week 1 — Auth + scan pipeline

- [ ] Next.js app scaffold (App Router, TypeScript, Tailwind)
- [ ] Supabase project setup: auth, DB schema (profiles, repo_scans)
- [ ] GitHub OAuth flow (read-only scopes: `public_repo`, `read:user`)
- [ ] Classifier service: F1, F2, F3, F4 detection in TypeScript
- [ ] Dormancy pattern detection: all 6 patterns
- [ ] AI tool attribution: 6 bot fingerprints
- [ ] Single-user scan: fetch all repos, classify, write to Supabase
- [ ] Basic portfolio table (no styling): repo name, tier, F1-F4 checkboxes

**Gate**: scan ereztash's own repos, verify tier scores match the manual analysis in `26-repos.md`

### Week 2 — Core UI

- [ ] Portfolio dashboard: styled table, tier badges, sort/filter
- [ ] Repo detail page: tier breakdown, dormancy diagnosis, AI tools, evidence bullets
- [ ] Playbook prescription (text-only, no purchase flow): show playbook name + one-liner
- [ ] Loading states + error handling
- [ ] Deploy to Vercel

**Gate**: show to 3 warm-network users; get qualitative confirmation that the diagnosis "aha" moment lands

### Week 3 — Monetization

- [ ] Stripe integration: Pro plan subscription ($19/mo)
- [ ] Paywall: 4th repo detail triggers upgrade modal
- [ ] Private repo scanning (Pro only): add `repo` scope to OAuth on upgrade
- [ ] Playbook content in-app (Pro): render the 6 playbooks as markdown
- [ ] 7-day Pro trial on sign-up

**Gate**: first paying user

### Week 4 — Retention + polish

- [ ] Resend integration: welcome email + weekly digest (Pro)
- [ ] Dormancy alert: email if Tier B repo silent for 30 days (Pro)
- [ ] Manual rescan button (free: 1/day, Pro: 1/hr)
- [ ] "Last scanned" timestamp on portfolio table
- [ ] Mobile-responsive layout check
- [ ] Basic analytics: PostHog or Vercel Analytics

**Gate**: 10 users signed up, 1 paying

---

## Post-MVP backlog (Months 2–3)

### Month 2
- [ ] Annual billing option ($180/yr)
- [ ] CSV export (Pro)
- [ ] Commit voice score UI (H5 proxy, paid)
- [ ] Hebrew landing page variant
- [ ] Product Hunt launch prep

### Month 3
- [ ] Team tier: multi-user access, shared portfolio view
- [ ] Slack integration: dormancy alerts to channel
- [ ] API access (REST): `GET /api/repos/{owner}/{repo}/tier`
- [ ] Playbook bundle purchase flow (Gumroad sync)

### Not building (ever, unless strong user demand)
- Code quality metrics (not our moat)
- AI-powered code suggestions (not our moat)
- CI/CD integration (wrong surface)
- Mobile app (web is sufficient)
- Public profiles / social sharing (privacy risk, low demand signal)

---

## Technical decisions at MVP

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Auth | Supabase Auth | GitHub OAuth built-in, no custom auth code |
| DB | Supabase Postgres | Managed, free tier sufficient, RLS built-in |
| Payments | Stripe Checkout | Fastest to production; no custom checkout UI |
| Styling | Tailwind + shadcn/ui | Fastest to decent-looking UI |
| Deployment | Vercel | One-command deploy, no DevOps |
| Analytics | Vercel Analytics (free) | Privacy-respecting, zero config |
| Email | Resend | $20/mo, simple SDK, developer-friendly |

---

## Definition of done (MVP)

MVP is done when:
1. A new user can sign up via GitHub OAuth in < 30 seconds
2. A portfolio with 25 repos scans in < 60 seconds
3. Each repo shows correct tier score (validated against manual `26-repos.md` ground truth)
4. Dormancy diagnosis displays for at least 3 dormancy patterns
5. One paying Pro subscriber exists
6. No known data privacy issues (code not stored, RLS active)
