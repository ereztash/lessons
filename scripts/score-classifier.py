#!/usr/bin/env python3
"""score-classifier.py - measure the four-feature Tier classifier against ground truth.

Derives each ground-truth label from raw signals (the rubric IS this function), then
scores the classifier's tier against it. Nothing here reads F1-F4, so the label cannot
be contaminated by the thing it tests.

Usage: python3 scripts/score-classifier.py [ground-truth/labels-2026-08-19.json]
"""
import json, sys, signal
from collections import Counter

# so `... | head` does not raise BrokenPipeError
try: signal.signal(signal.SIGPIPE, signal.SIG_DFL)
except (AttributeError, ValueError): pass

CURRENT_DAYS = 30          # "still being worked on"
RUBRIC_VERSION = "1.1"

def derive(r):
    """The rubric, as code. See ground-truth/rubric.md for why each clause exists."""
    if not r["executable"]:
        return "D"                                          # inert: nothing to run
    current = r["days_since_commit"] <= CURRENT_DAYS
    managed = (r["review_acts"] > 0) or (r["work_sessions"] >= 2) or (r["pr_merges"] >= 5)
    if r["serving"] and current:
        return "A"                                          # operating: serves someone, now
    if managed:
        return "B"                                          # managed: tended, but not serving
    return "C"                                              # single-burst: made once, left

RANK = {"A": 4, "B": 3, "C": 2, "D": 1}

def spearman(xs, ys):
    def rank(v):
        order = sorted(range(len(v)), key=lambda i: v[i])
        rk = [0.0]*len(v)
        i = 0
        while i < len(v):                                   # average ties
            j = i
            while j+1 < len(v) and v[order[j+1]] == v[order[i]]: j += 1
            avg = (i+j)/2 + 1
            for k in range(i, j+1): rk[order[k]] = avg
            i = j+1
        return rk
    rx, ry = rank(xs), rank(ys)
    n = len(xs)
    mx, my = sum(rx)/n, sum(ry)/n
    num = sum((a-mx)*(b-my) for a, b in zip(rx, ry))
    den = (sum((a-mx)**2 for a in rx) * sum((b-my)**2 for b in ry)) ** 0.5
    return num/den if den else float("nan")

def main(path):
    d = json.load(open(path, encoding="utf-8"))
    assert d["rubric_version"] == RUBRIC_VERSION, \
        f"labels say rubric {d['rubric_version']}, this script implements {RUBRIC_VERSION}"
    rows = []
    for r in d["repos"]:
        gt = derive(r)
        pred = r["classifier_tier"]
        rows.append((r["repo"], pred, gt, RANK[pred]-RANK[gt]))

    n = len(rows)
    if n == 0:
        # Degenerate case. Every rate below divides by n, and every sentence after them
        # reads as a finding. LOG anti-pattern #17: a verdict function must refuse an empty
        # corpus rather than fall through to one.
        print("NOT-MEASURED: the label file contains zero repos. No rate is defined.")
        sys.exit(2)
    exact = sum(1 for _,_,_,e in rows if e == 0)
    adjacent = sum(1 for _,_,_,e in rows if abs(e) <= 1)
    over  = sum(1 for _,_,_,e in rows if e > 0)
    under = sum(1 for _,_,_,e in rows if e < 0)

    print(f"n = {n}   rubric v{d['rubric_version']}   labelled {d['labelled']}\n")
    print(f"{'repo':<26}{'classifier':<12}{'ground truth':<14}error")
    print("-"*64)
    for repo, pred, gt, err in sorted(rows, key=lambda r: -r[3]):
        mark = "  ok" if err == 0 else f"  {err:+d}"
        print(f"{repo:<26}{pred:<12}{gt:<14}{mark}")
    print("-"*64)
    print(f"\nexact agreement    {exact}/{n}  ({100*exact/n:.0f}%)")
    print(f"within one tier    {adjacent}/{n}  ({100*adjacent/n:.0f}%)")
    print(f"over-rated         {over}/{n}")
    print(f"under-rated        {under}/{n}")
    if over + under:
        print(f"error direction    {100*over/(over+under):.0f}% of errors are over-estimates")

    print("\nconfusion (rows = classifier, cols = ground truth)")
    tiers = ["A","B","C","D"]
    cm = Counter((p,g) for _,p,g,_ in rows)
    print("        " + "".join(f"{t:>5}" for t in tiers))
    for p in tiers:
        print(f"   {p:<5}" + "".join(f"{cm.get((p,g),0):>5}" for g in tiers))

    rho = spearman([r["classifier_score"] for r in d["repos"]],
                   [RANK[derive(r)] for r in d["repos"]])
    undefined = []
    if rho != rho:                                   # NaN: one of the two rankings has no variance
        # Zero variance is not a low correlation. The interpretation sentence below asserts an
        # ordering property, and there is no ordering to assert. Print the absence instead.
        print("\nSpearman rho = NOT-MEASURED: one of the two rankings has zero variance, "
              "so the statistic is undefined. No ordering claim follows.")
        undefined.append("spearman_rho")
    else:
        print(f"\nSpearman rho (F-count vs ground-truth rank) = {rho:.2f}")
        print("  high rho with low exact agreement = the classifier ORDERS well but is MIS-CALIBRATED.")

    print("\nper-feature error analysis")
    mislabelled = [r for r in d["repos"] if RANK[r["classifier_tier"]] != RANK[derive(r)]]
    if not mislabelled:
        # The two sentences below explain why repos were mis-rated. With none mis-rated they
        # explain nothing and read as a finding about F1-F4.
        print("  no repo was mis-rated in this corpus. Nothing to attribute.")
        undefined.append("error_attribution")
    else:
        no_consumer = sum(1 for r in mislabelled if not r["serving"])
        stale = sum(1 for r in mislabelled if r["days_since_commit"] > CURRENT_DAYS)
        print(f"  of {len(mislabelled)} mis-rated repos: {no_consumer} have no external consumer, "
              f"{stale} have not been touched in {CURRENT_DAYS}+ days.")
        print("  F1-F4 measures neither. That is the whole error.")

    if undefined:
        # ASSURANCE_THESIS 1.2 point 2: NOT-MEASURED is a distinct state from PASS. Exiting 0
        # here would collapse them, and a CI step calling this script would read the run as
        # fully measured. Exit 3 keeps the distinction visible to a caller.
        print(f"\nNOT-MEASURED: {', '.join(undefined)}. The run completed; these are undefined, "
              "not zero and not passing.")
        sys.exit(3)

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "ground-truth/labels-2026-08-19.json")
