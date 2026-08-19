#!/usr/bin/env python3
"""apply-adoption-rule.py - turn a rating round into the exact matrix edits it licenses.

The adoption rule, frozen in ground-truth/interrater-round5-items.json before any rater ran and
unchanged since round 2 so results stay comparable:

    A cell changes ONLY where all three raters move in the same direction relative to the
    incumbent. The new score is their median. Any other pattern of disagreement leaves the
    incumbent standing and is recorded as a disagreement, not a change.

This exists so the edits are derived, not typed. Round 3 demoted a pattern and round 8 split one;
both times the arithmetic that licensed the edit lived only in prose, where it cannot be re-run.

Emits, per cell: the verdict, and for changed cells the promotion consequence - because a score
moving through 2 is the only thing that can add or remove a promotion.

Usage: apply-adoption-rule.py <ratings.json> [--primed-only|--no-primed]
"""
import json, sys, statistics as st


def verdict(inc, scores):
    """Returns (action, new_score, why)."""
    if any(s is None for s in scores):
        return ("SKIP", inc, "a rater did not score this item")
    ups = sum(1 for s in scores if s > inc)
    downs = sum(1 for s in scores if s < inc)
    same = sum(1 for s in scores if s == inc)
    if same == len(scores):
        return ("UNANIMOUS-CONFIRM", inc, "all raters equal the incumbent")
    if ups == len(scores):
        return ("ADOPT", int(st.median(scores)), f"all {ups} raters scored above the incumbent")
    if downs == len(scores):
        return ("ADOPT", int(st.median(scores)), f"all {downs} raters scored below the incumbent")
    return ("HOLD", inc,
            f"raters split ({ups} above / {same} equal / {downs} below) - the rule requires all "
            f"three to move the same way, so the incumbent stands and this is recorded as a "
            f"disagreement, not a change")


def main():
    d = json.load(open(sys.argv[1], encoding="utf-8"))
    flag = sys.argv[2] if len(sys.argv) > 2 else None
    raters = d["raters"]
    changed, held, confirmed = [], [], []

    for it in d["items"]:
        primed = "primed_by_injected_text" in it
        if flag == "--primed-only" and not primed: continue
        if flag == "--no-primed" and primed: continue
        scores = [it["scores"].get(r) for r in raters]
        act, new, why = verdict(it["incumbent"], scores)
        tag = "  [PRIMED - discounted]" if primed else ""
        line = (f"{it['id']:>2} {it['pattern']}@{it['repo']}  inc {it['incumbent']} "
                f"-> {'/'.join(str(s) for s in scores)}  {act}{tag}")
        if act == "ADOPT":
            changed.append((it, new, why)); print(f"{line}   NEW {new}\n     {why}")
        elif act == "HOLD":
            held.append((it, why)); print(f"{line}\n     {why}")
        else:
            confirmed.append(it); print(line)

    print(f"\nadopt {len(changed)}   hold {len(held)}   unanimous-confirm {len(confirmed)}")

    print("\nPROMOTION CONSEQUENCES (only a crossing of 2 can move a promotion):")
    crossings = [(it, new) for it, new, _ in changed
                 if (it["incumbent"] >= 2) != (new >= 2)]
    if not crossings:
        print("  none - no adopted change crosses the >=2 threshold, so every promotion stands")
    for it, new in crossings:
        d_ = "LOST" if it["incumbent"] >= 2 else "GAINED"
        print(f"  {it['pattern']}@{it['repo']}: {it['incumbent']} -> {new}  "
              f"({d_} a supporting cell) - re-check `strength >= 2 in >= 2 repos` for this pattern")

    if changed:
        print("\nMATRIX EDITS TO MAKE:")
        for it, new, _ in changed:
            print(f"  set `{it['pattern']}` @ {it['repo']}: {it['incumbent']} -> **{new}**")


if __name__ == "__main__":
    main()
