# MEMORY — State Index

> Lightweight snapshot of current state. Updated by `/lesson-checkpoint` or end-of-session. Single source of truth for "where are we?"

## Current State

- **Phase**: 1 — cor-sys complete; groundstate-protocol next
- **Last-touched repo**: cor-sys (6 artifacts written; 12 raw observations)
- **Active research target**: groundstate-protocol (queued, not started)
- **Skills built**: 0 of 5 planned (scaffold placeholders only)
- **Commands built**: 0 of 6 planned (scaffold placeholders only)
- **Insights distilled**: 0 (distillation happens in Phase 3)
- **Insights monetized (passed audit)**: 0
- **Playbooks shipped**: 0 of 3 target

## Open Monetization Candidates (from cor-sys deep dive)

High-signal patterns worth promoting to cross-repo check (Phase 2):

1. **Meta-tooling co-shipping** (31h35m window): operator ships product+anti-AI-mistake-tooling together, not sequentially. Evidence: `cor-sys@50f9166`.
2. **LOG.md as monotonic anti-pattern counter**: append-only 12-row table; never refactored. Evidence: `cor-sys@526237f:LOG.md`.
3. **Skills as research-to-decision-tree translation**: 4 heuristic skills land in one commit, predate use by 6 days. Evidence: `cor-sys@ff7395d:skill.md`.
4. **PR-as-notarization-ritual**: 11-second median TTM, single-operator, all merged. Evidence: 13 merged PRs in cor-sys.
5. **Identity convention flip (Apr 3)**: Co-Authored-By Claude → Claude direct authorship after tool delegation. Evidence: `cor-sys@1ab0c54`.
6. **Pre-Build Validation Protocol retrofit**: "30 seconds saves 3 hours" — codified after the 3-hour rework. Evidence: `cor-sys@526237f:LOG.md`.
7. **Bug-locus walk-up-the-stack**: 13-commit Hebrew encoding war — file → component → route → framework patch. Evidence: 13 commits from `cor-sys@bb3d459` to `cor-sys@e18b37e`.
8. **Slash commands as complete session lifecycle**: enter → plan → ship → debrief; no /test or /deploy. Evidence: `cor-sys@50f9166`, `cor-sys@526237f:skill.md`.
9. **Cursor vs Claude work patterns**: Cursor = fire-and-forget batch; Claude = interactive co-pilot. Evidence: `cor-sys@cee079e..49f9ada` (Cursor 9-min burst).
10. **docs/ as issue tracker**: 0 issues + 32 docs/. Pattern works only for single-operator AI-paired repos. Evidence: `cor-sys` issues count, `cor-sys@526237f:docs/`.
11. **Repo-as-unification-target**: CampaignCraft absorbed into cor-sys in 1 min 14 sec PR. Evidence: `cor-sys#PR-16`, `cor-sys@182a6b3`.
12. **Bilingual HE+EN at infrastructure cost**: SWC patched to force ASCII rather than removing Hebrew. Evidence: `cor-sys@e18b37e`.

## Deferred Questions

- [ ] Should bilingual HE+EN extend to /research narrative timelines, or stay English only?
- [ ] Pricing currency for playbooks (USD vs ILS)?
- [ ] Does the user want playbooks published publicly or kept internal?
- [ ] Which 3-5 of the 12 cor-sys candidates do we hypothesize will pass cross-repo evidence test?

## Phase Gates Status

| Phase | Gate | Status |
|-------|------|--------|
| 0 | Skeleton exists, cross-refs resolve | ✅ done (commit `a648ff3`) |
| 1 | 4 `extracted-insights.md` filled, ≥20 raw observations | 🟡 1/4 repos done (12 observations from cor-sys) |
| 2 | `patterns-matrix.md` has ≥8 rows | ⏸ pending |
| 3 | 5 skills + 6 commands tested via self-application | ⏸ pending |
| 4 | ≥3 playbooks shipped | ⏸ pending |

## Next Session Plan

1. **groundstate-protocol deep dive** (Phase 1 continued)
   - Focus areas: Lovable→bot→Claude transition, narrative copywriting evolution, PR discipline on `claude/*` branches
   - Expected: 6 artifacts + ≥5 observations
2. Then chess-mind-patterns (resumption pattern)
3. Then core-unified-consciousness (abandonment diagnostics)
4. Then Phase 2 cross-repo synthesis
