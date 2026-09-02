# Resolving a contested cell by rule instead of by rating — `per-project-git-identity`

**Date:** 2026-08-19 · **Instrument:** `scripts/detect-project-identity.sh` (`--selftest` passes 9/9)
**Population:** all 40 repositories in `ground-truth/repo-paths.tsv`, every ref, every commit.

## 1. Why this was not a fourth rating round

The user asked for `per-project-git-identity` to be checked in the next round. Round 3's three
raters split **0 / 0 / 2** on the cell `per-project-git-identity @ anti-silo` against the
incumbent's 2, and the pattern was flagged AT RISK: with anti-silo at 0 it had one repo at ≥2 and
would fail the `≥2 in ≥2 repos` promotion rule.

Reading the three justifications, the disagreement was **definitional, not observational**. All
three raters saw the same identities. They disagreed on whether a different *name form* (`Erez`
vs `ereztash`) counts as a per-project identity, or whether an explicit project marker such as
`(COR-SYS)` is required. Adding raters cannot settle that — a fourth rater would be a fourth
opinion about a definition, and the ICC would measure agreement about wording.

So the judgment was converted into a rule, the rule was written down before it was run, and the
rule was run over the whole portfolio instead of the three cells a rater happened to be handed.

One rater's stated ground was also **factually checkable and false**: fable justified 0 by
`Erez|Erez2812345@gmail.com` appearing "in no other inspected repo". It appears in two
(anti-silo 61 commits, dod-validator 1) — and under the rule that makes it *shared*, which
supports a 0 for a different reason than the one given. A blind rater's justification is evidence
to check, not evidence.

## 2. The rule

```
A project-specific identity is an author identity carrying an explicit project marker —
a project name inside the author name, OR an email at a project-owned domain — that does
NOT appear in any other repository in the portfolio.

3  a project-marked identity carries the majority of human commits
2  a project-marked identity is present but is a minority
1  an identity unique to this repo, but with no project marker (a name-form variant)
0  only identities shared with other repositories
-  no human commits at all — reported, never silently dropped
```

`--strict` adds one requirement: **the marker must name this repository**. Both readings are
defensible, so the script measures both and reports both rather than one being chosen quietly.

**Ordering disclosure:** the loose rule was written and run first; `--strict` was added *after*
seeing that `_crm`'s marker names a different project. That ordering is post-hoc and is the
reason the strict result is reported as a counterfactual below rather than as the headline.

## 3. Result

| repo | loose | strict | evidence |
|---|---|---|---|
| COR-SYS | **3** | **3** | `COR-SYS Dev\|97252@cor-sys.local` — 32/50 human commits, a project-owned email domain |
| `_crm` | **3** | 1 | `Erez (COR-SYS)\|Erez2812345@gmail.com` — 144/248; the name spans a second address (`hnoar.hr@gmail.com` ×81), 225 commits in total. The marker names **COR-SYS**, not `_crm` |
| ex2 | 1 | 1 | `CSI-BIU\|csi.biu2024@gmail.com` (7/7) — repo-unique, no marker |
| anti-silo | **0** | 0 | only identities shared with other repos |
| all other 34 | 0 | 0 | — |
| brain-healer-hub, core-unified-consciousness | – | – | no human commits at all (scaffold/agent-only) |

`Erez (COR-SYS)` appears in exactly one repository — `_crm` — and **not** in COR-SYS itself, whose
own marked identity is `COR-SYS Dev`.

## 4. What this does to the pattern

Three things, and they point in different directions:

1. **The recorded cells were both wrong.** The matrix held `_crm` 3 + anti-silo 2. anti-silo is
   **0** — the raters who scored it 0 were right, and the incumbent 2 is withdrawn. `_crm` 3
   survives, and a cell nobody had scored — **COR-SYS 3** — is the pattern's strongest instance.
2. **The promotion survives the loose rule and fails the strict one.** Loose: two repos at ≥2
   (COR-SYS, `_crm`) — promoted. Strict: one repo (COR-SYS) — fails. The pattern's survival is
   a definitional choice, not an observation, and saying so is the result.
3. **Two claims were conflated in one row**, which is why it could be contested at all:

| Claim | Verdict |
|---|---|
| *Practice* — the operator deliberately maintains a distinct identity per project | **Confirmed in one repo only** (COR-SYS). Not portfolio-wide. Fails promotion |
| *Hazard* — per-author metrics across this portfolio count one person many times | **Confirmed, and now quantified** (§5). Independent of the marker question |

They are split into two rows in the matrix. Splitting them is not a rescue: the practice row is
demoted to a single-repo candidate, and only the hazard — which no rater disputed and which the
census measures directly — keeps a promotion.

## 5. The hazard, measured

Portfolio-wide census of human identities (bot/Lovable/gpt-engineer/Claude/Cursor excluded):

| commits | identity |
|---|---|
| 760 | `ereztash\|erez2812345@gmail.com` |
| 144 | `Erez (COR-SYS)\|Erez2812345@gmail.com` |
| 81 | `Erez (COR-SYS)\|hnoar.hr@gmail.com` |
| 62 | `Erez\|Erez2812345@gmail.com` |
| 32 | `COR-SYS Dev\|97252@cor-sys.local` |
| 16 | `ereztash\|ereztash@users.noreply.github.com` |
| 7 | `CSI-BIU\|csi.biu2024@gmail.com` |
| 2 | `ereztash\|204869220+ereztash@users.noreply.github.com` |
| 2 | `GitHub User\|user@github.com` |
| 1 | `COR-SYS Dev\|Erez2812345@gmail.com` |

**Ten distinct `name|email` pairs. Eight of them are one person** — 4 display names across 5 email
addresses. `CSI-BIU` is a separate account; `GitHub User` is the web UI's placeholder for nobody.

Two of the eight are produced by **email capitalisation alone** (`erez2812345@` vs `Erez2812345@`);
git compares the raw string, so case splits 760 commits from 207 with no other difference.

A per-author contributor count over this portfolio reports **8 people where there is 1** — an 8×
overcount, and the same failure mode as `agent-identity-collapse`, in the other direction: that one
undercounts machine work by author name, this one overcounts human contributors by author name.
Both say the same thing: **`%an` is not an identity.**

## 6. Reproduce

```sh
scripts/detect-project-identity.sh --selftest            # 9 fixtures, must print PASSED
scripts/detect-project-identity.sh ground-truth/repo-paths.tsv
scripts/detect-project-identity.sh --strict ground-truth/repo-paths.tsv
```

The selftest was verified to **fail** by deleting the `"GitHub User"` placeholder guard: `delta`
went 0 → 1 and the run exited 1. A gate never seen red is not evidence
(`ground-truth/gate-reliability.md`).
