---
dimension: claude-to-claude
slug: agent-identity-collapse
evidence-repos: [MATI, anti-silo, lessons, Benchmark.ATS, All_Erez-s_Connections]
evidence-pointers:
  - MATI@68f1acb (author=committer=ereztash, empty body, subject-only, branch agent/*)
  - MATI@dd45270 -> MATI@00de2d8 -> MATI@7f8427d (40s and 44s apart; 55 of 86 non-merge commits sit in such bursts, verified locally 2026-09-03)
  - anti-silo@3c9198b (HEAD of 103 commits; 40 carry `Co-Authored-By: Claude` and 6 name Claude as author, re-counted locally 2026-09-03)
  - lessons@a648ff3, lessons@ae184a9 (this repo's own hidden-agent commits)
  - Benchmark.ATS@4cc723e and Benchmark.ATS@515d896 (both authored `Claude`; 2 of the 4 non-merge commits, against a scan that recorded "AI tools: none detected")
  - All_Erez-s_Connections@66a3b4d (HEAD; all 6 commits authored `ereztash`, no trailer, both detectors silent - the true negative)
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
evidence-resolves-to: hard
may-report: yes
may-assert-cause: yes    # RESTORED 2026-09-03. Demoted the same day because the
                         # evidence measured `mixed`; the operator then opened the
                         # portfolio, every unresolvable pointer was re-anchored to a
                         # verified commit or PR, and R1 now measures `hard`. The
                         # claim came back on measurement, not on argument.
cause-scope: portfolio   # this portfolio only. Restored 2026-09-03 on re-anchored evidence;
                         # METHOD_LINEAGE.md section 3 still records level 7 = 0, so a cause may be
                         # asserted ABOUT these repositories and may NOT be sold as a general
                         # mechanism.

score-history:
  - 2026-08-19: 5/5 — first audit
  - 2026-09-03: 5/5 — re-audit under sale-gate condition 4: causal authority WITHDRAWN, evidence-resolves-to is `mixed` against a documented requirement of `hard`
  - 2026-09-03: 5/5 — causal authority RESTORED: pointers re-anchored against the live repositories, R1 measures `hard`, scope declared `portfolio`
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
