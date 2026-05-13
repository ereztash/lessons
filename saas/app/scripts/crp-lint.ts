/**
 * CRP Lint — Context Repository Protocol compliance checker.
 *
 * A repo is CRP-compliant if it passes all required checks below.
 * Run on any repo to verify it can function as a machine-readable context provider
 * for dual-repo Claude Code sessions.
 *
 * Usage:
 *   npx tsx scripts/crp-lint.ts [repo-path]   (default: current dir)
 *
 * Exit 0 = compliant. Exit 1 = violations found.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

interface LintResult {
  rule: string
  level: 'error' | 'warning'
  passed: boolean
  message: string
  evidence?: string
}

function countHeadings(content: string, level = 2): number {
  const prefix = '#'.repeat(level) + ' '
  return content.split('\n').filter(l => l.startsWith(prefix)).length
}

function fileContains(path: string, term: string): boolean {
  try {
    return readFileSync(path, 'utf8').toLowerCase().includes(term.toLowerCase())
  } catch {
    return false
  }
}

function listMd(dir: string): string[] {
  try {
    return readdirSync(dir).filter(f => f.endsWith('.md'))
  } catch {
    return []
  }
}

export function lint(repoPath: string): LintResult[] {
  const results: LintResult[] = []
  const p = (...parts: string[]) => join(repoPath, ...parts)

  // ── Required ──────────────────────────────────────────────────────────────

  const claudeMd = p('CLAUDE.md')
  const hasClaudeMd = existsSync(claudeMd)
  results.push({
    rule: 'R01_CLAUDE_MD_EXISTS',
    level: 'error',
    passed: hasClaudeMd,
    message: hasClaudeMd ? 'CLAUDE.md found' : 'CLAUDE.md missing — no Gate 0 entry point',
    evidence: 'CLAUDE.md',
  })

  const hasGate0 = fileContains(claudeMd, 'gate 0')
  results.push({
    rule: 'R02_GATE0_SECTION',
    level: 'error',
    passed: hasGate0,
    message: hasGate0 ? 'Gate 0 section found in CLAUDE.md' : 'CLAUDE.md has no "Gate 0" section — not a protocol entry point, just a doc',
    evidence: 'CLAUDE.md',
  })

  const repoIndex = p('research', 'repo-index.md')
  const hasRepoIndex = existsSync(repoIndex)
  results.push({
    rule: 'R03_REPO_INDEX_EXISTS',
    level: 'error',
    passed: hasRepoIndex,
    message: hasRepoIndex ? 'research/repo-index.md found' : 'research/repo-index.md missing — dual-repo lookup not possible',
    evidence: 'research/repo-index.md',
  })

  if (hasRepoIndex) {
    const content = readFileSync(repoIndex, 'utf8')
    const count = countHeadings(content, 2)
    const ok = count >= 3
    results.push({
      rule: 'R04_REPO_INDEX_ENTRIES',
      level: 'error',
      passed: ok,
      message: ok ? `repo-index has ${count} entries (≥3 required)` : `repo-index has only ${count} entries — minimum 3 required for queryability`,
      evidence: `research/repo-index.md (${count} ## headings)`,
    })
  }

  const pipelinesMds = listMd(p('pipelines'))
  const hasPipelines = pipelinesMds.length >= 1
  results.push({
    rule: 'R05_PIPELINES_EXIST',
    level: 'error',
    passed: hasPipelines,
    message: hasPipelines ? `pipelines/ has ${pipelinesMds.length} pipeline(s)` : 'pipelines/ missing or empty — no session protocols defined',
    evidence: `pipelines/ → [${pipelinesMds.join(', ')}]`,
  })

  const hasDualRepoPipeline = pipelinesMds.includes('dual-repo-session.md')
  results.push({
    rule: 'R06_DUAL_REPO_PIPELINE',
    level: 'error',
    passed: hasDualRepoPipeline,
    message: hasDualRepoPipeline ? 'pipelines/dual-repo-session.md found' : 'pipelines/dual-repo-session.md missing — dual-repo mode has no session protocol',
    evidence: 'pipelines/dual-repo-session.md',
  })

  const skillsMds = listMd(p('.claude', 'skills'))
  const hasSkills = skillsMds.length >= 1
  results.push({
    rule: 'R07_SKILLS_EXIST',
    level: 'error',
    passed: hasSkills,
    message: hasSkills ? `.claude/skills/ has ${skillsMds.length} skill(s)` : '.claude/skills/ missing or empty — no reusable behaviors defined',
    evidence: `.claude/skills/ → [${skillsMds.join(', ')}]`,
  })

  // ── Warnings ─────────────────────────────────────────────────────────────

  const hasMemory = existsSync(p('MEMORY.md'))
  results.push({
    rule: 'W01_MEMORY_MD',
    level: 'warning',
    passed: hasMemory,
    message: hasMemory ? 'MEMORY.md found' : 'MEMORY.md missing — state is not persisted across sessions',
    evidence: 'MEMORY.md',
  })

  const logMd = p('LOG.md')
  const hasLog = existsSync(logMd)
  results.push({
    rule: 'W02_LOG_MD',
    level: 'warning',
    passed: hasLog,
    message: hasLog ? 'LOG.md found' : 'LOG.md missing — no enforcement spine',
  })

  if (hasLog) {
    const humanAuthored = fileContains(logMd, 'environment facts') || fileContains(logMd, 'anti-pattern')
    results.push({
      rule: 'W03_LOG_HUMAN_AUTHORED',
      level: 'warning',
      passed: humanAuthored,
      message: humanAuthored ? 'LOG.md appears human-authored (contains domain-specific sections)' : 'LOG.md may be bot-generated — no "Environment Facts" or "Anti-pattern" section found',
      evidence: 'LOG.md',
    })
  }

  const genesisDir = p('saas', 'app', 'scripts', 'genesis', 'domains')
  const genesisFixtures = existsSync(genesisDir) ? readdirSync(genesisDir).filter(f => f.endsWith('.ts')) : []
  results.push({
    rule: 'W04_GENESIS_FIXTURE',
    level: 'warning',
    passed: genesisFixtures.length >= 1,
    message: genesisFixtures.length >= 1
      ? `Genesis fixtures found: [${genesisFixtures.join(', ')}]`
      : 'No Genesis fixtures — cannot compile domain scaffold for this repo',
    evidence: `saas/app/scripts/genesis/domains/ → [${genesisFixtures.join(', ')}]`,
  })

  const selfFixture = genesisFixtures.some(f => f.replace('.ts', '') === require('path').basename(repoPath))
  results.push({
    rule: 'W05_SELF_FIXTURE',
    level: 'warning',
    passed: selfFixture,
    message: selfFixture ? 'Self-fixture found — repo has compiled itself' : 'No self-fixture — repo has not run Genesis on itself',
    evidence: `saas/app/scripts/genesis/domains/<repo-name>.ts`,
  })

  return results
}

// ── CLI entry ────────────────────────────────────────────────────────────────
if (process.argv[1]?.endsWith('crp-lint.ts')) {
  const repoPath = resolve(process.argv[2] ?? '.')
  const results = lint(repoPath)

  const errors = results.filter(r => r.level === 'error' && !r.passed)
  const warnings = results.filter(r => r.level === 'warning' && !r.passed)
  const passed = results.filter(r => r.passed)

  console.log(`\nCRP Lint — ${repoPath}\n${'─'.repeat(60)}`)
  for (const r of results) {
    const icon = r.passed ? '✓' : r.level === 'error' ? '✗' : '⚠'
    console.log(`${icon}  [${r.rule}] ${r.message}`)
    if (!r.passed && r.evidence) console.log(`   evidence path: ${r.evidence}`)
  }

  console.log(`\n${'─'.repeat(60)}`)
  console.log(`Passed : ${passed.length}/${results.length}`)
  console.log(`Errors : ${errors.length}`)
  console.log(`Warnings: ${warnings.length}`)
  console.log(`Status : ${errors.length === 0 ? '✓ CRP-COMPLIANT' : '✗ NOT COMPLIANT'}`)

  process.exit(errors.length > 0 ? 1 : 0)
}
