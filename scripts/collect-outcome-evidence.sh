#!/usr/bin/env bash
# collect-outcome-evidence.sh — raw signals for the ground-truth labelling rubric.
#
# Emits L1-L5 for each repo. These are deliberately DISJOINT from the F1-F4 classifier
# features (production dependency / human commit / PR exists / docs folder), so the label
# does not read the thing it is meant to test. See ground-truth/rubric.md.
#
#   L2  months_active  distinct YYYY-MM containing >=1 substantive commit
#                      (excludes merges, dependabot, whole-tree syncs, and the Lovable seed)
#   L2b work_sessions  commit clusters separated by >=7 days - i.e. how many times anyone
#                      came back to the repo after a real break
#   L3 max_gap_days    longest silence, and whether work resumed after a gap >=30d
#   L4 head_runnable   an executable artifact exists: a declared run/build script, a Python
#                      entry point, a container or a shell entry. Deliberately NOT size-based.
#   L1 consumer        release/tag, deploy config + a deploy-triggering commit,
#                      a live URL in the README, or a doc naming a real pilot/client
#   L5 review_act      a PR merged from a branch by someone, with a prose body >200 chars,
#                      or a review-named branch
#
# Usage: ./collect-outcome-evidence.sh <repo-path> [...]

emit() { printf '%-24s %-16s %s\n' "$1" "$2" "$3"; }

scan() {
  repo="$1"; name=$(basename "$repo")
  cd "$repo" 2>/dev/null || { emit "$name" ERROR unreadable; return; }

  # --- L2: months with substantive activity -------------------------------------------
  # The Lovable/gpt-engineer scaffold seeds a synthetic commit dated 2025-01-01 00:00
  # ("template: <name>"). It is not activity and would fabricate a multi-month span and a
  # 500-day gap, so it is excluded from every temporal signal below.
  SEED_FILTER='^(Lovable\t)?template: '
  months=$(git log --all --no-merges --format='%ad%x09%an%x09%s' --date=format:'%Y-%m' 2>/dev/null \
    | grep -viE $'\t'"dependabot" \
    | grep -viE $'\t'"(sync|mirror):? " \
    | grep -viE $'\t'"template: " \
    | cut -f1 | sort -u)
  n_months=$(printf '%s\n' "$months" | grep -c . )

  # --- L2b: work sessions = commit clusters separated by >=7 days ----------------------
  # "2 distinct calendar months" is unreliable: brain-healer-hub spans 2026-03/2026-04 with a
  # maximum gap of 3 days, which is one continuous stretch crossing a month boundary. Counting
  # returns after a real break measures whether anyone came back.
  sessions=$(git log --all --no-merges --format='%at%x09%s' 2>/dev/null | grep -viE $'\t'"template: " \
    | cut -f1 | sort -n -u | awk '{ if (NR==1 || ($1-p)>=604800) n++; p=$1 } END { print n+0 }')

  # --- L3: longest gap, and resumption after >=30d ------------------------------------
  read -r maxgap resumed <<EOF
$(git log --all --no-merges --format='%at%x09%s' 2>/dev/null | grep -viE $'\t'"template: " | cut -f1 | sort -n -u | awk '
  { if (NR>1) { g=($1-p)/86400; if (g>mx) mx=g; if (g>=30) r=1 } ; p=$1 }
  END { printf "%.0f %d", mx+0, r+0 }')
EOF

  # --- L4: runnable head ---------------------------------------------------------------
  manifest=""; entry=""
  for m in package.json pyproject.toml requirements.txt setup.py Cargo.toml go.mod; do
    [ -f "$m" ] && { manifest="$m"; break; }
  done
  # a repo may keep its manifest in a subdirectory (e.g. Agent-Architect/pipeline/requirements.txt)
  if [ -z "$manifest" ]; then
    manifest=$(find . -maxdepth 2 -path ./.git -prune -o \
      \( -name package.json -o -name pyproject.toml -o -name requirements.txt \) -print 2>/dev/null \
      | grep -v node_modules | head -1)
  fi
  if [ -f package.json ]; then
    entry=$(python3 -c "
import json,os
d=json.load(open('package.json'))
c=[d.get('main'),'index.html','app/page.tsx','src/main.tsx','src/index.ts','server.js']
s=d.get('scripts',{})
print('scripts' if ('dev' in s or 'start' in s or 'build' in s) else next((x for x in c if x and os.path.exists(x)),''))" 2>/dev/null)
  elif [ -n "$manifest" ]; then
    entry=$(ls *.py 2>/dev/null | head -1)
    [ -z "$entry" ] && entry=$(find "$(dirname "$manifest")" -maxdepth 2 \
      \( -name '__main__.py' -o -name 'cli.py' -o -name 'orchestrator.py' -o -name 'server*.py' \) 2>/dev/null | head -1)
  fi
  # An executable artifact, not repo size: a declared run/build script, a Python entry
  # point (__main__ / argparse / sys.argv), a container, or a shell entry. Size is NOT
  # part of this test - size is close to F1's territory and would leak the classifier in.
  exe=""
  if [ -f package.json ] && [ -n "$entry" ]; then exe="npm-script"; fi
  if [ -z "$exe" ]; then
    pyentry=$(grep -rlE "__name__ *== *[\"']__main__|argparse\.|sys\.argv" \
      --include='*.py' . 2>/dev/null | grep -vE 'node_modules|/\.git/|/tests?/' | head -1)
    [ -n "$pyentry" ] && exe="python:$(basename "$pyentry")"
  fi
  if [ -z "$exe" ]; then
    for f in Dockerfile Makefile run.sh start.sh; do [ -f "$f" ] && exe="$f"; done
  fi
  runnable="no"; [ -n "$exe" ] && runnable="yes"
  nsrc=$(find . -path ./.git -prune -o -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.py' -o -name '*.js' \) -print 2>/dev/null \
    | grep -vcE 'node_modules|/dist/')

  # --- L1: external consumer ------------------------------------------------------------
  tags=$(git tag 2>/dev/null | wc -l)
  deploycfg="no"; for f in vercel.json netlify.toml Dockerfile fly.toml .github/workflows/deploy.yml; do
    [ -f "$f" ] && deploycfg="yes"
  done
  deploycommit=$(git log --all --no-merges --format='%s' 2>/dev/null | grep -ciE 'deploy|production|release|publish|go.live')
  liveurl=$(grep -rhoE 'https?://[a-z0-9.-]+\.(vercel\.app|netlify\.app|com|io|org|ai)[a-z0-9/._-]*' README.md 2>/dev/null \
    | grep -viE 'github\.com|shields\.io|npmjs|anthropic|claude\.ai|lovable|opensource\.org|w3\.org' | head -3 | tr '\n' ' ')
  pilotdoc=$(ls docs/*PILOT* docs/*CLIENT* docs/*INVESTOR* docs/*LAUNCH* docs/*READINESS* 2>/dev/null | wc -l)

  # --- L5: human review act -------------------------------------------------------------
  prmerges=$(git log --all --merges --format='%s' 2>/dev/null | grep -ciE 'merge (pull request|pr)')
  reviewbranch=$(git log --all --merges --format='%s' 2>/dev/null | grep -ciE 'review|audit')

  emit "$name" "L2_months"     "$n_months  [$(printf '%s' "$months" | tr '\n' ' ')]"
  emit "$name" "L2b_sessions" "$sessions  (commit clusters >=7d apart)"
  emit "$name" "L3_gap"        "max=${maxgap}d resumed_after_30d=${resumed}"
  emit "$name" "L4_runnable"   "$runnable (exe=${exe:-none} manifest=${manifest:-none} src=$nsrc)"
  emit "$name" "L1_consumer"   "tags=$tags deploycfg=$deploycfg deploy_commits=$deploycommit pilot_docs=$pilotdoc url=${liveurl:-none}"
  emit "$name" "L5_review"     "pr_merges=$prmerges review_branches=$reviewbranch"
  echo ""
}

[ $# -eq 0 ] && { echo "usage: $0 <repo-path> [...]" >&2; exit 1; }
for r in "$@"; do ( scan "$r" ); done
