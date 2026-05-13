# crp-lint

> Grade your repo's Claude-Code-readiness. One command. Free. Open source.

A Context Repository Protocol (CRP) is a repo structured so Claude Code can bootstrap a
working session in under 3,000 tokens — without you re-explaining the project every time.

## Install + run

```bash
npx crp-lint
```

That's it. Runs in your current directory. Exits 0 if compliant, 1 if not.

## What it checks

**4 required rules**:

- `R1` — `CLAUDE.md` exists with a `Gate 0` section + read order
- `R2` — `research/repo-index.md` exists with ≥3 entries (level-2 headings)
- `R3` — `pipelines/` directory exists with at least `dual-repo-session.md`
- `R4` — `.claude/skills/` directory exists with at least one Markdown file

**3 optional warnings**:

- `W1` — `MEMORY.md` for state persistence
- `W2` — `LOG.md` appears human-authored (not bot-generated)
- `W3` — Self-fixture exists at `saas/app/scripts/genesis/domains/<repo-name>.ts`

## Example output

```
CRP Linter v0.1
Repository: /home/you/my-repo
============================================================

Required Rules:
[FAIL] ✗ R1: Gate 0 entry point
      CLAUDE.md does not contain a section with heading including "Gate 0"
[FAIL] ✗ R2: Machine-queryable index
      research/repo-index.md not found
[PASS] ✓ R3: Session protocols
      pipelines/ has 2 Markdown file(s) including dual-repo-session.md
[FAIL] ✗ R4: Reusable behaviors
      .claude/skills/ directory not found

RESULT: NON-COMPLIANT — 3 rule(s) failed: R1, R2, R4
```

## Why this matters

Your Claude Code sessions waste 10-15 minutes per session on re-explaining the project.
For a 3x/week user, that's 8-12 hours a month gone to context re-loading. CRP-compliant
repos eliminate that.

We scanned 8 repos in a real portfolio. Even the most disciplined Tier A repo with 199
PRs and full docs scored 0/4 on this linter. CRP is not what disciplined repos converge
to by accident — it's a separate architectural decision.

## Full spec

The CRP spec v0.1 is published at:
https://github.com/ereztash/lessons/blob/main/saas/spec/crp-spec.md

The conversion playbook ($29 launch): coming soon at https://lessons.gumroad.com/crp

## License

MIT. Use freely. PRs welcome at https://github.com/ereztash/lessons
