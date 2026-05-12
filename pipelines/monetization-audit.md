# Pipeline — Monetization Audit

> The 5-question audit gating an insight into the monetizable shelf.

## Trigger

`/lesson-monetize <insight-slug>` invokes this pipeline via the `monetization-auditor` skill.

## The 5 questions

### Q1 — Reusable
Does the insight generalize to a 6th repo (not in the dataset)?
- **Test**: substitute `cor-sys` with `some-other-repo`. Does the insight still hold?
- **Pass criterion**: holds without modifying the rule statement.
- **Fail criterion**: requires editing the rule to fit a new context.

### Q2 — Defensible
Would a paying customer (freelancer / solo builder / small team) pay for this insight?
- **Test**: write the insight as a one-paragraph LinkedIn post. Would someone DM asking for more?
- **Pass criterion**: non-obvious, not on the first page of a relevant Google search.
- **Fail criterion**: common knowledge or already documented in popular guides.

### Q3 — Time-saving
Does the insight prevent ≥1 hour of rework per future session?
- **Test**: name the specific failure mode it prevents. Estimate hours.
- **Pass criterion**: ≥1 hour, with named failure mode.
- **Fail criterion**: vague "saves time" or <1 hour estimate.

### Q4 — Encodable
Can the insight become a skill / command / template?
- **Test**: which artifact would capture it? (skill, command, .md template, hook)
- **Pass criterion**: a specific artifact is named.
- **Fail criterion**: only a blog post / story, no operational form.

### Q5 — Evidence-anchored
Is the insight observed in ≥2 of the 4 source repos?
- **Test**: count evidence pointers across repos.
- **Pass criterion**: ≥2 distinct repos in `evidence-repos` front-matter.
- **Fail criterion**: only 1 repo, or repos that are duplicates (e.g., 2 Lovable templates of same shape).

## Scoring

- 5/5 → ship + flag as flagship
- 4/5 → ship
- 3/5 → park with failure-reasons; re-audit allowed after 1 phase
- ≤2/5 → park indefinitely (note in `_parking-lot.md`)

## Output

Write audit result to insight's front-matter as `monetization-score: N/5` and `monetization-criteria: { ... }`.

If pass → leave in dimension folder.
If fail → move file to `/insights/_parking-lot.md` (append, not separate file) with failure-reasons.

## Cross-references

- Skill: `/.claude/skills/monetization-auditor.md`
- Command: `/.claude/commands/lesson-monetize.md`
- Cross-repo gate: see `pipelines/cross-repo-diff.md` (Q5 enforcement)
