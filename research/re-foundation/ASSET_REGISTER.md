# ASSET REGISTER — Every Meaningful Asset in `lessons`, Audited

> Built 2026-09-03 against `f4fc70a`. One row per meaningful asset or asset family.
> Dispositions are recommendations produced by this audit; nothing is deleted in this phase.
> `DELETE_CANDIDATE` rows are marked and left in place.
>
> Column meanings:
> - **Current authority** — what this artifact is entitled to decide today, given its evidence.
>   `authoritative` / `provisional` / `superseded` / `historical` / `none`.
> - **Still true?** — measured against the repository as of 2026-09-03, not as of writing.
> - **New-platform relevance** — relevance to the candidate assurance thesis, independent of
>   whether the thesis is adopted.

---

## 1. Root documents

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `README.md` | public front door; sells playbooks | Phase 4 shipping round | **superseded** | humans arriving from GitHub | **no** — says "Latest update 2026-05-13", "Phase 8", "Twenty-five repositories"; actual portfolio is 40, last content commit 2026-08-19 | high, as the surface that must state the new thesis | `REFRAME` | it is the only public claim the repo makes and it is stale in three measurable ways |
| `CLAUDE.md` | Gate 0 session-init protocol | itself | authoritative | every session | mostly — its Gate-0 read order works; its source-repo table is a 12-row subset of 40 | high, becomes the agent-authority surface | `KEEP` + `REFRAME` | the protocol holds; the portfolio table inside it should point at `repo-index.md` rather than duplicate it |
| `LOG.md` | append-only enforcement spine: environment facts, 23 anti-patterns, session history | 2026-05-12 onward | **authoritative** | every session; `gate-reliability.md` uses it as the failure denominator | yes | **core** — this is the failure ledger the assurance model calls `Failure / Refutation` | `PROMOTE` | it is the single asset in the repo whose value has been measured (it supplies P for four gates) |
| `MEMORY.md` | state index | checkpoint rounds | provisional | session bootstrap | partly — "Insights distilled: 11" against a measured 17; "Dataset n=30" against 40 | medium | `REFRAME` | its role is right, its numbers are hand-maintained and drift; §19 of the brief applies directly |
| `skill.md` | 5 skills + 6 commands quick-ref | Phase 3 | authoritative | session bootstrap | yes | medium | `KEEP` | accurate and small |

## 2. `research/` — the evidence corpus

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `research/cor-sys/` (7 files) | Phase 1 deep-dive | git+PR+issue survey, 2026-05-12 | historical | patterns-matrix, insights | yes as a record; the repo is dormant 132d | medium | `KEEP AS CORPUS` | first deep-dive; its observations still back promoted patterns |
| `research/groundstate-protocol/` (6 files) | Phase 1 deep-dive | survey 2026-05-12 | **provisional** | patterns-matrix §2.2 | yes, after the 2026-08-19 retraction established it describes the **public** repo | medium | `KEEP AS CORPUS` + `FIELD_REQUIRED` | it still does not name its clone's `git remote` (LOG #18); one line would close it |
| `research/chess-mind-patterns/`, `research/core-unified-consciousness/` | Phase 1 deep-dives | surveys 2026-05-12 | historical | H2 negative control | yes | low-medium | `KEEP AS CORPUS` | `core-unified` is the corpus's only abandonment negative control and must not be dropped |
| `research/mati/`, `anti-silo/`, `agent-architect/`, `crm-google-ai/`, `agency-insight-analyzer/` | ingestion round deep-dives | 2026-08-19 local git | **authoritative** | patterns-matrix rounds 2–3, one-mechanism | yes | **high** — MATI and CRM hold the strongest C4/C6 implementations | `PROMOTE` (the mechanisms) + `KEEP AS CORPUS` (the surveys) | these are where authority-boundary and provenance-guard code actually lives |
| `research/pre-call/`, `research/proofminer/` | round-3 deep-dives | 2026-08-19 local git | **authoritative** | patterns-matrix round 3 | yes | **highest** — `market-ready.md` and `AUTHORITY.md` are the two closest existing analogues to an assurance contract | `PROMOTE` | measured P over 400 runs, a DoD unsatisfiable by code, a bypass log, and a six-axis authority engine |
| `research/cross-repo/patterns-matrix.md` | promotion ledger | rounds 1–3 | authoritative | insights, MOCs | yes; 29 promoted | high — it is the promotion register the model needs | `MIGRATE` to methodology | it is already a promotion engine written as a table |
| `research/cross-repo/synthesis.md` | Phase 2 narrative, H1–H5 | n=4 | **superseded in part** | README, MOCs | H1/H4 rest on the F1–F4 classifier that measured 20% exact accuracy | medium | `HISTORICAL` | it is a correct record of what was believed at n=4; it is not a current verdict |
| `research/cross-repo/authorship-attribution.md` | corrects author-name AI counting | 12-repo measurement | **authoritative** | LOG #11, CLAUDE.md authorship rule | yes | high — agent attribution is a required input to "which agent made this claim" | `PROMOTE` | strongest method result in the repo that is not about itself |
| `research/cross-repo/portfolio-as-one-mechanism.md` | reads the portfolio as one engine, C1–C9 | 12 repos, file-level | **authoritative** | ground-truth round, gap closure | yes | **core** — this document is the assurance model in embryo | `PROMOTE` | C4/C5/C6/C9 are precisely Evidence, Gate, Authority and Positive Control |
| `research/portfolio-scan/26-repos.md` | n=25 classification | 2026-05-12 | **superseded** | README, repo-index | tiers superseded by F5 rescore; AI-tools column known wrong (LOG #11) | low-medium as data, high as a failure case | `HISTORICAL` | keep as the out-of-time test's input; do not cite its tiers |
| `research/portfolio-scan/hypothesis-validation.md` | H1–H8 at n=25 | 2026-05-12 | **superseded** | spec 01 | H6–H8 rest on the same superseded scan | low | `HISTORICAL` | referenced by `saas/spec/01` as its evidence base; the supersession must be marked, not silently fixed |
| `research/portfolio-scan/2026-08-19-rescan.md`, `-cohort2.md` | delta + classifier corrections | 2026-08-19 | authoritative | MEMORY, repo-index | yes | medium | `KEEP AS CORPUS` | |
| `research/repo-index.md` (32 entries) | one-grep repo lookup for dual-repo sessions | scans | **provisional, self-labelled superseded** | `pipelines/dual-repo-session.md` | its own header says the Tier lines are superseded and deliberately unrewritten | high as a **project registry** | `REFRAME` | in the assurance model this is the Project table; its tier column is the part that is stale, not its structure |
| `research/self-application/maya-walkthrough.md` | hypothetical 6th-repo self-test | fabricated by design | **none** (explicitly hypothetical) | gap-closure round | yes, as a marked hypothetical | low | `HISTORICAL` | LOG #9 forbids citing it as data; that rule must survive any migration |

## 3. `ground-truth/` — the measurement layer

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `rubric.md` v1.1 | independent answer key for the tier classifier | derived from signals disjoint from F1–F4 | **authoritative**, with self-stated limits | `score-classifier.py` | yes | **core** — it is a worked example of "evidence independent of the claim" | `PROMOTE` | its §1 independence requirement is a reusable assurance principle, not a repo-specific rule |
| `labels-2026-08-19.json` / `.md` | the 10-repo answer key | rubric v1.1 | authoritative, frozen | scoring | yes | high | `KEEP AS CORPUS` + `DO_NOT_TOUCH` | |
| `results-2026-08-19.md` | first accuracy measurement | n=10 | **authoritative** | everything downstream | yes | **highest** — the single most load-bearing measurement in the repo | `PROMOTE` | 20% exact, 8/10 over-rated, ρ=0.77; it is what makes every tier claim provisional |
| `f5-rescore-2026-08-19.md` | F5 + recency, all 31 rescored | 2026-08-19 | provisional (F5 unvalidated by design) | prediction | yes | high | `KEEP AS CORPUS` | |
| `prediction-2026-08-19.md` | pre-registered prospective test | frozen scores | **authoritative and open** | resolves 2026-11-17 | yes; **75 days remain** | **core** — the repo's only non-circular test | `DO_NOT_TOUCH` | any change to F5's definition before resolution voids it, by its own contamination rule |
| `scores-2026-08-19.tsv`, `-cohort2.tsv` | frozen registered scores | script output | frozen | prediction | yes | high | `DO_NOT_TOUCH` | editing them invalidates the open test |
| `gate-reliability.md` | P×C on this repo's own gates | LOG anti-patterns as denominator | **authoritative** | this audit | yes | **core** — it is a positive-control result about the repo's own gates | `PROMOTE` | it produced the rule "a green check never seen to go red is not evidence" |
| `bypass-log.md` | record of gate overrides | ported from pre-call | authoritative | `check-lessons-contract.py --bypass` | yes | **core** — this is the Waiver register | `MIGRATE` | it already is the object the model calls a waiver |
| `repo-paths.tsv` | local clone paths for scoring | environment | provisional | scripts | environment-dependent | low | `KEEP` | |

## 4. `insights/` and `index/`

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `insights/_template.md` | the insight schema | ported from CRM / MATI / Agent-Architect / proofminer | **authoritative** | `check-lessons-contract.py` | yes | **core** — it is already a claim record with authority fields | `MIGRATE` | `evidence-resolves-to`, `may-report`, `may-assert-cause`, `reversibility`, `score-history` are Evidence, Authority and Lineage in miniature |
| 17 insight files | distilled, monetization-gated rules | 76 observations | **provisional** | playbooks, MOCs | yes as records; **12 of 17 resolve `mixed`**, 10 assert cause on ≤6 repos of one operator | high as the first test corpus | `KEEP` + `FIELD_REQUIRED` | none has been tested outside this operator's portfolio |
| `index/MOC-*.md` (4 dimension MOCs) | cross-links per dimension | Phase 2 | provisional | navigation | yes structurally | low-medium | `KEEP` | navigation, not evidence |
| `index/MOC-MONETIZATION.md` | commercial view across dimensions | Phase 2–4 | **superseded** | README | rests on the solo-builder ICP | low | `HISTORICAL` | its ICP is the one under test |
| `index/CLAUDE.md` | master deep-dive, HE+EN routing | Phase 0 | provisional | multi-step tasks | routes still resolve | medium | `KEEP` | |

## 5. `products/`

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| 7 playbooks | sellable artifacts | 17 insights | **provisional** | README, pricing | as content, yes; **zero units sold**, and `four-feature-tier-classifier.md` sells an instrument measured to over-rate by one tier in 8 of 10 cases | medium — 2 of 7 survive reframing as assurance checks | `SPLIT` | the mechanism inside each playbook is reusable; the solo-builder buyer and the price are not |
| `pricing-hypotheses.md` | price per playbook + bundles | hours × rate × capture | **historical** | README | every number is a hypothesis with no sale behind it | low | `HISTORICAL` | it is a good record of a pricing method with a zero denominator |
| `launch-checklist.md` | Gumroad launch sequence | gap-closure | **historical** | never executed | not executed | low | `HISTORICAL` | |

## 6. `.claude/`, `pipelines/`, `profile/`, `handoff/`

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `.claude/skills/*` (5) | reusable agent behaviours | Phase 3 | authoritative | sessions | yes | medium — `cross-repo-comparator` and `insight-distiller` map onto the promotion pipeline | `KEEP` + `REFRAME` | `monetization-auditor` is the one that must change; its gate is 4/5 on criteria any well-written insight passes (pre-call's critique) |
| `.claude/commands/*` (6) | slash commands | Phase 3 | authoritative | sessions | yes | medium | `KEEP` | |
| `pipelines/execution-rules.md` | 10 hard rules | Phases 1–4 + 2026-08-19 amendment | **authoritative** | every pipeline | yes; Rule 1 was amended after 43/43 pointers were found to resolve to prose | **core** | `PROMOTE` | Rules 1, 4, 5, 7 are assurance principles; Rule 3's phase gates are project-specific |
| `pipelines/insight-extraction.md`, `monetization-audit.md` | protocols | Phases 1–3 | authoritative | commands | yes | medium | `KEEP` | |
| `pipelines/dual-repo-session.md` | working on `lessons` + a target repo | 2026-05-13 | authoritative | dual-repo sessions | yes | **high** — this is the shape of an engagement with a client repo | `PROMOTE` | it is the only existing artifact describing `lessons` operating on a repo that is not itself |
| `profile/identity.md`, `communication.md`, `workflow.md` | operator profile | 2026-05-12 | authoritative | index/CLAUDE.md | yes | low | `KEEP` | personal, not product |
| `handoff/01`–`05` + README | prompt sequence for a fresh 26-repo session | 2026-05-12 | **superseded** | nothing current | prompts 02–05 produced artifacts that are now superseded (n=25 scan, RepoHealth spec, MVP build) | low | `HISTORICAL` | they are the best surviving record of *how* the RepoHealth thesis was produced, which `PRODUCT_LINEAGE.md` needs |

## 7. `scripts/`

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `check-lessons-contract.py` (R1–R6) | the five-plus-one gates as one executable file | ported from CRM, MATI, proofminer, Agent-Architect, pre-call | **authoritative — verified passing this session** | contract gate | yes; exit 0, 17 insights, 0 violations | **core** — this is the assurance engine's first working component | `MIGRATE` | it already evaluates claims against evidence, authority and claim strength |
| `detect-agent-authorship.sh` | two orthogonal AI-authorship detectors | 12-repo measurement | authoritative | authorship rule | yes | high — an adapter for "which agent produced this change" | `REUSE_AS_ADAPTER` | |
| `collect-outcome-evidence.sh` | ground-truth signal collection | rubric v1.1 | authoritative | labelling | yes | high — an evidence collector | `REUSE_AS_ADAPTER` | |
| `score-classifier.py` | accuracy harness | rubric v1.1 | authoritative | results | yes | high — a positive-control harness | `PROMOTE` | |
| `score-portfolio.sh` | F1–F5 scoring | f5 rescore | provisional | frozen scores | yes, but F5 is unvalidated by design | medium | `KEEP` | must not change before 2026-11-17 |
| `resolve-prediction.py` | resolves the prospective test | written before the data | authoritative, dormant | 2026-11-17 | yes | high | `DO_NOT_TOUCH` | |

## 8. `saas/` — reclassified in detail in §11 of the brief

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `saas/spec/00`, `01`, `02`, `03` | RepoHealth thesis, feature spec, architecture | n=25 scan | **superseded** | nothing executable | 01's core claim ("the classifier works") is contradicted by `results-2026-08-19.md` | low | `SUPERSEDE` | keep verbatim as the record of a thesis that a later measurement refuted |
| `saas/spec/04` pricing, `05` GTM, `06` audience, `08` unit economics | commercial plan for the solo-builder ICP | portfolio inference | **historical** | none | ICP under test; "37% Hebrew repos implies an Israeli segment" is n=1 by its own admission | low | `HISTORICAL` | |
| `saas/spec/07-moat.md` | defensibility | inference | **superseded** | none | its three moat layers rest on the classifier being accurate | low, but useful as a counter-example | `SUPERSEDE` | `THESIS_TEST.md` §B replaces it |
| `saas/spec/09-risk-register.md` | top 10 risks | inference | historical | none | did not contain "the classifier may be inaccurate", which is what happened | medium as a lesson | `HISTORICAL` | |
| `saas/spec/10-mvp-roadmap.md` | week 1–12 scope | inference | historical | none | not executed as written | low | `HISTORICAL` | |
| `saas/spec/11-conviction-statement.md` | honest signal/noise split + kill criteria | 2026-05-12 | **authoritative as a method** | none | its uncertainty list was accurate; its confidence list ("the classifier works") was not | **high** | `PROMOTE` (the method) + `HISTORICAL` (the content) | it is the repo's own worked example of preregistered kill criteria, and of confidence stated before measurement and then refuted |
| `saas/spec/02b-genesis-mode.md` | forward compiler from intent to scaffold | Phase 8 | **provisional** | genesis CLI | the pipeline exists and runs; its output contract is `tier-a.contract.yml`, built on the superseded F1–F4 | **high, after reframing** | `REFRAME` | see §12 of the brief; the elicitation protocol survives, the F1–F4 target does not |
| `saas/spec/crp-spec.md` | Context Repository Protocol R1–R4, W1–W3 | written after seeing `lessons` | **provisional, self-labelled circular** | `crp-lint.ts` | its own text records the circularity: "spec was written after seeing lessons" | medium | `KEEP` + `FIELD_REQUIRED` | it needs a repo not designed as a CRP; that is a field test, not more writing |
| `saas/app/scripts/genesis/*` (1,182 lines) | elicitation, validation, compile, stability test | Phase 8 | provisional | none in CI | code exists, never run in CI, no tests | **high** | `REUSE_AS_CORE` (elicitor + validator) / `REFRAME` (templates) | the elicitation instrument is the reusable part |
| `saas/app/scripts/genesis/stability-test.ts` | inter-rater reliability on the elicitor | frozen prompt v1.0.0 | authoritative as a method | none | yes | high | `PROMOTE` | it is a repeatability instrument; it is explicitly **not** an accuracy instrument (one-mechanism §6.1) |
| `saas/app/scripts/crp-lint.ts` | CRP conformance linter | crp-spec | provisional | none | yes | medium | `REUSE_AS_FEATURE` | conformance, not accuracy |
| `saas/app/src/lib/classifier/*` (484 lines) | F1–F4 tier computation in the product | n=25 thesis | **superseded and actively wrong** | the Next.js app | **no** — `tier.ts::computeTier` still returns A at count ≥ 3, with no F5 and no recency, after the measurement showed +1 bias in 8 of 10 cases | low | `SUPERSEDE` | the shipped code was never updated to the correction; this is the clearest false-authority artifact in the tree |
| `saas/app/src/lib/github/scanner.ts` (104 lines) | GitHub ingestion | MVP | provisional | app | plausible, unverified | **high** | `REUSE_AS_ADAPTER` | ingestion is agent- and thesis-agnostic |
| `saas/app/src/app/*`, `src/components/*` (639 lines) | Next.js UI, auth, dashboard | MVP | **superseded** | none deployed | portfolio-health dashboard is the surface of the superseded thesis | low | `ARCHIVE` | §23: build surfaces from decisions, and this surface serves a decision nobody is making |
| `saas/app/supabase/migrations/0001_initial_schema.sql` | data model for RepoHealth | MVP | superseded | none | schema encodes repos+scores+tiers, not claims+evidence | low | `SUPERSEDE` | |
| `saas/scanner/src/*` (3,412 lines) | standalone portfolio scanner CLI (`@portfoliopilot/scanner`) | MVP | **superseded** | never run in CI | largest single code asset; duplicates the app classifier under a third product name | medium (fetcher and rate-limiter only) | `SPLIT` — `REUSE_AS_ADAPTER` for `fetcher/`, `ARCHIVE` for `classifier/` and `report/` | 3,412 lines is 18% of the repo's code and implements the superseded score |
| `saas/app/package-lock.json` | lockfile | MVP | none | nothing installs it | yes | none | `KEEP` | needed if the app is ever revived; harmless |

## 9. `.github/`

| Asset | Original purpose | Evidence source | Current authority | Used by | Still true? | New-platform relevance | Disposition | Why |
|---|---|---|---|---|---|---|---|---|
| `.github/workflows/node.js.yml` | CI | GitHub template, added 2026-05-12 | **none — 14 of 14 runs failed** | nothing | **no** | high, as the thing to fix first | `REFRAME` | it points `npm ci` at a directory with no `package.json`; it is this repository's own live instance of a gate with no authority |

## 10. Delete candidates

Marked, not deleted.

| Asset | Why it is a candidate | Why it is not deleted now |
|---|---|---|
| `saas/scanner/src/classifier/` + `src/report/` (~2,000 lines) | duplicates `saas/app/src/lib/classifier/` under a third product name, implements a superseded score, never run in CI | it is the only executable record of the PortfolioPilot naming and of the editorial-voice and publish-button detectors; `PRODUCT_LINEAGE.md` cites it |
| `saas/app/src/app/dashboard/`, `repo/[owner]/[repo]/`, `components/portfolio-dashboard.tsx` | the surface of a superseded product | provenance for Phase B; deleting them removes the evidence that the dashboard was built and never used |
| `handoff/02`–`05` | superseded prompt sequence | they are the record of how the RepoHealth thesis was generated, and §17 protects it |

**No asset in this register is deleted in this phase.** Two of the three candidates are load-bearing
provenance for `PRODUCT_LINEAGE.md`.

## 11. Disposition tally

| Disposition | Count | Notes |
|---|---|---|
| `PROMOTE` | 11 | mostly `ground-truth/`, `research/cross-repo/`, `pipelines/execution-rules.md`, `LOG.md` |
| `KEEP` / `KEEP AS CORPUS` | 17 | the research surveys and the working session machinery |
| `REFRAME` | 7 | `README`, `CLAUDE.md`, `MEMORY.md`, `repo-index.md`, genesis spec, CI workflow, monetization gate |
| `MIGRATE` | 4 | `check-lessons-contract.py`, `insights/_template.md`, `patterns-matrix.md`, `bypass-log.md` |
| `HISTORICAL` | 12 | superseded specs, pricing, launch checklist, handoff, n=25 scan |
| `SUPERSEDE` | 6 | RepoHealth thesis chain and the shipped F1–F4 classifier code |
| `REUSE_AS_ADAPTER` | 4 | GitHub scanner, authorship detector, outcome collector, scanner `fetcher/` |
| `ARCHIVE` | 3 | dashboard UI, scanner report/classifier modules |
| `DO_NOT_TOUCH` | 5 | see `DO_NOT_TOUCH.md` |
| `FIELD_REQUIRED` | 3 | CRP spec, 17 insights, `groundstate-protocol` remote identity |
| `DELETE_CANDIDATE` | 3 | marked, none deleted |
