# Pipeline — Insight Extraction

> Step-by-step protocol: artifact → observation → mechanism → rule → monetization test.

## Entry conditions

- Active repo declared in `MEMORY.md`
- Pre-research validation completed (see `profile/workflow.md` Step 2)
- Evidence source identified (code / git / PR / issue)

## Steps

### Step 1 — Extract artifact
Fetch the raw artifact via MCP tool:
- `mcp__github__list_commits` for git history slices
- `mcp__github__pull_request_read` for PR body+metadata
- `mcp__github__get_file_contents` for code/docs
- `mcp__github__list_issues` for issue themes

Write raw extract to `/research/<repo>/<artifact-type>.md` (commit-archaeology, pr-patterns, etc.) in tabular form.

### Step 2 — Surface observation
In the tabular extract, note rows that deviate from the expected baseline:
- Conventional-commit prefix evolution
- Author class transitions
- Branch-naming changes
- Commit message length/style shifts

For each deviation, `/lesson-capture` with the row as evidence pointer.

### Step 3 — Hypothesize mechanism
For each captured observation, ask:
- What does this enable or block?
- What would happen if the pattern were inverted?
- Does the pattern repeat elsewhere in the same repo?

Append mechanism hypothesis to the observation in `extracted-insights.md`.

### Step 4 — Group into rules
When ≥2 observations point to the same mechanism, group them. Run `/lesson-distill <theme>` to produce a draft insight.

### Step 5 — Audit
`/lesson-monetize <slug>` runs `monetization-auditor`. Pass → keep in dimension folder; fail → park.

## Exit conditions

- All extracted-insights.md entries either distilled or marked "deferred"
- Active repo's research folder has all 6 artifacts present (timeline, commit-archaeology, pr-patterns, issues-themes, architecture-notes, extracted-insights)
- `MEMORY.md` updated with new state

## Anti-patterns

- Distilling from a single observation → forced; usually fails reusability test
- Distilling without mechanism hypothesis → produces descriptive insights, not actionable
- Skipping the audit → ships unverified "insights" that fail in production use
