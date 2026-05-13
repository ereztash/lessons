import type { ProjectSpec } from '../types'

export const kolzchutSpec: ProjectSpec = {
  meta: {
    name: 'kolzchut',
    description: 'מערכת שמספקת מידע נגיש על זכויות אזרחיות לאוכלוסיות בישראל',
    domain: 'civic-rights-info',
    language: 'he',
    createdAt: new Date().toISOString(),
  },
  actors: [
    { name: 'Citizen',   role: 'reader',          frequency: 'daily',   criticality: 'primary' },
    { name: 'Editor',    role: 'content-curator', frequency: 'weekly',  criticality: 'primary' },
    { name: 'Authority', role: 'data-source',     frequency: 'monthly', criticality: 'secondary' },
  ],
  entities: [
    { name: 'Citizen',              plural: 'Citizens',              hebrewName: 'אזרח' },
    { name: 'Right',                plural: 'Rights',                hebrewName: 'זכות' },
    { name: 'Population',           plural: 'Populations',           hebrewName: 'אוכלוסייה' },
    { name: 'LifeEvent',            plural: 'LifeEvents',            hebrewName: 'אירוע חיים', ownedBy: 'Citizen' },
    { name: 'Authority',            plural: 'Authorities',           hebrewName: 'רשות' },
    { name: 'EligibilityCriterion', plural: 'EligibilityCriteria',   hebrewName: 'תנאי זכאות',   ownedBy: 'Right' },
    { name: 'Article',              plural: 'Articles',              hebrewName: 'ערך',          ownedBy: 'Right' },
  ],
  transactions: [
    { verb: 'claim',   subject: 'Citizen',              object: 'Right',   invariantRefs: ['INV-001', 'INV-004'] },
    { verb: 'publish', subject: 'Editor',               object: 'Article', invariantRefs: ['INV-003'] },
    { verb: 'qualify', subject: 'EligibilityCriterion', object: 'Citizen', invariantRefs: ['INV-007'] },
  ],
  invariants: [
    { id: 'INV-001', statement: 'Every Right must have at least one Authority owner',                                  scope: 'Right',                severity: 'hard' },
    { id: 'INV-002', statement: 'A Population cannot be defined as a negation only',                                   scope: 'Population',           severity: 'hard' },
    { id: 'INV-003', statement: 'An Article in Hebrew must render right-to-left with Hebrew-first vocabulary',         scope: 'Article',              severity: 'hard' },
    { id: 'INV-004', statement: 'A Citizen cannot claim a Right unless an EligibilityCriterion qualifies them',        scope: 'Citizen',              severity: 'hard' },
    { id: 'INV-005', statement: 'An Authority cannot be archived while it owns at least one active Right',             scope: 'Authority',            severity: 'hard' },
    { id: 'INV-006', statement: 'A LifeEvent must be timestamped with day-precision or finer',                         scope: 'LifeEvent',            severity: 'hard' },
    { id: 'INV-007', statement: 'An EligibilityCriterion must reference at least one Population or Article',           scope: 'EligibilityCriterion', severity: 'hard' },
  ],
  antiPatterns: [
    {
      name: 'Universal-rights assumption',
      description: 'Treating a Right as available to all Citizens without checking the EligibilityCriterion for Population overlap. Surfaces as a list of Rights with no filtering by the requesting Citizen context.',
      citesEntity: 'Right',
      severity: 'critical',
    },
    {
      name: 'Eligibility-vs-availability conflation',
      description: 'Surfacing the status of an EligibilityCriterion without indicating whether the underlying Right is actually claimable now (Authority backlog, missing document requirements, expired ruling).',
      citesEntity: 'EligibilityCriterion',
      severity: 'critical',
    },
    {
      name: 'English-first vocabulary leak',
      description: 'Using English identifiers in code where the surfacing language for the Citizen-facing UI is Hebrew, leaking English vocabulary into the Article surface and breaking the Hebrew-first convention.',
      citesEntity: 'Citizen',
      severity: 'major',
    },
    {
      name: 'Outdated authority links',
      description: 'Caching an Authority contact channel or claim URL without re-validation, leading to broken claim paths for Citizens.',
      citesEntity: 'Authority',
      severity: 'major',
    },
  ],
  vocabulary: [
    { domainTerm: 'אזרח',       genericTerm: 'user',    definition: 'A person seeking information about their civic rights' },
    { domainTerm: 'אוכלוסייה', genericTerm: 'segment', definition: 'A defined group of citizens with shared eligibility characteristics' },
    { domainTerm: 'זכאות',     genericTerm: 'access',  definition: 'Formal qualification for a Right based on EligibilityCriteria' },
    { domainTerm: 'מימוש',     genericTerm: 'claim',   definition: 'The act of receiving a Right from its Authority after qualifying' },
  ],
  voiceSamples: {
    good: [
      'Added EligibilityCriterion validation for Right "single-parent-discount": cites three Authority sources, distinguishes זכאות from מימוש.',
      'Refactored Population overlap logic: Citizens in 2+ Populations now get unioned Rights, not intersected.',
      'Verified Authority URL for "מוסד לביטוח לאומי" Rights cluster: three broken links replaced, freshness check added to publish flow.',
    ],
    bad: [
      'Updated profile.',
      'Fixed bug in eligibility.',
      'Refactored types.',
    ],
  },
}
