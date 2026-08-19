# CRM_Google_ai — Raw Insight Candidates

> Phase 1 survey, 2026-08-19. Repo: `ereztash/CRM_Google_ai` — a mirror of the `_crm` project
> ("Ownership Engine": deterministic NLP for detecting ownership in coaching conversations).
> Verified locally: 4 commits, 0 PRs, 397 files, all activity 2026-06-14. Dormant 66 days.

---

## 2026-08-19 10:00 — A repo whose entire purpose is to be a second surface's copy of another repo

**Dimension guess**: user-to-user
**Evidence**: CRM_Google_ai@592919f `Sync: mirror _crm content to make repositories identical` (body: *"Replace repository contents with an exact copy of the _crm project (385 files). Working tree now matches _crm at branch claude/sleepy-faraday-vqp8y6"*); @d65f1cc `Sync: mirror _crm master (f965662) — keep repositories identical`; repo name `CRM_Google_ai`; README CI badge points at `ereztash/_crm`, not at this repo
**Observation**: All four commits are an initial commit, a README edit, and two full-tree mirrors of a different repository. The README's build badge still points at the source repo. The repo name says what it is for: giving a Google AI surface access to the CRM codebase.
**Mechanism hypothesis**: New terminal state for the classifier, alongside `absorbed-rather-than-shipped`. This repo is not abandoned and not resumable — it is an **access shim**: a repo created because a tool could reach GitHub but not the original location. It scores 3/4 on F1–F4 while containing no original work, which means the classifier over-rates it. Diagnostic: if ≥50% of commits are whole-tree syncs naming another repo, classify as `mirror` and score the source instead.

---

## 2026-08-19 10:02 — `AGENTS.md` is a written concurrency contract between two agents on one working tree

**Dimension guess**: claude-to-claude
**Evidence**: `AGENTS.md` — "coordination for two coding agents on one working tree"; lane split (Codex owns the structural refactor; Claude owns data + semantics); "ONE writer per file at a time. Read-before-write."; "Claude has FROZEN code edits while the package refactor is in flight"; a `## Handshake` section; a `## Data changes Claude made OUTSIDE this repo (so you do not double-handle)` section
**Observation**: The file names the shared channels explicitly — *"The only shared channels are the filesystem, git history, and this file."* — and uses commit frequency as a liveness signal: *"Small, frequent commits with clear messages = the live activity log for the other agent."* It records a collision that already happened (*"we already hit 'modified since read' on app.html"*), a test contract (151 tests green before the refactor, protecting validated psychometrics), and a startup hazard (`server.py` calls `MD.load()` at import time, so a wrong path crashes at boot rather than lazily).
**Mechanism hypothesis**: The promoted `ai-cross-review-multi-agent-handoff` pattern covers agents reviewing each other's *finished* PRs. This is a category beyond it: two agents writing **concurrently to one tree**, coordinated by a committed file, with a mutual-exclusion rule, a freeze, and an explicit handshake to lift it. The mechanism is ordinary concurrency control — one writer per resource, read-before-write, an out-of-band section for effects outside the shared resource — applied to agents instead of threads. This is the strongest single artifact in the portfolio for the claude-to-claude dimension.

---

## 2026-08-19 10:04 — The mirror carries the parent's `LOG.md` verbatim, including its telos

**Dimension guess**: user-to-claude
**Evidence**: `LOG.md` opens `# COR-SYS — Build Log & Roadmap`; `AGENTS.md` notes data changes made in `ROOT/_analysis`, outside this repo; `docs/` carries 20+ dated audit files (`AUDIT_RECONCILIATION_2026-06-11.md`, `G1_KILLTEST_2026-06-14.md`, `EVIDENCE_OPTIMIZATION_2026-06-11.md`)
**Observation**: The mirrored tree contains a build log addressed to a *different* repo's agent, describing a telos ("decouple the methodology from Erez's hours") and a domain-expertise gate that applies at every decision juncture. An agent opening this repo cold reads instructions written for a session in another repository, referencing paths (`ROOT/_analysis`) that do not exist here.
**Mechanism hypothesis**: Mirroring copies files but not context. Machine-consumed files (`CLAUDE.md`, `LOG.md`, `AGENTS.md`) are the ones that break, because they address a specific working tree and are the first thing the next agent reads. Rule: a mirror must either rewrite or delete the entry-point files it copies; a `LOG.md` that names another repo is worse than no `LOG.md`.
