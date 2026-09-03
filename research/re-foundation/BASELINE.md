# BASELINE — Frozen Snapshot of `lessons` Before Re-Foundation

> Recorded 2026-09-03, before any re-foundation edit. Every figure below was measured in this
> session, not carried over from `MEMORY.md` or `LOG.md`. Where this file disagrees with a
> current-facing document, the disagreement is itself a recorded observation and is listed in
> `CONTRADICTIONS.md`.
>
> **This file is historical. After creation its observations are never rewritten to match the
> final result.** If a number here later proves wrong, the correction is appended in §11, not
> edited in place.

---

## 1. Git state

| Fact | Value | How measured |
|---|---|---|
| Remote | `https://github.com/ereztash/lessons` | `git remote -v` |
| Default branch | `main` | `git branch -a` |
| `origin/main` HEAD | `f4fc70a77bdf36be472a57afcbc28948ecee6bde` | `git rev-parse origin/main` |
| HEAD subject | `Merge pull request #12 from ereztash/claude/analyze-additional-repos-v0s691` | `git log -1` |
| HEAD date | 2026-08-19 | `git log -1 --date=short` |
| Working branch for this round | `claude/lessons-ai-assurance-foundation-6ca2vw` (identical to `main` at start) | `git status` clean |
| Total commits | 58 | `git log --oneline \| wc -l` |
| Tracked files | 215 | `find . -not -path './.git/*' -type f` |
| Merged PRs to date | 12 (PR #13 open at the time of the last CI run) | `actions_list` run metadata |
| Days since last content commit | 15 (2026-08-19 to 2026-09-03) | arithmetic |

## 2. CI state — the headline baseline finding

| Fact | Value |
|---|---|
| Workflows defined | 1 (`.github/workflows/node.js.yml`, "Node.js CI") |
| Total runs recorded | 14 |
| Runs with `conclusion: success` | **0** |
| Runs with `conclusion: failure` | **14** |
| First run | 2026-05-12, run #1, `958a8ab` "Add Node.js CI workflow" — failed |
| Most recent run | 2026-09-02, run #14, `9c9c2fa` on PR #13 — failed |
| Root `package.json` | **does not exist** |

The workflow runs `npm ci` at the repository root. There is no root `package.json`, so `npm ci`
exits non-zero on every trigger. **The only automated gate this repository has has never passed,
across four months and fourteen runs, and no document in the repository mentions it.**

Two further observations about the same gate:

- `saas/app/package.json` declares `"test": "vitest run"`. A search for `*.test.ts`, `*.spec.ts`,
  `__tests__/` and any `vitest.config.*` across the tree returns **zero files**. Had `npm ci`
  succeeded in that directory, `npm test` would have run no assertions.
- `saas/scanner/package.json` declares no `test` script at all.

So the repository holds three layers of gate failure at once: a gate pointed at the wrong
directory, a test command with nothing to run, and a red signal nobody read. This is recorded here
because it is the clearest available instance, inside `lessons` itself, of the failure class the
candidate new thesis proposes to sell against.

## 3. Repository tree (depth 2, directories)

```
.claude/{commands,skills}        research/{cor-sys,groundstate-protocol,chess-mind-patterns,
.github/workflows                          core-unified-consciousness,mati,anti-silo,
ground-truth/                              agent-architect,crm-google-ai,agency-insight-analyzer,
handoff/                                   pre-call,proofminer,cross-repo,portfolio-scan,
index/                                     self-application}
insights/{claude-to-claude,claude-to-user, saas/{app,scanner,spec}
          user-to-claude,user-to-user}     scripts/
pipelines/                                 profile/
products/playbooks/
```

Size on disk, excluding `.git`:

| Area | Files | Lines | Bytes |
|---|---|---|---|
| `saas/` | 81 | 18,519 | 936K |
| `research/` | 49 | 4,840 | 620K |
| `insights/` | 22 | 1,203 | 128K |
| `products/` | 9 | 1,226 | 112K |
| `ground-truth/` | 11 | 786 | 72K |
| `.claude/` | 11 | 664 | 76K |
| `handoff/` | 6 | 1,041 | 56K |
| `scripts/` | 6 | 736 | 56K |
| `index/` | 6 | 438 | 64K |
| `pipelines/` | 4 | 281 | 24K |
| `profile/` | 3 | 121 | 16K |
| root (`README`, `CLAUDE`, `LOG`, `MEMORY`, `skill`) | 5 | — | 72K |

## 4. Tests

| Fact | Value |
|---|---|
| Test files in repository | **0** |
| Test runner configured | `vitest` (declared in `saas/app/package.json`, no config file, no specs) |
| `node_modules` present | no, in either package |
| Build verified this session | **no** — not attempted; status is *unverified*, not *passing* |

## 5. Executable assets and their current status

| Script | Language | Runs? | Verified this session |
|---|---|---|---|
| `scripts/check-lessons-contract.py` | Python | yes | **yes** — `contract OK — 17 insights, 0 violations`, exit 0 |
| `scripts/score-classifier.py` | Python | yes (per `results-2026-08-19.md`) | not re-run |
| `scripts/resolve-prediction.py` | Python | written against future data | not runnable until 2026-11-17 |
| `scripts/detect-agent-authorship.sh` | bash | yes (per `authorship-attribution.md`) | not re-run |
| `scripts/collect-outcome-evidence.sh` | bash | yes | not re-run |
| `scripts/score-portfolio.sh` | bash | yes | not re-run |
| `saas/app/scripts/genesis/*` (11 files, 1,182 lines) | TypeScript | requires `ANTHROPIC_API_KEY` + deps | not run |
| `saas/app/scripts/crp-lint.ts` | TypeScript | requires deps | not run |
| `saas/scanner/src/*` (3,412 lines) | TypeScript | requires deps + GitHub token | not run |
| `saas/app/src/*` (1,227 lines Next.js) | TypeScript | requires Supabase + OAuth | not run |

## 6. Research corpus size

| Measure | Value | Source |
|---|---|---|
| Repos in the operator's portfolio | 40 | `list_repos`, 2026-08-19, `has_more=false` |
| Repos scored F1–F5 | 40 (31 cohort 1 + 9 cohort 2) | `ground-truth/scores-2026-08-19*.tsv` |
| Repos deep-dived (6-artifact or 2-artifact survey) | 11 | `research/<repo>/` directory count |
| Repos with an independent ground-truth label | 10 | `ground-truth/labels-2026-08-19.json` |
| Raw observations captured | 76 | `MEMORY.md`, cross-checked against `research/*/extracted-insights.md` headings |
| Promoted cross-repo patterns | 29 | `patterns-matrix.md` §3.3 |
| Distilled insights | **17** | `ls insights/*/*.md` minus template |
| Shipped playbooks | 7 (6 + 1 meta) | `ls products/playbooks/` |

## 7. Assurance-relevant state of the corpus, measured

Run this session:

| Field | Distribution |
|---|---|
| `evidence-resolves-to` | 5 `hard`, 12 `mixed`, 0 `prose` |
| `may-assert-cause` | 10 `yes`, 7 `no` |
| Playbook claim strength | 4 `causal`, 3 `observational` |
| Contract gate verdict | pass (0 violations) |
| Bypass log entries | see `ground-truth/bypass-log.md` |

## 8. Measured reliability of this repository's own gates

From `ground-truth/gate-reliability.md`, not re-derived here:

| Gate | P (floor) | C |
|---|---|---|
| Gate correctness | **≥ 0.500** | a false verdict, or a gate that passes vacuously |
| Instrument design | **≥ 0.375** | the measurement is void and looks valid |
| Classifier (F1–F5) | ≥ 0.100 | effort routed to the wrong repo |
| Evidence-or-defer | ≥ 0.030 (least believable of the four) | a wrong claim reaches a sold playbook |

## 9. Product state at baseline

| Question | Current answer in the repository | Where |
|---|---|---|
| What is the product? | **RepoHealth** — "AI-repo health scanner for solo builders" | `saas/spec/00-README.md` |
| What does the scanner package call itself? | **PortfolioPilot** (`@portfoliopilot/scanner`) | `saas/scanner/package.json` |
| What does the app package call itself? | **repohealth** | `saas/app/package.json` |
| ICP | solo AI-paired builder, 5–25 repos, TypeScript; secondary claim of an Israeli indie segment | `saas/spec/06-target-audience.md`, `01-product-thesis.md` |
| Pricing | Free / Pro ~$19 / Team; playbooks $29–$129; two bundles at $99 and $129 | `saas/spec/04-pricing.md`, `products/pricing-hypotheses.md` |
| Moat | AI-tool-aware classifier + playbook library + n=25 evidence base | `saas/spec/07-moat.md` |
| Second product mode | **Genesis Mode** — forward compiler from intent to scaffold | `saas/spec/02b-genesis-mode.md` |
| Kill criteria | zero paying users at week 4; CVR < 3% at month 2; MRR < $200 at month 3 | `saas/spec/11-conviction-statement.md` |
| Paying customers to date | **0** | no artifact in the repository records one |
| External (non-operator) projects analysed | **0** | every repo in the corpus is owned by `ereztash` |

## 10. Open, time-bound research commitments at baseline

| Commitment | Registered | Resolves | Status on 2026-09-03 |
|---|---|---|---|
| F5-beats-F1–F4 prospective test | 2026-08-19 | **2026-11-17** | **open, 75 days remaining** |
| Frozen score files (`scores-2026-08-19.tsv`, `-cohort2.tsv`) | 2026-08-19 | must not be edited before resolution | intact |
| Second labeller for the ground-truth set | named as required in `rubric.md` §5.1 | unscheduled | not done |
| Tier C/D discrimination measurement | named in `results-2026-08-19.md` §4 | unscheduled | not done |

## 11. Appended corrections to this baseline

*(Append only. Do not edit §1–§10.)*

- none yet.
