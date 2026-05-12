# Command — /lesson-ship

> Promote one or more passed insights into a productized playbook.

## Usage

```
/lesson-ship <playbook-name>
```

Follow-up: Claude prompts for which insights to aggregate if not specified.

## Prerequisites

- Phase 4 active (MEMORY.md confirms)
- ≥1 insight in any `/insights/<dim>/` folder with `monetization-score ≥ 4`
- Target buyer named
- Rework hours saved estimated

## What it does

1. Verifies prerequisites (halts if missing).
2. Reads selected insights' front-matter and bodies.
3. Creates `/products/playbooks/<playbook-name>.md` with:
   - Title + tagline
   - Target buyer (named)
   - Rework hours saved per session
   - Problem statement (1 paragraph)
   - The playbook itself (steps, templates, scripts)
   - Evidence section (commit SHAs / PRs / files)
   - When to use, when NOT to use
   - Adoption checklist
4. Appends a pricing hypothesis to `/products/pricing-hypotheses.md`:
   - Suggested price range (USD)
   - Pricing rationale (hours saved × hourly rate × confidence)
   - Distribution channel hypothesis
5. Updates `/index/MOC-MONETIZATION.md` with a row pointing to the new playbook.
6. Updates `MEMORY.md` playbooks-shipped count.

## Anti-patterns

- Shipping a single-insight playbook → playbooks aggregate; if only 1 insight, leave as `/insights/<dim>/<slug>.md` and surface in MOC
- Shipping without a named target buyer → reject; "everyone" is not a buyer
- Skipping pricing-hypothesis update → reject; pricing is part of shipping

## Cross-references

- Pipeline: `/pipelines/monetization-audit.md` (insights must have passed)
- Output: `/products/playbooks/`, `/products/pricing-hypotheses.md`
