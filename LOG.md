# LOG — Enforcement Spine

> This file IS the enforcement mechanism. Read every session. Update at /lesson-checkpoint and end of session.

## Environment Facts

| Fact | Value | Last verified |
|------|-------|---------------|
| Target branch | `claude/analyze-workflow-optimization-3NhlH` | 2026-05-12 |
| GitHub access | `mcp__github__*` MCP tools only | 2026-05-12 |
| `gh` CLI | NOT AVAILABLE — use GitHub MCP | 2026-05-12 |
| Repo scope | **12 repos under ereztash in session scope** (see CLAUDE.md) | 2026-08-19 |
| Repos deep-dived | **11** (cor-sys, groundstate, chess-mind, core-unified + MATI, anti-silo, Agent-Architect, CRM_Google_ai, agency-insight-analyzer + **pre-call, proofminer**) | 2026-08-19 |
| Dataset size | n=30 (was n=25) | 2026-08-19 |
| **AI-authorship counting** | **`git log --author` is NOT sufficient — run `scripts/detect-agent-authorship.sh`** | 2026-08-19 |
| Currently active repos | **4**: MATI (0d), **pre-call (0d)**, **proofminer (3d)**, anti-silo (3d). All 4 originally deep-dived repos dormant 33–132d | 2026-08-19 |
| **Classifier accuracy (measured)** | **20% exact / 90% within-1 / 8-of-10 over-rated, ρ=0.77 — n=10 self-audit** | 2026-08-19 |
| Ground-truth harness | `ground-truth/` + `scripts/collect-outcome-evidence.sh` + `scripts/score-classifier.py` | 2026-08-19 |
| **Contract gate** | **`scripts/check-lessons-contract.py` — 6 rules, exit 1 on violation, `--bypass` records to `ground-truth/bypass-log.md`** | 2026-08-19 |
| Playbook claim strength | 4 causal · 3 observational — R6 blocks a playbook out-claiming its insights | 2026-08-19 |
| Gate reliability | measured: gate-correctness P≥0.50, instrument-design P≥0.375 — `ground-truth/gate-reliability.md` | 2026-08-19 |
| Evidence pointers | all 17 insights resolve to commits/files/PRs; 43 clock-pointers re-anchored | 2026-08-19 |
| Portfolio size (actual) | **40 repos** via `list_repos`. All 40 now scored — cohort 1 (31) + cohort 2 (9) | 2026-08-19 |
| Tier source of truth | `ground-truth/scores-2026-08-19.tsv` (F1–F5, 31 repos). `repo-index.md` tiers are superseded | 2026-08-19 |
| Dormancy measurement | measure **all refs**, not the default branch (`Contradiction_loss`: 77d vs 282d) | 2026-08-19 |
| Repo-name collision | 4 ground-state repos share root `b331aa1a`; **3 byte-identical at HEAD**, 1 continued to 311. **`/research/groundstate-protocol/` describes the PUBLIC one** (2 of its 13 cited SHAs exist only there) | 2026-08-19 |
| Default language (machine files) | English | 2026-05-12 |
| Default language (user-facing /index, /profile) | HE+EN bilingual | 2026-05-12 |
| Current phase | Phase 4 + gap-closure + **+5-repo ingestion round** complete | 2026-08-19 |
| cor-sys commit count (verified) | 71 commits, matches Phase 1 survey | 2026-05-12 |
| cor-sys PR count (verified) | 16 PRs (13 merged, 3 closed unmerged) | 2026-05-12 |
| cor-sys issues count (verified) | 0 (open + closed combined) | 2026-05-12 |
| Total raw observations gathered | **76** (43 across 4 repos + 21 across 5 + 12 across pre-call/proofminer) | 2026-08-19 |
| Promoted cross-repo patterns | **29** (17 Phase 2 + 7 Round 2 + 4 Round 3 + model-version-in-trailer) | 2026-08-19 |
| Skills built (Phase 3) | 5 | 2026-05-12 |
| Commands built (Phase 3) | 6 | 2026-05-12 |
| Insights distilled (Phase 4 + gap-closure) | 11 (5 prior + 6 new) | 2026-05-12 |
| Playbooks shipped (Phase 4 + gap-closure) | 6 + 1 meta-playbook | 2026-05-12 |
| CampaignCraft 5th-repo profile | absorbed-rather-than-shipped (PR#16 inferred); profile at `/research/cor-sys/campaigncraft-absorption-detail.md` | 2026-05-12 |
| Maya self-application test verdict | PASS; system handled hypothetical 6th-repo data without breakage | 2026-05-12 |
| **CI state** | **14 of 14 workflow runs FAILED, 2026-05-12 → 2026-09-02.** Root workflow ran `npm ci` with no root `package.json`. Replaced 2026-09-03 with the contract gate + positive control | 2026-09-03 |
| **Test files in repo** | **0.** `saas/app` declares `"test": "vitest run"`; no spec files, no vitest config | 2026-09-03 |
| **`saas/app` typecheck** | **8 errors** (`npx tsc --noEmit`). Code is marked SUPERSEDE/ARCHIVE; deliberately not added to CI | 2026-09-03 |
| **Portfolio size** | **derive, never state**: `cut -f1 ground-truth/scores-2026-08-19*.tsv \| grep -v '^repo$' \| sort -u \| wc -l` → 40 | 2026-09-03 |
| **Current phase** | **Re-foundation complete. Decision `PROCEED_SERVICE_ONLY`** (`docs/REFOUNDATION_DECISION.md`) | 2026-09-03 |
| **Authority for "which doc answers what"** | `docs/AUTHORITY_MAP.md` | 2026-09-03 |
| **Frozen artifacts** | `research/re-foundation/DO_NOT_TOUCH.md`; prospective test resolves 2026-11-17 | 2026-09-03 |

## Pre-Research Validation Protocol

Before deep-diving into a repo, verify (≤2 min):

```
1. mcp__github__list_branches(owner, repo) — confirm branch landscape
2. mcp__github__list_commits(owner, repo, perPage=100) — confirm commit count matches expectations
3. mcp__github__list_pull_requests(owner, repo, state='all') — confirm PR count
4. mcp__github__list_issues(owner, repo, state='OPEN'|'CLOSED') — confirm issue presence
```

Mismatch with expectations (Phase 1 exploration data) → re-read original survey before proceeding.

## Pre-Synthesis Validation Protocol (added Phase 2)

Before promoting any pattern to a MOC, verify:

```
1. Pattern appears in ≥2 source extracted-insights.md files
2. Each occurrence is scored ≥2 (moderate) in the patterns-matrix
3. Evidence pointers (cor-sys@<sha> form) resolve to real commits/PRs in the source surveys
4. Dimension classification is single — not multi-dimension claim
5. If the pattern is single-repo, it stays in the candidate section of the MOC, not the promoted section
```

Mismatch → reduce to candidate-tier, do not promote.

## Pre-Monetization-Audit Protocol (added Phase 3)

Before scoring an insight on the 5 criteria, verify:

```
1. Insight has front-matter conforming to /insights/_template.md schema
2. Source MOC pattern is in promoted section (not candidate)
3. Evidence-repos in front-matter contains ≥2 repos
4. Evidence-pointers resolve to repo@HH:MM observations that exist
5. Failure-mode section names a specific failure mode AND hours estimate
```

Mismatch → return insight to distiller for correction; do not audit.

## Pre-Ship Protocol (added Phase 4)

Before writing a playbook, verify:

```
1. Source insight has monetization-score ≥4/5
2. Target buyer is named (a specific segment, not "everyone")
3. Rework-hours-saved estimate is present in the insight
4. The aggregated insights (if multiple) share a coherent buyer
5. Evidence pointers in the playbook trace back to repo@HH:MM observations
```

Mismatch → reject the ship; return to /lesson-monetize for verdict refresh or to /lesson-distill for missing pieces.

## Pre-Gap-Closure Protocol (added gap-closure round)

Before writing a gap-closure artifact, verify:

```
1. The gap is explicitly named in the Phase 4 report's Data Gaps section (or in the gap-closure brief)
2. The closure artifact references the prior phase's evidence (not net-new research without grounding)
3. If the closure invokes a hypothetical case (e.g., Maya self-application test), every observation is explicitly marked HYPOTHETICAL
4. State updates (MEMORY.md, LOG.md, patterns-matrix.md, MOCs) accompany every artifact addition
5. The closure does not silently change any prior verdict; if a verdict is updated, mark it as updated and cite the new evidence
```

Mismatch → reject the closure; clarify scope before writing.

## Pre-Authorship-Claim Protocol (added 2026-08-19 ingestion round)

Before writing any sentence of the form "repo X used AI tool Y" or "N of M commits were AI-written":

```
1. Run scripts/detect-agent-authorship.sh <repo>
2. Read BOTH detector outputs — identity (author/trailer/session link) AND cadence (bursts)
3. If in_burst > (bot + claude), the repo has an unattributed agent surface:
   report the AI share as a RANGE, never a single number
4. Check the trailer's subject: `Co-Authored-By: Claude` and
   `Co-authored-by: <the human>` are opposite conventions, not variants of one
5. "AI tools: none detected" is never a finding — it is an unrun measurement.
   Say "not verified" unless both detectors were run.
```

Mismatch → do not write the claim. Every "none detected" that was checkable in this portfolio
proved wrong (`Benchmark.ATS`).

## Anti-Patterns (Rules)

Each anti-pattern is a documented mistake + rule. Append, never edit.

| # | Mistake | Rule |
|---|---------|------|
| 1 | Phase 1 cor-sys deep-dive agent hit rate limit at end of session before returning summary, but had already written all 6 artifacts | Always verify artifacts via `get_file_contents` even if agent returned mid-failure; trust the GitHub state, not the agent's status report. |
| 2 | Phase 2 risk: claiming a pattern as cross-repo when it actually only appears in one repo with different framings in others | Promotion gate is binary: pattern must appear with strength ≥ 2 in ≥ 2 repos. Single-repo phenomena are valid synthesis findings but stay as candidates, not promoted patterns. The promotion column in patterns-matrix.md is the canonical record. |
| 3 | Phase 2 risk: confusing the matrix dimension ("which dimension does this pattern primarily affect?") with the source-observation dimension-guess (the guess on the raw observation) | The matrix row's dimension is the *final* dimension after cross-repo synthesis; the per-observation dimension-guess is provisional. Resolve in the matrix, not the source files. Each promoted pattern belongs to exactly one MOC. |
| 4 | Phase 2 risk: temptation to over-cite the cor-sys observations (12 of 43 = 28% of dataset) and underweight the abandonment-side observations from core-unified (11 of 43 = 26%) | Both ends of the maturity ladder are equally informative. core-unified's abandonment-diagnostics observations are the *negative control* and are required to claim H2 (publish-button satisfiability) at all. Synthesis must cite both ends, not just the cor-sys end. |
| 5 | Phase 3 risk: scaffolding skills as empty stubs that look operational but cannot be invoked | A skill file must have YAML-ish front-matter (name, when, signals, cascade) AND a populated Procedure / Inputs/Outputs / Examples / Anti-patterns section. Scaffolds without examples are non-operational. Each skill must cite ≥1 worked example drawn from the 43 observations. |
| 6 | Phase 4 risk: shipping a playbook with "everyone" as the target buyer | "Everyone" is a non-buyer. Every playbook MUST name a specific segment (e.g., "solo Lovable-builders on month 2+ with at least one abandoned repo"). The pricing rationale relies on the segment's hourly rate; without a segment, the rationale has no anchor. |
| 7 | Phase 4 risk: skipping the evidence section of the playbook because the insight already has evidence pointers | Buyers read the playbook, not the insight. The playbook MUST include the evidence section with commit SHAs / PRs / repo@HH:MM citations. Trust is built in the playbook, not in the upstream insight file. |
| 8 | Phase 4 risk: pricing each playbook in isolation without considering bundle dynamics | The pricing-hypotheses file MUST include at least one bundle proposal when 3+ playbooks ship in the same session. Solo pricing leaves cross-sell revenue on the table; bundle pricing is the operator's distribution-channel hypothesis test. |
| 9 | Gap-closure risk: treating a hypothetical scenario (e.g., Maya self-application test) as if it were real data | A hypothetical is hypothetical. Every observation derived from it MUST be marked `<inferred>` or `(hypothetical)` to prevent it from being cited as real evidence in future synthesis. The Maya walkthrough at `/research/self-application/maya-walkthrough.md` explicitly states this in section 1; future syntheses must NOT cite Maya@<anything> as if it were a real repo. |
| 10 | Gap-closure risk: shipping a meta-playbook (depends-on another playbook) without front-matter declaring the dependency | A meta-playbook like `ai-review-event-instrumentation.md` MUST have `depends-on: <parent-playbook-slug>` in front-matter and a "Meta-playbook context" section in body. Without this, a buyer who buys the meta-playbook without the parent is set up for failure. Bundle-only pricing for meta-playbooks until the parent has ≥50 sales. |
| 11 | Ingestion round: the n=25 scan's "AI tools" column was built from commit author names, and was wrong wherever it could be checked. The `lessons` repo's own history would have been misclassified by its own method | Never state an AI-contribution figure from `git log --author` alone. Run both detectors (`scripts/detect-agent-authorship.sh`). When cadence bursts exceed identified AI commits, report a range and name the blind spot. See `research/cross-repo/authorship-attribution.md`. |
| 12 | Ingestion round: a promoted Phase-2 pattern (`claude-coauthored-trailer-convention`) was scored 3 for groundstate-protocol, which in fact has **zero** Claude co-author trailers — its 34 trailers name the human | A trailer count is not a trailer *identity*. Before scoring any trailer-based pattern, print the actual trailer lines (`git log --format='%b' \| grep -i co-authored-by \| sort \| uniq -c`) and read who is named. Correct the score in place, in an append-only section, citing the measurement. |
| 13 | Ingestion round: `CRM_Google_ai` scores 3/4 on F1–F4 while containing no original work — it is a whole-tree mirror of another repo | The classifier reads files, so a mirror inherits the source's score. If ≥50% of commits are whole-tree syncs naming another repo, classify as `mirror` and score the source. A mirror also carries the source's `CLAUDE.md`/`LOG.md`, which then address the wrong working tree — rewrite or delete them. |
| 23 | Coverage round: anti-pattern 18 recorded that a deep-dive had been run on the wrong repo of a near-identical name — and then **the error was left to stand in everything already derived from it**. A "correction" to a promoted Phase-2 pattern had been written from the wrong copy (private `ground-state-protocol`, 43 non-merge commits, 0 Claude trailers) and survived four commits before the correct repo (public `groundstate-protocol`, 194 non-merge commits, **76** Claude trailers) was measured. The Phase 2 score was right all along; the correction was the defect | Discovering that you measured the wrong artifact is not the end of the fix — it is the start of it. **Re-check every claim already derived from that measurement**, not only the ones you are about to make. Recording the anti-pattern and moving on leaves the contamination in place. Concretely: when a repo-identity error is found, grep the corpus for every figure sourced from that repo and re-derive each one. |
| 20 | Gap-closure round: the insight migration split evidence lines on commas, which corrupted every pointer carrying a comma inside parentheses — `repo@sha (Index.tsx +82/-24), repo@sha2` became four fragments, one of them the string `chess-mind-patterns` alone | A migration that rewrites evidence must be verified against a case with nested punctuation before it is run over the corpus. Split on delimiters at depth 0 only. And revert-and-redo beats patch-the-output: the corrupted pointers were not fixable by inspection, because a fragment looks like a valid pointer. |
| 21 | Gap-closure round: `check-lessons-contract.py::listfield` required a trailing newline on every list item, so the **last** field of any front-matter parsed as empty. It reported "missing `score-history`" on 15 files that had it — the checker was wrong, the data was right | When a check fails on everything, suspect the check before the corpus. `front_matter()` strips the final newline by construction, so any regex requiring one is guaranteed to misread the last field. |
| 22 | Gap-closure round: `field()` did not strip `# why` comments, so `may-assert-cause: yes  # 6 repos` never equalled `"yes"` and R2 could never fire; and R3 substring-matched the score numerator against the whole history line, where `"2"` matches the `2` in `2026-05-12`, so R3 could never fire either. **Two of five gates passed vacuously.** Found only by deliberately breaking a file to test each rule | **A green check that has never been observed to go red is not evidence.** Every gate must be fired once on a deliberately broken input before its passing is believed — the same defect Claude found in MATI's regex contract checks, reproduced here while porting the fix for it. |
| 19 | Cohort-2 round: three documents stated "only MATI and anti-silo are active" as a portfolio fact. It was an artefact of session scope — `pre-call` (224 commits, active today) and `proofminer` (241 commits, 3d) were simply not visible to a session scoped to twelve repos | A statement about a portfolio is only as wide as the enumeration behind it. Before writing "only X and Y", run `list_repos` and say how many repos the claim covers. Scope-limited findings must carry their scope in the sentence, not in a footnote. |
| 17 | F5 round: `resolve-prediction.py` computed Spearman rho on an outcome with zero variance, got NaN, and — because `NaN > 0` is False — fell through to printing "VERDICT: REFUTED". A dry run against the empty future window caught it; in 90 days with a sparse outcome it would have declared a real result | Any script that prints a verdict must be dry-run against the degenerate case (empty data, zero variance, all-equal ranks) before it is trusted. NaN fails every comparison silently, so a chain of `if`s falls through to whichever branch is last. Guard the statistic explicitly and declare a minimum-variance threshold in advance. |
| 18 | F5 round: `research/groundstate-protocol/` was written about a repo the index calls `groundstate-protocol`, but the deep-dive was run on `ground-state-protocol` — a different repository with 43 commits instead of 311. Two more copies exist (`-32679ce4`, `-02aba105`) | Before deep-diving, record the clone's `git remote get-url origin`, not just a directory name. Near-identical repo names in one account are not a naming quirk — they are separate histories, and a research folder that does not name its remote cannot be re-checked. |
| 15 | Ground-truth round: the first draft of the recommendation cited "`serving ∧ current` separates A perfectly" as evidence for adding feature F5 — but ground-truth A is *defined* as `serving ∧ current ∧ executable`, so the claim was circular | A ground-truth label may never be used as evidence for the feature it was defined by. When proposing a fix derived from an error analysis, state the negative claim (the current features carry no information about X) and say plainly that validating the fix needs a fresh set or a prospective test. |
| 16 | Ground-truth round: the first labelling rule scored `executable` by source-file count (>=5) and required a root manifest, which called `Benchmark.ATS` and `All_Erez-s_Connections` non-runnable and would have mislabelled both | A ground-truth signal must measure the property named, not a correlate of it. Size is not runnability — and size sits close to F1's territory, so it would have leaked the classifier into its own answer key. Fix the rule, do not adjudicate around it. |
| 14 | Ingestion round: F1 (non-template production dependency) gives a false negative for repos that implement their domain instead of importing it — MATI is Tier A with 3 template-only deps and 958 lines of domain code | F1 detects a *purchased* domain commitment. Where F1 scores — but the repo is active and gated, check for F1b (≥300 lines under a non-framework source dir with no matching dependency) before assigning a tier. F1b is proposed, not yet applied to the dataset — do not silently score with it. |
| 24 | Re-foundation round: the repository's only automated gate, `.github/workflows/node.js.yml`, failed **14 runs out of 14 across four months** and **no document in the repository mentioned it** — not `LOG.md`, not `gate-reliability.md`, which enumerates this repo's gates and omits the only one that runs automatically. The workflow ran `npm ci` at a root with no `package.json`, and the `npm test` it would have reached has zero test files behind it | **A verdict nobody consumes is a fourth gate state, not a pass and not a missing measurement.** Every gate must name the authority that reads its result; `Gate.result_consumed_by` is now a required field (`ASSURANCE_MODEL_FIT.md` §5, G4). And a gate audit that enumerates gates must enumerate *all* of them, starting with the ones that run without being asked. |
| 25 | Re-foundation round: four state numbers in `MEMORY.md` — the file Rule 6 calls "the single source of truth for state" — were stale (insights 11 vs 17, observations 64 vs 76, promoted patterns 24 vs 29, dataset n=30 vs 40). The insight count was checkable by a script that already runs and prints it. `LOG.md` contradicted itself two rows apart on portfolio size (30 and 40), and `README.md` carried a third number (25) | **Never type a number into prose that a command can derive.** Every count gets a `source → derivation → rendered declaration` chain (`docs/AUTHORITY_MAP.md` §5). A number stated in three files is a number that will disagree with itself in three files. |
| 26 | Re-foundation round: the commissioning brief named three repositories to run the model against (`lichess_app`, `--Android`, `strategic-portal`) and a "lichess ladder" of reality levels. **None of the four exists** — not in the 40-repo portfolio, not in this repository. Expressing the model in terms of them would have produced a fluent, entirely fabricated section | **When an instruction names an artifact, verify it exists before expressing anything in terms of it.** Record the absence in the deliverable and name the substitute and why (`ASSURANCE_MODEL_FIT.md` §0). An instruction is not evidence that its referents exist. |
| 27 | Re-foundation round: the automated positive control shipped this round covered **R1, R2 and R3** — precisely the three rules the *previous* round had already fired and fixed. R4, the one rule never fired, could not produce a verdict at all: its pattern began `\b(?:>=\|<=\|≥\|≤)`, and a leading `\b` before `>` requires a word character to its left, so its match set against the live `rubric.md` was **empty**. It had been unfireable through two rounds, behind a document claiming "R1–R6 verified passing". Found by an adversarial pass, not by any green run | **A positive control must cover every rule that emits a verdict, enumerated mechanically, not chosen.** The rules most likely to be broken are the ones never yet fired, which is exactly the set a hand-picked control omits. And "verified passing" is not "verified able to fail": state which one you measured. `scripts/gate-positive-control.sh` now derives its cases from the rule set and asserts the *right* rule fired, not merely that something did. |
| 28 | Re-foundation round: four figures in the decision documents did not resolve to the files they cited, including the one carrying the round's only claimed technical differentiator — "undercounts by up to 23×, measured across 12 repositories" cited to `authorship-attribution.md`, whose 12-repo table has no `_crm` row and a maximum of **6.7×**. This is the exact `evidence-resolves-to` failure R1 exists to catch, committed in `product/` and `docs/`, **which R1 does not scan** | **A gate that covers `insights/` does not cover the documents that sell.** Either extend the resolution check to any file making an outbound claim, or state in `AUTHORITY_MAP.md` that those files are uncovered and must be cited by hand. Until one of the two is done, every figure in a product document is asserted, not measured — the condition the corpus was in before 2026-08-19. |

## Codebase Patterns

Reusable templates for outputs. Insert as encountered.

### Insight front-matter (standard)

```markdown
---
dimension: claude-to-user | user-to-claude | claude-to-claude | user-to-user
evidence-repos: [cor-sys, groundstate-protocol]
evidence-pointers:
  - cor-sys@commit-sha:path/to/file
  - groundstate-protocol#PR-12
monetization-score: 4/5  # pass threshold
applicability: solo-builder | small-team | enterprise
---
```

### Patterns-matrix row (standard)

```
| pattern | cor-sys | groundstate | chess-mind | core-unified | strength-score | promoted? | dimension |
|---------|---------|-------------|------------|--------------|----------------|-----------|-----------|
| <name>  | 3       | 2           | 0          | 0            | strong-2-repos | Yes       | user-to-user |
```

### cor-sys evidence pointer convention (now verified)

Format: `cor-sys@<short-sha>:path/to/file` or `cor-sys#PR-N` or `cor-sys#issue-N`. Verified valid across all 12 observations from Phase 1 cor-sys, and now across all 43 observations from Phase 1.

### Phase 2 observation-citation convention (added Phase 2)

When citing a source observation in synthesis.md or a MOC:

- Format: `<repo>@<HH:MM>` referring to the observation's timestamp in its `extracted-insights.md` file
- Example: `cor-sys@10:00` = the 2026-05-12 10:00 observation in `/research/cor-sys/extracted-insights.md`
- Example: `groundstate@11:05` = the 2026-05-12 11:05 observation in `/research/groundstate-protocol/extracted-insights.md`
- This shorthand pairs the cite to the file's heading, allowing fast lookup. Long-form `cor-sys@<sha>:path` is retained when citing the underlying git artifact directly.

### Phase 3 skill front-matter convention (added Phase 3)

```markdown
---
name: <kebab-case>
when:
  - <3-5 trigger conditions, each a bullet>
signals:
  - regex: '<auto-invoke pattern>'
  - keyword: '<auto-invoke keyword>'
cascade: <next skill in the chain, or 'terminal'>
---
```

### Phase 4 playbook structure (added Phase 4)

Every playbook ships with these sections in this order:

1. Title + Tagline
2. Target buyer (named segment, NOT "everyone")
3. Rework hours saved per session (with number)
4. Problem statement (1 paragraph)
5. The playbook (steps, templates, scripts, decision trees)
6. Evidence (commit SHAs, PRs, repo@HH:MM)
7. When to use / When NOT to use
8. Adoption checklist (5-10 items)
9. Cross-references

### Gap-closure meta-playbook structure (added gap-closure round)

A meta-playbook (depends-on another playbook) ships with:

1. Front-matter: `depends-on: <parent-slug>`, `type: meta-playbook`, `status: hypothesis | verified`
2. "Meta-playbook context" section as the first body section, naming the parent
3. Bundle-only pricing in pricing-hypotheses.md until the parent has ≥50 sales
4. The standard Phase 4 playbook structure (target buyer, hours saved, problem, playbook, evidence, when/when-not, adoption checklist, cross-refs)

## Session History

| Date | Phase | Focus | Outcome |
|------|-------|-------|---------|
| 2026-05-12 | Phase 0 | Scaffold | 30 files seeded; cross-references wired; commit `a648ff3` |
| 2026-05-12 | Phase 1 cor-sys | Code+git+PR+issues deep dive | 6 artifacts written (timeline 9.5KB, commit-archaeology 11.9KB, pr-patterns 9.2KB, issues-themes 2.5KB, architecture-notes 12.7KB, extracted-insights 19.4KB); 12 raw observations with evidence pointers; commit `59a6e6f` |
| 2026-05-12 | Phase 1 → next | State update | MEMORY.md and LOG.md updated to reflect cor-sys complete |
| 2026-05-12 | Phase 1 groundstate-protocol | Lovable→Claude pivot + editorial voice + AI-cross-review study | 10 raw observations; identified Lovable-render/Claude-write coexistence pattern; first observed AI-cross-review event (Codex catching P1 race in PR#10) |
| 2026-05-12 | Phase 1 chess-mind-patterns | Bot-blast + 14-day silence + 72-minute resumption study | 10 raw observations; characterized resumption shape (additive, no bot-file deletions, wiring-seam-only); identified prototype-mode signature (zero PRs / issues / docs) |
| 2026-05-12 | Phase 1 core-unified-consciousness | Negative control / publish-and-walk-away abandonment study | 11 raw observations; refuted Hypothesis C (template choice irrelevant); proposed 4-feature Tier classifier; isolated publish-button-satisfiability as the strongest single predictor |
| 2026-05-12 | Phase 2 cross-repo synthesis | patterns-matrix + synthesis narrative + 4 MOCs populated | 35 matrix rows; 17 promoted patterns across 4 dimensions; H1/H2/H4/H5 confirmed, H3 refined; top 5 playbook candidates named for Phase 4; commit `a9fc349` |
| 2026-05-12 | Phase 3 + 4 shipping | 5 skills + 6 commands operational; 5 insights distilled; 5 playbooks shipped; pricing hypotheses; bundle proposals | 5 skills (workflow-archaeologist, insight-distiller, monetization-auditor, dimension-router, cross-repo-comparator); 6 commands (lesson-capture, lesson-distill, lesson-review, lesson-monetize, lesson-cross-check, lesson-ship); 5 insights (all 5/5 audit); 5 playbooks (publish-button-intent-triage, four-feature-tier-classifier, dual-ai-surface-workflow, ai-cross-review-setup, resumer-day-prep); 2 bundle proposals (Lovable Resumption Trilogy $99, Multi-AI Workflow Pack $129); 4 new anti-patterns added (#5, #6, #7, #8); all 5 phase gates closed. |
| 2026-05-12 | Gap-closure round | Close 8 gaps from Phase 4 report | GAP 1: editorial-commit-voice-escalation playbook + insight + pricing row (5/5 audit). GAP 2: 8 additional distilled insights shipped (6 new, 2 consolidated); 4 promoted patterns parked/consolidated. GAP 3: Maya hypothetical 6th-repo self-application test PASS. GAP 4: CampaignCraft mini-profile + absorbed-rather-than-shipped patterns-matrix row. GAP 5: ai-review-event-instrumentation meta-playbook (bundle-only). GAP 6: launch-checklist.md (pre-launch + week 1-4 + metric instrumentation). GAP 7: README polish (Featured Playbooks + How-to-buy + Latest update). GAP 8: MEMORY/LOG/matrix/MOCs state updates. 2 new anti-patterns (#9 hypothetical-as-real, #10 meta-playbook front-matter). All 6 gates remain green. |
| 2026-09-03 | **Re-foundation** | Audit the whole repository against a candidate AI Delivery Assurance thesis | **Decision `PROCEED_SERVICE_ONLY`.** 13 deliverables: BASELINE, ASSET_REGISTER, METHOD_LINEAGE, PRODUCT_LINEAGE, THESIS_TEST, ASSURANCE_MODEL_FIT, CONTRADICTIONS, DO_NOT_TOUCH, MIGRATION_PLAN, ASSURANCE_THESIS, FIELD_PREREGISTRATION, AUTHORITY_MAP, REFOUNDATION_DECISION. Findings: CI failed 14/14 for four months unread; zero test files; `computeTier` still ships the demoted F1–F4 rule; `saas/app` has 8 typecheck errors; four `MEMORY.md` counts stale. Method: 13 principles at level 6, **none at level 7** — nothing has been observed outside one operator's work. Object model v1.0 failed 3 of 10 portfolio cases; v1.1 represents all 10. Thesis novelty **refuted** (assurance cases, Vanta); problem claim **survived**; platform **unsupported**, deferred behind 10 preregistered thresholds all currently reading zero. CI replaced with the contract gate plus a positive control that fires R1–R3 on a broken file. 3 new anti-patterns (#24–#26). |
| 2026-09-03 | **Re-foundation, adversarial pass** | §28 of the brief: prove the new thesis is a reinterpretation of a personal portfolio | **Decision survives, narrowed to `PROCEED_SERVICE_ONLY — SALE GATED`.** 11 attacks landed, 14 failed; full record at `research/re-foundation/ADVERSARIAL_PASS.md`. Biggest: **R4 of the contract gate could never fire** (leading `\b` before `>`; empty match set against the live rubric) and this round's own positive control had covered only the three rules already known good. Fixed; the repaired R4 immediately found a real violation (the `≥7` gap had no provenance, now labelled set-not-derived, `rubric_version` unchanged at 1.1, ground-truth output identical). Also fixed: the 23× citation (the cited 12-repo file maxes at 6.7×), "23 recorded failures" (16 observed), "nine times" (13 principles across 8 repos), "6 of 10 cases" (3 fails + 1 strain). Conceded: the lineage register draws from **8 of 40 repos selected for exhibiting the mechanism**. Added **P11** (agent-family independence) and **§2b** (a fee floor) to the preregistration, before any pilot, which is the last window §5 rule 1 allows. 2 new anti-patterns (#27–#28). Open: condition 4 of the sale gate, the re-audit of the 10 causal insights. |
