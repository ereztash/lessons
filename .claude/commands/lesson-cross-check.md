# Command — /lesson-cross-check

> Verify cross-repo consistency: does a new repo's evidence support or refute the existing patterns-matrix?

## Usage

```
/lesson-cross-check <new-repo-path>
```

## What it does

1. Reads /research/cross-repo/patterns-matrix.md (the 35 rows).
2. Reads /research/<new-repo>/extracted-insights.md.
3. For each existing pattern, scores the new repo's strength (0/1/2/3).
4. Identifies:
   - Patterns that gain evidence (existing promoted → stronger)
   - Patterns that fail to replicate (existing promoted → reconsider)
   - New candidate patterns (in new repo but not in matrix)
   - Promotion threshold crossings (candidate → promoted now that a 2nd repo confirms)
5. Writes /research/cross-repo/deltas/<YYYY-MM-DD>-<new-repo>.md with the structured delta.
6. Proposes a matrix update (the new column to append) but does NOT apply it directly.
7. On user confirmation, applies the matrix update and updates MEMORY.md promoted-patterns count.

## Prerequisites

- New repo's extracted-insights.md exists
- Phase ≥2 (cross-repo synthesis already done with the original 4 repos)
- /research/cross-repo/patterns-matrix.md is the current baseline

## Output

- /research/cross-repo/deltas/<date>-<repo>.md (the delta report)
- On confirmation: patterns-matrix.md updated; MEMORY.md counts updated

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Modifying patterns-matrix.md without writing the delta first | Delta is the proposal; matrix is the record. Skipping the delta loses the reasoning trail. |
| 2 | Scoring strength without naming the specific observation that supports it | Each non-zero strength MUST cite ≥1 observation (repo@HH:MM). Unsupported scores compound errors. |
| 3 | Refusing to admit failed replication | A promoted pattern failing in a sixth repo is a finding, not a problem. Document it; the promotion criterion may need refinement. |
| 4 | Treating the new repo's silence on a pattern as confirming absence | Silence is ambiguous. Confirm absence with explicit "checked, not present" before scoring 0. |
| 5 | Letting a delta sit unmerged | Once the delta is approved, the matrix update and MEMORY.md update happen in the same commit. Stale deltas mislead the next agent. |

## Cross-references

- Skill that does the work: cross-repo-comparator
- Matrix: /research/cross-repo/patterns-matrix.md
- Synthesis: /research/cross-repo/synthesis.md (Phase 2 baseline)
- Delta location: /research/cross-repo/deltas/
