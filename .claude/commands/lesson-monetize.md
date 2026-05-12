# Command — /lesson-monetize

> Run the 5-criterion monetization audit on a distilled insight and write the verdict into its front-matter.

## Usage

```
/lesson-monetize <insight-path>
```

## What it does

1. Reads the target /insights/<dim>/<slug>.md.
2. Confirms front-matter has unfilled monetization-criteria (all 'pending').
3. Applies each of the 5 binary tests:
   - **Reusable**: substitute a 6th repo name not in the dataset — does the insight still bind?
   - **Defensible**: would the buyer pay rather than Google it?
   - **Time-saving**: ≥1 hour rework saved per session with named failure mode?
   - **Encodable**: artifact named (skill / command / template / playbook section) and buildable?
   - **Evidence-anchored**: ≥2 repos in evidence-repos AND pointers resolve?
4. Computes total. Threshold ≥4/5.
5. Writes verdicts and total into the insight front-matter (replacing 'pending').
6. If ≥4/5: cascades to dimension-router; updates MEMORY.md insights-monetized count.
7. If ≤3/5: appends a parking-lot row to the source MOC with score breakdown and reason; insight file is preserved (not deleted).

## Prerequisites

- /insights/<dim>/<slug>.md exists
- Front-matter has unfilled monetization-criteria
- Source MOC accessible (for the parking-lot path on fail)

## Output

- Insight front-matter updated with 5 verdicts and total score
- MEMORY.md insights-monetized count incremented on pass
- MOC parking-lot row appended on fail
- Cascade-trigger for dimension-router on pass

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Scoring time-saving without a named failure mode and hours | Both are required. "Saves time" without specifics fails the criterion. |
| 2 | Scoring defensible based on cleverness | The test is willingness-to-pay. A clever insight that's Googleable fails. |
| 3 | Deleting a failed insight | Failed insights stay in the parking lot. Future evidence may revive them. |
| 4 | Promoting a 3/5 "because the user really likes it" | Threshold is mechanical. Close the gap (more evidence, sharper failure mode) and re-audit; do not relax the threshold. |
| 5 | Skipping the cascade to dimension-router on pass | An audited-but-unrouted insight is functionally invisible. Cascade must fire. |

## Cross-references

- Skill that does the audit: monetization-auditor
- Pipeline: /pipelines/monetization-audit.md
- Threshold rationale: documented in MEMORY.md Phase 3 plan
- Follow-up command: /lesson-ship (only after pass + routing)
