# MATI — Raw Insight Candidates

> Phase 1 survey, 2026-08-19. Repo: `ereztash/MATI` — מתי המתי״א, a reflective-coaching app for
> educational instructors at מתי״א רג״ב. Next.js 16 + React 19, Hebrew RTL, local-first storage.
> Verified locally: 100 commits (86 non-merge), 18 PRs, first commit 2026-08-18 08:30.

---

## 2026-08-19 09:10 — A complete, CI-gated production system was built in one 11-hour day

**Dimension guess**: user-to-user
**Evidence**: MATI@5ed21bb (08-18 08:30, first commit) → MATI@bb4a345 (08-18 19:24, PR#16 merge); 18 PRs, all opened 08-18
**Observation**: Every commit in this repo was authored on a single calendar day. In those 11 hours the repo went from empty to: a Next.js 16 app with a three-window Gantt domain model, three hand-written contract-checker scripts wired into CI, an `npm audit --omit=dev` production-vulnerability gate, a Playwright e2e suite, 43 unit tests, and 16 merged PRs. PRs #17 and #18 were still open and being updated on 2026-08-19 07:40 — the repo is live right now, not a burst that ended.
**Mechanism hypothesis**: This is what the four-feature classifier's Tier A looks like when compressed. Prior Tier A repos (COR-SYS 71 commits/months, ampaign-craft 199 PRs/2 weeks) reached the same structural maturity over far longer wall-clock. The compression factor is not typing speed — it is that PR discipline, CI gates, and contract checks were installed *in the first day* rather than retrofitted. Contrast `keepath`, where a two-day 27-endpoint blast with no gates produced an operator-absent repo. Same volume, opposite outcome; the difference is whether gates land with the code.

---

## 2026-08-19 09:12 — 81 of 86 commits were written by an agent wearing the operator's git identity

**Dimension guess**: claude-to-claude
**Evidence**: MATI@68f1acb (`author ereztash <erez2812345@gmail.com>`, `committer ereztash`, body empty, subject `Add stage and reflection engine`); 55 of 86 commits in machine-cadence bursts (mean gap 31 s); branch names `agent/full-spec-alignment`, `agent/context-engine-v2`, `agent/org-score-floor`
**Observation**: `git log --author` reports 95 commits by `ereztash` and 5 by `Claude`. The 95 include runs of ten separately-scoped commits inside three minutes (08:35–08:37: `Migrate MATI to Next.js`, `Add TypeScript configuration`, `Add Next.js type declarations`, `Add Next.js configuration`, `Add MATI root layout`…), every one with an empty body, all on branches prefixed `agent/`. No human authored those. The agent inherited the operator's `user.name`/`user.email` and emits no trailer, so it is invisible to every identity-based detector.
**Mechanism hypothesis**: The recorded author is a property of the writing tool's git config, not of the actor. See `research/cross-repo/authorship-attribution.md` for the two-detector method and the portfolio-wide table. Portable rule: in a portfolio audit, a repo whose commits are dense, subject-only, and branch-prefixed `agent/` has an unattributed agent surface regardless of what the author column says.

---

## 2026-08-19 09:14 — The two AI surfaces split by language: Hebrew builds, English audits

**Dimension guess**: user-to-claude
**Evidence**: MATI#7, #8, #9 (branch `agent/*`, bodies in Hebrew, sections `## מה השתנה` / `## למה` / `## בדיקה`); MATI#17, #18 (branch `claude/*`, bodies in English prose)
**Observation**: Every PR from an `agent/*` branch is written in Hebrew against a fixed three-heading template. Every PR from a `claude/*` branch is written in English, in long prose, with no template — PR#18 runs ~1,400 words and narrates *why the first three features did not count* before describing what shipped. The split is perfectly clean across 18 PRs.
**Mechanism hypothesis**: This refines the promoted `hebrew-bilingual-cognition-medium` pattern. The language is not a property of the operator; it is a property of the surface. Hebrew + fixed template = the build surface producing operator-reviewable summaries. English + open prose = the audit surface producing reasoning the operator reads once, deeply. The operator gets a scannable Hebrew changelog and a discursive English review from the same repo, and never has to ask which is which.

---

## 2026-08-19 09:16 — Claude Code's entire role in this repo is adversarial: it never built a feature

**Dimension guess**: claude-to-claude
**Evidence**: MATI@464c6dd, @834054b, @02bc7af, @e8562bd, @dde1e57 — all 5 Claude commits, branch `claude/code-review-wpdnrp`, PR#16; MATI#17 (focus-ring contrast 1.49:1 vs the WCAG 3:1 floor; `aria-disabled` on a button whose purpose is to be clicked; save-stamp cleared on every keystroke)
**Observation**: Claude's five commits are `Fix organizational import/export defects`, `Wake the context layers on closed-choice answers`, `Read the saved state through one shared migrator`, `Add a test suite covering lib and the browser regressions`, and a lockfile/CI fix. Its commit body states the finding that motivated the test suite: *"The three contract scripts were the only automated checks, and they match source text with regular expressions: renaming a variable breaks them, and moving logic into another function walks straight past them. Everything else was verified by hand."*
**Mechanism hypothesis**: Inverts the ampaign-craft division of labour (Claude writes, operator merges). Here a cheaper/faster surface writes and Claude is bought in as the adversary — and it found the class of defect the builder is structurally unable to find, because the builder wrote the checks. A regex contract-checker cannot audit itself. Portable pattern: when one agent writes both the code and its gates, the gates inherit the author's blind spot; a second surface must own verification.

---

## 2026-08-19 09:18 — Three hand-written contract checkers run in CI before the build

**Dimension guess**: user-to-claude
**Evidence**: MATI@e59043b, @a9c389b, @1e93197; `.github/workflows/ci.yml` (`check:signals`, `check:design`, `check:semantic-ux`, then `npm audit --omit=dev --audit-level=high`, then tests, then build); `scripts/check-*.mjs`; `lib/ux-structural-contract.json`
**Observation**: Before the production build runs, CI enforces three project-specific contracts: the organizational-signal privacy boundary (no free text or identifiers may reach the org route; the privacy floor may not be lowered), the RTL design contract (right-alignment, focus-visible, reduced-motion, 44 px touch floor), and a structural-UX semantic contract that fails when two fields collect the same semantic fact. PR#13's body names the bug that motivated the third: `smartGoalLooksValid` required measurement inside the goal sentence while separate `metric1`/`metric2`/`timeframe` fields required it again.
**Mechanism hypothesis**: Same family as COR-SYS's `LOG.md` and ampaign-craft's `no-restricted-imports` ESLint rule — a rule the operator would otherwise have to re-explain every session, moved into a machine that fails the build. The novelty here is the *subject*: these gates encode product-domain policy (privacy floor, professional authority boundary, semantic non-duplication), not code style. A CI gate is the only artifact an agent cannot talk its way past.

---

## 2026-08-19 09:20 — Tier A with zero non-template production dependencies

**Dimension guess**: user-to-user
**Evidence**: `package.json` dependencies = `next`, `react`, `react-dom` only; `lib/` = 958 lines of domain code (`stages.ts`, `context-engine.ts`, `organizational-signals.ts`, `organizational-pack.ts`, `state-storage.ts`)
**Observation**: F1 (non-template production dependency) scores **—** for MATI. By the classifier it is a 3/4, held up only by PRs and docs. Yet it is among the two most active, most gated repos in the portfolio, and its domain model is the most specific: three Gantt windows keyed to the Israeli school year, a privacy floor of 5 participants, an escalation ladder up to `systemic_candidate`.
**Mechanism hypothesis**: F1 is a proxy for "someone committed to a domain," and it works by detecting a *purchased* commitment (an SDK, an ORM, a domain library). It gives a false negative when the domain is implemented rather than imported. The proxy fails precisely for the most domain-specific work — a repo whose problem has no library to buy. Proposed sub-feature: F1b = ≥300 lines under a non-framework source directory with no corresponding dependency. MATI, `Agent-Architect` (prompt/spec repo, 1 dependency) and `All_Erez-s_Connections` (hand-written Express server) all sit in this gap.
