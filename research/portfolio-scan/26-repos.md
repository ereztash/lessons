# Portfolio Scan — All 25 Repos (n=25 validation dataset)

> Generated 2026-05-12. Applied 4-feature Tier classifier from `/research/cross-repo/synthesis.md`
> to all 25 repos in ereztash's portfolio. This is the master dataset for H1-H5 validation.

## Classifier rubric

| Feature | Signal | Source |
|---------|--------|--------|
| F1: Non-template production dependency | Domain lib / external API SDK / DB ORM not in scaffold defaults | package.json / requirements.txt |
| F2: Any human/direct commit | Non-bot, non-Lovable commit author | git log |
| F3: Any PR ever | ≥1 pull request opened | PRs API |
| F4: CLAUDE.md or docs/ folder | Committed config/docs infrastructure | file listing |

**Tier A**: 3–4/4 — managed system  
**Tier B**: 1–2/4 — resumed prototype  
**Tier C**: 0/4 — Lovable-only, abandoned  
**Tier D**: non-software or empty repo (new at n=25)

---

## Master table

| # | Repo | Language | Visibility | F1 | F2 | F3 | F4 | Score | Tier | Last commit | Days ago | AI tools |
|---|------|----------|------------|----|----|----|----|----|------|-------------|----------|----------|
| 1 | ampaign-craft | TypeScript | public | ✓ | ✓ | ✓ (199+) | ✓ | 4/4 | **A** | 2026-05-10 | 2 | Lovable + Claude Code |
| 2 | COR-SYS | TypeScript | public | ✓ | ✓ | ✓ (16) | ✓ | 4/4 | **A** | 2026-04-09 | 33 | Claude Code + Cursor |
| 3 | lessons | — | public | ✓ | ✓ | ✓ | ✓ | 4/4 | **A** | 2026-05-12 | 0 | Claude Code |
| 4 | groundstate-protocol | TypeScript | public | ✓ | ✓ | ✓ (10) | — | 3/4 | **A** | 2026-05-06 | 6 | Lovable + Claude Code + Codex |
| 5 | Algo-trade | Python | public | ✓ | ✓ | ✓ (21+) | — | 3/4 | **A** *(dormant)* | 2025-11-17 | 176 | Claude Code |
| 6 | CandiApp | Python | public | ✓ | ✓ | ✓ (5+) | ✓ | 4/4 | **A** *(dormant)* | 2025-11-19 | 174 | Claude Code |
| 7 | brain-healer-hub | TypeScript | public | ✓ | ✓ | — | — | 2/4 | **B** | 2026-04-03 | 39 | Lovable + Claude Code |
| 8 | kolzchut | Python | public | ✓ | ✓ | — | — | 2/4 | **B** | 2026-03-21 | 52 | Claude Code |
| 9 | chess-mind-patterns | TypeScript | private | ✓ | ✓ | — | — | 2/4 | **B** | 2026-03-23 | 50 | Lovable + Claude Code |
| 10 | org-fortify | TypeScript | public | ✓ | — | — | — | 1/4 | **B** | 2026-03-27 | 46 | Lovable |
| 11 | All_Erez-s_Connections | HTML/JS | public | — | ✓ | — | — | 1/4 | **B** | 2026-04-01 | 41 | — |
| 12 | keepath | TypeScript | public | ✓ | ✓ | — | — | 2/4 | **B** *(operator-absent)* | 2025-12-31 | 133 | Claude Code |
| 13 | nextjs-ai-chatbot | TypeScript | private | ✓ | ✓ | — | ✓ | 3/4 | **B** *(minimal customization)* | 2025-08-24 | 261 | — |
| 14 | Organziational_algo | Python | private | ✓ | ✓ | — | — | 2/4 | **B** | 2025-11-09 | 184 | — |
| 15 | Benchmark.ATS | Python | public | — | ✓ | — | — | 1/4 | **B** | 2025-11-18 | 175 | — |
| 16 | core-unified-consciousness | TypeScript | public | — | — | — | — | 0/4 | **C** | 2026-03-09 | 64 | Lovable only |
| 17 | Hr_SMB | — | public | — | ✓ | — | — | 1/4 | **D** | 2025-11-27 | 166 | — |
| 18 | Contradiction_loss | Python | private | — | ✓ | — | — | 1/4 | **D** | 2025-11-10 | 183 | — |
| 19 | Metatrader | Python | private | — | ✓ | — | — | 1/4 | **D** | 2025-06-03 | 344 | — |
| 20 | nuxtjs-boilerplate | Python | private | — | ✓ | — | — | 1/4 | **D** | 2025-03-31 | 407 | — |
| 21 | pilot | — | public | — | ✓ | — | — | 1/4 | **D** | 2026-01-12 | 120 | — |
| 22 | Focuos | — | public | — | — | — | — | 0/4 | **D** | 2025-09-12 | 242 | — |
| 23 | Masse-agent | — | public | — | — | — | — | 0/4 | **D** | 2025-06-24 | 322 | — |
| 24 | onto-trade | — | private | — | — | — | — | 0/4 | **D** | 2025-07-21 | 295 | — |
| 25 | Resilience_calculator | — | private | — | — | — | — | 0/4 | **D** | 2025-12-17 | 146 | — |

---

## Tier distribution

| Tier | Count | % | Repos |
|------|-------|---|-------|
| A — managed system | 6 | 24% | ampaign-craft, COR-SYS, lessons, groundstate-protocol, Algo-trade, CandiApp |
| B — resumed prototype | 9 | 36% | brain-healer-hub, kolzchut, chess-mind-patterns, org-fortify, All_Erez-s_Connections, keepath, nextjs-ai-chatbot, Organziational_algo, Benchmark.ATS |
| C — Lovable-only abandoned | 1 | 4% | core-unified-consciousness |
| D — non-software / empty | 9 | 36% | Hr_SMB, Contradiction_loss, Metatrader, nuxtjs-boilerplate, pilot, Focuos, Masse-agent, onto-trade, Resilience_calculator |

---

## Repo profiles (key observations per repo)

### Tier A

**ampaign-craft** (CampaignCraft) — The most active repo in the portfolio. 199+ PRs. CLAUDE.md + docs/ + .agents/ + .claude/ + evals/ + knowledge/ + load-tests/. Full Supabase backend (60KB SQL migrations), vercel.json, e2e/ test suite, Hebrew Excel data file. Claude commits directly; ereztash merges PRs. Last commit 2 days ago. This is the *actual* production system — not an absorbed child. The COR-SYS PR#16 absorption story was the reverse: COR-SYS absorbed CampaignCraft workflows into its docs folder.

**COR-SYS** — Deep-dived in prior session. 16 PRs, 32 docs, CLAUDE.md + LOG.md + skill.md + slash-command suite. Last active 33 days ago. Bilingual (HE+EN). Absorbed CampaignCraft as child project.

**groundstate-protocol** — Most vitally active (6d ago). 10 PRs, Hebrew RTL PR templates, AI-cross-review (Codex + Claude), research-citation commit voice. No CLAUDE.md (editorial discipline lives in commit messages). Lovable-started, Claude-pivoted.

**Algo-trade** — Most complex Python system. IBKR algo-trading with Kafka message bus, 77+ tests, 21+ PRs, 15+ documentation MD files (bilingual). 3 planes (data, order, shared). Full CI/CD via GitHub Actions. Dormant since 2025-11-17 (176 days). Classic H2 case: success condition (live trading) requires external brokerage account that blocked deployment.

**CandiApp** — HR/ATS resume parsing API. FastAPI + SQLAlchemy + Alembic + Docker + JWT auth. 5+ PRs. docs/ folder. Hebrew+English readme. Dormant 174 days. Similar pattern to Algo-trade: production-grade build, then stalled waiting for external validation.

**lessons** — The research/meta repo. Claude Code paired from day one. Used as persistent memory (MEMORY.md, LOG.md), playbook store, and now portfolio scan target.

### Tier B

**brain-healer-hub** — Lovable-started (2026-03-30) webinar landing page with Supabase lead capture. Claude Code added urgency bars, testimonials, scarcity messaging (5 direct commits). Then Lovable resumed for text tweaks (2026-04-03). Has `.env` committed (potential secret exposure risk). No PRs. Last: 39d.

**kolzchut** — RAG-powered Hebrew civic rights tool (kol-zchut.org.il API). Claude Opus 4.6 + Streamlit. 2 commits by "Password-saver" (different GitHub account, co-authored by Claude Sonnet 4.6). Distinct from ereztash's main account. Minimal but functional. Last: 52d.

**chess-mind-patterns** — Deep-dived. 72-minute Claude resumption sprint after 14-day Lovable blast. chess.js domain dep. PWA + Lichess integration. No further activity. Last: 50d.

**org-fortify** — Lovable-only commits (no human breakout). Has LOG.md (likely Lovable-prompted, not human-authored — this weakens the LOG.md signal from prior session). Supabase backend. Dashboard with HealthGauge, ASAEngine, TourniquetManager — org resilience tooling. Last: 46d.

**All_Erez-s_Connections** — Small Node.js server (server.js + package.json). Human commits only. Connections visualization tool. 3 commits. Last: 41d.

**keepath** — Turborepo monorepo. 2 Claude batch-builds (2025-12-30 and 2025-12-31): 4 Next.js apps + NestJS API + AI engine (OpenAI + Anthropic) + Prisma + Docker + CI/CD. Default branch is `claude/modular-system-design-kJg0a` — never merged to main! Operator never resumed after Claude's blast. Classic **operator-absent pattern**: structurally Tier A infrastructure, Tier D operator engagement. Last: 133d.

**nextjs-ai-chatbot** — Vercel's AI chatbot template fork. 2 commits: initial + package-lock.json. Has docs/ from template. No customization. Last: 261d. Score inflated by template's docs/.

**Organziational_algo** — Small PyTorch ML experiment. data.py, model.py, train.py, losses.py, report.py, notebook.ipynb. 2 human commits. Description says "decision making algo" but content is Contradiction Loss research. Last: 184d.

**Benchmark.ATS** — ATS benchmark dataset (50 resumes, validation scripts, Hebrew README). Companion to CandiApp. 2 human commits. Flat file dump + Python scripts. Last: 175d.

### Tier C

**core-unified-consciousness** — Deep-dived. Pure Lovable-only bot blast. 54 commits in 133 minutes. Zero human commits, zero PRs. README placeholder and package.json template token still at HEAD. Success condition was "render the vision" → Lovable publish satisfied it fully. Abandoned 64 days ago.

### Tier D (non-software or empty)

**Hr_SMB** — Knowledge/document repo. Hebrew PDFs (AI agent design, system prompts, HR strategy), English Markdown frameworks. No code. Upload-only commits. Org resilience consulting material.

**Contradiction_loss** — Research artifact. Hebrew PDFs + Python chart scripts. Contradiction Loss algorithm research papers for autonomous vehicles. No runnable system. 5 open issues.

**Metatrader** — AI/trading agent script collection. Files named: "broker agent.py", "Anomaly agent.py", "COBWEB_System_Complete.py", "MetaBeingCore - Unified Conscious Agent.py", "morphosence agent.py", Hebrew-named MVLP decision agent. Pre-Claude-Code era exploratory scripts. No structure, no requirements.txt, spaces in filenames.

**nuxtjs-boilerplate** — Misnamed: ALMABoard MetaTranslator project. Python scripts named after people (alma.py, ella.py, erez.py, etc.) + Nuxt.js frontend. File upload dump. Last: 407d (oldest repo).

**pilot** — Contains one 45KB binary file named `101` and a 7-byte README. Purpose unclear. Last: 120d.

**Focuos** — Empty. README only (19 bytes: "# Focuos"). Created 2025-09-12. Last: 242d.

**Masse-agent** — Empty. README only (13 bytes: "# masse-agent"). Created 2025-06-24. Last: 322d.

**onto-trade** — Empty. README only (12 bytes). Created 2025-07-21. Last: 295d.

**Resilience_calculator** — Empty. README only (329 bytes, description "Demo Cal"). Private. Last: 146d.

---

## Cross-cutting observations

### 1. The Tier D surprise (invisible at n=4)
The prior session's 4-repo deep-dive had 0 Tier D repos. At n=25, **36% of the portfolio is non-software**: 5 are completely empty (Focuos, Masse-agent, onto-trade, Resilience_calculator, pilot), 4 are document/script dumps (Hr_SMB, Contradiction_loss, Metatrader, nuxtjs-boilerplate). This means the 4-feature classifier needs a pre-filter: is this even a software project?

### 2. Only one true Tier C
The prior hypothesis predicted multiple Tier C repos (Lovable-abandoned). At n=25 there is only ONE: core-unified-consciousness. This suggests the publish-button trap is rarer than expected — most Lovable projects were either resumed (Tier B) or never software projects at all (Tier D). The 4-feature classifier conflates "Lovable-publish satisfied" with "empty repo" which are different failure modes.

### 3. The operator-absent pattern (keepath)
keepath is a new data point not in the prior dataset: a repo built entirely by Claude Code in a massive one-shot batch, with no operator follow-up. Structurally, it has 3/4 features (deps ✓, human account ✓, no PR, no CLAUDE.md). But the operator never resumed. This differs from Tier C (which had operator satisfaction) — here the operator may have been overwhelmed by the blast output rather than satisfied.

### 4. Age-to-activity inversion
The 5 oldest repos (nuxtjs-boilerplate 407d, Metatrader 344d, Masse-agent 322d, onto-trade 295d, Focuos 242d) are all Tier D. The 5 most active repos (ampaign-craft 2d, lessons 0d, groundstate-protocol 6d, COR-SYS 33d, brain-healer-hub 39d) are all Tier A or B. The portfolio shows a clear age-to-activity inversion: older = more likely to be dormant or non-software.

### 5. Python vs TypeScript split
Python repos skew toward Tier D/B (Algo-trade and CandiApp are exceptions). TypeScript repos skew toward Tier A/B. The Lovable bootstrap pattern is exclusively TypeScript (React/Vite). Python repos are either pre-Lovable-era scripts or Claude-built APIs.

### 6. Hebrew language signal
Repos with Hebrew content: ampaign-craft (Hebrew Excel), Algo-trade (EXECUTIVE_SUMMARY_HE.md), Benchmark.ATS (README_he.md), kolzchut (Hebrew civic tool), Hr_SMB (Hebrew PDFs), Contradiction_loss (Hebrew research), org-fortify (Hebrew component names), groundstate-protocol (Hebrew PR templates), COR-SYS (bilingual CLAUDE.md). Hebrew correlates with higher operator investment — the bilingual cognition pattern holds at n=25.

---

## Data quality notes

- Total repos returned by GitHub search: 25 (handoff expected 26 — 1 repo may be missing or private/hidden)
- 4 repos deep-dived in prior session (cor-sys, groundstate-protocol, chess-mind-patterns, core-unified-consciousness)
- ampaign-craft had prior mini-profile; now confirmed as fully independent Tier A (not absorbed)
- keepath default branch is `claude/modular-system-design-kJg0a` — main branch is empty; all work on claude/ branch
- nextjs-ai-chatbot F4 score is inflated by template's docs/ folder (minimal operator investment)
- Benchmark.ATS F1 score: ats_validation_script.py uses Python stdlib + potentially minimal deps; no requirements.txt with heavy libs confirmed
