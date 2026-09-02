#!/usr/bin/env python3
"""score-round4.py - score the round-4 blind rating of the sharpened identity rule.

Deliberately NOT ICC. The population has 3 non-zero repos in 38, so between-item variance is
near-zero and ICC collapses on a range-restricted set even at high agreement (anti-pattern 24,
measured in Round 5: sd 0.34 -> ICC 0.143 at 80% exact agreement). Pre-registering a statistic
this sample cannot answer would repeat that defect.

What is computed instead, all declared in ground-truth/interrater-round4-items.json before any
rater ran:
  - exact-match rate against the reference, per rater and pooled
  - the all-zeros null baseline (5 of 8 items are genuinely 0, so a rater who answers all zeros
    scores 0.625 while having applied no rule at all)
  - the non-zero subset, where the null baseline scores 0 and the rule is actually tested
  - per-item unanimity

Usage: score-round4.py <ratings.json>
"""
import json, sys

# the reference is scripts/detect-project-identity.sh in loose mode. Recomputed, not typed:
#   ./detect-project-identity.sh ground-truth/repo-paths.tsv
REFERENCE = {
    "COR-SYS": 3, "_crm": 3, "ex2": 1, "anti-silo": 0,
    "dod-validator": 0, "nuxtjs-boilerplate": 0, "MATI": 0, "proofminer": 0,
}
NONZERO = [r for r, v in REFERENCE.items() if v != 0]
PASS_POOLED = 0.85
PASS_NONZERO_PER_RATER = 2


def main():
    data = json.load(open(sys.argv[1]))
    raters = data["ratings"]
    items = list(REFERENCE)

    null_hits = sum(1 for r in items if REFERENCE[r] == 0)
    print(f"reference: {REFERENCE}")
    print(f"null baseline (all zeros): {null_hits}/{len(items)} = {null_hits/len(items):.3f}"
          f"  -- and 0/{len(NONZERO)} on the non-zero items\n")

    hdr = f"{'item':<20}{'ref':>4}" + "".join(f"{n:>9}" for n in raters) + "   unanimous"
    print(hdr); print("-" * len(hdr))
    unanimous = 0
    for r in items:
        vals = [raters[n].get(r) for n in raters]
        u = len(set(vals)) == 1 and vals[0] == REFERENCE[r]
        unanimous += u
        marks = "".join(f"{('%s' % v) + ('' if v == REFERENCE[r] else ' X'):>9}" for v in vals)
        print(f"{r:<20}{REFERENCE[r]:>4}{marks}{'   yes' if u else '   no':>12}")

    print()
    total_hits = 0
    for n in raters:
        hits = sum(1 for r in items if raters[n].get(r) == REFERENCE[r])
        nz = sum(1 for r in NONZERO if raters[n].get(r) == REFERENCE[r])
        total_hits += hits
        flag = "" if nz >= PASS_NONZERO_PER_RATER else "   <-- below the per-rater non-zero threshold"
        print(f"{n:<10} exact {hits}/{len(items)} = {hits/len(items):.3f}"
              f"   non-zero items {nz}/{len(NONZERO)}{flag}")

    pooled = total_hits / (len(items) * len(raters))
    print(f"\npooled exact-match: {total_hits}/{len(items)*len(raters)} = {pooled:.3f}"
          f"   (threshold {PASS_POOLED}, null baseline {null_hits/len(items):.3f})")
    print(f"unanimous-and-correct items: {unanimous}/{len(items)}")

    per_rater_ok = all(
        sum(1 for r in NONZERO if raters[n].get(r) == REFERENCE[r]) >= PASS_NONZERO_PER_RATER
        for n in raters)
    verdict = "EXECUTABLE BY A READER" if (pooled >= PASS_POOLED and per_rater_ok) else "NOT EXECUTABLE AS WRITTEN"
    print(f"\nVERDICT: {verdict}")
    if pooled >= PASS_POOLED and not per_rater_ok:
        print("  (pooled threshold met but at least one rater failed the non-zero test - a rater can")
        print("   reach a high pooled score by defaulting to 0, which is why both gates exist)")

    poll = data.get("poll", {})
    if poll:
        print("\nPOLL (declared in advance as opinion, not measurement):")
        for n, v in poll.items():
            print(f"  {n:<10} {v}")


if __name__ == "__main__":
    main()
