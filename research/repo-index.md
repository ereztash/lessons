# Repo Index — Machine-Readable Lookup

> One entry per repo in the ereztash portfolio.
> Claude Code working on repo X with lessons access: grep for `## <repo-name>`, load the entry, begin.
>
> Source: portfolio scan n=25 (2026-05-12). Update when: tier changes, deep-dive completed, new findings.
> Canonical data: `research/portfolio-scan/26-repos.md`

---

## ampaign-craft

- **Tier**: A | **Score**: 4/4 | F1 ✓ F2 ✓ F3 ✓(199+) F4 ✓
- **AI tools**: Lovable + Claude Code
- **Dormancy**: 2d | **Pattern**: healthy (most active repo in portfolio)
- **Key findings**:
  - Most F1–F4 signals in portfolio: CLAUDE.md + docs/ + .agents/ + .claude/ + evals/ + knowledge/ + load-tests/
  - 60KB SQL migrations (Supabase), vercel.json, e2e/ suite, Hebrew Excel data file
  - Claude commits directly; ereztash merges PRs — clearest human-operator split in portfolio
- **Watch for**: scope creep (199+ PRs means the system is growing fast — any new feature needs a PR, not a direct push)
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
- **Dormancy**: 39d | **Pattern**: Lovable-base + Claude Code additions, no PR discipline
- **Key findings**:
  - Lovable-started webinar landing page + Supabase lead capture
  - Claude Code added urgency bars, testimonials, scarcity messaging (5 direct commits) — then Lovable resumed
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
- **AI tools**: none detected
- **Dormancy**: 41d | **Pattern**: small human-only project, minimal structure
- **Key findings**:
  - Small Node.js server (server.js + package.json). Connections visualization tool. 3 commits. Human only.
  - No AI tool fingerprints — pre-AI-tool era or manual build
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

- **Tier**: B | **Score**: 1/4 | F1 — F2 ✓ F3 — F4 —
- **AI tools**: none detected
- **Dormancy**: 175d | **Pattern**: companion dataset to CandiApp
- **Key findings**:
  - 50 resumes + validation scripts + Hebrew README. Companion to CandiApp evaluation
  - F1 likely overestimated: Python stdlib only, no heavy deps confirmed
- **Watch for**: do not work on this in isolation — only activates alongside CandiApp resumption
- **Deep-dive**: none

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
