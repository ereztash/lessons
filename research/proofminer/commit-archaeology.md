# proofminer — Commit Archaeology

Verified 2026-08-19 against a full-history clone of `https://github.com/ereztash/proofminer`.

| Fact | Value |
|---|---|
| Commits | 241 total · 229 non-merge |
| Authors | `ereztash` 213 · `Claude` 16 |
| Lifespan | **two days** — 116 commits on 2026-08-15, 113 on 2026-08-16 |
| PRs | 16 opened · 12 merge commits |
| Branches | 16 remote across **three agent prefixes**: `agent/*` (11), `claude/*`, `codex/*`, plus `archive/pre-rewrite-agent-work` |
| Tests | vitest — `tests/{core,engine,ui,e2e}` |
| Deployment | `vercel.json` · no live URL in README |
| F1–F5 | F1 — · F2 ✓ · F3 ✓(16) · F4 ✓ · **F5 —** · R ✓(3d) → **Tier B** |

Authorship detectors: 229 commits · claude=16 · trailer=16 · session=16 · **empty_body=212** ·
**bursts=23 · in_burst=193** → **HIDDEN AGENT**. The largest instance in the portfolio; MATI is
55 of 86, this is 193 of 229.

Three `agent/expert-consultant-mvp-*` branches differ only by a unix-millisecond suffix
(`…056527`, `…204627`, `…509572`) and were created within eight minutes — programmatic branch
naming, which is itself an authorship signal.

Reproduce:

```bash
bash scripts/detect-agent-authorship.sh /workspace/ereztash/proofminer
git branch -r | sed 's|.*origin/||' | cut -d/ -f1 | sort | uniq -c   # surfaces by prefix
git log --all --author=Claude --no-merges --format='%s'              # the adversarial 16
```
