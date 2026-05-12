import type { CommitSummary, DormancyPattern, FeatureScores, RepoScanInput } from './types'
import { isBot } from './ai-tools'

const DAYS_MS = 24 * 60 * 60 * 1000
const DORMANCY_THRESHOLD_DAYS = 90

export function detectDormancy(
  input: RepoScanInput,
  scores: FeatureScores
): DormancyPattern {
  const { commits, prCount, lastCommitAt, defaultBranch } = input

  // Tier D pre-filter: non-software
  if (isNonSoftware(input)) return 'non-software'

  // Healthy: recent human activity
  const daysSinceLastCommit = lastCommitAt
    ? (Date.now() - lastCommitAt.getTime()) / DAYS_MS
    : Infinity

  if (daysSinceLastCommit < DORMANCY_THRESHOLD_DAYS && scores.f2) {
    return 'healthy'
  }

  // Operator-absent: claude/* branch is default, never merged
  if (defaultBranch.startsWith('claude/') && !scores.f3) {
    return 'operator-absent'
  }

  // Bot-only: commits exist but all are bots
  if (commits.length > 0 && !scores.f2) {
    // Publish-button: Lovable/Bolt/v0 bot commits, no human follow-up
    const hasVisualAITool = commits.some(
      (c) =>
        /lovable|bolt\[bot\]|v0-dev/i.test(c.authorEmail) ||
        /lovable|^bolt$|^v0$/i.test(c.authorName)
    )
    if (hasVisualAITool) return 'publish-button-satisfied'
    return 'bot-only'
  }

  // Abandoned early: < 5 commits and dormant
  if (commits.length < 5 && daysSinceLastCommit > DORMANCY_THRESHOLD_DAYS) {
    return 'abandoned-early'
  }

  return 'healthy'
}

export function dormancyEvidence(
  input: RepoScanInput,
  pattern: DormancyPattern
): string[] {
  const { commits, lastCommitAt, defaultBranch } = input
  const daysSince = lastCommitAt
    ? Math.round((Date.now() - lastCommitAt.getTime()) / DAYS_MS)
    : null

  switch (pattern) {
    case 'healthy':
      return [
        `Last commit: ${daysSince} days ago`,
        `${commits.filter((c) => !isBot(c)).length} human commits in sample`,
      ]
    case 'publish-button-satisfied':
      return [
        'All commits from visual AI tool (Lovable/Bolt/v0)',
        'No human commits found — operator likely satisfied with published URL',
        daysSince ? `Silent for ${daysSince} days` : 'Last commit date unknown',
      ]
    case 'operator-absent':
      return [
        `Default branch is \`${defaultBranch}\` (Claude sprint branch, never merged)`,
        'Claude built a full system; operator never resumed',
        daysSince ? `Silent for ${daysSince} days` : 'Last commit date unknown',
      ]
    case 'bot-only':
      return [
        `${commits.length} commits, 0 human authors`,
        'Repo was AI-seeded but never taken over by a human',
      ]
    case 'non-software':
      return [
        'No recognized code files at repository root',
        'Likely a data, notes, or config repository',
      ]
    case 'abandoned-early':
      return [
        `Only ${commits.length} commits total`,
        daysSince ? `Last activity ${daysSince} days ago` : 'Activity date unknown',
        'Repository never reached meaningful development depth',
      ]
  }
}

function isNonSoftware(input: RepoScanInput): boolean {
  const CODE_EXTENSIONS = [
    '.js', '.ts', '.jsx', '.tsx', '.py', '.rb', '.go', '.rs',
    '.java', '.cs', '.cpp', '.c', '.php', '.swift', '.kt',
    '.vue', '.svelte', '.ipynb', '.r', '.jl', '.ex', '.exs',
  ]
  const hasCodeFile = input.rootFiles.some((f) =>
    CODE_EXTENSIONS.some((ext) => f.endsWith(ext))
  )
  const hasProjectFile = input.rootFiles.some((f) =>
    ['package.json', 'requirements.txt', 'Cargo.toml', 'go.mod',
      'pom.xml', 'build.gradle', 'pyproject.toml', 'Gemfile'].includes(f)
  )
  return !hasCodeFile && !hasProjectFile
}
