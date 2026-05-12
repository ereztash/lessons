---
dimension: claude-to-user
slug: pr-body-verbosity-correlates-with-ttm
evidence-repos: [cor-sys, groundstate-protocol]
evidence-pointers:
  - cor-sys@10:03
  - groundstate-protocol@11:04
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
created: 2026-05-12
---

# PR Body Verbosity Correlates with Time-to-Merge

## Observation (Claude layer — 5 lines max)

- cor-sys: 11-second median TTM across 13 merged PRs; the only two PRs >60s TTM (#10 = 4m3s, #16 = 1m14s) are also the two longest bodies (~2.6 KB Cursor architecture diagram; ~1.4 KB Claude CampaignCraft body).
- groundstate-protocol: PR #9 = 39m30s TTM, PR #10 = 50m13s TTM — both with Hebrew RTL templates carrying `## בדיקות` checklists, `## דגלים` placeholder-flag sections, and 7-finding research bodies.
- Short-body PRs across both repos merge in <15 seconds; rich-body PRs trigger an actual read pass before merge.
- The relationship is causal: body verbosity reflects the operator's acknowledged architectural risk, and TTM reflects the actual time spent reading.
- Operators can therefore self-impose a rule: any PR body >N words must be re-read before merge.

## Mechanism

In a single-operator repo, the PR is opened-by-Claude-merged-by-human. Claude's body length is a *risk telegraph* — long body = Claude flagged something the operator should read; short body = Claude's confidence is high. Human TTM responds to the telegraph. This is an emergent self-coordination signal, not an explicit rule. Long-body PRs that get instant-merged are a near-miss; the operator failed to honor Claude's risk flag. Short-body PRs that take minutes to merge are also a signal — usually the operator got distracted, not that the body warranted scrutiny.

## Failure mode it prevents

Without this awareness, an operator merges a long-body PR in 8 seconds because they have trained themselves on the short-body cadence. The architectural risk Claude flagged (a 2.6 KB architecture diagram exists for a reason) goes unread; the bug it would have caught ships. Estimated rework saved: 2-4 hours per missed long-body PR; 1-2 such PRs per quarter for an active solo builder.

## Monetization route

- Skill artifact: `pr-body-risk-gate` — a pre-merge check that blocks merge if the body is >500 chars and `--read-acknowledged` flag is not passed.
- Template: a Git alias `git ack-pr <n>` that prints the body and requires `y/N` before merge.
- Playbook section addition: "the long-body discipline" with a self-rule example.

## Reusability test

The pattern holds for any tool where the AI authors the PR body and the human merges. Cursor, Codex, manual-with-AI-summary — all produce body verbosity that correlates with risk. The rule generalizes. Pass.
