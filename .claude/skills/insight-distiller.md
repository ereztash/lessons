---
name: insight-distiller
when:
  - A MOC (/index/MOC-*.md) has at least one promoted pattern that has not yet been distilled to /insights/<dim>/<slug>.md
  - Phase 3 is active in MEMORY.md
  - The user runs /lesson-distill explicitly
  - A cross-repo pattern has just been promoted in patterns-matrix.md and a polished insight file is needed before Phase 4
  - A playbook candidate from MEMORY.md Top Playbook Candidates needs its supporting insight written
signals:
  - keyword: 'distill'
  - regex: '/insights/(claude-to-user|user-to-claude|claude-to-claude|user-to-user)/'
  - keyword: '_template.md'
  - regex: 'monetization[- ]score'
  - keyword: 'MOC-'
cascade: monetization-auditor (every distilled insight must pass audit before shipping)
---

# insight-distiller

The distiller consumes a MOC entry (already-promoted pattern with ≥2-repo evidence) and writes a polished /insights/<dim>/<slug>.md file using the schema in /insights/_template.md. It does NOT decide monetization — it produces the artifact the auditor scores.

## Procedure

1. Read /insights/_template.md to lock in the front-matter schema. The schema is canonical; do not invent fields.
2. Read the source MOC (one of /index/MOC-CLAUDE-TO-USER.md, MOC-USER-TO-CLAUDE.md, MOC-CLAUDE-TO-CLAUDE.md, MOC-USER-TO-USER.md) to extract the promoted-pattern entry: description, source-observation pointers, monetization-fit note.
3. Cross-check the patterns-matrix.md row for the same pattern to harvest strength scores and evidence-repos list.
4. Build front-matter:
   - dimension (single, matches the MOC)
   - slug (kebab-case, ≤6 words)
   - evidence-repos (list, from patterns-matrix row)
   - evidence-pointers (3-5, each repo@HH:MM or repo#PR-N form)
   - monetization-criteria: leave each as 'pending' (the auditor fills these)
   - applicability (solo-builder default for this dataset)
   - created date
5. Write the body:
   - Observation (5 lines max, dense bullets, Claude-layer summary; the playbook is the Human-layer narrative)
   - Mechanism (2-3 sentences causal chain)
   - Failure mode it prevents (with a specific hours-of-rework estimate drawn from the source observations)
   - Monetization route (name the artifact: skill X, command Y, template Z, or playbook section)
   - Reusability test (substitute a non-dataset repo name; does the insight still bind?)
6. Save under /insights/<dim>/<slug>.md.
7. Update the source MOC's "Related playbooks" section with a forward-reference.
8. Cascade to monetization-auditor.

## Inputs/Outputs

Inputs:
- moc-path (required) — one of the four MOC files
- pattern-slug (required) — must appear as a promoted entry in that MOC

Outputs:
- /insights/<dim>/<slug>.md (≤120 lines)
- MOC cross-reference updated
- Cascade-trigger for the auditor

## Examples

**Example 1 — distilling publish-button-as-success-condition**: From MOC-USER-TO-USER.md, the entry cites core-unified@12:00, core-unified@12:07, and groundstate@11:00. The slug is `publish-button-satisfiability`. Observation: Lovable's Publish button can fully satisfy demonstrative success conditions, locking some users at Tier C permanently. Mechanism: the platform's exit affordance matches the user's intent, so no friction drives them off-platform. Failure mode: 2-6 hours wasted on infrastructure for a repo whose owner has already finished. Monetization route: 5-minute intent-triage interview as command + template. Reusability: substitute Bolt.new or v0.dev for Lovable; the insight binds.

**Example 2 — distilling editorial-commit-voice-escalation**: From MOC-CLAUDE-TO-USER.md, entry cites groundstate@11:02 (12-phase escalation with 11 cited sources), cor-sys@10:06 (anti-pattern-numbered bodies), chess-mind@11:05 (one-step jump). Slug is `editorial-commit-voice-escalation`. The five-line observation captures the one-way ratchet — once research-citation enters, no commit drops back. Mechanism: commit subject is the operator's public commitment; specificity is the cheapest commitment device.

## Anti-patterns

| # | Mistake | Rule |
|---|---------|------|
| 1 | Distilling a single-repo pattern from the candidate section of a MOC | Only the promoted section is distillable. Candidate patterns are data, not insights. |
| 2 | Inventing front-matter fields not in /insights/_template.md | The template schema is canonical; the auditor parses front-matter mechanically. Custom fields break the audit. |
| 3 | Setting monetization-criteria values during distillation | The distiller produces; the auditor scores. Bleeding the audit into distillation removes the check. |
| 4 | Writing the full Human-layer narrative inside /insights/<dim>/<slug>.md | The insight file is the 5-line Claude-layer summary. The Human-layer narrative belongs in /products/playbooks/<name>.md if and when the insight ships. |
| 5 | Forgetting to update the source MOC's Related-playbooks section | MOCs are the index; broken back-references defeat the navigation. |
