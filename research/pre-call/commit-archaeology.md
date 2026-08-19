# pre-call — Commit Archaeology

Verified 2026-08-19 against a full-history clone of `https://github.com/ereztash/pre-call`.

| Fact | Value |
|---|---|
| Commits | 224 total · 185 non-merge |
| Authors | `Claude` 146 · `ereztash` 39 |
| Lifespan | 2026-08-06 → 2026-08-19 (13 days) — **active today** |
| PRs | 44 opened · 39 merge commits |
| Branches | 25 remote — `claude/*` (majority) + `agent/*` |
| Tests | 32 `*.test.js` co-located with `assets/pc-*.js` modules |
| Module docs | `docs/modules/` — 17 files: a README plus one per module |
| Deployment | `vercel.json` + live at `https://pre-call-swart.vercel.app/` |
| Licence | proprietary (`LICENSE`), repo public for reading only |
| F1–F5 | F1 — · F2 ✓ · F3 ✓(44) · F4 ✓ · **F5 ✓** · R ✓ → **Tier A** |

Daily commit volume: 08-06 (10) · 08-07 (4) · 08-09 (26) · 08-10 (26) · 08-11 (11) · 08-12 (10) ·
08-13 (18) · 08-14 (4) · 08-17 (46) · 08-18 (29) · 08-19 (1).

Authorship detectors (`scripts/detect-agent-authorship.sh`): 185 commits · claude=146 ·
trailer=113 · session=111 · empty_body=31 · bursts=3 · in_burst=20. **No hidden-agent flag** —
this repo's AI work is attributed, unlike MATI and proofminer.

Reproduce:

```bash
git log --all --no-merges --format='%h|%ad|%an|%s' --date=format:'%m-%d %H:%M'
git branch -r                                    # branch names are claims, not features
python3 -c "import re,html;t=open('docs/stopping-rule.html').read();…"   # the P x C table
```
