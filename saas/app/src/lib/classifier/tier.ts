import type { FeatureScores, Tier } from './types'

export function computeTier(scores: FeatureScores, dormancyPattern: string): Tier {
  if (dormancyPattern === 'non-software') return 'D'

  const count = [scores.f1, scores.f2, scores.f3, scores.f4].filter(Boolean).length

  if (count >= 3) return 'A'
  if (count >= 1) return 'B'
  // score = 0
  if (scores.f2) return 'C'  // has human commits but no other features
  return 'C'
}

export function tierLabel(tier: Tier): string {
  switch (tier) {
    case 'A': return 'Tier A — Healthy'
    case 'B': return 'Tier B — Partial'
    case 'C': return 'Tier C — Dormant'
    case 'D': return 'Tier D — Non-software'
  }
}

export function tierColor(tier: Tier): string {
  switch (tier) {
    case 'A': return 'text-green-600 bg-green-50 border-green-200'
    case 'B': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    case 'C': return 'text-red-600 bg-red-50 border-red-200'
    case 'D': return 'text-gray-500 bg-gray-50 border-gray-200'
  }
}
