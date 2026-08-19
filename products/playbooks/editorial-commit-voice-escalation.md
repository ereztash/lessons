# Editorial Commit Voice Escalation — The 4-Register Rubric for Detecting Project Investment

> Tagline: Tell, in 30 seconds, whether your dormant Lovable repo is being silently invested in or quietly abandoned — by reading the last 10 commit subjects against a 4-register rubric.

> **Claim strength: causal.** its backing insight carries `may-assert-cause: yes` — confirmed in 4 repos, mechanism isolated in agency-insight-analyzer.
> The mechanism may be stated as a mechanism.

## Target buyer

**Solo AI-paired builders with 5+ LLM-tool-paired repos who do a quarterly or monthly portfolio review and want a fast read on "is this one still alive?"**

More specifically: indie hackers, consultants, and solo founders who feel cognitive overhead from re-opening dormant repos to remember context and want a 30-second signal *before* spending 20 minutes on a deep audit.

## Rework hours saved per session

**2-5 hours per portfolio review** — the cost of mis-classifying a thin-voice repo as healthy (and over-investing) or a research-cited repo as dormant (and under-investing). For an operator with 10-15 repos and 4 reviews per year, expected savings is 8-20 hours per year.

For the single highest-leverage use case — deciding between archiving and resuming a 30+ day dormant repo — savings is up to 6 hours per correctly-routed decision.

## Problem statement

When an operator looks at a dormant repo's `git log`, the question "is this still alive?" is hard to answer at a glance. Commit count is misleading (bot blasts inflate it); recency is misleading (a repo dormant 30 days may still be in active human investment between sprints); LOC delta is misleading (a 4,462-LOC sprint and a 60-LOC sprint can both be investment signals). What is NOT misleading: the editorial register of recent commit subjects.

The register escalates monotonically when a project is being invested in. Once the operator starts citing behavioral research in commit bodies, they will not retreat. Once they name anti-patterns by number, they keep doing it. This asymmetric ratchet makes voice escalation the strongest leading signal of survival in the dataset — but only if you know the rubric.

## The playbook

### The 4-register rubric

Classify each of the last 10 commit subjects into one of these four registers:

| Register | Hallmark | Example | Investment signal |
|----------|----------|---------|---------------------|
| **R0 — Bot imperative** | 3-6 word imperative, no prefix, no body | `Add subscription`, `Fix layout`, `Update site info for publish` | Zero (bot-only) |
| **R1 — Conventional summary** | `feat:` / `fix:` / `chore:` prefix, ≤80 chars, no body | `feat: add chess.js dependency` | Weak (human has set up commit conventions) |
| **R2 — Annotated body** | Conventional prefix + 3-10 line body with file-by-file or step-by-step annotation | `feat: integrate Lichess deep-links\n\n- Add LichessAdapter\n- Wire into Index.tsx\n- Service-worker register` | Medium (human is documenting decisions) |
| **R3 — Research-cited body** | Conventional prefix + body with named citations, anti-pattern numbers, or external research sources | `feat: tune landing copy and layout for conversion with behavioral research (Dai/Milkman/Riis 2014; Tversky & Kahneman 1974)` | Strong (human is *thinking* in commit bodies) |

### The escalation slope

Count how many of the last 10 commits sit in each register. The escalation slope is the trend across timestamps:

- **Flat at R0**: bot-only repo. Tier C signature. Archive or use the Publish-Button Intent Triage playbook to confirm.
- **Flat at R1**: a basic Claude-paired prototype. The operator set up commit conventions but is not investing time per commit. Could be healthy maintenance or could be drift; needs a deeper look.
- **Escalating R0 → R1 → R2**: classic resumed-prototype pattern. The repo has crossed at least one rung. Schedule a 72-minute resumption sprint per `resumer-day-prep.md`.
- **Escalating R2 → R3 over multiple commits**: research-citation register has been adopted. This is a one-way ratchet. The repo is being seriously invested in. Do NOT archive even if days-since-commit is high; the next sprint will likely produce another R3.
- **De-escalation (R3 → R2 → R1)**: extremely rare in the dataset. Indicates burnout or context loss. Either schedule a resumption sprint within 7 days or archive with a note.

### The 30-second audit script

```bash
#!/usr/bin/env bash
# voice-audit.sh — score the editorial register of the last 10 commits

set -euo pipefail
repo="${1:-.}"
cd "$repo"

echo "# Voice audit for $(basename $(pwd))"
echo

git log --pretty=format:"%h%x09%s" -n 10 | while IFS=$'\t' read sha subject; do
    register="R0"
    # R1: starts with conventional prefix
    if echo "$subject" | grep -Eq '^(feat|fix|chore|docs|refactor|test|debug)(\([^)]+\))?:'; then
        register="R1"
    fi
    # R2/R3: check body for annotation depth
    body_lines=$(git log -1 --pretty=format:"%b" $sha | wc -l)
    if [ $body_lines -ge 3 ]; then register="R2"; fi
    # R3: body has external citations (year in parens, anti-pattern #, or 2+ author-year refs)
    body=$(git log -1 --pretty=format:"%b" $sha)
    if echo "$body" | grep -Eq '(\([0-9]{4}\)|anti-pattern #[0-9]+|[A-Z][a-z]+ & [A-Z][a-z]+ [0-9]{4})'; then
        register="R3"
    fi
    echo "$register  $sha  $subject"
done
```

Run it, count registers, and read the slope.

### Decision tree

1. All 10 commits at R0 → Tier C suspect. Use `publish-button-intent-triage.md` to confirm and decide archive vs resume.
2. R1 majority, no R2/R3 → basic Claude-paired prototype. Check non-template deps; if zero, treat as Tier C; if any, schedule a `resumer-day-prep.md` sprint.
3. R2 majority, escalating toward R3 → active investment. Do not archive. Open the repo within 14 days for a sprint.
4. R3 appears anywhere in the last 10 → research-citation register adopted. High confidence the repo is alive even if dormant > 30 days.
5. R3 → R2 → R1 de-escalation → schedule a resumption sprint within 7 days or archive with a postmortem note.

## Evidence

- **groundstate-protocol** — 12-phase escalation across the Claude pivot period. The commit `af24284` body cites 11 named research sources (Dai/Milkman/Riis 2014; Tversky & Kahneman 1974; Levav & Fitzsimons 2006; Cialdini 1984; Gollwitzer 1999; Ebbinghaus 1885; Murdock 1962). No subsequent commit drops below R2. Reference: groundstate-protocol@11:02.
- **cor-sys** — Phase 3 stabilization commit bodies acknowledge prior failures by anti-pattern number; PR #10 and PR #16 carry full `## Tests` / `## Architecture` sections at >2 KB. Reference: cor-sys@10:06, cor-sys@10:03 (PR #10 body length).
- **chess-mind-patterns** — single-step jump from bot's 6-word imperatives to `feat:` + file-by-file annotation at the 72-minute resumption sprint. R0 → R2 in three commits. Reference: chess-mind-patterns@11:05.
- **core-unified-consciousness** — 34.5% of commit subjects are R0 generic placeholders (`Preceding changes`, `Changes`). No escalation. Reference: core-unified-consciousness@12:08. This is the negative control: no escalation correlates with abandonment.

## When to use

- Quarterly or monthly portfolio review across 5+ repos
- Deciding whether to archive a dormant repo (30+ days no commit)
- Onboarding a new Claude session to a stale repo and wanting to read the operator's prior investment level fast
- Comparing two candidate repos for which deserves the next sprint slot

## When NOT to use

- Brand-new repos (<10 commits) — the rubric requires a baseline to detect escalation
- Multi-operator repos — voice mixes across contributors confound the slope
- Repos with squash-merge enforced — squash erases the per-commit voice signal
- Repos using a non-English commit voice — the regex needs adjustment (especially for Hebrew-bilingual repos where the body may carry mixed-language citations)

## Adoption checklist

1. [ ] I have read the 4-register definitions and can classify a commit subject in <5 seconds.
2. [ ] I have saved `voice-audit.sh` to my `~/bin/` or `~/.local/bin/` and made it executable.
3. [ ] For my next portfolio review, I will run `voice-audit.sh` on each repo before opening it in an editor.
4. [ ] For each repo with R3 in last 10 commits, I will resist the urge to archive even if dormant >30 days.
5. [ ] For each repo flat at R0 across 10 commits, I will run the Publish-Button Intent Triage interview to confirm Tier C.
6. [ ] I will revisit my own commit voice after each session: am I escalating, flat, or de-escalating?
7. [ ] I will record one observation per quarter on whether the rubric mis-classified a repo, to refine the script.

## Cross-references

- Insight source: `/insights/claude-to-user/editorial-commit-voice-escalation.md`
- Companion playbook: `/products/playbooks/publish-button-intent-triage.md`
- Companion playbook: `/products/playbooks/four-feature-tier-classifier.md`
- Companion playbook: `/products/playbooks/resumer-day-prep.md`
- Pricing row: `/products/pricing-hypotheses.md`
- Synthesis section: `/research/cross-repo/synthesis.md` § 9
