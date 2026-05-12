import { tierLabel, tierColor } from '@/lib/classifier/tier'
import type { Tier } from '@/lib/classifier/types'

export function TierBadge({ tier }: { tier: Tier }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-medium ${
        tierColor(tier)
      }`}
    >
      {tier}
    </span>
  )
}
