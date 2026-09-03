#!/usr/bin/env bash
# gate-positive-control.sh — prove the contract gate can go red.
#
# LOG anti-pattern #22 / ground-truth/gate-reliability.md §3:
#   "A green check that has never been observed to go red is not evidence."
# Two of five rules in check-lessons-contract.py once passed vacuously and were found only by
# deliberately breaking a file. This script makes that test part of CI instead of a memory.
#
# It copies the insight corpus to a temp tree, breaks one file per rule, and asserts the checker
# exits non-zero each time. Exit 0 means the gate has teeth today.
set -uo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CHECK="$ROOT/scripts/check-lessons-contract.py"

fail=0
victim="$(ls "$ROOT"/insights/*/*.md | grep -v _template | head -1)"
[ -n "$victim" ] || { echo "no insight files found"; exit 1; }

run_case() {   # name, sed-expression
  local name="$1" expr="$2"
  local tmp; tmp="$(mktemp -d)"
  cp -r "$ROOT/insights" "$tmp/insights"
  cp -r "$ROOT/products" "$tmp/products"
  cp -r "$ROOT/ground-truth" "$tmp/ground-truth"
  mkdir -p "$tmp/scripts" && cp "$CHECK" "$tmp/scripts/"
  local target="$tmp/insights/${victim#"$ROOT"/insights/}"
  sed -i "$expr" "$target"
  if python3 "$tmp/scripts/check-lessons-contract.py" >/dev/null 2>&1; then
    echo "NOT-FIRED  $name — the gate passed a file broken on purpose"
    fail=1
  else
    echo "fired      $name"
  fi
  rm -rf "$tmp"
}

echo "positive control: breaking $(basename "$victim") once per rule"
run_case "R1 provenance-resolution" 's#^  - .*@[0-9a-f]\{7,\}.*#  - cor-sys@10:04#'
run_case "R2 graded-promotion"      '/^may-assert-cause:/d'
run_case "R3 score-history"         '/^score-history:/,/^[a-z-]*:/{/^score-history:/d; /^  - /d}'

echo
if [ "$fail" -ne 0 ]; then
  echo "POSITIVE CONTROL FAILED — at least one rule cannot go red. It is not evidence."
  exit 1
fi
echo "POSITIVE CONTROL PASSED — every rule tested was observed to fail on a broken input."
