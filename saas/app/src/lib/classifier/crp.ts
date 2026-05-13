/**
 * CRP (Context Repository Protocol) compliance check — adapted for the SaaS scanner.
 *
 * Unlike the local `crp-lint` (which reads from disk), this version operates on
 * GitHub API responses already fetched by the scanner.
 *
 * Spec: saas/spec/crp-spec.md (v0.1)
 */

export interface RepoTreeEntry {
  path: string
  type: 'blob' | 'tree'
}

export interface RepoFileContent {
  path: string
  content: string
}

export interface CRPCheckInput {
  tree: RepoTreeEntry[]              // git tree at HEAD
  claudeMd?: string                  // CLAUDE.md content if present
  logMd?: string                     // LOG.md content if present
  repoIndexMd?: string               // research/repo-index.md content if present
  repoName: string                   // for W3 self-fixture check
}

export interface CRPRuleResult {
  id: 'R1' | 'R2' | 'R3' | 'R4' | 'W1' | 'W2' | 'W3'
  name: string
  level: 'error' | 'warning'
  passed: boolean
  evidence: string
}

export interface CRPScore {
  required: number       // 0-4
  optional: number       // 0-3
  compliant: boolean     // required === 4
  certified: boolean     // required === 4 AND optional === 3
  rules: CRPRuleResult[]
}

const FORBIDDEN_HEADINGS = new Set(['overview', 'introduction', 'summary', 'notes', 'table of contents'])

function hasFile(tree: RepoTreeEntry[], path: string): boolean {
  return tree.some(e => e.type === 'blob' && e.path === path)
}

function hasDir(tree: RepoTreeEntry[], path: string): boolean {
  return tree.some(e => e.path === path || e.path.startsWith(path + '/'))
}

function listFilesInDir(tree: RepoTreeEntry[], dir: string, ext = '.md'): string[] {
  const prefix = dir.endsWith('/') ? dir : dir + '/'
  return tree
    .filter(e => e.type === 'blob' && e.path.startsWith(prefix) && e.path.endsWith(ext))
    .map(e => e.path.slice(prefix.length))
    .filter(p => !p.includes('/'))
}

function findGate0Section(claudeMd: string): { found: boolean; hasReadOrder: boolean } {
  const lines = claudeMd.split('\n')
  let gateStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,6}\s+.*gate\s*0/i.test(lines[i])) { gateStart = i; break }
  }
  if (gateStart < 0) return { found: false, hasReadOrder: false }
  for (let i = gateStart + 1; i < lines.length; i++) {
    if (/^#{1,6}\s+/.test(lines[i])) break
    if (/^\s*[-*+]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]) || /^\|/.test(lines[i])) {
      return { found: true, hasReadOrder: true }
    }
  }
  return { found: true, hasReadOrder: false }
}

function countH2Entries(md: string): { count: number; forbidden: string[] } {
  const h2s = md.split('\n').filter(l => /^##\s+/.test(l)).map(l => l.replace(/^##\s+/, '').trim())
  const forbidden = h2s.filter(h => FORBIDDEN_HEADINGS.has(h.toLowerCase()))
  return { count: h2s.length, forbidden }
}

function logIsHumanAuthored(logMd: string): boolean {
  const headings = logMd.split('\n').filter(l => /^#{1,6}\s+/.test(l)).map(l => l.replace(/^#+\s+/, '').trim().toLowerCase())
  return !headings.some(h => h === 'updates' || h === 'changes')
}

export function checkCRP(input: CRPCheckInput): CRPScore {
  const rules: CRPRuleResult[] = []

  // R1 — Gate 0 entry point
  if (!input.claudeMd) {
    rules.push({ id: 'R1', name: 'Gate 0 entry point', level: 'error', passed: false, evidence: 'CLAUDE.md not found' })
  } else {
    const g = findGate0Section(input.claudeMd)
    if (!g.found) {
      rules.push({ id: 'R1', name: 'Gate 0 entry point', level: 'error', passed: false, evidence: 'CLAUDE.md exists but no "Gate 0" section' })
    } else if (!g.hasReadOrder) {
      rules.push({ id: 'R1', name: 'Gate 0 entry point', level: 'error', passed: false, evidence: 'Gate 0 section has no read order' })
    } else {
      rules.push({ id: 'R1', name: 'Gate 0 entry point', level: 'error', passed: true, evidence: 'CLAUDE.md with Gate 0 section + read order' })
    }
  }

  // R2 — Machine-queryable index
  if (!input.repoIndexMd) {
    rules.push({ id: 'R2', name: 'Machine-queryable index', level: 'error', passed: false, evidence: 'research/repo-index.md not found' })
  } else {
    const { count, forbidden } = countH2Entries(input.repoIndexMd)
    if (count < 3) {
      rules.push({ id: 'R2', name: 'Machine-queryable index', level: 'error', passed: false, evidence: `repo-index has ${count} entries; need >=3` })
    } else if (forbidden.length) {
      rules.push({ id: 'R2', name: 'Machine-queryable index', level: 'error', passed: false, evidence: `forbidden generic headings: ${forbidden.join(', ')}` })
    } else {
      rules.push({ id: 'R2', name: 'Machine-queryable index', level: 'error', passed: true, evidence: `repo-index has ${count} entries` })
    }
  }

  // R3 — Session protocols
  if (!hasDir(input.tree, 'pipelines')) {
    rules.push({ id: 'R3', name: 'Session protocols', level: 'error', passed: false, evidence: 'pipelines/ directory missing' })
  } else {
    const pipelineFiles = listFilesInDir(input.tree, 'pipelines', '.md')
    if (!pipelineFiles.length) {
      rules.push({ id: 'R3', name: 'Session protocols', level: 'error', passed: false, evidence: 'pipelines/ has no .md files' })
    } else if (!pipelineFiles.includes('dual-repo-session.md')) {
      rules.push({ id: 'R3', name: 'Session protocols', level: 'error', passed: false, evidence: 'pipelines/dual-repo-session.md missing' })
    } else {
      rules.push({ id: 'R3', name: 'Session protocols', level: 'error', passed: true, evidence: `pipelines/ has ${pipelineFiles.length} file(s)` })
    }
  }

  // R4 — Reusable behaviors
  const skillFiles = listFilesInDir(input.tree, '.claude/skills', '.md')
  if (!hasDir(input.tree, '.claude/skills')) {
    rules.push({ id: 'R4', name: 'Reusable behaviors', level: 'error', passed: false, evidence: '.claude/skills/ directory missing' })
  } else if (!skillFiles.length) {
    rules.push({ id: 'R4', name: 'Reusable behaviors', level: 'error', passed: false, evidence: '.claude/skills/ has no .md files' })
  } else {
    rules.push({ id: 'R4', name: 'Reusable behaviors', level: 'error', passed: true, evidence: `.claude/skills/ has ${skillFiles.length} skill(s)` })
  }

  // W1 — State persistence
  const hasMemory = hasFile(input.tree, 'MEMORY.md')
  rules.push({ id: 'W1', name: 'State persistence', level: 'warning', passed: hasMemory, evidence: hasMemory ? 'MEMORY.md present' : 'MEMORY.md missing' })

  // W2 — Enforcement spine
  if (!input.logMd) {
    rules.push({ id: 'W2', name: 'Enforcement spine', level: 'warning', passed: false, evidence: 'LOG.md missing' })
  } else if (!logIsHumanAuthored(input.logMd)) {
    rules.push({ id: 'W2', name: 'Enforcement spine', level: 'warning', passed: false, evidence: 'LOG.md appears bot-generated (generic headings)' })
  } else {
    rules.push({ id: 'W2', name: 'Enforcement spine', level: 'warning', passed: true, evidence: 'LOG.md with domain-specific sections' })
  }

  // W3 — Self-compilation
  const fixturePath = `saas/app/scripts/genesis/domains/${input.repoName}.ts`
  const hasFixture = hasFile(input.tree, fixturePath)
  rules.push({ id: 'W3', name: 'Self-compilation', level: 'warning', passed: hasFixture, evidence: hasFixture ? `self-fixture: ${fixturePath}` : 'no self-fixture' })

  const required = rules.filter(r => r.level === 'error' && r.passed).length
  const optional = rules.filter(r => r.level === 'warning' && r.passed).length

  return {
    required,
    optional,
    compliant: required === 4,
    certified: required === 4 && optional === 3,
    rules,
  }
}
