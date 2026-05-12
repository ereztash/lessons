# cor-sys — Raw Insight Candidates

> Populated by Phase 1 deep dive. Each entry: timestamp, observation, dimension-guess, evidence pointer.

## Format

```
## YYYY-MM-DD HH:MM — <one-line title>
**Dimension guess**: claude-to-user | user-to-claude | claude-to-claude | user-to-user
**Evidence**: commit-sha:path/file | PR#N | issue#N
**Observation**: 2-5 sentences describing what was observed.
**Mechanism hypothesis** (optional): why this matters.
```

## Observations

---

## 2026-05-12 10:00 — Repo self-aware within 36 hours via single bundled commit

**Dimension guess**: user-to-claude
**Evidence**: cor-sys@50f9166:CLAUDE.md, cor-sys@50f9166:LOG.md, cor-sys#PR-3
**Observation**: At 2026-03-17 23:22 UTC — 31 hours and 56 minutes after `Initial commit` (`ed1eff0` at 2026-03-15 16:26) — the operator landed a single commit that added `CLAUDE.md`, `LOG.md`, and five gitignored slash commands (`/cor-checkpoint`, `/cor-formula`, `/cor-migrate`, `/cor-ship`, `/cor-debrief`). This commit shipped a 105 LOC addition across 2 files with a 9-second time-to-merge via PR#3. The repo went from product-only to product-plus-meta-tooling in the same evening as Phase 2 CBR shipped (`e30542d` at 22:59, 23 minutes earlier).
**Mechanism hypothesis**: The operator does not separate 'building the system' from 'building the tooling that prevents AI mistakes against the system.' They are bundled into the same session and shipped as one durable artifact. The pre-condition was three Claude-paired sessions accumulating enough friction (gh not installed, MCP config wrong format, secrets-in-chat) to justify codifying the prevention layer.

---

## 2026-05-12 10:01 — LOG.md anti-patterns accumulate as a monotonic counter, not a refactored doc

**Dimension guess**: claude-to-claude
**Evidence**: cor-sys@526237f:LOG.md, cor-sys@185faa6:LOG.md, cor-sys@7271fd8:LOG.md
**Observation**: LOG.md's Anti-Patterns table has 12 numbered rows as of master, with each row of shape `# | What went wrong | Root cause | Rule`. Earliest rows reflect early-March friction (gh not installed = #4; MCP config wrong = #2); latest reflects the Phase 3 stabilization commit (#12 ROUND::numeric, added in `185faa6` at 2026-03-25 11:12). The list never shrinks — `#10 Seed data has NULL feature_vectors — HNSW search returns no matches` is still present even though the system has since added graceful fallback (`51d5795`). The artifact is append-only.
**Mechanism hypothesis**: Anti-patterns are treated as *permanent navigation aids for future sessions*, not as bugs to close out. The cost of rereading a 12-row table is low; the cost of repeating any anti-pattern is high (anti-pattern #4 explicitly notes 'same error in previous session'). Append-only forces every future session to confront every prior failure mode.

---

## 2026-05-12 10:02 — Four heuristic skills emerge in one commit, six days before they are used

**Dimension guess**: user-to-claude
**Evidence**: cor-sys@ff7395d:skill.md, cor-sys@ff7395d:CLAUDE.md
**Observation**: All four heuristic skills (`delta-diagnostic`, `axis-router`, `stress-probe`, `symmetry-classifier`) were named together in a single commit `ff7395d` 'chore(tooling): add skill.md, update CLAUDE.md with GATE 0 token management protocol' on 2026-03-18 12:04. The same commit defined the cascading rules (`delta-diagnostic` stage 4 -> auto-invoke `symmetry-classifier`; `stress-probe` results feed into `delta-diagnostic`). They were *not* an evolutionary discovery distributed across commits — they were a planned codification, dropped in as a complete quad with cross-references to `index/CLAUDE.md` for full definitions.
**Mechanism hypothesis**: The skills are research outputs translated into a decision-tree format, not emergent abstractions from coding work. The cor-sys operator's prior consulting research (visible in the bundled PDFs: `מנוע DSM ארגוני_ מחקר ופיתוח.pdf`, `Bridging Diagnosis and Intervention Selection.pdf`) was distilled into 4 fast-path heuristics, then committed as a runtime token-saver. This is research-to-tooling translation, exactly what `/cor-formula` is named for.

---

## 2026-05-12 10:03 — PRs are notarization rituals, not review gates (11-second median TTM)

**Dimension guess**: user-to-user
**Evidence**: cor-sys#PR-1..#PR-16; cor-sys@526237f:none (statistical)
**Observation**: Across 13 merged PRs, median time-to-merge is **11 seconds**, mean is 37 seconds, fastest is 8 seconds (#5, #6, #9). The maximum is 4 minutes 3 seconds (PR#10 — Cursor Agent's DSM synthesis with full architecture diagram body). The single human (ereztash) merged every single PR. Six PRs have empty bodies (#1, #2, #8, #9, #11, #15). PR#3 ('docs: add CLAUDE.md entry point') had 9-second TTM despite being the most architecturally significant PR in the repo.
**Mechanism hypothesis**: PRs in single-operator AI-augmented repos serve a different function than in team repos. They are *audit trail artifacts* visible on the GitHub UI (the operator's status surface), not gates for asynchronous review. The 8-11 second floor likely reflects the time for a human to click 'Merge pull request' -> 'Confirm merge' from the email notification. The only TTMs > 60s correlate with rich-bodied PRs (#10, #16) that contain architectural risk worth a brief read-pass.

---

## 2026-05-12 10:04 — Identity convention flipped on 2026-04-03 — Claude stopped being co-authored, started being signed

**Dimension guess**: claude-to-claude
**Evidence**: cor-sys@1ab0c54 (Claude direct), cor-sys@77fa8a8 (Claude co-authored under COR-SYS Dev), cor-sys@50f9166 (Claude co-authored)
**Observation**: Before 2026-04-03, every Claude contribution carried a `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` trailer but was committed by `COR-SYS Dev <97252@cor-sys.local>`. Starting with `1ab0c54` at 2026-04-03 09:20 ('Add USTT primitives module'), commits are authored directly by `Claude <noreply@anthropic.com>` with no COR-SYS Dev wrapper. After this date, no further COR-SYS Dev commits exist on master — all 16 commits between 2026-04-03 and 2026-04-09 are Claude-direct. The transition coincides with the operator's adoption of Claude Code's `/cor-ship` slash command (introduced 2026-03-17 in `50f9166`) running unattended.
**Mechanism hypothesis**: The COR-SYS Dev identity is the Windows local user; the Claude identity is Claude Code's own git config. The shift suggests Claude Code began creating and pushing commits directly (likely via the same `/cor-ship` flow), bypassing the human shell. The fact that the prior 50 commits were *all* co-authored under COR-SYS Dev — never under ereztash personally — implies the operator was already paired with Claude from commit one but committing through their own shell. The April transition is not a workflow change; it is a *tool delegation* change.

---

## 2026-05-12 10:05 — Pre-Build Validation Protocol was retrofitted after Phase 3 rework

**Dimension guess**: user-to-claude
**Evidence**: cor-sys@526237f:LOG.md (section 'Pre-Build Validation Protocol'), cor-sys@185faa6:LOG.md, cor-sys@51d5795 (graceful OpenAI fallback)
**Observation**: LOG.md's 'Pre-Build Validation Protocol' section (run BEFORE any Phase: curl OpenAI, SELECT Supabase, `npm run build`) is *not* in the initial LOG.md added on 2026-03-17 (`50f9166`). It appears in the master version on 2026-04-09 (`526237f`). Anti-pattern #11 in the same file ('Next.js 16 route params need `Promise<{...}>` — pre-existing error caught at build') was logged after Phase 2 finished and Phase 3 began with a broken build. Anti-pattern #10 records 'Seed data has NULL feature_vectors — HNSW search returns no matches' — the OpenAI quota issue that made Phase 3 unable to embed CBR cases. Together these two anti-patterns drove the formalization of `curl https://api.openai.com/v1/embeddings ... | head -c 200` as a 30-second pre-flight.
**Mechanism hypothesis**: The protocol was retrofitted in response to 3+ hours of rework caused by skipping it. The LOG.md text says: 'If an external API can fail with 429/401/503 -> validate it in <1 min before building anything that depends on it' — a quantified ROI claim ('30 seconds -> saves 3 hours') that mirrors the actual cost paid. The reuse value of this protocol is portable across any project with paid external APIs.

---

## 2026-05-12 10:06 — Hebrew encoding war is a 13-commit anti-pattern walking-through-the-stack

**Dimension guess**: claude-to-claude
**Evidence**: cor-sys@bb3d459, cor-sys@86cf90e, cor-sys@f53a9a2, cor-sys@72b3efd, cor-sys@7719d64, cor-sys@5c2bf0d, cor-sys@6fbb735, cor-sys@31c607f, cor-sys@29ed2d9, cor-sys@e18b37e
**Observation**: Between 2026-04-03 12:27 and 2026-04-04 15:18 (27 hours), Claude shipped 13 sequential commits attempting to fix mojibake in Hebrew strings rendered by DsmOrgViewer. The escalation traversed every plausible layer: source file encoding (`bb3d459`), cache invalidation comment (`04a4184`), runtime tracing (`86cf90e` debug:), unicode escapes in the component (`f53a9a2`), removing the affected sections (`72b3efd`), route redirect (`f40ed7a`), a red canary banner test (`7719d64` — `test:`), force-dynamic + no-cache headers (`5c2bf0d`), new bypass route (`6fbb735`), unicode escapes for ALL .ts files (`31c607f`), restore sections (`29ed2d9`), force-dynamic on login (`e44a570`), force-dynamic on root (`d23bbba`), and finally `patch-package` against Next.js's SWC minifier to force `ascii_only: true` (`e18b37e`). The root cause was a cloud proxy/CDN corrupting raw UTF-8 Hebrew bytes — neither the source code nor Next.js was at fault.
**Mechanism hypothesis**: When the bug's locus is *infrastructure*, Claude-direct commits walk progressively up the stack (file -> component -> route -> framework patch) until they exit the application boundary. The intermediate `test:` and `debug:` commits — which are the only instances of those prefixes in the repo's history — are *visible diagnostic instruments* preserved in git. This sequence is highly portable as a 'bug-locus-discovery' workflow template, and the 'try escapes -> force ASCII output via build patch' final shape is a reusable encoding-corruption resolution pattern.

---

## 2026-05-12 10:07 — Three-PR abandonment on same auto-named claude/* branch reveals branch-PR desync anti-pattern

**Dimension guess**: claude-to-user
**Evidence**: cor-sys#PR-12, cor-sys#PR-14, cor-sys#PR-15, cor-sys@bb3d459
**Observation**: PRs #12, #14, and #15 are all on branch `claude/add-ustt-primitives-wiqLc`, all opened by Claude Code (via auto-PR) between 2026-04-03 10:57 and 12:47, and all closed without merge. The bodies of #12 and #14 explicitly say 'Closed — merged directly to master / superseded by direct master push. All changes already on master in commit bb3d459.' This is the only instance in 16 PRs where the merge workflow degraded. Total cost: 3 PR notifications, 3 closed-unmerged events, branch left present in `list_branches`.
**Mechanism hypothesis**: Claude Code's `/cor-ship` flow opens a PR after pushing to a feature branch. When the operator chooses to bypass and merge directly to master (e.g., during the Hebrew encoding war's urgent commits), the auto-opened PR is now redundant. If the same branch is reused for a follow-up push, a new auto-PR opens — but the branch is now behind master (because master got the bypass commit). Three consecutive auto-PRs on the same branch indicate the operator did not delete the branch between sessions. The fix is either (a) auto-delete branch after closure, or (b) auto-rebase before PR-open. cor-sys ships neither, so the desync persists as a benign-but-noisy state.

---

## 2026-05-12 10:08 — Bilingual HE+EN appeared in `index/CLAUDE.md` as the master entry point — never generalized

**Dimension guess**: user-to-claude
**Evidence**: cor-sys@526237f:index/CLAUDE.md, cor-sys@526237f:CLAUDE.md (root), cor-sys@31c607f (HE unicode escapes)
**Observation**: The root `CLAUDE.md` is entirely English (1.8 KB, 'GATE 0 — Session Init'). The deeper `index/CLAUDE.md` (4.7 KB) is **bilingual**: section headers in Hebrew (`שלב 0 — טעינת זהות`, `שלב 1 — Board Decides`), some table values English (THINKING_STYLE names like `Triage`, `Pipeline`, `Strategic`), some Hebrew (anchor signal lists, MOC names). The bilingualism is not localization — it is a single document expressing a single cognitive architecture in two registers. Hebrew encoding was a known engineering risk (anti-pattern #10/#11 NOT about this, but the 13-commit war was) — yet Hebrew was never removed; instead, the SWC minifier was patched to force `ascii_only: true` for all .ts files.
**Mechanism hypothesis**: The bilingual `index/CLAUDE.md` was authored before language unification became a code-quality question. The operator's *thinking medium* is mixed Hebrew/English (research PDFs are in Hebrew; code is English). Forcing the architecture doc to monolingual would lose semantic anchors. The encoding war reveals the cost of this choice: an infrastructure-layer patch was preferred over removing the Hebrew. This is a *data point* about how the operator weighs cognitive ergonomics vs build complexity.

---

## 2026-05-12 10:09 — The five slash commands form a complete session lifecycle

**Dimension guess**: user-to-claude
**Evidence**: cor-sys@50f9166 (commit body lists 5 commands), cor-sys@526237f:skill.md (lists 8 commands incl. 3 added later)
**Observation**: The original five (added 2026-03-17 in `50f9166`, all gitignored under `.claude/commands/`): `/cor-checkpoint` (session start with status), `/cor-formula` (research-to-TypeScript translation), `/cor-migrate` (Supabase migration workflow), `/cor-ship` (commit + push + PR, explicitly 'no gh'), `/cor-debrief` (meta-cognitive retrospective + LOG.md update). By 2026-04-09, skill.md lists 8 commands total: the original five plus `/plan` (Iron Rule: any multi-file change), `/compress-context` (>70% context or noisy), `/simplify` (post-code quality review). The set covers: session start, plan, execute, ship, debrief, context-health, code-quality. There is no `/test`, `/deploy`, or `/release` — those are not workflow units in cor-sys.
**Mechanism hypothesis**: The slash command set is a *complete cognitive scaffold* of one session: enter (checkpoint) -> plan -> formula (if research) -> migrate (if DB) -> ship (always) -> debrief -> log. The two health commands (`/compress-context`, `/simplify`) are interrupts, not phases. The absence of `/test`/`/deploy` matches the repo's reality: tests run via `npm test` directly (mentioned in LOG.md), deploy is not yet wired (per `docs/roadmap-to-deploy.md`). The lifecycle covers what *exists*, not what *might* exist — a discipline worth preserving.

---

## 2026-05-12 10:10 — The CampaignCraft absorption shows the repo as a unification target, not a starter

**Dimension guess**: user-to-user
**Evidence**: cor-sys#PR-16, cor-sys@182a6b3, cor-sys@526237f:src/lib/growth (dir)
**Observation**: On 2026-04-09 at 15:13, PR#16 merged a single commit `182a6b3` that absorbed the entire CampaignCraft project (a separate Vite/React + Supabase Edge Functions app) into cor-sys as `src/app/(growth)/` and `src/lib/growth/`. The PR body states 'CampaignCraft ceases to exist as a standalone project' and lists: 40+ growth engines, 60 shadcn/ui components, 41 custom growth components, 27 Radix UI packages added, 10 Supabase Edge Functions converted to Next.js API routes, 5 database migration files (with `growth-` prefix to namespace), 688/706 tests passing, all growth code marked `@ts-nocheck` to bridge the strictNullChecks divergence. TTM was 1 minute 14 seconds.
**Mechanism hypothesis**: cor-sys is treated as the *destination* for the operator's broader product surface, not as one component of a larger portfolio. The unification cost was paid in one commit, with explicit acknowledgment of the trade-off (`@ts-nocheck` everywhere in growth code, 18 test failures accepted). This implies: (a) the operator runs many side projects but expects a single mature template to absorb them; (b) the mature template has enough scaffolding (CLAUDE.md, LOG.md, /cor-ship, migration conventions) that absorbing 80+ new files is a 1-minute operation; (c) the source project (CampaignCraft) is closed not by archive but by *being the merged child*. For cross-repo synthesis: cor-sys is likely the master, not a peer, in the 5-repo set.

---

## 2026-05-12 10:11 — Cursor Agent's 5-commit 9-minute burst shows externally-formatted hand-off

**Dimension guess**: claude-to-claude
**Evidence**: cor-sys@cee079e, cor-sys@00e9931, cor-sys@e898d1e, cor-sys@e319f61, cor-sys@49f9ada, cor-sys@86a72c5
**Observation**: Cursor Agent's 5 commits land in 9 minutes (2026-03-28 15:08-15:17), all with crisp `feat(scope):` or `fix(scope):` headers: `fix(taxonomy)`, `feat(synthesis)`, `feat(content)`, `feat(viewer)`, `feat(viewer)`. The preceding commit (`86a72c5` at 15:01, by COR-SYS Dev) is titled 'Cursor: Apply local changes for cloud agent' — an explicit handoff scaffolding. Five Cursor commits then arrive seven minutes later, all on `cursor/dsm-b64e`. The PR#10 body uses a distinct Cursor template with `## Summary / ## Changes / ## Tests / ## Architecture` headers and `<a href="https://cursor.com/agents/bc-b30b9101-...">` open-in buttons. After this 9-minute burst, no further Cursor commits appear in cor-sys's history.
**Mechanism hypothesis**: Cursor's cloud agent operates in *discrete time-boxed runs* — the operator provides a brief, the agent runs, commits, PRs, exits. The signature is: short total wall-time, all commits batched together, scope-prefixed conventional headers, rich Markdown PR body with architecture diagram, Cursor-branded footer with deep links. Compared to Claude Code's pattern (mixed-prefix sequence over hours, session-link footer, sometimes multiple PRs per session): Cursor is a *fire-and-forget batch worker*, Claude Code is an *interactive co-pilot*. This dimensional difference is observable cross-repo.

---

## 2026-05-12 10:12 — Zero issues + 32 docs files reveals docs/ is the issue tracker

**Dimension guess**: user-to-user
**Evidence**: cor-sys list_issues (both states) = 0; cor-sys@526237f:docs/ directory listing (32 .md files, ~270 KB)
**Observation**: cor-sys has zero issues — neither open nor closed. It has 32 documentation files under `docs/` totaling ~270 KB, including `product-roadmap.md` (12.8 KB), `task-table.md` (5.7 KB), `roadmap-to-deploy.md` (7.7 KB), `cursor-errors-audit.md` (2.2 KB), `code-quality-audit.md` (8.7 KB), and `product-decisions.md` (5.5 KB). The functions GitHub Issues normally serve (backlog, bug log, decision archive) live inside committed Markdown files instead.
**Mechanism hypothesis**: The operator chose committed-Markdown over Issues because: (a) Markdown is reachable from any Claude session via GATE 0 + Tier 1 loading rules — Issues are not; (b) Markdown survives repo forks and clones — Issues do not; (c) Markdown carries version history and blame — Issues only carry comment chronology. The trade-off is: no inbound channel from non-collaborators, but cor-sys has no non-collaborators. This pattern works *only* for single-operator AI-paired repos and is worth flagging as an environmental precondition for the pattern's reuse.
