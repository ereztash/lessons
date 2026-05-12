# MOC — Claude → User

> Map of Content: every promoted insight about how Claude communicates, delivers, and paces work for the user.

**Dimension definition**: The Claude side of the loop. How Claude:
- Communicates progress and uncertainty
- Paces output (frequency, length, tone)
- Surfaces blockers and trade-offs
- Hands work back at session boundaries
- Adapts to user preferences (Hebrew/English, brevity, format)

In this dataset, the Claude→user surface is dominated by *what Claude leaves behind in commits and PRs*. The operator reads commit subjects, commit bodies, and PR bodies as the primary status surface; chat history is ephemeral. This dimension therefore captures the editorial discipline of Claude's commit-authoring behaviour and the PR-body shapes that act as decision checkpoints.

## Patterns in this dimension

### editorial-commit-voice-escalation
**Source observations**: groundstate-protocol@11:02 (12-phase escalation, 11 cited sources by `af24284`); cor-sys@10:06 (anti-pattern-numbered commit bodies during stabilization); chess-mind-patterns@11:05 (one-step jump from `Add X` to `feat: ...` with file-by-file annotation)
**Description**: When Claude is the named author, commit subjects and bodies escalate monotonically in editorial precision — from `Changes` to `Implement feature` to `Tune copy with behavioral research (Dai/Milkman/Riis 2014; ...)`. Once research-citation enters a commit body, no subsequent commit drops back to a less-cited register. The escalation is a one-way ratchet that drives quality. The signal is observable after 5-10 commits in the editorial register and serves as a health check for sustained projects.
**Monetization fit**: pass — operators of LLM-paired repos benefit from an explicit editorial-voice rubric; productizable as a `claude-commit-voice-audit` skill that scores a repo's commit subject specificity over time.
**Distilled insight**: `/insights/claude-to-user/editorial-commit-voice-escalation.md`
**Related playbook**: `/products/playbooks/editorial-commit-voice-escalation.md`

### auto-pr-on-claude-branch
**Source observations**: cor-sys@10:03 (16 PRs, 11-second median TTM, all opened by Claude Code on `claude/*` branches); cor-sys@10:07 (3 PRs auto-opened against stale branch, closed unmerged); groundstate-protocol@11:06 (PRs #3-#10 all on `claude/*` branches as sprint containers)
**Description**: Claude Code's `/cor-ship`-style flow opens a PR automatically after pushing to a `claude/*` feature branch. In single-operator AI-augmented repos, every PR is opened by Claude and merged by the same single human, with median TTM of 11 seconds (cor-sys) to 50 minutes (groundstate's PR#10). The PRs are not gates for asynchronous review — they are decision-checkpoint artifacts visible on the GitHub UI, which is the operator's status surface. The pattern degrades when the same branch is reused across sprints without rebase, producing closed-unmerged tombstone PRs.
**Monetization fit**: pass — actionable as a "PR-or-direct-push" decision template for solo AI-paired developers, with a follow-up cleanup pattern for stale claude/* branches.
**Distilled insight**: `/insights/claude-to-user/auto-pr-on-claude-branch.md`

### pr-body-verbosity-correlates-with-ttm
**Source observations**: cor-sys@10:03 (median 11s, max 4m3s for PR#10 with full Cursor architecture diagram); groundstate-protocol@11:04 (PR#9 = 39m30s, PR#10 = 50m13s, both carrying Hebrew RTL templates with `## בדיקות` checklists vs 9-second median for short bodies)
**Description**: PRs with rich Markdown bodies (architecture diagrams, research-findings tables, checked `## בדיקות` boxes, `## דגלים` placeholder flags) have time-to-merge orders of magnitude longer than PRs with empty or one-line bodies. The relationship is causal — the body verbosity reflects the *architectural risk the operator is acknowledging*, and longer TTM reflects the actual time spent reading the body before merging. Empty-body PRs are notarization-only; rich-body PRs are actual review events.
**Monetization fit**: pass — directly portable as a "PR body as risk weight" guideline; the operator can set a self-rule that any PR with body length over N words must be re-read before merge.
**Distilled insight**: `/insights/claude-to-user/pr-body-verbosity-correlates-with-ttm.md`

## Candidate raw observations (single-repo, not promoted)

- pr-template-encodes-style-guide (groundstate@11:04 only — forbidden-word checklist in Hebrew RTL PR template)
- subject-noise-rate-elevated-in-abandoned (core-unified@12:08 only — 34.5% generic subjects in abandoned repo)

## Related playbooks

- `/products/playbooks/editorial-commit-voice-escalation.md` — shipped 2026-05-12 in gap-closure round

## Cross-references

- Companion matrix: `/research/cross-repo/patterns-matrix.md`
- Narrative: `/research/cross-repo/synthesis.md` § 3, § 9
- Source observations:
  - `/research/cor-sys/extracted-insights.md`
  - `/research/groundstate-protocol/extracted-insights.md`
  - `/research/chess-mind-patterns/extracted-insights.md`
- Schema: `/insights/_template.md`
- Pipeline: `/pipelines/insight-extraction.md`
- Skill: `/.claude/skills/insight-distiller.md`
