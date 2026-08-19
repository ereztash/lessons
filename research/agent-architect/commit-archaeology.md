# agent-architect — Commit Archaeology

> Verified numbers live in `research/portfolio-scan/2026-08-19-rescan.md` (F1–F4, dormancy, PR counts)
> and `research/cross-repo/authorship-attribution.md` (per-repo detector output).
> Observations drawn from this archaeology: `extracted-insights.md` in this folder.

Reproduce the survey:

```bash
scripts/detect-agent-authorship.sh <path-to-repo>       # both authorship detectors
git log --all --reverse --format='%h|%ad|%an|%s' --date=format:'%m-%d %H:%M'
git log --all --merges --format='%ad|%s' --date=short   # PR-merge timeline
git remote show origin | grep 'HEAD branch'             # trunk check
```
