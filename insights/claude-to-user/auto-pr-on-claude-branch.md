---
dimension: claude-to-user
slug: auto-pr-on-claude-branch
evidence-repos: [cor-sys, groundstate-protocol]
evidence-pointers:
  - cor-sys#PR-1..#PR-16; cor-sys@526237f:none (statistical)
  - cor-sys#PR-12
  - cor-sys#PR-14
  - cor-sys#PR-15
  - cor-sys@bb3d459
  - groundstate-protocol branch `claude/landing-page-redesign-i1Mwg` (5 PRs in 5h on Apr 19)
  - groundstate-protocol branch `claude/audit-landing-page-OR0tf` (3 PRs in 2h on May 6)
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
created: 2026-05-12
evidence-resolves-to: mixed
source-observations:  # lessons observations these pointers were resolved from
  - cor-sys@10:03
  - cor-sys@10:07
  - groundstate-protocol@11:06
may-report: yes
may-assert-cause: yes  # confirmed in 4 repos in Round 2
score-history:
  - 2026-05-12: 5/5 — first audit
---

# Auto-PR on `claude/*` Branch

## Observation (Claude layer — 5 lines max)

- cor-sys has 16 PRs; 5 originated from auto-named `claude/<task>-<hash>` branches opened by Claude Code's `/cor-ship` flow.
- 13 of 13 merged PRs were opened by Claude Code and merged by the same single human, 11-second median TTM — the PR is an audit trail, not a review gate.
- groundstate-protocol's PRs #3-#10 all sit on `claude/*` branches functioning as sprint containers.
- The pattern degrades when the same `claude/*` branch is reused across sprints without rebase, producing closed-unmerged PRs (cor-sys had 3 such tombstones on `claude/add-ustt-primitives-wiqLc`).
- The branch naming (`claude/<verb>-<hash>`) is the post-hoc author-attribution signal — visible in `git branch -a` without reading commits.

## Mechanism

Claude Code's auto-named branch + auto-PR flow gives the solo operator a free notarization layer: every change leaves a PR-shaped audit trail on the GitHub UI without the cognitive cost of opening one manually. The PR is not a review gate (one human reviews their own change in 11 seconds) but a *durable, browsable record* that survives session boundaries. Branch reuse breaks this because PR #N+1 is opened against an already-merged HEAD, so it cannot fast-forward and dies as a tombstone.

## Failure mode it prevents

Without auto-PR-on-claude-branch, the operator either (a) pushes directly to master and loses the per-change audit trail or (b) manually opens PRs at ~30 seconds each across hundreds of commits per year. Cumulative cost: 30s × 100 commits/year = 50 minutes/year minimum, plus the cognitive load of deciding when to PR vs push. The branch-reuse failure mode produces 3-5 tombstone PRs per active month, each requiring 1-2 minutes to close. Estimated rework saved: 1-3 hours/year per repo.

## Monetization route

- Skill artifact: `claude-branch-hygiene` — a pre-push hook that refuses to push to a `claude/*` branch with an existing merged PR, forcing a fresh branch name.
- Template: a 5-line `.git/hooks/pre-push` script + a cleanup `git claude-prune` alias that deletes stale `claude/*` branches whose PRs are closed.
- Playbook section addition to the dual-AI-surface or AI-cross-review playbook covering the branch-naming pattern.

## Reusability test

Substitute Cursor's auto-branch flow (`cursor/<hash>`) — the pattern holds identically. Substitute manual PR opening — the audit-trail benefit holds; the cost goes up. The rule "one `claude/*` branch per sprint, never reused" generalizes to any auto-branching AI tool. Pass.
