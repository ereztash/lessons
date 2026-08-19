# Agent-Architect — Raw Insight Candidates

> Phase 1 survey, 2026-08-19. Repo: `ereztash/Agent-Architect` — a Consulting Intelligence Engine.
> Prompts, fixtures, calibration data and a Python orchestrator; the product is a method, not an app.
> Verified locally: 21 commits (20 non-merge, 20 by Claude), 1 PR, 2026-05-14 → 2026-05-24. Dormant 87 days.

---

## 2026-08-19 09:45 — The repo's default branch on GitHub is a Claude working branch; `main` does not exist

**Dimension guess**: user-to-claude
**Evidence**: `git remote show origin` → `HEAD branch: claude/agent-architect-test-fixtures-mA6dz`; no `main` or `master` ref exists; the single PR (#1) merged `claude/intelligent-ramanujan-Olujo`
**Observation**: Every ref in this repo is a Claude-generated branch name. The repo has no trunk. `keepath` shows the same shape — default branch `claude/modular-system-design-kJg0a`, never merged to main — and was classified operator-absent at 133 days dormant. Agent-Architect is at 87 days.
**Mechanism hypothesis**: Promotes `claude-branch-as-default-branch` from a single-repo curiosity to a 2-repo pattern with a testable prediction: when the agent's working branch becomes the trunk, no one ever performed the "accept this into the project" act. The repo skipped the ceremony that makes a codebase feel owned. Both instances are dormant; neither has an abandoned *feature* — they have an unclaimed *whole*. Diagnostic: `git remote show origin | grep 'HEAD branch'` — if it starts with `claude/` or `agent/`, the resumption task is adoption, not code.

---

## 2026-08-19 09:47 — Claude audits Claude with a cheaper model, and the findings are committed

**Dimension guess**: claude-to-claude
**Evidence**: Agent-Architect@857e0dd `Audit fixes: close 7 logic gaps found by Haiku audit of v0.5 pipeline`; @9398051 `Consistency pass on audit-fix commit: align identifiers across stages`; @88d4bfc `Address review feedback — close 4 gaps + split commitments vs scenarios`
**Observation**: A Haiku pass audited an Opus-built pipeline and produced 7 logic gaps, each closed in a named commit. A follow-up commit exists purely to repair the *consistency* damage the audit fixes caused. The pattern repeats at PR review with 4 more gaps.
**Mechanism hypothesis**: Extends `ai-cross-review-multi-agent-handoff` in a direction the earlier evidence (Codex ↔ Claude in groundstate-protocol) did not show: the reviewer can be a **cheaper model from the same family**. Auditing for logic gaps is a cheaper cognitive task than construction, so paying construction rates to review is waste. The `Consistency pass` commit is the honest cost line — batch-applying audit fixes desynchronizes identifiers across stages, so a cross-review round is two commits, never one.

---

## 2026-08-19 09:49 — Prompts are version-numbered source, and old versions are never deleted

**Dimension guess**: user-to-claude
**Evidence**: `prompts/master-prompt-v0.1.md`, `v0.2`, `v0.3-architecture`, `v0.4`; `architecture/v0.5-pipeline-spec.md`; `calibration/operator-implicit-patterns-v0.3.md`; `fixtures/fixture-test-pack-v0.1.md`, `fixture-test-v0.4.md`, `mini-fixture-v0.5.md`
**Observation**: Four generations of the master prompt sit side by side at HEAD. The same versioning runs through fixtures and calibration files, and versions are superseded, never removed. Agent-Architect@5d9d5e3 `Park Stage 1 (Input Readiness Gate) draft pending Mini-Fixture v0.5` records a deliberate park rather than a deletion.
**Mechanism hypothesis**: A prompt cannot be diffed usefully — a reworded paragraph changes behaviour in ways `git diff` does not show, so the old version is the only reproducible baseline. This is `zero-deletion-of-bot-generated-files` arriving for a rational reason rather than as neglect: in a repo whose product *is* the prompt, keeping v0.1 is version control, not clutter.

---

## 2026-08-19 09:51 — The repo states its own confidence as a number, and the number moves

**Dimension guess**: claude-to-user
**Evidence**: `README.md` — "PRODUCT CORE EXISTS, POSITIONING UPGRADED, v0.5 PIPELINE REQUIRED. Product-core confidence: **76–82%**"; `docs/confidence-ladder.md`; `docs/status.md`; Agent-Architect@b6f2663 `Mai_01 end-to-end run + cross-transcript resonance + repo re-rating`
**Observation**: The README opens with a falsifiable question ("can a Master Prompt … without depending on the original expert's personal interpretation?"), commits to a confidence interval, and names what would change it. A later commit exists to *re-rate the repo* after a fixture run.
**Mechanism hypothesis**: This is a README that can be wrong — the opposite of `readme-placeholder-survives-to-head` (promoted, 2 repos), where the scaffold's placeholder README survives because nobody ever had to state a claim. Candidate metric: a README carrying a number that changed at least once is evidence of a live hypothesis; a README that has never been edited since the scaffold is evidence of none.
