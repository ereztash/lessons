---
name: cross-repo-comparator
when:
  - patterns-matrix.md needs to be regenerated or extended after a new repo's observations land in /research/<repo>/extracted-insights.md
  - The user proposes a sixth repo (outside the original 4) and wants to verify the 17 promoted patterns still hold
  - A new playbook needs evidence-spread verification (does this pattern hold in the new repo too?)
  - An apparent regression — a previously-promoted pattern fails to appear in a new repo — needs adjudication
  - The user explicitly runs /lesson-cross-check
signals:
  - keyword: 'cross-repo'
  - keyword: 'patterns-matrix'
  - regex: 'compare (across|between) (repos|repositories)'
  - keyword: 'sixth repo'
  - keyword: 'delta diff'
cascade: (terminal — emits a delta report; the user decides whether to update MOCs / playbooks based on the report)
---

# cross-repo-comparator

The comparator consumes the existing patterns-matrix.md and ≥1 new repo's extracted-insights.md, then emits a delta report: which patterns gained evidence, which patterns failed to replicate in the new repo, which new candidate patterns surfaced. It is the verification layer that keeps the 17-promoted-pattern claim honest.

## Procedure

1. Read /research/cross-repo/patterns-matrix.md to load the existing 35 rows (17 promoted, 18 candidate).
2. Read /research/<new-repo>/extracted-insights.md (the new repo's observations).
3. For each existing pattern row, score the new repo's strength (0/1/2/3) by scanning the new repo's observations for evidence:
   - 0 absent → pattern did not replicate in this repo
   - 1 weak → faint trace, one occurrence
   - 2 moderate → multiple occurrences, load-bearing
   - 3 strong → defining feature of the repo at HEAD
4. For each new repo observation that does NOT map to an existing pattern, propose it as a new candidate row.
5. Apply the promotion rule: promoted iff strength ≥2 in ≥2 repos. With the new repo added, some candidate rows may flip to promoted (insufficient → sufficient evidence); some promoted rows may stay promoted but gain a third repo of evidence (strength upgrade).
6. Write the delta as /research/cross-repo/deltas/<YYYY-MM-DD>-<new-repo>.md with sections:
   - Patterns that gained evidence in new repo
   - Patterns that failed to replicate in new repo
   - New candidate patterns surfaced
   - Recommended matrix updates (the new strength column to append)
   - Promotion threshold crossings (candidate → promoted, or stays candidate)
7. Do NOT modify patterns-matrix.md directly. The delta is a proposal; the user runs /lesson-cross-check to commit it.

## Inputs/Outputs

Inputs:
- new-repo-path (required) — /research/<new-repo>/extracted-insights.md must exist

Outputs:
- /research/cross-repo/deltas/<date>-<repo>.md (the delta report)
- No matrix mutations until /lesson-cross-check is run

## Examples

**Example 1 — adding a 5th Lovable repo with one external dep + zero PRs**: The new repo's extracted-insights.md contains 9 observations. Comparator finds: publish-button-as-success-condition gets a third repo's evidence (strength 3), four-feature-tier-classifier-monotonic gets confirming evidence at Tier B (one non-template dep, zero PRs), but lovable-render-claude-write-coexistence FAILS to replicate (no Claude commits). Delta report flags the third repo for the publish-button pattern as a strength upgrade and notes the coexistence pattern remains at 2 repos.

**Example 2 — adding a non-Lovable repo (Bolt.new or hand-bootstrapped)**: Comparator finds: third-party-saas-replaces-backend replicates strongly (3); claude-coauthored-trailer-convention replicates moderately (2); but readme-placeholder-survives-to-head fails to replicate (no Lovable template). The delta report observes that 3-4 patterns are Lovable-template-specific; the remaining patterns generalize to other bootstrapping platforms.

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Modifying patterns-matrix.md inside the comparator | The comparator is read-only on the matrix. Edits happen via /lesson-cross-check after the delta is reviewed. |
| 2 | Scoring a pattern as 3-strong on the new repo without naming the specific evidence | Each non-zero strength score MUST cite ≥1 observation timestamp (repo@HH:MM). Unsupported scores compound errors. |
| 3 | Refusing to admit failed replication | A promoted pattern that fails to replicate in a sixth repo is a finding, not a problem. Document the failure; it sharpens the promotion criterion. |
| 4 | Treating the new repo's absent observations as confirming absence | If the new repo's extracted-insights.md doesn't mention pattern X, that's not evidence X is absent — the surveyor may simply not have looked. Confirm absence with explicit "checked, not present" notes before scoring 0. |
| 5 | Letting the delta sit unmerged after the user accepts it | Once /lesson-cross-check commits the delta, MEMORY.md and the matrix must update in the same commit. Stale deltas mislead the next agent. |
