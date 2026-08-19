# Insight Template

> Copy this template for each polished insight under `/insights/<dimension>/<slug>.md`. Front-matter is REQUIRED and machine-parsed.

---

```markdown
---
dimension: claude-to-user | user-to-claude | claude-to-claude | user-to-user
slug: short-kebab-case-name
evidence-repos: [cor-sys, groundstate-protocol]
evidence-pointers:            # MUST resolve to a commit, file or PR - not to our own prose
  - cor-sys@<commit-sha>:path/to/file
  - groundstate-protocol#PR-12
evidence-resolves-to: hard    # hard | mixed | prose - MEASURED by check-lessons-contract.py, not asserted
source-observations:          # optional: the lessons observations these pointers were resolved from
  - cor-sys@10:04
monetization-criteria:
  reusable: pass | fail
  defensible: pass | fail
  time-saving: pass | fail  # estimate hours saved per session
  encodable: pass | fail  # which artifact: skill | command | template
  evidence-anchored: pass | fail
monetization-score: N/5  # must be ≥4 to ship; a reading, not a stamp - see score-history
score-history:           # append, never overwrite. Ported from Agent-Architect docs/confidence-ladder.md
  - YYYY-MM-DD: N/5 — first audit
  - YYYY-MM-DD: N/5 — what moved it
may-report: yes          # may this be stated as an observation
may-assert-cause: no     # may this be stated as a CAUSE. Separate bit, ported from MATI
                         # lib/organizational-signals.ts, where maySurfaceToOrganization and
                         # mayAssertCausality are independent. Requires strength >=2 in >=2 repos
                         # AND evidence-resolves-to: hard. Name the reason in a trailing comment.
reversibility: low       # required once related-playbook is set. Ported from proofminer
                         # docs/AUTHORITY.md, whose six axes include Reversibility: shipping is
                         # irreversible in a way distilling is not, and the gate must know it.
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

---

## Gate

`python3 scripts/check-lessons-contract.py` enforces this schema. It exits non-zero on any
violation and will not let an insight whose evidence resolves only to prose back a playbook.

To ship anyway, `--bypass "<reason>"` records the override in `ground-truth/bypass-log.md`. There is
no silent path around the gate — that is the point (`pre-call/docs/market-ready.md`).

Each rule is ported from a repo that already had it; `--explain` prints which.
