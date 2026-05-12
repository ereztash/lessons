# LOG — Enforcement Spine

> This file IS the enforcement mechanism. Read every session. Update at /lesson-checkpoint and end of session.

## Environment Facts

| Fact | Value | Last verified |
|------|-------|---------------|
| Target branch | `claude/analyze-workflow-optimization-3NhlH` | 2026-05-12 |
| GitHub access | `mcp__github__*` MCP tools only | 2026-05-12 |
| `gh` CLI | NOT AVAILABLE — use GitHub MCP | 2026-05-12 |
| Repo scope | 5 repos under ereztash (see CLAUDE.md) + CampaignCraft via absorption profile | 2026-05-12 |
| Default language (machine files) | English | 2026-05-12 |
| Default language (user-facing /index, /profile) | HE+EN bilingual | 2026-05-12 |
| Current phase | Phase 4 + gap-closure round complete; all gates closed | 2026-05-12 |
| cor-sys commit count (verified) | 71 commits, matches Phase 1 survey | 2026-05-12 |
| cor-sys PR count (verified) | 16 PRs (13 merged, 3 closed unmerged) | 2026-05-12 |
| cor-sys issues count (verified) | 0 (open + closed combined) | 2026-05-12 |
| Total raw observations gathered (4 repos) | 43 | 2026-05-12 |
| Promoted cross-repo patterns (Phase 2) | 17 (out of 36 matrix rows after gap-closure addition) | 2026-05-12 |
| Skills built (Phase 3) | 5 | 2026-05-12 |
| Commands built (Phase 3) | 6 | 2026-05-12 |
| Insights distilled (Phase 4 + gap-closure) | 11 (5 prior + 6 new) | 2026-05-12 |
| Playbooks shipped (Phase 4 + gap-closure) | 6 + 1 meta-playbook | 2026-05-12 |
| CampaignCraft 5th-repo profile | absorbed-rather-than-shipped (PR#16 inferred); profile at `/research/cor-sys/campaigncraft-absorption-detail.md` | 2026-05-12 |
| Maya self-application test verdict | PASS; system handled hypothetical 6th-repo data without breakage | 2026-05-12 |

## Pre-Research Validation Protocol

Before deep-diving into a repo, verify (≤2 min):

```
1. mcp__github__list_branches(owner, repo) — confirm branch landscape
2. mcp__github__list_commits(owner, repo, perPage=100) — confirm commit count matches expectations
3. mcp__github__list_pull_requests(owner, repo, state='all') — confirm PR count
4. mcp__github__list_issues(owner, repo, state='OPEN'|'CLOSED') — confirm issue presence
```

Mismatch with expectations (Phase 1 exploration data) → re-read original survey before proceeding.

## Pre-Synthesis Validation Protocol (added Phase 2)

Before promoting any pattern to a MOC, verify:

```
1. Pattern appears in ≥2 source extracted-insights.md files
2. Each occurrence is scored ≥2 (moderate) in the patterns-matrix
3. Evidence pointers (cor-sys@<sha> form) resolve to real commits/PRs in the source surveys
4. Dimension classification is single — not multi-dimension claim
5. If the pattern is single-repo, it stays in the candidate section of the MOC, not the promoted section
```

Mismatch → reduce to candidate-tier, do not promote.

## Pre-Monetization-Audit Protocol (added Phase 3)

Before scoring an insight on the 5 criteria, verify:

```
1. Insight has front-matter conforming to /insights/_template.md schema
2. Source MOC pattern is in promoted section (not candidate)
3. Evidence-repos in front-matter contains ≥2 repos
4. Evidence-pointers resolve to repo@HH:MM observations that exist
5. Failure-mode section names a specific failure mode AND hours estimate
```

Mismatch → return insight to distiller for correction; do not audit.

## Pre-Ship Protocol (added Phase 4)

Before writing a playbook, verify:

```
1. Source insight has monetization-score ≥4/5
2. Target buyer is named (a specific segment, not "everyone")
3. Rework-hours-saved estimate is present in the insight
4. The aggregated insights (if multiple) share a coherent buyer
5. Evidence pointers in the playbook trace back to repo@HH:MM observations
```

Mismatch → reject the ship; return to /lesson-monetize for verdict refresh or to /lesson-distill for missing pieces.

## Pre-Gap-Closure Protocol (added gap-closure round)

Before writing a gap-closure artifact, verify:

```
1. The gap is explicitly named in the Phase 4 report's Data Gaps section (or in the gap-closure brief)
2. The closure artifact references the prior phase's evidence (not net-new research without grounding)
3. If the closure invokes a hypothetical case (e.g., Maya self-application test), every observation is explicitly marked HYPOTHETICAL
4. State updates (MEMORY.md, LOG.md, patterns-matrix.md, MOCs) accompany every artifact addition
5. The closure does not silently change any prior verdict; if a verdict is updated, mark it as updated and cite the new evidence
```

Mismatch → reject the closure; clarify scope before writing.

## Anti-Patterns (Rules)

Each anti-pattern is a documented mistake + rule. Append, never edit.

| # | Mistake | Rule |
|---|---------|------|
| 1 | Phase 1 cor-sys deep-dive agent hit rate limit at end of session before returning summary, but had already written all 6 artifacts | Always verify artifacts via `get_file_contents` even if agent returned mid-failure; trust the GitHub state, not the agent's status report. |
| 2 | Phase 2 risk: claiming a pattern as cross-repo when it actually only appears in one repo with different framings in others | Promotion gate is binary: pattern must appear with strength ≥ 2 in ≥ 2 repos. Single-repo phenomena are valid synthesis findings but stay as candidates, not promoted patterns. The promotion column in patterns-matrix.md is the canonical record. |
| 3 | Phase 2 risk: confusing the matrix dimension ("which dimension does this pattern primarily affect?") with the source-observation dimension-guess (the guess on the raw observation) | The matrix row's dimension is the *final* dimension after cross-repo synthesis; the per-observation dimension-guess is provisional. Resolve in the matrix, not the source files. Each promoted pattern belongs to exactly one MOC. |
| 4 | Phase 2 risk: temptation to over-cite the cor-sys observations (12 of 43 = 28% of dataset) and underweight the abandonment-side observations from core-unified (11 of 43 = 26%) | Both ends of the maturity ladder are equally informative. core-unified's abandonment-diagnostics observations are the *negative control* and are required to claim H2 (publish-button satisfiability) at all. Synthesis must cite both ends, not just the cor-sys end. |
| 5 | Phase 3 risk: scaffolding skills as empty stubs that look operational but cannot be invoked | A skill file must have YAML-ish front-matter (name, when, signals, cascade) AND a populated Procedure / Inputs/Outputs / Examples / Anti-patterns section. Scaffolds without examples are non-operational. Each skill must cite ≥1 worked example drawn from the 43 observations. |
| 6 | Phase 4 risk: shipping a playbook with "everyone" as the target buyer | "Everyone" is a non-buyer. Every playbook MUST name a specific segment (e.g., "solo Lovable-builders on month 2+ with at least one abandoned repo"). The pricing rationale relies on the segment's hourly rate; without a segment, the rationale has no anchor. |
| 7 | Phase 4 risk: skipping the evidence section of the playbook because the insight already has evidence pointers | Buyers read the playbook, not the insight. The playbook MUST include the evidence section with commit SHAs / PRs / repo@HH:MM citations. Trust is built in the playbook, not in the upstream insight file. |
| 8 | Phase 4 risk: pricing each playbook in isolation without considering bundle dynamics | The pricing-hypotheses file MUST include at least one bundle proposal when 3+ playbooks ship in the same session. Solo pricing leaves cross-sell revenue on the table; bundle pricing is the operator's distribution-channel hypothesis test. |
| 9 | Gap-closure risk: treating a hypothetical scenario (e.g., Maya self-application test) as if it were real data | A hypothetical is hypothetical. Every observation derived from it MUST be marked `<inferred>` or `(hypothetical)` to prevent it from being cited as real evidence in future synthesis. The Maya walkthrough at `/research/self-application/maya-walkthrough.md` explicitly states this in section 1; future syntheses must NOT cite Maya@<anything> as if it were a real repo. |
| 10 | Gap-closure risk: shipping a meta-playbook (depends-on another playbook) without front-matter declaring the dependency | A meta-playbook like `ai-review-event-instrumentation.md` MUST have `depends-on: <parent-playbook-slug>` in front-matter and a "Meta-playbook context" section in body. Without this, a buyer who buys the meta-playbook without the parent is set up for failure. Bundle-only pricing for meta-playbooks until the parent has ≥50 sales. |

## Codebase Patterns

Reusable templates for outputs. Insert as encountered.

### Insight front-matter (standard)

```markdown
---
dimension: claude-to-user | user-to-claude | claude-to-claude | user-to-user
evidence-repos: [cor-sys, groundstate-protocol]
evidence-pointers:
  - cor-sys@commit-sha:path/to/file
  - groundstate-protocol#PR-12
monetization-score: 4/5  # pass threshold
applicability: solo-builder | small-team | enterprise
---
```

### Patterns-matrix row (standard)

```
| pattern | cor-sys | groundstate | chess-mind | core-unified | strength-score | promoted? | dimension |
|---------|---------|-------------|------------|--------------|----------------|-----------|-----------|
| <name>  | 3       | 2           | 0          | 0            | strong-2-repos | Yes       | user-to-user |
```

### cor-sys evidence pointer convention (now verified)

Format: `cor-sys@<short-sha>:path/to/file` or `cor-sys#PR-N` or `cor-sys#issue-N`. Verified valid across all 12 observations from Phase 1 cor-sys, and now across all 43 observations from Phase 1.

### Phase 2 observation-citation convention (added Phase 2)

When citing a source observation in synthesis.md or a MOC:

- Format: `<repo>@<HH:MM>` referring to the observation's timestamp in its `extracted-insights.md` file
- Example: `cor-sys@10:00` = the 2026-05-12 10:00 observation in `/research/cor-sys/extracted-insights.md`
- Example: `groundstate@11:05` = the 2026-05-12 11:05 observation in `/research/groundstate-protocol/extracted-insights.md`
- This shorthand pairs the cite to the file's heading, allowing fast lookup. Long-form `cor-sys@<sha>:path` is retained when citing the underlying git artifact directly.

### Phase 3 skill front-matter convention (added Phase 3)

```markdown
---
name: <kebab-case>
when:
  - <3-5 trigger conditions, each a bullet>
signals:
  - regex: '<auto-invoke pattern>'
  - keyword: '<auto-invoke keyword>'
cascade: <next skill in the chain, or 'terminal'>
---
```

### Phase 4 playbook structure (added Phase 4)

Every playbook ships with these sections in this order:

1. Title + Tagline
2. Target buyer (named segment, NOT "everyone")
3. Rework hours saved per session (with number)
4. Problem statement (1 paragraph)
5. The playbook (steps, templates, scripts, decision trees)
6. Evidence (commit SHAs, PRs, repo@HH:MM)
7. When to use / When NOT to use
8. Adoption checklist (5-10 items)
9. Cross-references

### Gap-closure meta-playbook structure (added gap-closure round)

A meta-playbook (depends-on another playbook) ships with:

1. Front-matter: `depends-on: <parent-slug>`, `type: meta-playbook`, `status: hypothesis | verified`
2. "Meta-playbook context" section as the first body section, naming the parent
3. Bundle-only pricing in pricing-hypotheses.md until the parent has ≥50 sales
4. The standard Phase 4 playbook structure (target buyer, hours saved, problem, playbook, evidence, when/when-not, adoption checklist, cross-refs)

## Session History

| Date | Phase | Focus | Outcome |
|------|-------|-------|---------|
| 2026-05-12 | Phase 0 | Scaffold | 30 files seeded; cross-references wired; commit `a648ff3` |
| 2026-05-12 | Phase 1 cor-sys | Code+git+PR+issues deep dive | 6 artifacts written (timeline 9.5KB, commit-archaeology 11.9KB, pr-patterns 9.2KB, issues-themes 2.5KB, architecture-notes 12.7KB, extracted-insights 19.4KB); 12 raw observations with evidence pointers; commit `59a6e6f` |
| 2026-05-12 | Phase 1 → next | State update | MEMORY.md and LOG.md updated to reflect cor-sys complete |
| 2026-05-12 | Phase 1 groundstate-protocol | Lovable→Claude pivot + editorial voice + AI-cross-review study | 10 raw observations; identified Lovable-render/Claude-write coexistence pattern; first observed AI-cross-review event (Codex catching P1 race in PR#10) |
| 2026-05-12 | Phase 1 chess-mind-patterns | Bot-blast + 14-day silence + 72-minute resumption study | 10 raw observations; characterized resumption shape (additive, no bot-file deletions, wiring-seam-only); identified prototype-mode signature (zero PRs / issues / docs) |
| 2026-05-12 | Phase 1 core-unified-consciousness | Negative control / publish-and-walk-away abandonment study | 11 raw observations; refuted Hypothesis C (template choice irrelevant); proposed 4-feature Tier classifier; isolated publish-button-satisfiability as the strongest single predictor |
| 2026-05-12 | Phase 2 cross-repo synthesis | patterns-matrix + synthesis narrative + 4 MOCs populated | 35 matrix rows; 17 promoted patterns across 4 dimensions; H1/H2/H4/H5 confirmed, H3 refined; top 5 playbook candidates named for Phase 4; commit `a9fc349` |
| 2026-05-12 | Phase 3 + 4 shipping | 5 skills + 6 commands operational; 5 insights distilled; 5 playbooks shipped; pricing hypotheses; bundle proposals | 5 skills (workflow-archaeologist, insight-distiller, monetization-auditor, dimension-router, cross-repo-comparator); 6 commands (lesson-capture, lesson-distill, lesson-review, lesson-monetize, lesson-cross-check, lesson-ship); 5 insights (all 5/5 audit); 5 playbooks (publish-button-intent-triage, four-feature-tier-classifier, dual-ai-surface-workflow, ai-cross-review-setup, resumer-day-prep); 2 bundle proposals (Lovable Resumption Trilogy $99, Multi-AI Workflow Pack $129); 4 new anti-patterns added (#5, #6, #7, #8); all 5 phase gates closed. |
| 2026-05-12 | Gap-closure round | Close 8 gaps from Phase 4 report | GAP 1: editorial-commit-voice-escalation playbook + insight + pricing row (5/5 audit). GAP 2: 8 additional distilled insights shipped (6 new, 2 consolidated); 4 promoted patterns parked/consolidated. GAP 3: Maya hypothetical 6th-repo self-application test PASS. GAP 4: CampaignCraft mini-profile + absorbed-rather-than-shipped patterns-matrix row. GAP 5: ai-review-event-instrumentation meta-playbook (bundle-only). GAP 6: launch-checklist.md (pre-launch + week 1-4 + metric instrumentation). GAP 7: README polish (Featured Playbooks + How-to-buy + Latest update). GAP 8: MEMORY/LOG/matrix/MOCs state updates. 2 new anti-patterns (#9 hypothetical-as-real, #10 meta-playbook front-matter). All 6 gates remain green. |
