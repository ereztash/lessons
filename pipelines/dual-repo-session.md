# Dual-Repo Session Protocol

> Use when: Claude Code has access to both `lessons` (this repo) and a target repo.
> Goal: load the right context in the right order, then begin work without redundant reads.

---

## Gate 0 — Bootstrap (BLOCKING — run before any work on target repo)

Run these steps in order. Each step is conditional on what you find.

### Step 1 — Identify target repo (10 seconds)

From session context or user message: extract the repo name.
If unclear → ask: "Which repo are we working on?"

### Step 2 — Look up in repo-index (30 seconds)

Read `lessons/research/repo-index.md`, section `## <target-repo-name>`.

Extract:
- Tier (A / B / C / D)
- Dormancy pattern
- Key findings (2-3 bullet points)
- Watch-for (anti-patterns specific to this repo)
- Relevant playbooks
- Deep-dive path (if exists)

If repo is **Tier D** → stop. Output: "This repo is out of scope (non-software). No work recommended."

### Step 3 — Load depth by tier

| Tier | What to load |
|------|--------------|
| A | repo-index entry + deep-dive summary (if exists) + one relevant playbook |
| B | repo-index entry + dominant failure-pattern playbook |
| C | repo-index entry + Publish-Button Intent Triage playbook |
| D | repo-index entry only — then stop |

Do NOT load more than 2 playbooks per session. Context budget is finite.

### Step 4 — Check for Genesis fixture

Is there a file at `lessons/saas/app/scripts/genesis/domains/<repo-name>.ts`?

- **Yes** → inform user: "Genesis fixture exists for this domain (sharpness X/100). Run `npx tsx scripts/genesis/index.ts -d <repo-name> -o .` to regenerate the scaffold before making changes."
- **No** → skip

### Step 5 — State your loaded context

Before any tool call on the target repo, output a one-line summary:

```
[context] <repo-name> | Tier <X> | <dormancy-pattern> | Watch for: <watch-for> | Playbook: <playbook-name>
```

Example:
```
[context] kolzchut | Tier B | functional prototype, no docs | Watch for: no CLAUDE.md — first action is genesis compile | Playbook: Four-Feature Tier Classifier
```

---

## Decision tree — what to do first

```
Target repo tier?
├── A (healthy) → proceed with task. Cite entity in commit message. Open PR.
├── A (dormant) → H2 check: is success condition externally gated?
│   ├── Yes → write resumption plan first, do not add features
│   └── No  → proceed with task
├── B → identify dominant gap (F3 or F4 usually)
│   ├── No PRs → first commit should open a PR, not push direct
│   ├── No CLAUDE.md → write CLAUDE.md before any code change
│   └── operator-absent (keepath pattern) → map what exists, write re-entry README first
├── C → do not resume with Lovable. Re-architecture required.
└── D → out of scope. Stop.
```

---

## During work — rules

1. **Commit messages**: cite the entity affected (target: ≥30% of commits name a domain entity)
2. **PRs over direct push** for any Tier A or B repo with existing PR history
3. **Anti-patterns**: before any design decision, check the Watch-for from the repo-index entry
4. **New dependencies**: justify in commit message (F1 is the highest-signal feature — don't dilute it)
5. **If CLAUDE.md doesn't exist in target repo**: creating it is the highest-leverage first action

---

## Session end — update checklist

- [ ] Did tier change? → update `lessons/research/repo-index.md` entry
- [ ] Did you find a new anti-pattern? → add to repo-index entry under Watch-for
- [ ] Did you open a PR? → note it in `lessons/LOG.md` with SHA
- [ ] Did you create a CLAUDE.md in the target repo? → note it; update F4 status in repo-index
- [ ] Is a Genesis fixture needed? → add to `lessons/saas/app/scripts/genesis/domains/`

---

## Context budget reference

| File | Tokens (approx) | Load when |
|------|-----------------|----------|
| `research/repo-index.md` | ~1,200 | Always (Step 2) |
| One playbook | ~800–1,200 | Step 3 |
| Deep-dive summary | ~600–1,000 | Step 3, Tier A only |
| `MEMORY.md` | ~200 | If state context needed |
| Genesis fixture | ~500 | Step 4, if exists |
| **Total typical load** | **~2,000–3,000** | Well within budget |
