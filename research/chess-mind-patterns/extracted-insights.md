# chess-mind-patterns — Raw Insight Candidates

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

## 2026-05-12 11:00 — 174-commit bot blast bookended by silence — the resumption shape

**Dimension guess**: user-to-user
**Evidence**: chess-mind-patterns@b331aa1 (template 2025-01-08), chess-mind-patterns@b5113d1 (first bot commit 2026-03-08 14:38), chess-mind-patterns@18426b1 (last bot commit 2026-03-09 01:06), chess-mind-patterns@875fe1c (first human commit 2026-03-23 21:34), chess-mind-patterns@2c7ced2 (HEAD 2026-03-23 22:46)
**Observation**: The repo's commit graph is a *trimodal* spike on a flat baseline: a single Lovable template stub on 2025-01-08, then a 10h28min bot blast on 2026-03-08/09 producing 171 commits at 16.3/hour mean, then **14 days 20h 28min** of silence, then a 72-minute human sprint producing 3 commits totalling 4462 additions across 22 new files, then 50+ days of silence (as of 2026-05-12). There are zero commits outside these three islands. There is no ramp-up and no ramp-down — the bot phase and the human phase both *start* with substantive feature commits and both *end* mid-feature.
**Mechanism hypothesis**: The operator's workflow treats committed-code-time as discrete sprints, not continuous maintenance. The 14-day gap is incubation, not abandonment: the operator presumably uses the Lovable preview personally to identify the missing layer, then sits down with Claude Code in a single concentrated evening to weld it on. The *predictor of resumption* (vs. permanent abandonment) is likely a fact about the operator's external state — a tournament approaching, a personal practice goal, an article being written — none visible in the repo. What is visible is the *signature*: when resumption happens, it happens in <2 hours, with `feat:` headers and Co-Authored-By Claude trailers, and adds 20+ new files without deleting any.

---

## 2026-05-12 11:01 — chess.js arrives as a build-error fix, not a design choice

**Dimension guess**: claude-to-claude
**Evidence**: chess-mind-patterns@c1c2685 (2026-03-08 17:39 'Add chess.js dependency'), commit body: 'Installed the chess.js package to resolve build errors.'
**Observation**: The bot's only domain library — `chess.js@^1.4.0`, the core of every chess-handling component — arrives at commit 64 of 175, three hours into the bot blast, framed as an *error fix* rather than a planned dependency. Earlier commits (`Add WinPatternAnalysis UI`, `Refined game analysis`) reference chess concepts but evidently call into shims or stubs; the build fails; the agent only then bolts on chess.js. The change is 4 lines: 1 in `package.json`, 3 in `bun.lock`.
**Mechanism hypothesis**: Lovable's gpt-engineer-app generates feature code optimistically — invoking abstractions like `new Chess()` or `chess.fen()` before confirming the dependency exists. When the build breaks, a *separate* commit installs the missing dep. This produces a characteristic *late-dependency-injection* shape in the commit graph that is observable as a marker of LLM-generated codebases: foundational deps land in the middle of the history, not at the start. The cost is graph noise; the benefit is that the agent does not pre-think dependencies, which speeds the first feature commits.

---

## 2026-05-12 11:02 — Hebrew commit subjects leak the operator's prompt language

**Dimension guess**: user-to-claude
**Evidence**: chess-mind-patterns@961f40d ('שופר ייצוא דו״חות' 2026-03-08 18:52), chess-mind-patterns@a8794c6 ('הוסף breakpoints Tooltip' 2026-03-09 00:32), chess-mind-patterns@ef98955 ('Add metacognition分析' 2026-03-08 23:05)
**Observation**: Three of the 171 bot commits (1.8%) carry non-English subject text: two in Hebrew, one with Chinese fragment '分析' (meaning 'analysis') concatenated to an English verb. All three sit at *transitions between micro-phases* (e.g., `ef98955` is the first commit of the metacognition cluster; `a8794c6` is between two animated-breakpoint English subjects). The Hebrew subjects are otherwise indistinguishable from their English neighbours in code content — only the subject text differs.
**Mechanism hypothesis**: Lovable's commit-subject generation derives the leading verb phrase from the operator's prompt text. When the operator types a prompt in Hebrew (their primary language), the agent echoes the Hebrew verbatim into the commit subject. The Chinese fragment is most likely a paste-residue from a research note (`分析` is the Mandarin term used in technical metacognition literature) — the operator copied a phrase from a Chinese-language source and pasted it as part of the prompt, leaving the code-point in the subject. This means commit subjects are a *user-to-claude prompt language proxy* — a way to detect the prompt language without access to the Lovable session log. The cross-language commits also localise *when* the operator was typing in Hebrew vs English, which is itself a behavioural signal.

---

## 2026-05-12 11:03 — Bot phase deletes nothing; human phase deletes only inside files it just created

**Dimension guess**: user-to-user
**Evidence**: chess-mind-patterns@875fe1c (+1421/-24), chess-mind-patterns@f590fe6 (+2102/-23), chess-mind-patterns@2c7ced2 (+939/-22), all 69 deletions inside files originally created by the bot OR by an earlier human commit in the same session
**Observation**: Across the entire repo history, no bot-originated file is ever deleted. The 69 deletion lines across all three human commits are confined to: (a) `src/pages/Index.tsx` modifications to re-wire components (the bot's wiring file); (b) modifications to `TLDRCard.tsx` and `PersonalPuzzles.tsx` between human commits A/B/C (i.e., revising files the same operator just created 30-72 minutes earlier). The ~50 bot-only components and engines (LearningTrajectory.tsx, MetacognitiveAnalysis.tsx, narrative-engine.ts at 45 KB, etc.) survive untouched into HEAD.
**Mechanism hypothesis**: When a Lovable-generated codebase is resumed by Claude Code, the operator's frame is *additive*, not *corrective*. The bot's output is treated as an existing surface that the operator does not have time to relitigate. Two practical consequences: (1) the architecture grows by layering (analytic widgets + parallel action widgets), not by refactoring, leaving the wiring file (`Index.tsx`) as the only growth seam; (2) the dead-code risk is high — any bot-built component that lost its place in the user flow is still in the bundle. For the resumption playbook, this is a *time-cost-saving move*: the human commits add 4462 lines in 72 minutes, an effective velocity that would be impossible if any of that time were spent reading or deleting bot code.

---

## 2026-05-12 11:04 — Bot built analytics (33 widgets, 24 engines); human added actions (8 widgets, 6 engines)

**Dimension guess**: user-to-user
**Evidence**: chess-mind-patterns@2c7ced2:src/components/, chess-mind-patterns@2c7ced2:src/lib/, file-touch overlap from chess-mind-patterns@875fe1c|f590fe6|2c7ced2
**Observation**: The bot's 171 commits produced ~33 analytic widgets (one per metric or per game-phase view: `LearningTrajectory`, `MetacognitiveAnalysis`, `CandidateMoves`, `EvalChart`, `WinPatternAnalysis`, etc.) and ~24 engines under `src/lib/` (narrative-engine.ts alone is 45 KB). The human's 3 commits added 8 *action* widgets (`PersonalPuzzles` review UI, `SkillTree` next-step display, `TournamentCountdown` plan, `TrainingROI` dashboard, `TLDRCard` top-3 summary, `MicroMission` 3-game focus, `PatternRecommendations` exploit/fix/lever, `EloGoal` setter) backed by 6 *action* engines (`spaced-repetition.ts` SM-2 algorithm, `skill-dag.ts` 20-skill DAG, `training-roi.ts` before/after deltas, `lichess-links.ts` external practice URLs, `elo-goal.ts` priority mapping, `causal-explanations.ts` mechanism+fix per weakness label). The ratio of bot analytic widgets to human action widgets is ~4:1.
**Mechanism hypothesis**: The bot phase optimises for *informational density* (every metric becomes a widget) because the agent's output is bounded by how many distinct UI surfaces it can be prompted to produce. The human's resumption optimises for *behavioural compactness* (each widget is a verb: review, set goal, follow tree, do mission). The pair forms an analytic-action sandwich where the bot supplies the diagnostic substrate and the human supplies the progression spine. This division of labour is observable in other 'resumed Lovable' repos by checking the ratio: a repo where the human's commits are 1:1 with the bot's widgets is being *refactored*; a repo where the ratio is 4:1 to 6:1 with mostly new files is being *annexed*.

---

## 2026-05-12 11:05 — Three human commits use `feat:` + multi-line body; bot uses 3-word imperatives

**Dimension guess**: claude-to-claude
**Evidence**: chess-mind-patterns@875fe1c (title 'feat: add TL;DR, pattern recommendations, transition signal & demo mode'), chess-mind-patterns@f590fe6 (title 'feat: full course replacement — Phase 1-5 implementation'), chess-mind-patterns@2c7ced2 (title 'feat: Lichess deep-links, demo puzzle seeding, ELO goal setter, PWA + notifications'); contrast with bot subjects like 'Add breakpoint sliders', 'Save plan in Lovable', 'Preceding changes', 'Changes'
**Observation**: All three human commits carry conventional-commit `feat:` prefixes, multi-line bodies with file-by-file annotation (e.g., 'src/lib/spaced-repetition.ts: SM-2 algorithm with localStorage persistence'), and `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` trailers. The bot's 171 subjects use a 6-word fixed vocabulary (`Add X`, `Fix X`, `Update X`, `Enhance X`, `Save plan in Lovable`, `Preceding changes`) with `X-Lovable-Edit-ID: edt-<uuid>` trailers. The two registers are visually distinct in any `git log` rendering.
**Mechanism hypothesis**: This is a Claude-Code-vs-Lovable signature, visible at the commit-subject layer alone. A bisecting reader can tell which agent shipped a commit without reading the diff. For the cross-repo synthesis, the `feat:` block with `+ file: description` body lines is a reliable marker of Claude-Code-paired commits where the operator dictated the structure; the `Add X` imperative with edit-ID trailer is a reliable marker of Lovable platform commits. The Co-Authored-By trailer is portable — it tells future tools that this commit had AI involvement, which is the cor-sys operator's convention as of 2026-04-03 (cor-sys insight 2026-05-12 10:04). The chess-mind-patterns commits *precede* the cor-sys identity flip (March 23 vs April 3), so the Co-Authored-By trailer was already in use 11 days before cor-sys made it standard.

---

## 2026-05-12 11:06 — Zero PRs + zero issues + no docs + no CI = the prototype shape

**Dimension guess**: user-to-user
**Evidence**: chess-mind-patterns list_pull_requests = [], list_issues = {totalCount:0}, chess-mind-patterns@2c7ced2 root listing (no `docs/`, no `.github/`, no `CLAUDE.md`, no `AGENTS.md`, README is unchanged Lovable template); contrast with cor-sys insight 2026-05-12 10:12 (32 docs files, 270 KB)
**Observation**: chess-mind-patterns has *none* of the operator infrastructure visible in cor-sys: no CLAUDE.md, no LOG.md, no `.claude/commands/`, no `docs/`, no GitHub Actions workflow, no issue templates, no labels, no project board, no README beyond the literal template placeholder string `REPLACE_WITH_PROJECT_ID`. The repo is *only* its code. Yet the same operator, in the same month (cor-sys's PR#16 absorbed CampaignCraft on 2026-04-09, 17 days after chess-mind-patterns' HEAD commit), ran cor-sys with maximum infrastructure (CLAUDE.md, LOG.md, 8 slash commands, 32 docs files).
**Mechanism hypothesis**: The operator runs (at least) two parallel modes: a *prototype mode* for time-bounded throwaway-or-pause experiments where ceremony cost would exceed value (chess-mind-patterns is a personal chess improvement tool; the operator is presumably the only user, and the operator does not need a backlog because they are not their own customer in this product), and a *system mode* for repos intended to last and be operated by Claude Code repeatedly. The infrastructure split is *not* a function of repo maturity — it is a *deliberate choice at repo-birth* about which mode the repo lives in. The signal: if a Lovable-bootstrapped repo gets `CLAUDE.md` added by the human resumer, it has been promoted to system mode; if it gets `feat:` commits but no infrastructure, it has been promoted to *useful prototype* but not to system. chess-mind-patterns is in the second category.

---

## 2026-05-12 11:07 — Lichess deep-links and PWA are deployment-grade and arrive only in the final commit

**Dimension guess**: user-to-claude
**Evidence**: chess-mind-patterns@2c7ced2 ('feat: Lichess deep-links, demo puzzle seeding, ELO goal setter, PWA + notifications'), chess-mind-patterns@2c7ced2:src/lib/lichess-links.ts (247 LOC mapping 20 skill IDs to Lichess training URLs), chess-mind-patterns@2c7ced2:public/manifest.json (PWA manifest), chess-mind-patterns@2c7ced2:public/sw.js (service worker with notification flow)
**Observation**: The final human commit (and repo HEAD) is the only commit that introduces external-world integrations: a 247-line static map from internal skill IDs to Lichess training-mode URLs (`https://lichess.org/training/...`), a PWA manifest with theme-color and icons, a service worker that registers for push notifications. None of these are bot-generated; all three are absent from the bot phase entirely. The commit also introduces `seedDemoPuzzles()` to inject 5 demo cards on first Demo load — making the demo mode *usable without uploading PGN files*, a small friction-removal that is hard to justify from inside a single Lovable preview session.
**Mechanism hypothesis**: External integrations and PWA features have a different cost shape than analytical features. They require: (a) reading external documentation (Lichess URL schemes, Web Push API); (b) hand-curating a mapping table; (c) writing a service worker that survives reload. These are exactly the kinds of tasks where Claude Code paired with the operator beats an in-browser Lovable session — the operator can ask Claude to enumerate Lichess training tags by category, paste the 20-skill table, and get back a typed mapping in a single round-trip. Lovable's preview-driven UX would force the operator to ship-and-test each link interactively. The fact that all three integrations land *together*, in the final commit of the 72-minute sprint, suggests they were planned as a single shippable block — the project transitions from 'local analyzer' to 'installable, notification-capable practice companion' in one push.

---

## 2026-05-12 11:08 — README never written; Lovable placeholder survives to HEAD

**Dimension guess**: user-to-user
**Evidence**: chess-mind-patterns@2c7ced2:README.md still contains literal string 'REPLACE_WITH_PROJECT_ID' in three places (`https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID`)
**Observation**: At repo HEAD (2026-03-23), the README.md is byte-identical to the Lovable template default with the project ID placeholder unfilled. Neither the bot nor the operator wrote any project description, feature list, screenshots, demo URL, or install instructions tailored to chess-mind-patterns. The repo's name, the chess.js dependency, the three `feat:` commit messages, and the Lichess deep-links are the only sources from which a fresh reader could infer the product.
**Mechanism hypothesis**: For a single-operator prototype with no external collaborators, README rot is rational — the operator has full context in their head; the cost of writing a README is non-zero; the marginal value (to themselves) is near-zero. This is consistent with the no-issues, no-docs, no-CLAUDE.md pattern: the operator's *self-narration surface* lives outside the repo (in their head, in their Claude Code conversation history, in the Lovable session log). The README placeholder is the canonical 'this is not a public-facing repo' marker. Reuse signal: when scanning a Lovable-bootstrapped repo, check the README first — if it still says REPLACE_WITH_PROJECT_ID, treat the repo as private prototype regardless of its public visibility on GitHub.

---

## 2026-05-12 11:09 — The wiring seam — Index.tsx is the only file the human modified across all three commits

**Dimension guess**: user-to-user
**Evidence**: chess-mind-patterns@875fe1c (Index.tsx +82/-24), chess-mind-patterns@f590fe6 (Index.tsx +28/-2), chess-mind-patterns@2c7ced2 (Index.tsx +10/-2)
**Observation**: `src/pages/Index.tsx` is 41 KB at HEAD and is the *only* file modified in all three human commits. Every other change is either a new file or a modification to a file the same operator created within the same 72-minute session. The three diffs against Index.tsx grow progressively smaller (+82/-24, +28/-2, +10/-2) as more of the action layer is in place. The pattern: each commit (a) creates new action engines and widgets; (b) mounts those widgets into Index.tsx at the top of the appropriate tab; (c) wires the new engines into the existing analysis trigger.
**Mechanism hypothesis**: A monolithic top-level page component becomes the *single integration seam* in a layered resumption — the bot's components remain self-contained behind their own interfaces, the human's new components are independent, and the only place where the two layers meet is the wiring file. This is architecturally fragile (Index.tsx grows unboundedly; refactor cost is deferred forever), but it is *velocity-optimal* for a single-session sprint: the operator only has to read one file to understand the integration state. For the reuse playbook: a Lovable resumption that touches >2 bot-generated component files is doing surgery; a resumption that only touches the wiring file is doing parallel-construction. The chess-mind-patterns case is at the velocity-optimal extreme — 22 new files, 3 modified files, 1 of which is the wiring seam.

---

## 2026-05-12 11:10 — Test infrastructure exists but is unused — Vitest installed, only template `example.test.ts` ships

**Dimension guess**: claude-to-claude
**Evidence**: chess-mind-patterns@2c7ced2:package.json (vitest 3.2.4, jsdom, @testing-library/react, @testing-library/jest-dom — all installed), chess-mind-patterns@2c7ced2:src/test/ (only `example.test.ts` at 143 bytes and `setup.ts` at 353 bytes)
**Observation**: The Vite + React + shadcn-ui Lovable template ships with Vitest pre-configured. The repo dutifully inherits the test infrastructure, including `vitest.config.ts`, `src/test/setup.ts`, and the placeholder `example.test.ts`. Neither the bot's 171 commits nor the human's 3 commits add any real tests. The `npm test` script remains runnable; the operator presumably never invoked it. No commit subject in the entire history mentions tests.
**Mechanism hypothesis**: Test infrastructure scaffolded by a template is a *latent capability* — present but uninvoked. For Lovable-generated prototypes that ship without backend logic, the cost of testing (mocking React state, simulating PGN inputs) is higher than the cost of testing manually in the live preview. The human's resumption did not change this calculus — even when adding SM-2 algorithm code (a clearly testable pure function in `spaced-repetition.ts`), no unit test was added. Reuse signal: presence of Vitest in package.json without corresponding test files is a high-confidence indicator of a prototype-mode Lovable repo; a system-mode repo would have either deleted Vitest or populated it. The split is binary — there are no half-tested chess-mind-patterns peers.
