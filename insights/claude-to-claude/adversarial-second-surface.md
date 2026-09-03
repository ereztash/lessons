---
dimension: claude-to-claude
slug: adversarial-second-surface
evidence-repos: [MATI, anti-silo, Agent-Architect]
evidence-pointers:
  - MATI#16, MATI#17 — branch claude/code-review-*; all 5 Claude commits are fixes/tests, zero features
  - MATI@dde1e57 — commit body: the contract scripts "match source text with regular expressions"
  - anti-silo — every claude/* branch is an audit or review (PR#1 UI review, PR#13 readiness audit)
  - anti-silo@18219fb, @cb96bf4 — monolith split + 250-line guard test
  - Agent-Architect@857e0dd — "close 7 logic gaps found by Haiku audit of v0.5 pipeline"
  - Agent-Architect@9398051 — "Consistency pass on audit-fix commit" (the cost line)
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass  # catches a defect class the builder cannot find; 3-8 hrs per caught class
  encodable: pass  # command + branch-naming convention + CI gate
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
related-playbook: products/playbooks/ai-cross-review-setup.md
created: 2026-08-19
evidence-resolves-to: hard
may-report: yes
may-assert-cause: yes  # 5 repos after Round 3
cause-scope: portfolio   # this portfolio only. No principle in METHOD_LINEAGE reaches
                         # level 7 (a second operator), so a causal claim may be made ABOUT
                         # these repositories and may NOT be sold as a general mechanism.
reversibility: low  # a shipped playbook is sold; a retraction reaches fewer people than the claim did
score-history:
  - 2026-08-19: 5/5 — first audit
  - 2026-09-03: 5/5 — re-audit under sale-gate condition 4: causal authority HELD (`hard`, 3 repos), scoped to this portfolio — nothing in METHOD_LINEAGE reaches level 7
---

# The Second Surface Must Be Adversarial, Never Additive

## Observation (Claude layer)

- In 3 repos the second AI surface ships **zero features** — only audits, refactors, tests, fixes.
- Branch names encode the role: `agent/*` and `feat/*` build; `claude/*` reviews.
- MATI: the builder wrote both the code and its three CI contract checks; the auditor found the
  checks were regex-based and could be walked past by a rename.
- Agent-Architect: a cheaper model (Haiku) audited an Opus-built pipeline and found 7 logic gaps.

## Mechanism

When one agent writes both the implementation and its gates, the gates inherit the author's
blind spot — a checker cannot test the assumption that produced it. A second surface is valuable
in proportion to how *little* it shares with the first: different model, different context,
different brief. Auditing is also a cheaper cognitive task than construction, so paying
construction rates to review is waste; the Haiku-audits-Opus case is the cost-tiered form.

## Failure mode it prevents

Green checks over an unverified system. MATI shipped 16 PRs with three passing CI contract checks;
the audit pass found the checks matched source *text*, so a variable rename disabled them silently.
Budget 3–8 hours to discover that class of defect after it has shipped, versus one review pass.
The honest cost line: a batch of audit fixes desynchronizes identifiers, so a cross-review round
is two commits, never one (`Agent-Architect@9398051`).

## Monetization route

Extends the shipped `ai-cross-review-setup` playbook with the role-assignment rule and the
branch-naming convention that makes the split visible in `git log` — plus the cost-tiering variant
(cheap model reviews expensive model) that the original playbook does not cover.

## Reusability test

Survives repo substitution. The only requirement is two surfaces with independent context; which
vendor plays which role does not matter — in MATI and anti-silo Claude Code is the adversary, in
Agent-Architect it is the builder being audited by its own cheaper sibling.
