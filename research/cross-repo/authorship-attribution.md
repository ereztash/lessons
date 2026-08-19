# Authorship Attribution — Why `git log --author` Undercounts AI Work

> Added 2026-08-19 during the +5-repo ingestion round.
> Status: **corrects a method used in the Phase 1–4 synthesis and in the n=25 portfolio scan.**
> Tool: `scripts/detect-agent-authorship.sh` (runs both detectors, flags the blind spot).

## The problem

The n=25 portfolio scan populated an "AI tools" column by reading commit author names
(`Claude <noreply@anthropic.com>`, `lovable-dev[bot]`, `gpt-engineer-app[bot]`).
Six repos were recorded as **"AI tools: none detected."**

That column is not measuring what it claims to measure. The recorded author of a commit is a
property of **the git configuration of the tool that wrote it**, not of who did the work:

| Write path | Recorded author | Recorded committer |
|---|---|---|
| Claude Code committing locally | `Claude <noreply@anthropic.com>` | `Claude <noreply@anthropic.com>` |
| Lovable / gpt-engineer web build | `lovable-dev[bot]` / `gpt-engineer-app[bot]` | same |
| GitHub web PR merge | the merging human | `GitHub <noreply@github.com>` |
| **An agent running under the operator's own git config** | **the operator** | **the operator** |

The last row is invisible to author-based counting. It is not rare in this portfolio — it is
the single largest category of AI-written commits we can now measure.

## Two orthogonal detectors

Neither detector alone is sufficient; each has a documented false-negative class.

**Detector A — identity.** Author name, `Co-Authored-By: Claude` trailer,
`https://claude.ai/code/session_*` link.
*Blind to:* any agent configured with the operator's `user.name` / `user.email`.

**Detector B — cadence.** A run of ≥5 consecutive same-author commits where every
inter-commit gap is < 180 s. A human does not author ten semantically distinct,
separately-scoped commits in three minutes.
*Blind to:* Claude Code, which batches work into semantically-scoped commits paced minutes to
hours apart — by cadence it looks exactly like a human.

## The 2×2

|  | **machine cadence** (Detector B fires) | **human cadence** (B silent) |
|---|---|---|
| **AI identity** (A fires) | Lovable / gpt-engineer blast — `brain-healer-hub` (10 of 18), `agency-insight-analyzer` (9 of 13) | Claude Code session — `Agent-Architect` (20 of 20), `ampaign-craft` (120 of 124) |
| **human identity** (A silent) | **← the blind spot.** `MATI` (55 of 86), `lessons` (14 of 37) | genuine human — `All_Erez-s_Connections` (6 of 6) |

## Measured, 2026-08-19

`commits` = non-merge commits across all fetched refs. `trailer` = `Co-Authored-By:` naming Claude.

| Repo | commits | bot | claude | trailer | session | empty body | in burst | verdict |
|---|---|---|---|---|---|---|---|---|
| MATI | 86 | 0 | 5 | 5 | 5 | 80 | 55 | **hidden agent** — 81 of 86 commits are neither bot- nor Claude-attributed |
| anti-silo | 74 | 0 | 6 | 40 | 5 | 33 | 6 | **6.7× undercount** — 40 commits carry the Claude trailer, 6 name Claude as author |
| Agent-Architect | 20 | 0 | 20 | 0 | 6 | 0 | 0 | clean — Claude-authored, human-paced, no trailer convention |
| CRM_Google_ai | 4 | 0 | 2 | 0 | 0 | 2 | 0 | clean (mirror repo, 4 commits total) |
| agency-insight-analyzer | 13 | 11 | 2 | 0 | 0 | 1 | 9 | clean — bot blast then Claude |
| Benchmark.ATS | 4 | 0 | 2 | 0 | 0 | 3 | 0 | **scan said "none detected"; 2 of 4 commits are Claude's** |
| brain-healer-hub | 18 | 14 | 4 | 0 | 4 | 4 | 10 | clean |
| All_Erez-s_Connections | 6 | 0 | 0 | 0 | 0 | 4 | 0 | genuine human — the only true negative in the set |
| ampaign-craft | 124 | 1 | 120 | 1 | 83 | 6 | 8 | clean — session-link convention, not trailer |
| COR-SYS | 57 | 0 | 16 | 16 | 15 | 6 | 5 | clean |
| ground-state-protocol | 43 | 31 | 12 | 0 | 12 | 9 | 5 | clean |
| **lessons** | 37 | 0 | 4 | 1 | 4 | 13 | **14** | **hidden agent — in this repo's own history** |

## The reflexive finding

`lessons` — the repo that produced the classifier — carries 14 commits in machine-cadence
bursts authored as `ereztash`, including `a648ff3 Phase 0: scaffold lessons repo` and
`ae184a9 research: add full 25-repo portfolio scan`. Author and committer are both the
operator's local git identity; the subjects carry `feat(saas/scanner):`-style conventional
prefixes that no one typed by hand at that rate.

The scan that declared six repos "AI tools: none detected" was itself written by an agent whose
commits its own method would have counted as human.

## What this invalidates and what survives

**Invalidated:** the "AI tools" column of `research/portfolio-scan/26-repos.md` for any repo
where it reads "none detected", and any per-repo AI-contribution ratio derived from author names.

**Corrected here:** `Benchmark.ATS` (2 of 4 commits are Claude's, 2 PRs exist — the scan
recorded neither).

**Survives:** the F1–F4 tier scores. They read files and PR existence, not authorship, so the
blind spot does not reach them. H4 ("AI tool diversity predicts maturity") is *strengthened* —
the repos with the most surfaces (MATI: hidden agent + Claude Code + bot reviewer; anti-silo:
Claude Code + two human identities) are the two most active repos in the portfolio.

## Rule

> Never report an AI-contribution figure from `git log --author` alone. Run both detectors.
> When cadence bursts exceed identified AI commits, the repo has an unattributed agent surface —
> report the gap as a range, not a number.
