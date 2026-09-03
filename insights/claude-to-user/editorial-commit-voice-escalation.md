---
dimension: claude-to-user
slug: editorial-commit-voice-escalation
evidence-repos: [groundstate-protocol, cor-sys, chess-mind-patterns]
evidence-pointers:
  - groundstate-protocol@9b634aa
  - groundstate-protocol@c4867f5
  - groundstate-protocol@af24284
  - cor-sys@bb3d459
  - cor-sys@86cf90e
  - cor-sys@f53a9a2
  - cor-sys@72b3efd
  - cor-sys@7719d64
  - cor-sys@5c2bf0d
  - cor-sys@6fbb735
  - cor-sys@31c607f
  - cor-sys@29ed2d9
  - cor-sys@e18b37e
  - chess-mind-patterns@875fe1c (title 'feat: add TL;DR, pattern recommendations, transition signal & demo mode')
  - chess-mind-patterns@f590fe6 (title 'feat: full course replacement — Phase 1-5 implementation')
  - chess-mind-patterns@2c7ced2 (title 'feat: Lichess deep-links, demo puzzle seeding, ELO goal setter, PWA + notifications'); contrast with bot subjects like 'Add breakpoint sliders'
  - groundstate-protocol@6a901af ('Save plan in Lovable')
  - chess-mind-patterns@29a7152 ('Preceding changes')
  - chess-mind-patterns@3581185 ('Changes')
monetization-criteria:
  reusable: pass
  defensible: pass
  time-saving: pass
  encodable: pass
  evidence-anchored: pass
monetization-score: 5/5
applicability: solo-builder
related-playbook: products/playbooks/editorial-commit-voice-escalation.md
created: 2026-05-12
evidence-resolves-to: hard
source-observations:  # lessons observations these pointers were resolved from
  - groundstate-protocol@11:02
  - cor-sys@10:06
  - chess-mind-patterns@11:05
may-report: yes
may-assert-cause: yes    # RESTORED 2026-09-03. Demoted the same day because the
                         # evidence measured `mixed`; the operator then opened the
                         # portfolio, every unresolvable pointer was re-anchored to a
                         # verified commit or PR, and R1 now measures `hard`. The
                         # claim came back on measurement, not on argument.
cause-scope: portfolio   # this portfolio only. Restored 2026-09-03 on re-anchored evidence;
                         # METHOD_LINEAGE.md section 3 still records level 7 = 0, so a cause may be
                         # asserted ABOUT these repositories and may NOT be sold as a general
                         # mechanism.

reversibility: low  # a shipped playbook is sold; a retraction reaches fewer people than the claim did
score-history:
  - 2026-05-12: 5/5 — first audit
  - 2026-09-03: 5/5 — re-audit under sale-gate condition 4: causal authority WITHDRAWN, evidence-resolves-to is `mixed` against a documented requirement of `hard`
  - 2026-09-03: 5/5 — causal authority RESTORED: pointers re-anchored against the live repositories, R1 measures `hard`, scope declared `portfolio`
---

# Editorial Commit Voice Escalation

## Observation (Claude layer — 5 lines max)

- groundstate-protocol's commit voice escalates in 12 phases from `Changes` to `Research-driven conversion lift...` with 11 cited sources (Dai/Milkman/Riis 2014; Tversky & Kahneman 1974; etc.) by `af24284`.
- cor-sys's commit bodies during the Phase 3 stabilization start naming anti-patterns by number (`anti-pattern #4: gh not installed`) and citing prior failures.
- chess-mind-patterns' resumer makes a one-step jump from bot's 3-word imperatives to `feat:` + file-by-file annotation in a 72-minute sprint.
- Once research-citation enters a commit body, no subsequent commit drops back to a less-cited register — a one-way ratchet.
- The signal is observable after 5-10 commits in the editorial register; serves as a health check for whether the operator is investing or finishing.

## Mechanism

Commit-subject specificity is a credible signal of cognitive investment. Bot-generated commits use generic templates; an operator who escalates to research-citing prose has *chosen* to spend additional minutes per commit. The choice compounds: once the editorial register is set, retreating to thin subjects feels like a regression to the operator, so they sustain the higher voice. The ratchet is asymmetric — escalating is voluntary, de-escalating feels embarrassing. This makes voice escalation a leading indicator of project survival, distinct from raw commit frequency.

## Failure mode it prevents

Without a voice rubric, an operator cannot tell whether a repo is being actively invested in or merely accumulating commits. Misreading thin-voice activity as healthy activity leads to over-investing in CLAUDE.md / docs / playbook scaffolding on a repo that is actually drifting. Conversely, missing an escalation signal leads to under-investing in a repo that is silently maturing. Estimated rework saved: 2-5 hours per quarterly portfolio review for an operator with 10+ repos.

## Monetization route

- Playbook section: "The 4-register commit-voice rubric" with examples drawn from groundstate-protocol's escalation.
- Skill artifact: `claude-commit-voice-audit` — scans last N commits and scores subject-specificity escalation slope.
- Template: a one-page commit-message escalation guide the operator pins above their editor.

## Reusability test

Substitute any non-dataset repo: the rubric only requires `git log --oneline -n 50` and a register classifier. The four registers (bot-imperative / `feat:` summary / annotated body / research-cited body) are not Lovable-specific. Pass.
