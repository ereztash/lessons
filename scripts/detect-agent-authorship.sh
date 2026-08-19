#!/usr/bin/env bash
# detect-agent-authorship.sh — two orthogonal detectors for AI authorship in a git repo.
#
# Why two: neither alone is sufficient.
#   Detector A (identity)  — author name / Co-Authored-By: Claude / session-link trailers.
#                            Misses agents that commit under the operator's own git identity.
#   Detector B (cadence)   — runs of >=5 same-author commits with every gap < 180s.
#                            Misses Claude Code, which paces commits like a human.
#
# Verified 2026-08-19 across 12 repos of the ereztash portfolio.
# See research/cross-repo/authorship-attribution.md for the 2x2 and the false-negative cases.
#
# Usage: ./detect-agent-authorship.sh <repo-path> [<repo-path> ...]

BURST_MIN=${BURST_MIN:-5}      # commits required to call a burst
GAP_MAX=${GAP_MAX:-180}        # seconds; above this a gap reads as human deliberation

scan() {
  repo="$1"
  cd "$repo" 2>/dev/null || { printf '%-26s UNREADABLE\n' "$(basename "$repo")"; return; }

  total=$(git rev-list --count --all --no-merges 2>/dev/null)
  [ -z "$total" ] || [ "$total" = "0" ] && { printf '%-26s no commits\n' "$(basename "$repo")"; return; }

  # Detector A — identity signals
  bot=$(git log --all --no-merges --format='%an' | grep -ciE 'bot|lovable|gpt-engineer' )
  claude_author=$(git log --all --no-merges --format='%an' | grep -cx 'Claude')
  trailer=0; session=0; empty=0
  while read -r h; do
    b=$(git log -1 --format='%b' "$h")
    printf '%s' "$b" | grep -qiE 'co-authored-by:.*claude' && trailer=$((trailer+1))
    printf '%s' "$b" | grep -q  'claude.ai/code'  && session=$((session+1))
    [ -z "$(printf '%s' "$b" | tr -d '[:space:]')" ] && empty=$((empty+1))
  done < <(git log --all --no-merges --format='%H')

  # Detector B — cadence bursts
  read -r bursts in_burst <<EOF
$(git log --all --no-merges --format='%at%x09%an' | sort -k1,1n -u | awk -F'\t' -v m="$BURST_MIN" -v g="$GAP_MAX" '
  { ts=$1+0; an=$2
    if (NR>1 && an==pa && (ts-pt)<g) run++
    else { if (run>=m-1) { b++; c+=run+1 } ; run=0 }
    pt=ts; pa=an }
  END { if (run>=m-1) { b++; c+=run+1 }; print b+0, c+0 }')
EOF

  # Hidden-agent flag: cadence bursts present, but no identity signal explains them.
  identified=$((bot + claude_author))
  hidden=""
  [ "$in_burst" -gt 0 ] && [ "$in_burst" -gt "$identified" ] && hidden=" <-- HIDDEN AGENT (burst commits exceed identified AI commits)"

  printf '%-26s commits=%-4s bot=%-3s claude=%-3s trailer=%-3s session=%-3s empty_body=%-4s bursts=%-2s in_burst=%-4s%s\n' \
    "$(basename "$repo")" "$total" "$bot" "$claude_author" "$trailer" "$session" "$empty" "$bursts" "$in_burst" "$hidden"
}

[ $# -eq 0 ] && { echo "usage: $0 <repo-path> [...]" >&2; exit 1; }
for r in "$@"; do ( scan "$r" ); done
