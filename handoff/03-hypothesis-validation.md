# Prompt 03 — Hypothesis Validation at n=26

> Paste this AFTER Prompt 02 completed and `research/portfolio-scan/26-repos.md` exists.

---

Validate all 5 hypotheses from the previous session's Phase 2 synthesis against the n=26 dataset. The previous verdicts were based on n=4. n=26 is statistically much stronger — some verdicts may need revision.

## Inputs (read fully)

- `research/portfolio-scan/26-repos.md` (just written by Prompt 02)
- `research/cross-repo/synthesis.md` (the original H1-H5 framing + verdicts)
- `research/cross-repo/patterns-matrix.md` (35 patterns, 17 promoted)
- `MEMORY.md` (current state)

## The 5 hypotheses to test

Quote the original H1-H5 from synthesis.md, then test each against n=26:

### H1 — Four-Feature Tier Classifier is monotonic to survival
Original verdict (n=4): CONFIRMED with refinement (lower bound on system-mode).

At n=26:
- Does the classifier produce monotonic Tier → health relationship?
- Are there counter-examples (e.g., Tier B repos with no signs of life, or Tier A repos that died)?
- Should any of the 4 features be replaced or supplemented?
- Specific check: is `commercial-dep-signature` (Stripe / OAuth / Resend) a candidate 5th feature, as the gap-closure pass suggested?

### H2 — Publish-Button Satisfiability predicts abandonment
Original verdict (n=4): CONFIRMED (strongest single predictor).

At n=26:
- Across the 21 new repos, how many score ≥50 on Publish-Button Satisfiability?
- Of those, what % are inactive (>30 days no commits)?
- Of repos scoring <50, what % are inactive?
- Compute the predictive correlation. Is it strong, moderate, or noise-level?

### H3 — LOG.md / habit-as-enforcement causes outcomes (not the file format)
Original verdict (n=4): REFINED (habit, not format).

At n=26:
- How many repos have CLAUDE.md? LOG.md? MEMORY.md? docs/?
- Of repos with documentation, what's their average tier?
- Of repos without, what's their average tier?
- Is the correlation strong enough to act on?

### H4 — AI tool diversity predicts maturity (monotonic with tier)
Original verdict (n=4): CONFIRMED.

At n=26:
- Average number of distinct AI tools detected per tier (A/B/C/D)
- Is the relationship monotonic? Strictly increasing?
- Any counter-examples (single-AI Tier A or multi-AI Tier C)?

### H5 — Editorial voice escalation predicts health (directional, usable after 5-10 commits)
Original verdict (n=4): CONFIRMED.

At n=26:
- For repos with ≥10 commits, compute editorial-voice metrics (commit message length, research-citation presence, conventional-prefix usage rate)
- Bucket by tier. Compute averages.
- Test directionality: do Tier A repos show monotonic improvement in voice over time? Do Tier C/D show flatlines or noise?

## Additional task: pattern matrix update

For each of the 17 PROMOTED patterns in `patterns-matrix.md`:
- Count how many of the 26 repos exhibit the pattern
- Compute support rate (% of relevant repos showing it)
- Promote if <30% → candidate for DEMOTION
- Promote if not-yet-promoted patterns show ≥40% support → candidate for PROMOTION

Add a new column to `patterns-matrix.md`: `n=26 support` (0-100% or `not-applicable`).

## Output

Write ONE comprehensive document: `research/portfolio-scan/hypothesis-validation.md`.

Schema:
```markdown
# Hypothesis Validation at n=26

_Validation date: YYYY-MM-DD_
_Dataset: 26 repos (4 deep-dived + 1 absorbed + 21 newly-scanned)_

## Executive verdict

| # | Hypothesis | n=4 verdict | n=26 verdict | Action |
|---|------------|-------------|--------------|--------|
| H1 | Four-Feature Tier Classifier monotonic | CONFIRMED (refined) | <new verdict> | <action> |
| H2 | Publish-Button → abandonment | CONFIRMED | <new> | <action> |
| H3 | Habit causes outcomes | REFINED | <new> | <action> |
| H4 | AI tool diversity → maturity | CONFIRMED | <new> | <action> |
| H5 | Editorial voice → health | CONFIRMED | <new> | <action> |

**Surprise finding (if any)**: <1-paragraph callout>

## H1 detailed analysis
[1500-2000 words: data, edge cases, refinement, action]

## H2 detailed analysis
[1500-2000 words]

[...continued for H3-H5]

## Pattern matrix updates

### Patterns promoted (≥40% support at n=26)
[list with evidence]

### Patterns demoted (<30% support)
[list with reasoning]

### Patterns confirmed (steady-state)
[list]

## Implications for the SaaS thesis

[3-5 paragraphs:]
- If H1 holds: the classifier IS the product, conviction stays high
- If H1 partially holds: refine before launch, conviction adjusts
- If H1 refuted: pivot needed — what's the replacement signal?
- Per-pricing impact: do hours-saved estimates hold at n=26?
- Per-positioning impact: any messaging that no longer matches the data?

## Methodology limitations

- Selection bias: ereztash's 26 are not representative of all solo-builder portfolios; cite cohort size of the broader AI-builder population
- Within-portfolio correlation: ereztash's personal tendencies (e.g., always using certain AI tools) inflate cross-repo signal
- Time-window: scan reflects HEAD only; longitudinal patterns not captured
- Private repos: any access gaps noted in Prompt 02 carry forward
```

## Also update

- `research/cross-repo/patterns-matrix.md` — add `n=26 support` column to every row, mark promotions/demotions
- `MEMORY.md` — append section "n=26 validation outcomes" with 3-5 bullet headlines
- `LOG.md` — append session row + any new anti-patterns discovered during validation

## Delivery

Single `mcp__github__push_files` call. Retry up to 4 times with exponential backoff.

Report in chat <500 words:
- Commit SHA
- The 5 verdicts (CONFIRMED / REFINED / REFUTED, one per H)
- The single biggest surprise from the data
- Whether the SaaS thesis survives or needs pivoting
- 2-3 messaging changes for the product spec (Prompt 04)

## Quality bar

- Be brutally honest. If H1 doesn't hold, say so. If the data is mixed, say MIXED, not CONFIRMED.
- Use NUMBERS, not adjectives. "68% of Tier A repos have all 4 features" beats "most Tier A repos look healthy."
- Cite specific repos when illustrating edge cases.
- Avoid "the data is preliminary" hedging if it's actually clear; reserve hedging for genuinely unclear findings.

End of Prompt 03.
