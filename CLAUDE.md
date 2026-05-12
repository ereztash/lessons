# Lessons — Agent Entry Point

## GATE 0 — Session Init (BLOCKING — before ANY tool call)

Read in this exact order:

| # | File | Tokens | What it gives you |
|---|------|--------|-------------------|
| 1 | `LOG.md` | ~600 | Environment facts, anti-patterns, session history |
| 2 | `MEMORY.md` | ~200 | State index: current phase, last-touched repo, open candidates |
| 3 | `skill.md` | ~300 | 5 custom skills + 6 slash commands quick-ref |
| 4 | `CLAUDE.md` (this file) | ~400 | Quick rules, two-layer architecture, navigation |

**Tier 1 — load only when task requires it:**
- `index/CLAUDE.md` — master deep-dive (HE+EN), routing logic, 4-dimension MOC links
- `index/MOC-<dimension>.md` — specific dimension index
- `pipelines/<name>.md` — execution protocol for current task

**Context health:** >70% context → MONITOR mode. 2 self-corrections → `/clear`.

If LOG.md not yet read this session → **read it now. Do not proceed without it.**

## Quick Rules

- **Plan-Validate-Capture-Distill** — never invent insights. Use `insight-distiller` skill.
- **Evidence or defer** — every insight requires evidence pointer (commit SHA / file path / PR#).
- **Two layers, never duplicate** — Claude-operational vs Human-narrative. Split, don't repeat.
- **Monetization gate** — 4/5 criteria required (Reusable, Defensible, Time-saving, Encodable, Evidence-anchored).
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

| Repo | Maturity | Effort allocation | Status |
|------|----------|-------------------|--------|
| cor-sys | Most mature | 40% | Phase 1 active |
| groundstate-protocol | Maturing | 25% | Phase 1 queued |
| chess-mind-patterns | Resumed prototype | 20% | Phase 1 queued |
| core-unified-consciousness | Stalled | 15% | Phase 1 queued |

## Navigation

- For research → `/research/<repo>/` or `/research/cross-repo/`
- For polished insights → `/insights/<dimension>/`
- For productized insights → `/products/playbooks/`
- For deep workflow → `/index/CLAUDE.md`
