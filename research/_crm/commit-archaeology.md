# _crm — Commit Archaeology

Verified 2026-08-19 against a full-history clone of `https://github.com/ereztash/_crm` (private).

| Fact | Value |
|---|---|
| Commits | 257 total · 231 non-merge |
| Authors | **`Erez (COR-SYS)` 222** · `Claude` 9 — a third human git identity, carrying the project name |
| Lifespan | 2026-06-08 → 2026-07-01 · **230 of 231 commits in June 2026** · dormant 49 days |
| PRs | 26 merged; branches deleted after merge (only 6 remain) |
| Branch prefixes | `feat/`, `fix/`, `docs/` — **no `claude/` or `agent/` branches at all** |
| Docs | 70 |
| Tests | **127 test modules**, stdlib-only, `python -m unittest discover -s tests` |
| Files | 579 (the mirror `CRM_Google_ai` froze at 397 on 2026-06-14) |
| F1–F5 | F1 ✓ · F2 ✓ · F3 ✓(26) · F4 ✓ · F5 — · R — (49d) → **Tier B** |

Authorship detectors: 231 commits · claude=9 · **trailer=211** · session=8 · empty_body=15 ·
**bursts=0**. No hidden-agent flag and no cadence signal — the trailer is the only evidence that
211 commits were AI-paired. Trailer breakdown: `Claude Opus 4.8 (1M context)` ×153,
`Claude Opus 4.8` ×58.

Commit subjects are phase-structured from the first commit: `Phase 0: safety net (git baseline +
golden tests + fixtures)` · `Phase 1.1: event spine + telemetry (observer-first, additive)` ·
`Phase 1.2+1.3: value layer (capture-debt, repricing, renewal-ready)`.

Reproduce:

```bash
bash scripts/detect-agent-authorship.sh /workspace/_crm
git log --all --format='%b' | grep -i co-authored-by | sed 's/<.*//' | sort | uniq -c
git log --all --merges --format='%s' --date=short          # 26 PRs, semantic branch names
sed -n '1,42p' docs/G1_KILLTEST_2026-06-14.md              # the self-kill
```
