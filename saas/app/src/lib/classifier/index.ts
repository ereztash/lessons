import type { RepoScanInput, RepoScanResult } from './types'
import { detectAITools, humanCommitRatio } from './ai-tools'
import { computeFeatureScores, f1Evidence, f2Evidence, f4Evidence } from './features'
import { detectDormancy, dormancyEvidence } from './dormancy'
import { computeTier } from './tier'

export function classifyRepo(input: RepoScanInput): RepoScanResult {
  const scores = computeFeatureScores(input)
  const dormancyPattern = detectDormancy(input, scores)
  const tier = computeTier(scores, dormancyPattern)
  const aiTools = detectAITools(input.commits)
  const ratio = humanCommitRatio(input.commits)

  const evidence = {
    f1Evidence: f1Evidence(input),
    f2Evidence: f2Evidence(input.commits),
    f3Evidence:
      input.prCount > 0
        ? `${input.prCount} pull request(s) found`
        : 'No pull requests found',
    f4Evidence: f4Evidence(input),
    dormancyEvidence: dormancyEvidence(input, dormancyPattern),
    aiToolEvidence: {} as Record<string, string>,
  }

  return {
    owner: input.owner,
    name: input.name,
    githubRepoId: input.githubRepoId,
    language: input.language,
    description: input.description,
    lastCommitAt: input.lastCommitAt,
    defaultBranch: input.defaultBranch,
    scores,
    tier,
    dormancyPattern,
    aiTools,
    humanCommitRatio: ratio,
    evidence,
    scannedAt: new Date(),
  }
}

export * from './types'
export * from './tier'
