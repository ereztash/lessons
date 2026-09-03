#!/usr/bin/env bash
# gate-positive-control.sh — prove every rule of the contract gate can go red.
#
# LOG anti-pattern #22 / ground-truth/gate-reliability.md §3:
#   "A green check that has never been observed to go red is not evidence."
#
# History of this file, which is the reason it now covers what it covers:
#   2026-08-19  the gap-closure round fired R1, R2, R3 and R5 by hand on a broken file and found
#               R2 and R3 unfireable. R4 was never fired.
#   2026-09-03  the first version of this script automated exactly the three rules already known
#               good (R1, R2, R3) and shipped alongside a claim that "R1-R6 verified passing".
#               An adversarial pass then showed R4 could not fire at all: its regex began with \b
#               before ">", so no threshold written with a space before the operator matched, and
#               the match set against the live rubric was EMPTY. The positive control had been
#               pointed at the half that was not broken.
#   Now:        R1, R2, R3, R4 and R6 are each broken on purpose and asserted to go red.
#
# R5 is deliberately NOT covered, and the reason is a finding rather than an omission: R5 is the
# --bypass mechanism, not a rule that emits a verdict. It appears in no violations.append() and
# cannot be broken into a violation. gate-reliability.md line 65 claims R5 "was fired once on a
# broken file"; that was never possible, and its §6 records the correction.
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHECK="$ROOT/scripts/check-lessons-contract.py"
fail=0

stage() {   # -> echoes a temp root holding a working copy of everything the checker reads
  local tmp; tmp="$(mktemp -d)"
  cp -r "$ROOT/insights" "$tmp/insights"
  cp -r "$ROOT/products" "$tmp/products"
  cp -r "$ROOT/ground-truth" "$tmp/ground-truth"
  mkdir -p "$tmp/scripts" && cp "$CHECK" "$tmp/scripts/"
  echo "$tmp"
}

assert_red() {   # name, tmp-root, expected-rule
  local name="$1" tmp="$2" rule="$3" out
  out="$(python3 "$tmp/scripts/check-lessons-contract.py" 2>&1)"
  if [ $? -eq 0 ]; then
    echo "NOT-FIRED  $name — the gate passed a corpus broken on purpose"
    fail=1
  elif ! grep -q "^$rule " <<<"$out"; then
    echo "WRONG-RULE $name — the gate went red but not on $rule"
    fail=1
  else
    echo "fired      $name"
  fi
  rm -rf "$tmp"
}

victim="$(ls "$ROOT"/insights/*/*.md | grep -v _template | head -1)"
[ -n "$victim" ] || { echo "no insight files found"; exit 1; }
rel="${victim#"$ROOT"/insights/}"
playbook="$(ls "$ROOT"/products/playbooks/*.md | head -1)"
prel="${playbook#"$ROOT"/products/playbooks/}"

echo "positive control: breaking the corpus once per rule"

t=$(stage); sed -i 's#^  - .*@[0-9a-f]\{7,\}.*#  - cor-sys@10:04#' "$t/insights/$rel"
assert_red "R1 provenance-resolution" "$t" R1

t=$(stage); sed -i '/^may-assert-cause:/d' "$t/insights/$rel"
assert_red "R2 graded-promotion" "$t" R2

t=$(stage); sed -i '/^score-history:/,/^[a-z-]*:/{/^score-history:/d; /^  - /d}' "$t/insights/$rel"
assert_red "R3 score-history" "$t" R3

t=$(stage); printf '\n## ZZ positive control\n\nwidget_quota >= 9999\n' >> "$t/ground-truth/rubric.md"
assert_red "R4 threshold-provenance" "$t" R4

t=$(stage); sed -i '/^> \*\*Claim strength:/d' "$t/products/playbooks/$prel"
assert_red "R6 claim-strength" "$t" R6

echo
echo "R5 not covered: it is the --bypass mechanism, not a rule that emits a verdict."
if [ "$fail" -ne 0 ]; then
  echo "POSITIVE CONTROL FAILED — at least one rule cannot go red. It is not evidence."
  exit 1
fi
echo "POSITIVE CONTROL PASSED — R1, R2, R3, R4 and R6 were each observed to fail on a broken input."
