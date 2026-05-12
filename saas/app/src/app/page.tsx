import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-semibold text-lg">RepoHealth</span>
        <Link
          href="/auth/signin"
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 transition-colors"
        >
          Sign in with GitHub
        </Link>
      </nav>

      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Know exactly which repos to revive—and which to archive
        </h1>
        <p className="mt-6 text-lg text-gray-600">
          RepoHealth scans your GitHub portfolio, scores every repo with the 4-feature tier
          classifier, and diagnoses <em>why</em> dormant repos went quiet — in 60 seconds.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/auth/signin"
            className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-700 transition-colors"
          >
            Scan my portfolio
          </Link>
          <a
            href="#how-it-works"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            How it works
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">Free for public repos. No credit card required.</p>
      </section>

      <section id="how-it-works" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '1',
              title: 'Connect GitHub',
              desc: 'Sign in with GitHub OAuth. We request read-only access. No code is ever stored.',
            },
            {
              step: '2',
              title: 'Get scored',
              desc: 'Every repo gets a Tier A–D score based on 4 signals: production deps, human commits, PRs, and documentation.',
            },
            {
              step: '3',
              title: 'See the diagnosis',
              desc: 'Each dormant repo gets a pattern: publish-button satisfied, operator-absent, bot-only, or abandoned-early — with evidence.',
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Built from real data</h2>
          <p className="text-gray-600">
            The 4-feature classifier was validated against 25 GitHub repos, confirming 8 hypotheses
            about why AI-assisted projects succeed or go dormant. This isn&apos;t guesswork — it&apos;s
            pattern-matched from git history.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            {[
              { n: '25', label: 'repos classified' },
              { n: '8', label: 'hypotheses validated' },
              { n: '6', label: 'dormancy patterns' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-gray-900">{stat.n}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t px-6 py-8 text-center text-sm text-gray-400">
        RepoHealth — built by{' '}
        <a
          href="https://github.com/ereztash"
          className="underline hover:text-gray-600"
        >
          ereztash
        </a>
      </footer>
    </main>
  )
}
