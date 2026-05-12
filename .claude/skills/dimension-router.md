---
name: dimension-router
when:
  - A monetization-auditor verdict comes back ≥4/5 and the insight needs final placement under the correct /insights/<dim>/ folder
  - An insight's dimension was wrong (post-audit reclassification because the mechanism turned out to be in a different layer)
  - A cross-cutting insight needs to be cross-referenced into 2+ MOCs (the canonical home is one MOC; the other MOCs get back-references)
  - The user explicitly runs /lesson-cross-check after a batch of distillation
  - A MOC's Related-playbooks section needs to be populated after a /lesson-ship
signals:
  - keyword: 'dimension'
  - keyword: 'cross-cutting'
  - regex: 'MOC-(CLAUDE|USER)-TO-(CLAUDE|USER)'
  - keyword: 'router'
  - keyword: 'route insight'
cascade: cross-repo-comparator (final step before ship is a sanity check that the insight does not contradict any other insight across the four dimensions)
---

# dimension-router

The router places a passed insight into its canonical /insights/<dim>/ folder, updates the source MOC, and identifies any cross-dimension references needed. The router enforces single-dimension-canonical-home; cross-references are explicit, not duplicative.

## Procedure

1. Read the audited insight's front-matter. Confirm monetization-score ≥4/5 and dimension is set.
2. Confirm the file lives at /insights/<dim>/<slug>.md matching the front-matter dimension. If not, move it (write-new, delete-old).
3. Scan the insight body for mechanism crossings:
   - If mechanism references how Claude communicates → claude-to-user candidate cross-ref
   - If mechanism references how the user prompts → user-to-claude candidate cross-ref
   - If mechanism references Claude's self-work → claude-to-claude candidate cross-ref
   - If mechanism references the user's self-work or productization → user-to-user candidate cross-ref
4. For each candidate cross-ref that is NOT the canonical home, append a one-line cross-reference to that MOC's Cross-references section pointing to the canonical insight location.
5. Update the canonical MOC's Promoted-patterns section: ensure the insight's slug appears with a forward-link to /insights/<dim>/<slug>.md and a back-link from the insight to the MOC.
6. Cascade to cross-repo-comparator for consistency check.

## Inputs/Outputs

Inputs:
- insight-path (required) — must be ship-ready (score ≥4/5)

Outputs:
- Insight located at canonical /insights/<dim>/<slug>.md
- Cross-references in non-canonical MOCs
- Forward + back links in canonical MOC

## Examples

**Example 1 — routing four-feature-tier-classifier**: Canonical dimension is user-to-user (the operator's portfolio-triage decision). But the classifier itself is encoded as a Claude-readable artifact (CLI / GitHub Action), so claude-to-claude gets a cross-reference. The home is /insights/user-to-user/tier-classifier-cli.md; MOC-CLAUDE-TO-CLAUDE.md Cross-references section adds a line: "See also: /insights/user-to-user/tier-classifier-cli.md — the four-feature classifier consumes git artifacts authored by Claude."

**Example 2 — routing dual-ai-surface-workflow**: Canonical dimension is user-to-user (the operator's workflow choice to use Lovable for render and Claude for write). But the mechanism is observable only as commit-author alternation, so claude-to-claude gets a cross-ref noting the observable signature.

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Duplicating the insight body across multiple /insights/<dim>/ folders | Single canonical home. Cross-references are one-line pointers, never full duplicates. Duplication causes drift. |
| 2 | Cross-referencing an insight from all four MOCs because "it touches everything" | If an insight touches all four dimensions, it is probably a meta-pattern not a pattern. Re-examine whether it should be promoted at all, or split into 4 dimension-specific insights. |
| 3 | Routing without confirming monetization-score ≥4/5 | The router is post-audit. Routing a failed insight pollutes the canonical insights folder. |
| 4 | Renaming the slug during routing | The slug is set at distillation. Renaming breaks evidence-pointer traceability. If the dimension is wrong, move the file, do not rename. |
| 5 | Skipping the MOC update | MOCs are the index; an insight that lives at /insights/<dim>/<slug>.md but isn't linked from the MOC is functionally invisible. |
