import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PortfolioDashboard } from '@/components/portfolio-dashboard'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/signin')

  // Load latest scans from DB
  const { data: scans } = await supabase
    .from('latest_scans')
    .select('*')
    .eq('user_id', user.id)
    .order('tier', { ascending: true })

  // Load user profile for plan check
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, github_username')
    .eq('id', user.id)
    .single()

  return (
    <PortfolioDashboard
      scans={scans ?? []}
      plan={profile?.plan ?? 'free'}
      githubUsername={profile?.github_username ?? ''}
    />
  )
}
