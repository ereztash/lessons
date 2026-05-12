import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { scanAllRepos } from '@/lib/github/scanner'
import { classifyRepo } from '@/lib/classifier'

export async function POST() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get GitHub access token from Supabase session
  const { data: { session } } = await supabase.auth.getSession()
  const accessToken = session?.provider_token

  if (!accessToken) {
    return NextResponse.json(
      { error: 'GitHub access token not available. Please sign in again.' },
      { status: 401 }
    )
  }

  try {
    const inputs = await scanAllRepos(accessToken)
    const results = inputs.map(classifyRepo)

    // Upsert all results into Supabase
    const rows = results.map((r) => ({
      user_id: user.id,
      github_repo_id: r.githubRepoId,
      owner: r.owner,
      name: r.name,
      language: r.language,
      last_commit_at: r.lastCommitAt?.toISOString() ?? null,
      f1: r.scores.f1,
      f2: r.scores.f2,
      f3: r.scores.f3,
      f4: r.scores.f4,
      tier: r.tier,
      dormancy_pattern: r.dormancyPattern,
      ai_tools: r.aiTools,
      human_commit_ratio: r.humanCommitRatio,
      raw_evidence: r.evidence,
      scanned_at: r.scannedAt.toISOString(),
    }))

    const { error } = await supabase.from('repo_scans').insert(rows)

    if (error) throw error

    return NextResponse.json({ scanned: results.length })
  } catch (err) {
    console.error('Scan error:', err)
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 })
  }
}
