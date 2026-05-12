import { createClient } from '@/lib/supabase/server'
import { redirect, notFound } from 'next/navigation'
import { TierBadge } from '@/components/tier-badge'
import { FeatureChecks } from '@/components/feature-checks'
import { dormancyPlaybook } from '@/lib/classifier/playbooks'
import type { Tier, DormancyPattern } from '@/lib/classifier/types'

export default async function RepoDetailPage({
  params,
}: {
  params: { owner: string; repo: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/signin')

  const { data: scan } = await supabase
    .from('latest_scans')
    .select('*')
    .eq('user_id', user.id)
    .eq('owner', params.owner)
    .eq('name', params.repo)
    .single()

  if (!scan) notFound()

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const isPro = profile?.plan === 'pro' || profile?.plan === 'team'
  const evidence = scan.raw_evidence as {
    f1Evidence: string
    f2Evidence: string
    f3Evidence: string
    f4Evidence: string
    dormancyEvidence: string[]
  } | null

  const prescription = dormancyPlaybook(scan.tier as Tier, scan.dormancy_pattern as DormancyPattern)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <a href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900">
          ← Portfolio
        </a>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="bg-white border rounded-lg p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {scan.owner}/{scan.name}
              </h1>
              {scan.language && (
                <span className="text-sm text-gray-400 mt-1 block">{scan.language}</span>
              )}
            </div>
            <TierBadge tier={scan.tier as Tier} />
          </div>

          {/* Feature scores */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              { label: 'F1 — Production dep', value: scan.f1, evidence: evidence?.f1Evidence },
              { label: 'F2 — Human commits', value: scan.f2, evidence: evidence?.f2Evidence },
              { label: 'F3 — Pull requests', value: scan.f3, evidence: evidence?.f3Evidence },
              { label: 'F4 — Docs / CLAUDE.md', value: scan.f4, evidence: evidence?.f4Evidence },
            ].map(({ label, value, evidence: ev }) => (
              <div key={label} className="border rounded-md p-3">
                <div className="flex items-center gap-2">
                  <FeatureChecks value={value} />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </div>
                {ev && <p className="text-xs text-gray-400 mt-1">{ev}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Dormancy diagnosis */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Dormancy diagnosis</h2>
          <div className="inline-block bg-amber-50 border border-amber-200 text-amber-800 text-sm px-3 py-1 rounded-full mb-4">
            {scan.dormancy_pattern.replace(/-/g, ' ')}
          </div>
          {evidence?.dormancyEvidence && (
            <ul className="space-y-1">
              {evidence.dormancyEvidence.map((e, i) => (
                <li key={i} className="text-sm text-gray-600 flex gap-2">
                  <span className="text-gray-300">•</span>
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* AI tool attribution */}
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">AI tools detected</h2>
          {scan.ai_tools.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {(scan.ai_tools as string[]).map((tool) => (
                <span
                  key={tool}
                  className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-1 rounded"
                >
                  {tool}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No AI tools detected in commit history</p>
          )}
          <p className="text-xs text-gray-400 mt-3">
            Human commit ratio: {Math.round(scan.human_commit_ratio * 100)}%
          </p>
        </div>

        {/* Prescription */}
        <div className="bg-white border rounded-lg p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Prescription</h2>
          {prescription ? (
            <div>
              <p className="text-sm text-gray-700 mb-3">{prescription.description}</p>
              {isPro ? (
                <a
                  href={prescription.playbookUrl}
                  className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                  Open: {prescription.playbookName} →
                </a>
              ) : (
                <div className="bg-gray-50 border rounded p-4">
                  <p className="text-sm text-gray-500">
                    Playbook: <strong>{prescription.playbookName}</strong>
                  </p>
                  <a
                    href="/upgrade"
                    className="mt-2 inline-block bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    Upgrade to Pro to unlock
                  </a>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No specific action needed for Tier A repos.</p>
          )}
        </div>
      </main>
    </div>
  )
}
