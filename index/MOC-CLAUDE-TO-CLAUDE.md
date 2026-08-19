# MOC — Claude → Claude

> Map of Content: every promoted insight about Claude's self-work — context management, multi-agent handoff, self-correction, conventions across sessions.

**Dimension definition**: Claude's self-work. Patterns for:
- Context window management (compression, tier loading)
- Multi-agent orchestration (Explore/Plan/Code agents, Codex review, Cursor batch)
- Self-correction loops (when to /clear, when to ask)
- Cross-session continuity (LOG.md, MEMORY.md patterns)
- Custom skill/command invocation
- Identity, signing, and AI-to-AI handoff conventions

In this dataset, Claude→Claude surfaces are observable through git artifacts that Claude leaves for the next Claude session (or the next AI in a pipeline) to read: co-authored trailers, conventional-commit prefixes, the deletion/non-deletion of bot-generated files, AI cross-review chains, and test-scaffold inheritance.

## Patterns in this dimension

### claude-coauthored-trailer-convention
**Source observations**: cor-sys@10:04 (every Claude contribution carried `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` from commit one; flipped to direct `Claude <noreply@anthropic.com>` authorship on 2026-04-03); groundstate-protocol@11:00 (Claude direct from `dc90fee` onward, no co-authored phase); chess-mind-patterns@11:05 (all 3 human commits carry `Co-Authored-By: Claude Sonnet 4.6` trailer 11 days before cor-sys made it standard)
**Description**: When Claude is involved in a commit, the commit trailer makes it traceable. Two valid conventions exist: the `Co-Authored-By: Claude` trailer (commit by the operator's local shell, AI involvement disclosed) and direct `Claude <noreply@anthropic.com>` authorship (commit by Claude Code itself, pushed via tool delegation). The convention's *presence* is the meaningful signal — its absence flags a Tier C repo where AI never came near git. Within the cohort, the trailer crossed three repos (cor-sys, groundstate, chess-mind) before becoming codified anywhere; it is a community-emergent practice rather than a top-down rule.
**Monetization fit**: pass — productizable as a tiny "commit-signing checklist" + `git hook` template that enforces co-authored trailers in any AI-paired repo.
**Distilled insight**: `/insights/claude-to-claude/claude-coauthored-trailer-convention.md`

### conventional-commit-prefix-on-claude-commits
**Source observations**: cor-sys@10:06 (all 71 commits use `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, plus unique `test:` and `debug:` markers from the encoding war); groundstate-protocol@11:02 (every Claude-authored commit uses conventional prefix matching the editorial register); chess-mind-patterns@11:05 (all 3 human commits use `feat:` + multi-line body with file-by-file annotation, distinct from bot's 6-word imperatives)
**Description**: Every Claude-authored commit across the three Claude-paired repos uses Conventional Commits prefixes (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`, `debug:`). The Lovable bot's commits do not — they use 6-word imperatives (`Add X`, `Fix X`, `Update X`, `Changes`). The two registers are visually distinct in any `git log` rendering; a bisecting reader can attribute a commit to its agent without reading the diff. The prefix is therefore a *machine-readable provenance signal* — useful for future tooling that wants to filter, audit, or rebase by AI provenance.
**Monetization fit**: pass — codifiable as a `pre-commit` hook that rejects un-prefixed commits when the author is `Claude`; portable across any AI-coding-tool repo.
**Distilled insight**: `/insights/claude-to-claude/conventional-commit-prefix-on-claude-commits.md`

### test-scaffold-installed-never-used
**Source observations**: chess-mind-patterns@11:10 (Vitest + jsdom + @testing-library installed by Lovable template; only `example.test.ts` 143 bytes ships; no test added by 171 bot commits or 3 human commits); core-unified-consciousness root listing (same Vitest stack; no tests added)
**Description**: Lovable's Vite + React + shadcn-ui template ships with Vitest pre-configured. Repos inherit the test infrastructure (`vitest.config.ts`, `src/test/setup.ts`, placeholder `example.test.ts`) but neither bot nor human ever writes a real test. `npm test` remains runnable; nobody runs it. Test infrastructure scaffolded by a template is a *latent capability* — present but uninvoked. For Lovable-generated prototypes, the cost of testing (mocking React state, simulating PGN/text inputs) is higher than the cost of testing manually in the live preview. Presence of Vitest in `package.json` without corresponding test files is a high-confidence indicator of prototype-mode.
**Monetization fit**: borderline — useful as a "test-debt audit" diagnostic for Lovable-bootstrapped repos; could be paired with an auto-generated SM-2 (or analogous pure-function) test scaffolder to lower the activation energy. Stand-alone monetization is weak; bundled with a resumption playbook, it's pass.

### zero-deletion-of-bot-generated-files
**Source observations**: chess-mind-patterns@11:03 (across the entire history, no bot-originated file is ever deleted by the human resumer; 69 deletion lines confined to wiring-file modifications and same-session file revisions); core-unified-consciousness@12:04 (mid-session refactor `Cleaned to a 3-page plan` consolidates 10 pages to 3 routes via `<Navigate>` redirects but does not delete the orphaned page files — 84 KB / 25% of `src/` survives as dead code)
**Description**: Bot-generated files behave as *immutable substrate* in the resumer's frame. The human resumer either layers new code on top (chess-mind: 22 new files, 0 deletions) or accepts the dead-code load and ships (core-unified: 25% dead-source ratio). Deletion of bot-built files is so rare it is functionally a zero in the dataset. Two consequences: (1) the architecture grows by layering, not refactoring; (2) the wiring file (`Index.tsx`, `App.tsx`) becomes the only integration seam and grows unboundedly. This is velocity-optimal for a single-session sprint but architecturally fragile over time.
**Monetization fit**: pass — actionable as a "dead-code budget" diagnostic + a "wiring-seam-only resumption" template; portable to any LLM-generated codebase.
**Distilled insight**: `/insights/claude-to-claude/zero-deletion-of-bot-generated-files.md`

### ai-cross-review-multi-agent-handoff
**Source observations**: groundstate-protocol@11:05 (Codex reviewed Claude-authored PR#10, flagged P1 race condition on `handleSubmit` bypass; Claude shipped fix `f77d0a9` 4m5s after PR open); cor-sys@10:11 (Cursor Agent's 9-minute batch on `cursor/dsm-b64e` with explicit operator handoff scaffolding commit `Cursor: Apply local changes for cloud agent` 7 minutes before the Cursor burst)
**Description**: Two different multi-AI handoff shapes exist. The *concurrent review handoff* (groundstate's Codex + Claude) runs both AIs against the same code, with the review-AI catching what the write-AI missed; the fix latency is short (single-digit minutes) because the write-AI session is still active. The *sequential batch handoff* (cor-sys's operator → Cursor) hands off a fully-staged workspace to a fire-and-forget agent that returns 9 minutes later with 5 commits and a structured PR. Both patterns are observable through commit and PR-body signatures — Cursor's footer carries `<a href="https://cursor.com/agents/bc-...">`; Codex appears in commit bodies citing the bug by name.
**Monetization fit**: pass — the highest-leverage finding for a multi-AI workflow playbook; productize as "concurrent-review setup (Claude + Codex)" and "batch-handoff setup (Claude + Cursor)" templates with signatures the operator can recognize after the fact.
**Distilled insight**: `/insights/claude-to-claude/ai-cross-review-setup.md`
**Related playbook**: `/products/playbooks/ai-cross-review-setup.md`; meta-companion `/products/playbooks/ai-review-event-instrumentation.md`

## Candidate raw observations (single-repo, not promoted)

- log-md-monotonic-anti-pattern-counter (cor-sys@10:01 only — but conceptually generalized to "anti-pattern-as-permanent-memory" habit, see synthesis § 6)
- bug-locus-walk-up-the-stack (cor-sys@10:06 only — 13-commit Hebrew encoding war ending in SWC patch)
- cursor-fire-and-forget-batch-burst (cor-sys@10:11 only — 9-minute Cursor batch)
- mid-session-refactor-dead-code-survives (core-unified@12:04 only — `<Navigate>` redirect-and-leave pattern)
- wiring-seam-monolithic-index-component (chess-mind@11:09 only — Index.tsx as single integration seam)

## Related playbooks

- `/products/playbooks/ai-cross-review-setup.md` — shipped Phase 4
- `/products/playbooks/ai-review-event-instrumentation.md` — shipped gap-closure round (meta-playbook; bundle-only)

## Cross-references

- Companion matrix: `/research/cross-repo/patterns-matrix.md`
- Narrative: `/research/cross-repo/synthesis.md` § 2, § 6, § 8
- Source pattern repo: COR-SYS's LOG.md / MEMORY.md / index/CLAUDE.md architecture
- Source observations:
  - `/research/cor-sys/extracted-insights.md`
  - `/research/groundstate-protocol/extracted-insights.md`
  - `/research/chess-mind-patterns/extracted-insights.md`
  - `/research/core-unified-consciousness/extracted-insights.md`
- Schema: `/insights/_template.md`
- Pipeline: `/pipelines/insight-extraction.md`

---

## Round 2 additions (2026-08-19 ingestion round)

### agent-identity-collapse
**Source observations**: MATI@09:12 (81 of 86 commits authored as the operator, empty bodies, `agent/*` branches, 55 in machine-cadence bursts at 31 s mean gap); anti-silo@09:30 (40 trailered commits vs 6 Claude-authored — 6.7× undercount); lessons@a648ff3 + @ae184a9 (this repo's own hidden-agent commits)
**Description**: An agent inheriting the operator's `user.name`/`user.email` and writing no trailer is invisible to every identity-based detector. The recorded author is a property of the writing tool's git config, not of who did the work. Detection needs a second, orthogonal signal — cadence — because identity and cadence have disjoint blind spots: identity misses the operator-configured agent, cadence misses Claude Code (which paces commits like a human). The reflexive case matters most: the `lessons` repo, which produced the four-feature classifier, carries 14 such commits, so the method that declared six repos "AI tools: none detected" would have misclassified its own history.
**Monetization fit**: pass 5/5 — encoded as `scripts/detect-agent-authorship.sh`, legible via the identity × cadence 2×2.
**Distilled insight**: `/insights/claude-to-claude/agent-identity-collapse.md`
**Method record**: `/research/cross-repo/authorship-attribution.md`

### adversarial-second-surface
**Source observations**: MATI#16/#17 (all 5 Claude commits are fixes, a state migrator and a test suite — zero features; branch `claude/code-review-*`); anti-silo (every `claude/*` branch is an audit or review; features arrive on `feat/*` and `agent/*`); Agent-Architect@857e0dd (a Haiku pass audits an Opus-built pipeline and finds 7 logic gaps)
**Description**: The second AI surface earns its cost by *not* building. When one agent writes both the implementation and its gates, the gates inherit the author's blind spot — MATI's builder wrote three CI contract checks, and the auditor found they matched source text with regular expressions, so a rename walks past them. Value scales with independence: different model, different context, different brief. Auditing is also cheaper than construction, which makes the cost-tiered form (a smaller model reviewing a larger one's output) rational rather than a compromise. Honest cost line: a batch of audit fixes desynchronizes identifiers, so a cross-review round is two commits, never one.
**Monetization fit**: pass 5/5 — extends the shipped `ai-cross-review-setup` playbook with role assignment, branch-naming convention, and cost tiering.
**Distilled insight**: `/insights/claude-to-claude/adversarial-second-surface.md`

### gate-left-behind-by-the-fix
**Source observations**: anti-silo@cb96bf4 (monolith split ships a 250-line guard test); anti-silo@79c4bd3 + @3c9198b (a manual deploy trigger, and the smoke-test gate that makes it unnecessary next time); MATI@e59043b/@a9c389b/@1e93197 (each contract check wired into CI in the same PR that motivated it)
**Description**: The durable artifact of an AI session is the gate it installs, not the diff it lands. A refactor decays as soon as the next feature arrives unless a machine holds the boundary; a manual intervention recurs unless it leaves a check behind. The diagnostic for a healthy AI-paired repo is therefore not the absence of manual fixes — it is that each manual fix is paired with a gate in the same session.
**Monetization fit**: pass — a session-close checklist item ("what gate did this session leave?"), encodable as a command.
**Distilled insight**: pending distillation

### agents-md-inter-agent-lane-contract *(candidate — 1 repo)*
**Source observations**: CRM_Google_ai `AGENTS.md` — "coordination for two coding agents on one working tree": Codex owns the structural refactor, Claude owns data + semantics; "ONE writer per file at a time. Read-before-write."; an edit freeze while the refactor is in flight; a `## Handshake` section to lift it; a section recording changes made *outside* the repo so the other agent does not double-handle them
**Description**: Beyond cross-review of finished PRs — two agents writing **concurrently to one tree**, coordinated by a committed file. The mechanism is ordinary concurrency control (mutual exclusion per resource, read-before-write, an out-of-band channel for effects outside the shared resource) applied to agents instead of threads, with commit frequency used as the liveness signal. The strongest single claude-to-claude artifact found in the portfolio; parked as a candidate until a second instance appears.
**Monetization fit**: strong on Defensible and Encodable; parked on Evidence-anchored (1 repo).
