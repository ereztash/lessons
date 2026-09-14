# Repo Index — Machine-Readable Lookup

> One entry per repo in the ereztash portfolio.
> Claude Code working on repo X with lessons access: grep for `## <repo-name>`, load the entry, begin.
>
> Source: portfolio scan n=25 (2026-05-12), extended to n=30 by the ingestion round of 2026-08-19.
> Update when: tier changes, deep-dive completed, new findings.
> Canonical data: `research/portfolio-scan/26-repos.md` + `research/portfolio-scan/2026-08-19-rescan.md`
> **Before trusting any "AI tools" line below**, read `research/cross-repo/authorship-attribution.md` —
> author-name counting undercounts AI work, and every "none detected" that was checkable proved wrong.
>
> **The Tier lines below are SUPERSEDED.** All 31 repos were re-measured on 2026-08-19 with an
> external-consumer feature (F5): `ground-truth/f5-rescore-2026-08-19.md`. Under the new rule,
> Tier A goes from 13 repos to 2 (`MATI`, `anti-silo`) and 23 repos move down one tier. The entries
> below are left unrewritten on purpose — replacing one unvalidated number with another before
> `ground-truth/prediction-2026-08-19.md` resolves on 2026-11-17 would hide that neither is tested.
>
> Two more corrections from that run: **`groundstate-protocol` (public, 311 commits, 17d) and
> `ground-state-protocol` (private, 43 commits, 92d) are different repositories** — the entry below
> conflates them; and dormancy here is default-branch only, which reads 282d for
> `Contradiction_loss` where all refs say 77d.

---

## ampaign-craft

- **Tier**: A | **Score**: 4/4 | F1 ✓ F2 ✓ F3 ✓(199+) F4 ✓
- **AI tools**: Lovable + Claude Code
- **Dormancy**: `main` 101d *(corrected 2026-08-19, was 2d)* | **Pattern**: was the most active repo; centre of gravity has moved to MATI and anti-silo
- **Key findings**:
  - Most F1–F4 signals in portfolio: CLAUDE.md + docs/ + .agents/ + .claude/ + evals/ + knowledge/ + load-tests/
  - 60KB SQL migrations (Supabase), vercel.json, e2e/ suite, Hebrew Excel data file
  - Claude commits directly; ereztash merges PRs — clearest human-operator split in portfolio
- **Watch for**: scope creep (199+ PRs means the system is growing fast — any new feature needs a PR, not a direct push). Also: `main` has not moved since 2026-05-10 while **77 remote branches** exist — branch-level activity was not fetched on 2026-08-19, so do not read the 101d figure as abandonment without checking them
- **Playbooks**: [Four-Feature Tier Classifier](../products/playbooks/four-feature-tier-classifier.md), [Editorial Commit Voice Escalation](../products/playbooks/editorial-commit-voice-escalation.md)
- **Deep-dive**: none (mini-profile in `portfolio-scan/26-repos.md`)
- **Genesis fixture**: pending

---

## COR-SYS

- **Tier**: A | **Score**: 4/4 | F1 ✓ F2 ✓ F3 ✓(16) F4 ✓
- **AI tools**: Claude Code + Cursor
- **Dormancy**: 33d | **Pattern**: healthy (active, recently absorbed CampaignCraft workflows)
- **Key findings**:
  - Deep-dived. 32 docs, CLAUDE.md + LOG.md + skill.md + slash-command suite
  - Bilingual (HE+EN). Strongest documentation infrastructure in portfolio after ampaign-craft
  - COR-SYS PR#16 absorbed CampaignCraft as child project — watch for architecture drift
- **Watch for**: doc drift (32 docs need active curation; stale docs are worse than no docs)
- **Playbooks**: [AI Cross-Review Setup](../products/playbooks/ai-cross-review-setup.md), [Four-Feature Tier Classifier](../products/playbooks/four-feature-tier-classifier.md)
- **Deep-dive**: `research/cor-sys/`
- **Genesis fixture**: pending

---

## groundstate-protocol

- **Tier**: A | **Score**: 3/4 | F1 ✓ F2 ✓ F3 ✓(10) F4 —
- **AI tools**: Lovable + Claude Code + Codex
- **Dormancy**: 6d | **Pattern**: healthy (most vitally active, sprint-container pattern)
- **Key findings**:
  - No CLAUDE.md — editorial discipline lives entirely in commit messages and Hebrew PR templates
  - Sprint-container pattern: each Claude batch is a bounded PR branch, digestible for operator
  - AI cross-review: Codex + Claude review each other's PRs — highest review rigor in portfolio
- **Watch for**: missing CLAUDE.md means context resets on every session — consider adding one
- **Playbooks**: [Dual-AI-Surface Workflow](../products/playbooks/dual-ai-surface-workflow.md), [AI Cross-Review Setup](../products/playbooks/ai-cross-review-setup.md)
- **Deep-dive**: `research/groundstate-protocol/`
- **Genesis fixture**: pending

---

## lessons

- **Tier**: A | **Score**: 4/4 | F1 ✓ F2 ✓ F3 ✓ F4 ✓
- **AI tools**: Claude Code
- **Dormancy**: 0d | **Pattern**: healthy (this repo — meta/research)
- **Key findings**: Research + playbook repo. Used as persistent memory, portfolio scan target, and SaaS spec host.
- **Deep-dive**: this repo
- **Genesis fixture**: lessons itself (meta)

---

## pre-call

- **Tier**: A *(F5 rule — one of three in 40 repos)* | **Score**: 3/4 + **F5 ✓** | F1 — F2 ✓ F3 ✓(44) F4 ✓
- **AI tools**: Claude Code (146 of 185 commits, 113 trailers) + an `agent/*` surface
- **Dormancy**: 0d — **live** | **Pattern**: 13-day gated build, serving a real deployment
- **Key findings**:
  - `docs/stopping-rule.html` — Annett & Duncan 1967 HTA stated as `P × C > acceptable`, with
    **P measured over 400 runs** and C written in code (`consequenceIfWrong` in `pc-commitments.js`).
    Synthetic and real-call figures reported side by side, real one worse (0.00 vs 0.33)
  - `docs/market-ready.md` — six binary DoD conditions, thresholds locked before the round, each
    labelled with its provenance and the arbitrary one labelled arbitrary. **"Every condition here
    requires a stranger. None of them can be completed by writing code."** D1 status: 0
  - Spec and its supervising agent in **one file**, because doc-drift was measured 3 of 3. Carries a
    drift meter and a **bypass log** — nothing else in the portfolio instruments its own gate's evasion
  - Branch names are claims, not features: `provenance-must-be-answered`, `telemetry-says-it-is-not-durable`
  - README states the market it does **not** serve, and the outcome it does not control
- **Watch for**: D1 and D4 are the whole product question and both read zero. The repo's own DoD says
  more code cannot move them — do not answer a request here with more code without checking that first
- **Playbooks**: none yet — source for `dod-unsatisfiable-by-code`, `measured-stopping-rule`, `bypass-log`
- **Deep-dive**: `research/pre-call/`
- **Genesis fixture**: pending

---

## proofminer

- **Tier**: B | **Score**: 3/4, F5 — | F1 — F2 ✓ F3 ✓(16) F4 ✓ | R ✓ (3d)
- **AI tools**: **three surfaces** — an unattributed `agent/*` surface, Claude Code, and **Codex**
- **Dormancy**: 3d | **Pattern**: entire product built in two days; largest hidden-agent repo in the portfolio
- **Key findings**:
  - **193 of 229 non-merge commits in 23 machine-cadence bursts, 212 with empty bodies, 213 authored
    `ereztash`.** `git log --author` reports 93% human for an agent-written codebase
  - All 16 Claude commits are **epistemic** corrections, not defect fixes: *"The text layer was
    fabricating evidence. Stop it."*, *"Stop the product asserting things it does not know"*,
    *"a parser that refuses to guess"*, *"a planted credential"*
  - `docs/AUTHORITY.md` — an "Authority Constitution" classifying every recommendation on six axes
    (Impact · **Reversibility** · Certainty · Sensitivity · User preference · External context),
    implemented in `src/engine/authority.js`. The richest C6 implementation in the portfolio
  - Ships agent skills **inside the product repo** (`skills/app-orchestrator`, `skills/vercel-app-builder`)
  - Three `agent/expert-consultant-mvp-*` branches differ only by a unix-ms suffix — programmatic naming
  - Abandoned agent exploration archived to `archive/pre-rewrite-agent-work` rather than deleted
- **Watch for**: the branch prefix is a better authorship record than `git log` here. Count prefixes
  before attributing anything to a tool
- **Playbooks**: none yet — source for `adversary-hunts-assertions-not-defects`, `authority-boundary-as-named-artifact`
- **Deep-dive**: `research/proofminer/`
- **Genesis fixture**: pending

---

## MATI

- **Tier**: A | **Score**: 3/4 | F1 —(see note) F2 ✓ F3 ✓(18) F4 ✓
- **AI tools**: unattributed `agent/*` surface + Claude Code + a PR review bot
- **Dormancy**: 0d — **live** (PRs #17, #18 open, updated 2026-08-19 07:40) | **Pattern**: one-day gated build, still running
- **Key findings**:
  - Empty → full CI-gated production system in 11 hours on 2026-08-18: 18 PRs, 3 domain contract checkers in CI, `npm audit --omit=dev` gate, 43 unit + 12 e2e tests
  - **81 of 86 commits are agent-written under the operator's git identity** — invisible to `git log --author`. Detected by cadence (55 in bursts, mean gap 31 s) and `agent/*` branch naming
  - Claude Code never ships a feature here: all 5 of its commits are defect fixes, a shared-state migrator, and the test suite that audits the other surface's regex-based contract checks
  - PR language splits by surface: Hebrew + fixed template from `agent/*`, English prose from `claude/*`. Short Hebrew PRs merge in ~45 s; long English PRs stay open 14 h+
  - F1 scores — on 3 template-only deps against 958 lines of domain code in `lib/` — the clearest F1 false negative in the portfolio
- **Watch for**: the contract checkers match source text with regular expressions — a rename walks past them. Claude's own commit body says so. Do not treat a green `check:*` as coverage
- **Playbooks**: none yet — this repo is the source for `adversarial-second-surface` and `contract-check-as-ci-gate`
- **Deep-dive**: `research/mati/`
- **Genesis fixture**: pending

---

## anti-silo

- **Tier**: A | **Score**: 4/4 | F1 ✓ F2 ✓ F3 ✓(18) F4 ✓
- **AI tools**: Claude Code (40 trailered commits) + two human git identities
- **Dormancy**: 3d | **Pattern**: healthy — Python evidence/contradiction engine with a consultant-pilot offering
- **Key findings**:
  - **40 of 74 non-merge commits carry `Co-Authored-By: Claude`; only 6 name Claude as author** — a 6.7× undercount by the author column
  - Every `claude/*` branch is an audit or review (UI review, product-readiness audit, code review); features arrive on `feat/*` and `agent/*`
  - Claude's day-two work is monolith decomposition that leaves a **250-line guard test** behind, so the monolith cannot grow back
  - Seven business docs (`INVESTOR_BRIEF`, `LAUNCH_READINESS`, `CONSULTANT_PILOT`, `ADVERSARIAL_REVIEW`) committed from day one, functioning as spec
  - Final two commits: a manual deploy trigger, and the smoke-test gate that makes it unnecessary next time
- **Watch for**: two git identities differing only in capitalization (`Erez` / `ereztash`) — any per-author metric on this repo double-counts one person
- **Playbooks**: [AI Cross-Review Setup](../products/playbooks/ai-cross-review-setup.md)
- **Deep-dive**: `research/anti-silo/`
- **Genesis fixture**: pending

---

## Agent-Architect

- **Tier**: A *(dormant)* | **Score**: 4/4 | F1 ✓ F2 ✓ F3 ✓(1) F4 ✓
- **AI tools**: Claude Code + a Haiku audit pass
- **Dormancy**: 87d | **Pattern**: unclaimed whole — no trunk was ever created
- **Key findings**:
  - **The GitHub default branch is `claude/agent-architect-test-fixtures-mA6dz`. There is no `main`.** Same shape as `keepath`; both dormant
  - A Haiku pass audited the Opus-built pipeline and found 7 logic gaps, each closed in a named commit — plus a `Consistency pass` commit repairing what the batch fixes desynchronized
  - Four generations of the master prompt live side by side at HEAD; prompts are version-numbered source, never deleted (a prompt cannot be usefully diffed)
  - README states a falsifiable question and a **76–82% product-core confidence** that has been re-rated by a fixture run — the inverse of a placeholder README
  - Ships a `product/` layer (`OFFER.md`, `PRODUCT_DEFINITION.md`, `landing.html`, `sample-report.md`) — the method is the product
- **Watch for**: the resumption task is **adoption, not code** — create `main`, merge the working branch into it, then decide. Adding features to an unclaimed trunk repeats the failure
- **Playbooks**: [Resumer Day Prep](../products/playbooks/resumer-day-prep.md)
- **Deep-dive**: `research/agent-architect/`
- **Genesis fixture**: pending

---

## CRM_Google_ai

- **Tier**: A *(mirror — score is inflated; see note)* | **Score**: 3/4 | F1 ✓ F2 ✓ F3 — F4 ✓
- **AI tools**: Claude Code + Codex (per `AGENTS.md`)
- **Dormancy**: 66d | **Pattern**: **access shim** — a mirror of `ereztash/_crm`, not an independent project
- **Key findings**:
  - All 4 commits are an initial commit, a README edit, and two whole-tree mirrors of `_crm` (385 files). The README's CI badge still points at the source repo
  - **`AGENTS.md` is a written concurrency contract between Codex and Claude Code on one working tree**: lane split, ONE-writer-per-file, read-before-write, an edit freeze during the refactor, and a `## Handshake` section to lift it. The strongest claude-to-claude artifact in the portfolio
  - The mirrored `LOG.md` opens `# COR-SYS — Build Log & Roadmap` and references paths (`ROOT/_analysis`) that do not exist here — an agent opening this repo cold reads instructions for a different working tree
- **Watch for**: do not score or resume this repo on its own. Work the source (`_crm`). If the mirror is kept, rewrite or delete `LOG.md` and `AGENTS.md` — a machine-consumed file naming another repo is worse than none
- **Playbooks**: none
- **Deep-dive**: `research/crm-google-ai/`
- **Genesis fixture**: n/a (mirror)

---

## agency-insight-analyzer

- **Tier**: B | **Score**: 2/4 | F1 — F2 ✓ F3 ✓(2) F4 —
- **AI tools**: Lovable / gpt-engineer + Claude Code
- **Dormancy**: 68d | **Pattern**: bot blast → **overnight** resumption → continuation (not pivot)
- **Key findings**:
  - The bot-blast-to-resumption gap is **11 hours** — the shortest in the dataset (groundstate: 37 days, chess-mind: 14 days). The short gap resumed as *continuation*; the long ones resumed as *pivots*
  - Claude's commit bodies open by naming the product principle the change serves ("aligned with the 'mirror, not judge' principle") before describing the diff — the justification layer that bot commits (`Changes`, `Work in progress`) structurally cannot produce
  - Seeded from `tanstack_start_ts_2026-06-08`, three months newer than the `vite_react_shadcn_ts` template in the other Lovable repos — the template string dates the repo's generation
  - One bot commit subject is in Hebrew (`הוסף תמיכת עברית-אנגלית`) — a verbatim prompt echo, and the only surviving record of the prompt side of a Lovable session
- **Watch for**: no CLAUDE.md, no docs/ — resumption at 68 days will land in the long-gap (pivot) regime, not the overnight one
- **Playbooks**: [Publish-Button Intent Triage](../products/playbooks/publish-button-intent-triage.md), [Dual-AI-Surface Workflow](../products/playbooks/dual-ai-surface-workflow.md)
- **Deep-dive**: `research/agency-insight-analyzer/`
- **Genesis fixture**: pending

---

## Algo-trade

- **Tier**: A | **Score**: 3/4 | F1 ✓ F2 ✓ F3 ✓(21+) F4 —
- **AI tools**: Claude Code
- **Dormancy**: 176d | **Pattern**: dormant Tier A — blocked on external dependency
- **Key findings**:
  - Most complex Python system in portfolio: IBKR algo-trading, Kafka message bus, 77+ tests, full CI/CD
  - Dormant because: live trading requires active IBKR brokerage account — success condition is externally gated
  - Fully production-grade infrastructure waiting to be restarted
- **Watch for**: H2 pattern — do not add features; first action is to reactivate the external integration
- **Playbooks**: [Resumer Day Prep](../products/playbooks/resumer-day-prep.md)
- **Deep-dive**: none
- **Genesis fixture**: pending

---

## CandiApp

- **Tier**: A | **Score**: 4/4 | F1 ✓ F2 ✓ F3 ✓(5+) F4 ✓
- **AI tools**: Claude Code
- **Dormancy**: 174d | **Pattern**: dormant Tier A — blocked on external validation
- **Key findings**:
  - FastAPI + SQLAlchemy + Alembic + Docker + JWT auth. Production-grade HR/ATS resume parsing API
  - Dormant because: needs production HR clients for validation — success condition externally gated
  - Companion: Benchmark.ATS (50-resume dataset for evaluation)
- **Watch for**: same H2 pattern as Algo-trade — resumption requires external activation, not internal fixes
- **Playbooks**: [Resumer Day Prep](../products/playbooks/resumer-day-prep.md)
- **Deep-dive**: none
- **Genesis fixture**: pending

---

## brain-healer-hub

- **Tier**: B | **Score**: 2/4 | F1 ✓ F2 ✓ F3 — F4 —
- **AI tools**: Lovable + Claude Code
- **Dormancy**: 138d | **Pattern**: Lovable-base + Claude Code additions, no PR discipline
- **Key findings**:
  - Lovable-started webinar landing page + Supabase lead capture
  - Claude Code added urgency bars, testimonials, scarcity messaging (**4** direct commits, 2026-03-30 17:40–21:06 — corrected from 5) — then Lovable resumed
  - F3 — confirmed 2026-08-19: the 3 merge commits are Lovable merges, not PRs
  - `.env` committed (potential secret exposure) — check before any new work
- **Watch for**: `.env` in git history — run `git log --all --full-history -- .env` before any push
- **Playbooks**: [Publish-Button Intent Triage](../products/playbooks/publish-button-intent-triage.md)
- **Deep-dive**: none
- **Genesis fixture**: pending

---

## kolzchut

- **Tier**: B | **Score**: 2/4 | F1 ✓ F2 ✓ F3 — F4 —
- **AI tools**: Claude Code (Opus 4.6)
- **Dormancy**: 52d | **Pattern**: functional prototype, no PR or docs infrastructure
- **Key findings**:
  - RAG-powered Hebrew civic rights tool (kol-zchut.org.il API). Claude Opus 4.6 + Streamlit
  - Commits from "Password-saver" account (different GitHub), co-authored by Claude Sonnet 4.6
  - Minimal but functional — highest domain specificity in portfolio (Hebrew, civic rights)
- **Watch for**: no CLAUDE.md means no anti-pattern memory — first action is `genesis compile`
- **Playbooks**: [Four-Feature Tier Classifier](../products/playbooks/four-feature-tier-classifier.md)
- **Deep-dive**: none
- **Genesis fixture**: `saas/app/scripts/genesis/domains/kolzchut.ts` ← **exists, sharpness 100/100**

---

## chess-mind-patterns

- **Tier**: B | **Score**: 2/4 | F1 ✓ F2 ✓ F3 — F4 —
- **AI tools**: Lovable + Claude Code
- **Dormancy**: 50d | **Pattern**: resumed prototype, single-sprint Claude addition, then stalled
- **Key findings**:
  - 72-minute Claude resumption sprint after 14-day Lovable blast. chess.js dep, PWA + Lichess integration
  - Deep-dived — most studied Tier B resumption pattern in the portfolio
  - No further operator activity after the sprint
- **Watch for**: resumption may require another bounded sprint (same pattern as first resumption)
- **Playbooks**: [Resumer Day Prep](../products/playbooks/resumer-day-prep.md), [Dual-AI-Surface Workflow](../products/playbooks/dual-ai-surface-workflow.md)
- **Deep-dive**: `research/chess-mind-patterns/`
- **Genesis fixture**: pending

---

## org-fortify

- **Tier**: B | **Score**: 1/4 | F1 ✓ F2 — F3 — F4 —
- **AI tools**: Lovable only
- **Dormancy**: 46d | **Pattern**: Lovable-only build, LOG.md is bot-generated (not human anti-pattern memory)
- **Key findings**:
  - All commits are Lovable-bot. Has LOG.md but almost certainly Lovable-prompted — weakens F4 signal
  - Org resilience tooling: HealthGauge, ASAEngine, TourniquetManager components
  - No human breakout yet
- **Watch for**: H3 pattern — do not trust the LOG.md as established anti-pattern memory; verify authorship before relying on it
- **Playbooks**: [Publish-Button Intent Triage](../products/playbooks/publish-button-intent-triage.md)
- **Deep-dive**: none
- **Genesis fixture**: pending

---

## All_Erez-s_Connections

- **Tier**: B | **Score**: 1/4 | F1 — F2 ✓ F3 — F4 —
- **AI tools**: none — **the only repo in the portfolio that passes both authorship detectors as genuinely human**
- **Dormancy**: 140d | **Pattern**: small human-only project, minimal structure
- **Key findings**:
  - Small Node.js server (server.js + package.json, express/cors/uuid). Referral/connections database.
  - **6** commits, not 3 (corrected 2026-08-19), all within 13 minutes on 2026-04-01 (16:57–17:10)
  - No trailers, no cadence burst — the gaps (60–240 s) sit above the machine-burst threshold. This is the true-negative control case for `scripts/detect-agent-authorship.sh`
- **Watch for**: no AI tooling → Claude Code starting here is essentially greenfield; add CLAUDE.md first
- **Playbooks**: [Four-Feature Tier Classifier](../products/playbooks/four-feature-tier-classifier.md)
- **Deep-dive**: none

---

## keepath

- **Tier**: B | **Score**: 2/4 | F1 ✓ F2 ✓ F3 — F4 —
- **AI tools**: Claude Code
- **Dormancy**: 133d | **Pattern**: operator-absent — blast too large to pick up
- **Key findings**:
  - Turborepo monorepo: 4 Next.js apps + NestJS API + AI engine (OpenAI + Anthropic) + Prisma + Docker + CI/CD
  - Built by Claude in 2 batch commits (2025-12-30 and 2025-12-31). Default branch is `claude/modular-system-design-kJg0a` — never merged to main
  - Operator faced complexity cliff on resumption: 27 API endpoints, 4 apps, full infra
- **Watch for**: H6 pattern — do NOT add more code. First action: map what exists, write a guided re-entry README, then pick one app to activate
- **Playbooks**: [Resumer Day Prep](../products/playbooks/resumer-day-prep.md)
- **Deep-dive**: none
- **Genesis fixture**: pending

---

## nextjs-ai-chatbot

- **Tier**: B | **Score**: 3/4 | F1 ✓ F2 ✓ F3 — F4 ✓
- **AI tools**: none detected (template fork)
- **Dormancy**: 261d | **Pattern**: template fork, minimal customization, inflated F4 from template docs
- **Key findings**:
  - Vercel AI chatbot template fork. 2 commits: initial + package-lock. F4 score inflated by template's docs/
  - No customization — operator intent unclear (evaluation? starting point?)
- **Watch for**: template-inflated score; treat as blank slate, not an established project
- **Playbooks**: [Publish-Button Intent Triage](../products/playbooks/publish-button-intent-triage.md)
- **Deep-dive**: none

---

## Organziational_algo

- **Tier**: B | **Score**: 2/4 | F1 ✓ F2 ✓ F3 — F4 —
- **AI tools**: none detected
- **Dormancy**: 184d | **Pattern**: ML research artifact, no runnable system intent
- **Key findings**:
  - PyTorch ML experiment: data.py, model.py, train.py, losses.py, report.py, notebook.ipynb
  - Description says "decision making algo" but content is Contradiction Loss research
  - 2 human commits — research/experiment, not a product build
- **Watch for**: misaligned description — clarify intent before any work (product or research artifact?)
- **Deep-dive**: none

---

## Benchmark.ATS

- **Tier**: B | **Score**: 2/4 *(corrected 2026-08-19, was 1/4)* | F1 — F2 ✓ **F3 ✓(2)** F4 —
- **AI tools**: **Claude Code** *(the n=25 scan recorded "none detected" — wrong)*
- **Dormancy**: 274d | **Pattern**: companion dataset to CandiApp
- **Key findings**:
  - 50 resumes + validation scripts + Hebrew README. Companion to CandiApp evaluation
  - F1 confirmed —: `ats_validation_script.py` is Python stdlib only
  - **Correction**: 2 of 4 commits are authored by `Claude` (`Add ground truth reference files`, `Add .gitignore`), and **2 PRs were merged** — one from branch `claude/create-ground-truth-file-…`. The scan recorded neither
- **Watch for**: do not work on this in isolation — only activates alongside CandiApp resumption
- **Deep-dive**: none (verified in `research/portfolio-scan/2026-08-19-rescan.md`)

---

## core-unified-consciousness

- **Tier**: C | **Score**: 0/4 | F1 — F2 — F3 — F4 —
- **AI tools**: Lovable only
- **Dormancy**: 64d | **Pattern**: publish-button satisfied, abandoned
- **Key findings**:
  - 54 commits in 133 minutes (pure Lovable blast). Zero human commits. README placeholder and package.json template token still at HEAD
  - Deep-dived — the canonical Tier C case in this portfolio
  - Success condition was "render the vision" — Lovable publish satisfied it fully
- **Watch for**: do not attempt to resume with Lovable. Any meaningful work requires Claude Code re-architecture from scratch
- **Playbooks**: [Publish-Button Intent Triage](../products/playbooks/publish-button-intent-triage.md)
- **Deep-dive**: `research/core-unified-consciousness/`

---

## Hr_SMB

- **Tier**: D | **Score**: 1/4 | F1 — F2 ✓ F3 — F4 —
- **Pattern**: knowledge/document repo — not a software project
- **Key findings**: Hebrew PDFs (AI agent design, system prompts, HR strategy). No code. Upload-only commits.
- **Action**: out of scope for all playbooks. Use as knowledge source, not a build target.

---

## Contradiction_loss

- **Tier**: D | **Score**: 1/4 | F1 — F2 ✓ F3 — F4 —
- **Pattern**: research artifact — not a software project
- **Key findings**: Hebrew PDFs + Python chart scripts. Contradiction Loss algorithm for autonomous vehicles. 5 open issues. No runnable system.
- **Action**: out of scope. Research archive only.

---

## Metatrader

- **Tier**: D | **Score**: 1/4 | F1 — F2 ✓ F3 — F4 —
- **Pattern**: script dump — pre-Claude-Code era
- **Key findings**: AI/trading agent scripts. Filenames with spaces. No requirements.txt. Pre-2026 exploratory code.
- **Action**: out of scope. Do not attempt to productize without full re-architecture.

---

## nuxtjs-boilerplate

- **Tier**: D | **Score**: 1/4 | F1 — F2 ✓ F3 — F4 —
- **Pattern**: file dump — misnamed repo
- **Key findings**: Actually ALMABoard MetaTranslator (Python + Nuxt.js). Files named after people (alma.py, ella.py, erez.py). Oldest repo (407d).
- **Action**: out of scope.

---

## pilot

- **Tier**: D | **Score**: 1/4 | F1 — F2 ✓ F3 — F4 —
- **Pattern**: empty placeholder
- **Key findings**: One 45KB binary file named `101` + 7-byte README. Purpose unknown.
- **Action**: out of scope.

---

## Focuos

- **Tier**: D | **Score**: 0/4
- **Pattern**: empty placeholder
- **Key findings**: README only (19 bytes: "# Focuos"). Created 2025-09-12.
- **Action**: out of scope.

---

## Masse-agent

- **Tier**: D | **Score**: 0/4
- **Pattern**: empty placeholder
- **Key findings**: README only (13 bytes). Created 2025-06-24.
- **Action**: out of scope.

---

## onto-trade

- **Tier**: D | **Score**: 0/4
- **Pattern**: empty placeholder
- **Key findings**: README only. Created 2025-07-21.
- **Action**: out of scope.

---

## Resilience_calculator

- **Tier**: D | **Score**: 0/4
- **Pattern**: empty placeholder (private)
- **Key findings**: README only (329 bytes, "Demo Cal"). Created 2025-12-17.
- **Action**: out of scope.

---

# Added 2026-09-14, after the 2026-08-19 freeze: not scored here

> **Why this section exists.** On 2026-09-14 `gh repo list ereztash` returned **45** repositories and
> this file had **32** `## ` entries. The 13 below had none (names compared case-insensitively
> against the headers). Three of them, `Product-Perception-Sensemaking-Architect`, `lichess_app` and
> `--Android`, are the **three most recently pushed repositories in the portfolio**
> (`gh repo list ereztash --json pushedAt`, sorted).
>
> **No tier and no F-score is assigned in this section.** Scoring a repository after its outcome is
> visible contaminates `ground-truth/prediction-2026-08-19.md` (contamination rule 1,
> `research/re-foundation/DO_NOT_TOUCH.md` §1). The 13 fall into two cases, kept apart:
>
> - **5 were created after the freeze** (`--Android`, `lichess_app`, `strategic-portal`, `portal`,
>   `Product-Perception-Sensemaking-Architect`). They are outside the prediction's frame by
>   construction (`research/re-foundation/ENUMERATION_CORRECTION.md` §2, §4):
>   `Tier: not scored (added after the 2026-08-19 freeze)`.
> - **8 were scored at the freeze but never given an index entry** (`_crm`, `ground-state-protocol`,
>   `ground-state-protocol-32679ce4`, `ground-state-protocol-02aba105`, `dod-validator`, `kol_kore`,
>   `cognitive-sovereignty-ai-paper`, `ex2`). Their Tier line names the frozen row and does **not**
>   restate it: a frozen number copied into a file whose Tier lines are superseded would read as a
>   current tier.
>
> **How every figure was derived, 2026-09-14.** `gh api repos/ereztash/<repo>` for visibility,
> created, last push (`pushed_at`, any ref), default branch, primary language and description.
> Commits on the default branch: the `rel="last"` page of `commits?sha=<default>&per_page=1`,
> cross-checked equal against GraphQL `history.totalCount` for all 13. Open PRs: `pulls?state=open`,
> cross-checked equal against GraphQL `pullRequests(states:OPEN)`. Default-branch HEAD date:
> `commits/<default>`. Days count back from 2026-09-14; as the header warns, any-ref and
> default-branch dormancy can differ, so both are given.
>
> **Private repositories carry metadata only**: no README text, file names, branch names or commit
> messages. **AI tools were not measured for any of the 13**; run `scripts/detect-agent-authorship.sh`
> before stating one (`CLAUDE.md`, authorship rule).

---

## lichess_app

- **Tier**: not scored (added after the 2026-08-19 freeze)
- **Visibility**: public | **Created**: 2026-08-21 | **Default branch**: `main` | **Primary language**: TypeScript
- **Activity**: last push 2026-09-14 (0d) · default-branch HEAD 2026-09-14 (0d) · **1,057 commits** on `main` · **11 open PRs**
- **Description**: none set (README title: "Decision Lab")
- **Key findings**:
  - `docs/BUILD_TO_REVENUE_AUDIT.md` (`f9788db`, 2026-09-06, read against `main@2390b351`): "Minimum
    build required for a first payment: none." Its first gate, G1, is 3 concierge reports offered
    to 3 named prospects at $150 per report, zero build, passing only if at least 1 pays before delivery
  - `research/mechanism/replication100/REPLICATION_100_REPORT.md` (`18cffe3`, 2026-09-11): 100 of 100
    frozen members finished; verdict **`UNDETERMINED`**, because a red flag declared before any result
    was met: `PERSONAL_RESIDUAL_CANDIDATE` in 17 of the 25 `RESIDUAL_POWERED` members (68.0%, flag at 50%)
  - `docs/PRE_RELEASE_STATE.md` (`588b469`, 2026-09-06): disposition `NOT_READY_FOR_TARGET_DISTRIBUTION`
    for `broad-public`, with **no repository-owned blocker**. The P1 blocker `F-HUMAN-CORE` has
    authority **FIELD**; `R-21` is one ruleset checkbox (ENVIRONMENT)
  - Enforces "evidence must postdate the claim" in the type system (`research/re-foundation/ENUMERATION_CORRECTION.md` §3.2)
- **Watch for**: FIELD-required work cannot be closed by more code. The repository says so itself:
  "No telemetry, probe, explanation surface, synthetic user, model simulation or retrospective
  analysis closes a human-evidence gap." A request here that answers G1 or `F-HUMAN-CORE` with a
  build is the failure its own audit names
- **Deep-dive**: none (partial read in `research/re-foundation/ENUMERATION_CORRECTION.md` §3.2)

---

## Product-Perception-Sensemaking-Architect

- **Tier**: not scored (added after the 2026-08-19 freeze)
- **Visibility**: public | **Created**: 2026-09-03 | **Default branch**: `main` | **Primary language**: Python
- **Activity**: last push 2026-09-14 (0d) · default-branch HEAD 2026-09-12 (2d) · **384 commits** on `main` · **5 open PRs**
- **Description**: none set (README title: "Evidence-Bounded Peer-Agent System")
- **Key findings**:
  - `README.md`, `docs/CANONICAL_STATE.md` (`04574ab`): two peer agents, **Neta** (product perception
    and sensemaking) and **R&D** (resource-to-telos calibration), under one shared epistemic kernel,
    coordinated by a deterministic calibration loop that is deliberately not an agent. Orchestrator,
    third peer and Architecture Agent are all `NOT_EARNED`
  - `research/mechanism-transfer/extraction/RESULT_STAGE2_2026-09-09.md` (`5e156cd`):
    **`STOP_EXTRACTION_UNIQUE_DELTA_UNSHOWN`**. The structured extraction prompt, frozen after a
    Stage 1 win on `lichess_app`, won 0 of 4 out-of-sample pairs (median −0.25). **`lessons` itself was
    one of the two out-of-sample targets**, at `ereztash/lessons@252f1446`
  - `research/mechanism-transfer/executable-contract/RESULT_STAGE1_2026-09-09.md` (`8a6e63c`):
    **`STOP_EXECUTABLE_UNIQUE_DELTA_UNSHOWN`**. Executable contract tests and an information-matched
    prose contract both repaired all four seeded defects with 0 hidden critical failures
  - `docs/CANONICAL_STATE.md` (`04574ab`) records its own branch drift: 14 branches ahead of `main`,
    9 of them `STRANDED` with no pull request, and deletion refused to agents, so retirement is an owner action
- **Watch for**: README §6 says of its active hypotheses, "Nothing in this table may be cited as a
  finding." Cite only the two STOP results. The Stage 2 result is also evidence *about this
  repository*: on `lessons`, a strong ordinary prompt recovered its mechanisms as well as the
  structured one
- **Deep-dive**: none

---

## --Android

- **Tier**: not scored (added after the 2026-08-19 freeze)
- **Visibility**: public | **Created**: 2026-08-20 | **Default branch**: `claude/hebrew-ime-android-v664dh` | **Primary language**: Kotlin
- **Activity**: last push 2026-09-11 (3d) · default-branch HEAD 2026-09-11 (3d) · **131 commits** on the default branch · **2 open PRs**
- **Description**: none set
- **Key findings**:
  - **The GitHub default branch is a `claude/*` working branch and there is no `main`** (3 branches).
    Same shape as `Agent-Architect` and `keepath`. PR #1 merged into it 2026-08-26; #2 and #3 are open against it
  - `scripts/run_gates.py` runs each gate's planted-defect positive control **first** and fails the
    whole run as `NOT-A-GATE` if the control stays green (`research/re-foundation/ENUMERATION_CORRECTION.md` §3.1)
  - `docs/RELEASE_READINESS.md` (`2c3329a`): verdict **NOT READY**, with no "ready except for". 22
    device-blocked checks, generated from `docs/QA_MATRIX.md` and held in step by `GATE-DOC-1`, plus
    an unsigned release artifact whose signing secrets are the operator's
  - `README.md` + `docs/LABELING_LOG.md`: a shipped real-word-error layer was **withdrawn** after 320
    real firings were blind-labelled at 12.5% to 39.7% precision, and `GATE-WITHDRAWN-1` fails the
    build if it returns. The README also corrects its own earlier published completion figure
    (23.72% to 10.33% on human-typed text, which it says was overstated 2.3×)
- **Watch for**: both release blockers are device and operator work, and the blocked list grew from
  20 to 22 while features shipped (`docs/RELEASE_READINESS.md`). More code does not shrink it. Any
  lookup that assumes `main` exists fails here
- **Deep-dive**: none (partial read in `research/re-foundation/ENUMERATION_CORRECTION.md` §3.1)

---

## _crm

- **Tier**: not restated. Scored at the freeze: row `_crm` in `ground-truth/scores-2026-08-19-cohort2.tsv`
- **Visibility**: **private**, metadata only | **Created**: 2026-06-13 | **Default branch**: `master` | **Primary language**: Python
- **Activity**: last push 2026-09-06 (8d) · default-branch HEAD 2026-09-06 (8d) · **240 commits** on `master` · **2 open PRs**
- **Description**: none set
- **Watch for**: nothing from this repository beyond GitHub metadata may enter this public file.
  `CRM_Google_ai` above is its public-facing mirror; score and resume the source, not the mirror
- **Scan**: `research/portfolio-scan/2026-08-19-cohort2.md` §1

---

## strategic-portal

- **Tier**: not scored (added after the 2026-08-19 freeze)
- **Visibility**: public | **Created**: 2026-08-30 | **Default branch**: `main` | **Primary language**: JavaScript
- **Activity**: last push 2026-08-30 (15d) · default-branch HEAD 2026-08-30 (15d) · **26 commits** on `main` · **1 open PR**
- **Description**: none set
- **Key findings**:
  - `README.md`: a Hebrew "from pain to a prompt that works" portal. 50 prompt engines in 10
    categories, searched by symptom, with a diff against a generic prompt. A local-first PWA with no
    backend, no build step and no runtime dependencies
  - Engines are plain data (`src/data/engines/*.js`), converted from v1 JavaScript closures so they can
    be exported, diffed and tested (README, "Engines are data, not code")
  - 6 test files in `tests/` run under `node --test`, with CI in `.github/workflows/ci.yml`. Already
    recorded as a legitimate member the frozen scan never saw, and not an assurance implementation
    (`research/re-foundation/ENUMERATION_CORRECTION.md` §3.3)
- **Watch for**: a separate private repository named `portal` was created the same morning (next
  entry). The names are not interchangeable; confirm which one a request means
- **Deep-dive**: none

---

## portal

- **Tier**: not scored (added after the 2026-08-19 freeze)
- **Visibility**: **private**, metadata only | **Created**: 2026-08-30, 07:08 UTC (`strategic-portal`: 06:57 UTC the same day) | **Default branch**: `main` | **Primary language**: JavaScript
- **Activity**: last push 2026-08-30 (15d) · default-branch HEAD 2026-08-30 (15d) · **1 commit** on `main` · **0 open PRs**
- **Description**: none set

---

## ground-state-protocol

- **Tier**: not restated. Scored at the freeze: row `ground-state-protocol` in `ground-truth/scores-2026-08-19.tsv` (cohort 1)
- **Visibility**: **private**, metadata only | **Created**: 2026-05-20 | **Default branch**: `main` | **Primary language**: TypeScript
- **Activity**: last push 2026-07-20 (56d) · default-branch HEAD 2026-05-19 (118d) · **67 commits** on `main` · **0 open PRs**
- **Description**: none set
- **Name family, from metadata only**:
  - **Not `groundstate-protocol`** (public, entry above). Its default-branch HEAD is `d092210`, a
    commit that also exists in public `groundstate-protocol`, whose `main` is 236 commits ahead of it
    and 0 behind (`compare/d092210...main`): 67 + 236 = that repository's 303 default-branch commits.
    All four name-family repositories share root commit `b331aa1a`
  - The header above gives "43 commits" for this repository. Measured on 2026-09-14: **67** on `main`,
    matching `research/portfolio-scan/2026-08-19-cohort2.md` §5. The header is left unedited
  - 2 branches. `pushed_at` is 62 days later than the default-branch HEAD, so any-ref and
    default-branch dormancy differ here
- **Watch for**: say which of the four is meant, every time. `research/groundstate-protocol/`
  describes the public one (`LOG.md`, repo-name collision)

---

## ground-state-protocol-32679ce4

- **Tier**: not restated. Scored at the freeze: row `ground-state-protocol-32679ce4` in `ground-truth/scores-2026-08-19-cohort2.tsv`
- **Visibility**: **private**, metadata only | **Created**: 2026-05-20, 20:33 UTC | **Default branch**: `main` | **Primary language**: TypeScript
- **Activity**: last push 2026-05-20 (117d) · default-branch HEAD 2026-05-19 (118d) · **67 commits** on `main` · **0 open PRs**
- **Description**: none set
- **Identity, from metadata only**: default-branch HEAD commit **and** tree are identical to
  `ground-state-protocol`'s (`d092210`, tree `365a084f`), so the three private copies hold one snapshot.
  1 branch. Created 6 minutes after `ground-state-protocol` (20:27 UTC)
- **Watch for**: the frozen scan scored this copy, `-02aba105` and `ground-state-protocol` as three
  rows. By HEAD they are one measurement taken three times
- **Scan**: `research/portfolio-scan/2026-08-19-cohort2.md` §5

---

## ground-state-protocol-02aba105

- **Tier**: not restated. Scored at the freeze: row `ground-state-protocol-02aba105` in `ground-truth/scores-2026-08-19-cohort2.tsv`
- **Visibility**: **private**, metadata only | **Created**: 2026-05-20, 20:32 UTC | **Default branch**: `main` | **Primary language**: TypeScript
- **Activity**: last push 2026-05-20 (117d) · default-branch HEAD 2026-05-19 (118d) · **67 commits** on `main` · **0 open PRs**
- **Description**: none set
- **Identity, from metadata only**: default-branch HEAD commit **and** tree are identical to
  `ground-state-protocol`'s and `-32679ce4`'s (`d092210`, tree `365a084f`). 1 branch. Created 5 minutes
  after `ground-state-protocol`
- **Watch for**: same as `ground-state-protocol-32679ce4`. One snapshot, three rows
- **Scan**: `research/portfolio-scan/2026-08-19-cohort2.md` §5

---

## dod-validator

- **Tier**: not restated. Scored at the freeze: row `dod-validator` in `ground-truth/scores-2026-08-19-cohort2.tsv`
- **Visibility**: **private**, metadata only | **Created**: 2026-05-25 | **Default branch**: `master` | **Primary language**: Python
- **Activity**: last push 2026-05-26 (111d) · default-branch HEAD 2026-05-26 (111d) · **44 commits** on `master` · **1 open PR**
- **Description**: withheld (private repository)
- **Scan**: `research/portfolio-scan/2026-08-19-cohort2.md` §1

---

## kol_kore

- **Tier**: not restated. Scored at the freeze: row `kol_kore` in `ground-truth/scores-2026-08-19-cohort2.tsv`
- **Visibility**: public | **Created**: 2026-06-22 | **Default branch**: `main` | **Primary language**: none detected
- **Activity**: last push 2026-06-22 (84d) · default-branch HEAD 2026-06-22 (84d) · **2 commits** on `main` · **0 open PRs**
- **Description**: none set
- **Key findings**:
  - Not a software project. The whole tree is two PDFs, each added by a web-upload commit titled
    `Add files via upload`: `sentinel_mafat.pdf` (`22557c1`) and a PDF whose Hebrew filename reads
    "call for proposals, AI directorate, for distribution" (`7ede1af`)
  - No README and no code, so GitHub detects no language
- **Watch for**: a document drop, like `Hr_SMB`. A knowledge source, not a build target
- **Deep-dive**: none

---

## cognitive-sovereignty-ai-paper

- **Tier**: not restated. Scored at the freeze: row `cognitive-sovereignty-ai-paper` in `ground-truth/scores-2026-08-19-cohort2.tsv`
- **Visibility**: public | **Created**: 2026-06-02 | **Default branch**: `main` | **Primary language**: Python
- **Activity**: last push 2026-06-03 (103d) · default-branch HEAD 2026-06-03 (103d) · **20 commits** on `main` · **0 open PRs**
- **Description**: none set
- **Key findings**:
  - `README.md` states its own evidence ceiling: "currently a theoretical-computational paper … They
    do not yet constitute causal empirical proof." The planned three-condition study (No AI,
    Uncalibrated AI, Fortified AI) is described as the next step, not as done
  - `results/experiment/REPORT.md` (`429d79e`): every experiment output is **SYNTHETIC**, generated
    under the preregistered assumptions, so the hypotheses "appear supported here *by construction*"
  - `results/real_data/REAL_DATA_REPORT.md` (`733bbd4`): the only real data is a secondary analysis of
    a published dataset (Hu, Luo & Fleming 2019), labelled a related paradigm and not the preregistered study
- **Watch for**: the synthetic tables are well-formed (for example CSS Cronbach α 0.958) and read like
  results. They are not. Never cite `results/experiment/` as evidence
- **Deep-dive**: none

---

## ex2

- **Tier**: not restated. Scored at the freeze: row `ex2` in `ground-truth/scores-2026-08-19-cohort2.tsv`
- **Visibility**: public, **fork** of `WernerGHub/ex2` | **Created**: 2025-04-08 | **Default branch**: `main` | **Primary language**: none detected
- **Activity**: last push 2025-10-27 (322d) · default-branch HEAD 2025-04-02 (530d, older than the fork) · **7 commits** on `main` · **0 open PRs**
- **Description**: none set
- **Key findings**:
  - `compare/main...ereztash:main` against the parent returns **ahead 0, behind 0, identical**. The
    default branch carries no commit that is not upstream's
  - The tree is `README.md` (a link to external instructions) and `ex2.c`, at HEAD `6dae2a3`
- **Watch for**: not portfolio work. Any metric on this repository measures the upstream author
- **Deep-dive**: none
