# COR-SYS Migration Test — Honest Log

> Goal: take COR-SYS from 1/4 to 4/4 using ONLY the CRP discipline playbook
> (`products/playbooks/crp-discipline.md`). No internal knowledge from lessons author.
> Track: time per step, playbook clarity, gaps that required external interpretation.

## Starting state (verified by crp-lint)

- R1: ✓ (CLAUDE.md with Gate 0 + read order — already present)
- R2: ✗ no research/repo-index.md
- R3: ✗ no pipelines/
- R4: ✗ no .claude/skills/
- W2: ✓ LOG.md human-authored

Score: 1/4 + 1/3

---

## Migration attempt — strict playbook-only mode

### Step 1: R2 — Machine-queryable index

**Playbook instruction**:
> A file at `research/repo-index.md` containing a list of entries (projects, modules,
> features), each introduced by a level-2 markdown heading: `## <entry-name>`.
> Each entry has 4-8 lines: status, key findings, what to watch for, related files.
> Minimum: 3+ entries.

**AMBIGUITY DETECTED #1**: The playbook says "projects, modules, features" — but the
spec section R2 says headings must be nouns "typically a project, repo, or domain name".

For COR-SYS — a single-repo product, not a portfolio — what goes in `repo-index.md`?
The playbook examples (and lessons itself) use multi-repo entries. There's no example
in the playbook for what a single-repo project should put here.

**Choice I made**: list COR-SYS subsystems (DSM Engine, CBR Engine, Resilience Formula).
This may or may not be what the spec author intended.

**Concern**: if I'm guessing what to put here, every buyer will guess differently.
**Playbook gap #1**: missing single-repo example.

### Step 2: R3 — Session protocols

**Playbook instruction**:
> Mandatory file: `pipelines/dual-repo-session.md` — what Claude should do when working
> on your repo with another repo open as reference.

**STRUCTURAL PROBLEM #1**: COR-SYS doesn't have a meaningful dual-repo use case. It's
a Next.js product with no pair-repo workflow. To satisfy R3, I have to invent a scenario
or write a stub.

**Choice I made**: write a stub `dual-repo-session.md` describing what to do if a
developer opens COR-SYS alongside a related repo (e.g., a client engagement repo).
This is hypothetical — there is no such repo in COR-SYS's history.

**Concern**: forcing dual-repo-session.md on every CRP is wrong for products that
aren't designed for cross-repo work. **Spec issue, not just playbook gap**.

### Step 3: R4 — Reusable behaviors

**Playbook instruction**:
> A directory `.claude/skills/` with at least one Markdown file, each defining a named
> behavior Claude can invoke.

**ASYMMETRY DETECTED**: COR-SYS already has `skill.md` (singular file) at the root,
mentioned in its CLAUDE.md Gate 0 read order. The playbook doesn't address how to
migrate from a single skill.md to a `.claude/skills/` directory structure.

**Choice I made**: copy skill.md content into `.claude/skills/plan-skill.md`. This
duplicates content rather than restructuring.

**Concern**: the spec mandates `.claude/skills/` even when a single skill.md serves
the same purpose. This is closer to **cosmetic** than architectural, contradicting
my earlier framing.

---

## Time spent on each step (estimated)

| Step | Playbook estimate | Actual (this test) | Reason for difference |
|------|-------------------|--------------------|-----------------------|
| R2 | 2-4 hours | 30 min (3 stubs) | I'm not writing real entries; I'm satisfying the linter |
| R3 | 1-2 hours | 15 min (1 stub) | Same — hypothetical content |
| R4 | 30 min | 5 min | Just copy existing file |
| **Total** | **4-7 hours** | **~50 min** | **All stubs, no real value added** |

---

## Verdict on the migration attempt

**The linter will pass.** I will get 4/4. But the resulting CRP-compliant COR-SYS
will be:
- `repo-index.md` with 3 entries I invented to satisfy the rule
- `dual-repo-session.md` describing a non-existent workflow
- `.claude/skills/plan-skill.md` that duplicates `skill.md` (still at root)

**A Claude Code session starting cold on this "migrated" COR-SYS will not benefit**
because the new files don't reflect real knowledge — they reflect linter compliance.

This is the **vacuous specificity** problem in action. The spec is so narrow that
satisfying it requires content that doesn't serve the underlying goal (faster session
bootstrap).

---

## Findings — what the migration test actually proved

1. **Spec is product-specific to lessons-class repos**. Single-product Next.js apps
   like COR-SYS don't have natural content for `research/repo-index.md` or
   `pipelines/dual-repo-session.md`. Forcing them produces noise, not signal.

2. **Playbook has 3+ ambiguities** that require external interpretation:
   - What goes in repo-index for single-repo projects (no example provided)
   - Whether dual-repo-session.md is required when there's no second repo
   - How to migrate from skill.md to .claude/skills/ directory

3. **Time estimates in playbook are misleading**. The 4-8 hour estimate assumes
   real content. To pass the linter alone takes 50 minutes — but produces files
   that don't serve the goal.

4. **The 30% citation rate / Gate 0 / etc. claims** require the operator to write
   real domain content. The playbook does NOT distinguish between "satisfy linter"
   and "satisfy underlying goal".

---

## Recommendation

DO NOT publish the playbook in its current form. Revisions required:

1. **Add single-repo example for R2** — show what repo-index.md looks like for a
   non-portfolio project. Or relax R2 to allow this.

2. **Make R3 conditional** — `dual-repo-session.md` should be mandatory only for
   repos that participate in cross-repo workflows. Otherwise it's busy-work.

3. **R4 should accept skill.md OR .claude/skills/** — both serve the same function;
   forcing a directory structure is cosmetic.

4. **Differentiate "linter pass" from "discipline applied"** in the playbook. The
   real value of CRP is content quality, not file structure. Currently the playbook
   sells the structure.

After these revisions: re-test on a different repo (groundstate-protocol or
ampaign-craft). If a second-repo migration produces real value, the playbook is
ready. If it again degenerates to stubs, the discipline doesn't generalize beyond
lessons.

---

## Honest answer to the kill gate

The user's revised kill gate: "how many buyers successfully migrate their repo to
CRP-compliant after reading the playbook".

Based on this migration test: **buyers will pass the linter quickly, but will not
experience the promised ROI** (faster sessions, less re-explanation). They will
suspect the playbook delivered structure but not substance — which is correct.

**The product as currently scoped is not ready for sale.**

---

## v0.2 follow-up — adaptive recalibration

The failure of v0.1 was diagnosed as **vacuous specificity**: a spec so narrow that
satisfying it requires content that doesn't serve the underlying goal.

v0.2 adds content-quality tier (sharpness scoring) borrowed from Genesis validator.
Five rules (S1-S5) measure: file existence in Gate 0 list, repo-index entry density
and citation presence, pipeline step count, skill structure, citation density across
all CRP files.

### Empirical v0.2 results

| Repo | Structural | Sharpness | Verdict |
|------|-----------|-----------|---------|
| lessons (real content) | 4/4 | **75/100** | ✓ CRP-COMPLIANT |
| COR-SYS post-stub-migration | 4/4 | **60/100** | ⚠ STRUCTURAL ONLY |
| COR-SYS original (no migration) | 1/4 | ~25/100 | ✗ NOT COMPLIANT |

The 15-point gap between real and stub at structural=4/4 is the discriminator v0.1
lacked. v0.2 correctly identifies the stub-pass as not CRP-compliant.

### What this proves and doesn't

**Proves**:
- Stub content does NOT pass v0.2 (sharpness rejects placeholder words, low density, no citations)
- Real content does pass v0.2 (lessons at 75)
- The gap is wide enough to be a real signal, not noise

**Doesn't prove**:
- That v0.2 catches all stub variants (especially content duplication)
- That a repo passing v0.2 will deliver the behavioral promise (fast cold-start sessions)
- That the spec generalizes to single-product repos without modification

### Next gate

Before reviving the playbook, the v0.2 content-quality rules must be:
1. Documented in the playbook with examples of substantive vs stub entries
2. Re-tested via a second migration attempt on COR-SYS where the goal is sharpness ≥70,
   not just structural pass
3. The time to substantive (≥70) migration measured, vs the original 4-8 hour estimate

If migration to sharpness ≥70 takes ≥4 hours of real content work — playbook is honest.
If it takes <1 hour — content threshold needs to be tightened further.

Until that test runs, the playbook stays recalled.
