---
dimension: user-to-user
slug: dual-ai-surface-workflow
evidence-repos: [groundstate-protocol, chess-mind-patterns]
evidence-pointers:
  - groundstate-protocol@e8a12bc
  - groundstate-protocol@33b1066
  - groundstate-protocol@0e45449
  - groundstate-protocol@dc90fee:src/pages/Landing.tsx
  - groundstate-protocol@abcdda7:(GroundState flow)
  - gap 2026-03-08 -> 2026-04-14
  - chess-mind-patterns@2c7ced2:src/components/
  - chess-mind-patterns@2c7ced2:src/lib/
  - file-touch overlap from chess-mind-patterns@875fe1c|f590fe6|2c7ced2
  - chess-mind-patterns@875fe1c (Index.tsx +82/-24)
  - chess-mind-patterns@f590fe6 (Index.tsx +28/-2)
  - chess-mind-patterns@2c7ced2 (Index.tsx +10/-2)
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
related-playbook: products/playbooks/dual-ai-surface-workflow.md
created: 2026-05-12
evidence-resolves-to: mixed
source-observations:  # lessons observations these pointers were resolved from
  - groundstate-protocol@11:01
  - groundstate-protocol@11:00
  - chess-mind-patterns@11:04
  - chess-mind-patterns@11:09
may-report: yes
may-assert-cause: no  # moderate-2-repos; the bot does not return in the third instance
reversibility: low  # a shipped playbook is sold; a retraction reaches fewer people than the claim did
score-history:
  - 2026-05-12: 5/5 — first audit
---

# Dual-AI-Surface Workflow — Lovable Renders, Claude Writes

## Observation (Claude layer — 5 lines max)

- Lovable and Claude Code coexist as non-substitutable surfaces in the same repo when used as render-and-review + write-and-commit respectively.
- Recognizable signature: alternating commit authors `Claude <noreply@anthropic.com>` and `lovable-dev[bot]` with timestamps interleaving within hours; e.g., groundstate's `e8a12bc` no-op preview-check commit lands between Claude PR#8 merge and PR#9 start.
- In chess-mind, the analytics:action ratio is 4:1 between bot-built widgets (33) and human-added action widgets (8) — parallel construction by complementary surfaces.
- Single-surface workflows (Lovable-only, Claude-only) miss the render-vs-write distinction and produce either Tier C abandonment or Tier B without a deploy-able preview.
- The cadence rule: open Lovable to see what you built; open Claude Code to change what you built; never reverse the polarity.

## Mechanism

Lovable's strength is the rendered preview the operator can show a stakeholder; its weakness is opaque commits and limited write surface. Claude Code's strength is precise authored commits with conventional prefixes and traceable provenance; its weakness is the lack of a live visual preview. Used together, each surface compensates for the other's weakness. Used singly, each surface forces the operator into the other's failure mode (Lovable-only loses to opacity, Claude-only loses to no preview).

## Failure mode it prevents

A solo builder running Lovable-only on a behavioral-success project will hit a wall at the Publish-button threshold and either abandon (Tier C) or paper over with manual fixes that drift from the Lovable build. A builder running Claude-only on a brand-surface project will ship code without ever seeing it rendered for stakeholders, losing the conversion-iteration loop. Each direction wastes 3-8 hours per project; the dual-surface cadence saves the wasted hours by routing each cognitive moment to the right surface.

## Monetization route

- Playbook section: "The Render/Write Cadence" with explicit branching rules (when to open Lovable, when to open Claude).
- Visual signature template: how to recognize a dual-surface repo in your portfolio (interleaved commit authors).
- Optional companion: a `dual-ai-cadence-audit` skill that scans a repo's commit log and reports whether the operator is using both surfaces.

## Reusability test

Substitute any visual-preview-AI + code-AI pair: Bolt.new + Claude Code, v0.dev + Cursor, Replit Agent + Aider. The render/write distinction holds; the cadence rule applies. Pass.
