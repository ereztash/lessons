#!/usr/bin/env python3
"""resolve-polarising-prediction.py - resolve the round-5 pre-registered prediction.

The claim, frozen in ground-truth/interrater-round5-items.json before any rater ran:

    The incumbent's polarising bias reproduces a THIRD time, on a third disjoint item set:
        mean(rater - incumbent) > 0 on the incumbent-0/1 items
        mean(rater - incumbent) < 0 on the incumbent-2/3 items

Prior measurements: round 2 +0.83 / -0.58, round 3 +1.17 / -0.47. Direction only is predicted;
magnitude is free. Either sign returning the other way REFUTES it and makes the two prior
measurements selection artefacts rather than a property of the incumbent.

Guarded explicitly, because a verdict script that falls through a chain of `if`s on degenerate
data prints a confident wrong answer (anti-pattern 17): an empty stratum yields no verdict, not
a refutation.

Usage: resolve-polarising-prediction.py <ratings.json>
"""
import json, sys, statistics as st

MIN_PER_STRATUM = 3


def main():
    d = json.load(open(sys.argv[1], encoding="utf-8"))
    items, raters = d["items"], d["raters"]
    low, high = [], []
    for it in items:
        inc = it["incumbent"]
        for r in raters:
            v = it["scores"].get(r)
            if v is None:
                continue
            (low if inc <= 1 else high).append(v - inc)

    print(f"raters: {', '.join(raters)}   items: {len(items)}")
    print(f"low stratum  (incumbent 0-1): {len(low)} rater-item pairs")
    print(f"high stratum (incumbent 2-3): {len(high)} rater-item pairs\n")

    if len(low) < MIN_PER_STRATUM or len(high) < MIN_PER_STRATUM:
        print(f"VERDICT: INSUFFICIENT DATA - a stratum has fewer than {MIN_PER_STRATUM} pairs. "
              "No verdict is issued; this is not a refutation.")
        return

    ml, mh = st.mean(low), st.mean(high)
    print(f"mean(rater - incumbent), incumbent 0-1 : {ml:+.3f}   (round2 +0.83, round3 +1.17)")
    print(f"mean(rater - incumbent), incumbent 2-3 : {mh:+.3f}   (round2 -0.58, round3 -0.47)")
    print(f"polarisation gap                       : {ml - mh:+.3f}\n")

    if ml > 0 and mh < 0:
        print("VERDICT: CONFIRMED - the polarising bias reproduces on a third disjoint item set.")
        print("  The incumbent under-scores what it has not looked at and over-scores what it has")
        print("  just written up. Three independent measurements, same two signs.")
    elif ml <= 0 and mh >= 0:
        print("VERDICT: REFUTED IN BOTH DIRECTIONS - neither sign held. The two prior measurements")
        print("  were selection artefacts of their item sets, not a property of the incumbent.")
    else:
        which = "low" if ml <= 0 else "high"
        print(f"VERDICT: REFUTED - the {which} stratum came back with the wrong sign.")
        print("  A prediction that fails on one side is not 'partly confirmed'. The bias is not")
        print("  the stable property two rounds made it look like; report it as one-sided.")


if __name__ == "__main__":
    main()
