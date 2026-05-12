# Skill — monetization-auditor

> Apply the 5-criterion gate to a distilled insight.

## When to invoke

- `insight-distiller` produced a draft (auto-cascade)
- User runs `/lesson-monetize <slug>` manually
- Re-auditing a parked insight after 1 phase

## Signals

- "monetize"
- "audit insight"
- "would a customer pay"
- "productize"
- "defensible"

## Cascade

- Pass (≥4/5) → leave insight in dimension folder; flag in MOC
- Fail (≤3/5) → append to `/insights/_parking-lot.md` with failure-reasons; remove from dimension folder

## Procedure

1. Read the insight file. Extract front-matter.
2. Apply each of the 5 questions from `/pipelines/monetization-audit.md`:
   - Q1 Reusable
   - Q2 Defensible
   - Q3 Time-saving
   - Q4 Encodable
   - Q5 Evidence-anchored
3. For each, mark `pass` or `fail` with a one-line justification.
4. Sum pass-count = monetization-score (N/5).
5. Update front-matter: `monetization-criteria` and `monetization-score`.
6. If ≥4/5: leave in folder, add row to relevant MOC.
7. If ≤3/5: append the whole file to `/insights/_parking-lot.md` and delete the standalone file.

## Output schema

Updated front-matter in the insight file:

```yaml
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
```

## Anti-patterns

- Treating Q2 (Defensible) as a gut check — must compare against actual published guides
- Marking Q3 pass without an hours estimate
- Counting same repo twice in Q5 (must be 2 DISTINCT repos)
