# Skill — workflow-archaeologist

> Characterize a repo's authoring evolution from git history.

## When to invoke

- About to fill `/research/<repo>/commit-archaeology.md`
- User asks "who wrote what" or "author rotation" or "how did this repo evolve"
- Inspecting commit-prefix conventions over time

## Signals

- "trace authors"
- "commit archaeology"
- "author class"
- "author rotation"
- "git history evolution"
- "who wrote what"

## Cascade

- Output (a filled `commit-archaeology.md` row-set + raw observations) → triggers `insight-distiller` for any pattern with ≥2 observations.

## Procedure

1. Fetch all commits via paginated `mcp__github__list_commits` (perPage=100). Cache to `commit-archaeology.md`.
2. Bucket commits by author class:
   - **Human** (named developer accounts like ereztash)
   - **Claude** (Claude attribution in commit body or author email)
   - **Bot** (gpt-engineer-app[bot], Cursor Agent, Lovable, etc.)
3. For each bucket, compute:
   - Commit count
   - Date range
   - Average commit-message length
   - Conventional-prefix usage rate (% with `feat:`/`fix:`/etc.)
4. Plot transition points (when does author class A hand off to B?).
5. For each transition: capture observation via `/lesson-capture` with the transition commit SHA as evidence pointer.

## Output schema (row in commit-archaeology.md)

```
| Date | Commit SHA | Author class | Message shape | File-set delta |
|------|-----------|--------------|---------------|----------------|
```

## Anti-patterns

- Conflating Cursor Agent and Claude — they are distinct author classes
- Treating a Lovable initial commit as "human work" — it is template-generated
- Counting merge commits as new work — exclude or mark separately
