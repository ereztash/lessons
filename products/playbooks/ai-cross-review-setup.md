# AI Cross-Review Setup — Concurrent and Batch Multi-AI Handoff Templates

> Tagline: Pair a write-AI with a review-AI to catch what single-AI workflows ship to production.

> **Claim strength: causal.** both backing insights carry `may-assert-cause: yes` — 6 repos after Round 3.
> The mechanism may be stated as a mechanism.

## Target buyer

**Solo builders shipping production-adjacent code with a single AI write-assistant who have recently shipped a bug that a second pair of eyes (human or AI) would have caught.**

More specifically: indie hackers, consultants, and tech leads using Claude Code (or Cursor, or Aider) as their primary write surface who have already invested in workflow discipline (conventional commits, PR templates) and are ready to add a second-AI review layer.

## Rework hours saved per session

**2-4 hours per caught bug** (post-deploy bug-fix cycles range 1-6 hours each, including investigation, fix, redeploy, and verification). Over a quarter of building, the expected count of caught bugs is 2-3 — so 4-12 hours of saved rework per quarter.

For builders shipping public-facing or paid features, the saved cost can be much higher when the bug would have been a customer-visible incident.

## Problem statement

A single-AI write workflow has a structural blind spot: the AI's review pass is biased by the same context that produced the write. Claude reviewing Claude's code is reviewing through the same prompt frame; the failure modes that didn't surface during the write don't surface during the review either. A second AI with a fresh frame breaks the bias. Two distinct multi-AI shapes exist: the *concurrent review* (write-AI and review-AI running against the same PR, latency from review-comment to fix-commit in single-digit minutes) and the *sequential batch* (write-session stages a workspace, hands off to a fire-and-forget agent that returns in <15 minutes with a structured PR). Both shapes are observable post-hoc through commit and PR-body signatures (Cursor's footer link, Codex's named-bug citation), which means the multi-AI legibility compounds — a future reader of the repo can recognize the pattern.

## The playbook

### Shape 1: Concurrent Review (Claude + Codex)

**When to use**: PRs touching critical paths (auth, payments, form-submission, race-condition-prone async flows). High review-value-per-minute.

**Setup**:

1. In Claude Code, write the feature on a `claude/<task>` branch.
2. Push and open a PR via your usual `/cor-ship` flow.
3. Open ChatGPT (or another Codex-equivalent surface) and prompt:

```
Review this PR for race conditions, error handling, edge cases, and security issues. Cite each finding by file and line.

PR diff:
<paste the diff here>
```

4. As Codex returns findings, paste each one back to Claude Code in the active session:

```
Codex flagged this in our PR: <quoted finding>

Fix it in the next commit. Reference the finding in the commit body.
```

5. Claude ships the fix as a follow-up commit. Merge after the fix lands. The fix-commit body cites the finding by name ("Fixes race condition flagged by Codex: handleSubmit bypass").

**Expected latency**: 4-10 minutes from review-comment to fix-commit (write session still active; context warm).

### Shape 2: Batch Handoff (Claude + Cursor)

**When to use**: Mechanical refactors, bulk renames, dependency upgrades, format/lint cleanups. Throughput-critical work where you want to do something else during the batch.

**Setup**:

1. In your local shell, stage the workspace for Cursor:

```bash
git checkout -b cursor/<task>
git commit -am "Cursor: Apply local changes for cloud agent"
git push -u origin cursor/<task>
```

2. Open Cursor's cloud-agent UI. Point it at the `cursor/<task>` branch. Give it a one-paragraph task description with explicit success criteria.

3. Walk away. Come back in 9-15 minutes (typical Cursor batch duration).

4. Cursor returns with N commits on the branch (typical N: 3-7), each with a `feat(scope):` or `refactor:` prefix, plus a structured PR with an architecture diagram if relevant. The PR body footer carries `<a href="https://cursor.com/agents/bc-...">` linking back to the agent session.

5. Open the PR. Verify the changes match your spec. Merge or request changes.

**Expected latency**: 9-15 minutes from stage commit to PR open (you are off-session; the cost is your distraction-switching, not your wait time).

### Combining the two shapes

For a complex feature: use Claude (concurrent with Codex review) for the architectural commit, then Cursor (batch) for the mechanical cleanup. The signatures stack cleanly in the PR log — a future reader sees `Claude <noreply@anthropic.com>` commits with Codex-cited fixes, followed by a `Cursor: Apply local changes for cloud agent` handoff and the Cursor-authored batch commits.

### Signature templates (for legibility)

**Concurrent fix-commit body**:

```
Fixes <bug-name> flagged by Codex during PR review.

Details:
- Race condition on <component> when <trigger>
- Mitigation: <one-sentence>

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Batch handoff staging commit**:

```
Cursor: Apply local changes for cloud agent

Workspace staged with <N> uncommitted edits. Cursor session: <date> <time>.
Task handoff: see /docs/cursor-task-<task>.md for the prompt.
```

## Evidence

- **groundstate-protocol** PR#10 — Codex reviewed Claude-authored code, flagged a P1 race condition on `handleSubmit` bypass causing duplicate-submission risk on slow networks. Claude shipped fix `f77d0a9` 4m5s after PR open, before human merge. Reference: groundstate-protocol@11:05.
- **cor-sys** — 9-minute Cursor burst on `cursor/dsm-b64e` branch with explicit handoff scaffolding commit `Cursor: Apply local changes for cloud agent` 7 minutes before the Cursor burst. 5 commits with `feat(scope):` headers, structured PR with architecture diagram, Cursor footer linking back to the agent UI. Reference: cor-sys@10:11.
- The two shapes are observable post-hoc — a builder reviewing their own repo a year later can recognize the multi-AI pattern from commit authors and PR body signatures alone.

## When to use

- Production-adjacent features touching auth, payments, async flows, or user data
- Mechanical refactors that you don't want to babysit (use the batch shape)
- Any PR you would normally ask a human reviewer for but cannot get one (solo builder, off-hours, niche domain)

## When NOT to use

- Prototype-mode repos at Tier B or C (overhead > value; ship in a single AI session)
- Trivial commits (formatting, dependency bumps with no risk) — the review-AI cost exceeds the bug-cost
- When you don't have a second AI subscription active (the playbook assumes both subscriptions are paid)

## Adoption checklist

1. [ ] I have an active subscription to at least two distinct AI write/review tools.
2. [ ] I have run the concurrent review shape on at least one PR and observed the fix-commit cite the review-AI's finding by name.
3. [ ] I have run the batch handoff shape on at least one mechanical refactor and observed the agent's structured PR with signature footer.
4. [ ] I have saved the signature templates (fix-commit body, handoff staging commit) as snippets.
5. [ ] I have audited my last 5 PRs and classified them as single-AI vs dual-AI; identified candidates that would have benefited.
6. [ ] I have a rule for when to use concurrent vs batch (concurrent = critical, batch = mechanical).
7. [ ] I have shared the playbook with one peer building with multiple AIs.

## Cross-references

- Insight source: `/insights/claude-to-claude/ai-cross-review-setup.md`
- Companion playbook: `/products/playbooks/dual-ai-surface-workflow.md` (render/write surface pairing)
- Pricing row: `/products/pricing-hypotheses.md`
