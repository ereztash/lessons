# Command — /lesson-capture

> Append a raw observation to the active repo's `extracted-insights.md`.

## Usage

```
/lesson-capture <one-line title>
```

Follow-up: Claude prompts for evidence pointer + observation body if not supplied inline.

## What it does

1. Reads MEMORY.md to identify the active repo (Phase 1 only). Halts on Phase 0/2/3/4.
2. Opens /research/<active-repo>/extracted-insights.md.
3. Appends a new section using the canonical template:

```markdown
## YYYY-MM-DD HH:MM — <title>
**Dimension guess**: claude-to-user | user-to-claude | claude-to-claude | user-to-user
**Evidence**: <commit-sha:path | PR#N | issue#N | file-at-HEAD>
**Observation**: <2-5 sentences, dense>
**Mechanism hypothesis** (optional): <1-2 sentences>
```

4. Updates MEMORY.md raw-observations count (+1).
5. Does NOT trigger distillation. Capture is intentionally fast and lossy — the polishing happens in /lesson-distill.

## Prerequisites

- Active phase = 1 (per MEMORY.md)
- Active repo named in MEMORY.md
- Evidence pointer at hand (otherwise: gather it first; the command rejects unanchored captures)

## Output

- /research/<active-repo>/extracted-insights.md appended
- MEMORY.md observation count incremented
- No commits to source repos; lessons-repo only

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Capturing without an evidence pointer | Reject. Every observation MUST cite a commit SHA, PR number, issue number, or HEAD file path. Unanchored observations are speculation, not data. |
| 2 | Capturing across multiple repos in one command | Reject. One repo per capture. Multi-repo claims belong in synthesis, not raw observations. |
| 3 | Inlining a full insight (with mechanism + failure mode + monetization route) | That is distillation, not capture. Use /lesson-distill after Phase 1 closes. Mixing the two layers loses the raw evidence trail. |
| 4 | Running /lesson-capture in Phase 2+ to retro-add observations | Phase 1 is closed. New observations re-open Phase 1 for the affected repo and require re-running cross-repo-comparator. |

## Cross-references

- Pipeline: /pipelines/insight-extraction.md
- Skill that auto-invokes during Phase 1: workflow-archaeologist
- Follow-up command: /lesson-distill (Phase 3 entry)
- State file: MEMORY.md (active repo + observation count)
