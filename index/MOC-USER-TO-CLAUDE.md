# MOC — User → Claude

> Map of Content: every promoted insight about how the user prompts, scopes, supplies context, and hands off to Claude.

**Dimension definition**: The user side of the loop. How ereztash:
- Frames requests (specificity, scope)
- Supplies context (links, prior decisions, constraints)
- Decides plan-mode vs. direct execution
- Reviews and feeds back
- Captures learnings for future sessions

In this dataset, the user→Claude surface is dominated by the *cognitive medium* the operator chooses — language (Hebrew vs English vs bilingual), branch lifecycle, and the structured tooling (slash commands, CLAUDE.md gates) that frames each session.

## Patterns in this dimension

### hebrew-bilingual-cognition-medium
**Source observations**: cor-sys@10:08 (root CLAUDE.md English, `index/CLAUDE.md` bilingual HE+EN — Hebrew section headers, English value names; SWC patched to ascii_only rather than removing Hebrew); groundstate-protocol@11:04 (Hebrew RTL PR templates with `## האסטרטגיה`, `## מה השתנה`, `## בדיקות`); chess-mind-patterns@11:02 (1.8% of bot commits leak Hebrew prompt subjects — `שופר ייצוא דו"חות`)
**Description**: The operator's thinking medium is mixed Hebrew + English. Research PDFs are in Hebrew; code is English; architecture documentation is bilingual; commit subjects sometimes leak the prompt language verbatim. The bilingualism is not localization — it is a single cognitive architecture expressed in two registers. The cost is an infrastructure-level engineering risk (cor-sys's 13-commit Hebrew encoding war ended in patching the SWC minifier to force `ascii_only: true` rather than removing Hebrew). The operator pays the infrastructure cost rather than losing semantic anchors.
**Monetization fit**: borderline — highly specific to a Hebrew/English operator; portable to Arabic/Hebrew/CJK operators with similar bilingual cognition; not portable to monolingual English operators. Productize as a "bilingual-CLAUDE.md template + encoding-pre-flight checklist" niche playbook.

### branch-as-sprint-container
**Source observations**: groundstate-protocol@11:06 (`claude/landing-page-redesign-i1Mwg` carried 5 PRs in 5 hours; `claude/audit-landing-page-OR0tf` carried 3 PRs in 2 hours; branches never reused across days); cor-sys@10:07 (longer-lived `claude/add-ustt-primitives-wiqLc` carried 3 PRs over half a day, but desynced when reused after master-bypass commits)
**Description**: The auto-named `claude/<task>-<hash>` branch is the unit of editorial focus for one sprint day. Each PR within the branch is a checkpoint inside that sprint. Branches are not reused across sprint days. This rhythm — high-frequency, short-lived branches with 3-5 PRs each — matches how the operator's editorial work converges within hours rather than days. The pattern fails when a branch is reused after a direct master-bypass commit (cor-sys's 3 closed-unmerged PRs on the same branch).
**Monetization fit**: pass — directly portable as a "branch = sprint, PR = checkpoint" template; couples with an auto-cleanup rule for stale `claude/*` branches.

## Candidate raw observations (single-repo, not promoted)

- skills-as-research-decision-tree-translation (cor-sys@10:02 only — 4 heuristic skills landed in one commit predating use by 6 days)
- pre-build-validation-protocol-retrofit (cor-sys@10:05 only — Pre-Build Validation Protocol retrofitted after 3-hour rework)
- slash-commands-as-session-lifecycle (cor-sys@10:09 only — 8 slash commands as a cognitive scaffold)
- personification-engine-naming (core-unified@12:03 only — engine modules named after Hebrew given names; opaque to resumers)
- port-verb-implies-external-prior-artifact (core-unified@12:10 only — `Port Alma` verb signals downstream-from-external-concept)

## Related playbooks

_(populated by `/lesson-ship` in Phase 4)_

## Cross-references

- Companion matrix: `/research/cross-repo/patterns-matrix.md`
- Narrative: `/research/cross-repo/synthesis.md` § 4, § 8
- Source observations:
  - `/research/cor-sys/extracted-insights.md`
  - `/research/groundstate-protocol/extracted-insights.md`
  - `/research/chess-mind-patterns/extracted-insights.md`
  - `/research/core-unified-consciousness/extracted-insights.md`
- Schema: `/insights/_template.md`
- Pipeline: `/pipelines/insight-extraction.md`

---

## Round 2 additions (2026-08-19 ingestion round)

### contract-check-as-ci-gate
**Source observations**: MATI `.github/workflows/ci.yml` (`check:signals`, `check:design`, `check:semantic-ux` run before the production build, plus `npm audit --omit=dev --audit-level=high`); MATI#13 (the semantic-UX contract was written because two fields collected the same semantic fact); anti-silo@cb96bf4 (250-line module guard test); ampaign-craft `eslint.config.js` (`no-restricted-imports` enforcing the ViewModel boundary)
**Description**: A hand-written, project-specific checker — not a linter preset — that encodes **domain** policy and fails the build: a privacy floor of 5 participants, an RTL/accessibility contract, a rule that two fields may not collect the same fact, a module-size ceiling, an import boundary. Same family as COR-SYS's `LOG.md`: a rule the operator would otherwise re-explain every session, moved into a machine. The novelty is the subject matter — these gates encode product policy and authority boundaries, not code style. A CI gate is the only artifact an agent cannot talk its way past.
**Caveat carried from the evidence**: MATI's checks match source text with regular expressions, so a rename disables them silently. A contract check needs its own test.
**Monetization fit**: pass — template + checklist ("which of your session rules is a build failure?").
**Distilled insight**: pending distillation

### claude-branch-as-default-branch
**Source observations**: Agent-Architect (`git remote show origin` → `HEAD branch: claude/agent-architect-test-fixtures-mA6dz`; no `main` exists; 20 of 21 commits by Claude; dormant 87d); keepath (default branch `claude/modular-system-design-kJg0a`, never merged to main; dormant 133d at scan time)
**Description**: When the agent's working branch becomes the trunk, nobody ever performed the "accept this into the project" act. Both known instances are dormant, and neither has an abandoned *feature* — they have an unclaimed *whole*. Diagnostic: `git remote show origin | grep 'HEAD branch'`; if it starts with `claude/` or `agent/`, the resumption task is **adoption, not code** — create `main`, merge, then decide. Adding features to an unclaimed trunk repeats the failure that created it.
**Monetization fit**: pass — a one-line check plus a re-entry ritual; slots into the `resumer-day-prep` playbook.
**Distilled insight**: pending distillation

### language-splits-by-agent-surface *(candidate — 1 repo)*
**Source observations**: MATI — all 13 `agent/*` PRs are Hebrew against a fixed `## מה השתנה / ## למה / ## בדיקה` template; all `claude/*` PRs are English prose with no template (PR#18 ≈1,400 words). Clean across 18 PRs.
**Description**: Refines `hebrew-bilingual-cognition-medium`: the language is a property of the *surface*, not the operator. Hebrew + fixed template = a scannable changelog from the build surface; English + open prose = reasoning from the audit surface, read once and deeply. The operator never has to ask which kind of document they are looking at. Parked until a second bilingual multi-surface repo appears.
