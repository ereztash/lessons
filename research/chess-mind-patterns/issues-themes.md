# chess-mind-patterns — Issues Themes

## Summary

**Zero issues, ever.** `mcp__github__list_issues(state=OPEN)` and `state=CLOSED` both return `{issues:[],totalCount:0}`. No issue templates, no `.github/ISSUE_TEMPLATE/` directory exists. No labels are present.

## Comparison across the 4-repo set

| Repo | Issues (open) | Issues (closed) | Issue tracker substitute |
|---|---|---|---|
| `cor-sys` | 0 | 0 | 32-file `docs/` directory (~270 KB) — see cor-sys insight 2026-05-12 10:12 |
| `groundstate-protocol` | (per prior phase, see groundstate-protocol/issues-themes.md) | — | — |
| `chess-mind-patterns` | **0** | **0** | None visible — no `docs/`, no `TODO.md`, no `BACKLOG.md`, no `CLAUDE.md`, no `AGENTS.md` |
| `core-unified-consciousness` | (Phase 4) | — | — |

chess-mind-patterns is the *purest zero-tracking case* in the survey: no GitHub issues, no committed Markdown that functions as a backlog. The only retrospective artifacts are the three `feat:` commit bodies, which list features in declarative completed-past-tense form, not as TODOs.

## What this means

In cor-sys, the operator chose committed-Markdown over Issues because Markdown is reachable from Claude Code sessions (anti-pattern `#12` in LOG.md was added explicitly to be confronted on session start). chess-mind-patterns has no such infrastructure — which is consistent with the repo being a **prototype** rather than a **maintained system**. The operator's mental model appears to be:

- *Prototype mode (chess-mind-patterns):* Lovable for surface, Claude Code for action layer, ship to PWA, no formal tracking, indefinite pause.
- *System mode (cor-sys):* CLAUDE.md + LOG.md + skill.md + docs/ + slash commands, continuous evolution.

This bifurcation is a strong cross-repo signal: the same operator shipped both styles in the same month. The infrastructure layer is *not* a function of operator experience — it is a function of *intent for the repo*.

## Implication for resumption

The absence of issues at resumption time (2026-03-23) is fully consistent with the resumption mechanism. The operator did not need to read a backlog to know what to build; they had a *plan in their Claude Code session* (commit B is titled 'full course replacement — Phase 1-5 implementation', which implies a numbered plan that lived elsewhere — most likely a prompt or a project doc fed to Claude Code, not a GitHub artifact). The GitHub issues feature is irrelevant to this workflow.

If the operator had wanted *external collaborators* on chess-mind-patterns, issues would be required. Their absence is *consistent with* the single-operator pattern observed in cor-sys, but here it is starker because there is also no documentation substitute.
