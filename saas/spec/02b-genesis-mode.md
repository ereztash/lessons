# Genesis Mode — The Forward Direction of the Classifier

> The same 4-feature classifier that diagnoses dead repos can **generate** healthy ones.
> RepoHealth = reverse mode (audit). Genesis Mode = forward mode (compile).
> Both share one classifier, one database, one dashboard.

## The bidirectional thesis

```
                    Reverse Mode (RepoHealth)        Forward Mode (Genesis)
                    ────────────────────────        ─────────────────────
Input:              existing repo                    intent (paragraph)
Classifier role:    measures F1–F4 post-hoc          enforces F1–F4 ex-ante
Output:             tier score + dormancy diagnosis  scaffold blueprint
Failure mode:       repo died                        scaffold rejected at compile
Question answered:  why did this die?                how do I build one that won't?
```

The insight: **F1–F4 are not just measurement features. They are constructible constraints.**

- F1 (non-template dep) → generator demands written justification for each dependency
- F2 (human commit) → generator inserts "checkpoint commit" prompts in the workflow
- F3 (any PR) → default branching model is feature-branches-with-PRs, not commit-to-main
- F4 (CLAUDE.md / docs/) → generator emits CLAUDE.md before line 1 of code

## The compiler model

```
   User intent (paragraph)
            ↓
   Elicitation Protocol  ←── 18 domain-discovery questions
            ↓
   ProjectSpec (IR)      ←── ontology + invariants + anti-patterns + vocabulary + voice
            ↓
   Sharpness Validator   ←── tier-a.contract.yml constraints
            ↓
   Scaffold Compiler     ←── template renderers per file type
            ↓
   Generated scaffold (file tree)
            ↓
   Claude Code builds from the scaffold (not from a blank prompt)
```

## The Elicitation Protocol

Eighteen questions across five ontology dimensions. The protocol is the IP — not the answers, not the templates. The questions improve with usage data (which yields sharp answers, which yields mush).

### Dimension A — Actors & Roles (4 questions)

1. Who are the actors that **initiate** work in this system?
2. Who **consumes** the output of those actions?
3. Which role has the **least power but most frequent contact** with the system?
4. Is there an actor whose **absence** the system must tolerate gracefully?

### Dimension B — Entities & Relationships (4 questions)

5. What's the **central noun** in your description? (root entity)
6. What 2–3 entities are **owned by** the root?
7. Is the dominant relationship **one-to-many** or **many-to-many**?
8. What's the smallest **atomic transaction** — one verb + one noun?

### Dimension C — Invariants & Constraints (3 questions)

9. What's the one thing that **must never happen**?
10. What's the constraint **true at every moment in time**?
11. What **state transitions are illegal**?

### Dimension D — Anti-patterns (4 questions)

12. What did **past versions of this idea** get wrong?
13. What **assumption looks reasonable but isn't**?
14. What's the "easy" version users will demand but you must refuse?
15. What's the **failure mode you've seen in similar systems**?

### Dimension E — Vocabulary & Voice (3 questions)

16. What's the word **your domain uses** where the world says X?
17. What sentence would make a **domain expert wince**?
18. What sentence **signals deep understanding**?

## The IR — `project.spec.json`

```typescript
type ProjectSpec = {
  meta: {
    name: string
    description: string
    domain: string          // e.g. 'civic-rights-info', 'algo-trading', 'volunteer-mgmt'
    language: 'en' | 'he' | 'mixed'
    createdAt: string
  }
  actors: Array<{
    name: string            // 'Citizen', 'Editor'
    role: string            // 'reader', 'content-curator'
    frequency: 'daily' | 'weekly' | 'monthly' | 'rare'
    criticality: 'primary' | 'secondary' | 'optional'
  }>
  entities: Array<{
    name: string
    plural: string
    hebrewName?: string
    ownedBy?: string        // FK to another entity name
  }>
  transactions: Array<{
    verb: string            // 'claim', 'publish', 'expire'
    subject: string         // entity name
    object: string          // entity name
    invariantRefs: string[] // IDs from invariants[]
  }>
  invariants: Array<{
    id: string
    statement: string       // 'Every Right must have at least one Authority owner'
    scope: string           // entity name
    severity: 'hard' | 'soft'
  }>
  antiPatterns: Array<{
    name: string
    description: string
    citesEntity: string     // MUST reference an entity from entities[]
    severity: 'critical' | 'major' | 'minor'
  }>
  vocabulary: Array<{
    domainTerm: string      // 'אזרח'
    genericTerm: string     // 'user'
    definition: string
  }>
  voiceSamples: {
    good: string[]          // ≥3 examples
    bad: string[]           // ≥2 examples
  }
}
```

## Sharpness Constraints — `tier-a.contract.yml`

The compiler emits this file AND validates against it. **Failing sharpness = compile error, not warning.**

```yaml
contract_version: 1
project:
  name: ${spec.meta.name}
  domain: ${spec.meta.domain}

tier_a_requirements:
  f1_non_template_deps:
    required: true
    justification_required_per_dep: true
  f2_human_commit:
    enforced_via: checkpoint_prompts
    min_human_commits_before_deploy: 3
  f3_pull_requests:
    default_workflow: feature_branch_pr
    direct_to_main_blocked: true
  f4_documentation:
    claude_md: required
    log_md: required
    docs_dir: required_with_min_one_file

sharpness:
  anti_patterns:
    min_items: 3
    forbidden_phrases:
      - generic
      - follow best practices
      - avoid bugs
      - improve quality
    must_cite_entity: true   # every anti-pattern.description must mention an entity name
  invariants:
    min_items: 2
    form: declarative        # 'X cannot Y' or 'every X has Y', not 'try to avoid Z'
  vocabulary:
    min_substitutions: 3     # at least 3 domain→generic mappings
  voice:
    citation_density_min: 0.3  # ≥30% of voiceSamples.good must mention ≥1 entity
    bad_samples_min: 2
```

## The Scaffold Output

```
{project-name}/
├── CLAUDE.md                    ← Gate 0 + domain anti-patterns + vocabulary table
├── LOG.md                       ← anti-patterns + invariants, human-skeleton (not bot-generated)
├── README.md                    ← spec.meta + getting started + Tier A contract reference
├── package.json                 ← minimal deps + scripts; each dep tagged with justification comment
├── docs/
│   └── spec.md                  ← entities + transactions + invariants narrative
└── .claude/
    ├── ontology.json            ← the ProjectSpec IR, frozen as the source of truth
    └── tier-a.contract.yml      ← the sharpness contract; future scans validate against this
```

Every file is rendered from the IR. No file is a static template. Two scaffolds for two different domains will differ in **every line**, but share **every structural slot**.

## Compile Errors — Taxonomy

| Error code | Trigger | Resolution |
|------------|---------|------------|
| `E001_INSUFFICIENT_ANTIPATTERNS` | < 3 anti-patterns in IR | Re-run elicitation, dimension D |
| `E002_GENERIC_PHRASING` | Anti-pattern description contains forbidden phrase | Rewrite with entity citation |
| `E003_ORPHAN_ANTIPATTERN` | Anti-pattern citesEntity not in entities[] | Add entity OR rephrase |
| `E004_SOFT_INVARIANT` | Invariant statement uses "try to", "avoid", "prefer" | Rewrite as `X cannot Y` |
| `E005_VOCAB_LEAK` | Voice sample uses generic term where vocabulary mapping exists | Rewrite using domain term |
| `E006_LOW_CITATION_DENSITY` | < 30% of voiceSamples.good cite an entity | Rewrite with entity references |
| `E007_UNJUSTIFIED_DEP` | package.json dep has no justification comment | Add justification or remove |
| `W001_ENTITY_NO_INVARIANT` | Entity has no invariants referencing it | Warning, not block |

## Worked example — kolzchut

Input paragraph:

> מערכת שמספקת מידע נגיש על זכויות אזרחיות לאוכלוסיות בישראל.

Elicitation extracts (canned in the prototype fixture; LLM-extracted in production):

- **Actors**: Citizen (primary), Editor (primary), Authority (secondary)
- **Entities**: Right, Population, LifeEvent, Authority, EligibilityCriterion, Article
- **Invariants**: Every Right must have ≥1 Authority owner; Population cannot be negation-only; Article in Hebrew is RTL+Hebrew-first vocabulary
- **Anti-patterns**:
  - *Universal-rights assumption* — treating Right as available to all Citizens without EligibilityCriteria check
  - *Eligibility-vs-availability conflation* — showing eligibility without indicating Authority backlog or document requirements
  - *English-first vocabulary leak* — using "user" instead of אזרח in code that surfaces in Hebrew UI
  - *Outdated authority links* — caching Authority URL without re-validation
- **Vocabulary**: אזרח↤user, אוכלוסייה↤segment, זכאות↤access, מימוש↤use
- **Voice (good)**: "Added eligibility-criteria validation for Right ‘single-parent-discount’ — cites three Authority sources, distinguishes זכאות from מימוש"
- **Voice (bad)**: "Updated user profile"

Compile output: a `kolzchut/` directory whose `CLAUDE.md` enforces the four anti-patterns by name, whose `LOG.md` has those entries pre-seeded as human-skeleton (not bot-generated), whose `docs/spec.md` describes the entity model in Hebrew-first vocabulary, and whose `package.json` includes only justified dependencies.

Claude Code reading this scaffold and being told to "build the citizen-facing article view" produces non-generic code from line 1 — because the IR is in `.claude/ontology.json` and the constraints are in `.claude/tier-a.contract.yml`.

## Pricing & packaging

Genesis Mode is **not a new SKU**. It's a feature of the existing tiers:

| | Free | Pro | Team |
|---|------|-----|------|
| Forward-compile from intent | 1/month | unlimited | unlimited |
| Sharpness validator | basic (3 rules) | full (8 rules) | full + custom rules |
| Domain templates | community-shared | community + curated | private team templates |
| Audit-on-drift (links to RepoHealth) | manual | auto, weekly | auto, daily |
| CLI access | yes | yes | yes |

The CLI is open-source (the wedge). The hosted API + sharpness validator + audit-on-drift are paid. The asymmetry: anyone can run the CLI and get a scaffold; only paying users get **continuous Tier A enforcement** as the project evolves.

## Open questions for Phase 7+

1. Should the elicitation be **synchronous** (REPL/web form) or **async** (submit description → LLM extraction → review extracted IR → confirm)? Async likely wins for non-trivial domains.
2. How is the **domain ontology versioned**? An update to anti-patterns post-compile must propagate to the generated CLAUDE.md — but the user may have edited it. Conflict resolution model TBD.
3. **Self-hosting**: should Team tier allow self-hosting the sharpness validator? Important for govtech / regulated domains.
