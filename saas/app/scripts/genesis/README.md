# Genesis CLI — RepoHealth forward mode

> Compiles a project intent (or canned fixture) into a Tier A-by-construction scaffold.
> Prototype runs against domain fixtures. Production version uses LLM elicitation against `--intent`.

## What this does

Given a domain description, the CLI generates a directory containing:

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Gate 0 protocol + domain anti-patterns + vocabulary table + invariants + voice samples |
| `LOG.md` | Human-skeleton anti-pattern log (not bot-generated) |
| `README.md` | Project front door, entities + actors summary, Tier A contract reference |
| `docs/spec.md` | Full entity model + transactions + invariants narrative |
| `package.json` | Minimal Next.js scaffold with **justified** dependencies |
| `.claude/ontology.json` | The frozen ProjectSpec IR — source of truth for future audits |
| `.claude/tier-a.contract.yml` | Sharpness contract; RepoHealth will validate against this every scan |

Every file is **rendered from the IR**, not pulled from a static template. Two scaffolds for two different domains differ in every line, share every structural slot.

## Run the kolzchut example

From `saas/app/`:

```sh
npx tsx scripts/genesis/index.ts --domain kolzchut --out /tmp/kolzchut
```

Expected success output:

```
[genesis] eliciting ProjectSpec from domain="kolzchut"...
[genesis] compiling scaffold for project "kolzchut"...

=== Validation Report ===
Passed: YES
Sharpness score: 100/100
F1 (non-template deps): satisfied
F2 (human commit):      pending
F3 (pull request):      pending
F4 (documentation):     satisfied

OK  Wrote 7 files to /tmp/kolzchut
OK  Tier A scaffold ready. Open /tmp/kolzchut in Claude Code to start building.
```

## Dry run (validate only)

```sh
npx tsx scripts/genesis/index.ts --domain kolzchut --dry-run
```

## How to verify the output is NOT generic

Open the generated `CLAUDE.md`. Search for:

- `Universal-rights assumption` — a domain-specific anti-pattern unique to civic-rights
- `אזרח` — Hebrew domain vocabulary in a generated file
- `EligibilityCriterion` — a domain entity name
- `מוסד לביטוח לאומי` — a real Israeli Authority cited in a commit-voice example

None would appear in `create-next-app` output.

## Sharpness errors (compile blockers)

| Code | Trigger |
|------|---------|
| `E001_INSUFFICIENT_ANTIPATTERNS` | < 3 anti-patterns |
| `E002_GENERIC_PHRASING` | Anti-pattern contains "generic" / "follow best practices" / "avoid bugs" / "improve quality" |
| `E003_ORPHAN_ANTIPATTERN` | Anti-pattern cites entity not in `entities[]`, OR description doesn't mention the cited entity |
| `E004_SOFT_INVARIANT` | Hard invariant uses "try" / "avoid" / "prefer" / "should" / "may" / "might" |
| `E005_VOCAB_LEAK` | Good voice sample uses a generic term where a vocabulary mapping exists |
| `E006_LOW_CITATION_DENSITY` | < 30% of good voice samples cite an entity |
| `E007_INSUFFICIENT_VOCABULARY` | < 3 vocabulary substitutions |
| `E008_INSUFFICIENT_BAD_SAMPLES` | < 2 bad voice samples |

Warning (informational, doesn't block):

| Code | Trigger |
|------|---------|
| `W001_ENTITY_NO_INVARIANT` | Entity has no invariant referencing it |

Kolzchut fixture is engineered to pass ALL checks (sharpness 100/100, zero warnings).

## Add a new domain fixture

1. Create `scripts/genesis/domains/<name>.ts` exporting a `ProjectSpec`
2. Register it in `scripts/genesis/elicitor.ts` (add to `FIXTURES`)
3. Run with `--domain <name> --dry-run` to debug sharpness errors

## Files

| File | Purpose |
|------|---------|
| `index.ts` | CLI entry: arg parsing, orchestration, file writing |
| `types.ts` | Shared TypeScript types |
| `elicitation-questions.ts` | The 18 elicitation questions (data only) |
| `elicitor.ts` | Domain → ProjectSpec loader (fixture-based in prototype) |
| `validator.ts` | Sharpness constraints (compile-time blocker) |
| `compiler.ts` | Orchestrator: validate then render |
| `templates.ts` | All file-renderer functions |
| `domains/kolzchut.ts` | Kolzchut domain fixture (civic-rights-info, Hebrew) |

## What's NOT in the prototype

- LLM elicitation from `--intent` paragraph (production calls Claude API)
- GitHub repo creation from scaffold (lives in web app: `POST /api/genesis/:id/create-repo`)
- Continuous Tier A drift detection (lives in web app's RepoHealth scanner)
- Authentication (production CLI uses a PAT against hosted API)

All specced in [/saas/spec/02b-genesis-mode.md](../../spec/02b-genesis-mode.md) and [/saas/spec/03-architecture.md](../../spec/03-architecture.md).
