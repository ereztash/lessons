---
name: monetization-auditor
when:
  - A new /insights/<dim>/<slug>.md file lacks scored monetization-criteria
  - The user runs /lesson-monetize explicitly
  - Phase 3 is active and ≥1 distilled insight exists
  - A playbook candidate in MEMORY.md needs verification before shipping
  - An existing insight's audit needs re-running because new evidence shifted the score
signals:
  - keyword: 'monetize'
  - keyword: 'audit'
  - regex: 'monetization[- ]score'
  - regex: '(reusable|defensible|time[- ]saving|encodable|evidence[- ]anchored)'
  - keyword: 'parking lot'
cascade: dimension-router (passed insights go to the router for cross-dimension placement; failed insights go to the parking-lot section of the originating MOC)
---

# monetization-auditor

The auditor applies the 5-criterion monetization audit to a distilled insight. It scores binary pass/fail on each criterion, computes the total, and either promotes the insight to ship-ready (≥4/5) or routes it to the parking lot (≤3/5). The audit is mechanical; the verdicts are written into the insight's front-matter.

## Procedure

1. Read the candidate /insights/<dim>/<slug>.md.
2. For each of the 5 criteria, score pass or fail using these tests:
   - **Reusable**: Substitute a 6th repo name not in the dataset for the named repos. Does the insight still bind? Pass if yes.
   - **Defensible**: Would a buyer plausibly pay for this rather than find it on the first page of a Google search? Pass if non-obvious, i.e., requires the cross-repo dataset to surface.
   - **Time-saving**: Does the failure-mode-prevented section name a specific failure mode AND estimate ≥1 hour of rework saved per session? Pass if both.
   - **Encodable**: Does the monetization-route name a concrete artifact (skill / command / template / playbook section) and is that artifact actually buildable in this lessons repo? Pass if yes.
   - **Evidence-anchored**: Does evidence-repos in front-matter contain ≥2 repos and do evidence-pointers resolve to real commits/PRs in the source surveys? Pass if both.
3. Sum the passes. Threshold ≥4/5.
4. Write each criterion verdict into the insight front-matter, replacing the 'pending' placeholders.
5. If score ≥4/5: set the insight's status to ship-ready. Cascade to dimension-router. Update MEMORY.md Insights monetized count.
6. If score ≤3/5: append a parking-lot entry to the source MOC with the score breakdown and reason for failure. Do NOT delete the insight file (data is preserved); just mark the front-matter monetization-score and skip dimension-routing.

## Inputs/Outputs

Inputs:
- insight-path (required) — must exist and have unfilled monetization-criteria

Outputs:
- insight front-matter updated with 5 verdicts and total score
- If passed: cascade-trigger for dimension-router; MEMORY count incremented
- If failed: parking-lot row appended to source MOC; LOG.md anti-pattern row optional (if the failure exposes a generalizable distillation flaw)

## Examples

**Example 1 — publish-button-satisfiability passes 5/5**: Reusable (Bolt.new, v0.dev substitutes cleanly). Defensible (the asymmetry between behavioral and demonstrative success conditions is not obvious; nobody on Google teaches it as a repo-birth interview). Time-saving (2-6 hours of CLAUDE.md / docs infrastructure saved per Tier-C repo correctly identified). Encodable (5-minute interview as /lesson-monetize-style command + decision tree template). Evidence-anchored (3 repos cited: core-unified, groundstate, chess-mind via contrastive evidence). Score 5/5 → ship.

**Example 2 — hebrew-bilingual-cognition-medium scores 3/5**: Reusable fails (the insight is HE+EN-specific; substituting English-only does not produce a useful prompt). Time-saving passes (the cor-sys encoding war was 13 commits / ~3 hours). Encodable passes (a bilingual CLAUDE.md template + ascii_only SWC config snippet). Evidence-anchored passes (3 repos). Defensible borderline (a Hebrew-speaking developer would find it valuable; an English-only developer would not). Score 3/5 → parking lot, with reason 'audience too narrow for stand-alone ship; consider bundling into a niche playbook later'.

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Scoring time-saving without a named failure mode and hours estimate | The criterion explicitly requires both. "Saves time" without specifics is a fail. |
| 2 | Scoring defensible based on cleverness instead of buyer-pays test | A clever insight that buyers can Google in 30 seconds is not defensible. The test is the willingness-to-pay, not the elegance of the framing. |
| 3 | Deleting a failed insight | Failed insights stay as data in the parking lot of the source MOC. Future evidence may revive them. |
| 4 | Promoting a 3/5 insight "because the user really likes it" | The threshold is mechanical. If the user wants to ship a 3/5, the gap must be closed first (e.g., gather a 3rd repo's evidence, then re-audit). |
| 5 | Setting evidence-anchored to pass when only one repo's observations are cited | Two-repo evidence is the cross-repo gate from Phase 2; it carries through to the audit. |
