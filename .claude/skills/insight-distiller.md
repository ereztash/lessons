# Skill — insight-distiller

> Convert raw observations into monetizable rules.

## When to invoke

- `extracted-insights.md` has ≥2 observations in the same theme
- User asks "distill", "extract the lesson", "what's the rule here"
- Phase 3 (distillation pass after Phase 1+2 complete)

## Signals

- "distill"
- "extract insight"
- "rule"
- "what's the lesson"
- "pattern from these observations"

## Cascade

- Draft insight produced → auto-trigger `monetization-auditor` for gate check.

## Procedure

1. Read input: 1 theme + ≥2 raw observations from `extracted-insights.md`.
2. State the **mechanism** in ≤3 sentences. "When X happens, Y emerges because Z."
3. Name the **failure mode** the insight prevents. Estimate hours of rework saved.
4. Name the **encoded artifact** (skill / command / template / hook).
5. Write to `/insights/<dimension>/<slug>.md` using the format in `/insights/_template.md`.
6. Fill front-matter, including evidence-pointers from the raw observations.
7. Hand off to `monetization-auditor` (auto-cascade).

## Output schema

See `/insights/_template.md`. Required front-matter:
- `dimension`
- `slug`
- `evidence-repos` (≥2 distinct)
- `evidence-pointers` (≥2)
- `monetization-criteria` (all 5 fields, even if uncertain)
- `monetization-score` (filled by auditor)
- `applicability`

## Anti-patterns

- Distilling from 1 observation → forces overgeneralization
- Skipping mechanism → produces descriptive, non-actionable insights
- Vague failure mode ("saves time") → fails Q3 of monetization audit
