#!/usr/bin/env bash
# detect-project-identity.sh — is the operator's git identity specific to this project?
#
# Written 2026-08-19 to settle a contested pattern cell by measurement instead of a fourth
# rating round. Round 3's raters split 0/0/2 on `per-project-git-identity @ anti-silo`, and the
# split was definitional, not observational: does a different NAME FORM count, or is an explicit
# project marker required? Raters cannot resolve a definition. A rule can.
#
# The rule, stated sharply:
#   A project-specific identity is an author identity carrying an explicit project marker —
#   a project name inside the author name, OR an email at a project-owned domain — that does
#   NOT appear in any other repository in the portfolio.
#
#   3  a project-marked identity carries the majority of human commits
#   2  a project-marked identity is present but is a minority
#   1  an identity unique to this repo, but with no project marker (a name-form variant)
#   0  only identities shared with other repositories
#   -  no human commits at all (scaffold-only repo) — reported, never silently dropped
#
# --strict additionally requires the marker to name THIS repository. Without it, an identity
# stamped `Erez (COR-SYS)` used exclusively inside `_crm` counts as project-marked; with it,
# that is a marker for a DIFFERENT project carried into this one, and scores 1. Both readings
# are defensible, so both are measured and both are reported rather than one being chosen.
#
# Usage: ./detect-project-identity.sh [--strict] [repo-paths.tsv]
strict=no
[ "$1" = "--strict" ] && { strict=yes; shift; }
selftest=no
[ "$1" = "--selftest" ] && { selftest=yes; shift; }
paths="${1:-ground-truth/repo-paths.tsv}"

# --selftest builds fixtures whose correct scores are known and fires the rule on all of them,
# including cases it must score LOW. A rule only ever seen to pass has not been tested.
if [ "$selftest" = yes ]; then
  d=$(mktemp -d); fx="$d/paths.tsv"; : > "$fx"
  mk() { # mk <repo> <name> <email> <n>
    r="$d/$1"; [ -d "$r" ] || { mkdir -p "$r"; git -C "$r" init -q; printf '%s\t%s\n' "$1" "$r" >> "$fx"; }
    i=0; while [ "$i" -lt "$4" ]; do
      git -C "$r" -c user.name="$2" -c user.email="$3" commit -q --allow-empty -m "c$i"; i=$((i+1))
    done
  }
  mk alpha   "Alpha Dev"      "dev@alpha.io"        3
  mk alpha   "ereztash"       "erez@gmail.com"      1
  mk beta    "Erez (ALPHA)"   "e2@gmail.com"        3
  mk gamma   "ereztash"       "erez@gmail.com"      2
  mk delta   "GitHub User"    "user@github.com"     2
  mk epsilon "Solo Person"    "solo@gmail.com"      2
  mk eta     "Eta Dev"        "eta@eta.dev"         1
  mk eta     "ereztash"       "erez@gmail.com"      3
  mk zeta    "Lovable"        "noreply@lovable.dev" 2
  loose=$(bash "$0" "$fx"); strictout=$(bash "$0" --strict "$fx")
  fail=0
  check() { # check <mode> <repo> <expected>
    o=$([ "$1" = strict ] && printf '%s' "$strictout" || printf '%s' "$loose")
    got=$(printf '%s\n' "$o" | awk -v r="$2" '$1==r{print $2}')
    if [ "$got" = "$3" ]; then printf '  ok   %-7s %-9s = %s\n' "$1" "$2" "$3"
    else printf '  FAIL %-7s %-9s expected %s got %s\n' "$1" "$2" "$3" "$got"; fail=1; fi
  }
  echo "selftest — project-marked majority, and the same identity under strict mode:"
  check loose  alpha   3   # marker names this repo, majority
  check strict alpha   3
  check loose  beta    3   # marker present, but names a DIFFERENT project
  check strict beta    1   # ...which strict mode must refuse
  check loose  gamma   0   # identity shared with alpha
  check loose  delta   0   # "GitHub User" is the absence of an identity
  check loose  epsilon 1   # unique but unmarked
  check loose  eta     2   # project-marked but a minority of commits
  check loose  zeta    -   # bot-only repo is reported, not dropped
  rm -rf "$d"
  [ "$fail" = 0 ] && echo "selftest PASSED" || echo "selftest FAILED"
  exit "$fail"
fi
tmp=$(mktemp)

norm() { printf '%s' "$1" | tr 'A-Z' 'a-z' | tr -cd 'a-z0-9'; }

# every repo listed gets a row, even one with no human identities
: > "$tmp.repos"
while IFS=$'\t' read -r name path; do
  [ -d "$path/.git" ] || { printf '%s\t-\tno git repository at %s\n' "$name" "$path" >> "$tmp.na"; continue; }
  printf '%s\n' "$name" >> "$tmp.repos"
  git -C "$path" log --all --format='%an|%ae' 2>/dev/null \
    | grep -viE 'bot\]|lovable|gpt-engineer|noreply@anthropic|cursoragent' \
    | sort | uniq -c | while read -r n id; do printf '%s\t%s\t%s\n' "$name" "$n" "$id"; done
done < "$paths" > "$tmp"

# an identity is SHARED if it appears in more than one repo
shared=$(cut -f3 "$tmp" | sort -u | while read -r id; do
  c=$(awk -F'\t' -v i="$id" '$3==i{print $1}' "$tmp" | sort -u | wc -l)
  [ "$c" -gt 1 ] && printf '%s\n' "$id"
done)

printf '%-30s %-6s %s\n' "repo" "score" "evidence"
sort -u "$tmp.repos" | while read -r repo; do
  total=$(awk -F'\t' -v r="$repo" '$1==r{s+=$2} END{print s+0}' "$tmp")
  if [ "$total" -eq 0 ]; then
    printf '%-30s %-6s %s\n' "$repo" "-" "no human commits (scaffold/agent-only repo)"
    continue
  fi
  rn=$(norm "$repo")
  best=0; note="only shared identities"
  while IFS=$'\t' read -r _ n id; do
    printf '%s\n' "$shared" | grep -qxF "$id" && continue        # shared -> not project-specific
    name=${id%%|*}; mail=${id##*|}
    # placeholder identities are not project identities. "GitHub User <user@github.com>" is what
    # the web UI writes when nobody configured git; it marks the absence of an identity, not one.
    case "$name" in
      "GitHub User"|"root"|"unknown"|"Your Name"|"") continue ;;
    esac
    marker=no; token=""
    # a project marker: a parenthesised or bracketed token in the name, a "<Project> Dev" form, or
    # an email at a project-owned domain.
    # NOTE: the first version used '[(\[][^)]+[)\]]', which does not work - in a POSIX bracket
    # expression the ']' closes the set, so that pattern demanded a literal ']' at the end and
    # never matched "Erez (COR-SYS)". Caught by firing it on known names before trusting it.
    if printf '%s' "$name" | grep -qE '\(.+\)|\[.+\]| Dev$'; then
      marker=yes
      token=$(printf '%s' "$name" | sed -E 's/.*[(\[]([^)]*)[)\]].*/\1/; s/ Dev$//')
    fi
    if printf '%s' "$mail" | grep -qE '@' \
       && printf '%s' "$mail" | grep -qvE '@(gmail|hotmail|outlook|yahoo|github|users\.noreply\.github)\.com$'; then
      marker=yes
      [ -z "$token" ] && token=$(printf '%s' "${mail##*@}" | sed -E 's/\.[a-z]+$//')
    fi
    # an empty marker token matches every repo name under strict mode's substring test, which would
    # turn a malformed identity into a perfect match. No token, no marker.
    [ -z "$token" ] && marker=no
    if [ "$marker" = yes ] && [ "$strict" = yes ]; then
      tn=$(norm "$token")
      # the marker must name THIS repo (either direction, to allow `cor-sys.local` vs `COR-SYS`)
      case "$rn" in *"$tn"*) : ;; *) case "$tn" in *"$rn"*) : ;; *) marker=no ;; esac ;; esac
      [ "$marker" = no ] && note_extra=" [marker '$token' names another project]"
    fi
    if [ "$marker" = yes ]; then
      s=2; [ "$n" -gt $((total/2)) ] && s=3
      [ "$s" -gt "$best" ] && { best=$s; note="project-marked: $id ($n/$total commits)"; }
    else
      [ "$best" -lt 1 ] && { best=1; note="repo-unique but unmarked: $id ($n/$total)${note_extra:-}"; }
    fi
    note_extra=""
  done < <(awk -F'\t' -v r="$repo" '$1==r' "$tmp")
  printf '%-30s %-6s %s\n' "$repo" "$best" "$note"
done
[ -f "$tmp.na" ] && cat "$tmp.na"
rm -f "$tmp" "$tmp.repos" "$tmp.na"
