---
dimension: user-to-user
slug: tier-classifier-cli
evidence-repos: [core-unified-consciousness, chess-mind-patterns, cor-sys, groundstate-protocol]
evidence-pointers:
  - core-unified-consciousness@12:09
  - cor-sys@10:00
  - chess-mind-patterns@11:00
  - groundstate-protocol@11:00
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
related-playbook: products/playbooks/four-feature-tier-classifier.md
created: 2026-05-12
---

# Four-Feature Tier Classifier — Portfolio Triage in 30 Seconds

## Observation (Claude layer — 5 lines max)

- Four binary features partition a Lovable-bootstrapped repo into Tier A / B / C: (1) any non-template production dependency? (2) any human commit ever? (3) any PR ever? (4) any CLAUDE.md or docs/ folder?
- Across the 4-repo dataset: cor-sys 4/4 = Tier A, groundstate 2-3/4 = Tier A-borderline, chess-mind 2/4 = Tier B, core-unified 0/4 = Tier C.
- The four features are monotonic — repos accumulate rungs in order and never regress; the count is a lower bound on system-mode commitment.
- The classifier runs against any git host's API in <5 seconds per repo: list_commits, list_pull_requests, get_file_contents on package.json and CLAUDE.md.
- For a builder with 10+ Lovable repos, the classifier produces a triage list (resume now / promote / archive) in under a minute.

## Mechanism

Each feature represents an irreversible act the operator took: installing a non-template dep, committing outside the Lovable UI, opening a PR, writing CLAUDE.md. Each act has a non-zero activation energy; cumulative count therefore reflects accumulated commitment. The monotonic ladder property holds because none of the features are easily un-done — uninstalling a dep, deleting commits, closing PRs without merging, deleting CLAUDE.md all leave traces and are rare in practice.

## Failure mode it prevents

Without this classifier, a builder reviewing their portfolio after a long absence will spend 10-20 minutes per repo trying to remember its state ("did I finish this? was I going to come back? is this dead?"). For a 10-repo portfolio that's 2-3 hours of disoriented review. The 30-second-per-repo classifier produces the same triage with an explicit, defensible rule, saving 1-3 hours per portfolio review.

## Monetization route

- CLI tool (`tier-classify <repo-url>`) or GitHub Action that scores any repo and emits the recommended next action.
- Playbook section documenting the rule, the script, and the interpretation.
- Companion template: a CSV output format for portfolio-wide scoring.

## Reusability test

Substitute any non-dataset repo bootstrapped with a similar template (Bolt.new, v0.dev, Replit Agent, hand-bootstrapped Vite). Run the classifier: it returns a tier. The classifier doesn't depend on Lovable specifically — it depends on the four irreversible acts, which generalize. Pass.
