# Four-Feature Tier Classifier — Portfolio Triage in 30 Seconds Per Repo

> Tagline: Score any AI-paired repo on four binary features and get back a tier (A / B / C) plus a recommended next action.

## Target buyer

**Solo AI-paired builders with portfolios of 5+ LLM-tool-paired repos who feel overwhelmed when reviewing their portfolio and want a defensible rule for "what to do with this repo right now."**

More specifically: indie hackers, consultants, and tech leads using Lovable / Bolt / v0 / Replit Agent who have accumulated repos faster than they can mentally track and want a 30-second triage rule per repo.

## Rework hours saved per session

**1-3 hours per portfolio review** for a 10-repo portfolio (10 repos × 6-18 minutes saved per repo by replacing "try to remember what this repo was" with a 30-second mechanical scoring).

If used continuously, prevents at least one wrong-direction investment per quarter (e.g., installing CLAUDE.md on a Tier-C-finished repo, or letting a Tier-B repo expire past its 30-day resumption window). Estimated annual savings: 8-20 hours.

## Problem statement

A solo builder with 10+ AI-paired repos in their GitHub account does not remember the state of each repo. Returning to a dormant repo, they spend 10-20 minutes trying to reconstruct: did I finish this? Was I planning to come back? Is the code production-grade or a render demo? This disorientation cost compounds across portfolio reviews. The four-feature tier classifier replaces the disoriented review with a mechanical scoring: four yes/no questions answerable in <30 seconds via the GitHub API or a quick browse, producing a tier (A / B / C) and a recommended next action (resume now / promote / archive). The classifier is a *lower bound* on system-mode commitment — it can be wrong in one direction (a Tier-A-by-discipline repo like groundstate-protocol can score B by feature count) but never in the other direction (a 4/4 repo is genuinely Tier A).

## The playbook

### The four features (binary: yes / no)

1. **Non-template production dependency**: Does package.json list any production dep that is NOT in the platform's default template? For Lovable's vite_react_shadcn_ts: anything beyond React, Vite, shadcn-ui defaults, TanStack Query, react-router-dom counts. **Diagnostic**: `cat package.json | jq '.dependencies | keys'` and subtract the template defaults.
2. **Human commit ever**: Does `git log --all --pretty=format:'%an'` show any author other than `lovable-dev[bot]`, `vercel-bot`, or other tool bots? `Claude <noreply@anthropic.com>` counts. `Co-Authored-By: Claude` trailers also count.
3. **Any PR ever**: Does `mcp__github__list_pull_requests(state='all')` return ≥1? Merged or closed-unmerged both count.
4. **CLAUDE.md or docs/**: Does the repo root contain a CLAUDE.md file, OR does it contain a `docs/` folder with ≥1 `.md` file? Either is sufficient.

### Scoring → Tier

| Feature count | Tier | Recommended action |
|---|---|---|
| 4/4 | A (managed system) | Continue investment; treat as production-grade |
| 3/4 | A-borderline | Identify the missing feature; if it's CLAUDE.md, write it now (≤30 min); else continue |
| 2/4 | B (resumed prototype) | If repo is <30 days dormant, stage a 72-min resumption sprint; if >30 days dormant, archive after one final classifier review |
| 1/4 | B-emerging | Decide explicitly whether to climb to Tier B or archive; do not let it drift |
| 0/4 | C (publish-and-go) | Archive without guilt; the repo is finished by its own success condition |

### CLI / GitHub Action implementation

For portfolio-wide scoring, run this script (pseudocode):

```bash
for repo in $(gh repo list <owner> --json name --jq '.[].name'); do
  deps=$(gh api repos/<owner>/$repo/contents/package.json --jq '.content' | base64 -d | jq -r '.dependencies | keys[]')
  non_template_deps=$(comm -23 <(echo "$deps" | sort) <(cat template-defaults.txt | sort))
  has_human_commit=$(gh api repos/<owner>/$repo/commits --jq 'map(select(.commit.author.name != "lovable-dev[bot]" and .commit.author.name != "vercel-bot")) | length' | jq 'if . > 0 then 1 else 0 end')
  has_pr=$(gh api repos/<owner>/$repo/pulls?state=all --jq 'length' | jq 'if . > 0 then 1 else 0 end')
  has_claude_md=$(gh api repos/<owner>/$repo/contents/CLAUDE.md 2>/dev/null && echo 1 || echo 0)
  feature_count=$(echo "$non_template_deps $has_human_commit $has_pr $has_claude_md" | tr ' ' '\n' | grep -v '^0$' | wc -l)
  echo "$repo,$feature_count"
done | sort -t, -k2 -n
```

For the operator without `gh` CLI, the same checks run via MCP `mcp__github__list_commits`, `mcp__github__list_pull_requests`, `mcp__github__get_file_contents`.

### CSV output schema

```csv
repo,non_template_dep,human_commit,any_pr,claude_md_or_docs,feature_count,tier,recommended_action
cor-sys,1,1,1,1,4,A,continue
groundstate-protocol,1,1,1,0,3,A-borderline,write CLAUDE.md
chess-mind-patterns,1,1,0,0,2,B,resumption sprint if <30d
core-unified-consciousness,0,0,0,0,0,C,archive
```

## Evidence

- **cor-sys**: 4/4 features. 32+ docs files, full CLAUDE.md / LOG.md / skill.md, 16 PRs, many non-template deps (Tier A, confirmed). Reference: cor-sys@10:00, cor-sys@10:09.
- **groundstate-protocol**: 2-3/4 features. Has non-template deps (Web3Forms, GA4, Calendly), Claude commits, 10 PRs, but NO CLAUDE.md. Functions as Tier A through editorial discipline (PR templates substituting for docs). Reference: groundstate-protocol@11:00, groundstate-protocol@11:04.
- **chess-mind-patterns**: 2/4 features. Has `chess.js@^1.4.0` (one non-template dep) and 3 human commits, but no PRs, no CLAUDE.md, no docs. Tier B, dormant at 50 days as of dataset cutoff. Reference: chess-mind-patterns@11:00, chess-mind-patterns@11:01.
- **core-unified-consciousness**: 0/4 features. Zero non-template deps; zero human commits; zero PRs; no CLAUDE.md. README still has `REPLACE_WITH_PROJECT_ID` ×3. Tier C, abandoned at 64 days. Reference: core-unified-consciousness@12:00, core-unified-consciousness@12:01.

The four-feature partition cleanly separates the dataset into the three tiers, with one borderline case (groundstate) that the classifier correctly flags as needing manual override.

## When to use

- Quarterly portfolio reviews of your AI-paired repos
- Onboarding a new tool (e.g., switching from Lovable to Bolt.new) — classify your old repos to decide which to migrate
- Before investing time on a dormant repo: classify first, decide second
- As a teaching tool for indie hacker friends auditing their own portfolios

## When NOT to use

- Production systems (the classifier is for prototypes and prototype-to-system transitions)
- Repos with active external collaborators (the classifier assumes single-operator dynamics)
- Repos bootstrapped without a recognizable template (the non-template-dep test requires a known baseline)

## Adoption checklist

1. [ ] I have saved the four-feature definitions as a snippet in my notes.
2. [ ] I have run the scoring script (or manual equivalent) against my current portfolio at least once.
3. [ ] I have a CSV row per portfolio repo with feature counts and tier.
4. [ ] I have identified any Tier-A-borderline repos (3/4) and decided whether to climb to 4/4 or accept 3/4 as functional.
5. [ ] I have archived any Tier-C-zero repos that are >60 days dormant.
6. [ ] I have scheduled a quarterly re-classification reminder.
7. [ ] I have shared the classifier with one peer to test reusability.

## Cross-references

- Insight source: `/insights/user-to-user/tier-classifier-cli.md`
- Companion playbook: `/products/playbooks/publish-button-intent-triage.md`
- Companion playbook: `/products/playbooks/resumer-day-prep.md`
- Pricing row: `/products/pricing-hypotheses.md`

---

## Accuracy disclosure — added 2026-08-19

This playbook sells an instrument that has now been measured. On a 10-repo answer key built from
signals it cannot see (`ground-truth/results-2026-08-19.md`):

| | |
|---|---|
| Exact tier agreement | **2 / 10 (20%)** |
| Within one tier | 9 / 10 (90%) |
| Direction of error | **8 over-rated, 0 under-rated** |
| Rank correlation (Spearman ρ) | **0.77** |

**What the buyer should be told:** the classifier *orders* a portfolio reliably and *over-rates it
by roughly one tier*. Read the output as a ranking, not as a verdict — and subtract a tier before
acting on any single repo's score.

**Why it over-rates:** F1–F4 detects apparatus (a dependency, a human commit, a PR, a docs folder).
Apparatus was an expensive signal of commitment when a developer had to produce it; in an AI-paired
workflow it costs an afternoon — `MATI` acquired all four features in eleven hours. Every one of the
8 errors is a repo with no external consumer that has not been touched in 30+ days, and F1–F4
measures neither.

**Untested:** all 10 repos in the answer key are executable and none is inert, so the classifier's
Tier C/D discrimination has never been measured. The measurement is also a self-audit — one
labeller, not blind (`ground-truth/rubric.md` §5).

Until an external-consumer feature lands and is validated prospectively, the honest claim for this
playbook is *"ranks a portfolio; over-rates about one tier"* — which is still worth the price, and
is a claim the buyer can check.
