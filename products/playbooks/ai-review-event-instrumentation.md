---
depends-on: ai-cross-review-setup
type: meta-playbook
status: hypothesis
---

# AI Review Event Instrumentation — From Anecdote to Personal Dataset

> Tagline: Turn every "one AI caught another AI's bug" event into a row in your personal dataset. Compound the data over a year and you own a defensible body of cross-AI-review evidence nobody else has.

> **Claim strength: causal — inherited.** This is a meta-playbook over
> `ai-cross-review-setup`, whose backing insights carry `may-assert-cause: yes`.
> It may not assert more than its parent does, and it adds no evidence of its own.

## Meta-playbook context

This playbook **depends on** `ai-cross-review-setup.md`. If you have not set up Claude + Codex (concurrent) or Claude + Cursor (batch) per that playbook, this one has nothing to instrument.

## Target buyer

**Solo builders who already use the AI Cross-Review Setup and want to convert anecdotal "my AI caught another AI's bug" stories into a personal dataset they can analyze, market, and learn from.**

More specifically: indie hackers, consultants, and AI-tooling power users who have shipped 2+ cross-review events but cannot answer "how often does this happen? which AI catches what? what's the dollar value over a year?"

## Rework hours saved per session

Per-event instrumentation overhead: 30-60 seconds per cross-review event (commit message + LOG row + tag).

Per-year savings: the dataset compounds. After 12 months of instrumentation, the operator can answer:

- "How many P1 bugs did my secondary AI catch this year?" (estimated value: $X per bug × N bugs)
- "Which AI catches which bug class?" (estimated value: better routing of future tasks)
- "What's the mean response time from review-comment to fix-commit?" (estimated value: workflow optimization)

The value is not in hours saved per session but in *defensible data the operator owns*. Estimated cumulative value over 12 months: 8-20 hours of analysis time that the dataset enables, plus the marketing/positioning value of being able to say "in my data, Codex catches P1 race conditions at rate X."

## Problem statement

The Codex+Claude P1 race catch in groundstate-protocol PR#10 is currently n=1 in the dataset. Anecdotes don't compound. To convert future cross-review events from anecdote to evidence, the operator must instrument *at the moment the event happens*, not retroactively. Memory rots; commit messages persist.

Without instrumentation, an operator who runs Claude + Codex for a year will accumulate 5-15 cross-review catches (estimated from groundstate's 1-event-per-9-weeks rate × 12 months) but will not be able to enumerate them. They will lose: the dataset's marketing value, the workflow-optimization signal, and the ability to argue with confidence about which AI catches which bug class.

## The playbook

### The commit-message convention

When Claude or Cursor or any author-AI ships a fix in response to a review-AI's catch, use this commit subject:

```
fix(ai-cross-review): <bug-class> caught by <reviewer-ai>, fixed by <author-ai> (response: <duration>)
```

Examples:

```
fix(ai-cross-review): handleSubmit race caught by Codex, fixed by Claude (response: 4m05s)
fix(ai-cross-review): off-by-one pagination caught by Codex, fixed by Claude (response: 12m18s)
fix(ai-cross-review): missing null-check caught by GitHub-Copilot-review, fixed by Cursor (response: 38m)
```

The regex `fix\(ai-cross-review\):` is grep-able across every repo the operator touches. The duration enables time-series analysis.

### The commit-body template

```markdown
## Cross-review event

- **Reviewer AI**: <Codex | Copilot-review | DeepSeek | Aider | Sweep | ...>
- **Author AI**: <Claude | Cursor | Aider | ...>
- **Bug class**: <race-condition | null-deref | logic-error | XSS | SQL-injection | leaking-secret | wrong-type | infinite-loop | ...>
- **Severity**: <P0 | P1 | P2 | P3>
- **Caught at**: <PR-N | commit-SHA | session-link>
- **Fix shipped**: <PR-M | commit-SHA>
- **Response time**: <HH:MM:SS>
- **Production-adjacent?**: <yes | no>
- **Cost-if-shipped (estimate)**: <hours | dollars>
- **Notes**: <free-form, optional>
```

### The LOG.md row template

At session end, append to `LOG.md` Anti-Patterns or a new `## Cross-Review Events` section:

```markdown
| Date | Repo | Bug class | Reviewer | Author | Response | Severity | Est cost saved |
|------|------|-----------|----------|--------|----------|----------|----------------|
| 2026-05-06 | groundstate-protocol | race-condition | Codex | Claude | 4m05s | P1 | 2-4 hrs + duplicate-submission incidents |
| 2026-06-N | <repo> | <class> | <reviewer> | <author> | <duration> | <P0-P3> | <est> |
```

This table is queryable by `git grep` or by reading LOG.md. After 12 months it is the operator's primary dataset.

### The quarterly analysis script

```bash
#!/usr/bin/env bash
# cross-review-stats.sh — summarize cross-review events across all repos

set -euo pipefail
repos_root="${1:-$HOME/code}"

echo "# Cross-Review Events — Quarterly Summary ($(date +%Y-Q%q))"
echo

for repo in "$repos_root"/*/; do
    cd "$repo"
    count=$(git log --grep='fix(ai-cross-review):' --since='3 months ago' --oneline 2>/dev/null | wc -l)
    if [ "$count" -gt 0 ]; then
        echo "## $(basename "$repo")"
        git log --grep='fix(ai-cross-review):' --since='3 months ago' --pretty=format:'- %ad %s' --date=short
        echo
        echo
    fi
    cd - > /dev/null
done
```

Run quarterly. Read the output. The compounding value is visible after the second run.

### What to do with the dataset

After 12 months of instrumentation, the operator has:

1. **A defensible body of evidence** for the AI cross-review playbook. "In my n=15 events over 12 months, P1 catches occurred at rate Y" is more credible than n=1.
2. **Routing data**: which review-AI catches which bug class? Use the data to route future tasks (security-critical → AI X; UI-critical → AI Y).
3. **Marketing material**: a quarterly LinkedIn post ("Q3 cross-review report: Codex caught 4, Copilot caught 2, total est savings $8,000") is a unique content angle.
4. **Refresh data for `ai-cross-review-setup.md` pricing**: the per-bug rate confidence (currently medium because n=2) goes to high after n=10+.

## Why this matters

The original `ai-cross-review-setup.md` playbook ships with medium pricing confidence because the dataset is n=2. Each future cross-review event the operator instruments adds to the dataset, raising confidence. After 30 events, the confidence is high; after 100, the operator has *the* canonical dataset on solo-builder cross-AI review.

This is the *compounding pattern* — the playbook itself improves with use. Most playbooks don't. This one does.

## Evidence

The pattern is so far n=1 in the source dataset:

- **groundstate-protocol PR #10**: Codex flagged a P1 race condition on `handleSubmit` bypass; Claude shipped fix `f77d0a9` 4m5s after PR open. Reference: groundstate-protocol@11:05.

The single observation motivates the instrumentation playbook — without instrumentation, the pattern stays at n=1 forever. The playbook is therefore a *self-fulfilling forecast*: the operator who adopts it generates the evidence that confirms it.

## When to use

- Immediately after setting up Claude + Codex or Claude + Cursor per `ai-cross-review-setup.md`
- After observing a cross-review event for the first time (use the playbook to backfill the LOG.md row for the event you just observed)
- During quarterly portfolio review (run the analysis script)

## When NOT to use

- Before setting up cross-review at all (nothing to instrument)
- For non-AI code review events (this playbook is specifically about one AI catching another AI's bug; human-AI events are a different dataset)
- In a repo where multiple humans contribute (the instrumentation noise floor is too high)

## Adoption checklist

1. [ ] I have set up Claude + Codex (concurrent) or Claude + Cursor (batch) per `ai-cross-review-setup.md`.
2. [ ] I have saved the commit-subject convention to my editor snippets.
3. [ ] I have created a `## Cross-Review Events` section in my LOG.md (or equivalent journal).
4. [ ] I have saved `cross-review-stats.sh` to `~/bin/`.
5. [ ] I will instrument the *next* cross-review event I observe (do not backfill old ones — accuracy degrades).
6. [ ] I will run the analysis script every 90 days and post one finding to LinkedIn or my journal.
7. [ ] After 12 months I will revisit `ai-cross-review-setup.md` pricing confidence and update if n≥10.

## Cross-references

- Depends on: `/products/playbooks/ai-cross-review-setup.md`
- Source insight: `/insights/claude-to-claude/ai-cross-review-setup.md`
- Source observation: `/research/groundstate-protocol/extracted-insights.md` § groundstate-protocol@11:05
- Pricing row: `/products/pricing-hypotheses.md`
