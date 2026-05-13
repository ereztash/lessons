export type Language = 'en' | 'he' | 'mixed'
export type AntiPatternSeverity = 'critical' | 'major' | 'minor'
export type InvariantSeverity = 'hard' | 'soft'
export type Frequency = 'daily' | 'weekly' | 'monthly' | 'rare'
export type Criticality = 'primary' | 'secondary' | 'optional'

export interface Actor {
  name: string
  role: string
  frequency: Frequency
  criticality: Criticality
}

export interface Entity {
  name: string
  plural: string
  hebrewName?: string
  ownedBy?: string
}

export interface Transaction {
  verb: string
  subject: string
  object: string
  invariantRefs: string[]
}

export interface Invariant {
  id: string
  statement: string
  scope: string
  severity: InvariantSeverity
}

export interface AntiPattern {
  name: string
  description: string
  citesEntity: string
  severity: AntiPatternSeverity
}

export interface VocabularyEntry {
  domainTerm: string
  genericTerm: string
  definition: string
}

export interface VoiceSamples {
  good: string[]
  bad: string[]
}

export interface ProjectSpec {
  meta: {
    name: string
    description: string
    domain: string
    language: Language
    createdAt: string
  }
  actors: Actor[]
  entities: Entity[]
  transactions: Transaction[]
  invariants: Invariant[]
  antiPatterns: AntiPattern[]
  vocabulary: VocabularyEntry[]
  voiceSamples: VoiceSamples
}

export interface ValidationIssue {
  code: string
  message: string
  severity: 'error' | 'warning'
}

export interface ValidationReport {
  passed: boolean
  errors: ValidationIssue[]
  warnings: ValidationIssue[]
  scores: {
    f1: 'satisfied' | 'pending' | 'failed'
    f2: 'satisfied' | 'pending' | 'failed'
    f3: 'satisfied' | 'pending' | 'failed'
    f4: 'satisfied' | 'pending' | 'failed'
    sharpnessScore: number
  }
}

export interface ScaffoldFile {
  path: string
  content: string
}

export interface ScaffoldOutput {
  rootDir: string
  files: ScaffoldFile[]
  validation: ValidationReport
}
