# Command — /lesson-capture

> Append a raw observation to the active repo's `extracted-insights.md`.

## Usage

```
/lesson-capture <one-line title>
```

Follow-up: Claude prompts for evidence pointer + observation body if not supplied inline.

## What it does

1. Reads `MEMORY.md` to identify active repo.
2. Opens `/research/<active-repo>/extracted-insights.md`.
3. Appends a new section using the template:

```markdown
## YYYY-MM-DD HH:MM — <title>
**Dimension guess**: <dim>
**Evidence**: <commit-sha:path | PR#N | issue#N>
**Observation**: <2-5 sentences>
**Mechanism hypothesis** (optional): <1-2 sentences>
```

4. Updates `MEMORY.md` open-candidates list with the new entry.
5. Does NOT trigger distillation. Capture is fast and lossy.

## Anti-patterns

- Capturing without an evidence pointer → reject
- Capturing across multiple repos in one command → reject; one repo at a time
- Inlining a full insight (with mechanism + failure mode + monetization route) — that's distillation; use `/lesson-distill` instead

## Cross-references

- Pipeline: `/pipelines/insight-extraction.md`
- Follow-up command: `/lesson-distill`
