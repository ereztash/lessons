#!/usr/bin/env python3
"""check-lessons-contract.py — the five gates lessons was missing, as one executable check.

One file, not five. A spec in one place and a checker in another are two documents that must
agree, and pre-call measured that drift surface on itself three times out of three
(pre-call docs/market-ready.md). The rules ARE this file; there is no second document to drift
against.

Each rule is ported from a repo in the portfolio that already had it:

  R1 provenance-resolution   <- CRM_Google_ai/core/provenance.py
       An insight whose evidence resolves only to prose Claude wrote is PROVENANCE-RISK and may
       not back a playbook. provenance.py flags a score whose *language* came from the analyst
       rather than the subject; the analogue here is a pointer that resolves to a MOC paragraph
       rather than to a commit, file or PR.
  R2 graded-promotion        <- MATI lib/organizational-signals.ts + proofminer docs/AUTHORITY.md
       "Promoted" is one bit here and a ladder everywhere else. An insight must declare
       may-report and may-assert-cause separately, and anything shipped needs a reversibility
       call, because shipping a playbook is irreversible in a way distilling is not.
  R3 score-history           <- Agent-Architect docs/confidence-ladder.md
       A monetization score is a reading, not a stamp. Changing it appends; it never overwrites.
  R4 threshold-provenance    <- pre-call docs/market-ready.md
       Every threshold names where it came from, and an arbitrary one is labelled arbitrary
       ("a line that was set, not derived").
  R5 bypass-log              <- pre-call docs/market-ready.md
       A gate with no record of being gone around is indistinguishable from a gate nobody needed
       to go around. --bypass requires a reason and appends to ground-truth/bypass-log.md.
       NOTE (2026-09-03): R5 is a MECHANISM, not a rule that emits a verdict. It appears in no
       violations.append() and therefore cannot be positive-controlled like R1-R4 and R6.
       ground-truth/gate-reliability.md line 65 says "R1, R2, R3, R5 was fired once on a broken
       file"; that is not possible for R5 and is corrected in that file's appended section.
  R6 claim-strength          <- proofminer docs/AUTHORITY.md ("a weak trace should not become a
       confident outbound asset just because the interface can generate one")
       A playbook is the outbound asset. It must declare "Claim strength: causal" or
       "Claim strength: observational", and that declaration must match may-assert-cause on the
       insights that back it. A playbook backed only by report-only insights may not sell a
       mechanism.

Usage:
  python3 scripts/check-lessons-contract.py                 # check, exit 1 on any violation
  python3 scripts/check-lessons-contract.py --explain       # also print why each rule exists
  python3 scripts/check-lessons-contract.py --bypass "reason"   # record an override and exit 0
"""
import re, sys, os, json, datetime, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INSIGHTS = os.path.join(ROOT, "insights")
BYPASS_LOG = os.path.join(ROOT, "ground-truth", "bypass-log.md")

# A pointer of the form <name>@HH:MM is an observation timestamp inside this repo's own
# extracted-insights files. It resolves to prose we wrote, not to anything in the target repo.
RE_CLOCK   = re.compile(r"@\d{1,2}:\d{2}\b")
RE_COMMIT  = re.compile(r"@[0-9a-f]{7,40}\b")
RE_PR      = re.compile(r"#(PR-)?\d+\b")
RE_FILE    = re.compile(r"[\w./-]+\.(md|ts|tsx|js|mjs|py|json|yaml|yml|html|sh|css)\b")

def classify(pointer):
    p = pointer.strip()
    if RE_CLOCK.search(p):  return "prose"      # checked before commit: 10:04 is not a sha
    if RE_COMMIT.search(p): return "commit"
    if RE_PR.search(p):     return "pr"
    if RE_FILE.search(p):   return "file"
    return "unresolvable"

def front_matter(text):
    m = re.match(r"---\n(.*?)\n---\n", text, re.S)
    return m.group(1) if m else None

def field(fm, name):
    m = re.search(rf"^{name}:\s*(.*)$", fm, re.M)
    if not m: return None
    # strip a trailing "# why" comment. Without this, `may-assert-cause: yes  # 6 repos` never
    # equals "yes" and R2 silently never fires - a gate that passes vacuously, which is the exact
    # defect Claude found in MATI's regex contract checks.
    return re.sub(r"\s+#.*$", "", m.group(1)).strip()

def listfield(fm, name):
    # front_matter() strips the trailing newline, so the LAST field's final list item has no "\n"
    # after it. Requiring one made every last-field list read as empty - which is exactly how this
    # checker first reported "missing score-history" on 15 files that had it.
    m = re.search(rf"^{name}:[ \t]*\n((?:[ \t]+-[ \t].*(?:\n|$))+)", fm + "\n", re.M)
    if not m: return []
    return [l.strip()[2:].strip() for l in m.group(1).splitlines() if l.strip().startswith("- ")]

def insight_files():
    out = []
    for d, _, fs in os.walk(INSIGHTS):
        for f in fs:
            if f.endswith(".md") and f != "_template.md":
                out.append(os.path.join(d, f))
    return sorted(out)

def check():
    violations = []
    for path in insight_files():
        rel = os.path.relpath(path, ROOT)
        text = open(path, encoding="utf-8").read()
        fm = front_matter(text)
        if fm is None:
            violations.append(("R1", rel, "no front-matter")); continue

        # --- R1 provenance resolution -------------------------------------------------------
        ptrs = listfield(fm, "evidence-pointers")
        kinds = [classify(p) for p in ptrs]
        hard = [k for k in kinds if k in ("commit", "pr", "file")]
        declared = field(fm, "evidence-resolves-to")
        # "unresolvable" degrades the verdict exactly as "prose" does. A pointer that resolves to
        # nothing is not hard evidence, and tolerating it silently is how a mixed bag reads as clean.
        soft = [k for k in kinds if k in ("prose", "unresolvable")]
        actual = "prose" if not hard else ("mixed" if soft else "hard")
        if declared is None:
            violations.append(("R1", rel, f"missing `evidence-resolves-to` (measured: {actual})"))
        elif declared != actual:
            violations.append(("R1", rel, f"`evidence-resolves-to: {declared}` but pointers measure {actual}"))
        playbook = field(fm, "related-playbook")
        shipped = bool(playbook and playbook not in ("none", "none yet"))
        if shipped and actual == "prose":
            violations.append(("R1", rel,
                "PROVENANCE-RISK: backs a playbook but every pointer resolves to prose we wrote"))

        # --- R2 graded promotion -------------------------------------------------------------
        for f_ in ("may-report", "may-assert-cause"):
            if field(fm, f_) is None:
                violations.append(("R2", rel, f"missing `{f_}`"))
        if field(fm, "may-assert-cause") == "yes" and field(fm, "may-report") == "no":
            violations.append(("R2", rel, "may-assert-cause without may-report is incoherent"))
        if shipped and field(fm, "reversibility") is None:
            violations.append(("R2", rel, "ships a playbook but declares no `reversibility`"))

        # --- R3 score history ----------------------------------------------------------------
        hist = listfield(fm, "score-history")
        score = field(fm, "monetization-score")
        if not hist:
            violations.append(("R3", rel, "missing `score-history` (a score is a reading, not a stamp)"))
        else:
            # parse N/5 out of the last entry rather than substring-matching the numerator, which
            # matched any digit in the date ("2" in "2026-05-12") and made R3 unfireable.
            last = re.search(r"(\d+)\s*/\s*5", hist[-1])
            want = re.search(r"(\d+)\s*/\s*5", score or "")
            if want and (not last or last.group(1) != want.group(1)):
                violations.append(("R3", rel,
                    f"`monetization-score: {score}` does not match the last score-history entry "
                    f"({hist[-1]!r}) — a score change appends, it does not overwrite"))

    # --- R6 claim strength: a playbook may not out-claim the insights behind it ---------------
    backers = {}                                    # playbook path -> [(insight, may-assert-cause)]
    for path in insight_files():
        fm = front_matter(open(path, encoding="utf-8").read())
        if not fm: continue
        pb = field(fm, "related-playbook")
        if pb and pb not in ("none", "none yet"):
            backers.setdefault(pb, []).append(
                (os.path.basename(path)[:-3], field(fm, "may-assert-cause")))
    pbdir = os.path.join(ROOT, "products", "playbooks")
    if os.path.isdir(pbdir):
        for fn in sorted(os.listdir(pbdir)):
            if not fn.endswith(".md"): continue
            rel = os.path.join("products", "playbooks", fn)
            text = open(os.path.join(pbdir, fn), encoding="utf-8").read()
            m = re.search(r"\*\*Claim strength: (causal|observational)", text)
            mine = backers.get(rel, [])
            if not m:
                violations.append(("R6", rel, "no `Claim strength:` declaration"))
                continue
            declared = m.group(1)
            if not mine:                            # meta-playbook or unbacked
                if "inherited" not in text[m.start():m.start()+200] and \
                   not re.search(r"^depends-on:", text, re.M):
                    violations.append(("R6", rel,
                        "declares a claim strength but no insight names it in `related-playbook`"))
                continue
            allowed = "causal" if any(v == "yes" for _, v in mine) else "observational"
            if declared != allowed:
                who = ", ".join(f"{n}={v}" for n, v in mine)
                violations.append(("R6", rel,
                    f"declares `{declared}` but its backing insights allow `{allowed}` ({who})"))

    # --- R4 threshold provenance -------------------------------------------------------------
    # Rewritten 2026-09-03 after the adversarial pass. The previous form could never fire, and
    # reproduced LOG anti-pattern #22 twice over:
    #   1. the pattern was r"\b(?:>=|<=|>=|<=)\s*(\d+)\b". A leading \b before ">" requires a word
    #      character immediately to its left, so every threshold written with a space before the
    #      operator ("work_sessions >= 2") was invisible. Measured against the live rubric the
    #      match set was EMPTY, so the loop body never executed and R4 could not produce a verdict.
    #   2. provenance was searched in every line CONTAINING THE DIGITS as a substring, so a
    #      threshold of 77 matched the unrelated sentence "77 remote branches ... because".
    #      That is the identical substring defect #22 records for R3.
    # Now: match the operator without a leading word-boundary, and look for provenance inside the
    # threshold's own "##" section rather than anywhere the digits appear.
    rubric = os.path.join(ROOT, "ground-truth", "rubric.md")
    PROV = r"because|why|source|set-not-derived|set, not derived|derived|Faulkner|measured|cut-point|rationale"
    if os.path.exists(rubric):
        lines = open(rubric, encoding="utf-8").read().splitlines()
        bounds, start = [], 0
        for i, l in enumerate(lines):          # section spans, so provenance is scoped
            if l.startswith("## ") and i:
                bounds.append((start, i)); start = i
        bounds.append((start, len(lines)))
        for a, b in bounds:
            section = "\n".join(lines[a:b])
            has_prov = re.search(PROV, section, re.I)
            for m in re.finditer(r"(?:>=|<=|≥|≤)\s*(\d+(?:\.\d+)?)", section):
                if not has_prov:
                    violations.append(("R4", "ground-truth/rubric.md",
                        f"threshold {m.group(1)} in section "
                        f"{lines[a][:60].strip() or '(preamble)'!r} has no stated provenance "
                        "(name the source, or label it set-not-derived)"))
    return violations

def record_bypass(reason, violations):
    os.makedirs(os.path.dirname(BYPASS_LOG), exist_ok=True)
    if not os.path.exists(BYPASS_LOG):
        open(BYPASS_LOG, "w", encoding="utf-8").write(
            "# Bypass Log\n\n"
            "> Every time the contract gate was gone around, and why. Ported from pre-call\n"
            "> `docs/market-ready.md`: a gate with no record of being bypassed is\n"
            "> indistinguishable from a gate nobody has needed to bypass.\n"
            "> Append-only. Written by `scripts/check-lessons-contract.py --bypass`.\n\n")
    try:
        sha = subprocess.run(["git", "-C", ROOT, "rev-parse", "--short", "HEAD"],
                             capture_output=True, text=True, timeout=10).stdout.strip() or "unknown"
    except Exception:
        sha = "unknown"
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    with open(BYPASS_LOG, "a", encoding="utf-8") as fh:
        fh.write(f"## {stamp} — at `{sha}`\n\n**Reason**: {reason}\n\n"
                 f"**Rules bypassed** ({len(violations)} violation(s)):\n\n")
        for rule, where, why in violations:
            fh.write(f"- `{rule}` {where} — {why}\n")
        fh.write("\n")

def main():
    args = sys.argv[1:]
    bypass = None
    if "--bypass" in args:
        i = args.index("--bypass")
        if i + 1 >= len(args) or args[i+1].startswith("--"):
            print("error: --bypass requires a reason", file=sys.stderr); return 2
        bypass = args[i+1]
    if "--explain" in args:
        print(__doc__)

    v = check()
    if not v:
        print(f"contract OK — {len(insight_files())} insights, 0 violations")
        return 0

    by_rule = {}
    for rule, where, why in v: by_rule.setdefault(rule, []).append((where, why))
    for rule in sorted(by_rule):
        print(f"\n{rule}  ({len(by_rule[rule])})")
        for where, why in by_rule[rule]:
            print(f"  {where}\n      {why}")
    print(f"\n{len(v)} violation(s)")

    if bypass:
        record_bypass(bypass, v)
        print(f"\nBYPASSED — recorded in {os.path.relpath(BYPASS_LOG, ROOT)}")
        return 0
    return 1

if __name__ == "__main__":
    sys.exit(main())
