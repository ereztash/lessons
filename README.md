# Lessons — A Repository of Monetizable Workflow Insights

> A documentation-first "operating system" for extracting and productizing AI+human workflow insights, derived from cross-repo analysis of 5 real projects.

## Why this exists

Five repositories under `ereztash` represent five distinct stages of AI+human collaboration maturity — from the most disciplined (cor-sys with its custom skills and anti-pattern logs) to the most abandoned (core-unified-consciousness with 100% bot-authored commits that stalled on day one). Hidden inside their git histories, PR patterns, and code is a goldmine of workflow knowledge: what works, what fails, what generalizes.

**This repo extracts that knowledge into monetizable form.** Every insight is evidence-anchored to specific commits, files, or PRs. Every insight passes a 5-criterion monetization gate before being shipped as a playbook.

## Who this is for

- **Solo builders** who want a workflow that scales past the prototype phase
- **Small teams** integrating AI agents into their development process
- **Researchers** interested in human+AI collaboration patterns
- **Buyers** of the playbooks under `/products/playbooks/` — battle-tested workflow templates

## How it's organized (two layers, never duplicate)

### Claude-operational layer (machine-readable)
Dense, decision-tree style. Read by Claude every session.
- `CLAUDE.md` — Gate 0 protocol, quick rules
- `LOG.md` — environment, anti-patterns, session history
- `MEMORY.md` — current state index
- `skill.md` — 5 skills + 6 commands quick-ref
- `.claude/skills/*` — full skill definitions
- `.claude/commands/*` — full command definitions
- `pipelines/*` — execution protocols

### Human-narrative layer (storytelling)
Full reasoning, examples, customer framing. Read by ereztash.
- `README.md` (this file) — front door
- `research/<repo>/timeline.md` — per-repo evolution stories
- `research/cross-repo/synthesis.md` — cross-repo narrative
- `products/playbooks/*` — productized insights
- `products/pricing-hypotheses.md` — monetization map

## The 4 Dimensions

Insights are classified into one of:

1. **Claude → User** — how Claude communicates, paces, hands off
2. **User → Claude** — how the user prompts, scopes, supplies context
3. **Claude → Claude** — context management, multi-agent handoff, self-correction
4. **User → User** — the user's personal workflow leverage

Each dimension has its own MOC (Map of Content) under `/index/`.

## The Monetization Gate

An insight ships only if it passes 4 of 5 criteria:

1. **Reusable** — generalizes to a 6th repo not in the dataset
2. **Defensible** — non-obvious, would be paid for
3. **Time-saving** — prevents ≥1 hour of rework per session
4. **Encodable** — can become a skill/command/template
5. **Evidence-anchored** — observed in ≥2 of the 4 source repos

Failed candidates go to `/insights/_parking-lot.md` and may be revived later.

## Roadmap

- [x] Phase 0 — Scaffold (this commit)
- [ ] Phase 1 — Per-repo deep dive (cor-sys first)
- [ ] Phase 2 — Cross-repo synthesis
- [ ] Phase 3 — Skills/commands self-application test
- [ ] Phase 4 — Monetization audit + playbook shipping

## Navigating this repo

- Want raw research? → `/research/`
- Want polished insights by dimension? → `/insights/`
- Want productized playbooks? → `/products/playbooks/`
- Want to understand the workflow itself? → `/index/CLAUDE.md`
