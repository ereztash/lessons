# groundstate-protocol — Raw Insight Candidates

> Populated by Phase 1 deep dive. Each entry: timestamp, observation, dimension-guess, evidence pointer.

## Format

```
## YYYY-MM-DD HH:MM — <one-line title>
**Dimension guess**: claude-to-user | user-to-claude | claude-to-claude | user-to-user
**Evidence**: groundstate-protocol@<short-sha>:path/to/file | groundstate-protocol#PR-N
**Observation**: 2-5 sentences describing what was observed.
**Mechanism hypothesis** (optional): why this matters.
```

## Observations

---

## 2026-05-12 11:00 — Repo pivots from Lovable grounding tool to Claude-driven landing page in one commit, after five-week silence

**Dimension guess**: user-to-claude
**Evidence**: groundstate-protocol@dc90fee:src/pages/Landing.tsx, groundstate-protocol@abcdda7:(GroundState flow), gap 2026-03-08 -> 2026-04-14
**Observation**: For 37 days the repo was a Lovable-only `GroundState` mental-health grounding tool (8 bot commits 2026-03-08 06:27-06:39, then silence). On 2026-04-14 13:25, commit `dc90fee` by `Claude <noreply@anthropic.com>` added Landing.tsx + Header.tsx + SignupForm.tsx, demoted the entire GroundState flow to the archive route `/groundstate`, and re-titled the page 'Protocol Ocean Blue'. This is the moment a Lovable template starts a second life as something else entirely. The body carries the first `https://claude.ai/code/session_*` signature in the repo.
**Mechanism hypothesis**: Lovable templates produce *technical scaffolding* (working Vite/React/shadcn app with one product idea). Claude Code is invoked when the operator wants to *change the product idea*. The 5-week silence is the operator considering what to build instead. The pivot is non-destructive — GroundState is preserved at `/groundstate` rather than deleted — because the cost of keeping it is zero on a static SPA. This is a portable pattern: 'Lovable provides the skeleton; Claude reshapes the soul.'

---

## 2026-05-12 11:01 — Bot commits never fully stop, even after Claude takes over

**Dimension guess**: claude-to-claude
**Evidence**: groundstate-protocol@e8a12bc, groundstate-protocol@33b1066, groundstate-protocol@0e45449
**Observation**: After Claude's first commit on 2026-04-14 13:25, three more lovable-dev[bot] commits appear: `0e45449` 2026-04-14 20:04 ('Update site info for publish'), `33b1066` 2026-05-06 12:56 ('Work in progress'), and `e8a12bc` 2026-05-06 12:57 ('Lovable update: בדוק שהטקסט החדש נראה טוב בתצוגה ושהשורות נשברות יפה במובייל' = 'check the new text looks good in preview and that the lines break nicely on mobile'). The `e8a12bc` commit lands **between** the merge of PR#8 (12:48) and the start of PR#9 (13:13). The two AI surfaces are sequenced, not in conflict.
**Mechanism hypothesis**: The operator uses Lovable as the **visual preview surface** even after Claude Code owns the codebase. The bot commits in May are the operator opening Lovable's editor, viewing the rendered page, asking Lovable to 'check the new text looks good in preview', and committing the request as a no-op artifact. Lovable is the *render-and-review* surface; Claude Code is the *write* surface. The two coexist because they serve different cognitive moments. Portable pattern: dual-AI surfaces are not mutually exclusive — they can have different roles in the same workflow.

---

## 2026-05-12 11:02 — Editorial voice escalates from 'Changes' to '11 cited research sources' in 9 weeks

**Dimension guess**: claude-to-claude
**Evidence**: groundstate-protocol@9b634aa, groundstate-protocol@c4867f5, groundstate-protocol@af24284
**Observation**: The commit-subject voice walks through 12 observable phases (cataloged in architecture-notes.md). Earliest bot voice: `9b634aa` 'Changes' (no context). Mid voice: `b9e8a1c` 'Implement GroundState main flow'. First Claude voice: `dc90fee` 'Create landing page for Protocol Ocean Blue'. First research-cited voice: `c4867f5` 'Tune landing copy and layout for conversion with behavioral research (Dai/Milkman/Riis 2014; Tversky & Kahneman 1974; Levav & Fitzsimons 2006; Cialdini 1984; Gollwitzer 1999; Ebbinghaus 1885; Murdock 1962)'. Final research-systematic voice: `af24284` 'Research-driven conversion lift: founder mark, progressive form, process preview' with a body citing 11 sources (HubSpot 40K-page form study, KlientBoost, ConsultingSuccess, Genesys 2026, Digital Applied 2026, Decoy Effect research).
**Mechanism hypothesis**: The voice escalation is **monotonic** — no subsequent Claude commit drops back to a less-cited register once research-citation enters. This suggests the operator (or Claude's session memory within a single sprint) keeps raising the precision bar. Once 'Dai/Milkman/Riis 2014' appears in a body, future bodies cannot go back to 'add hero section'. The voice is a one-way ratchet. Portable pattern: editorial commit voice is itself a learning artifact — once you cite, you must keep citing, and that drives quality.

---

## 2026-05-12 11:03 — Identity-frame copy was attempted, universalized, and discarded in 42 minutes

**Dimension guess**: claude-to-claude
**Evidence**: groundstate-protocol@fe751b3 (11:36), groundstate-protocol@0ca7336 (11:41), groundstate-protocol@1756944 (12:18)
**Observation**: On 2026-04-19, Claude shipped three Hero/Problem rewrites in 42 minutes: `fe751b3` 11:36 introduced the 'hidden-discipline flip' (the buyer is a hybrid practitioner hiding a second discipline that is the real edge); `0ca7336` 11:41 universalized it (dropped the three specific profession pairs); `1756944` 12:18 **discarded the entire frame** in favor of a buyer-side reframe. The discard commit body explicitly names the reasons: 'דיסציפלינה is heavy Hebrew, the list of profession pairs read like a CV, the grammar of מסתתר את was wrong.' The previous frame had only existed for 42 minutes.
**Mechanism hypothesis**: This is **iterative copywriting with version control as the editor's notebook**. The hypothesis (hidden-discipline) was given a fair test (committed, universalized) and then killed with reasoned post-mortem. The killing-commit body is itself a portable artifact: it documents Hebrew-grammar-correctness as a quality dimension equal to behavioral-research-fit. Most repos discard ideas in conversation; this repo discards them in commit history with named reasons. Portable pattern: failed copy experiments can be preserved as positive learning if the killing-commit cites the reason for discard.

---

## 2026-05-12 11:04 — Hebrew RTL templates emerge at PR#9 and stabilize over two PRs

**Dimension guess**: claude-to-user
**Evidence**: groundstate-protocol#PR-9 body, groundstate-protocol#PR-10 body
**Observation**: PRs #1-#8 use mixed body shapes (empty / short bullets / one English template at #2). PR#9 (created 2026-05-06 13:14) introduces a **Hebrew RTL template** with sections: `## האסטרטגיה (תקציר)`, `## מה השתנה` (with subsections per component), `## בדיקות` (Markdown checkboxes including `[x] אין em-dash, אין סימני קריאה, אין מילים אסורות`), `## דגלים` (placeholder flags), and an italic `_Generated by [Claude Code](https://claude.ai/code/session_*)_` footer. PR#10 (50 minutes later) reuses the same template verbatim with new sections `## ההקשר`, `## הממצאים שהובילו לשינויים` (7-row research-findings table), `## השינויים`, `## בדיקות`, `## דגלים`. These are the two longest-TTM PRs in the repo (39m 30s and 50m 13s — vs 9-second median).
**Mechanism hypothesis**: The Hebrew template is the audience-matched documentation surface. The operator reads Hebrew for editorial review; Claude Code generates Hebrew-templated PR bodies *because the operator is the reviewer*. The 'forbidden words' checklist (אין em-dash, אין סימני קריאה, אין מילים אסורות = 'no em-dash, no exclamation marks, no forbidden words') is a **style guide encoded as a PR-acceptance gate**. Portable pattern: PR templates can be a place to encode editorial style rules that would otherwise live in a separate CLAUDE.md — useful when no CLAUDE.md exists.

---

## 2026-05-12 11:05 — Codex caught a real P1 race condition on PR#10; Claude fixed it within 5 minutes

**Dimension guess**: claude-to-claude
**Evidence**: groundstate-protocol@f77d0a9, groundstate-protocol#PR-10
**Observation**: PR#10 was opened 2026-05-06 14:03:33 with the 'Research-driven conversion lift' commit `af24284`. Within minutes, a Codex review (visible only in commit body, not in list_pull_requests output) flagged a P1: 'the דלג ושלח עכשיו button called skipStepTwo directly via onClick, bypassing react-hook-form's handleSubmit. As a result, stepTwo.formState.isSubmitting never flipped during the in-flight Web3Forms request, so on slow networks a user could click the skip button repeatedly and create duplicate lead submissions.' Claude shipped `f77d0a9` at 14:07:38 — **4 minutes 5 seconds after PR#10 opened** — introducing a single `isSending` state gating submitFinal at entry, cleared in a finally block, disabling both step-two buttons. PR#10 then merged at 14:53:46 (50 minutes after creation) with both commits.
**Mechanism hypothesis**: This is the first observed **AI-cross-review event** in the cohort — Codex reviewed Claude-authored code, found a real concurrency bug, and Claude fixed it in the same PR before human merge. The operator did not need to triage; the AI reviewers triaged each other. The fix-commit body explicitly credits Codex by name. Portable pattern: paired AI review (write-AI + review-AI) catches issues that single-AI workflows miss. The 4-minute fix latency suggests Codex review runs on PR-open trigger and Claude Code session was still active.

---

## 2026-05-12 11:06 — Each branch acts as a sprint container; each PR a checkpoint inside the sprint

**Dimension guess**: user-to-claude
**Evidence**: groundstate-protocol branch `claude/landing-page-redesign-i1Mwg` (5 PRs in 5h on Apr 19), groundstate-protocol branch `claude/audit-landing-page-OR0tf` (3 PRs in 2h on May 6)
**Observation**: Two `claude/*` branches each carry multiple consecutive PRs without being abandoned. `claude/landing-page-redesign-i1Mwg` carried PRs #3, #4, #5, #6, #7 on 2026-04-19 between 09:15 and 14:09 (5 hours). `claude/audit-landing-page-OR0tf` carried PRs #8, #9, #10 on 2026-05-06 between 12:48 and 14:53 (2 hours). Branches are reused **within a sprint day** but never **across sprint days** — the Apr 14 branches (`optimize-landing-page-eEgZ4`, `landing-page-design-EdmZ3`) are not reused on Apr 19 or May 6.
**Mechanism hypothesis**: The branch is **the unit of editorial focus**, the PR is **the unit of decision-checkpointing**. A sprint day picks one branch (sometimes auto-named by Claude Code's `/cor-ship`-style flow), iterates through 3-5 incremental PRs as the copy evolves, and then the branch is abandoned (its work integrated into main). This is a different rhythm than cor-sys's `feat/tooling-and-project-memory` branch (9 PRs over 12 days). groundstate-protocol's rhythm is **higher-frequency, shorter-lived branches** because the editorial work converges within hours. Portable pattern: branch lifecycle = sprint length; PR lifecycle = checkpoint within sprint.

---

## 2026-05-12 11:07 — No CLAUDE.md / LOG.md / docs/ = no project memory = every Claude session opens cold

**Dimension guess**: user-to-user
**Evidence**: groundstate-protocol root listing has no CLAUDE.md, no LOG.md, no skill.md, no .claude/, no docs/ (only README.md)
**Observation**: groundstate-protocol's root has 17 entries: 4 configs (tsconfig variants), 5 build tooling (vite/postcss/eslint/tailwind/vitest), 4 package management (package.json, package-lock.json, bun.lock, bun.lockb), 2 entry (index.html, README.md 2.1 KB), 2 directories (src/, public/), and .gitignore. There is no CLAUDE.md, no LOG.md, no skill.md, no .claude/ directory, no docs/ folder. By contrast, cor-sys has CLAUDE.md (1.8 KB) + LOG.md (7.3 KB) + skill.md (2.0 KB) + index/CLAUDE.md (4.7 KB) + .claude/commands/ (5+ commands) + docs/ (32 files, 270 KB).
**Mechanism hypothesis**: The operator chose **no project memory** for groundstate-protocol. Plausible reason: the repo is a brand surface, not a tool platform; its 'state of art' is the rendered page, not a process artifact. The cost: each new Claude Code session must rediscover the architecture from scratch (read package.json, src/ tree, recent commits). The benefit: the repo stays small (no docs/ bloat) and the public-facing README is the only narrative. Portable pattern: a repo can be self-explanatory through commit messages + section names alone — but only if commit messages carry the reasoning (which groundstate-protocol's do). This *only* works because the commit voice is editorial, not generic.

---

## 2026-05-12 11:08 — Bot commits in the lovable-sync-* branches accumulate without ever becoming PRs

**Dimension guess**: user-to-user
**Evidence**: groundstate-protocol branches `lovable-sync-1776608049`, `lovable-sync-1776608219`, `lovable-sync-1778176548`, ..., `lovable-sync-1778486364` (9 such branches)
**Observation**: The repo has 9 branches named `lovable-sync-<epoch-seconds>`. Decoding the epoch suffixes: `1776608049` = 2026-04-15, `1778486364` = 2026-05-10. None of these branches are sources for any merged PR. They are Lovable's auto-pushed sync branches — apparently Lovable creates a new branch every time the user opens the Lovable editor and makes a no-commit preview change. The branches are not merged, not deleted, just left on the remote.
**Mechanism hypothesis**: Lovable's sync mechanism creates one branch per editor session as a save state. When the user does not save the session as a real edit, the branch becomes a tombstone. The cost is noise in `git branch --list` and `gh pr list --state all`; the benefit (presumably) is that Lovable can resume preview state from any of these checkpoints. Portable pattern (negative): if a repo uses Lovable as a preview surface alongside Claude Code as the write surface, expect branch noise from Lovable sync — and recognize that it's benign (no PRs ever open against these branches). cor-sys had no such branches because cor-sys does not use Lovable.

---

## 2026-05-12 11:09 — Web3Forms + GA4 + Calendly architecture: zero self-hosted backend

**Dimension guess**: user-to-claude
**Evidence**: groundstate-protocol@8434927:src/lib/web3forms.ts, groundstate-protocol@8434927:src/lib/analytics.ts, groundstate-protocol#PR-2 (react-calendly)
**Observation**: The final architecture (post-PR#10) uses three third-party services for what would normally be backend code: **Web3Forms** for form-to-email submission (`ACCESS_KEY = 'PLACEHOLDER_REPLACE_ME'`), **GA4** for analytics (`MEASUREMENT_ID = 'G-PLACEHOLDER'`), and **Calendly** for scheduling (revealed inline after form success). There is no database, no Supabase project, no Node API, no server-side rendering. The build output is a static SPA deployable to any CDN.
**Mechanism hypothesis**: A consulting landing page does not need a backend — it needs a lead-capture pipe and a scheduler. By outsourcing all three concerns to third-party services, the operator avoids the entire backend maintenance burden that cor-sys carries (Supabase migrations, RLS policies, pgvector indices, OpenAI quota management). The trade-off is **placeholder discipline** — both `ACCESS_KEY` and `MEASUREMENT_ID` are still placeholders at the HEAD of main. The PRs document this with `## דגלים` (flags) sections, treating the deploy-time secret as a known incomplete item. Portable pattern: for brand-surface repos, choose third-party SaaS over self-hosted infra; document the placeholder-replacements as PR flags so they don't get forgotten at deploy.
