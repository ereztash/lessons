---
dimension: user-to-user
slug: publish-button-satisfiability
evidence-repos: [core-unified-consciousness, groundstate-protocol, chess-mind-patterns]
evidence-pointers:
  - core-unified-consciousness@12:00
  - core-unified-consciousness@12:07
  - groundstate-protocol@11:00
  - chess-mind-patterns@11:07
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
related-playbook: products/playbooks/publish-button-intent-triage.md
created: 2026-05-12
---

# Publish-Button Satisfiability — the Intent-Triage Insight

## Observation (Claude layer — 5 lines max)

- A Lovable-bootstrapped repo is at high risk of abandonment when the operator's success condition can be satisfied by pressing Lovable's Publish button once.
- Three repos sit on the satisfaction axis: core-unified (Publish fully satisfies → 64-day silence), groundstate (Publish does NOT satisfy because conversion is the goal → 9-week editorial activity), chess-mind (Publish does NOT satisfy because skill-improvement requires PWA + Lichess → 72-minute resumption sprint).
- Behavioral success conditions (skill, conversion, integration, persistence) require leaving Lovable; demonstrative success conditions (render a vision, render a manifesto) do not.
- The signal is detectable at repo-birth via a 5-minute interview, before any code is written.
- The hypothesis is platform-agnostic: substitute Bolt.new, v0.dev, or Replit Agent — the asymmetry persists.

## Mechanism

LLM-coding platforms ship with a built-in exit affordance (the Publish button). When the operator's intent matches the affordance, friction is zero and the project closes successfully at Tier C. When the operator's intent exceeds the affordance, the friction drives them off-platform — into Claude Code, into integration code, into a real package.json dependency. The platform is therefore selecting the project type, not the project quality; abandonment and resumption are downstream of intent-to-platform fit.

## Failure mode it prevents

Operators routinely waste 2-6 hours of CLAUDE.md / docs / .github infrastructure investment on repos whose intent is fully satisfied at Tier C — the repo was finished the moment Publish was pressed, but the operator didn't recognize it. Conversely, operators sometimes under-invest in repos with behavioral success conditions, letting the 72-minute resumption window expire because they didn't pre-plan the off-platform work. The triage at repo-birth costs 5 minutes and prevents both directions of misallocation.

## Monetization route

- Playbook section: "5-minute Intent-Triage Interview" — 7 questions producing a recommended tier (A/B/C) and infrastructure tier (full / lightweight / none).
- Decision tree template: behavioral vs demonstrative success condition classifier.
- Optional companion command /lesson-intent-triage for future versions.

## Reusability test

Substitute a non-dataset platform (e.g., Bolt.new) and a non-dataset domain (e.g., a Bolt-bootstrapped invoicing tool). The interview still works: ask whether the success condition is rendered-once vs ongoing-behavioral, and the tier recommendation falls out. Pass.
