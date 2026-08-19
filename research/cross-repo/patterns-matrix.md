# Cross-Repo Patterns Matrix (Claude Layer)

> Structured pattern × repo matrix. Each row is one observed pattern; each column is presence/strength in a repo (0=absent, 1=weak, 2=moderate, 3=strong).
>
> **Promotion rule**: a pattern is promoted (to a MOC) iff strength ≥ 2 in ≥ 2 repos.

## Matrix

| Pattern | cor-sys | groundstate | chess-mind | core-unified | Strength | Promoted? | Dimension |
|---------|---------|-------------|------------|--------------|----------|-----------|-----------|
| claude-coauthored-trailer-convention | 3 | 3 | 3 | 0 | strong-3-repos | Yes | claude-to-claude |
| conventional-commit-prefix-on-claude-commits | 3 | 3 | 3 | 0 | strong-3-repos | Yes | claude-to-claude |
| lovable-render-claude-write-coexistence | 0 | 3 | 2 | 0 | moderate-2-repos | Yes | user-to-user |
| non-template-domain-dep-predicts-resumption | 3 | 1 | 2 | 0 | strong-2-repos | Yes | user-to-user |
| bot-blast-then-human-resumption | 0 | 2 | 3 | 1 | strong-2-repos | Yes | user-to-user |
| editorial-commit-voice-escalation | 2 | 3 | 2 | 0 | strong-3-repos | Yes | claude-to-user |
| hebrew-bilingual-cognition-medium | 3 | 3 | 2 | 0 | strong-3-repos | Yes | user-to-claude |
| auto-pr-on-claude-branch | 3 | 3 | 0 | 0 | moderate-2-repos | Yes | claude-to-user |
| pr-body-verbosity-correlates-with-ttm | 3 | 3 | 0 | 0 | moderate-2-repos | Yes | claude-to-user |
| readme-placeholder-survives-to-head | 0 | 0 | 3 | 3 | strong-2-repos | Yes | user-to-user |
| test-scaffold-installed-never-used | 0 | 1 | 3 | 2 | moderate-2-repos | Yes | claude-to-claude |
| zero-deletion-of-bot-generated-files | 0 | 1 | 3 | 3 | strong-2-repos | Yes | claude-to-claude |
| zero-issues-zero-prs-prototype-shape | 0 | 0 | 3 | 3 | strong-2-repos | Yes | user-to-user |
| branch-as-sprint-container | 2 | 3 | 0 | 0 | moderate-2-repos | Yes | user-to-claude |
| third-party-saas-replaces-backend | 0 | 3 | 2 | 0 | moderate-2-repos | Yes | user-to-user |
| ai-cross-review-multi-agent-handoff | 2 | 3 | 0 | 0 | moderate-2-repos | Yes | claude-to-claude |
| meta-tooling-co-shipped-with-product | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-user |
| log-md-monotonic-anti-pattern-counter | 3 | 0 | 0 | 0 | weak-1-repo | No | claude-to-claude |
| skills-as-research-decision-tree-translation | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-claude |
| pre-build-validation-protocol-retrofit | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-claude |
| bug-locus-walk-up-the-stack | 3 | 0 | 0 | 0 | weak-1-repo | No | claude-to-claude |
| slash-commands-as-session-lifecycle | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-claude |
| docs-folder-as-issue-tracker | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-user |
| repo-as-unification-absorption-target | 3 | 0 | 0 | 0 | weak-1-repo | No | user-to-user |
| cursor-fire-and-forget-batch-burst | 3 | 0 | 0 | 0 | weak-1-repo | No | claude-to-claude |
| pr-template-encodes-style-guide | 0 | 3 | 0 | 0 | weak-1-repo | No | claude-to-user |
| lovable-sync-branch-noise | 0 | 3 | 0 | 0 | weak-1-repo | No | user-to-user |
| mid-session-refactor-dead-code-survives | 0 | 0 | 0 | 3 | weak-1-repo | No | claude-to-claude |
| personification-engine-naming | 0 | 0 | 0 | 3 | weak-1-repo | No | user-to-claude |
| port-verb-implies-external-prior-artifact | 0 | 0 | 0 | 3 | weak-1-repo | No | user-to-claude |
| subject-noise-rate-elevated-in-abandoned | 0 | 0 | 1 | 3 | weak-1-repo | No | claude-to-user |
| publish-button-as-success-condition | 0 | 2 | 0 | 3 | moderate-2-repos | Yes | user-to-user |
| wiring-seam-monolithic-index-component | 0 | 0 | 3 | 0 | weak-1-repo | No | claude-to-claude |
| analytics-then-action-bot-human-split | 0 | 0 | 3 | 0 | weak-1-repo | No | user-to-user |
| four-feature-tier-classifier-monotonic | 3 | 1 | 2 | 0 | strong-2-repos | Yes | user-to-user |
| absorbed-rather-than-shipped (gap-closure round; CampaignCraft inferred via cor-sys PR#16) | 3* | 0 | 0 | 0 | weak-1-repo-inferred | No (terminal-positive end-state candidate; promote if a second absorption case appears) | user-to-user |

*CampaignCraft is inferred from the absorbed surface at cor-sys PR #16. See `/research/cor-sys/campaigncraft-absorption-detail.md` for the full mini-profile.

## Promoted patterns by dimension

- **claude-to-user** (3): editorial-commit-voice-escalation; auto-pr-on-claude-branch; pr-body-verbosity-correlates-with-ttm
- **user-to-claude** (2): hebrew-bilingual-cognition-medium; branch-as-sprint-container
- **claude-to-claude** (5): claude-coauthored-trailer-convention; conventional-commit-prefix-on-claude-commits; test-scaffold-installed-never-used; zero-deletion-of-bot-generated-files; ai-cross-review-multi-agent-handoff
- **user-to-user** (7): lovable-render-claude-write-coexistence; non-template-domain-dep-predicts-resumption; bot-blast-then-human-resumption; readme-placeholder-survives-to-head; zero-issues-zero-prs-prototype-shape; third-party-saas-replaces-backend; publish-button-as-success-condition; four-feature-tier-classifier-monotonic

Total promoted: **17 patterns** (unchanged from Phase 2). Single-repo patterns (16, one added in gap-closure): retained as data, not promoted.

## Strength scoring legend

- **0** — absent (no evidence in the repo at HEAD)
- **1** — weak (a faint trace; one occurrence; not load-bearing for the workflow)
- **2** — moderate (multiple occurrences; load-bearing; visible to a reader skimming the repo)
- **3** — strong (defining feature of the repo's identity at HEAD; cannot be missed)

## Gap-closure addition (2026-05-12)

The `absorbed-rather-than-shipped` candidate row was added after the CampaignCraft mini-profile was extracted from cor-sys PR #16. It represents a 5th end-state on the maturity ladder (active managed system; sustained editorial brand; frozen prototype; abandoned at publish; **absorbed into parent system**) that does not fit cleanly into the existing 4-tier framework.

The pattern cannot promote at strength-2-repos because only one absorbed instance is in the dataset. It is parked as a candidate awaiting a second observed absorption.

## Cross-references

- Skill: `/.claude/skills/cross-repo-comparator.md`
- Pipeline: `/pipelines/cross-repo-diff.md`
- Narrative companion: `/research/cross-repo/synthesis.md`
- CampaignCraft profile: `/research/cor-sys/campaigncraft-absorption-detail.md`
- Source observation files:
  - `/research/cor-sys/extracted-insights.md` (12 observations)
  - `/research/groundstate-protocol/extracted-insights.md` (10 observations)
  - `/research/chess-mind-patterns/extracted-insights.md` (10 observations)
  - `/research/core-unified-consciousness/extracted-insights.md` (11 observations)

---

# Round 2 — Retest against +5 repos (2026-08-19)

> Append-only. The Phase 2 matrix above is left intact; this section records what the five newly
> ingested repos do to it. `n/v` = not verified this round (repo not in session scope, or the
> pattern needs an artifact I did not inspect). An empty cell is never scored as 0.
>
> Repos: MATI (mati), anti-silo (a-s), Agent-Architect (a-a), CRM_Google_ai (crm), agency-insight-analyzer (aia).

## 2.1 The 17 promoted patterns, retested

| Pattern | mati | a-s | a-a | crm | aia | Round-2 verdict |
|---|----|----|----|----|----|---|
| claude-coauthored-trailer-convention | 1 | 3 | 0 | 0 | 0 | **Phase 2 score of 3 for groundstate stands — see §2.2, which retracts an erroneous correction.** Holds in anti-silo (40/74) and COR-SYS (16/57); absent in 3 of 5 new repos and in ampaign-craft (1/124). Not an operator convention — a tool-configuration artifact. |
| conventional-commit-prefix-on-claude-commits | 0 | 3 | 0 | 0 | 0 | **Weakened.** MATI's Claude commits use plain imperative subjects (`Add a test suite covering lib and the browser regressions`). The prefix travels with the *repo's* convention, not with Claude. |
| lovable-render-claude-write-coexistence | 0 | 0 | 0 | 0 | 2 | Holds where Lovable is present. aia: bot blast → Claude, but the bot does not return (unlike groundstate). |
| non-template-domain-dep-predicts-resumption | 0 | 3 | 2 | n/v | 0 | **Counter-example found.** MATI has 3 template-only deps and is the most active repo in the portfolio. See F1b in the rescan. |
| bot-blast-then-human-resumption | 0 | 0 | 0 | 0 | 3 | Holds, and gains a threshold — see new row `resumption-gap-predicts-pivot-vs-continuation`. |
| editorial-commit-voice-escalation | 3 | 3 | 2 | 0 | 2 | **Strongly confirmed (4 repos).** Mechanism isolated in aia: the escalation is the arrival of a *justification layer*, not increasing length. |
| hebrew-bilingual-cognition-medium | 3 | 1 | 0 | 2 | 1 | Confirmed and sharpened — in MATI the language splits by *surface*, not by author. See new row. |
| auto-pr-on-claude-branch | 3 | 3 | 3 | 0 | 3 | **Strongly confirmed (4 repos).** Every `claude/*` branch in all four opened a PR. |
| pr-body-verbosity-correlates-with-ttm | 3 | n/v | n/v | 0 | n/v | **Confirmed with numbers.** MATI: short Hebrew `agent/*` PRs merge in 44 s (#11), 50 s (#10), 3.7 min (#9); long English `claude/*` PRs #17 and #18 were open 14 h+ and still open at 2026-08-19 07:40. |
| readme-placeholder-survives-to-head | 0 | 0 | 0 | 0 | n/v | **Counter-examples.** MATI rewrote its README twice on day one; Agent-Architect's README carries a falsifiable claim and a confidence interval that has been re-rated. Absence of the pattern tracks activity. |
| test-scaffold-installed-never-used | 0 | 0 | 0 | n/v | 0 | **Contradicted in Tier A.** MATI's 43 unit + 12 e2e tests run in CI; anti-silo's 250-line guard test enforces a boundary. The pattern is a Tier-B/C phenomenon only. |
| zero-deletion-of-bot-generated-files | 0 | 0 | 3 | 0 | 0 | Holds in Agent-Architect for a *rational* reason (a prompt cannot be diffed, so v0.1–v0.4 all stay), not through neglect. |
| zero-issues-zero-prs-prototype-shape | 0 | 0 | 0 | 3 | 0 | Holds only for the mirror repo, which has 0 PRs by construction. |
| branch-as-sprint-container | 3 | 3 | 2 | 0 | 2 | **Strongly confirmed (4 repos).** MATI: 18 branches, 18 PRs, one bounded change each. |
| third-party-saas-replaces-backend | 0 | 0 | 0 | 0 | 0 | Not observed. MATI is deliberately backend-less (local-first by privacy contract) — a different mechanism reaching a similar shape. |
| ai-cross-review-multi-agent-handoff | 3 | 3 | 3 | 3 | 0 | **Now the strongest pattern in the dataset (6 repos).** Four new instances, three of them novel forms — see §2.3. |
| publish-button-as-success-condition | 0 | 0 | 0 | 0 | 0 | Not observed in any Tier A repo of this round. Consistent with H2: it predicts abandonment, and none of these are abandoned. |
| four-feature-tier-classifier-monotonic | — | — | — | — | — | **F1 false negative** (MATI, Agent-Architect, All_Erez-s_Connections). F1b proposed in the rescan; not yet applied. |

## 2.2 A correction that was itself wrong — retracted 2026-08-19

**What this section said, and why it was wrong.** It claimed the Phase 2 matrix mis-scored
`claude-coauthored-trailer-convention` as 3 for groundstate-protocol, on the measurement that the
repo contained **zero** commits with a `Co-Authored-By` trailer naming Claude and that its 34
trailers all named the human.

That measurement was taken from `/home/user/ground-state-protocol` — the **private 67-commit copy**.
The Phase 1 research describes the **public `groundstate-protocol`**, which is a different
repository with 311 commits. Verified: of the 13 commit SHAs cited across
`/research/groundstate-protocol/`, two exist only in the public repo and none exists only in the
private one.

**Re-measured against the correct repository** (public `groundstate-protocol`, 194 non-merge commits):

| Trailer | Count |
|---|---|
| `Co-Authored-By: Claude Opus 4.8` | 46 |
| `Co-Authored-By: Claude Opus 5` | 26 |
| `Co-Authored-By: Claude Sonnet 5` | 2 |
| `Co-Authored-By: Claude Haiku 4.5` | 2 |
| `Co-authored-by: ereztash` | 38 |
| **naming Claude, total** | **76** |

**The Phase 2 score of 3 was correct. The "correction" was the error, and it stood for four commits
of this session.** It is retracted here rather than deleted, because a retraction that erases what
it retracts teaches nothing.

**What survives from the Round-2 finding.** The trailer is still *not* universal and still *not* an
operator convention: it is absent from `ampaign-craft` (1 of 124), `Agent-Architect` (0 of 20),
`brain-healer-hub` (0 naming Claude) and nearly absent from `MATI` (5 of 86). Its absence therefore
does not flag a Tier C repo — `ampaign-craft` and `Agent-Architect` are Tier A and near-entirely
Claude-written. That refinement was never dependent on the groundstate figure.

**What is newly promoted by the correct measurement.** `model-version-in-trailer` now has two repos:
COR-SYS (`Claude Sonnet 4.6` ×13, `Claude Opus 4.6` ×3) and groundstate-protocol (four model
versions across 76 commits). It moves from candidate to promoted — see §2.3.

## 2.3 New rows

| Pattern | mati | a-s | a-a | crm | aia | other | Strength | Promoted? | Dimension |
|---|----|----|----|----|----|-------|----------|-----------|-----------|
| agent-identity-collapse | 3 | 1 | 0 | 0 | 0 | lessons 3 | strong-2-repos | **Yes** | claude-to-claude |
| adversarial-second-surface | 3 | 3 | 2 | 0 | 0 | — | strong-3-repos | **Yes** | claude-to-claude |
| contract-check-as-ci-gate | 3 | **3** | 1 | 0 | 0 | ampaign-craft 3 | strong-3-repos | **Yes** | user-to-claude |
| claude-branch-as-default-branch | 0 | 0 | 3 | 0 | 0 | keepath 3 (scan) | strong-2-repos | **Yes** | user-to-claude |
| commercial-doc-as-spec | 1 | 3 | 3 | 0 | 0 | — | strong-2-repos | **Yes** | user-to-user |
| resumption-gap-predicts-pivot-vs-continuation | 0 | 0 | 0 | 0 | 3 | groundstate 3, chess-mind 2 | strong-2-repos | **Yes** | user-to-user |
| language-splits-by-agent-surface | 3 | 0 | 0 | 0 | 1 | — | weak-1-repo | No — needs a second bilingual multi-surface repo | user-to-claude |
| agents-md-inter-agent-lane-contract | 0 | 0 | 0 | 3 | 0 | — | weak-1-repo | No — but the highest-value single artifact found this round | claude-to-claude |
| mirror-repo-as-agent-access-shim | 0 | 0 | 0 | 3 | 0 | — | weak-1-repo | No — new terminal state, alongside absorbed-rather-than-shipped | user-to-user |
| one-day-full-system-build | 3 | 0 | 0 | 0 | 0 | — | weak-1-repo | No | user-to-user |
| human-as-coauthor-trailer | 0 | 0 | 0 | 0 | 0 | groundstate 3 | weak-1-repo | No | claude-to-user |
| model-version-in-trailer | 0 | 0 | 0 | 0 | 0 | COR-SYS 3, groundstate-protocol 3 | strong-2-repos | **Yes** (promoted 2026-08-19 on the re-measurement in §2.2) | claude-to-claude |
| gate-left-behind-by-the-fix | 3 | 3 | 1 | 0 | 0 | — | strong-2-repos | **Yes** | claude-to-claude |

### Row definitions

- **agent-identity-collapse** — an agent commits under the operator's `user.name`/`user.email` with no
  trailer, making its work invisible to author-based counting. Detected by cadence, not identity.
- **adversarial-second-surface** — one AI surface builds; a second is bought in solely to audit, review,
  refactor or attack the first. Never ships a feature. In MATI and anti-silo, Claude Code is the adversary.
- **contract-check-as-ci-gate** — a hand-written project-specific checker (not a linter preset) that
  encodes *domain* policy and fails the build. MATI: privacy floor, RTL contract, semantic non-duplication.
  anti-silo: 250-line module guard, deploy-staleness smoke test. ampaign-craft: `no-restricted-imports`.
- **claude-branch-as-default-branch** — the repo's GitHub HEAD is an agent working branch; no trunk was
  ever created. Both known instances are dormant with no partial feature — an unclaimed whole.
- **commercial-doc-as-spec** — investor/offer/readiness documents committed at repo-start, functioning as
  a constraint on what the code may claim rather than as launch collateral.
- **resumption-gap-predicts-pivot-vs-continuation** — a short gap (hours) resumes as continuation; a long
  gap (weeks) resumes as a product pivot. Mechanism: whether the operator still holds the product idea.
- **gate-left-behind-by-the-fix** — the durable artifact of an AI session is the gate it installs, not the
  diff it lands. A manual intervention that does not leave a gate recurs.

## 2.4 Promoted count after Round 2

| Dimension | Phase 2 | Round 2 additions | Total |
|---|---|---|---|
| claude-to-user | 3 | — | 3 |
| user-to-claude | 2 | contract-check-as-ci-gate; claude-branch-as-default-branch | 4 |
| claude-to-claude | 5 | agent-identity-collapse; adversarial-second-surface; gate-left-behind-by-the-fix | 8 |
| user-to-user | 7 | commercial-doc-as-spec; resumption-gap-predicts-pivot-vs-continuation | 9 |

Total promoted: **25** (17 + 7 + model-version-in-trailer). Single-repo candidates: **21**.

## 2.5 Source observation files added this round

- `/research/mati/extracted-insights.md` (6 observations)
- `/research/anti-silo/extracted-insights.md` (5 observations)
- `/research/agent-architect/extracted-insights.md` (4 observations)
- `/research/crm-google-ai/extracted-insights.md` (3 observations)
- `/research/agency-insight-analyzer/extracted-insights.md` (3 observations)
- `/research/cross-repo/authorship-attribution.md` (method correction + portfolio table)
- `/research/portfolio-scan/2026-08-19-rescan.md` (n=30 dataset + classifier corrections)

## 2.6 Round 2 addendum — `absorbed-rather-than-shipped` verified at byte level (2026-08-19)

The gap-closure round parked this pattern as `weak-1-repo-inferred`, because CampaignCraft's
absorption was inferred from COR-SYS PR#16 rather than observed. It is now measured:

- `COR-SYS/src/types/growth/` and `ampaign-craft/src/types/` share 10 filenames; **8 are
  byte-identical**; `pricing.ts` (120 vs 118 lines) and `retention.ts` (84 vs 85) have drifted.
- `COR-SYS/src/components/growth/` = 48 components vs `ampaign-craft/src/components/` = 136.
- `CRM_Google_ai` carries the same module vocabulary in Python (`growth/icp.py`, `growth/leads.py`,
  `business/value_pricing.py`, `business/roi.py`, `business/lifecycle.py`).

Strength for cor-sys goes from `3*` (inferred) to **3 (verified)**. The pattern still does not
promote — absorption is observed once, from one source repo — but the inference marker is removed.

**New corollary, promoted with it as a candidate**: `absorption-is-a-copy-not-a-dependency`.
The absorbed tree is a snapshot, so divergence starts immediately and silently; 2 of 10 shared
files had drifted before anyone recorded it. Any future absorption needs either a shared package
or a drift check, not a copy.

Full analysis: `research/cross-repo/portfolio-as-one-mechanism.md`.

---

# Round 3 — pre-call and proofminer deep-dive (2026-08-19)

> Two repos that no scan had seen, both among the four currently active, deep-dived on the same
> Phase 1 protocol. Sources: `/research/pre-call/extracted-insights.md` (6 observations),
> `/research/proofminer/extracted-insights.md` (6 observations).

## 3.1 Retest of the Round-2 promotions

| Pattern | pre-call | proofminer | Verdict |
|---|---|---|---|
| agent-identity-collapse | 0 | **3** | **Now 3 repos** (MATI 55/86, proofminer **193/229**, lessons 14/37). Settled: this is the portfolio's dominant authoring mode by volume, not an edge case. pre-call is the counter-case — 146 of 185 commits attributed, 113 trailers. |
| adversarial-second-surface | 2 | **3** | **Now 5 repos** and sharpened: in proofminer all 16 Claude commits are *epistemic* corrections ("The text layer was fabricating evidence. Stop it."), not defect fixes. See new row `adversary-hunts-assertions-not-defects`. |
| contract-check-as-ci-gate | 3 | 2 | Confirmed. pre-call adds the strongest form: a stopping rule whose P is measured over 400 runs. |
| commercial-doc-as-spec | **3** | 2 | **Now 4 repos.** pre-call states a *negative* scope claim — the customer it does not serve — which is the strongest form observed. |
| gate-left-behind-by-the-fix | 3 | 2 | Confirmed. |
| claude-branch-as-default-branch | 0 | 0 | Not observed; both have `main`. |
| resumption-gap-predicts-pivot-vs-continuation | 0 | 0 | Not applicable — neither has a gap yet. |
| branch-as-sprint-container | 3 | 3 | Confirmed, and refined by `branch-as-claim` below. |
| editorial-commit-voice-escalation | 3 | 3 | Confirmed. proofminer's split is discontinuous, not gradual: 212 empty bodies from the builder, argumentative imperatives from the reviewer. |
| language-splits-by-agent-surface | 1 | 0 | **Weakened.** pre-call's Hebrew/English split follows the *document* (README and method docs Hebrew, commits English), not the surface. Stays a 1-repo candidate on MATI. |

## 3.2 New rows

| Pattern | pre-call | proofminer | other | Strength | Promoted? | Dimension |
|---|---|---|---|---|---|---|
| measured-stopping-rule | 3 | 0 | — | weak-1-repo | No — but it is the portfolio's best C9 implementation | user-to-user |
| dod-unsatisfiable-by-code | 3 | 1 | MATI 2 | strong-2-repos | **Yes** | user-to-user |
| adversary-hunts-assertions-not-defects | 2 | 3 | CRM 2 | strong-2-repos | **Yes** | claude-to-claude |
| authority-boundary-as-named-artifact | 2 | 3 | MATI 3, anti-silo 2 | strong-3-repos | **Yes** | user-to-claude |
| branch-as-claim | 3 | 1 | — | weak-1-repo | No | claude-to-user |
| bypass-log | 3 | 0 | — | weak-1-repo | No — but nothing else in the portfolio instruments its own gate's evasion | claude-to-claude |
| programmatic-branch-naming | 0 | 3 | — | weak-1-repo | No | claude-to-claude |
| meta-tooling-co-shipped-with-product | 0 | 3 | cor-sys 3 | strong-2-repos | **Yes** (promoted from Phase-2 candidate) | user-to-user |
| archive-branch-for-abandoned-agent-work | 0 | 3 | — | weak-1-repo | No | claude-to-claude |

### Row definitions

- **dod-unsatisfiable-by-code** — a definition of done deliberately built so the operator's
  strongest capability cannot satisfy it. pre-call: *"Every condition here requires a stranger.
  None of them can be completed by writing code."* Thresholds locked before the round, each
  labelled with its provenance, and the arbitrary one labelled arbitrary.
- **adversary-hunts-assertions-not-defects** — the second surface is briefed to find unsupported
  claims, not crashes. The builder's characteristic failure is fabrication: an interface that can
  render a confident output will render one from a weak input, and the builder cannot audit that
  because it is the thing generating the confidence.
- **authority-boundary-as-named-artifact** — the machine/human decision boundary written as its own
  document and implemented as its own module. Four independent forms: proofminer's six-axis
  `AUTHORITY.md` + `src/engine/authority.js`, MATI's `organizationalAuthority()`, CRM's
  `provenance.py`, anti-silo's `eligible.py` TRUST_BOUNDARY. Only proofminer carries a
  **reversibility** axis.
- **bypass-log** — a committed record of the occasions the gate was gone around. A gate with no
  bypass record is indistinguishable from a gate nobody needed to bypass.

## 3.3 Promoted count after Round 3

| Dimension | after Round 2 | Round 3 additions | Total |
|---|---|---|---|
| claude-to-user | 3 | — | 3 |
| user-to-claude | 4 | authority-boundary-as-named-artifact | 5 |
| claude-to-claude | 8 | adversary-hunts-assertions-not-defects | 9 |
| user-to-user | 9 | dod-unsatisfiable-by-code; meta-tooling-co-shipped-with-product | 11 |

Total promoted: **29**. Single-repo candidates: **26**.

## 3.4 What these two repos say about `lessons`

`portfolio-as-one-mechanism.md` §6 listed five components `lessons` is weakest at. pre-call and
proofminer already implement four of them, better:

| `lessons` gap (§6) | Implemented in |
|---|---|
| no accuracy measurement | pre-call `docs/stopping-rule.html` — P measured over 400 runs per failure mode, synthetic and real reported side by side with the real one worse |
| no provenance guard on insights | proofminer `docs/AUTHORITY.md` + `src/engine/authority.js` — six axes including Certainty |
| promotion is one bit | proofminer's six-axis classification; pre-call's six binary DoD conditions with locked thresholds |
| confidence scored once, never re-rated | pre-call's status column, re-tested and dated (`D4` reads "no — tested today: `not_configured`") |

The fifth gap — no gate-evasion record — is met by pre-call's **bypass log**, which nothing else
in the portfolio has, `lessons` included.

---

# Round 4 — `_crm` deep-dive (2026-08-19)

> The Ownership Engine: 257 commits, 70 docs, 127 test modules, and the largest authorship gap in
> the portfolio. Source: `/research/_crm/extracted-insights.md` (6 observations).

## 4.1 Retest

| Pattern | _crm | Verdict |
|---|---|---|
| model-version-in-trailer | **3** | **Now 3 repos** (COR-SYS, groundstate-protocol, _crm) and _crm is the richest: all 211 trailers name the model, 153 also record the context window (`Opus 4.8 (1M context)`) |
| agent-identity-collapse | 2 | Present in a **new form**: 23× undercount with **zero** cadence bursts. Neither detector reaches it alone — only the trailer survives. Fills the last empty cell of the authorship 2×2 |
| authority-boundary-as-named-artifact | 3 | **Now 5 repos.** `core/consent.py` fails closed to `local_only`; `core/provenance.py` flags coach-supplied language as hollow |
| commercial-doc-as-spec | 3 | **Now 5 repos**, and one level up: model cards, a DPIA, an incident-response plan and a trust ledger — written before any user exists |
| adversary-hunts-assertions-not-defects | 2 | Holds — `core/provenance.py` is the artifact, not a reviewer |
| dod-unsatisfiable-by-code | 2 | Holds in spirit: the G1 verdict is a claim downgrade no amount of code can reverse |
| contract-check-as-ci-gate | 3 | `test_trust_ledger.py`, `test_methodology_promotion.py`, `test_no_pii_in_research_outputs.py` — domain policy as tests |
| claude-branch-as-default-branch | 0 | Not observed — and notably **no agent-named branches at all** despite 211 AI-paired commits |

## 4.2 New rows

| Pattern | _crm | other | Strength | Promoted? | Dimension |
|---|---|---|---|---|---|
| self-refuting-kill-test | 3 | pre-call 2, Agent-Architect 1 | strong-2-repos | **Yes** | user-to-user |
| claim-downgrade-ledger | 3 | Agent-Architect 3, pre-call 2 | strong-3-repos | **Yes** | claude-to-user |
| external-corpus-validation | 3 | — | weak-1-repo | No — but it is the only break in the self-scoring loop found anywhere | user-to-user |
| result-reported-with-its-own-ceiling | 3 | pre-call 2 | strong-2-repos | **Yes** | claude-to-user |
| failure-case-shipped-beside-success-case | 3 | — | weak-1-repo | No | user-to-user |
| per-project-git-identity | 3 | anti-silo 2 | strong-2-repos | **Yes** | claude-to-claude |

### Row definitions

- **self-refuting-kill-test** — a test whose possible outcomes include destroying the number the
  product is sold on, actually run. `_crm` G1: ICC 0.89 within-Opus collapses to **0.115**
  cross-family, and the claim is downgraded in the trust ledger. A test that can only confirm or
  be inconclusive is decoration.
- **claim-downgrade-ledger** — a durable record of a claim's strength *moving*, with what moved it.
  `_crm`'s trust ledger (with `test_trust_ledger.py` enforcing it), Agent-Architect's confidence
  ladder, pre-call's re-tested status column.
- **result-reported-with-its-own-ceiling** — the limit travels in the same sentence as the number.
  `_crm`: "rank-accuracy 1.0 … a perfect rank at n=3 is p~0.17 (not significant)". pre-call:
  synthetic 49/49 printed beside real 2/3.
- **per-project-git-identity** — the operator carries a different git identity per project
  (`Erez (COR-SYS)`, `Erez`, `ereztash`). Any per-author metric across the portfolio double- or
  triple-counts one person.

## 4.3 Promoted count after Round 4

| Dimension | after Round 3 | Round 4 additions | Total |
|---|---|---|---|
| claude-to-user | 3 | claim-downgrade-ledger; result-reported-with-its-own-ceiling | 5 |
| user-to-claude | 5 | — | 5 |
| claude-to-claude | 9 | per-project-git-identity | 10 |
| user-to-user | 11 | self-refuting-kill-test | 12 |

Total promoted: **33** (29 + 4). Single-repo candidates: **28**.

## 4.4 `_crm` is the answer to the gap `lessons` closed today only partly

`ground-truth/results-2026-08-19.md` measured the tier classifier against a 10-repo answer key and
called it a self-audit — one labeller, one session, not blind. `_crm` shows what the next step looks
like, and it is not "more repos":

| `lessons` today | `_crm` |
|---|---|
| one model family scored every pattern strength | three model families rate blind; cross-family ICC is **the** result |
| answer key built by the same session that ran the classifier | validated against **AnnoMI**, 133 public sessions nobody here produced |
| ρ=0.77 reported without a confidence interval | "perfect rank at n=3 is p~0.17 (not significant)" in the same sentence |
| accuracy disclosure appended to one playbook | a trust ledger with a test that fails when a claim outruns it |

The cheapest of these to adopt is the last-but-one: **score the tier classifier against repos from
an account this operator does not own.** Everything in `ground-truth/` is currently scored on
artifacts the operator produced, which cannot separate "the classifier works" from "the classifier
fits this author."

---

# Round 5 — cross-family blind re-rating (2026-08-19)

Fifteen load-bearing cells were re-scored blind by two other model families under
`ground-truth/rater-protocol.md`. Full result and confounds: `ground-truth/interrater-2026-08-19.md`.

**Verdict, ported from `_crm`'s G1 in the same words it used on itself: the strengths in this file
have not been shown to be model-independent.** Sonnet reproduced 12 of 15 exactly (mean |diff|
0.27); haiku 8 of 15 (1.13). Cross-family ICC(2,1) = **+0.068**, but the item set is
range-restricted by my own selection (incumbent sd 0.34), so the ICC cannot adjudicate this — a
defect in the test, not a result from it.

## 5.1 Changes made

| Cell | Was | Now | Why |
|---|---|---|---|
| `contract-check-as-ci-gate` @ anti-silo | 2 | **3** | Sonnet cited `tests/test_reachability.py`, `test_grounding_permit.py`, `test_file_length.py` (250-line ceiling), all run by pytest in CI. **Verified.** The incumbent under-counted domain-policy gates |

No other score was changed. Where a rater disagreed and the disagreement was interpretive rather
than factual, the incumbent score stands and the disagreement is recorded below.

## 5.2 Open challenge — `adversarial-second-surface`

Sonnet independently scored MATI **1** (incumbent 3) and anti-silo **2** (incumbent 3) on the same
ground: the row definition says the second surface *never ships a feature*, but MATI's review branch
also shipped a test suite, bug fixes and a state migrator, and anti-silo's richest adversarial
episode was committed together with its own fixes.

The promotion survives — anti-silo 2 + proofminer 3 clears `≥2 in ≥2 repos` under sonnet's scores.
The strength claim does not. **This is deliberately not resolved by rewriting the definition**,
which would be tuning a rule after seeing a disconfirming rating. It is the first item for a third
rating or an explicit definitional decision.

## 5.3 Evidence the blind raters found that the deep-dives missed

- **`_crm` has a second self-kill.** `LOG.md:1824` "Adversarial falsification battery + the
  reproduced headline number" — `META-XGBoost … FAILED`, `BOTH … FAILED their permutation tests =>
  the cross-domain transfer is first-person agency, not a deep construct. Reported as a negative,
  not buried.` Verified. `self-refuting-kill-test` @ `_crm` rests on two artifacts, not one.
- **`per-project-git-identity` is stronger than recorded.** `Erez (COR-SYS)` spans **two** email
  addresses (`Erez2812345@gmail.com` ×144, `hnoar.hr@gmail.com` ×81). The deep-dive recorded the
  name and missed the second address.
- **A rater fabricated a citation.** Sonnet cited `docs/OFFER.md` in anti-silo; the file does not
  exist. A blind rater's justification is evidence to check, not evidence.
