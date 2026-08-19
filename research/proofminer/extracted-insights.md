# proofminer — Raw Insight Candidates

> Phase 1 deep-dive, 2026-08-19. Repo: `ereztash/proofminer` — converts evidence a person already
> owns into visible, measurable, compounding authority, reported as one headline number: the
> *Visibility Gap*.
> Verified locally: 241 commits (229 non-merge), 16 PRs, 16 branches. **All 229 non-merge commits
> landed on two days: 116 on 2026-08-15 and 113 on 2026-08-16.** Tier B under the F5 rule.

---

## 2026-08-19 12:40 — 229 commits in two days, of which 193 are machine-cadence under a human name

**Dimension guess**: claude-to-claude
**Evidence**: 213 of 229 non-merge commits authored `ereztash`, 16 `Claude`; 212 have empty bodies; 193 sit in 23 cadence bursts; sample gaps 6 s, 6 s, 21 s, 62 s, 32 s, 5 s, 52 s between `Add Vite project configuration` → `Add app shell` → `Add ProofMiner dashboard styles` → `Implement ProofMiner MVP interactions` → `Redesign interface around next best proof`
**Observation**: The largest hidden-agent repo in the portfolio, larger than MATI (55 of 86). `git log --author` reports 93% human authorship for a codebase that was written by an agent inheriting the operator's git identity. The cadence is not merely fast — `Redesign interface around next best proof` is a product-direction change committed 32 seconds after a styling commit.
**Mechanism hypothesis**: Third confirmed instance of `agent-identity-collapse` (MATI, `lessons`, proofminer), and it settles the question of scale: this is not an edge case, it is the portfolio's dominant authoring mode by volume. Any portfolio metric derived from author names is wrong by roughly an order of magnitude. `scripts/detect-agent-authorship.sh` flags it correctly on both detectors.

---

## 2026-08-19 12:43 — Three agent surfaces in one repo, visible only in the branch names

**Dimension guess**: claude-to-claude
**Evidence**: `agent/app-orchestration`, `agent/telos-governance-v3`, `agent/product-architecture-v2`, `agent/expert-consultant-mvp-1786886056527`, `-1786886204627`, `-1786886509572`; `claude/app-competitive-rating-mi3odu`; **`codex/proof-loop-v0-1786884284617`**; `archive/pre-rewrite-agent-work`
**Observation**: Sixteen branches carrying three distinct agent prefixes. Three `agent/expert-consultant-mvp-*` branches differ only by a unix-millisecond timestamp and were created within eight minutes of each other — branch names generated programmatically, not typed. A `codex/*` branch makes the third surface explicit; until now Codex's presence in this portfolio was only attested in prose (`CRM_Google_ai/AGENTS.md`). PR #14 merges from `codex/proof-loop-v0-…` and PR #16 from `claude/…`, so two vendors' work reached `main` through the same review ritual within hours.
**Mechanism hypothesis**: Branch prefix is the only surviving record of which surface produced what — the commits themselves carry the operator's identity and empty bodies. This makes `git branch -r` a better authorship record than `git log` in this repo, which is the inverse of the normal assumption. Portable diagnostic: count distinct branch prefixes before trusting any per-tool attribution.

---

## 2026-08-19 12:46 — Every one of Claude's 16 commits is an epistemic correction, not a bug fix

**Dimension guess**: claude-to-claude
**Evidence**: `The text layer was fabricating evidence. Stop it.` · `Stop claiming certainty the inputs do not support` · `Stop the product asserting things it does not know` · `Correct the docs' claims about the code` · `Referential integrity on import, honest L4 confidence, and a parser that refuses to guess` · `Measure what is actually there: staleness, self-report, and text that bought the gate` · `Close the round-4 blockers: a planted credential, a stale number, and a plan that could not be followed` · `Sharpen the ICP to the problem-aware, and stop positioning standing in for evidence`
**Observation**: The adversarial surface did not fix crashes. Eight of sixteen subjects are imperatives to stop the product from asserting something the evidence does not support. One names a planted credential. Another corrects the documentation's claims about the code.
**Mechanism hypothesis**: This sharpens `adversarial-second-surface` in a way MATI and anti-silo only hinted at. The builder's characteristic failure is not a bug — it is **fabrication**: an interface that can render a confident output will render one from a weak input, because nothing in the generation path knows the difference. The reviewer's job is therefore epistemic, and it is a job the builder cannot do, since the builder is the thing generating the confidence. Portable: the second surface should be briefed to hunt unsupported assertions, not defects.

---

## 2026-08-19 12:49 — An "Authority Constitution" that classifies each recommendation on six axes

**Dimension guess**: user-to-claude
**Evidence**: `docs/AUTHORITY.md` — *"This document defines how ProofMiner decides what the product is allowed to do with a piece of evidence. The purpose is trust preservation. A weak trace should not become a confident outbound asset just because the interface can generate one. The product should pay short-term friction when that prevents wasted effort, disappointment, or a false sense of authority."*; axes: Impact · Reversibility · Certainty · Sensitivity · User preference · External context; sections "MVP Levels", "First Light Gate", "Operating Principle"; implemented in `src/engine/authority.js`
**Observation**: The authority boundary is written as a constitution and implemented as an engine module beside `mine.js`, `gaps.js`, `signals.js`, `layers.js`. Six axes, including **Reversibility** — can the user undo it before anyone else sees it — which none of the other implementations carry.
**Mechanism hypothesis**: Fourth independent implementation of component C6 (`portfolio-as-one-mechanism.md`), and the richest. MATI's `organizationalAuthority()` is a three-way enum over actions; CRM's `provenance.py` is a single risk flag; anti-silo's `eligible.py` is a tier list with a disclaimer. proofminer decomposes the decision into six orthogonal questions and makes reversibility a first-class axis — which is the one that determines whether a wrong answer is recoverable at all. This is the version worth porting into `lessons`, whose monetization gate has no reversibility term: shipping a playbook is irreversible in a way distilling an insight is not, and the gate does not distinguish them.

---

## 2026-08-19 12:52 — Agent skills shipped inside the product repository

**Dimension guess**: user-to-claude
**Evidence**: `skills/README.md`, `skills/app-orchestrator/`, `skills/vercel-app-builder/`; branch `agent/vercel-app-builder-skill`
**Observation**: The repo ships two agent skills as part of the product tree. No other repo in the 40 does this — `lessons` keeps skills in `.claude/skills/`, ampaign-craft in `.claude/` and `.agents/`, both outside the product.
**Mechanism hypothesis**: `meta-tooling-co-shipped-with-product` was a weak-1-repo candidate from cor-sys. This is a second instance and a stronger one: the tooling is not merely co-located, it is versioned with the product and one of the skills (`vercel-app-builder`) was itself built on a dedicated branch. Promotes the candidate to a 2-repo pattern.

---

## 2026-08-19 12:55 — A telos document that names the market condition, and an archived branch of abandoned agent work

**Dimension guess**: user-to-user
**Evidence**: `docs/TELOS.md` — *"2026 is a layoff market. Two populations are trying to solve the same problem with the same broken tools"* (people going independent; people trying to get hired); `archive/pre-rewrite-agent-work` branch + commit `Archive the pre-rewrite agent/* exploration branches`
**Observation**: `TELOS.md` grounds the product in a dated external market condition rather than in a feature list. Separately, the operator archived the pre-rewrite agent exploration onto a named branch rather than deleting it — an explicit, retrievable record that a direction was abandoned.
**Mechanism hypothesis**: The archive branch is the counter-case to `zero-deletion-of-bot-generated-files`, which describes bot output surviving through neglect. Here abandonment is *deliberate and named*, which makes the failed exploration retrievable evidence rather than clutter at HEAD. Portable: archive a dead agent branch under `archive/`, do not delete it and do not leave it in the working set — the two failure modes are keeping everything and losing what you learned.
