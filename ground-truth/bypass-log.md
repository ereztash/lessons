# Bypass Log

> Every time the contract gate was gone around, and why. Ported from pre-call
> `docs/market-ready.md`: a gate with no record of being bypassed is
> indistinguishable from a gate nobody has needed to bypass.
> Append-only. Written by `scripts/check-lessons-contract.py --bypass`.

## 2026-08-19 10:51 UTC — at `9903bcc`

**Reason**: teeth test — confirming the gate records its own evasion

**Rules bypassed** (1 violation(s)):

- `R3` insights/user-to-user/resumer-day-prep.md — `monetization-score: 2/5` does not match the last score-history entry ('2026-05-12: 5/5 — first audit') — a score change appends, it does not overwrite

