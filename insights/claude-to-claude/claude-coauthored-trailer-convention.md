---
dimension: claude-to-claude
slug: claude-coauthored-trailer-convention
evidence-repos: [cor-sys, groundstate-protocol, chess-mind-patterns]
evidence-pointers:
  - cor-sys@1ab0c54 (Claude direct)
  - cor-sys@77fa8a8 (Claude co-authored under COR-SYS Dev)
  - cor-sys@50f9166 (Claude co-authored)
  - groundstate-protocol@dc90fee:src/pages/Landing.tsx
  - groundstate-protocol@abcdda7:(GroundState flow)
  - gap 2026-03-08 -> 2026-04-14
  - chess-mind-patterns@875fe1c (title 'feat: add TL;DR, pattern recommendations, transition signal & demo mode')
  - chess-mind-patterns@f590fe6 (title 'feat: full course replacement — Phase 1-5 implementation')
  - chess-mind-patterns@2c7ced2 (title 'feat: Lichess deep-links, demo puzzle seeding, ELO goal setter, PWA + notifications'); contrast with bot subjects like 'Add breakpoint sliders'
  - 'Save plan in Lovable'
  - 'Preceding changes'
  - 'Changes'
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
  - cor-sys@10:04
  - groundstate-protocol@11:00
  - chess-mind-patterns@11:05
may-report: yes
may-assert-cause: yes  # strong in 3 repos (COR-SYS 16/57, groundstate-protocol 76/194, anti-silo 40/74). The refuted part is the ORIGINAL claim that absence flags Tier C — ampaign-craft and Agent-Architect are Tier A with no trailer
score-history:
  - 2026-05-12: 5/5 — first audit
  - 2026-08-19: 5/5 — evidence corrected, then the correction itself retracted; groundstate has 76 Claude trailers, not 0. Score held throughout
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

---

## Correction — 2026-08-19 (+5-repo ingestion round)

Re-measured across 12 repos. The convention is **not** an operator practice; it is a
tool-configuration artifact, and it is absent from most of the portfolio:

| Repo | commits | carrying `Co-Authored-By: <Claude>` |
|---|---|---|
| anti-silo | 74 | 40 |
| COR-SYS | 57 | 16 (naming the model: `Claude Sonnet 4.6` ×13, `Claude Opus 4.6` ×3) |
| MATI | 86 | 5 |
| ampaign-craft | 124 | 1 (uses `claude.ai/code` session links instead — 83 commits) |
| Agent-Architect | 20 | 0 |
| brain-healer-hub / agency-insight-analyzer / CRM_Google_ai | 35 | 0 |
| **groundstate-protocol** (public, 194) | 194 | **76** — `Claude Opus 4.8` ×46, `Claude Opus 5` ×26, `Claude Sonnet 5` ×2, `Claude Haiku 4.5` ×2, plus 38 naming the human |

Two consequences for anything built on this insight:

1. **The trailer's absence does not flag a Tier C repo.** The original claim ("its absence flags a
   Tier C repo where AI never came near git") is refuted: `ampaign-craft` and `Agent-Architect` are
   Tier A and near-entirely Claude-written with no trailer. Absence indicates a different write
   path, not a different level of AI involvement. Use `scripts/detect-agent-authorship.sh`.
2. **A commit-signing hook is still the right artifact** — but sell it as *installing* a convention
   that is real in some repos and absent in others, not as one that emerged across the cohort.

**Correction to the correction — 2026-08-19.** The first version of this section reported
groundstate-protocol as having **0** Claude trailers. That figure came from the private 67-commit
`ground-state-protocol`, a different repository from the public `groundstate-protocol` the Phase 1
research describes. The correct figure is 76. The Phase 2 score was right; this section's first
attempt to correct it was the error. See `research/cross-repo/patterns-matrix.md` §2.2.

The insight stays at 5/5 (the hook is more valuable if the convention is rare), with the
evidence and the pitch corrected. Where the trailer *is* used, COR-SYS shows the better form:
name the model version, so the trailer records which model did the work.
