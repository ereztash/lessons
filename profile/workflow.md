# Workflow Profile — Plan-Validate-Capture-Distill (PVCD)

> The standard loop for adding any new insight to this repo. Loaded at strategic-task entry via `index/CLAUDE.md` Step 0.

## Loop

```
Plan → Validate → Capture → Distill → Audit → (Ship or Park)
```

### 1. Plan
Before touching any research file, state:
- Which repo is being analyzed
- Which data source (code / git / PR / issue)
- Which dimension(s) the observation might fit
- Expected output artifact path

### 2. Validate
Before deep extraction, run pre-research validation (see `LOG.md`):
- `mcp__github__list_branches`
- `mcp__github__list_commits` (perPage=100)
- `mcp__github__list_pull_requests` (state='all')
- `mcp__github__list_issues` (state='OPEN'|'CLOSED')

Mismatch with expectations → halt, re-read Phase 1 survey.

### 3. Capture
`/lesson-capture <observation>` appends to active repo's `extracted-insights.md` with:
- Timestamp
- One-line title
- Dimension guess
- Evidence pointer (commit-sha / path / PR#)
- 2-5 sentence observation
- Optional mechanism hypothesis

Do NOT distill at capture time. Capture is fast, lossy, additive.

### 4. Distill
`/lesson-distill <id>` runs `insight-distiller`. Produces draft at `/insights/<dim>/<slug>.md` with full front-matter.

Distillation requires:
- ≥2 raw observations in the same theme (no single-obs insights)
- Mechanism stated in ≤3 sentences
- Failure mode estimated in hours

### 5. Audit
`/lesson-monetize <id>` runs `monetization-auditor` (5 criteria, need 4/5).

Returns:
- Pass → routes to dimension folder (already there)
- Fail → routes to `/insights/_parking-lot.md` with failure-reason

### 6. Ship (optional, Phase 4)
`/lesson-ship <playbook-name>` aggregates passed insights into `/products/playbooks/<name>.md` with:
- ≥2 evidence rows
- Target buyer
- Rework hours saved
- Pricing hypothesis (in `/products/pricing-hypotheses.md`)

## Cadence rules

- One repo at a time during Phase 1
- `/lesson-checkpoint` after each major artifact (updates `MEMORY.md`)
- `/clear` if context >70% OR 2 self-corrections in a row
- End-of-session: append to `LOG.md` session history
