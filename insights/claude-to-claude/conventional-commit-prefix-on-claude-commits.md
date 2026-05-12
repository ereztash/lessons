---
dimension: claude-to-claude
slug: conventional-commit-prefix-on-claude-commits
evidence-repos: [cor-sys, groundstate-protocol, chess-mind-patterns]
evidence-pointers:
  - cor-sys@10:06
  - groundstate-protocol@11:02
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
