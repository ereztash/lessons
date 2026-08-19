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

## _crm

- **Tier**: B | **Score**: 4/4, F5 — | F1 ✓ F2 ✓ F3 ✓(26) F4 ✓ | R — (49d)
- **AI tools**: Claude Opus 4.8 — **211 of 231 commits carry the trailer; 9 name Claude as author (23×)**
- **Dormancy**: 49d | **Pattern**: the Ownership Engine — 230 of 231 commits in June 2026, then stop
- **Key findings**:
  - **`docs/G1_KILLTEST_2026-06-14.md` refuted the repo's own headline metric.** ICC 0.89 was tested
    for construct reliability vs Opus self-consistency across three model families: within-Opus 0.94,
    **cross-family 0.115**, facilitation **−0.037**. Verdict logged as a claim downgrade —
    *"exactly the kind of self-kill the instrument exists to surface"* — with three confounds stated
    so the refutation is not over-read either
  - `docs/LOCO_PREDICTION_2026-06-14.md` reports rank-accuracy **1.0** and, in the same sentence,
    that a perfect rank at n=3 is **p~0.17, not significant**
  - **Validated against AnnoMI** — 133 public motivational-interviewing sessions. The only repo in
    the 40 that tests against data the operator did not produce
  - 70 docs incl. three model cards, a DPIA, consent policy, incident response, adversarial
    simulation; 127 test modules incl. `test_trust_ledger.py`, `test_no_pii_in_research_outputs.py`
  - A named client **failure** case merged one PR after the success case (#20, #21)
  - Author identity `Erez (COR-SYS)` — a third per-project human git identity
  - **Zero cadence bursts and no agent branches**: the trailer is the only evidence of AI pairing
- **Watch for**: the mirror `CRM_Google_ai` froze at 397 files on 2026-06-14; `_crm` is at 579.
  Work here, never there. And the reliability claim is **downgraded** — do not cite ICC 0.89
- **Playbooks**: none yet — source for `self-refuting-kill-test`, `claim-downgrade-ledger`,
  `result-reported-with-its-own-ceiling`, `external-corpus-validation`
- **Deep-dive**: `research/_crm/`
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
