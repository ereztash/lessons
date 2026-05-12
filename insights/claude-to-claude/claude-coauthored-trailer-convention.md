---
dimension: claude-to-claude
slug: claude-coauthored-trailer-convention
evidence-repos: [cor-sys, groundstate-protocol, chess-mind-patterns]
evidence-pointers:
  - cor-sys@10:04
  - groundstate-protocol@11:00
  - chess-mind-patterns@11:05
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

# `Co-Authored-By: Claude` Trailer Convention

## Observation (Claude layer — 5 lines max)

- cor-sys's earliest commits carry `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` under the human shell author wrapper; on 2026-04-03 the convention flips to direct `Claude <noreply@anthropic.com>` authorship via tool delegation.
- groundstate-protocol's Claude commits are direct from `dc90fee` onward, skipping the co-authored phase entirely.
- chess-mind-patterns' 3 human-resumer commits all carry `Co-Authored-By: Claude Sonnet 4.6` trailer 11 days before cor-sys codified the practice anywhere.
- The convention is community-emergent, not top-down — three repos converged on the same trailer format before any documentation existed.
- Absence of the trailer (and absence of direct Claude authorship) flags Tier C — AI never came near git.

## Mechanism

The trailer is a machine-readable provenance signal cheap to write and expensive to fake. Once present, `git log --author=Claude` or `git log --grep="Co-Authored-By: Claude"` can attribute any commit to its AI surface. Three independent operators converged on the format because Anthropic's docs suggested it and it is the only standard trailer that Git's blame/log tools natively understand. The flip from co-authored to direct authorship is a *delegation marker* — it tells future readers that Claude began pushing directly via `/cor-ship`, not through the operator's shell.

## Failure mode it prevents

Without the trailer, an operator cannot answer "which commits were AI-written?" months later. Audit trail rot is the primary cost: a code review by an external auditor (security, compliance, due diligence) cannot separate human work from AI work. Estimated rework saved: 1-2 hours per audit response × 1-2 audits/year = 2-4 hours/year. Higher in regulated industries.

## Monetization route

- Hook artifact: `prepare-commit-msg` hook that auto-appends the trailer when the operator's editor/AI flag is set.
- Template: a 10-line bash hook + an installer command (`curl ... | bash`).
- Playbook section: "AI provenance hygiene" as part of a compliance-adjacent bundle.

## Reusability test

Substitute Cursor's `<a href="https://cursor.com/agents/...">` footer or GitHub Copilot's signature line. The general rule — "every AI-assisted commit carries a machine-readable provenance signal" — generalizes. The Anthropic-specific trailer text generalizes within the Anthropic-tool family. Pass.
