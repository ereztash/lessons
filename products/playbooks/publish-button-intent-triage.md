# Publish-Button Intent Triage — The 5-Minute Interview at Repo-Birth

> Tagline: Decide in 5 minutes whether your new Lovable / Bolt / v0 repo deserves CLAUDE.md infrastructure or should be shipped at Tier C and forgotten.

> **Claim strength: observational.** Its backing insight (`publish-button-satisfiability`) carries
> `may-assert-cause: no` — the pattern holds at moderate strength in 2 repos and was not observed in
> any Tier A repo of the 2026-08-19 round. **Use it to sort repos, not to explain them.** The
> triage question is worth asking; the answer is a prior, not a diagnosis.

## Target buyer

**Solo AI-paired builders who have started ≥3 Lovable (or Bolt.new, v0.dev, Replit Agent) repos and have at least one repo that they abandoned without ever opening a local editor.**

More specifically: indie hackers and consultants on month 2+ of LLM-tool-paired building who feel cognitive overhead from "how seriously should I take this new repo?" and want a defensible rule.

## Rework hours saved per session

**2-6 hours per misallocated repo** — the cost of installing CLAUDE.md / LOG.md / docs/ scaffolding on a repo whose intent is fully Tier-C-satisfied (or, conversely, the cost of failing to pre-plan a behavioral-success repo and missing its 72-minute resumption window).

Over a portfolio of 10 LLM-tool-paired repos, the expected savings is 8-15 hours total — roughly one work day reclaimed.

## Problem statement

LLM-coding platforms (Lovable, Bolt.new, v0.dev, Replit Agent) ship with a built-in exit affordance: the Publish button. In the repos surveyed, the operator's relationship with this button tracked whether the repo ever left Tier C. That is an association across a small sample, not a mechanism: 2026-08-19 found the pattern absent from every Tier A repo in the round, which is consistent with it marking a kind of repo rather than causing an outcome. When the success condition is *demonstrative* (render a vision, render a manifesto, render a pitch as a web page), the Publish button fully satisfies the goal — the repo is finished the moment it ships, and any further infrastructure investment is wasted. When the success condition is *behavioral* (improve a measurable skill, convert leads via a real form pipeline, persist user state across sessions), the Publish button cannot satisfy the goal, and the operator will need to leave the platform — but only if they planned the off-platform work in advance. Most operators do not pre-classify their repos, so they over-invest in some Tier-C-finished ones and under-invest in some Tier-B-bound ones, losing hours in both directions.

## The playbook

### The 5-minute Interview (7 questions)

Ask yourself, at repo-birth, before writing the first prompt:

1. **Success condition**: In one sentence, what does "this project is done" look like? Write it down.
2. **Stakeholder presence**: Will I show this to someone other than myself? If yes, is the showing a one-time event (pitch, demo) or a recurring relationship (consulting funnel, customer dashboard)?
3. **Off-platform dependence**: Does the success condition require ANY of: a real-world API I must authenticate with, a database that persists user state, a PWA install, a paid subscription gate, or a measurable behavior change (skill, habit, conversion rate)?
4. **The Publish test**: If I imagine pressing Lovable's Publish button right now (skeleton repo, default scaffolding, no content), does my success condition look 80% satisfied?
5. **Resumption willingness**: If I close my laptop tonight, how likely am I (0-100%) to open this repo again within 14 days?
6. **Cost-to-resume comfort**: If the answer to Q5 is <50%, am I okay leaving this repo at Tier C permanently?
7. **Infrastructure commitment**: Am I willing to spend 30+ minutes today on CLAUDE.md / docs / .github setup?

### Decision tree

- **Q3 = no AND Q4 = yes**: Demonstrative success. Plan for Tier C. **Do NOT install CLAUDE.md, do NOT create docs/, do NOT open a PR.** Use Lovable end-to-end. Press Publish. Move on. Estimated total time: 1-4 hours.
- **Q3 = yes (any item) AND Q4 = no**: Behavioral success. Plan for Tier B at minimum. Stage your 72-minute resumption sprint (see `resumer-day-prep.md` playbook). Add ONE non-template dependency to package.json early as a commitment device. Skip CLAUDE.md unless Q7 = yes.
- **Q3 = yes AND Q4 = yes**: Behavioral success disguised as demonstrative. The most dangerous quadrant. Default to Tier B prep; revisit at week 1.
- **Q3 = no AND Q4 = no**: Confused intent. Re-write your Q1 success condition until you can place yourself in one of the other three quadrants. Do not start coding yet.

### Templates

Drop this into a `INTENT.md` at repo-root (one file, ≤20 lines):

```markdown
# Intent

## Success condition
<one sentence>

## Type
[ ] Demonstrative — Publish-button satisfies it
[ ] Behavioral — requires off-platform work

## Off-platform dependencies
- [ ] Real API integration
- [ ] Persistent user state
- [ ] PWA install
- [ ] Paid gate
- [ ] Measurable behavior change

## Tier plan
[ ] Tier C — finish in Lovable, never open locally
[ ] Tier B — 72-minute resumption sprint planned for <date>
[ ] Tier A — managed system; CLAUDE.md + docs/ + PRs from day one

## Resumption deadline
If this repo is dormant past <date + 30 days>, archive without guilt.
```

## Evidence

- **core-unified-consciousness** (Lovable repo) — 54 bot commits in 133 minutes, then a `Update site info for publish` commit, then 64 days of silence. README still says `REPLACE_WITH_PROJECT_ID` ×3; package.json still named `vite_react_shadcn_ts`. Tier C, finished by definition. Reference: core-unified-consciousness@12:00, core-unified-consciousness@12:06, core-unified-consciousness@12:07.
- **groundstate-protocol** — initial Lovable build, then 37-day silence, then `dc90fee` (2026-04-14) pivots the entire product to a converting landing page because the conversion success condition wasn't Publish-button-satisfiable. 9 weeks of sustained editorial activity follow. Reference: groundstate-protocol@11:00.
- **chess-mind-patterns** — Lovable bot built analytic widgets; resumer added action widgets, Lichess deep-links, PWA service worker, all together in the final commit of a 72-minute sprint. Reference: chess-mind-patterns@11:07.

## When to use

- Starting any new Lovable / Bolt / v0 / Replit Agent repo
- Auditing an existing repo in your portfolio to decide whether to invest more or archive
- Onboarding a friend or client to LLM-tool-paired building (they will mis-classify their first 3-5 repos without this)

## When NOT to use

- Repos with collaborators (the interview is single-operator; multi-operator dynamics are out of scope)
- Repos with a fixed external deadline (the deadline dictates Tier A regardless of intent)
- Production systems (the triage is for greenfield prototypes)

## Adoption checklist

1. [ ] I have read the interview's 7 questions and can recite the decision tree from memory.
2. [ ] I have a blank `INTENT.md` template saved as a snippet in my editor.
3. [ ] For my next new repo, I will write INTENT.md before writing any code.
4. [ ] For my next 3 existing portfolio repos, I will retroactively classify each into Tier A / B / C using the interview.
5. [ ] For each Tier-C-classified repo, I will resist the urge to install CLAUDE.md.
6. [ ] For each Tier-B-classified repo, I will pre-stage the resumption sprint per `resumer-day-prep.md`.
7. [ ] I will revisit each repo's INTENT.md every 30 days; if dormant past day 30 and Tier C, archive without guilt.

## Cross-references

- Insight source: `/insights/user-to-user/publish-button-satisfiability.md`
- Companion playbook: `/products/playbooks/four-feature-tier-classifier.md`
- Companion playbook: `/products/playbooks/resumer-day-prep.md`
- Pricing row: `/products/pricing-hypotheses.md`
