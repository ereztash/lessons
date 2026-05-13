import type { ProjectSpec, ValidationIssue, ValidationReport } from './types'

const FORBIDDEN_PHRASES = ['generic', 'follow best practices', 'avoid bugs', 'improve quality']
const SOFT_INVARIANT_WORDS = ['try', 'avoid', 'prefer', 'should', 'may', 'might']

export function validate(spec: ProjectSpec): ValidationReport {
  const errors: ValidationIssue[] = []
  const warnings: ValidationIssue[] = []
  const entityNames = new Set(spec.entities.map(e => e.name))

  if (spec.antiPatterns.length < 3) {
    errors.push({
      code: 'E001_INSUFFICIENT_ANTIPATTERNS',
      message: `Need >=3 anti-patterns, found ${spec.antiPatterns.length}. Re-run dimension D of elicitation.`,
      severity: 'error',
    })
  }

  for (const ap of spec.antiPatterns) {
    const desc = ap.description.toLowerCase()
    for (const phrase of FORBIDDEN_PHRASES) {
      if (desc.includes(phrase)) {
        errors.push({
          code: 'E002_GENERIC_PHRASING',
          message: `Anti-pattern "${ap.name}" contains forbidden phrase "${phrase}". Rewrite with entity citation.`,
          severity: 'error',
        })
      }
    }
  }

  for (const ap of spec.antiPatterns) {
    if (!entityNames.has(ap.citesEntity)) {
      errors.push({
        code: 'E003_ORPHAN_ANTIPATTERN',
        message: `Anti-pattern "${ap.name}" cites entity "${ap.citesEntity}" which is not in entities[]. Add the entity or change the citation.`,
        severity: 'error',
      })
    }
  }

  for (const ap of spec.antiPatterns) {
    if (entityNames.has(ap.citesEntity) && !ap.description.includes(ap.citesEntity)) {
      errors.push({
        code: 'E003_ORPHAN_ANTIPATTERN',
        message: `Anti-pattern "${ap.name}" must mention entity "${ap.citesEntity}" by name in its description.`,
        severity: 'error',
      })
    }
  }

  for (const inv of spec.invariants) {
    if (inv.severity !== 'hard') continue
    const stmt = inv.statement.toLowerCase()
    for (const word of SOFT_INVARIANT_WORDS) {
      const re = new RegExp(`\\b${word}\\b`)
      if (re.test(stmt)) {
        errors.push({
          code: 'E004_SOFT_INVARIANT',
          message: `Hard invariant ${inv.id} uses soft word "${word}". Rewrite as "X cannot Y" or "every X has Y".`,
          severity: 'error',
        })
        break
      }
    }
  }
  if (spec.invariants.length < 2) {
    errors.push({
      code: 'E004_INSUFFICIENT_INVARIANTS',
      message: `Need >=2 invariants, found ${spec.invariants.length}.`,
      severity: 'error',
    })
  }

  for (const sample of spec.voiceSamples.good) {
    for (const vocab of spec.vocabulary) {
      const re = new RegExp(`\\b${vocab.genericTerm}\\b`, 'i')
      if (re.test(sample)) {
        errors.push({
          code: 'E005_VOCAB_LEAK',
          message: `Good voice sample uses generic term "${vocab.genericTerm}" where domain term "${vocab.domainTerm}" should be used. Sample: "${sample.slice(0, 80)}..."`,
          severity: 'error',
        })
      }
    }
  }

  if (spec.voiceSamples.good.length > 0) {
    const citing = spec.voiceSamples.good.filter(sample =>
      [...entityNames].some(name => sample.includes(name)),
    ).length
    const density = citing / spec.voiceSamples.good.length
    if (density < 0.3) {
      errors.push({
        code: 'E006_LOW_CITATION_DENSITY',
        message: `Citation density ${(density * 100).toFixed(0)}% < 30%. ${citing}/${spec.voiceSamples.good.length} good samples cite an entity.`,
        severity: 'error',
      })
    }
  }

  if (spec.vocabulary.length < 3) {
    errors.push({
      code: 'E007_INSUFFICIENT_VOCABULARY',
      message: `Need >=3 vocabulary substitutions, found ${spec.vocabulary.length}.`,
      severity: 'error',
    })
  }

  if (spec.voiceSamples.bad.length < 2) {
    errors.push({
      code: 'E008_INSUFFICIENT_BAD_SAMPLES',
      message: `Need >=2 bad voice samples, found ${spec.voiceSamples.bad.length}.`,
      severity: 'error',
    })
  }

  const invariantScopes = new Set(spec.invariants.map(i => i.scope))
  for (const e of spec.entities) {
    if (!invariantScopes.has(e.name)) {
      warnings.push({
        code: 'W001_ENTITY_NO_INVARIANT',
        message: `Entity "${e.name}" has no invariant referencing it.`,
        severity: 'warning',
      })
    }
  }

  const sharpnessScore = Math.max(0, 100 - errors.length * 10 - warnings.length * 2)

  return {
    passed: errors.length === 0,
    errors,
    warnings,
    scores: {
      f1: 'satisfied',
      f2: 'pending',
      f3: 'pending',
      f4: 'satisfied',
      sharpnessScore,
    },
  }
}
