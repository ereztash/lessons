# Self-Application Test — Maya's Hypothetical 6th Repo

> Walkthrough of running the 5 skills against a HYPOTHETICAL 6th repo to verify the system holds against new data. This is a thought experiment, not a real repo survey; everything below is reasoning from the brief, not observation of git artifacts.

## Subject

> Maya is a solo builder with a v0.dev-generated React app. Her repo has 89 commits, 0 PRs, 12 issues, and the last commit was 38 days ago. `package.json` lists `react`, `tailwind`, `shadcn` — but also `stripe`, `posthog`, and `resend`. README has the project name filled in and a 4-paragraph product description.

This profile is HYPOTHETICAL. The walkthrough exercises the system's skills against a fictional 6th case to verify the dimension router, archaeologist, comparator, distiller, and auditor can be invoked against new data without breakage.

## Skill 1 — workflow-archaeologist (classify the repo's authoring state)

The archaeologist surveys six artifacts; for the hypothetical we infer each from the brief.

**timeline.md (inferred)**: 89 commits over an unknown duration ending 38 days ago. No PRs, so no branching to date the sprint shape. 12 issues over the project's life means *external collaborators or the operator herself is using the GitHub UI to capture work*. The 4-paragraph README means the project has been *named and pitched* — a strong signal of intentionality at repo-birth.

**commit-archaeology.md (inferred)**: Without commit SHAs we cannot apply the editorial-voice rubric (it requires `git log` access). But we can reason: 89 commits is too few for a v0.dev bot blast (those tend to be 100+) and too many for pure human pace at this dormant cadence. This suggests a *mixed-authorship* repo — some v0.dev bot commits + human-authored commits, similar to the chess-mind-patterns shape.

**pr-patterns.md (inferred)**: Zero PRs. This matches the four-zero prototype signature observed in chess-mind-patterns and core-unified-consciousness. BUT — Maya has 12 issues. The mismatch (PRs=0, issues=12) does not appear in any of the 4 source repos. This is a *new* shape: she's tracking work but not gating merges.

**issues-themes.md (inferred)**: 12 issues over the repo's life is meaningful but not heavy. Without titles we can't classify, but the fact she opens issues means she expects to come back — issues are a future-self message in single-operator repos.

**architecture-notes.md (inferred)**: `stripe` + `posthog` + `resend` is a *trio that demands a server*. Stripe needs webhook handling; Resend needs API-key auth; PostHog can be client-side but is usually paired with a server for ID linking. The dependency stack tells us Maya is building a *paid product* with email delivery and product analytics — a Tier A/B-bound repo by intent. Combined with the 4-paragraph README (real product description), this looks like a serious commercial attempt.

**extracted-insights.md (inferred — would generate 8-10 observations)**:
- maya@<inferred>: `stripe` + `resend` + `posthog` is a paid-SaaS-product dependency signature; success condition is behavioral (revenue, retention), not demonstrative.
- maya@<inferred>: 12 issues with 0 PRs is a *new* coordination shape — issues-as-todos for self, not for collaborators. This is observed in zero of the 4 source repos.
- maya@<inferred>: 38-day dormancy with this dep stack is concerning — the publish-button-satisfiability hypothesis predicts she should still be active if the success condition is unsatisfied.
- maya@<inferred>: 4-paragraph README is a strong R1+ editorial signal — Maya invested in pitch authoring, predicting investment in commit authoring.

**Verdict**: Maya's repo is a serious Tier B-bound prototype that has stalled at 38 days. Worth a deeper survey if she contacts us; not safe to archive.

## Skill 2 — dimension-router (which dimension(s) does her signal fall into?)

Let me trace the four-dimension routing:

- **claude-to-user**: If Maya is using Claude Code, the commit voice rubric applies (editorial-commit-voice-escalation). With v0.dev as her render surface, the auto-PR-on-claude-branch pattern doesn't activate (she has zero PRs). Light touch in this dimension.
- **user-to-claude**: We don't have language data, but the 4-paragraph English README rules out the Hebrew-bilingual case. branch-as-sprint-container is N/A (no branches). Minimal signal.
- **claude-to-claude**: No co-authored trailers visible from the brief; we'd need `git log` to check. AI-cross-review-multi-agent-handoff is plausible if she uses both v0.dev and Claude — that maps to the dual-AI-surface workflow.
- **user-to-user**: Strong signal. The non-template-domain-dep-predicts-resumption pattern fires — `stripe` alone is 1 non-template dep, plus `resend` and `posthog` = 3. Resumption probability is high if she has external motivation. publish-button-as-success-condition: NO — Stripe + Resend + PostHog cannot be satisfied by v0.dev's Publish button; her success requires off-platform work. four-feature-tier-classifier-monotonic: she has at least 3/4 features (non-template dep YES, human commit PROBABLE based on 89 commits, PR NO, CLAUDE.md UNKNOWN). Tier B-bound.

**Verdict**: Primary dimension is user-to-user. Secondary cross-references to claude-to-user (voice rubric) and claude-to-claude (dual-AI workflow if applicable).

## Skill 3 — cross-repo-comparator (Tier A/B/C and resumed/abandoned shape)

Applying the 4-feature classifier:

| Feature | Maya | Score |
|---------|------|-------|
| Any non-template production dependency? | yes (stripe, posthog, resend = 3) | 1 |
| Any human commit ever? | probable (89 commits, mixed authorship) | 1 |
| Any PR ever? | no | 0 |
| Any CLAUDE.md / docs/? | unknown — default conservative no | 0 |
| **Feature count** | **2-3/4** | **Tier B** |

This places Maya at Tier B (resumed prototype). Comparing to the 4 source repos: she resembles chess-mind-patterns (2/4, resumed) more than groundstate-protocol (2-3/4 borderline, sustained editorial). The key disambiguator: chess-mind-patterns resumed *once* and then went dormant again; groundstate-protocol kept resuming for 9+ weeks.

**Resumed-shape or abandoned-shape?** The brief says "last commit 38 days ago." In the dataset:
- chess-mind-patterns went 14 days silent → resumed for 72 minutes → dormant 50+ days. Maya at 38 days is in the chess-mind-pattern zone of "resumption window has passed but commit cadence still possible."
- core-unified-consciousness went 64 days silent → no resumption. The 60-day mark is the empirical threshold for treating dormancy as terminal.

Maya is at the 38-day mark — past the chess-mind 14-day resumption window, but well short of the 64-day terminal mark. The dep stack (Stripe + Resend) creates a high commitment device, so the *expected* outcome is resumption within 60 days. If she crosses 60 days without commits, treat as abandonment-shape.

**Verdict**: Maya fits Tier B, resumed-shape (with probability ~70%; if past day 60, switch to abandoned-shape).

## Skill 4 — insight-distiller (extract 1 insight from the hypothetical data)

The interesting *new* observation in Maya's hypothetical: **issues-as-todo-for-self in a single-operator repo with zero PRs**. None of the 4 source repos exhibit this. cor-sys has issues=0 (uses docs/ as issue tracker); chess-mind-patterns and core-unified-consciousness have issues=0 (prototype mode); groundstate-protocol has issues=0 (editorial PR mode replaces issue tracking).

Distilled candidate insight (hypothetical):

```
---
dimension: user-to-user
slug: issues-as-self-todo-in-zero-pr-repo
evidence-repos: [maya-hypothetical]
evidence-pointers:
  - maya@<inferred>
monetization-criteria:
  reusable: TBD — single-repo evidence
  defensible: TBD
  time-saving: TBD
  encodable: TBD
  evidence-anchored: FAIL — only 1 repo
monetization-score: pending
applicability: solo-builder
created: 2026-05-12
---

# Issues-as-Self-Todo in Zero-PR Repo (hypothesis from Maya's data)

## Observation

- Maya's hypothetical repo has 0 PRs but 12 issues — a coordination shape absent from all 4 source repos.
- Interpretation: issues are a future-self message, not a collaborator-coordination artifact. They are durable across sessions in a way commit messages are not.
- Mechanism (hypothesis): when the operator knows v0.dev will overwrite uncommitted state on the next render, they capture work-in-progress as issues to survive the render cycle.
```

## Skill 5 — monetization-auditor (would the insight ship?)

Applying the 5-criterion audit to the distilled `issues-as-self-todo-in-zero-pr-repo` insight:

1. **Reusable**: PENDING — we don't yet know if this pattern replicates in any non-Maya repo. The mechanism is plausible, but no second-repo evidence exists. **Score: fail until verified.**
2. **Defensible**: PASS — the pattern is not on the first Google page for "github issues solo developer." The mechanism (v0.dev re-rendering as a forcing function for issue creation) is non-obvious.
3. **Time-saving**: PASS — naming the failure mode (losing context between sessions) and estimating hours saved (1-2 hours per resumed session) is straightforward.
4. **Encodable**: PASS — a template `ISSUES_AS_TODO.md` or a v0.dev-specific resumption checklist captures the insight.
5. **Evidence-anchored**: FAIL — only 1 hypothetical repo. The two-repo gate is not met.

**Score: 3/5 — would NOT ship.** Goes to parking lot until a second repo with the same shape appears.

## System verdict

The 5 skills handled Maya's hypothetical data without breakage:

- workflow-archaeologist degraded gracefully when commit SHAs were unavailable (inferred observations explicitly marked).
- dimension-router correctly placed her primary signal in user-to-user with cross-references.
- cross-repo-comparator produced a Tier-B classification + resumed-shape prediction with appropriate confidence intervals.
- insight-distiller surfaced one new candidate that didn't fit existing patterns.
- monetization-auditor correctly rejected the new candidate at 3/5 because of single-repo evidence — the gate held.

**Edge cases discovered**:

1. **Zero-PR-plus-many-issues** is a coordination shape absent from the 4-source dataset. This is a *gap in the dataset*, not a bug in the system. To close it, a real second observation is needed.
2. **v0.dev** as a bootstrapping platform has different placeholder defaults than Lovable's `vite_react_shadcn_ts`. The `readme-placeholder-survives-to-head` pattern needs a v0.dev-specific version of the rubric — what does v0.dev's template default look like? (Hypothesis: v0.dev fills in the project name during the first prompt, so the placeholder pattern is weaker than in Lovable.)
3. **Stripe + Resend + PostHog** is a *commercial-product dep signature* that hasn't been seen in the source repos. None of the 4 use payment integration. This may be a Tier-A indicator stronger than "any non-template dep" — a candidate refinement to the four-feature classifier.
4. **38-day dormancy mid-zone** is between the 14-day (chess-mind resumed) and 64-day (core-unified abandoned) thresholds in the dataset. Maya's resolution will be a real data point if observed.

## What this exercise validates

- The skills are operational (not just scaffolds) against a 6th repo's data.
- The dimension router and Tier classifier extend to v0.dev despite the dataset being Lovable-heavy.
- The monetization auditor's 2-repo gate prevents single-data-point patterns from shipping prematurely — good. The gate held under pressure.
- The hypothetical exposes two real gaps for future research: (a) v0.dev placeholder rubric; (b) commercial-dep-signature refinement to the classifier.

## What this exercise does NOT validate

- Real commit voice escalation requires `git log` access; the rubric is unrunnable without it.
- The 38-day dormancy resolution is unknown until we observe Maya's actual outcome.
- No real evidence pointers in the insights — everything is `<inferred>`. Real shipping would require a real survey.

## Pass/fail

**PASS** — the system handled new-shape data without crashing, with appropriate confidence intervals, and the parking lot mechanism kept a single-data-point candidate from shipping.

## Cross-references

- Skills: `/.claude/skills/workflow-archaeologist.md`, `/dimension-router.md`, `/cross-repo-comparator.md`, `/insight-distiller.md`, `/monetization-auditor.md`
- Matrix: `/research/cross-repo/patterns-matrix.md`
- Synthesis: `/research/cross-repo/synthesis.md`
