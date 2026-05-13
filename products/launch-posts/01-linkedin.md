# LinkedIn launch post — CRP

---

I scanned 8 of my own GitHub repos against a simple question:

**"Can Claude Code start working on this repo without me re-explaining it?"**

Even my most disciplined repo — 199 PRs, full docs/, accessibility audits, the works —
scored 0 out of 4. The one repo that scored 4/4 was a small research repo I'd
specifically designed for AI pair-programming.

That gap is real money. If you pair with Claude Code 3x a week, you're losing 8-12 hours
a month to re-explaining the project at the start of each session.

The fix is structural, not procedural. 4 files, in 4 specific locations:

- `CLAUDE.md` with a "Gate 0" section listing what to read at session start
- `research/repo-index.md` with grep-able entries per module
- `pipelines/dual-repo-session.md` describing how to work on the repo with a reference repo open
- `.claude/skills/` with at least one named workflow

I'm calling this the Context Repository Protocol (CRP).

Built a free linter so you can grade your own repo:

```
npx crp-lint
```

Built a $29 playbook for the conversion (4-8 hours typical, with before/after from 8 real repos).

This is the discipline part. The tool is just an enforcer.

GitHub: [link]
Playbook: [link]

#claudecode #aipairprogramming #devtools
