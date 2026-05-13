<!-- DRAFT — DO NOT POST. CRP spec failed internal migration test 2026-05-13. -->

# r/ClaudeAI launch post — CRP

---

**Title**: I scanned my own GitHub portfolio for "Claude-Code-ready" — only 1 of 8 repos passed. Made a free linter so you can check yours.

**Body**:

If you pair with Claude Code regularly, you probably notice that the first 10 minutes
of every new session are spent re-explaining the project. What conventions to use,
what NOT to do, what the entities are, where the relevant files live.

For me that adds up to 8-12 hours a month gone to context re-loading. I scanned my own
8 most mature repos to test a theory: the repo itself should be the context provider,
not me.

Results:

- 7 of 8 repos scored 0-1 out of 4 on a simple CRP (Context Repository Protocol) spec
- The 8th repo (4/4) was one I'd specifically designed for AI pair programming

Even my most disciplined repo (199 PRs, full docs/, multi-AI cross-review) scored 0/4.
Discipline for humans isn't the same as readiness for a cold-start AI session.

The 4 required rules:

1. `CLAUDE.md` with an explicit "Gate 0" section listing what to read at session start
2. `research/repo-index.md` with one entry per module (`## module-name`)
3. `pipelines/dual-repo-session.md` for working with a reference repo open alongside
4. `.claude/skills/` with reusable named workflows

I built a free linter: `npx crp-lint`

It works. I also tested it against an independent linter that another Claude instance
built from just the spec text — same scores on the same repos, which makes me think
the spec is at least communicable.

What I want to know: do you have repos in your own portfolio where this would help?
Try the linter and post the score. If even 30% of repos score better than 1/4, my
spec is too broad and I need to tighten it. If most score 0-1, then this is the right
discrimination point.

Full spec + playbook + research: github.com/ereztash/lessons

Disclosure: the conversion playbook is paid ($29 launch). The linter is MIT licensed,
free forever.
