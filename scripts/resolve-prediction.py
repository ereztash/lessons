#!/usr/bin/env python3
"""resolve-prediction.py - resolve ground-truth/prediction-2026-08-19.md.

Written 2026-08-19 against unknown outcome data, so the analysis cannot be chosen after the
fact. Reads the frozen scores TSV, counts substantive commits in the prediction window across
all refs, and prints both Spearman correlations plus the four secondary verdicts.

Usage: python3 scripts/resolve-prediction.py [repos.tsv] [scores.tsv ...]
  repos.tsv  = name<TAB>path per line (paths must still resolve; re-clone if not)
  scores.tsv = one or more frozen score files; cohort 2 was registered as a separate file so the
               original stayed frozen, so both are passed and concatenated here.
"""
import subprocess, sys, csv, datetime

WINDOW_START = "2026-08-19"
WINDOW_END   = "2026-11-17"
RANK = {"A": 4, "B": 3, "C": 2, "D": 1}
NOISE_FLOOR = 0.15
MIN_MOVERS  = 3   # below this the outcome has too little variance for a correlation to mean anything

def substantive_commits(path):
    """Same exclusions as collect-outcome-evidence.sh: merges, dependabot, syncs, Lovable seeds."""
    try:
        out = subprocess.run(
            ["git", "-C", path, "log", "--all", "--no-merges",
             f"--since={WINDOW_START}", f"--until={WINDOW_END}", "--format=%an\t%s"],
            capture_output=True, text=True, timeout=60).stdout
    except Exception:
        return None                                     # unreachable repo -> excluded, not zeroed
    n = 0
    for line in out.splitlines():
        an, _, subj = line.partition("\t")
        low = (an + " " + subj).lower()
        if "dependabot" in low: continue
        if subj.lower().startswith(("sync:", "mirror:", "template: ")): continue
        n += 1
    return n

def spearman(xs, ys):
    def rank(v):
        order = sorted(range(len(v)), key=lambda i: v[i]); rk = [0.0]*len(v); i = 0
        while i < len(v):
            j = i
            while j+1 < len(v) and v[order[j+1]] == v[order[i]]: j += 1
            avg = (i+j)/2 + 1
            for k in range(i, j+1): rk[order[k]] = avg
            i = j+1
        return rk
    rx, ry = rank(xs), rank(ys); n = len(xs)
    mx, my = sum(rx)/n, sum(ry)/n
    num = sum((a-mx)*(b-my) for a, b in zip(rx, ry))
    den = (sum((a-mx)**2 for a in rx) * sum((b-my)**2 for b in ry)) ** 0.5
    return num/den if den else float("nan")

def main(repos_tsv, *scores_tsvs):
    paths = {}
    for line in open(repos_tsv, encoding="utf-8"):
        if "\t" in line:
            n, p = line.rstrip("\n").split("\t", 1); paths[n] = p
    rows, seen = [], set()
    for f in scores_tsvs:
        for r in csv.DictReader(open(f, encoding="utf-8"), delimiter="\t"):
            if r["repo"] in seen:                       # a repo may not be scored twice
                raise SystemExit(f"duplicate repo across score files: {r['repo']}")
            seen.add(r["repo"]); rows.append(r)

    data, missing = [], []
    for r in rows:
        p = paths.get(r["repo"])
        c = substantive_commits(p) if p else None
        if c is None: missing.append(r["repo"]); continue
        data.append((r["repo"], RANK[r["tier_new"]], RANK[r["tier_old"]], c))

    if missing:
        print(f"EXCLUDED (unreachable, not counted as zero): {', '.join(missing)}\n")
    commits = [d[3] for d in data]
    rho_new = spearman([d[1] for d in data], commits)
    rho_old = spearman([d[2] for d in data], commits)

    print(f"window {WINDOW_START} .. {WINDOW_END}   n={len(data)}   "
          f"repos with any commit: {sum(1 for c in commits if c)}\n")
    print(f"rho_new (F1-F5) = {rho_new:+.3f}")
    print(f"rho_old (F1-F4) = {rho_old:+.3f}")
    d = rho_new - rho_old
    print(f"difference      = {d:+.3f}")

    # A sparse outcome gives zero variance and rho = NaN. NaN fails every comparison, so without
    # this guard the script falls through to "REFUTED" and reports a verdict it has not earned.
    movers = sum(1 for c in commits if c)
    if rho_new != rho_new or rho_old != rho_old or movers < MIN_MOVERS:
        print(f"\nVERDICT: INSUFFICIENT DATA - only {movers} repo(s) advanced "
              f"(need >= {MIN_MOVERS} for the outcome to have usable variance). "
              "The prediction does not resolve; extend the window and re-run.")
        return
    if abs(d) < NOISE_FLOOR:
        print(f"\nVERDICT: INCONCLUSIVE - |difference| < {NOISE_FLOOR}, declared noise in advance.")
    elif d > 0:
        print("\nVERDICT: NOT REFUTED - F5 ordered the outcome better. This is not proof it works.")
    else:
        print("\nVERDICT: REFUTED - F5 did not help. Drop it and re-open the error analysis.")

    print("\nsecondary:")
    byname = {d0: (n, o, c) for d0, n, o, c in data}
    A = [d for d in data if d[1] == 4]; C = [d for d in data if d[1] == 2]
    print(f"  S1  new-A advancing: {sum(1 for d in A if d[3])}/{len(A)}   "
          f"{'ok' if any(d[3] for d in A) else 'FALSIFIED'}")
    nC = sum(1 for d in C if d[3])
    print(f"  S2  new-C advancing: {nC}/{len(C)}   {'ok' if nC <= 2 else 'FALSIFIED'}")
    g = byname.get("groundstate-protocol")
    print(f"  S3  groundstate-protocol commits: {g[2] if g else 'n/a'}   "
          f"{'ok' if g and g[2] else 'FALSIFIED'}")
    dem = [d for d in data if d[2] == 4 and d[1] == 3]
    nd = sum(1 for d in dem if d[3])
    print(f"  S4  demoted old-A advancing: {nd}/{len(dem)}   {'ok' if nd <= 3 else 'FALSIFIED'}")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "ground-truth/repo-paths.tsv",
         *(sys.argv[2:] or ["ground-truth/scores-2026-08-19.tsv",
                            "ground-truth/scores-2026-08-19-cohort2.tsv"]))
