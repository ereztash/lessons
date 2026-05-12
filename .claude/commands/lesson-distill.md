# Command — /lesson-distill

> Promote a promoted-in-MOC pattern to a polished /insights/<dim>/<slug>.md file.

## Usage

```
/lesson-distill <pattern-slug> [--moc=<moc-file>]
```

If --moc not supplied, Claude infers the MOC from the slug or asks.

## What it does

1. Reads MEMORY.md to confirm Phase ≥3.
2. Reads /insights/_template.md to lock in the front-matter schema.
3. Reads the source MOC (one of /index/MOC-*.md) to find the promoted-pattern entry matching <pattern-slug>.
4. Cross-checks the patterns-matrix.md row for evidence-repo list and strength scores.
5. Builds front-matter:
   - dimension (matches MOC)
   - slug (the input)
   - evidence-repos (list, from matrix row)
   - evidence-pointers (3-5, repo@HH:MM form)
   - monetization-criteria (all set to 'pending'; auditor fills these)
   - applicability (solo-builder default in this dataset)
   - created (today's date)
6. Writes the body using the template structure:
   - Observation (5 lines max, dense bullets — Claude-layer summary)
   - Mechanism (2-3 sentences causal chain)
   - Failure mode it prevents (with hours-of-rework estimate)
   - Monetization route (named artifact: skill / command / template / playbook section)
   - Reusability test (substitute a non-dataset repo)
7. Saves to /insights/<dim>/<slug>.md.
8. Updates the source MOC's Related-playbooks section with a forward-reference placeholder.
9. Cascades to /lesson-monetize (the auditor) automatically.

## Prerequisites

- Phase ≥3 (per MEMORY.md)
- Pattern is in the promoted section of a MOC (not the candidate section)
- Pattern has ≥2 repo evidence in patterns-matrix.md

## Output

- /insights/<dim>/<slug>.md (≤120 lines)
- MOC cross-reference updated
- Auditor automatically queued via cascade

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Distilling a candidate-section pattern | Promoted only. The promotion gate (≥2 repos × strength≥2) is the floor for distillation. |
| 2 | Filling in monetization-criteria values during /lesson-distill | The distiller produces; the auditor scores. Pre-scoring biases the audit. |
| 3 | Writing the full Human-layer narrative inside the insight file | The insight is the 5-line Claude-layer summary. The Human-layer playbook is written by /lesson-ship, not /lesson-distill. |
| 4 | Distilling all 17 promoted patterns at once | Distill the playbook candidates first (3-5 per phase 4 cycle). The rest stay as MOC entries until they become candidates. |

## Cross-references

- Pipeline: /pipelines/insight-extraction.md
- Skill that auto-invokes: insight-distiller
- Follow-up command: /lesson-monetize
- Template: /insights/_template.md
