# Command — /lesson-ship

> Promote one or more passed insights into a productized playbook with a named buyer, hours-saved estimate, and pricing hypothesis.

## Usage

```
/lesson-ship <playbook-name> [--insights=<slug1>,<slug2>,...]
```

If --insights not supplied, Claude prompts for which to aggregate.

## What it does

1. Verifies prerequisites (halts if missing):
   - Phase 4 active (per MEMORY.md)
   - ≥1 insight in /insights/<dim>/ with monetization-score ≥4
   - Target buyer name supplied or inferable
   - Rework hours saved estimated
2. Reads selected insights' front-matter and bodies.
3. Creates /products/playbooks/<playbook-name>.md with these sections:
   - Title + tagline
   - Target buyer (named segment, NOT "everyone")
   - Rework hours saved per session (number)
   - Problem statement (1 paragraph)
   - The playbook itself (steps, templates, scripts, decision trees)
   - Evidence section (commit SHAs / PRs / files / repo@HH:MM citations)
   - When to use, when NOT to use
   - Adoption checklist (5-10 items)
4. Appends a row to /products/pricing-hypotheses.md:
   - Path
   - Target buyer
   - Rework hours saved
   - Suggested price range (USD)
   - Pricing rationale (hours × $/hr × confidence multiplier)
   - Distribution channel hypothesis
   - Confidence level
   - Date shipped
5. Updates the source MOC's Related-playbooks section with a forward-link.
6. Updates MEMORY.md playbooks-shipped count.
7. Updates LOG.md Session History row.

## Prerequisites

- Phase 4 active
- Source insights have monetization-score ≥4
- Named target buyer (no "everyone")
- Hours-saved estimate present

## Output

- /products/playbooks/<name>.md
- /products/pricing-hypotheses.md row appended
- Source MOC updated
- MEMORY.md + LOG.md updated

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Shipping without a named target buyer | "Everyone" is not a buyer. Reject. Name a segment (e.g., "solo Lovable-builders on repo #2+"). |
| 2 | Shipping a single-insight playbook when the insight has not passed audit | The audit gate (≥4/5) is the floor for shipping. Skipping it produces unmonetizable playbooks. |
| 3 | Skipping the pricing-hypotheses update | Pricing is part of shipping. A playbook without a price is incomplete; it has no monetization route. |
| 4 | Shipping a playbook without an evidence section | Buyers need to trust the artifact. Evidence pointers (commit SHAs, PRs) are the trust. |
| 5 | Aggregating insights from unrelated dimensions into one playbook | One playbook = one coherent narrative. If two insights don't share a buyer, they belong in two playbooks. |

## Cross-references

- Pipeline: /pipelines/monetization-audit.md (insights must have passed)
- Output: /products/playbooks/, /products/pricing-hypotheses.md
- Predecessor command: /lesson-monetize
- State files: MEMORY.md, LOG.md, source MOC
