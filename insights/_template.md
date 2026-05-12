# Insight Template

> Copy this template for each polished insight under `/insights/<dimension>/<slug>.md`. Front-matter is REQUIRED and machine-parsed.

---

```markdown
---
dimension: claude-to-user | user-to-claude | claude-to-claude | user-to-user
slug: short-kebab-case-name
evidence-repos: [cor-sys, groundstate-protocol]
evidence-pointers:
  - cor-sys@<commit-sha>:path/to/file
  - groundstate-protocol#PR-12
monetization-criteria:
  reusable: pass | fail
  defensible: pass | fail
  time-saving: pass | fail  # estimate hours saved per session
  encodable: pass | fail  # which artifact: skill | command | template
  evidence-anchored: pass | fail
monetization-score: N/5  # must be ≥4 to ship
applicability: solo-builder | small-team | enterprise
related-playbook: products/playbooks/<name>.md  # if shipped
created: YYYY-MM-DD
---

# <Insight Title>

## Observation (Claude layer — 5 lines max)

What was observed, in dense form. Bullet points or one-sentence per line.

## Mechanism

Why this matters. Causal chain in 2-3 sentences.

## Failure mode it prevents

What goes wrong without this insight. Estimate of rework hours.

## Monetization route

Which artifact captures the insight: skill / command / template / playbook section.

## Reusability test

Does the insight survive substituting a repo name? If it depends on `cor-sys`-specific names, generalize before shipping.
```

---

## Notes

- The full narrative version (human-layer) lives in `/products/playbooks/<name>.md` if the insight ships.
- The 5-line summary in this file IS the Claude-layer version. Do not duplicate.
- Front-matter is parsed by `/lesson-review` and `/lesson-monetize` commands.
