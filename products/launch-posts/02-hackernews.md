# Hacker News Show HN post — CRP

---

**Title**: Show HN: crp-lint – grade your repo's Claude-Code-readiness in one command

**URL**: https://github.com/ereztash/lessons

**Body**:

Hi HN. I've been pair-programming with Claude Code for about 6 months, and noticed
that I was burning 10-15 minutes at the start of every session re-explaining the
project. If you do this 3x a week, that's 8-12 hours a month gone to context
re-loading.

I scanned 8 of my own repos to test a theory: what if the repo itself were structured
to bootstrap an AI session, the way a 12-factor app is structured to deploy cleanly?

The result was sharper than I expected. 7 of 8 repos scored 0-1 out of 4 required
rules. The one that scored 4/4 was a research repo I'd specifically designed for this.
Even the repo with 199 PRs and full docs/ folder scored 0/4 — disciplined for humans,
not for an AI starting cold.

I formalized the structure as the Context Repository Protocol (CRP):

- `CLAUDE.md` with a "Gate 0" section (read order for session start)
- `research/repo-index.md` (machine-queryable, one heading per module)
- `pipelines/` with at least `dual-repo-session.md`
- `.claude/skills/` with reusable named behaviors

The free linter:

```
npx crp-lint
```

The conversion playbook ($29 launch): https://lessons.gumroad.com/crp

What I'm looking for:

1. Honest feedback on whether the spec is too narrow (only one repo passing is
   suspicious; the playbook predicts most well-organized repos will fail at
   `research/repo-index.md` and `pipelines/` specifically because those reflect a
   multi-repo / externalized-protocol mental model that single-repo discipline doesn't
   produce)

2. Whether you've solved this another way. Cursor `.cursorrules` and Aider repomap
   both address pieces of this. CRP is a superset that assumes Claude Code, but most
   of the structure ports.

The spec is v0.1. The independent linter built by a separate Claude instance from the
spec text alone gave the same scores as my own linter, which makes me think the spec
is at least communicable, but the selection bias of testing only repos I authored is
the obvious limit.

Github: https://github.com/ereztash/lessons (saas/spec/crp-spec.md for the spec)
