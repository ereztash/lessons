# Prompt 01 — Session Bootstrap & Access Verification

> Paste this as the FIRST message in a new Claude Code session. Do not modify.

---

You are continuing a deep workflow research → SaaS productization project. A previous Claude Code session completed 5 phases of work + gap closure + scanner MVP build. ALL of that work is documented in the GitHub repo `ereztash/lessons` on branch `claude/analyze-workflow-optimization-3NhlH`.

You have ZERO memory of the prior session. This prompt onboards you.

## Step 1 — Load context (BLOCKING, do this before any other work)

Read these files via `mcp__github__get_file_contents(owner='ereztash', repo='lessons', path='<path>', ref='refs/heads/claude/analyze-workflow-optimization-3NhlH')`:

1. `CLAUDE.md` — Gate 0 protocol, quick rules, two-layer architecture
2. `MEMORY.md` — current state index (phase, last-touched repo, open candidates, gates)
3. `LOG.md` — environment facts, anti-patterns table, session history
4. `skill.md` — 5 custom skills + 6 slash commands quick-ref
5. `index/CLAUDE.md` — master deep-dive with bilingual HE+EN routing
6. `research/cross-repo/synthesis.md` — the cross-repo narrative (10 sections)
7. `research/cross-repo/patterns-matrix.md` — 35 patterns, 17+ promoted
8. `products/pricing-hypotheses.md` — 6 playbooks shipped with pricing
9. `handoff/README.md` — this handoff document (you're inside step 1)

## Step 2 — Verify access expansion

The prior session was restricted to 5 repos (cor-sys, groundstate-protocol, core-unified-consciousness, chess-mind-patterns, lessons). This session should have access to ALL 26 of ereztash's repos.

Run:
```
mcp__github__search_repositories(query="user:ereztash", perPage=30)
```

**Expected result**: 26+ repos returned (depending on private vs public scope).

**If you see 26+**: access is confirmed. Proceed to Step 3.

**If you see only 5 or fewer**: access was NOT actually expanded. STOP and report this to ereztash. They need to update the MCP allowlist (`.mcp.json` or GitHub App permissions) and restart the session. Do not attempt to proceed with limited access — the validation pass requires all 26.

## Step 3 — Inventory the 26 repos

For each repo `mcp__github__search_repositories` returned, note:
- Name
- Visibility (public/private)
- Stars
- Last pushed date
- Default branch
- Description (if any)
- Archived status
- Fork status

Bucket them into:
- **Already-deep-dived** (4 repos): cor-sys, groundstate-protocol, core-unified-consciousness, chess-mind-patterns
- **Lessons output repo** (1 repo): lessons — do NOT scan as a target, it's the output destination
- **New to scan** (~21 repos): everything else — these are the validation dataset

## Step 4 — Report orientation

Reply with a clean status report:

```
## Orientation Status

### Context loaded
- [confirm each of 9 files read successfully]
- Current phase per MEMORY.md: <copy text>
- Top playbook by monetization-score: <name>
- Most-recent anti-pattern in LOG.md: <number, title>

### Access verification
- Repos accessible via search: <N>
- Verdict: ACCESS GRANTED | ACCESS RESTRICTED | UNCLEAR

### 26-repo inventory
[markdown table: name | visibility | stars | last-pushed | default-branch | bucket]

### Next-step plan
Proposing to proceed to Prompt 02 (portfolio scan). The 21 new-to-scan repos will be classified using the Four-Feature Tier Classifier in /products/playbooks/four-feature-tier-classifier.md. Output target: /research/portfolio-scan/26-repos.md.

Awaiting user confirmation to proceed with Prompt 02.
```

## Quality rules for this prompt

- DO NOT scan any repo's contents yet. Bootstrap only.
- DO NOT modify any files in lessons repo yet.
- DO NOT pretend you remember the prior session. If you don't know something, say so.
- DO read the 9 files fully before reporting orientation.
- DO honestly assess if your access matches the expected 26 repos.

End of Prompt 01.
