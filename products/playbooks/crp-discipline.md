---
title: "Make Your Repo Claude-Code-Ready — The CRP Discipline"
status: DO NOT SELL — internal migration test failed (see research/self-application/cor-sys-migration-test.md)
target_buyer: Solo AI-paired builders who pair-program with Claude Code 3+ times/week
hours_saved: 4-12 hrs/month (CLAIM NOT VALIDATED — see migration test)
launch_price: $29 (NOT YET — failed validation)
list_price: $49
evidence_anchors:
  - research/portfolio-scan/crp-compliance-scan.md (n=8, 7/8 fail)
  - saas/spec/crp-spec.md (formal protocol)
  - saas/app/scripts/genesis/domains/lessons.ts (compiled self-fixture)
status: shipped 2026-05-13
status_revised: 2026-05-13 — RECALLED. Internal migration test on COR-SYS produced
                 4/4 linter pass via 50 minutes of stub content with no real value.
                 Vacuous specificity confirmed. Spec needs revision before sale.
---

> # ⚠ DO NOT PURCHASE
>
> This playbook failed internal validation. The CRP spec v0.1 is so narrow that
> satisfying it requires content that does not serve the underlying goal of faster
> Claude Code sessions.
>
> Migration test of COR-SYS (a Tier A repo) from 1/4 → 4/4 took 50 minutes of pure
> stub work and produced files that add zero value to a cold-start Claude session.
> See: `research/self-application/cor-sys-migration-test.md` for the full log.
>
> Revisions needed before this playbook can ship:
> 1. Single-repo example for R2 (or relax R2 for non-portfolio projects)
> 2. Make R3 conditional on actual dual-repo workflows existing
> 3. Allow `skill.md` OR `.claude/skills/` for R4 (cosmetic asymmetry)
> 4. Distinguish "linter pass" from "discipline applied" — currently the playbook
>    sells the file structure, not the content that gives value.
>
> Until these revisions land, the playbook is preserved here as evidence of the
> migration test, not as a product.

# Make Your Repo Claude-Code-Ready

## The problem you didn't know you have

You open Claude Code in your repo. You spend the first 10 minutes re-explaining what
the project is, what conventions to use, what NOT to do. Then you do real work for 90
minutes. Then your context fills up, you start a new session, and you re-explain the
same things again.

If you do this 3x a week, you spend **2-3 hours weekly re-loading context**. That's
8-12 hours a month. That's the problem.

A Claude-Code-Ready repo — a CRP — solves it in one structural change: the repo itself
becomes the context provider. Claude reads four files in a known order, takes 2,000-3,000
tokens, and starts working with full project context. Zero re-explanation.

## What's in this playbook

- The CRP spec v0.1 — 4 required rules, 3 optional warnings
- The conversion checklist — what to add, in what order
- 8 before/after examples from real repos (cor-sys, kolzchut, ampaign-craft, etc.)
- The free `npx crp-lint` tool that grades your repo

## Why solo builders specifically

Teams have wiki pages, design docs, onboarding sessions. Solo builders have none of that.
You ARE the context. When Claude opens cold, it has nothing — and you pay the price every
session. CRP turns repo structure into the missing onboarding.

## The 4 required rules

### R1 — Gate 0 entry point

A file named `CLAUDE.md` at repo root, containing a section explicitly titled "Gate 0".

The Gate 0 section lists the files Claude should read at session start, in order, with a
one-line purpose for each.

**Why this matters**: without an explicit bootstrap sequence, Claude reads files in
whatever order seems relevant — usually meaning it reads too much, fills context, and
asks you to clarify. With Gate 0, Claude reads 4 files in 2 seconds and starts working.

**Minimum compliant version**:

```markdown
## GATE 0 — Session Init (BLOCKING — before ANY tool call)

Read in this exact order:

| # | File | Purpose |
|---|------|---------|
| 1 | LOG.md | environment, anti-patterns, session history |
| 2 | MEMORY.md | current state, last touched, open items |
| 3 | docs/conventions.md | naming, commit voice, file structure |
| 4 | CLAUDE.md (this file) | quick rules, navigation |
```

**Conversion cost**: 30 minutes to write Gate 0 section, 2 hours to populate LOG.md
+ MEMORY.md the first time.

### R2 — Machine-queryable index

A file at `research/repo-index.md` containing a list of entries (projects, modules,
features), each introduced by a level-2 markdown heading: `## <entry-name>`.

Each entry has 4-8 lines: status, key findings, what to watch for, related files.

**Why this matters**: when Claude needs context about a specific area of your repo,
it should grep `## <area-name>` and get the answer in 100 tokens. Without this, it
either skims the wrong file or asks you.

**Minimum compliant version**: 3+ entries. Even if your repo is small, list its main
modules.

**Conversion cost**: 2-4 hours to write 5-10 entries from memory.

### R3 — Session protocols

A directory `pipelines/` at repo root, with at least one Markdown file describing a
specific session protocol.

Mandatory file: `pipelines/dual-repo-session.md` — what Claude should do when working
on your repo with another repo open as reference.

**Why this matters**: most repos describe themselves. CRP repos describe **how to work
on them**. The pipeline files turn "tribal knowledge" into a checklist Claude can follow.

**Conversion cost**: 1-2 hours for the first pipeline; subsequent pipelines take 20
minutes each.

### R4 — Reusable behaviors

A directory `.claude/skills/` with at least one Markdown file, each defining a named
behavior Claude can invoke.

**Why this matters**: workflows like "audit-this-feature" or "add-test-for-bug" recur.
Without skills, you re-describe them every session. With skills, Claude invokes them
by name.

**Conversion cost**: 30 minutes per skill once you've identified one.

## The 3 optional warnings

### W1 — `MEMORY.md` for state persistence

A snapshot file at repo root with: current phase, last-touched files, open candidates.
Updated at session end.

Without it: every new session asks "where were we?". With it: Claude reads it in 200
tokens.

### W2 — `LOG.md` for enforcement spine

A human-authored file documenting anti-patterns you've hit and protocols you've added
to prevent them.

The check: if your LOG.md has only generic headings ("Updates", "Changes"), it's
likely bot-generated and adds zero value. If it has domain-specific sections
("Environment Facts", "Pre-Synthesis Protocol"), it's the enforcement spine.

### W3 — Self-compilation fixture

A typed fixture representing your repo's domain as data — used by a code-generation
pipeline to regenerate CRP boilerplate.

This is for repos that have run Genesis on themselves. Most won't, and that's fine.

## Conversion checklist (in priority order)

Spend 4-8 hours total. Do in this order:

1. **R1** (30 min) — create CLAUDE.md with Gate 0 section
2. **W2** (1 hr) — start LOG.md with Environment Facts table and one anti-pattern
3. **W1** (15 min) — create MEMORY.md with current state
4. **R2** (2-4 hrs) — populate research/repo-index.md with your modules
5. **R3** (1-2 hrs) — write pipelines/dual-repo-session.md
6. **R4** (30 min each) — extract 1-3 skills into .claude/skills/

Run `npx crp-lint` after each step. Watch the score climb.

## Self-test

```bash
npx crp-lint
```

Expected outcomes:

- **0/4 → 0/4**: your repo doesn't have Claude Code session work yet. CRP isn't your
  priority — finish a feature first.
- **0/4 → 2/4 in 4 hours**: you're a typical mature repo. Cosmetic gaps fixed. Next
  step is R2 and R3 — architectural decisions.
- **2/4 → 4/4 in 4 more hours**: you're now CRP-compliant. Test it: open Claude Code,
  ask it to make a non-trivial change without re-explaining the project. Measure the
  session.

## Measuring the ROI

Track these for 30 days after conversion:

- **Re-explanation time per session**: target <2 minutes (was 10-15)
- **Sessions per feature**: target 1-2 (was 3-5 due to context resets)
- **Time-to-first-useful-tool-call**: target <60 seconds (was 5-10 minutes)

If your numbers don't improve after 30 days, ask in the buyer Discord — you may have
populated the CRP files with the wrong content.

## What CRP is not

- Not a documentation site. CLAUDE.md is for Claude, not for new developers.
- Not a wiki. The files are bounded by token budget, not by completeness.
- Not a one-time setup. As your repo evolves, repo-index.md and LOG.md grow with it.
- Not Claude-Code-only. The conventions transfer to Cursor, Aider, Codex with minor
  adaptation. The discipline is portable; the file names are not.

## Evidence base

This playbook is derived from a portfolio scan of 25 repos under the same operator.
Of the 8 most mature repos in the portfolio, exactly one was CRP-compliant — the
research/methodology repo (`ereztash/lessons`) that produced this playbook.

Even the most disciplined Tier A repos (ampaign-craft with 199 PRs, COR-SYS with
32 docs, groundstate-protocol with Codex cross-review) scored 0-1/4.

The pattern: **CRP is not what disciplined repos converge to**. Disciplined repos
optimize for human readers. CRP optimizes for the human-AI pair as the unit of work.
That's a different architectural decision, made on purpose.

See: `research/portfolio-scan/crp-compliance-scan.md` for the full scan data.

## Pricing

- **Launch (first 30 days)**: $29
- **List**: $49
- **Bundle** with RepoHealth Pro (when available): included

Refund: full refund within 14 days if the playbook didn't improve your Claude Code
sessions. No questions.
