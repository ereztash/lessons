# Command — /lesson-review

> Re-read a recently distilled insight or shipped playbook against the source observations to confirm fidelity.

## Usage

```
/lesson-review <insight-path-or-playbook-path>
```

## What it does

1. Loads the target file (either /insights/<dim>/<slug>.md or /products/playbooks/<name>.md).
2. Extracts the evidence-pointers (repo@HH:MM or commit-sha references).
3. For each pointer, opens the corresponding /research/<repo>/extracted-insights.md and confirms the observation exists and supports the claim made in the insight/playbook.
4. Flags any claim that drifts from its source — paraphrasing is okay, but a load-bearing claim must trace back to an observation.
5. Confirms front-matter is consistent with /insights/_template.md schema (for insights) or playbook structure (for playbooks).
6. Writes a brief review report at /research/cross-repo/reviews/<YYYY-MM-DD>-<slug>.md with sections:
   - Pointers resolved (count)
   - Pointers unresolved (list — these need correction)
   - Claims drifted (list — paraphrase too far from source)
   - Schema violations (list — front-matter issues)
   - Verdict: clean | needs-correction

## Prerequisites

- Target file exists
- Source /research/<repo>/extracted-insights.md files exist for each cited repo

## Output

- /research/cross-repo/reviews/<date>-<slug>.md
- If verdict = needs-correction: a structured list of specific corrections to apply
- No mutations to the target file (review is read-only)

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Mutating the insight or playbook during review | Review is read-only. Corrections happen in a separate edit step after the review verdict. |
| 2 | Skipping unresolved pointers because "the claim is clearly true" | A claim that can't be traced is undocumented. Either find the missing pointer or weaken the claim. |
| 3 | Treating paraphrase as drift | Paraphrasing is fine. Drift is when the paraphrase changes the load-bearing direction of the claim (e.g., "sometimes" → "always"). |
| 4 | Running /lesson-review before /lesson-distill or /lesson-ship | Review is a post-creation audit. Pre-creation, there's nothing to review. |

## Cross-references

- Skill that does the actual verification work: cross-repo-comparator (in review-mode)
- Pipeline: /pipelines/review.md (if exists)
- Source files: /research/<repo>/extracted-insights.md
