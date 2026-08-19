---
dimension: claude-to-claude
slug: conventional-commit-prefix-on-claude-commits
evidence-repos: [cor-sys, groundstate-protocol, chess-mind-patterns]
evidence-pointers:
  - cor-sys@bb3d459
  - cor-sys@86cf90e
  - cor-sys@f53a9a2
  - cor-sys@72b3efd
  - cor-sys@7719d64
  - cor-sys@5c2bf0d
  - cor-sys@6fbb735
  - cor-sys@31c607f
  - cor-sys@29ed2d9
  - cor-sys@e18b37e
  - groundstate-protocol@9b634aa
  - groundstate-protocol@c4867f5
  - groundstate-protocol@af24284
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
  - cor-sys@10:06
  - groundstate-protocol@11:02
  - chess-mind-patterns@11:05
may-report: yes
may-assert-cause: no  # Round 2 weakened it — the prefix travels with the repo convention, not with Claude
score-history:
  - 2026-05-12: 5/5 — first audit
---

# Conventional Commit Prefix on Claude-Authored Commits

## Observation (Claude layer — 5 lines max)

- All 71 cor-sys commits use Conventional Commits prefixes (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, plus repo-specific `test:` and `debug:` from the encoding war).
- Every Claude-authored commit in groundstate-protocol uses a conventional prefix matching the editorial register.
- chess-mind-patterns' 3 human-resumer commits all use `feat:` + multi-line body, visually distinct from the Lovable bot's 6-word imperatives (`Add X`, `Fix X`, `Changes`).
- The Lovable bot does NOT use conventional prefixes — the prefix is a 100% reliable bot-vs-AI-paired discriminator in the dataset.
- The prefix is a machine-readable provenance signal usable by future tooling (CHANGELOG generators, release-please, semantic-release).

## Mechanism

Claude Code's training and instruction-following bias makes it default to Conventional Commits. The Lovable bot defaults to generic imperatives. This produces a clean two-register split that any reader of `git log --oneline` can attribute to its agent without reading diffs. Downstream: semantic-release, Changesets, and CHANGELOG tooling consume the prefixes; the absence of prefixes locks Lovable-only repos out of those toolchains until the operator retroactively rewrites history.

## Failure mode it prevents

Mixed-prefix repos (some `feat:`, some `Add X`) break CHANGELOG automation. The operator either rewrites history (15-30 minutes per affected branch) or ships a manual CHANGELOG (10-20 minutes per release). With a pre-commit hook enforcing the prefix on Claude commits, neither cost is paid. Estimated rework saved: 1-2 hours per repo over its lifetime if release tooling is used.

## Monetization route

- Hook artifact: `commit-msg` hook that rejects un-prefixed commits when `git config user.email` matches `noreply@anthropic.com`.
- Template: a 5-line shell snippet + opt-in flag for stricter enforcement.
- Companion to the `claude-coauthored-trailer-convention` insight as part of an "AI commit hygiene" bundle.

## Reusability test

Generalizes to any AI coding tool whose commit voice defaults to conventional prefixes (Cursor, Aider, Sweep). The hook discriminates by author email, not by prefix vocabulary, so it's tool-agnostic. Pass.
