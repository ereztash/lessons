import type { CommitSummary, FeatureScores, RepoScanInput } from './types'
import { isBot } from './ai-tools'

const TEMPLATE_ONLY_DEPS = new Set([
  'react',
  'react-dom',
  'next',
  'typescript',
  '@types/react',
  '@types/react-dom',
  '@types/node',
  'eslint',
  'eslint-config-next',
  'autoprefixer',
  'postcss',
  'tailwindcss',
])

export function computeFeatureScores(input: RepoScanInput): FeatureScores {
  return {
    f1: hasProductionDep(input),
    f2: hasHumanCommit(input.commits),
    f3: input.prCount > 0,
    f4: input.hasClaudeMd || input.hasDocs,
  }
}

export function f1Evidence(input: RepoScanInput): string {
  if (!input.packageJson) {
    const codeFiles = input.rootFiles.filter((f) =>
      /\.(py|rs|go|java|rb|php|cs)$/.test(f)
    )
    if (codeFiles.length > 0) {
      return `Non-JS project detected (${codeFiles.slice(0, 3).join(', ')})`
    }
    return 'No package.json found'
  }
  const deps = Object.keys(
    (input.packageJson.dependencies as Record<string, string>) ?? {}
  )
  const nonTemplate = deps.filter((d) => !TEMPLATE_ONLY_DEPS.has(d))
  if (nonTemplate.length === 0)
    return `Only template deps found (${deps.slice(0, 3).join(', ')})`
  return `Production deps: ${nonTemplate.slice(0, 4).join(', ')}`
}

export function f2Evidence(commits: CommitSummary[]): string {
  const human = commits.filter((c) => !isBot(c))
  if (human.length === 0)
    return `0/${commits.length} commits have human authorship`
  const last = human[0]
  return `${human.length}/${commits.length} human commits; last by ${last.authorName} (${last.date.slice(0, 10)})`
}

export function f4Evidence(input: RepoScanInput): string {
  if (input.hasClaudeMd && input.hasDocs) return 'CLAUDE.md + docs/ present'
  if (input.hasClaudeMd) return 'CLAUDE.md present'
  if (input.hasDocs) return 'docs/ directory present'
  return 'No CLAUDE.md and no docs/'
}

function hasProductionDep(input: RepoScanInput): boolean {
  if (!input.packageJson) {
    // For non-JS repos: check for requirements.txt indicators in root files
    return input.rootFiles.some((f) =>
      ['requirements.txt', 'pyproject.toml', 'Cargo.toml', 'go.mod', 'pom.xml'].includes(f)
    )
  }
  const deps = Object.keys(
    (input.packageJson.dependencies as Record<string, string>) ?? {}
  )
  return deps.some((d) => !TEMPLATE_ONLY_DEPS.has(d))
}

function hasHumanCommit(commits: CommitSummary[]): boolean {
  return commits.some((c) => !isBot(c))
}
