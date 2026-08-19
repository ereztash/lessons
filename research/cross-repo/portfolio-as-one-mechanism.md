# The Portfolio as One Mechanism

> Written 2026-08-19, after the +5-repo ingestion round. Reads all 12 in-scope repos as a single
> machine, decomposes that machine into components, and maps each component onto a process that
> already exists inside `lessons`.
>
> Every claim below is anchored to a file or a measurement. Where a component is absent, that is
> stated as absent rather than inferred.

---

## 1. The claim

These are not twelve projects. They are **nine independent implementations of one engine**, plus
two landing pages and a contacts list.

The engine:

> Take an unstructured human artifact. Extract deterministic signals from it. Score the signals
> against a fixed rubric. Refuse to assert past what the evidence supports. Aggregate across
> independent cases until a threshold is cleared. Emit a priced, actionable artifact — with a
> hard boundary between what the machine may decide and what a human must.

What changes between repos is only the **input substrate**:

| Repo | Substrate it ingests | What it emits |
|---|---|---|
| CRM_Google_ai / `_crm` | coaching-conversation transcripts | an Ownership score + a price |
| agency-insight-analyzer | a coaching transcript | a "mirror, not judge" report |
| MATI | an instructor's yearly reflection | a formative reading + an organizational signal pack |
| anti-silo | organizational documents | a contradiction/eligibility verdict per source |
| Agent-Architect | a consulting transcript | a bottleneck diagnosis + a first runnable agent |
| COR-SYS | an organization's questionnaire | a DSM diagnosis + intervention protocol |
| ampaign-craft | a business's own inputs | funnel/pricing/differentiation guidance |
| Benchmark.ATS | 50 résumés | an accuracy score for someone else's extractor |
| **lessons** | **git repositories** | **an insight + a playbook + a price** |

`lessons` is not a meta-layer above the portfolio. It is the ninth instance of the same engine,
and the only one whose substrate happens to be the other eight.

## 2. The portfolio is also literally one codebase in places

Not just conceptually. Measured 2026-08-19:

- `COR-SYS/src/types/growth/` and `ampaign-craft/src/types/` share **10 filenames**, of which
  **8 are byte-identical** (`differentiation.ts`, `funnel.ts`, `importedData.ts`, `meta.ts`,
  `qa.ts`, `research.ts`, `saasRetentionMoats.ts`, `supabase-types.ts`). Two have already drifted
  (`pricing.ts` 120 vs 118 lines, `retention.ts` 84 vs 85).
- `COR-SYS/src/components/growth/` holds 48 components against ampaign-craft's 136 — roughly a
  third of the product, copied under a `growth/` namespace.
- `CRM_Google_ai` carries the same module vocabulary again in Python: `growth/icp.py`,
  `growth/leads.py`, `business/value_pricing.py`, `business/roi.py`, `business/lifecycle.py`.

This upgrades `absorbed-rather-than-shipped` from **inferred** (via COR-SYS PR#16) to **verified at
the byte level**, and adds a corollary: the absorption is a *copy*, not a dependency, so the two
trees began diverging immediately. Two of ten files diverged before anyone noticed.

## 3. The nine components

Each row is a component of the one engine. Each cell is the artifact that implements it.

| # | Component | Where it is strongest | Also in |
|---|---|---|---|
| C1 | **Intake & scrub** | `Agent-Architect/pipeline/stages/00-privacy-scrubbing.md` | anti-silo `ingest_extract.py`; CRM `transcript_mining.py`; MATI work-session form; agency-insight upload flow |
| C2 | **Deterministic extraction** | `MATI/lib/organizational-signals.ts::extractOrganizationalSignals` — carries no free text by construction | anti-silo `contradiction_rules.py`; COR-SYS `dsm-engine.ts`; Agent-Architect stages 03–05 |
| C3 | **Rubric scoring** | `COR-SYS/src/lib/dsm-engine.ts` — DR/ND/UC/SC with published α (.872/.881/.893) and inter-axis correlations | CRM `scoring_protocol.py` (0–10 × 3 raters); MATI `lib/stages.ts`; lessons F1–F4 |
| C4 | **Provenance guard** | `CRM_Google_ai/core/provenance.py` — flags a score whose *language origin* was the coach, not the client, as PROVENANCE-RISK: "a likely hollow score that will regress… must not celebrate or price on it until ownership is verified" | anti-silo `trust_origin` + source hashes; Agent-Architect `07-evidence-grounding` + "Speculative-Flag Provenance" |
| C5 | **Promotion / threshold gate** | `anti-silo/anti_silo/promotion.py` — `blocked_tiers` / `review_tiers` over evidence tiers (`source_backed`, `corroborated_no_source`, `indexed_unverified`, `refuted_or_blocked`) | MATI `classifySystemicPattern`; lessons patterns-matrix rule |
| C6 | **Authority boundary** | `MATI/lib/organizational-signals.ts::organizationalAuthority` — `detect \| surface \| suggest_inquiry` = automatic; `diagnose_cause \| set_policy \| act` = human-required or forbidden | CRM `core/consent.py` (defaults to `local_only`, fails closed); ampaign-craft's "draft = every step except the last irreversible one; HITL only at the last step" |
| C7 | **Cross-case aggregation** | `MATI/app/org/organizational-console.tsx` + privacy floor of 5 contributors | COR-SYS `src/lib/cbr/` (retrieve–reuse–revise–retain); CRM `meta_insights.py`; lessons patterns-matrix + MOCs |
| C8 | **Packaging & pricing** | `CRM_Google_ai/business/value_pricing.py` + `roi.py` + `sprint_close.py` | Agent-Architect `product/` (`OFFER.md`, `report.py`); anti-silo `gui/client_report.py` + `INVESTOR_BRIEF.md`; lessons `products/` |
| C9 | **Calibration & ground truth** | `Benchmark.ATS` — 50 labelled résumés + `ats_validation_script.py` computing `overall_accuracy` against source-of-truth JSON | Agent-Architect `fixtures/` + `docs/confidence-ladder.md`; COR-SYS `cbr/metrics.ts` + `calibration-cases.ts`; CRM 3-rater consensus (ICC/SEM/MDC vs Shrout-Fleiss + Krippendorff) |

## 4. The same gate, written three times, in three languages

The clearest proof that this is one mechanism: **C5 and C6 are structurally identical across repos
that share no code.**

**MATI** (`lib/organizational-signals.ts`, TypeScript):

```
contributors >= 2                                        -> local_cluster
contributors >= 5 && contexts >= 2                       -> cross_context_pattern
contributors >= 5 && contexts >= 2 && periods >= 2       -> persistent_pattern
+ adverseShare >= 0.5 && highImpact                      -> systemic_candidate
maySurfaceToOrganization = classification not in {local_observation, local_cluster}
```

**lessons** (`research/cross-repo/patterns-matrix.md`, prose):

```
strength >= 2 in >= 2 repos  -> promoted
weak-1-repo                  -> candidate, never promoted
```

**anti-silo** (`anti_silo/promotion.py`, Python): evidence tier decides `block` / `review` / promote,
and `eligible.py` states the boundary explicitly —

> `grounding_eligible_does_not_mean`: product usage, user value, field adoption, **semantic truth**,
> business validation.

Three repos, three languages, one rule: *count independent occurrences across independent contexts;
below the threshold the finding stays private; above it, it may be surfaced but still may not be
asserted as cause.*

And the five-factor gate appears twice. Agent-Architect's `docs/confidence-ladder.md`:

```
C = Diagnostic Fit × Recipient Fit × Execution Fit × Evidence Fit × Transfer Fit
```

lessons' monetization gate: Reusable × Defensible × Time-saving × Encodable × Evidence-anchored,
4 of 5 required to ship. Agent-Architect's **Transfer Fit** ("can another runner produce a
structurally similar result?") is lessons' **Reusability test** ("does the insight survive
substituting a repo name?") — the same question, on a different substrate.

## 5. Component → the process `lessons` already has

| Component | Existing process in `lessons` | File |
|---|---|---|
| C1 Intake & scrub | `/lesson-capture` → append raw observation with timestamp + dimension-guess | `pipelines/insight-extraction.md` Step 1 |
| C2 Deterministic extraction | `workflow-archaeologist` skill — 6-artifact repo survey | `.claude/skills/workflow-archaeologist.md` |
| C3 Rubric scoring | Four-Feature Tier classifier (F1–F4) + `dimension-router` | `research/portfolio-scan/26-repos.md`, `.claude/skills/dimension-router.md` |
| C4 Provenance guard | "Evidence or defer" + `evidence-pointers` front-matter + `<inferred>` marking + (new) `scripts/detect-agent-authorship.sh` | `pipelines/execution-rules.md` Rule 1; `insights/_template.md`; LOG anti-pattern #9 |
| C5 Promotion gate | ≥2 repos × strength ≥2 → promoted; `cross-repo-comparator` | `research/cross-repo/patterns-matrix.md`; LOG anti-pattern #2 |
| C6 Authority boundary | monetization gate 4/5; "if a task contradicts the gate → report, don't skip"; GATE 0 blocking reads | `pipelines/monetization-audit.md`; `CLAUDE.md` |
| C7 Cross-case aggregation | patterns-matrix + the four MOCs | `index/MOC-*.md` |
| C8 Packaging & pricing | `/lesson-ship` → `products/playbooks/*` + `pricing-hypotheses.md` | `products/` |
| C9 Calibration & ground truth | **`stability-test.ts` (self-consistency) and `crp-lint.ts` (conformance) — no accuracy harness** | `saas/app/scripts/` |

Eight of nine map cleanly. The ninth is the finding.

## 6. What the mapping exposes

### 6.1 `lessons` measures stability and conformance, never accuracy

`saas/app/scripts/genesis/stability-test.ts` runs the elicitor N times on one input and measures
whether the output is *consistent* (`entityJaccard >= 0.80`, `sharpnessStdDev <= 5.0`).
`saas/app/scripts/crp-lint.ts` checks whether a repo *conforms* to a protocol.

Neither compares an output to a known-correct answer. `lessons` has never measured whether its
tier classifications are **right** — only whether they are repeatable and well-formed. A biased
extractor scores perfectly on both.

The portfolio contains the missing harness. `Benchmark.ATS` exists solely to hold 50 labelled
cases and compute `overall_accuracy` for someone else's extractor, and has been dormant 274 days.
`CRM_Google_ai` goes further with three independent raters and a consensus step validated against
Shrout-Fleiss ICC and Krippendorff's alpha.

**The gap in lessons is the whole purpose of another repo in the same portfolio.**

### 6.2 There is no provenance guard on the insights themselves

C4 is the component `lessons` is *weakest* at, despite "Evidence or defer" being Rule 1. The rule
checks that a pointer **exists**. `CRM_Google_ai/core/provenance.py` checks something else entirely:
whether the *language of the claim* originated with the subject or with the analyst — and flags the
second case as a hollow score that must not be priced.

The direct analogue for `lessons`: an insight whose framing came from Claude rather than from the
repo. Nothing currently guards it, and this session produced a live instance —
`claude-coauthored-trailer-convention` was scored 3 for groundstate-protocol because the *narrative*
said so, while the repo's actual trailers name the human. Both files had pointers. Both passed
Rule 1. The pattern was hollow for four phases.

CRM's guard, transposed: *an insight whose evidence-pointers all resolve to prose written by Claude
(a MOC description, a synthesis paragraph) rather than to a commit, file or PR, is PROVENANCE-RISK
and may not be shipped as a playbook until re-anchored.*

### 6.3 Promotion is binary here and graded everywhere else

MATI has five rungs and, critically, two separate flags: `maySurfaceToOrganization` and
`mayAssertCausality`. A pattern can be reportable without being assertable as a cause.

`lessons` has one bit. Once promoted, a pattern becomes a playbook that sells a causal claim — and
anti-silo's explicit disclaimer (`grounding_eligible_does_not_mean: … semantic truth …`) has no
counterpart anywhere in `products/`.

### 6.4 Confidence is scored once and never re-rated

Agent-Architect's `confidence-ladder.md` records confidence **moving** across runs: 65–70% →
70–75% → 72–77% → **76–82%**, each step tied to a named fixture run, with a target before paid beta.

Every insight in `lessons` carries a single `monetization-score` set on the day it was written, and
no insight has a second score recorded. The auditor skill lists "an existing insight's audit needs
re-running because new evidence shifted the score" as a trigger; it has never fired.

### 6.5 Where `lessons` is ahead, and should export

Two components are stronger here than anywhere else in the portfolio:

- **The authorship-attribution method** (`scripts/detect-agent-authorship.sh`, added this round).
  No other repo measures who wrote its own contents. MATI, whose history is 94% agent-written under
  the operator's identity, has no idea.
- **The append-only enforcement spine.** `LOG.md`'s numbered anti-pattern table survives across
  sessions and blocks the same mistake twice. Only COR-SYS and `_crm` have a `LOG.md`; MATI,
  anti-silo and Agent-Architect — the three most active repos — have none, and MATI's contract
  checks re-derive from scratch what a LOG entry would have stated once.

## 7. What follows

Ordered by evidence strength, not by appeal:

1. **Give `lessons` a ground-truth set.** Hand-label the tier and dormancy verdict for 10 repos
   independently of the classifier, then measure the classifier against them. `Benchmark.ATS` is
   the working template and is dormant. Until this exists, every tier number in this repo is a
   precision claim with no accuracy claim behind it.
2. **Add the provenance-risk flag to `insights/_template.md`.** One front-matter field:
   `evidence-resolves-to: commit | file | PR | prose`. Any insight whose pointers resolve only to
   prose is blocked from `/lesson-ship`. Directly ported from `core/provenance.py`.
3. **Split the promotion bit in two**, following MATI: `may-report` and `may-assert-cause`. The
   17 Phase-2 patterns were promoted under a single bit and shipped as causal playbooks.
4. **Make the monetization score a ladder, not a stamp**, following `confidence-ladder.md` —
   record the score's movement and what moved it.
5. **Put a `LOG.md` in MATI and anti-silo.** They are the active frontier and the only Tier A
   repos with no anti-pattern memory. The evidence that this matters is in this repo's own history:
   H3 was refined to "the *habit* causes; the file format is incidental" — the habit has no home
   in the two repos where the work now happens.

## 8. What this does not claim

- The four Tier-D placeholder repos and the two landing pages (`brain-healer-hub`,
  `ground-state-protocol` at HEAD) are **not** instances of the engine. They are a webinar page and
  a landing page. Counting them in would inflate the pattern.
- `All_Erez-s_Connections` is a 6-commit Express server over a `people.json`. It is C1 with no C2–C9.
- The isomorphism is between **components**, not outcomes. That six repos implement the same gate
  says nothing about whether any of them is correct — which is precisely what §6.1 is about.
