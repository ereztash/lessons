---
dimension: claude-to-claude
slug: agent-identity-collapse
evidence-repos: [MATI, anti-silo, lessons, Benchmark.ATS, All_Erez-s_Connections]
evidence-pointers:
  - MATI@68f1acb (author=committer=ereztash, empty body, subject-only, branch agent/*)
  - MATI — 55 of 86 non-merge commits in machine-cadence bursts, mean gap 31s
  - anti-silo — 40 commits carry Co-Authored-By: Claude; 6 name Claude as author
  - lessons@a648ff3, lessons@ae184a9 (this repo's own hidden-agent commits)
  - Benchmark.ATS — scan recorded "AI tools: none detected"; 2 of 4 commits are Claude's
  - All_Erez-s_Connections — true negative: 6 commits, both detectors silent
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass  # 2-5 hrs per portfolio audit, and prevents a wrong strategic read
  encodable: pass  # scripts/detect-agent-authorship.sh
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
related-playbook: none yet
created: 2026-08-19
evidence-resolves-to: mixed
may-report: yes
may-assert-cause: yes  # 3 repos, all pointers resolve to commits
score-history:
  - 2026-08-19: 5/5 — first audit
---

# Agent Identity Collapse — `git log --author` Undercounts AI Work by up to 6.7×

## Observation (Claude layer)

- The recorded author of a commit is a property of the writing tool's git config, not of who worked.
- An agent inheriting the operator's `user.name`/`user.email` and writing no trailer is invisible.
- MATI: 81 of 86 commits are neither bot- nor Claude-attributed, yet were machine-written.
- anti-silo: 40 Claude-paired commits, 6 findable by author name — a 6.7× undercount.
- `lessons` itself carries 14 such commits; its own method would have misclassified its own history.

## Mechanism

Two detectors are needed because each has a disjoint blind spot. **Identity** (author name,
`Co-Authored-By: Claude`, `claude.ai/code` session link) misses any agent configured with the
operator's git identity. **Cadence** (a run of ≥5 same-author commits with every gap < 180 s)
misses Claude Code, which batches work into semantically-scoped commits paced like a human.
Run one alone and the portfolio picture is wrong in a direction you cannot see.

## Failure mode it prevents

Deciding where to invest based on a false map. In this portfolio the author column produced
"AI tools: none detected" for six repos; the one case that was checkable (`Benchmark.ATS`) was
wrong on both AI usage and PR existence. A wrong AI-maturity read misroutes a quarter's effort —
the audit itself is 2–5 hours, the misallocation is weeks.

## Monetization route

A script (`scripts/detect-agent-authorship.sh`), plus the 2×2 that makes its output legible:
identity × cadence, four quadrants, one of them the blind spot. Ships as the measurement step
of any portfolio-audit playbook.

## Reusability test

Survives repo substitution completely — it reads only git metadata and needs no repo-specific
names. It also survives *operator* substitution: the blind spot is created by tool configuration,
so any portfolio built with more than one agent surface has it.
