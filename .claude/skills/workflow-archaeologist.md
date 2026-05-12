---
name: workflow-archaeologist
when:
  - User asks to deep-dive a single repo's git artifacts (commits, PRs, branches, issues, files at HEAD) to characterize the operator's workflow
  - A new repo enters scope (Phase 1 of the lessons workflow) and needs a 6-artifact survey written under /research/<repo>/
  - A claim made in synthesis needs to be re-anchored to a specific commit SHA or PR number
  - The user provides only a repo name and expects a structured set of files: timeline.md, commit-archaeology.md, pr-patterns.md, issues-themes.md, architecture-notes.md, extracted-insights.md
  - A pattern proposed in patterns-matrix.md needs a sixth-repo verification
signals:
  - regex: 'deep[- ]dive (the )?(repo|repository)'
  - regex: '/research/[a-z0-9-]+/'
  - keyword: 'extracted-insights.md'
  - keyword: 'Phase 1'
  - regex: 'survey (the )?(commits|PRs|branches|repo)'
cascade: insight-distiller (after observations are captured, distillation is next)
---

# workflow-archaeologist

The archaeologist is the field worker. It walks a single repo, surveys six artifacts, and emits raw observations with evidence pointers. It does NOT synthesize across repos and does NOT distill insights. Its only output is dense observation files that downstream skills consume.

## Procedure

1. Read MEMORY.md to confirm phase = 1 and identify the target repo. Refuse to run on phase 0, 2, 3, or 4.
2. Verify pre-research facts via the LOG.md Pre-Research Validation Protocol:
   - mcp__github__list_branches(owner, repo)
   - mcp__github__list_commits(owner, repo, perPage=100) — confirm commit count matches MEMORY.md expectations
   - mcp__github__list_pull_requests(owner, repo, state='all')
   - mcp__github__list_issues(owner, repo, state='all')
   If counts diverge from MEMORY.md by >10%, halt and re-read the Phase 0 survey before continuing.
3. Write /research/<repo>/timeline.md — chronological event list with timestamps. Sources: list_commits, list_pull_requests, list_branches.
4. Write /research/<repo>/commit-archaeology.md — distribution of authors, conventional-commit prefix usage, subject specificity, file-touch hotspots. Cite specific SHAs.
5. Write /research/<repo>/pr-patterns.md — TTM distribution, body length distribution, branch reuse, AI-tool signatures (Cursor footer, Codex citation, Claude direct authorship).
6. Write /research/<repo>/issues-themes.md — even if zero issues, the absence is itself an observation; document the theme.
7. Write /research/<repo>/architecture-notes.md — HEAD state of package.json (template token? non-template deps?), README placeholder survival, presence/absence of CLAUDE.md, docs/, test files, .github/.
8. Write /research/<repo>/extracted-insights.md — 10-12 dense observations, each with: timestamp heading (HH:MM format), dimension-guess, evidence pointer (commit SHA or PR# or file path), observation body (2-5 sentences), optional mechanism hypothesis.
9. Update MEMORY.md observation count (+10 to +12 per repo) and append a row to LOG.md Session History.
10. Cascade to insight-distiller iff this is the 2nd-or-later repo surveyed (single-repo cannot promote).

## Inputs/Outputs

Inputs:
- repo name (string, required) — must match a row in MEMORY.md Active research targets
- branch (string, default 'main')

Outputs:
- 6 files under /research/<repo>/
- Observation count updated in MEMORY.md
- LOG.md session-history row appended
- No commits to other-repo source; lessons-repo only

## Examples

**Example 1 — cor-sys Phase 1**: Agent was given repo=cor-sys. It surveyed 71 commits, 16 PRs (13 merged, 3 closed-unmerged), 0 issues, and wrote 6 artifacts totalling ~65KB. The extracted-insights.md captured 12 observations including the LOG.md monotonic-counter pattern (cor-sys@10:01) and the Hebrew encoding war (cor-sys@10:06). Cascade fired: insight-distiller queued for the next-repo synthesis.

**Example 2 — core-unified-consciousness Phase 1**: Agent was given repo=core-unified-consciousness. It surveyed 54 bot commits + 1 publish commit, 0 PRs, 0 issues. The architecture-notes.md captured the literal `vite_react_shadcn_ts` package.json name and triple `REPLACE_WITH_PROJECT_ID` in README — both became evidence pointers for the publish-button-satisfiability pattern. 11 observations captured; this is the negative-control repo for the Tier classifier.

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Skipping the Pre-Research Validation Protocol because counts "look right" | Always run all four list_* calls and compare to MEMORY.md before writing observations. A drift means the upstream survey is stale; observations built on stale upstream are unreliable. |
| 2 | Citing a commit by message excerpt instead of SHA | Evidence pointers MUST resolve. Use short-SHA + file path or PR number. Message excerpts rot when commits are rewritten. |
| 3 | Promoting an observation to a cross-repo pattern inside the extracted-insights.md file | The archaeologist captures, never promotes. Promotion is the synthesis layer's job, gated by ≥2 repos × strength≥2. |
| 4 | Writing 30 observations for a small repo because "more is better" | 10-12 dense, evidence-anchored observations beat 30 thin ones. Each observation must name a mechanism or be discardable. |
| 5 | Running on a repo not listed in MEMORY.md Active research targets | The skill is scoped to phase 1 targets only. Out-of-scope repos pollute the dataset. |
