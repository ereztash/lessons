#!/usr/bin/env bash
# score-portfolio.sh — measure F1..F5 for a repo and emit one TSV row.
#
# F1  non-template production dependency   (package.json deps minus a scaffold allowlist, or any
#                                           declared Python dependency)
# F2  any non-bot commit author            (unreliable on its own - see authorship-attribution.md)
# F3  any PR ever                          (merge commits; squash-merged PRs leave no trace, so
#                                           this UNDERCOUNTS - flagged in the results)
# F4  CLAUDE.md / AGENTS.md / docs/
# F5  external consumer                    (NEW, 2026-08-19) - any of:
#       a) deployment config AND a live non-repo URL in the README
#       b) a document addressed to a real recipient (PILOT/CLIENT/INVESTOR/LAUNCH/READINESS/OFFER)
#       c) a published release tag
# R   current                              last commit <= 30 days before REF_DATE
#
# Usage: ./score-portfolio.sh <name> <repo-path>
REF_DATE=${REF_DATE:-2026-08-19}

name="$1"; repo="$2"
cd "$repo" 2>/dev/null || { echo -e "$name\tUNREADABLE"; exit 0; }

SCAFFOLD='^(react|react-dom|next|vite|typescript|tailwindcss|@types/|@radix-ui/|@vitejs/|lucide-react|clsx|tailwind-merge|class-variance-authority|@tailwindcss/|autoprefixer|postcss|eslint|@eslint/|zod|sonner|vaul|cmdk|embla-carousel|input-otp|react-day-picker|react-hook-form|@hookform/|react-resizable-panels|next-themes|tw-animate-css|vite-tsconfig-paths|@tanstack/react-router|@tanstack/router-plugin|@tanstack/react-start)'

f1=0
if [ -f package.json ]; then
  f1=$(python3 -c "
import json,re,sys
try: d=json.load(open('package.json'))
except Exception: print(0); sys.exit()
deps=list(d.get('dependencies',{}))
pat=re.compile(r'''$SCAFFOLD''')
print(1 if [x for x in deps if not pat.match(x)] else 0)" 2>/dev/null || echo 0)
fi
if [ "$f1" = "0" ]; then
  for m in requirements.txt pyproject.toml */requirements.txt; do
    [ -f "$m" ] && grep -qE '^[a-zA-Z]' "$m" 2>/dev/null && { f1=1; break; }
  done
fi

f2=0; git log --all --format='%an' 2>/dev/null | grep -qviE 'bot\]|lovable|gpt-engineer' && f2=1

f3=0; git log --all --merges --format='%s' 2>/dev/null | grep -qiE 'merge (pull request|pr )' && f3=1

f4=0; { [ -f CLAUDE.md ] || [ -f AGENTS.md ] || [ -d docs ]; } && f4=1

# --- F5 ---------------------------------------------------------------------------------
deploycfg=0
for f in vercel.json netlify.toml fly.toml Dockerfile render.yaml app.yaml; do [ -f "$f" ] && deploycfg=1; done
ls .github/workflows/*deploy* >/dev/null 2>&1 && deploycfg=1
liveurl=0
if [ -f README.md ]; then
  grep -qoE 'https?://[a-z0-9.-]+\.(vercel\.app|netlify\.app|fly\.dev|onrender\.com|streamlit\.app)' README.md 2>/dev/null && liveurl=1
fi
recipientdoc=0
ls docs/*PILOT* docs/*CLIENT* docs/*INVESTOR* docs/*LAUNCH* docs/*READINESS* \
   *OFFER* product/OFFER* docs/*manager* >/dev/null 2>&1 && recipientdoc=1
hastag=0; [ "$(git tag 2>/dev/null | wc -l)" -gt 0 ] && hastag=1
f5=0
{ [ "$deploycfg" = "1" ] && [ "$liveurl" = "1" ]; } && f5=1
[ "$recipientdoc" = "1" ] && f5=1
[ "$hastag" = "1" ] && f5=1

# Measured across ALL refs. The n=25 scan measured the default branch only, which understates
# activity wherever the operator works on branches: Contradiction_loss reads 282d on main and 77d
# across refs; keepath 231d vs 74d; CandiApp 273d vs 205d. Both are reported.
lastts=$(git log --all -1 --format='%at' 2>/dev/null)
defbr=$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's|origin/||')
[ -z "$defbr" ] && defbr=$(git branch -r 2>/dev/null | grep -E 'main|master' | head -1 | sed 's|.*origin/||')
defts=$(git log -1 --format='%at' "origin/$defbr" 2>/dev/null || echo "$lastts")
[ -z "$defts" ] && defts="$lastts"
days=$(python3 -c "
import datetime
print((datetime.date(*[int(x) for x in '$REF_DATE'.split('-')]) - datetime.datetime.utcfromtimestamp($lastts).date()).days)" 2>/dev/null || echo 99999)
defdays=$(python3 -c "
import datetime
print((datetime.date(*[int(x) for x in '$REF_DATE'.split('-')]) - datetime.datetime.utcfromtimestamp($defts).date()).days)" 2>/dev/null || echo "$days")
r=0; [ "$days" -le 30 ] 2>/dev/null && r=1

# Is this software at all? The n=25 scan assigned Tier D ("non-software or empty repo") by hand;
# reproduce it mechanically so the old/new comparison isolates F5 rather than my re-implementation.
nsrc=$(find . -path ./.git -prune -o -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.py' \
   -o -name '*.js' -o -name '*.jsx' -o -name '*.go' -o -name '*.rs' -o -name '*.java' \) -print 2>/dev/null \
   | grep -vcE 'node_modules|/dist/')
software=0; { [ "$nsrc" -ge 2 ] || [ -f package.json ] || [ -f requirements.txt ] || [ -f pyproject.toml ]; } && software=1

count=$((f1+f2+f3+f4))
# old rule: A=3-4, B=1-2, C=0 (D assigned by hand for non-software)
if   [ "$software" = "0" ]; then old=D
elif [ $count -ge 3 ]; then old=A
elif [ $count -ge 1 ]; then old=B
else old=C; fi
# new rule: the top tier requires a consumer AND current work
if   [ "$software" = "0" ]; then new=D
elif [ "$f5" = "1" ] && [ "$r" = "1" ]; then new=A
elif [ $count -ge 3 ]; then new=B
elif [ $count -ge 1 ]; then new=C
else new=D; fi

printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" \
  "$name" "$f1" "$f2" "$f3" "$f4" "$count" "$f5" "$r" "$days" "$defdays" "$nsrc" "$old" "$new"
