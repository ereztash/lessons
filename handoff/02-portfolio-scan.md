# Prompt 02 — 26-Repo Portfolio Scan

> Paste this as the second message in the new Claude Code session, AFTER Prompt 01 completed with confirmed access.

---

With access to all 26 of ereztash's repositories confirmed, apply the Four-Feature Tier Classifier and supporting diagnostics to EVERY repo (excluding `lessons` itself). Produce a master scan report.

## Inputs (re-read for precision)

- `products/playbooks/four-feature-tier-classifier.md` — the classifier (the algorithm, not the SaaS playbook)
- `products/playbooks/publish-button-intent-triage.md` — the publish-button satisfiability diagnostic
- `products/playbooks/resumer-day-prep.md` — the resumption-readiness logic
- `products/playbooks/dual-ai-surface-workflow.md` — AI tool detection patterns
- `saas/scanner/src/classifier/template-deps.ts` — the canonical TEMPLATE_DEPS allowlist
- `saas/scanner/src/classifier/tier-classifier.ts` — the canonical algorithm
- `saas/scanner/src/fetcher/author-classifier.ts` — the canonical author bucketing

If any path is missing, read `saas/scanner/README.md` for the actual file paths the prior session shipped.

## Methodology (per repo)

Using GitHub MCP tools:

1. **Metadata**: `mcp__github__search_repositories` already gave you most of this. Capture: name, visibility, stars, created_at, pushed_at, archived, fork, default_branch, primary_language.

2. **Commits** (last 100, paginated if >100):
   ```
   mcp__github__list_commits(owner='ereztash', repo='<name>', perPage=100)
   ```
   Classify each commit by author class using the heuristics in `author-classifier.ts`:
   - `claude` (email = noreply@anthropic.com OR name contains Claude)
   - `cursor` (email contains cursoragent OR name = Cursor Agent)
   - `gpt-engineer` (name = gpt-engineer-app[bot])
   - `lovable` (name contains lovable)
   - `bolt-bot` (name contains bolt, bot)
   - `v0-bot` (name contains v0, bot)
   - `copilot` (email contains copilot@github.com)
   - `codex` (name = codex OR commit body contains "caught by Codex")
   - `bot-other` (name ends with [bot])
   - `human` (everything else)

3. **PRs**: `mcp__github__list_pull_requests(state='all', perPage=100)`. Count merged, closed-unmerged, open.

4. **Issues**: `mcp__github__list_issues(state='OPEN', perPage=30)` + same for `CLOSED`. Count.

5. **package.json**: `mcp__github__get_file_contents(path='package.json')`. Parse dependencies + devDependencies. Count domain-specific deps (NOT in TEMPLATE_DEPS allowlist).

6. **README**: `mcp__github__get_file_contents(path='README.md')`. Check for placeholders (`REPLACE_WITH_PROJECT_ID`, `Lovable App`, `vite_react_shadcn_ts`). Substantial = >500 chars AND no placeholders.

7. **Docs/Conventions**: `mcp__github__get_file_contents(path='')` for root listing. Note presence of `docs/`, `CLAUDE.md`, `LOG.md`, `MEMORY.md`, `AGENTS.md`.

8. **Tier classification**: apply Four-Feature scoring (each feature ∈ {0,1}, sum = tier score). Map per `tier-classifier.ts`:
   - score 4 → Tier A
   - score 2-3 → Tier B
   - score 1 → Tier C
   - score 0 with ≥10 commits → Tier C
   - score 0 with <10 commits → Tier D

9. **Publish-Button Satisfiability score** (0-100): apply weights from `publish-button-test.ts`.

10. **Resumption-Readiness score** (0-100, only meaningful for Tier B/C): apply weights from `resumption-readiness.ts`.

## Pagination strategy

For large repos (e.g., chess-mind-patterns has 175 commits):
- Fetch up to 300 commits (3 pages of 100)
- For PRs/issues: cap at 100 each
- For tree: only root + check for the 5 specific files (docs/, CLAUDE.md, etc.)
- Avoid `mcp__github__list_commits` calls for repos with >500 commits unless flagged as deep-dive

## Concurrency

Process at most 3 repos in parallel (no native concurrency in MCP tools, but you can batch via multiple `Agent` calls if needed). For 21 new repos, sequential processing should take 20-30 minutes.

## Output

Write one comprehensive report at `research/portfolio-scan/26-repos.md` in the lessons repo via `mcp__github__push_files` to branch `claude/analyze-workflow-optimization-3NhlH`.

### Report schema (use exactly this structure)

```markdown
# 26-Repo Portfolio Scan

_Scan date: YYYY-MM-DD_
_Scanned by: Claude Code session, prompt 02 of handoff sequence_

## Top-line summary

| Tier | Count | Total commits | Total hours-to-resume |
|------|-------|---------------|------------------------|
| A | N | M | n/a |
| B | N | M | H1 |
| C | N | M | H2 |
| D | N | M | n/a (archive candidates) |

**Highest-tier repo**: <name> (score 4/4)
**Strongest resumption candidate**: <name> (readiness N/100, Tier B)
**Most-likely-to-archive**: <name> (Tier D, no human commits ever)
**Total estimated rework-hours saved by acting on these recommendations**: H hours

## Per-repo entries

### <repo-name>

**Visibility**: public/private | **Stars**: N | **Default branch**: <name>
**Created**: YYYY-MM-DD | **Last pushed**: YYYY-MM-DD (D days ago) | **Archived**: yes/no

**Author classes** (commits): human=N, claude=N, cursor=N, gpt-engineer=N, lovable=N, bolt-bot=N, v0-bot=N, copilot=N, codex=N, bot-other=N

**Activity counts**: commits=N | PRs={merged: N, closed: N, open: N} | issues={open: N, closed: N}

**Surface checks**:
- package.json domain deps: [comma-list, or "none beyond template"]
- README state: filled / placeholder / missing
- docs/ folder: yes/no | CLAUDE.md: yes/no | LOG.md: yes/no | AGENTS.md: yes/no
- Primary language: <lang>

**Four-Feature Tier Classifier**: score N/4 → Tier X
- F1 non-template deps: pass/fail
- F2 ≥1 human commit: pass/fail
- F3 ≥1 PR: pass/fail
- F4 docs/substantial README: pass/fail

**Publish-Button Satisfiability**: N/100 (interpretation: ____)
**Resumption-Readiness** (if applicable): N/100

**AI tool diversity**: [list, e.g., "Lovable + Claude (dual-AI surface)", or "Lovable only (single-AI risk)"]

**Recommendation**: revive | absorb-into-<repo> | archive | keep-as-is | invest
**Reasoning**: 1-2 sentences citing the specific signals above
**Estimated hours to act on this recommendation**: N

---

[repeat per repo]

## Cross-repo patterns observed at n=26

### Patterns confirmed from n=4 dataset
[list patterns from `patterns-matrix.md` that hold at n=26]

### Patterns refined or contradicted
[list patterns where n=26 forces revision]

### NEW patterns visible only at n=26
[3-5 new patterns the smaller dataset couldn't surface]

## Methodology notes & limitations

- API rate-limit budget used: X/5000 requests
- Pagination limits hit on: [repos with >300 commits]
- Private repos with restricted scope: [list]
- Any repo skipped + reason: [list]
```

## Quality bar

- **Every claim has a number** — "many bots" is not acceptable; "86% of commits bot-authored" is.
- **Recommendations are concrete** — "keep working on this" is not a recommendation; "absorb into cor-sys via PR following CampaignCraft pattern (~1hr work)" is.
- **Be honest about edges** — if a repo defies the classifier (e.g., 0/4 but actively-shipped), flag it as a refinement case.
- **No fabrication** — if a repo's package.json is missing, say so; don't infer deps.

## Delivery

Single `mcp__github__push_files` call to branch `claude/analyze-workflow-optimization-3NhlH`. Retry up to 4 times with exponential backoff (2s, 4s, 8s, 16s) if conflict.

Report back in chat with <500 words:
- Commit SHA
- Tier distribution (counts)
- Top 3 surprises (repos that surfaced unexpected signals)
- Whether H1 (Tier classifier) appears to hold at n=26 (preliminary observation, full validation in Prompt 03)

End of Prompt 02.
