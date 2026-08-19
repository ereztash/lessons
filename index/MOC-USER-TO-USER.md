# MOC — User → User

> Map of Content: every promoted insight about the user's personal workflow leverage — cadence, decision hygiene, knowledge retention, productization habits.

**Dimension definition**: ereztash's self-work. Patterns for:
- Decision capture (when, where, format)
- Cadence (session frequency, sprint shape)
- Knowledge retention (LOG.md analog for personal use)
- Resumption strategies (returning to dormant projects)
- Productization discipline (insight → playbook → price)

In this dataset, user→user is the most populous dimension — 8 promoted patterns. The reason: every observed repo is a single-operator repo, so almost every meta-decision (when to use which AI, when to write `CLAUDE.md`, when to resume) is a self-work decision visible only as a behavioral signature in the git artifacts. This dimension also carries the single most operationally useful finding in the dataset: the publish-button-satisfiability hypothesis.

## Patterns in this dimension

### lovable-render-claude-write-coexistence
**Source observations**: groundstate-protocol@11:01 (lovable-dev[bot] commits continue *after* Claude takes over; `e8a12bc` 2026-05-06 12:57 lands between PR#8 merge and PR#9 start as the operator opens Lovable's editor for a preview check); chess-mind-patterns@11:04 (bot built 33 analytic widgets and 24 engines; human added 8 action widgets backed by 6 engines — a 4:1 ratio that suggests parallel construction rather than refactor)
**Description**: Lovable and Claude Code coexist as non-substitutable surfaces in the same repo. Lovable is the *render-and-review* surface (the operator opens Lovable's editor, views the rendered page, requests preview changes); Claude Code is the *write* surface (commits, branches, PRs). The two AI tools serve different cognitive moments and sequence cleanly rather than conflict. The operator's behaviour: code via Claude Code in a local editor; render via Lovable's web UI; commit no-op `Update site info for publish` or `Lovable update: check the new text` artifacts when reviewing in Lovable. Recognizable in any repo by the alternation of `Claude <noreply@anthropic.com>` and `lovable-dev[bot] <...>` authors with timestamps interleaving within hours.
**Monetization fit**: pass — productizable as a "dual-AI-surface workflow" playbook (Lovable as render, Claude as write) with the explicit cadence pattern.
**Distilled insight**: `/insights/user-to-user/lovable-render-claude-write-coexistence.md`
**Related playbook**: `/products/playbooks/dual-ai-surface-workflow.md`

### non-template-domain-dep-predicts-resumption
**Source observations**: core-unified-consciousness@12:01 (zero non-template production deps; abandoned at Tier C); chess-mind-patterns@11:01 (one non-template dep — `chess.js@^1.4.0`, installed as build-error fix at commit 64; promoted to Tier B and resumed); cor-sys (many non-template deps; Tier A managed system); groundstate-protocol (Web3Forms + GA4 + Calendly as third-party SaaS, weak match because they are SaaS not npm)
**Description**: The presence of even one non-template production dependency acts as a *commitment device*. Once `chess.js` is in `package.json`, the project has crossed a threshold of specificity that makes "this is a chess tool" irreversible; the operator's psychology likely treats ambiguous artifacts as disposable demos and specific artifacts as ongoing products. Operationally, when evaluating a Lovable-bootstrapped repo's resumption likelihood, count the non-template production dependencies — zero means concept demo (high abandonment risk), one or more means committed product (high resumption likelihood).
**Monetization fit**: pass — directly portable as a one-row diagnostic in a portfolio-triage tool; trivial to automate as `count(deps) - count(template-default-deps)`.
**Distilled insight**: `/insights/user-to-user/non-template-domain-dep-predicts-resumption.md`

### bot-blast-then-human-resumption
**Source observations**: chess-mind-patterns@11:00 (174-commit bot blast over 10h28m, then 14d20h gap, then 72-minute 3-commit human sprint adding 4,462 LOC and 22 new files); groundstate-protocol@11:00 (Lovable bot phase 2026-03-08, then 37-day silence, then Claude pivot on 2026-04-14 with `dc90fee` adding Landing.tsx and demoting GroundState to `/groundstate` archive route)
**Description**: The resumption shape is trimodal — bot blast, silence, human burst. The bot phase ends mid-feature; the silence is incubation (not abandonment); the human burst starts with substantive feature commits and ends mid-feature. The signature is consistent across the two resumed repos: when resumption happens, it happens in <2 hours, with `feat:`-prefixed conventional commits, Co-Authored-By Claude trailers, and *additive* changes (no bot-file deletions). The predictor of resumption-vs-abandonment is not the bot-blast duration (chess-mind 10h28m vs core-unified 2h13m, both abandoned-or-resumed) but the operator's external success condition, which can only be inferred from the dependency manifest and integration code.
**Monetization fit**: pass — codifiable as a "resumption-day-prep" playbook: the operator knows they have one ~72-minute window, knows they should not refactor the bot's output, knows they should layer action-engines on top of analytics-engines.
**Related playbook**: `/products/playbooks/resumer-day-prep.md`

### readme-placeholder-survives-to-head
**Source observations**: chess-mind-patterns@11:08 (README.md byte-identical to Lovable template default with `REPLACE_WITH_PROJECT_ID` placeholder in three places at HEAD); core-unified-consciousness@12:06 (same `REPLACE_WITH_PROJECT_ID` x3, `package.json` name still `vite_react_shadcn_ts`, `index.html` still says `<title>Lovable App</title>` with the TODO comment intact)
**Description**: For single-operator prototypes with no external collaborators, README rot is rational — the operator has full context in their head; the cost of writing a README is non-zero; the marginal value (to themselves) is near-zero. Three independent template placeholders typically survive together: `README.md`'s `REPLACE_WITH_PROJECT_ID`, `package.json`'s `name: "vite_react_shadcn_ts"`, and `index.html`'s placeholder title. The presence of *all three* is the canonical "this is not a public-facing repo" marker — a Tier C or Tier B prototype regardless of public visibility on GitHub.
**Monetization fit**: pass — productizable as a "Lovable-template placeholder audit" diagnostic plus a "resumer's README seed" template that fills the three placeholders in <2 minutes when the operator decides to promote a repo from prototype to system mode.

### zero-issues-zero-prs-prototype-shape
**Source observations**: chess-mind-patterns@11:06 (zero PRs, zero issues, no `docs/`, no `.github/`, no `CLAUDE.md`, README unchanged); core-unified-consciousness root listing (same — zero PRs, zero issues, no docs); contrast cor-sys (16 PRs, 32 docs files, full system-mode infrastructure)
**Description**: A repo with zero PRs *and* zero issues *and* no `docs/` folder *and* no `CLAUDE.md` is in prototype mode. This is a deliberate mode-choice at repo-birth, not a maturity stage to be transcended. The infrastructure split is binary in the dataset — repos either have all four (cor-sys) or zero of all four (chess-mind, core-unified). groundstate-protocol is the only borderline case (has PRs but no docs / issues / CLAUDE.md), which is the editorial-brand-surface variant.
**Monetization fit**: pass — directly maps to the Tier B/C classifier; productize as a 30-second "prototype vs system" repo audit.
**Distilled insight**: `/insights/user-to-user/zero-issues-zero-prs-prototype-shape.md`

### third-party-saas-replaces-backend
**Source observations**: groundstate-protocol@11:09 (Web3Forms for form-to-email, GA4 for analytics, Calendly for scheduling — no database, no Supabase, no Node API, no SSR; static SPA deployable to any CDN); chess-mind-patterns@11:07 (Lichess deep-links as external practice URLs, PWA + service worker for notifications, all third-party-integration code lands together in the final commit)
**Description**: For brand-surface or personal-tool repos, third-party SaaS replaces self-hosted backend. Web3Forms + GA4 + Calendly turn a Vite SPA into a complete consulting funnel without a server. Lichess + PWA + service-worker turn a chess analyzer into an installable practice companion without a server. The trade-off is *placeholder discipline* — `ACCESS_KEY = 'PLACEHOLDER_REPLACE_ME'` survives at HEAD and must be replaced at deploy. The PR-body `## דגלים` (flags) section is the operator's mechanism for not forgetting (groundstate-protocol). The pattern works because consulting-page-success and personal-tool-success do not need a server.
**Monetization fit**: pass — productize as a "SaaS-stack-only deployment" template with the placeholder-flag discipline embedded; especially valuable for solo consultants who would otherwise overbuild a backend.
**Distilled insight**: `/insights/user-to-user/third-party-saas-replaces-backend.md`

### publish-button-as-success-condition
**Source observations**: core-unified-consciousness@12:00 (133-minute publish-and-walk-away; HEAD commit `Update site info for publish`; 64 days of silence after); groundstate-protocol@11:00 (5-week silence then Claude pivots because Lovable's publish-button success is unsatisfied — the operator wants a converting landing page, not just any rendered page); core-unified@12:07 (re-framed Hypothesis C: the operator's success condition, not the template, predicts outcome)
**Description**: A Lovable-bootstrapped repo is at high risk of abandonment when the operator's success condition can be satisfied by pressing Lovable's Publish button once. Conversely, a Lovable-bootstrapped repo is likely to be resumed when the success condition requires the operator or the deployed product to do something Lovable's preview cannot do — improve a measurable skill, ship a deployable PWA, integrate with a real-world API. Behavioral success conditions require leaving Lovable; demonstrative success conditions do not. This is the single most operationally useful finding in the dataset and generalizes to any LLM-coding-tool repo (not just Lovable).
**Monetization fit**: pass — the highest-leverage user-to-user pattern in the dataset; productize as a 5-minute "intent triage" interview at repo-birth that lets the operator decide whether to invest in system-mode infrastructure or to plan for Tier C completion.
**Related playbook**: `/products/playbooks/publish-button-intent-triage.md`

### four-feature-tier-classifier-monotonic
**Source observations**: core-unified-consciousness@12:09 (4-feature classifier proposed: non-template dep, human commit, PR, CLAUDE.md/docs); confirmed across the cohort in synthesis § 7 — cor-sys 4/4 = Tier A, chess-mind 2/4 = Tier B, core-unified 0/4 = Tier C; groundstate-protocol is borderline 2-3/4 but functions as Tier A through editorial discipline substituting for documentation
**Description**: Four binary features partition a Lovable-bootstrapped repo into Tier A (managed system), Tier B (resumed prototype), or Tier C (abandoned): (1) any non-template production dependency? (2) any human commit ever? (3) any PR ever? (4) any CLAUDE.md or `docs/` folder? Repos accumulate rungs in order and never regress. The feature count is the resumption-likelihood score. Resumption probability conditional on rung-0 persistence beyond 30 days is empirically near-zero in this dataset (core-unified at 64 days of silence).
**Monetization fit**: pass — the cleanest portfolio-triage diagnostic in the dataset; productize as a `tier-classifier` GitHub Action or a one-shot CLI that scores a repo and emits the recommended next action (resume now / write CLAUDE.md / archive).
**Related playbook**: `/products/playbooks/four-feature-tier-classifier.md`

## Candidate raw observations (single-repo, not promoted)

- meta-tooling-co-shipped-with-product (cor-sys@10:00 only — but conceptually paired with publish-button-as-success-condition)
- docs-folder-as-issue-tracker (cor-sys@10:12 only — works only for single-operator AI-paired repos)
- repo-as-unification-absorption-target (cor-sys@10:10 only — CampaignCraft absorbed in 1m14s PR#16)
- analytics-then-action-bot-human-split (chess-mind@11:04 only — 4:1 ratio diagnostic)
- lovable-sync-branch-noise (groundstate@11:08 only — 9 `lovable-sync-*` branches as tombstones)
- absorbed-rather-than-shipped (CampaignCraft inferred via cor-sys PR#16; added gap-closure round; see `/research/cor-sys/campaigncraft-absorption-detail.md`)

## Related playbooks

- `/products/playbooks/publish-button-intent-triage.md`
- `/products/playbooks/four-feature-tier-classifier.md`
- `/products/playbooks/dual-ai-surface-workflow.md`
- `/products/playbooks/resumer-day-prep.md`

## Cross-references

- Companion matrix: `/research/cross-repo/patterns-matrix.md`
- Narrative: `/research/cross-repo/synthesis.md` § 1, § 4, § 5, § 7, § 10
- CampaignCraft profile: `/research/cor-sys/campaigncraft-absorption-detail.md`
- Source observations:
  - `/research/cor-sys/extracted-insights.md`
  - `/research/groundstate-protocol/extracted-insights.md`
  - `/research/chess-mind-patterns/extracted-insights.md`
  - `/research/core-unified-consciousness/extracted-insights.md`
- Schema: `/insights/_template.md`
- Pipeline: `/pipelines/insight-extraction.md`

---

## Round 2 additions (2026-08-19 ingestion round)

### commercial-doc-as-spec
**Source observations**: anti-silo `docs/INVESTOR_BRIEF.md`, `LAUNCH_READINESS.md`, `CONSULTANT_PILOT.md`, `DISTRIBUTION.md`, `ADVERSARIAL_REVIEW_2026-07-16.md` (the earliest dated the repo's first day); anti-silo@1785182943 "docs: make the README answer a technical buyer"; Agent-Architect `product/` (`OFFER.md`, `PRODUCT_DEFINITION.md`, `landing.html`, `sample-report.md`) and a README stating 76–82% product-core confidence
**Description**: Business documents committed at repo-start, functioning as specification rather than launch collateral. A README that must answer a technical buyer constrains what the code is allowed to claim; a stated confidence interval can be re-rated by a fixture run and therefore can be wrong. This is the inverse of `readme-placeholder-survives-to-head` — the placeholder survives precisely in repos where nobody ever had to state a claim.
**Monetization fit**: pass — a repo-start document set, sold as a constraint mechanism rather than as marketing.
**Distilled insight**: pending distillation

### resumption-gap-predicts-pivot-vs-continuation
**Source observations**: agency-insight-analyzer (11-hour gap: 11 bot commits ending 2026-06-11 21:32, first Claude commit 2026-06-12 08:47 — resumption *extends* the same product); groundstate-protocol (37-day gap: the grounding tool becomes a landing page, old flow demoted to `/groundstate`); chess-mind-patterns (14-day gap, 72-minute resumption sprint)
**Description**: Gap length predicts what resumption *does*, not just whether it happens. Short gap (hours) → continuation. Long gap (weeks) → product pivot. The mechanism is memory: after five weeks the operator no longer holds the product idea and re-decides it; overnight they still hold it and merely extend it. Sharpens `bot-blast-then-human-resumption`, which treated all resumptions alike, and gives the `resumer-day-prep` playbook a branch: prepare for a *decision* above ~2 weeks, prepare for *context* below it.
**Monetization fit**: pass — a threshold that changes the re-entry ritual; extends a shipped playbook.
**Distilled insight**: pending distillation

### mirror-repo-as-agent-access-shim *(candidate — 1 repo)*
**Source observations**: CRM_Google_ai — 4 commits: an initial commit, a README edit, and two whole-tree mirrors of `ereztash/_crm` (385 files); README CI badge still points at the source repo; repo name names the tool it was created for
**Description**: A new terminal state alongside `absorbed-rather-than-shipped`: not abandoned, not resumable, and containing no original work — a repo created because a tool could reach GitHub but not the original location. It scores 3/4 on F1–F4 because the classifier reads the *mirrored* files, so the tier is inflated. Rule: if ≥50% of commits are whole-tree syncs naming another repo, classify as `mirror` and score the source. Second-order hazard: the mirror carries the source's `CLAUDE.md`/`LOG.md`, which then address a working tree that does not exist here.
