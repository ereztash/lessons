#!/usr/bin/env python3
"""score-interrater.py — cross-family agreement on pattern strengths.

Written 2026-08-19 BEFORE any rater returned, as ground-truth/rater-protocol.md §4 requires: the
statistic is fixed before the data arrives, so it cannot be chosen to flatter the result.

Reports, over a rater x item matrix of 0-3 ordinal scores:
  - exact agreement and mean absolute difference against the incumbent
  - ICC(2,1): two-way random effects, absolute agreement, single measure
    (Shrout & Fleiss 1979 - the same estimator _crm's G1 kill test used)

The read, declared in advance: ICC >= 0.75 good, <= 0.5 poor. A cross-family ICC far below the
within-family figure means the strengths are a property of the rater, not of the repos.

Usage: python3 scripts/score-interrater.py [ground-truth/interrater-2026-08-19.json]
       python3 scripts/score-interrater.py --selftest
"""
import json, sys, statistics as st

def icc21(matrix):
    """matrix: list of rows (items), each a list of k rater scores. Returns ICC(2,1)."""
    n = len(matrix)
    if n < 2: return float("nan")
    k = len(matrix[0])
    if k < 2 or any(len(r) != k for r in matrix): return float("nan")
    grand = sum(sum(r) for r in matrix) / (n * k)
    row_means = [sum(r) / k for r in matrix]
    col_means = [sum(matrix[i][j] for i in range(n)) / n for j in range(k)]
    ss_rows = k * sum((rm - grand) ** 2 for rm in row_means)
    ss_cols = n * sum((cm - grand) ** 2 for cm in col_means)
    ss_tot = sum((matrix[i][j] - grand) ** 2 for i in range(n) for j in range(k))
    ss_err = ss_tot - ss_rows - ss_cols
    msr = ss_rows / (n - 1)
    msc = ss_cols / (k - 1)
    mse = ss_err / ((n - 1) * (k - 1))
    denom = msr + (k - 1) * mse + k * (msc - mse) / n
    return (msr - mse) / denom if denom else float("nan")

def selftest():
    """Fire the estimator on known inputs before trusting it (LOG anti-pattern 22)."""
    agree     = [[3,3],[2,2],[0,0],[1,1],[3,3],[2,2]]
    disagree  = [[3,0],[0,3],[3,0],[0,3],[3,0],[0,3]]
    constant  = [[2,2],[2,2],[2,2],[2,2]]
    noisy     = [[3,2],[2,2],[0,1],[1,1],[3,3],[2,1]]
    print(f"  identical raters   ICC = {icc21(agree):+.3f}   (expect ~ +1)")
    print(f"  inverted raters    ICC = {icc21(disagree):+.3f}   (expect strongly negative)")
    print(f"  no variance        ICC = {icc21(constant):+.3f}   (expect nan - undefined, not 1)")
    print(f"  mild disagreement  ICC = {icc21(noisy):+.3f}   (expect high but < 1)")
    ok = icc21(agree) > 0.95 and icc21(disagree) < 0 and icc21(constant) != icc21(constant) \
         and 0.5 < icc21(noisy) < 1.0
    print(f"  selftest: {'PASS' if ok else 'FAIL'}")
    return 0 if ok else 1

def main(path):
    d = json.load(open(path, encoding="utf-8"))
    items = d["items"]
    raters = d["raters"]                      # ordered list of rater names, e.g. ["sonnet","haiku"]
    print(f"n items = {len(items)}   raters = {', '.join(raters)}   "
          f"incumbent = {d.get('incumbent_rater','opus (this session)')}\n")

    print(f"{'#':<3}{'pattern @ repo':<48}{'inc':>4}" + "".join(f"{r:>9}" for r in raters))
    print("-" * (55 + 9 * len(raters)))
    matrix, incs = [], []
    for it in items:
        row = [it["scores"][r] for r in raters]
        matrix.append(row); incs.append(it["incumbent"])
        flag = "  <-" if any(abs(s - it["incumbent"]) >= 2 for s in row) else ""
        print(f"{it['n']:<3}{(it['pattern']+' @ '+it['repo'])[:47]:<48}{it['incumbent']:>4}"
              + "".join(f"{s:>9}" for s in row) + flag)

    print("\n--- agreement with the incumbent ---")
    for j, r in enumerate(raters):
        diffs = [abs(matrix[i][j] - incs[i]) for i in range(len(items))]
        exact = sum(1 for dd in diffs if dd == 0)
        print(f"  {r:<10} exact {exact}/{len(items)} ({100*exact/len(items):.0f}%)   "
              f"mean |diff| {st.mean(diffs):.2f}   max {max(diffs)}")

    print("\n--- ICC(2,1), two-way random, absolute agreement, single measure ---")
    cross = icc21(matrix)
    allm  = icc21([[incs[i]] + matrix[i] for i in range(len(items))])
    print(f"  across the {len(raters)} blind families            {cross:+.3f}")
    print(f"  incumbent + blind families together   {allm:+.3f}")
    verdict = ("GOOD - the strengths survive a change of rater" if allm >= 0.75 else
               "MODERATE - rater contributes real variance"      if allm >= 0.50 else
               "POOR - the strengths are substantially a property of the rater")
    print(f"\n  read (declared in advance): {verdict}")
    print("  confounds that stand regardless: within-vendor only, family conflated with")
    print("  capability, one pass per family, n=%d." % len(items))

if __name__ == "__main__":
    if "--selftest" in sys.argv: sys.exit(selftest())
    main(sys.argv[1] if len(sys.argv) > 1 else "ground-truth/interrater-2026-08-19.json")
