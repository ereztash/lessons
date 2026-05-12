'use client'

import { useState } from 'react'
import { TierBadge } from './tier-badge'
import { FeatureChecks } from './feature-checks'
import type { Tier } from '@/lib/classifier/types'

type Scan = {
  id: string
  owner: string
  name: string
  language: string | null
  last_commit_at: string | null
  f1: boolean
  f2: boolean
  f3: boolean
  f4: boolean
  tier: Tier
  dormancy_pattern: string
  ai_tools: string[]
  human_commit_ratio: number
  scanned_at: string
}

type Props = {
  scans: Scan[]
  plan: string
  githubUsername: string
}

export function PortfolioDashboard({ scans, plan, githubUsername }: Props) {
  const [filterTier, setFilterTier] = useState<Tier | 'all'>('all')
  const [scanning, setScanning] = useState(false)
  const [lastScan, setLastScan] = useState<string | null>(
    scans[0]?.scanned_at ?? null
  )

  const filtered = filterTier === 'all'
    ? scans
    : scans.filter((s) => s.tier === filterTier)

  const tierCounts = { A: 0, B: 0, C: 0, D: 0 }
  for (const s of scans) tierCounts[s.tier]++

  async function triggerScan() {
    setScanning(true)
    try {
      const res = await fetch('/api/scan', { method: 'POST' })
      if (res.ok) {
        window.location.reload()
      }
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-lg">RepoHealth</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            @{githubUsername} · {plan === 'pro' ? 'Pro' : 'Free'}
          </span>
          <button
            onClick={triggerScan}
            disabled={scanning}
            className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {scanning ? 'Scanning…' : 'Scan now'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Summary row */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {(['A', 'B', 'C', 'D'] as Tier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterTier(filterTier === tier ? 'all' : tier)}
              className={`bg-white border rounded-lg p-4 text-center transition-shadow hover:shadow-md ${
                filterTier === tier ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{tierCounts[tier]}</div>
              <TierBadge tier={tier} />
            </button>
          ))}
        </div>

        {/* Table */}
        {scans.length === 0 ? (
          <div className="bg-white border rounded-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No repos scanned yet.</p>
            <button
              onClick={triggerScan}
              className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
            >
              Scan my portfolio
            </button>
          </div>
        ) : (
          <div className="bg-white border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Repo</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-600">F1</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-600">F2</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-600">F3</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-600">F4</th>
                  <th className="text-center px-3 py-3 font-medium text-gray-600">Tier</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Pattern</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Last commit</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filtered.map((scan) => (
                  <tr key={scan.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-3">
                      <a
                        href={`/repo/${scan.owner}/${scan.name}`}
                        className="font-medium text-gray-900 hover:underline"
                      >
                        {scan.name}
                      </a>
                      {scan.language && (
                        <span className="ml-2 text-xs text-gray-400">{scan.language}</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <FeatureChecks value={scan.f1} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <FeatureChecks value={scan.f2} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <FeatureChecks value={scan.f3} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <FeatureChecks value={scan.f4} />
                    </td>
                    <td className="px-3 py-3 text-center">
                      <TierBadge tier={scan.tier} />
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-gray-600">
                        {scan.dormancy_pattern.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {scan.last_commit_at
                        ? new Date(scan.last_commit_at).toLocaleDateString()
                        : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {lastScan && (
          <p className="text-xs text-gray-400 mt-3">
            Last scanned {new Date(lastScan).toLocaleString()}
          </p>
        )}
      </main>
    </div>
  )
}
