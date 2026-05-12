# Skills & Commands — Quick Reference

> Fast-path decision trees. Invoke BEFORE loading full pipeline files.

## 5 Custom Skills

### `workflow-archaeologist`
When: characterizing a repo's authoring evolution from git history
Signals: "trace authors", "commit archaeology", "who wrote what", "author rotation", "author class"
Cascade: output → `insight-distiller`
File: `.claude/skills/workflow-archaeologist.md`

### `insight-distiller`
When: converting raw observations into monetizable rules
Signals: "extract insight", "distill", "rule", "what's the lesson", "pattern"
Cascade: drafted rule → auto-triggers `monetization-auditor`
File: `.claude/skills/insight-distiller.md`

### `monetization-auditor`
When: gating an insight via the 5-criterion threshold
Signals: "would a customer pay", "monetize", "productize", "audit insight", "defensible"
Cascade: pass → dimension folder; fail → `_parking-lot.md`
File: `.claude/skills/monetization-auditor.md`

### `dimension-router`
When: classifying a raw insight into 1 of 4 dimensions
Signals: "which dimension", "claude→user", "self-work", "personal workflow"
Cascade: classified insight → `insight-distiller`
File: `.claude/skills/dimension-router.md`

### `cross-repo-comparator`
When: testing if a pattern observed in 1 repo generalizes to others
Signals: "does this appear in", "cross-repo", "generalize", "isomorphism"
Cascade: output writes row to `/research/cross-repo/patterns-matrix.md`
File: `.claude/skills/cross-repo-comparator.md`

## 6 Slash Commands

| Command | Purpose |
|---------|---------|
| `/lesson-capture <observation>` | Append raw observation to active repo's `extracted-insights.md` with timestamp + dimension-guess |
| `/lesson-distill <id>` | Run `insight-distiller` on captured raw obs; draft in `/insights/<dim>/` |
| `/lesson-review [dimension]` | Walk `/insights/<dim>/`, return TL;DR with monetization scores |
| `/lesson-monetize <id>` | Run `monetization-auditor`; return pass/fail + productization sketch |
| `/lesson-cross-check <pattern>` | Run `cross-repo-comparator`; produce patterns-matrix row |
| `/lesson-ship <playbook-name>` | Promote passed insights into `/products/playbooks/<name>.md` with pricing-hypothesis |

## Invocation Rules

- One skill at a time. Never mix pipelines.
- `profile/identity.md` cannot be overridden by any skill.
- If a task contradicts the monetization gate → report, don't skip.
- Skills are English-only (machine-consumed); commands accept HE+EN args.
