import type { CRPScore } from '@/lib/classifier/crp'

interface CRPBadgeProps {
  score: CRPScore
  size?: 'sm' | 'md' | 'lg'
}

export function CRPBadge({ score, size = 'md' }: CRPBadgeProps) {
  const { required, optional, compliant, certified } = score

  const label = certified ? 'CRP-Certified' : compliant ? 'CRP-Compliant' : `CRP ${required}/4`
  const variant = certified ? 'certified' : compliant ? 'compliant' : required >= 2 ? 'partial' : 'fail'

  const variantStyles: Record<string, string> = {
    certified: 'bg-emerald-500 text-white border-emerald-600',
    compliant: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    partial:   'bg-amber-100 text-amber-900 border-amber-300',
    fail:      'bg-zinc-100 text-zinc-700 border-zinc-300',
  }

  const sizeStyles: Record<string, string> = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border font-medium ${variantStyles[variant]} ${sizeStyles[size]}`}
      title={`Required: ${required}/4, Optional: ${optional}/3`}
    >
      {certified && <span aria-hidden>★</span>}
      {label}
    </span>
  )
}

interface CRPRuleListProps {
  score: CRPScore
}

export function CRPRuleList({ score }: CRPRuleListProps) {
  const required = score.rules.filter(r => r.level === 'error')
  const optional = score.rules.filter(r => r.level === 'warning')

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-semibold mb-1">Required ({score.required}/4)</h4>
        <ul className="space-y-1">
          {required.map(r => (
            <li key={r.id} className="flex items-start gap-2 text-sm">
              <span className={r.passed ? 'text-emerald-600' : 'text-rose-600'}>
                {r.passed ? '✓' : '✗'}
              </span>
              <span className="font-mono text-xs">{r.id}</span>
              <span className="text-zinc-600">{r.name}</span>
              <span className="text-zinc-400 text-xs">— {r.evidence}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-1">Optional ({score.optional}/3)</h4>
        <ul className="space-y-1">
          {optional.map(r => (
            <li key={r.id} className="flex items-start gap-2 text-sm">
              <span className={r.passed ? 'text-emerald-600' : 'text-amber-500'}>
                {r.passed ? '✓' : '⚠'}
              </span>
              <span className="font-mono text-xs">{r.id}</span>
              <span className="text-zinc-600">{r.name}</span>
              <span className="text-zinc-400 text-xs">— {r.evidence}</span>
            </li>
          ))}
        </ul>
      </div>
      {!score.compliant && (
        <div className="text-xs text-zinc-600 mt-2 p-2 bg-zinc-50 rounded border border-zinc-200">
          <strong>Next step:</strong> {score.required === 0
            ? 'Start with R1: add a Gate 0 section to CLAUDE.md'
            : score.required === 1
            ? 'Add R2: create research/repo-index.md with module entries'
            : score.required === 2
            ? 'Add R3 and R4: pipelines/ + .claude/skills/'
            : 'One rule away — see the CRP playbook'}
        </div>
      )}
    </div>
  )
}
