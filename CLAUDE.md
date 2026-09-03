# Lessons — Agent Entry Point

> **Re-founded 2026-09-03.** Current thesis: `docs/REFOUNDATION_DECISION.md`.
> Which document answers which question: `docs/AUTHORITY_MAP.md`.
> What may not be edited: `research/re-foundation/DO_NOT_TOUCH.md` (five frozen classes, including
> an open prospective test resolving 2026-11-17).

## GATE 0 — Session Init (BLOCKING — before ANY tool call)

Read in this exact order:

| # | File | Tokens | What it gives you |
|---|------|--------|-------------------|
| 1 | `LOG.md` | ~600 | Environment facts, anti-patterns, session history |
| 2 | `MEMORY.md` | ~200 | State index: current phase, last-touched repo, open candidates |
| 3 | `skill.md` | ~300 | 5 custom skills + 6 slash commands quick-ref |
| 4 | `CLAUDE.md` (this file) | ~400 | Quick rules, two-layer architecture, navigation |
| 5 | `docs/AUTHORITY_MAP.md` | ~500 | Which document is authoritative for which question |

**Tier 1 — load only when task requires it:**
- `index/CLAUDE.md` — master deep-dive (HE+EN), routing logic, 4-dimension MOC links
- `index/MOC-<dimension>.md` — specific dimension index
- `pipelines/<name>.md` — execution protocol for current task

**Context health:** >70% context → MONITOR mode. 2 self-corrections → `/clear`.

If LOG.md not yet read this session → **read it now. Do not proceed without it.**

## Dual-Repo Mode

If this session has access to both `lessons` (this repo) AND a target repo:

1. Run `pipelines/dual-repo-session.md` Gate 0 **instead of** the standard Gate 0 above
2. Look up the target repo in `research/repo-index.md` — one grep, full context
3. Output the one-line context summary before any tool call on the target repo

Dual-repo mode bypasses the standard LOG/MEMORY/skill read when the target repo is the focus. Load only what the repo-index entry prescribes.

## Quick Rules

- **Plan-Validate-Capture-Distill** — never invent insights. Use `insight-distiller` skill.
- **Evidence or defer** — every insight requires an evidence pointer that **resolves** to a commit,
  file or PR. `evidence-resolves-to` is measured, not asserted. Run `scripts/check-lessons-contract.py`.
- **A green check never seen to go red is not evidence** — fire every gate once on a deliberately
  broken input before trusting it (`ground-truth/gate-reliability.md`).
- **Two layers, never duplicate** — Claude-operational vs Human-narrative. Split, don't repeat.
- **Monetization gate** — 4/5 criteria required. **Measured: 12 of 12 candidates passed. Nothing has
  ever failed it, so treat it as a checklist, not a gate** (`research/re-foundation/CONTRADICTIONS.md` §6).
- **Every gate must have a named consumer.** A verdict nobody acts on is `UNCONSUMED`, which is
  neither a pass nor a missing measurement (LOG anti-pattern #24).
- **GitHub MCP only** — `gh` CLI not available. Use `mcp__github__*` tools.
- **English for machine-consumed files** (skills, LOG, MEMORY, pipelines). HE+EN bilingual for /index and /profile.

## Two-Layer Architecture

| Layer | Audience | Style | Examples |
|-------|----------|-------|----------|
| Claude-operational | Claude (machine) | Bullet-dense, decision-trees, front-matter | `LOG.md`, `skill.md`, `.claude/skills/*`, `_template.md` |
| Human-narrative | ereztash | Storytelling, full reasoning | `README.md`, `timeline.md`, `synthesis.md`, `playbooks/*` |

Rule: any doc >600 lines splits. Insight >200 words → Human layer, 5-line summary in Claude layer.

## 4 Dimensions of Optimization

1. **Claude → User** — how Claude communicates/delivers/paces (see `index/MOC-CLAUDE-TO-USER.md`)
2. **User → Claude** — how user prompts/scopes/hands-off (see `index/MOC-USER-TO-CLAUDE.md`)
3. **Claude → Claude** — context mgmt, multi-agent, self-correction (see `index/MOC-CLAUDE-TO-CLAUDE.md`)
4. **User → User** — personal workflow leverage (see `index/MOC-USER-TO-USER.md`)

## Source Repos (research targets)

Updated 2026-08-19 after the +5-repo ingestion round. Effort follows current activity, not
historical depth — the four originally deep-dived repos are all dormant.

| Repo | Maturity | Dormancy | Status |
|------|----------|----------|--------|
| MATI | Tier A, live | 0d | Deep-dived 2026-08-19 |
| pre-call | Tier A, live | 0d | **Deep-dived 2026-08-19** — 224 commits, measured stopping rule + DoD |
| proofminer | Tier B, live | 3d | **Deep-dived 2026-08-19** — 241 commits, largest hidden-agent repo |
| anti-silo | Tier A, healthy | 3d | Deep-dived 2026-08-19 |
| Agent-Architect | Tier A, unclaimed trunk | 87d | Deep-dived 2026-08-19 |
| agency-insight-analyzer | Tier B | 68d | Deep-dived 2026-08-19 |
| CRM_Google_ai | mirror of `_crm` | 66d | Deep-dived 2026-08-19 — score the source, not this |
| ampaign-craft | Tier A | `main` 101d | Mini-profile; 77 remote branches unfetched |
| cor-sys | Tier A | 132d | Phase 1–4 complete |
| groundstate-protocol | Tier A | 17d | Phase 1–4 complete — **4 repos share this name-family; the 92d figure belongs to the private 67-commit copy, not this one** |
| chess-mind-patterns | Tier B | 149d | Phase 1–4 complete (not in session scope) |
| core-unified-consciousness | Tier C | 163d | Phase 1–4 complete (not in session scope) |

Full tier data: `research/repo-index.md` (32 entries). **Never state the portfolio size — derive it:**
`cut -f1 ground-truth/scores-2026-08-19*.tsv | grep -v '^repo$' | sort -u | wc -l` (40 on 2026-09-03).
**All tier numbers are provisional** until `ground-truth/prediction-2026-08-19.md` resolves 2026-11-17.
Delta + classifier corrections: `research/portfolio-scan/2026-08-19-rescan.md`

## Authorship rule (added 2026-08-19)

Never claim which AI tools a repo used from `git log --author` alone. In the 12-repo measurement it
undercounts by up to **6.7×** (`authorship-attribution.md`); the portfolio-wide record is **23×**
(`_crm`, `research/portfolio-scan/2026-08-19-cohort2.md` §4, outside that table). Cite the figure to
the file that contains it. It also misses agent surfaces entirely. Run `scripts/detect-agent-authorship.sh <repo>` and read
both detectors. Full method + portfolio table: `research/cross-repo/authorship-attribution.md`.

## Navigation

- For research → `/research/<repo>/` or `/research/cross-repo/`
- For polished insights → `/insights/<dimension>/`
- For productized insights → `/products/playbooks/`
- For deep workflow → `/index/CLAUDE.md`
- **For dual-repo session** → `pipelines/dual-repo-session.md`
- **For any repo lookup** → `research/repo-index.md`
- **For the portfolio read as one system** → `research/cross-repo/portfolio-as-one-mechanism.md`
