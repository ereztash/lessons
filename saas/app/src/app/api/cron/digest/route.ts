import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/service'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function GET(request: Request) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceClient()

  const { data: proUsers, error: usersError } = await supabase
    .from('profiles')
    .select('id, github_username')
    .eq('plan', 'pro')
    .not('github_username', 'is', null)

  if (usersError) return NextResponse.json({ error: usersError.message }, { status: 500 })
  if (!proUsers || proUsers.length === 0) return NextResponse.json({ sent: 0 })

  let sent = 0

  for (const user of proUsers) {
    const { data: scanRows, error: scanError } = await supabase
      .from('repo_scans')
      .select('tier')
      .eq('user_id', user.id)

    if (scanError) continue

    const counts: Record<'A' | 'B' | 'C' | 'D', number> = { A: 0, B: 0, C: 0, D: 0 }
    for (const row of scanRows ?? []) {
      const tier = row.tier as 'A' | 'B' | 'C' | 'D'
      if (tier in counts) counts[tier]++
    }

    const { data: authData } = await supabase.auth.admin.getUserById(user.id)
    const email = authData?.user?.email
    if (!email) continue

    await resend.emails.send({
      from: 'RepoHealth <digest@repohealth.app>',
      to: email,
      subject: 'Your weekly repo health digest',
      text: [
        `Hi ${user.github_username},`,
        `Your portfolio this week:`,
        `  Tier A (Healthy): ${counts.A}`,
        `  Tier B (Partial): ${counts.B}`,
        `  Tier C (Dormant): ${counts.C}`,
        `  Tier D (Non-software): ${counts.D}`,
        `View your dashboard: https://repohealth.app/dashboard`,
      ].join('\n'),
    })

    sent++
  }

  return NextResponse.json({ sent })
}
