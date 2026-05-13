/**
 * crp-lint — Context Repository Protocol compliance checker.
 *
 * Programmatic API. CLI entry point is in cli.ts.
 *
 * Spec: https://github.com/ereztash/lessons/blob/main/saas/spec/crp-spec.md
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, resolve, basename, extname } from 'path'

export interface RuleResult {
  id: string
  name: string
  level: 'error' | 'warning'
  passed: boolean
  message: string
}

export interface LintResult {
  repoPath: string
  rules: RuleResult[]
  warnings: RuleResult[]
  compliant: boolean
  score: { required: string; optional: string }
}

const FORBIDDEN_HEADINGS = new Set(['overview', 'introduction', 'summary', 'notes', 'table of contents'])

function fileExists(p: string): boolean { try { return statSync(p).isFile() } catch { return false } }
function dirExists(p: string): boolean { try { return statSync(p).isDirectory() } catch { return false } }
function read(p: string): string | null { try { return readFileSync(p, 'utf8') } catch { return null } }
function list(p: string): string[] { try { return readdirSync(p) } catch { return [] } }

function listRec(dir: string): string[] {
  const out: string[] = []
  try {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, e.name)
      if (e.isDirectory()) out.push(...listRec(full))
      else out.push(full)
    }
  } catch {}
  return out
}

function checkR1(p: string): RuleResult {
  const r: RuleResult = { id: 'R1', name: 'Gate 0 entry point', level: 'error', passed: false, message: '' }
  const f = join(p, 'CLAUDE.md')
  if (!fileExists(f)) { r.message = 'CLAUDE.md not found at repo root'; return r }
  const content = read(f); if (!content) { r.message = 'Could not read CLAUDE.md'; return r }
  const lines = content.split('\n')
  let gateStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,6}\s+.*gate\s*0/i.test(lines[i])) { gateStart = i; break }
  }
  if (gateStart < 0) { r.message = 'CLAUDE.md missing "Gate 0" section'; return r }
  let hasList = false
  for (let i = gateStart + 1; i < lines.length; i++) {
    if (/^#{1,6}\s+/.test(lines[i])) break
    if (/^\s*[-*+]\s+/.test(lines[i]) || /^\s*\d+\.\s+/.test(lines[i]) || /^\|/.test(lines[i])) {
      hasList = true; break
    }
  }
  if (!hasList) { r.message = 'Gate 0 section has no read order (list or table)'; return r }
  r.passed = true; r.message = 'CLAUDE.md with Gate 0 section and read order'
  return r
}

function checkR2(p: string): RuleResult {
  const r: RuleResult = { id: 'R2', name: 'Machine-queryable index', level: 'error', passed: false, message: '' }
  const f = join(p, 'research', 'repo-index.md')
  if (!fileExists(f)) { r.message = 'research/repo-index.md not found'; return r }
  const content = read(f); if (!content) { r.message = 'Could not read repo-index.md'; return r }
  const h2s = content.split('\n').filter(l => /^##\s+/.test(l)).map(l => l.replace(/^##\s+/, '').trim())
  if (h2s.length < 3) { r.message = `repo-index has ${h2s.length} entries; need >=3`; return r }
  const forbidden = h2s.filter(h => FORBIDDEN_HEADINGS.has(h.toLowerCase()))
  if (forbidden.length) { r.message = `forbidden generic headings: ${forbidden.join(', ')}`; return r }
  r.passed = true; r.message = `repo-index has ${h2s.length} entries`
  return r
}

function checkR3(p: string): RuleResult {
  const r: RuleResult = { id: 'R3', name: 'Session protocols', level: 'error', passed: false, message: '' }
  const dir = join(p, 'pipelines')
  if (!dirExists(dir)) { r.message = 'pipelines/ directory not found'; return r }
  const files = list(dir)
  const mds = files.filter(f => f.endsWith('.md'))
  if (!mds.length) { r.message = 'pipelines/ has no .md files'; return r }
  if (!files.includes('dual-repo-session.md')) { r.message = 'pipelines/dual-repo-session.md missing'; return r }
  r.passed = true; r.message = `pipelines/ has ${mds.length} pipeline(s)`
  return r
}

function checkR4(p: string): RuleResult {
  const r: RuleResult = { id: 'R4', name: 'Reusable behaviors', level: 'error', passed: false, message: '' }
  const dir = join(p, '.claude', 'skills')
  if (!dirExists(dir)) { r.message = '.claude/skills/ directory not found'; return r }
  const mds = list(dir).filter(f => f.endsWith('.md'))
  if (!mds.length) { r.message = '.claude/skills/ has no .md files'; return r }
  r.passed = true; r.message = `.claude/skills/ has ${mds.length} skill(s)`
  return r
}

function checkW1(p: string): RuleResult {
  const passed = fileExists(join(p, 'MEMORY.md'))
  return { id: 'W1', name: 'State persistence', level: 'warning', passed, message: passed ? 'MEMORY.md exists' : 'MEMORY.md not found' }
}

function checkW2(p: string): RuleResult {
  const r: RuleResult = { id: 'W2', name: 'Enforcement spine', level: 'warning', passed: false, message: '' }
  const f = join(p, 'LOG.md')
  if (!fileExists(f)) { r.message = 'LOG.md not found'; return r }
  const content = read(f)!
  const headings = content.split('\n').filter(l => /^#{1,6}\s+/.test(l)).map(l => l.replace(/^#+\s+/, '').trim().toLowerCase())
  const generic = headings.some(h => ['updates', 'changes'].includes(h))
  if (generic) { r.message = 'LOG.md has generic headings — appears bot-generated'; return r }
  r.passed = true; r.message = 'LOG.md exists with domain-specific sections'
  return r
}

function checkW3(p: string): RuleResult {
  const r: RuleResult = { id: 'W3', name: 'Self-compilation', level: 'warning', passed: false, message: '' }
  const repoName = basename(resolve(p))
  const genesisDir = join(p, 'saas', 'app', 'scripts', 'genesis')
  if (!dirExists(genesisDir)) { r.message = 'no genesis/ — no self-compilation'; return r }
  const match = listRec(genesisDir).find(f => basename(f, extname(f)) === repoName)
  if (!match) { r.message = `no self-fixture matching "${repoName}"`; return r }
  r.passed = true; r.message = `self-fixture: ${match}`
  return r
}

export function lint(repoPath: string): LintResult {
  const rules = [checkR1(repoPath), checkR2(repoPath), checkR3(repoPath), checkR4(repoPath)]
  const warnings = [checkW1(repoPath), checkW2(repoPath), checkW3(repoPath)]
  const compliant = rules.every(r => r.passed)
  return {
    repoPath: resolve(repoPath),
    rules,
    warnings,
    compliant,
    score: {
      required: `${rules.filter(r => r.passed).length}/${rules.length}`,
      optional: `${warnings.filter(w => w.passed).length}/${warnings.length}`,
    },
  }
}
