export type Tier = 'A' | 'B' | 'C' | 'D'

export type DormancyPattern =
  | 'healthy'
  | 'publish-button-satisfied'
  | 'operator-absent'
  | 'bot-only'
  | 'non-software'
  | 'abandoned-early'

export type AITool =
  | 'lovable'
  | 'claude-code'
  | 'cursor'
  | 'bolt'
  | 'v0'
  | 'copilot'
  | 'unknown-bot'

export interface FeatureScores {
  f1: boolean // non-template production dep
  f2: boolean // any human/direct commit
  f3: boolean // any PR
  f4: boolean // CLAUDE.md or docs/
}

export interface RepoScanInput {
  owner: string
  name: string
  githubRepoId: number
  language: string | null
  description: string | null
  lastCommitAt: Date | null
  defaultBranch: string
  // Raw data from GitHub API
  commits: CommitSummary[]
  prCount: number
  rootFiles: string[]
  packageJson: Record<string, unknown> | null
  hasClaudeMd: boolean
  hasDocs: boolean
}

export interface CommitSummary {
  sha: string
  message: string
  authorName: string
  authorEmail: string
  date: string
}

export interface RepoScanResult {
  owner: string
  name: string
  githubRepoId: number
  language: string | null
  description: string | null
  lastCommitAt: Date | null
  defaultBranch: string
  scores: FeatureScores
  tier: Tier
  dormancyPattern: DormancyPattern
  aiTools: AITool[]
  humanCommitRatio: number
  evidence: ScanEvidence
  scannedAt: Date
}

export interface ScanEvidence {
  f1Evidence: string
  f2Evidence: string
  f3Evidence: string
  f4Evidence: string
  dormancyEvidence: string[]
  aiToolEvidence: Record<AITool, string>
}
