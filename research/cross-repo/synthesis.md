# Cross-Repo Synthesis (Human Layer)

> Narrative synthesis of 43 raw observations across 4 source repos (cor-sys, groundstate-protocol, chess-mind-patterns, core-unified-consciousness). Companion to the machine-readable `/research/cross-repo/patterns-matrix.md`.

## 1. The maturity ladder — four rungs, four repos

Across the dataset, the four repos line up cleanly on a ladder of operator commitment to a single product surface. Each rung above the previous one requires the operator to take an action that is irreversible at some cost.

- **Rung 0 — Lovable-only publish-and-go**: `core-unified-consciousness`. 54 bot commits in 133 minutes, then a 14-hour overnight gap, then a single `Update site info for publish` commit, then 64 days of silence (core-unified@12:00). No human commits, no PRs, no issues, no `CLAUDE.md`, no `docs/`. The `package.json` `name` field is still the literal template token `vite_react_shadcn_ts`. The README still says `REPLACE_WITH_PROJECT_ID` three times (core-unified@12:06).
- **Rung 1 — Resumed prototype**: `chess-mind-patterns`. 171 bot commits in a 10h28m blast, then 14 days of silence, then a 72-minute human sprint producing 3 `feat:`-prefixed commits totalling 4,462 line additions and 22 new files (chess-mind@11:00). Still no `CLAUDE.md`, no `docs/`, no PRs, no issues, README placeholder unchanged. The repo has crossed the human-commit rung but no other rung.
- **Rung 2 — Editorial brand surface**: `groundstate-protocol`. A 37-day silence after the initial Lovable build, then Claude takes over with `dc90fee` (Landing.tsx + Header.tsx + SignupForm.tsx) and pivots the entire product (groundstate@11:00). Develops 10 PRs with Hebrew RTL templates; introduces AI-cross-review (Codex + Claude); branches behave as sprint containers. Still no `CLAUDE.md` or `LOG.md` — but the commit voice carries the editorial discipline that would otherwise live in those files (groundstate@11:02).
- **Rung 3 — Managed system**: `cor-sys`. 71 commits, 16 PRs, 32 docs files, full `CLAUDE.md`+`LOG.md`+`skill.md`+`/cor-*` slash-command suite, absorbed CampaignCraft as a child project (cor-sys@10:00, cor-sys@10:09, cor-sys@10:10). Three distinct AI surfaces co-exist (Claude Code, Cursor Agent, the operator's own shell). Anti-patterns accumulate as a monotonic 12-row table that never shrinks.

The ladder is **monotonic** in the dataset: no repo skips a rung, and no repo regresses to a lower rung once it has crossed up. The cost-to-climb increases at each rung — crossing rung 2→3 requires authoring `CLAUDE.md`, which is itself an editorial act with its own anti-pattern cost (cor-sys's encoding war shows the cost of bilingual `index/CLAUDE.md` infrastructure; cor-sys@10:08).

## 2. The Claude-author transition curve

When does Claude become a first-class author in a repo's git log? The four repos show three distinct entry modes.

- **Mode A — Claude as resumer**: chess-mind-patterns and groundstate-protocol both begin as Lovable-only repos, fall silent, and then re-open with Claude as a named author. chess-mind's first Claude commit is `875fe1c` on 2026-03-23 (chess-mind@11:00); groundstate's is `dc90fee` on 2026-04-14 (groundstate@11:00). In both cases, the gap-before-Claude is what predicts whether the repo will continue: 14 days for chess-mind (one sprint, then dormant), 37 days for groundstate (pivot, then sustained 9 weeks of editorial work).
- **Mode B — Claude from day one**: cor-sys's earliest commits already carry `Co-Authored-By: Claude Sonnet 4.6` trailers under the `COR-SYS Dev` author wrapper (cor-sys@10:04). The operator was paired with Claude before commit one but committed through their own shell.
- **Mode C — Claude never arrives**: core-unified-consciousness shows zero `Co-Authored-By: Claude` trailers and zero `feat:` prefixes across its entire history (core-unified@12:05). The operator interacted with the repo exclusively through Lovable's web UI; no local clone was ever made.

The dataset gives a clean signal: **the act of running `git commit` outside Lovable's platform is the threshold between Tier C (Lovable-only) and Tier B (resumed prototype)**. The instrument for crossing it is Claude Code — every observed crossing involves a `Co-Authored-By: Claude` trailer or direct `Claude <noreply@anthropic.com>` authorship.

There is also a **second transition** that is visible only in cor-sys: on 2026-04-03, the `Co-Authored-By` convention flips to direct `Claude <noreply@anthropic.com>` authorship with no human wrapper (cor-sys@10:04). This is *tool delegation* — Claude Code began creating commits and pushing them directly via `/cor-ship`, bypassing the operator's shell. groundstate-protocol's Claude commits are direct from `dc90fee` onward, so groundstate skipped the co-authored phase entirely; chess-mind-patterns shows only co-authored Claude commits because the entire 72-minute sprint preceded cor-sys's delegation flip.

## 3. PR adoption curve — discipline emerges at rung 2

Pull requests appear in two of four repos. cor-sys has 16 PRs (13 merged at 11-second median TTM, 3 closed-unmerged due to branch-PR desync; cor-sys@10:03, cor-sys@10:07). groundstate-protocol has 10 PRs, of which the two longest (PR#9 and PR#10) carry Hebrew RTL templates with `## בדיקות` checklists and forbidden-word style gates (groundstate@11:04). chess-mind-patterns has zero PRs. core-unified-consciousness has zero PRs.

PR discipline therefore emerges **at rung 2**, when the operator decides the work is editorial enough to want a checkpoint-and-review surface. The PRs are not gates for asynchronous review — every PR in both repos was opened by Claude Code and merged by the same single human (cor-sys@10:03). They are **decision-checkpoints inside a sprint**, with branches acting as sprint containers (groundstate@11:06). The 11-second median TTM in cor-sys reflects the time for the operator to click *Merge pull request* from an email notification; the 39-50 minute TTM on groundstate's PR#9 and PR#10 reflects the time to actually *read* a Hebrew-templated body that documents seven research findings before merging.

The hypothesis from Phase 1 ("PR discipline emerges when the operator wants an audit trail visible on the GitHub UI") is **confirmed**. PRs in single-operator AI-augmented repos function as *audit trail artifacts*, not review gates. The only deviation is when a `claude/*` branch gets reused across sprints and the auto-PR opens against stale state — observed only in cor-sys (3 closed-unmerged PRs on `claude/add-ustt-primitives-wiqLc`, cor-sys@10:07).

## 4. Documentation density vs. survival

The correlation between documentation density and the repo's vitality is striking in the dataset.

| Repo | `.md` files | total bytes (`.md`) | survival as of 2026-05-12 |
|------|-------------|---------------------|---------------------------|
| cor-sys | 32 + CLAUDE.md + LOG.md + skill.md | ~280 KB | active, last commit 2026-04-09 (33 days ago) |
| groundstate | 1 (README) | ~2 KB | active, last commit 2026-05-06 (6 days ago) |
| chess-mind | 1 (README placeholder) | ~0 KB usable | dormant, last commit 2026-03-23 (50 days ago) |
| core-unified | 1 (README placeholder) | ~0 KB usable | abandoned, last commit 2026-03-09 (64 days ago) |

The relationship is **not** monotonically "more docs → more survival." groundstate-protocol has effectively zero docs but is the most recently active repo. The relationship is instead: **documentation density correlates with system-mode commitment, not with vitality per se**. groundstate's editorial discipline lives in commit messages and PR templates (groundstate@11:02, groundstate@11:04), which serves as functional documentation without occupying a `docs/` folder. cor-sys's docs folder serves as its issue tracker (cor-sys@10:12) because the operator chose committed-Markdown over GitHub Issues — a pattern that works *only* for single-operator AI-paired repos.

The honest synthesis finding: **docs density measures system-mode infrastructure, not project health**. A brand-surface repo (groundstate) can be healthier than a managed-system repo (cor-sys is technically dormant by raw days-since-commit) without any docs at all, because the project's life lives in the deployed artifact, not the codebase narrative.

## 5. Resumed vs. abandoned — chess-mind vs. core-unified

The cleanest fork in the dataset is chess-mind-patterns vs. core-unified-consciousness. Both were bootstrapped within hours of each other on identical Lovable scaffolding (`new_style_vite_react_shadcn_ts_testing_2026-01-08`). Both had a bot blast and then silence. One resumed; the other did not.

**Hypothesis A from Phase 1 (domain-anchored repos accumulate external integrations as evidence of intent; concept-anchored repos do not) is confirmed** by the dependency manifest divergence: chess-mind installs `chess.js@^1.4.0` (a real domain library doing real work) as commit 64 of 175 — even though it arrives as a build-error fix, not a design choice (chess-mind@11:01). core-unified installs nothing beyond the template defaults despite the bot generating a 24 KB `ml-analyzer.ts` that is rule-based string heuristics (core-unified@12:01). The single domain dependency acts as a **commitment device** — once `chess.js` is in `package.json`, the project has crossed a threshold of specificity that makes "this is a chess tool" irreversible.

**Hypothesis B (shorter bot blast → less effort) is refuted in mechanism but consistent in outcome**: core-unified's bot blast was 2.4× faster per commit than chess-mind's, so the operator was not slower or struggling. They simply *finished at a different success condition* (core-unified@12:02).

**Hypothesis H2 (publish-button satisfiability) is the cleanest explanation**: core-unified-consciousness was abandoned because publishing the rendered page was the success condition, and Lovable's Publish button fully satisfied it. chess-mind-patterns was resumed because making the operator better at chess required external integrations (Lichess deep-links, PWA notifications, SM-2 spaced repetition) that the Lovable preview cannot provide (chess-mind@11:07). The PWA + Lichess code lands in the *final* commit of the 72-minute resumption sprint, all together, suggesting it was planned as a single shippable block. groundstate-protocol fits the same model from the other direction: its success condition is a *living* landing page that converts consulting leads, which keeps requiring editorial iteration (groundstate@11:02).

**H2 verdict: confirmed**. The publish-button-satisfiability hypothesis is the strongest single predictor in the dataset. It also subsumes Hypothesis C from the brief ("Lovable template choice matters"): the template is identical across the three Lovable repos; what differs is the *prompt's implied success condition* (core-unified@12:07).

## 6. Anti-pattern accumulation as forcing function — the LOG.md hypothesis

Only cor-sys has a `LOG.md` file. It is also the only repo with 71 commits using conventional-commit prefixes (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, plus the unique-to-cor-sys `test:` and `debug:` markers from the Hebrew encoding war; cor-sys@10:06). Is this causation or correlation?

The Phase 1 cor-sys evidence shows the LOG.md was bundled with `CLAUDE.md` and the five slash commands in one commit on 2026-03-17 — 31h35m after the initial commit (cor-sys@10:00). The pre-condition was three Claude-paired sessions accumulating enough friction (gh not installed = anti-pattern #4; MCP config wrong format = #2; secrets-in-chat = referenced) to justify codifying a prevention layer. The Pre-Build Validation Protocol section was *retrofitted* later, after Phase 3 rework — explicitly responding to 3+ hours of cost paid (cor-sys@10:05).

The honest reading: **LOG.md is the artifact, not the cause**. The cause is the operator's choice to **treat friction as a permanent rather than transient signal**. groundstate-protocol shows a parallel mechanism without a LOG.md: the `## דגלים` (flags) section in PR bodies captures placeholder secrets that must be replaced at deploy (groundstate@11:09), and the forbidden-word checklist `[x] אין em-dash, אין סימני קריאה` (groundstate@11:04) encodes editorial anti-patterns in the PR template. groundstate has a *distributed* anti-pattern memory across PR bodies; cor-sys has a *centralized* one in LOG.md.

**H3 (LOG.md as enforcement) is refined**: the causal variable is not the LOG.md file but the *anti-pattern-as-permanent-navigation-aid* habit. cor-sys instantiates this habit as a top-level Markdown file; groundstate instantiates it as recurring PR-template sections. The habit is portable; the file format is incidental.

## 7. The Tier A/B/C classifier — four features, monotonic

The core-unified Phase 1 agent proposed a 4-feature classifier (core-unified@12:09). Cross-repo verification:

| Feature | cor-sys | groundstate | chess-mind | core-unified |
|---|---|---|---|---|
| Any non-template production dependency? | yes (many) | yes (Web3Forms, GA4, Calendly) | yes (chess.js) | no |
| Any human commit ever? | yes | yes (Claude direct) | yes (3) | no |
| Any PR ever? | yes (16) | yes (10) | no | no |
| Any CLAUDE.md / docs/? | yes (32+) | no | no | no |
| **Feature count** | **4/4** | **2-3/4** | **2/4** | **0/4** |
| **Tier** | A managed | A/B borderline | B resumed-prototype | C abandoned |

**H1 verdict: confirmed with one nuance.** The four features partition the dataset cleanly into Tier A (cor-sys), Tier B (chess-mind, with groundstate borderline depending on whether "Claude direct authorship from day one of human involvement" counts as a human commit), and Tier C (core-unified). The monotonic relationship to survival holds. The nuance: groundstate-protocol is Tier B by the strict count but functions as Tier A in vitality (most recent commits in the dataset) because its editorial discipline substitutes for documentation infrastructure. This means the classifier is a **lower bound on system-mode commitment**, not an upper bound on health.

The promotion criterion for the playbook: any repo at rung 2 or above gets `CLAUDE.md`+`LOG.md`+`docs/` automation; repos at rung 0-1 get a lightweight resumption-prep script that primes the README and the `package.json` `name` field.

## 8. Cross-AI-tooling patterns

The four repos surface four distinct roles AI tools play in the operator's workflow:

- **Lovable as render-and-review surface**: groundstate continues to receive lovable-dev[bot] commits *after* Claude takes over the codebase. The most striking case is `e8a12bc` on 2026-05-06 12:57, which lands between PR#8's merge and PR#9's start — the operator opened Lovable's editor, viewed the rendered page, asked Lovable to "check the new text looks good in preview," and committed the request as a no-op artifact (groundstate@11:01). chess-mind shows a weaker version of the same pattern (the bot built analytics, the human wrapped them in actions; chess-mind@11:04).
- **Claude Code as write surface**: All three resumed/active repos use Claude Code as the primary commit-authoring tool. cor-sys uses it interactively (long sessions with mixed-prefix commits); groundstate uses it in sprint-shaped bursts on `claude/*` branches; chess-mind used it in a single 72-minute concentrated burst with co-authored trailers.
- **Codex as review surface**: groundstate-protocol's PR#10 is the first observed AI-cross-review event in the cohort. Codex reviewed Claude-authored code, flagged a real P1 race condition (handleSubmit bypass causing duplicate-submission risk on slow networks), and Claude fixed it within 4 minutes 5 seconds before human merge (groundstate@11:05). This is paired-AI workflow — write-AI and review-AI catching what single-AI workflows miss.
- **Cursor as fire-and-forget batch worker**: cor-sys's 9-minute Cursor burst on 2026-03-28 is the only Cursor appearance in the dataset. Five commits with crisp `feat(scope):` headers, a rich Markdown PR template with architecture diagram, deep-link to Cursor's agent UI, then the agent exits and never returns (cor-sys@10:11). Cursor is the *time-boxed batch* role; Claude Code is the *interactive co-pilot* role.

**H4 (AI tool diversity predicts maturity) verdict: confirmed**. The AI-tool count per repo correlates with the tier: 1 (Lovable only) → Tier C; 2 (Lovable + Claude) → Tier B; 3 (Lovable + Claude + Codex review, or Claude + Cursor + manual) → Tier A. The mechanism is that each AI tool plays a *non-substitutable role* (render vs. write vs. review vs. batch); having more tools means more roles are covered, which means more workflow states can be handled in-place rather than punted.

## 9. Editorial voice evolution

The commit-subject voice escalates monotonically in two repos and not at all in two repos.

- **groundstate-protocol** shows the cleanest 12-phase escalation: `Changes` → `Implement GroundState main flow` → `Create landing page for Protocol Ocean Blue` → `Tune landing copy and layout for conversion with behavioral research (Dai/Milkman/Riis 2014; Tversky & Kahneman 1974; Levav & Fitzsimons 2006; Cialdini 1984; Gollwitzer 1999; Ebbinghaus 1885; Murdock 1962)` → `Research-driven conversion lift: founder mark, progressive form, process preview` with 11 cited sources in the body (groundstate@11:02). Once research-citation enters the voice, no subsequent commit drops back to a less-cited register.
- **cor-sys** shows similar escalation in the Phase 3 stabilization period — anti-pattern names become precise ("ROUND::numeric") rather than generic; commit bodies acknowledge prior failures by anti-pattern number; PR bodies for high-risk commits (#10 architecture diagram, #16 CampaignCraft absorption) carry full structured sections.
- **chess-mind-patterns** shows a one-step jump from bot voice (3-word imperatives) to human voice (`feat:` + multi-line file-by-file body) at the resumption boundary, then stops because there is no further sprint to escalate within (chess-mind@11:05).
- **core-unified-consciousness** shows the opposite: 34.5% of bot commits carry generic placeholder subjects (`Preceding changes`, `Changes`) with no escalation toward specificity (core-unified@12:08).

**H5 (editorial voice as investment signal) verdict: confirmed in directionality, with caveat**. Monotonic escalation of citation density predicts continued health. *Stalled* escalation (chess-mind) predicts a frozen prototype that may or may not resume; *no* escalation (core-unified) predicts abandonment. The caveat: the signal cannot be read until at least 5-10 commits exist in the editorial register, so it is a *follow-up* health check, not a prediction at repo-birth.

## 10. The "publish-button satisfiability" hypothesis — full statement

Stating the core finding precisely:

> A Lovable-bootstrapped repo is at high risk of abandonment when the operator's success condition can be satisfied by pressing Lovable's Publish button once. Conversely, a Lovable-bootstrapped repo is likely to be resumed (by Claude Code, by direct git commits, or by external integrations) when the success condition requires the operator or the deployed product to do something Lovable's preview cannot do.

Behavioral success conditions that *require leaving Lovable*: improve a measurable skill (chess); ship a deployable PWA; gate access by paid subscription; integrate with a real-world API that demands a server-side secret; persist user state across sessions in a real database; convert leads via a real form pipeline. Demonstrative success conditions that *do not require leaving Lovable*: render a vision; render a manifesto; render a pitch deck as a web page; render a personification of an idea.

This is the single most operationally useful finding in the dataset. It generalizes to any LLM-coding-tool repo (not just Lovable): the question is not "did the operator try hard enough?" but "did the platform's natural exit condition match the operator's intended success condition?" Tools whose Publish button is a real success — for some success conditions — will lock in some users at Tier C indefinitely. Those users are not failures; they have finished, by their own definition. The lesson: a repo's tier is downstream of the operator's success criterion, which is downstream of the prompt-time intent. Read intent from the dependency manifest, the integration code, and the PWA scaffolding — the absence of all three is the loudest signal.

---

## Summary of hypothesis verdicts

- **H1 (4-feature Tier classifier)**: confirmed, with the refinement that the count is a lower bound on system-mode commitment.
- **H2 (Publish-button satisfiability)**: confirmed; the strongest single predictor of resumption-vs-abandonment.
- **H3 (LOG.md as enforcement)**: refined; the causal habit is anti-pattern-as-permanent-memory, not the LOG.md file format itself.
- **H4 (AI tool diversity predicts maturity)**: confirmed; AI-tool count correlates monotonically with tier.
- **H5 (Editorial voice as investment signal)**: confirmed for directionality; usable as a follow-up health check after 5-10 commits in editorial register.

## Cross-references

- Machine-readable companion: `/research/cross-repo/patterns-matrix.md`
- MOCs (Maps of Content):
  - `/index/MOC-CLAUDE-TO-USER.md`
  - `/index/MOC-USER-TO-CLAUDE.md`
  - `/index/MOC-CLAUDE-TO-CLAUDE.md`
  - `/index/MOC-USER-TO-USER.md`
- Source observations:
  - `/research/cor-sys/extracted-insights.md`
  - `/research/groundstate-protocol/extracted-insights.md`
  - `/research/chess-mind-patterns/extracted-insights.md`
  - `/research/core-unified-consciousness/extracted-insights.md`
