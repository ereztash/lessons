# CRP Compliance Scan — n=8 Portfolio Test

> Generated 2026-05-13. Independent linter (`/tmp/crp-lint-independent.ts`, built by a
> separate Agent from `saas/spec/crp-spec.md` text only) applied to 8 repos in the
> ereztash portfolio. Goal: test whether the CRP spec discriminates real-world repos.

## Method

1. Fresh Agent received `saas/spec/crp-spec.md` text only — no access to existing code
2. Agent produced a standalone TypeScript linter implementing 4 required rules (R1-R4) + 3 warnings (W1-W3)
3. Linter run against 8 repos: lessons (designed as CRP), 7 others from portfolio scan

## Master result table

| Repo | Tier | R1 Gate0 | R2 Index | R3 Pipelines | R4 Skills | W1 MEM | W2 LOG | W3 Self | Score |
|------|------|----------|----------|--------------|-----------|--------|--------|---------|-------|
| **lessons** | A | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | **4/4 + 3W** |
| COR-SYS | A | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | 1/4 + 1W |
| ampaign-craft | A | ✗* | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | 0/4 |
| groundstate-protocol | A | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | 0/4 |
| brain-healer-hub | B | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | 0/4 |
| org-fortify | B | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | 0/4 + 1W |
| keepath | B | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | 0/4 |
| kolzchut | B | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | 0/4 |

*ampaign-craft has CLAUDE.md but no "Gate 0" section — so the file exists but doesn't function as a bootstrap protocol entry point.

## Kill gate verdict

**Spec discriminates.** Of 7 repos not designed as CRPs:
- 6 score 0/4 (all required rules failed)
- 1 scores 1/4 (COR-SYS — passed R1 only)
- 0 score 2+/4

If 3+ of these had scored 3-4/4, the spec would have been too broad. Outcome: spec is sharp.

## Failure-mode taxonomy

### Architectural failures (cannot fix in <8 hours)
- **R2 (machine-queryable index)** — 7/7. Multi-repo perspective is rare. Only lessons has it.
- **R3 (session protocols as files)** — 7/7. Inline-instructions-in-CLAUDE.md is the default pattern.
- **R4 (.claude/skills/ directory)** — 7/7. COR-SYS has `skill.md` (singular); no repo uses the multi-file pattern.

### Cosmetic failures (fixable in <2 hours)
- **R1 (Gate 0 section)** — 1/7 (ampaign-craft). Has CLAUDE.md but no Gate 0 section. 30-minute fix.

### Optional infrastructure
- **W1 (MEMORY.md)** — 0/7. State persistence absent everywhere except lessons.
- **W2 (LOG.md human-authored)** — 2/7 (COR-SYS, org-fortify). Both have LOG.md with domain content.
- **W3 (self-fixture)** — 0/7. None have run Genesis on themselves.

## Key finding for product strategy

CRP gaps in real-world Tier A repos are **architectural, not cosmetic**:
- ampaign-craft is one Gate 0 section away from R1, but still fails R2-R4 architecturally
- COR-SYS passes R1 but the absence of R2 (multi-repo index), R3 (pipelines), R4 (skills dir) reflects a single-repo mental model, not missing files

**Implication**: CRP is a *build-from-scratch standard*, not a migration target. The tooling needed is a scaffolder (Genesis), not a converter. This aligns with Genesis Mode's existing forward-compile architecture.

## Residual circularity

The spec was authored by the same operator who designed lessons. A truly independent validation would require either:
1. A third-party repo author (not ereztash) attempting to build a CRP-compliant repo from the spec alone
2. An external rater applying the spec to repos outside the ereztash portfolio

Until either occurs, this scan should be cited as *internal validation*, not *external evidence*.

## Cross-reference

- Spec: `saas/spec/crp-spec.md` (v0.1, 4 required + 3 optional rules)
- Linter: `saas/app/scripts/crp-lint.ts` (operator-authored, 7 required + 5 warnings)
- Independent linter: `/tmp/crp-lint-independent.ts` (Agent-authored from spec, 4 req + 3 warn)
- Portfolio scan source data: `research/portfolio-scan/26-repos.md`
