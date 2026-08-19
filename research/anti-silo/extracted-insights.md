# anti-silo — Raw Insight Candidates

> Phase 1 survey, 2026-08-19. Repo: `ereztash/anti-silo` — Python evidence/contradiction-detection
> engine with a local GUI, a web beta on Vercel, and a consultant-pilot offering.
> Verified locally: 89 commits (74 non-merge), 18 PRs, 2026-07-16 → 2026-08-16.

---

## 2026-08-19 09:30 — The Claude trailer counts 40 commits; the author column counts 6

**Dimension guess**: claude-to-claude
**Evidence**: 40 non-merge commits carry `Co-Authored-By: Claude`; 6 name `Claude` as author; 35 of the 40 are authored by `Erez <Erez2812345@gmail.com>`
**Observation**: 54% of this repo's non-merge commits are Claude-paired, and `git log --author=Claude` finds 8% of them. The commits carrying the trailer are the substantive ones — `fix(intake): non-ASCII filenames silently deleted documents; empty PDFs reported success`, `fix(triangulation): diagnose a source hash written under the wrong key`, `test: a state the product can show is a promise; assert each one has a path`. The repo also runs two distinct human git identities (`Erez <Erez2812345@…>` 61 commits, `ereztash <erez2812345@…>` 22) that differ only in capitalization.
**Mechanism hypothesis**: A local Claude Code session configured with the operator's git identity still writes the trailer, so here the undercount is recoverable — the trailer is the surviving signal. In `MATI` it is not written at all and nothing survives. Rule: read trailers before author names; read cadence before both.

---

## 2026-08-19 09:32 — Claude is called in to break up monoliths, and it brings a guard test

**Dimension guess**: claude-to-claude
**Evidence**: anti-silo@18219fb `Split gui.py monolith into modular anti_silo.gui package`, @cb96bf4 `Split contradiction.py and ingest.py; add 250-line guard test`, @3e9a106 `Split app.js into focused frontend source files` (all 2026-07-17, one day after repo start)
**Observation**: On day two, three of Claude's six author-attributed commits are decompositions of files the operator had written the day before. One of them installs a **250-line guard test** — a test that fails when any module exceeds 250 lines, so the monolith cannot grow back.
**Mechanism hypothesis**: The refactor is not the deliverable; the ratchet is. A one-time split decays as soon as the next feature lands, unless a machine holds the boundary. Same shape as MATI's contract checks and COR-SYS's `LOG.md`: the durable artifact of an AI session is the gate it leaves behind, not the diff.

---

## 2026-08-19 09:34 — Security and correctness fixes are the second thing Claude is called for

**Dimension guess**: claude-to-user
**Evidence**: anti-silo@95aebdc `fix(security): close web CSV formula injection and source-root path leak`; anti-silo@79c4bd3 `fix(web): answer HEAD instead of 501, and make deploy staleness a smoke-test gate`; branches `claude/repo-product-readiness-audit-8f3awg` (PR#13), `claude/anti-silo-ui-review-sfijo1` (PR#1)
**Observation**: Every `claude/*` branch in this repo is named for an audit or a review, never for a feature: UI review, product-readiness audit, code review. Features arrive on `feat/*` and `agent/*` branches. The pattern holds across all 18 PRs.
**Mechanism hypothesis**: Second independent instance of the MATI split — the operator's build surface ships features, Claude Code is bought in as the adversary. Two repos, two different build surfaces, same role assignment. This is now a cross-repo pattern, not a MATI quirk.

---

## 2026-08-19 09:36 — Commercial-intent documents ship inside the repo, months before revenue

**Dimension guess**: user-to-user
**Evidence**: `docs/INVESTOR_BRIEF.md`, `docs/LAUNCH_READINESS.md`, `docs/CONSULTANT_PILOT.md`, `docs/DISTRIBUTION.md`, `docs/ADVERSARIAL_REVIEW_2026-07-16.md`, `docs/SECOND_BRAIN.md`; anti-silo@(PR#7) `docs/evidence-repair-engine-wedge`
**Observation**: Seven of the repo's docs are business artifacts, not engineering ones, and the earliest (`ADVERSARIAL_REVIEW_2026-07-16.md`) is dated the repo's first day. `Agent-Architect` does the same thing with a whole `product/` directory (`OFFER.md`, `PRODUCT_DEFINITION.md`, `landing.html`, `sample-report.md`).
**Mechanism hypothesis**: The commercial framing is written at repo-start, not bolted on at launch — it functions as a specification. A README that must answer a technical buyer (anti-silo@1785182943 `docs: make the README answer a technical buyer, and add SECURITY.md`) constrains what the code is allowed to claim. Candidate pattern: `commercial-doc-as-spec`, now visible in 2 repos.

---

## 2026-08-19 09:38 — Deployment staleness became a test, after a deploy silently went stale

**Dimension guess**: claude-to-claude
**Evidence**: anti-silo@79c4bd3 (2026-08-16) `fix(web): answer HEAD instead of 501, and make deploy staleness a smoke-test gate`; anti-silo@3c9198b (same day) `chore: trigger a production deployment for the current main`
**Observation**: The final two commits in the repo are a matched pair: a fix that turns "the deployed build is older than main" into a failing smoke test, and a no-op commit whose only purpose is to force a deployment. The second is the manual workaround; the first makes it unnecessary next time.
**Mechanism hypothesis**: The `zero-deletion-of-bot-generated-files` and `test-scaffold-installed-never-used` patterns describe scaffolding that decays. This is the opposite: a one-off manual intervention converted into a permanent gate in the same session. The tell for a healthy repo is not the absence of manual fixes — it is that each manual fix leaves a gate behind.
