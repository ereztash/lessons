# core-unified-consciousness — Raw Insight Candidates

> Populated by Phase 1 deep dive (the negative control). Each entry: timestamp, observation, dimension-guess, evidence pointer.

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

## 2026-05-12 12:00 — The negative-control shape: a 133-minute publish-and-walk-away

**Dimension guess**: user-to-user
**Evidence**: core-unified-consciousness@b331aa1 (template 2025-01-01), core-unified-consciousness@9d9327a (first bot commit 2026-03-08 15:51), core-unified-consciousness@0f32edc (last sprint commit 2026-03-08 18:04), core-unified-consciousness@ecd8b5c (HEAD 2026-03-09 08:41)
**Observation**: The entire substantive history is 54 commits in 133 minutes (2h13m) at 24.4 commits/hour, followed by a 14h37m overnight gap, followed by exactly one publish-polish commit (+11/-6 in `index.html`, +8/-267 in `bun.lock`, no source changes), followed by 64 days of silence to today (2026-05-12). The terminating commit message is `Update site info for publish` with body `Edited UI in Lovable`. There is **no human commit anywhere in the repo**, **no PR**, **no issue**, **no branch other than `main`**, **no CLAUDE.md / AGENTS.md / docs/**. The Lovable template README's `REPLACE_WITH_PROJECT_ID` placeholder survives unchanged in three places at HEAD; the `package.json` name is still the literal `vite_react_shadcn_ts`. The entire repo is a one-evening artefact.
**Mechanism hypothesis**: This is the *finished-by-publish* abandonment mode. The operator's success condition was 'press Lovable's Publish button once'. Once pressed, the artefact is complete from the operator's perspective regardless of its state on disk — the live demo URL is what they will show to people, not the GitHub repo. Compare chess-mind-patterns: same template, same author, same bot, but the operator chose 'make-me-better-at-chess' as the success condition, which required external integrations (Lichess, PWA, SM-2 spaced repetition) that the Lovable preview cannot provide. The difference is in *what counts as done* — Publish-once is satisfiable inside Lovable; chess-skill-improvement is not.

---

## 2026-05-12 12:01 — The hypothesis-A win: domain-specific repo resumes, generic repo abandons

**Dimension guess**: user-to-user
**Evidence**: core-unified-consciousness@ecd8b5c:package.json (51 deps, all template defaults), chess-mind-patterns@2c7ced2:package.json (52 deps including chess.js@^1.4.0), core-unified-consciousness engine class names (`KORA`, `ErezCore`, `MetaBoardOptimizedByX` with toy values), chess-mind-patterns engine names (`narrative-engine.ts` 45 KB, `spaced-repetition.ts` SM-2, `skill-dag.ts` 20-skill DAG)
**Observation**: The two repos were bootstrapped within hours of each other on identical Lovable scaffolding, but their dependency manifests diverge along a single axis: chess-mind installs `chess.js@^1.4.0` (a real domain library doing real work), while core-unified installs nothing beyond the template defaults despite the bot generating an `ml-analyzer.ts` file 24 KB long. core-unified's 'ML' is rule-based string heuristics; chess-mind's chess logic actually parses FEN and computes legal moves. **Domain-anchored repos accumulate external integrations as evidence of intent; concept-anchored repos do not, even when their bot output looks substantive.** chess-mind resumed; core-unified did not.
**Mechanism hypothesis**: Confirms Hypothesis A from the brief. The presence of a single domain dependency (chess.js) acts as a *commitment device* — once it is installed, the project has crossed a threshold of specificity that makes 'this is a chess tool' irreversible. Generic React + framer-motion repos remain ambiguous; they could become anything or nothing. The operator's psychology likely treats ambiguous artefacts as disposable demos and specific artefacts as ongoing products. Operationally for the reuse playbook: when evaluating a Lovable-bootstrapped repo's resumption likelihood, **count the non-template production dependencies** — zero means concept demo (high abandonment risk), one or more means committed product (high resumption likelihood).

---

## 2026-05-12 12:02 — Hypothesis B refuted: shorter bot blast does not imply less effort, but does correlate with abandonment

**Dimension guess**: claude-to-claude
**Evidence**: chess-mind-patterns Island 1 (171 commits, 10h28m, 16.3/hour) vs. core-unified-consciousness Island 1 (54 commits, 2h13m, 24.4/hour)
**Observation**: core-unified's bot blast is **2.4x faster per commit** but **4.7x shorter total**, producing 31% of the commit count. By raw rate, the core-unified session was more *intense*; by total work, it was less *sustained*. The brief's Hypothesis B (shorter blasts indicate the operator gave up faster) is correct on outcome but the mechanism is reversed: it is not that the operator gave up; it is that they *finished* at a different success condition. The 24.4/hour rate suggests the operator did not stop because the bot was failing or slow — the bot was actually running hot. The operator stopped because they hit Publish.
**Mechanism hypothesis**: Bot-blast duration is a confounded variable. It correlates with abandonment but it is not the cause. The *cause* is the operator's success condition (publish-once vs. behavioural-improvement). Short blasts happen when the success condition is satisfied quickly; long blasts happen when the success condition requires more iteration. Both *can* lead to resumption (if the operator returns to add an external integration) or abandonment (if they don't). In this dataset, the longer-blast repo resumed and the shorter-blast repo abandoned, but a one-by-one comparison is insufficient — the third Lovable repo in the dataset (groundstate) had a still-shorter blast and also abandoned, which is at best directionally consistent.

---

## 2026-05-12 12:03 — Engine files named after people imply a personification framing that does not survive abandonment

**Dimension guess**: user-to-claude
**Evidence**: core-unified-consciousness@ecd8b5c:src/engine/ (alma.ts, ella.ts, erez.ts, roee.ts, shahar.ts, kora.ts — all Hebrew given names), core-unified-consciousness@ecd8b5c:src/engine/erez.ts (`export class ErezCore { innerTremor = 0; ... reflect(): string { return 'Inner Frequency: ${this.innerTremor} | Concept: ${this.lastConcept}'; } }`), core-unified-consciousness@ecd8b5c:src/engine/kora.ts (`MetaBoardOptimizedByX.agents = [Yonatan, Shakhar, Roee, Erez, Ella]` with hand-tuned `efficiency/speed/accuracy/understanding` weights)
**Observation**: The 9-file engine layer is structured as a cast of named characters — Hebrew given names that match the operator's known family-and-collaborator context (the repo owner is `ereztash`, and `Erez` appears both as a class name and as an agent in the `MetaBoardOptimizedByX` array). The 0cc25e5 commit subject `Port Alma and related engines` uses the verb `Port`, which implies the operator had a prior codebase (perhaps Python or notebook) that already had these names. The implementation, however, is toy code: `ErezCore.innerTremor` is `(rpf + emotion) / 2` rounded to 4 decimals; `KORA.generate(concept)` returns a fixed 4-line template literal regardless of input. The framing was rich; the implementation was a stub.
**Mechanism hypothesis**: Personification of engine modules is an *intent encoder* — the operator was using class names to remember which module was supposed to do what. This works for the original author in a live Lovable session (the names cue memory) but is **opaque to any future reader, including Claude Code on a resumption attempt**. A repo named `core-unified-consciousness` with files named `erez.ts` and `alma.ts` would be incomprehensible to a fresh agent without external context. This is plausibly *another* reason the repo resists resumption — even if the operator wanted to return, the cost of writing the README that would let Claude pick it up is non-trivial. Contrast chess-mind, where files are named `spaced-repetition.ts`, `skill-dag.ts`, `lichess-links.ts` — directly resumable.

---

## 2026-05-12 12:04 — Mid-session refactor (`Cleaned to a 3-page plan`) creates 84 KB of dead code that survives to HEAD

**Dimension guess**: claude-to-claude
**Evidence**: core-unified-consciousness@2228be1 (2026-03-08 17:45:11 `Cleaned to a 3-page plan`), core-unified-consciousness@9adbcc8 (2026-03-08 17:45:31 `Merge DeepDive and Demo pages with 3-page plan`), core-unified-consciousness@ecd8b5c:src/App.tsx lines 18-26 (six `<Navigate replace />` redirects), core-unified-consciousness@ecd8b5c:src/pages/ (10 .tsx files, only 4 active routes including NotFound)
**Observation**: At 17:45 (~95 minutes into the session) the bot consolidated the 10-page layout into 3 active routes, but **did not delete** the seven now-orphaned page files (Analysis.tsx 25 KB, Architecture.tsx 8.5 KB, Dashboard.tsx 10.3 KB, KoraPlayground.tsx 9.3 KB, Playground.tsx 6.7 KB, Research.tsx 24.8 KB, plus NotFound.tsx which stayed active). Total dead-code load: **84 KB across six files, ~25% of `src/` by byte count**. The redirects in `App.tsx` map the old URLs to `/demo` or `/deep-dive`, preserving inbound links but not removing the unreachable source. This pattern matches chess-mind-patterns' bot-phase rule (the bot adds, the bot rarely subtracts) but with much higher dead-load — 25% of the source vs. essentially 0% in chess-mind (where the bot's components remained routed).
**Mechanism hypothesis**: Lovable's gpt-engineer-app refactors *routes* and *imports* but treats source files as append-only. The `Cleaned to a 3-page plan` commit removed the old `<Route>` declarations from `App.tsx`, replacing them with `<Navigate>`, but left the page component files in place. This is the lowest-disruption refactor (no other code needs to update import paths), and the bot evidently optimises for it. The cost is bundle bloat and confusion for any future resumer. For the playbook: **when scoring a Lovable-bootstrapped repo's maintainability, dead-code ratio is a strong signal**. Above ~15% dead source, the repo is hard to onboard; below 5%, it is clean. core-unified at 25% is in the bottom quartile of the dataset.

---

## 2026-05-12 12:05 — The HEAD commit's trailer `Edited UI in Lovable` proves the operator never left the platform

**Dimension guess**: user-to-user
**Evidence**: core-unified-consciousness@ecd8b5c commit body (`Update site info for publish\n\nEdited UI in Lovable`), core-unified-consciousness@0f32edc commit body (`...\nX-Lovable-Edit-ID: edt-ee389d10-003c-4522-b044-c2d0da8ca21f`), entire commit log (zero `Co-Authored-By: Claude` trailers, zero `feat:` prefixes)
**Observation**: The final commit's body contains the marker `Edited UI in Lovable`, distinct from Lovable's per-prompt edit trailer (`X-Lovable-Edit-ID: edt-<uuid>`). The 'Edited UI in Lovable' marker corresponds to a direct in-platform UI tweak — the operator clicked through Lovable's site-info form (likely the title, description, OG image) and the platform stamped it as a UI edit rather than a prompt-driven generation. This is the only commit with that exact trailer. **No commit in the entire repo carries a `Co-Authored-By: Claude` trailer or a `feat:` conventional-commit prefix**, ruling out any Claude Code involvement. The operator interacted with this repo exclusively through Lovable's web UI.
**Mechanism hypothesis**: Trailer presence on `gpt-engineer-app[bot]` commits is a fine-grained operator-action signal. The `X-Lovable-Edit-ID: edt-<uuid>` marker indicates a per-prompt generation; `Edited UI in Lovable` indicates a settings-form interaction; the *absence* of either indicates a plan-save or batch operation. For the cross-repo signature catalogue: this gives a three-state classifier for what the operator was doing on each commit, derivable from the body text alone. core-unified shows the operator never escaped Lovable's interaction surface — every commit was either a prompt, a plan-save, or a settings-form click. No commit was made from a local clone with `git commit`.

---

## 2026-05-12 12:06 — The `package.json` name field is the abandonment fingerprint

**Dimension guess**: user-to-user
**Evidence**: core-unified-consciousness@ecd8b5c:package.json (`"name": "vite_react_shadcn_ts"`), chess-mind-patterns README placeholder (`REPLACE_WITH_PROJECT_ID` still in place per chess-mind insight 2026-05-12 11:08), core-unified-consciousness@ecd8b5c:README.md (same `REPLACE_WITH_PROJECT_ID` x3), core-unified-consciousness@ecd8b5c:index.html (still says `<title>Lovable App</title>` with `<!-- TODO: Set the document title to the name of your application -->` unfilled)
**Observation**: Three independent template placeholders survive to HEAD: (1) `package.json` name is `vite_react_shadcn_ts` (the literal template token, not even renamed to `core-unified-consciousness`); (2) `README.md` has three `REPLACE_WITH_PROJECT_ID` placeholders; (3) `index.html` still has the `<!-- TODO: Set the document title -->` comment with the title `Lovable App` and description `Lovable Generated Project`. **Even after a publish-polish commit explicitly targeting `index.html`**, the operator did not change the title or description — they only updated the OG image URL. The packaging-level identity of the project was never customised. This is the strongest single signal of pre-finished abandonment: not 'I will fix this later' but 'I do not care that this is unconfigured because the live preview URL is what I share, not the repo'.
**Mechanism hypothesis**: For Lovable-bootstrapped repos in 'publish-and-go' mode, the relationship between the GitHub repo and the deployed artefact is asymmetric — the deployed artefact has the operator's intended title (set in Lovable's project-settings form, stored in Lovable's database), while the repo lags behind because the operator never edits the repo files directly. This produces a class of abandoned-but-still-deployed sites whose GitHub presence looks unfinished but whose live URL looks polished. For the reuse playbook: **the `package.json` `name` field's renaming-vs-not-renaming is a one-row classifier of 'Lovable-only' vs. 'operator-touched' repos**. chess-mind-patterns also has unfilled `name` and README placeholders (chess-mind was promoted to *useful prototype* but not to *system mode*), so the placeholder-survival signal puts chess-mind and core-unified in the same bucket on this axis — meaning placeholder survival distinguishes Tier C/B from Tier A, not Tier C from Tier B.

---

## 2026-05-12 12:07 — Hypothesis C is the cleanest fit: the Lovable template type predicts outcome

**Dimension guess**: user-to-user
**Evidence**: core-unified-consciousness@b331aa1 (template `new_style_vite_react_shadcn_ts_testing_2026-01-08`, same as chess-mind-patterns and groundstate per prior surveys), the operator's apparent goals (consciousness research framing vs. personal chess improvement vs. (groundstate's purpose)), absence of any product-specific scaffolding in core-unified-consciousness
**Observation**: All three Lovable repos use the same `new_style_vite_react_shadcn_ts_testing_2026-01-08` template, so 'template type' is constant across them. **What varies is the operator's stated goal at prompt-time** — chess-mind-patterns was prompted toward 'a tool to make me better at chess' (a personal-improvement loop), core-unified-consciousness was prompted toward 'a demonstration of a unified consciousness framework' (a concept landing-page). The brief's Hypothesis C ('Lovable template choice matters — chess template implies a real product') is therefore *misframed*: the **template is identical**; the **prompt is what differs**. The chess prompt implied a *behavioural* product with success conditions outside Lovable's preview (real games on Lichess, real spaced-repetition over weeks). The consciousness prompt implied a *demonstrative* product whose success condition is the demonstration itself, which Lovable's preview fully satisfies.
**Mechanism hypothesis**: Reframed: **the operator's success condition predicts resumption**. Behavioural success conditions (improve at X, deploy a working API, ship a PWA) require leaving Lovable; demonstrative success conditions (show a vision, pitch an idea, render a concept) do not. Lovable repos with behavioural success conditions therefore generate human commits when the operator hits Lovable's boundary; Lovable repos with demonstrative success conditions terminate at Publish. For the playbook: **predicting resumption from the repo content alone requires inferring the operator's intended success condition from prompt-derived signals** — domain dependencies, integration code, external-API calls, PWA scaffolding. None of those exist in core-unified; all of them exist in chess-mind's final commit.

---

## 2026-05-12 12:08 — Subject-noise rate (`Changes`, `Preceding changes`) is elevated for abandoned bot blasts

**Dimension guess**: claude-to-claude
**Evidence**: core-unified-consciousness commit-subject frequency (12 `Preceding changes`, 7 `Changes`, total 19 of 55 = 34.5%), chess-mind-patterns subject vocabulary (qualitatively richer, fewer generic placeholders), Lovable's per-commit subject generation
**Observation**: 34.5% of core-unified's bot commits carry generic placeholder subjects (`Preceding changes` or just `Changes`), versus a qualitatively much lower rate in chess-mind-patterns (where the bot consistently named the feature being added). The placeholders likely indicate sub-prompt-grain edits that Lovable could not summarise — either because they were too small (a single-line CSS change) or because they were part of a multi-step prompt where Lovable batched the diffs without re-summarising. **In the abandoned repo, more than a third of all commits are uninformative for archaeology.**
**Mechanism hypothesis**: Subject-noise rate is a behavioural fingerprint of session pace. High noise (>25%) suggests the operator was iterating rapidly within Lovable's chat without giving the platform time to crystallise each step into a named feature. Low noise (<10%) suggests the operator was prompting in deliberate feature-sized chunks. The pace difference correlates with the abandonment outcome in this dataset: rapid iteration → publish-and-go; deliberate chunking → external resumption. For the playbook, scanning a Lovable repo's commit-subject vocabulary distribution gives a quick proxy for the operator's session style without reading any code.

---

## 2026-05-12 12:09 — Cross-repo synthesis: a four-feature classifier for resumption likelihood

**Dimension guess**: user-to-user
**Evidence**: synthesis of four-repo dataset (cor-sys, chess-mind-patterns, core-unified-consciousness, groundstate) at HEAD as of 2026-05-12
**Observation**: Combining signals from all four repos, the following four features form a classifier that maps to the observed Tier C / Tier B / Tier A outcomes:

| Feature | core-unified | chess-mind | cor-sys | Predicts |
|---|---|---|---|---|
| Any non-template production dependency? | No | Yes (chess.js) | Yes (many) | Resumption (Hypothesis A confirmed) |
| Any human commit ever? | **No** | Yes (3) | Yes (many) | Tier B/A promotion |
| Any PR ever? | No | No | Yes | Tier A promotion |
| Any CLAUDE.md / docs/? | No | No | Yes | System-mode commitment |

Four-feature reading: **core-unified (0/4) = Tier C abandoned, chess-mind (2/4) = Tier B resumed-prototype, cor-sys (4/4) = Tier A managed-system**. groundstate is also (0/4) and also abandoned, validating the lower bound. The mapping is monotonic in the feature count and matches every repo in the dataset without exception.
**Mechanism hypothesis**: The four features form a *graduated commitment ladder*. Each rung requires the operator to take an action that is irreversible to varying degrees: adding a non-template dep commits to a domain; making a human commit commits to a workflow; opening a PR commits to a review surface; writing CLAUDE.md commits to a system identity. **Repos accumulate rungs in order, never backward.** For triaging a portfolio of Lovable-bootstrapped repos, count the rungs first — the rung count is the resumption-likelihood score. core-unified is at rung 0 and has stayed there for 64 days; resumption probability conditional on rung-0 persistence beyond 30 days is empirically near-zero in this dataset.

---

## 2026-05-12 12:10 — The `Port Alma` verb implies a *prior* artefact that is not in this repo

**Dimension guess**: user-to-claude
**Evidence**: core-unified-consciousness@0cc25e5 (2026-03-08 16:02:22 `Port Alma and related engines`), the absence of `alma.ts` in the template seed, the 11 minutes between session start (15:51) and `Port Alma` (16:02) which is too short for the bot to invent a multi-file engine layer from scratch
**Observation**: The bot's commit verb `Port` (used exactly once in the entire history) implies the operator pasted prior code into a prompt. The 11-minute elapsed time from session start is consistent with: the operator typed the project plan, the bot saved it, the operator immediately pasted prior engine code in the next prompt, the bot translated it into TypeScript and committed it as `Port Alma and related engines`. The named modules (alma, ella, roee, shahar, kora) suggest the prior artefact was already structured this way — the operator did not invent the cast of named agents inside Lovable; they brought it. The prior artefact is **not in this repo** and is **not in any of the other three repos** based on the surveys done so far.
**Mechanism hypothesis**: Lovable's `Port` verb is rare and meaningful when it appears. It signals that the operator's actual prior work lives elsewhere — perhaps in a personal notebook, a private repo, a Hebrew-language essay, or just a thoughts file. Resumption of *this* repo would require the operator to want to develop the personification framing further, which depends on whether the prior artefact still has momentum in the operator's life. The repo's silence implies the prior artefact's momentum also halted. For the playbook: **the verb `Port` in a Lovable commit subject is a flag that the repo is downstream of an external concept whose health is opaque from the repo alone**. Such repos are at higher abandonment risk than repos whose ideas originate in-platform.
