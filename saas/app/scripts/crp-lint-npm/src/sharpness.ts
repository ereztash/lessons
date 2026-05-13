/**
 * Content-quality scoring for CRP files.
 *
 * v0.1 measured structure (file exists, heading count). Stubs passed.
 * v0.2 adds content-quality rules borrowed from saas/app/scripts/genesis/validator.ts.
 * Each rule returns score 0-1; overall sharpness is mean × 100.
 *
 * A repo is CRP-COMPLIANT only if:
 *   - Structural (R1-R4) all pass AND
 *   - Sharpness ≥ 70
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const PLACEHOLDER_WORDS = ['todo', 'tbd', 'placeholder', 'stub', 'lorem', 'xxx', 'fixme']
const GENERIC_WORDS = ['etc', 'various', 'stuff', 'thing', 'something', 'somehow']

function read(p: string): string | null { try { return readFileSync(p, 'utf8') } catch { return null } }
function fileExists(p: string): boolean { try { return statSync(p).isFile() } catch { return false } }
function dirExists(p: string): boolean { try { return statSync(p).isDirectory() } catch { return false } }
function list(p: string): string[] { try { return readdirSync(p) } catch { return [] } }

export interface SharpnessRule {
  id: 'S1' | 'S2' | 'S3' | 'S4' | 'S5'
  name: string
  score: number       // 0-1
  evidence: string
}

export interface SharpnessReport {
  rules: SharpnessRule[]
  sharpness: number   // 0-100
}

function countMatches(text: string, regex: RegExp): number {
  return (text.match(regex) ?? []).length
}

function hasPlaceholder(text: string): boolean {
  const lower = text.toLowerCase()
  return PLACEHOLDER_WORDS.some(w => new RegExp(`\\b${w}\\b`).test(lower))
}

function citationCount(text: string): number {
  let n = 0
  n += countMatches(text, /[a-zA-Z0-9_\-/]+\.(ts|tsx|js|jsx|py|md|sql|yml|yaml|json)\b/g) // file paths
  n += countMatches(text, /\b[a-f0-9]{7,40}\b/g)                                            // SHAs
  n += countMatches(text, /[a-zA-Z_][a-zA-Z0-9_]*\(\)/g)                                    // function refs
  n += countMatches(text, /https?:\/\/[^\s)]+/g)                                            // urls
  n += countMatches(text, /\bsrc\/[a-zA-Z0-9_\-/.]+/g)                                       // src paths
  return n
}

// S1 — Gate 0 lists files that actually exist
function scoreS1(repoPath: string): SharpnessRule {
  const claudeMd = read(join(repoPath, 'CLAUDE.md'))
  if (!claudeMd) return { id: 'S1', name: 'Gate 0 substantive', score: 0, evidence: 'CLAUDE.md missing' }

  const lines = claudeMd.split('\n')
  let gateStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,6}\s+.*gate\s*0/i.test(lines[i])) { gateStart = i; break }
  }
  if (gateStart < 0) return { id: 'S1', name: 'Gate 0 substantive', score: 0, evidence: 'no Gate 0 section' }

  // Find listed files: `path.ext` in backticks, or first column of markdown table
  const sectionEnd = lines.findIndex((l, i) => i > gateStart && /^#{1,6}\s+/.test(l))
  const sectionText = lines.slice(gateStart, sectionEnd > 0 ? sectionEnd : undefined).join('\n')

  const fileRefs = new Set<string>()
  for (const m of sectionText.matchAll(/`([a-zA-Z0-9_\-/.]+\.(?:md|ts|tsx|js|py|json|yml|yaml|sql))`/g)) {
    fileRefs.add(m[1])
  }

  if (fileRefs.size < 3) {
    return { id: 'S1', name: 'Gate 0 substantive', score: 0.3, evidence: `Gate 0 lists only ${fileRefs.size} files (need ≥3)` }
  }

  let existing = 0
  for (const f of fileRefs) {
    if (fileExists(join(repoPath, f)) || existsSync(join(repoPath, f))) existing++
  }
  const ratio = existing / fileRefs.size
  return {
    id: 'S1', name: 'Gate 0 substantive',
    score: ratio,
    evidence: `Gate 0 lists ${fileRefs.size} files, ${existing} exist (${(ratio * 100).toFixed(0)}%)`,
  }
}

// S2 — repo-index entries are substantive
function scoreS2(repoPath: string): SharpnessRule {
  const content = read(join(repoPath, 'research/repo-index.md'))
  if (!content) return { id: 'S2', name: 'repo-index entries substantive', score: 0, evidence: 'repo-index.md missing' }

  // Split by `## ` headings (level-2)
  const sections = content.split(/^##\s+/m).slice(1)
  if (sections.length < 3) return { id: 'S2', name: 'repo-index entries substantive', score: 0, evidence: `only ${sections.length} entries` }

  let goodEntries = 0
  const issues: string[] = []
  for (const sec of sections) {
    const body = sec.split('\n').slice(1).join('\n').trim()
    if (body.length < 80) { issues.push('short'); continue }
    if (hasPlaceholder(body)) { issues.push('placeholder'); continue }
    // Must have ≥1 citation
    if (citationCount(body) < 1) { issues.push('no-citation'); continue }
    goodEntries++
  }

  const ratio = goodEntries / sections.length
  return {
    id: 'S2', name: 'repo-index entries substantive',
    score: ratio,
    evidence: `${goodEntries}/${sections.length} entries substantive` + (issues.length ? ` (issues: ${issues.join(',')})` : ''),
  }
}

// S3 — each pipeline is substantive
function scoreS3(repoPath: string): SharpnessRule {
  const dir = join(repoPath, 'pipelines')
  if (!dirExists(dir)) return { id: 'S3', name: 'pipelines substantive', score: 0, evidence: 'pipelines/ missing' }
  const mds = list(dir).filter(f => f.endsWith('.md'))
  if (!mds.length) return { id: 'S3', name: 'pipelines substantive', score: 0, evidence: 'pipelines/ empty' }

  let good = 0
  const issues: string[] = []
  for (const f of mds) {
    const c = read(join(dir, f))
    if (!c) { issues.push(`${f}:unreadable`); continue }
    if (c.length < 300) { issues.push(`${f}:short(${c.length})`); continue }
    const stepCount = countMatches(c, /^\s*(\d+\.|\-|\*)\s+/gm)
    if (stepCount < 3) { issues.push(`${f}:few-steps(${stepCount})`); continue }
    if (hasPlaceholder(c)) { issues.push(`${f}:placeholder`); continue }
    good++
  }

  const ratio = good / mds.length
  return {
    id: 'S3', name: 'pipelines substantive',
    score: ratio,
    evidence: `${good}/${mds.length} pipelines substantive` + (issues.length ? ` (${issues.slice(0, 2).join(',')})` : ''),
  }
}

// S4 — each skill is substantive
function scoreS4(repoPath: string): SharpnessRule {
  const dir = join(repoPath, '.claude/skills')
  if (!dirExists(dir)) return { id: 'S4', name: 'skills substantive', score: 0, evidence: '.claude/skills/ missing' }
  const mds = list(dir).filter(f => f.endsWith('.md'))
  if (!mds.length) return { id: 'S4', name: 'skills substantive', score: 0, evidence: 'no skills' }

  let good = 0
  const issues: string[] = []
  for (const f of mds) {
    const c = read(join(dir, f))
    if (!c) { issues.push(`${f}:unreadable`); continue }
    if (c.length < 150) { issues.push(`${f}:short(${c.length})`); continue }
    if (hasPlaceholder(c)) { issues.push(`${f}:placeholder`); continue }
    const hasTrigger = /\b(when|signals?|triggers?):/i.test(c)
    const hasOutput = /\b(output|produces?|cascade|emits?):/i.test(c)
    if (!hasTrigger) { issues.push(`${f}:no-trigger`); continue }
    if (!hasOutput) { issues.push(`${f}:no-output`); continue }
    good++
  }

  const ratio = good / mds.length
  return {
    id: 'S4', name: 'skills substantive',
    score: ratio,
    evidence: `${good}/${mds.length} skills substantive` + (issues.length ? ` (${issues.slice(0, 2).join(',')})` : ''),
  }
}

// S5 — citation density across CRP files
function scoreS5(repoPath: string): SharpnessRule {
  const files = [
    'CLAUDE.md',
    'LOG.md',
    'MEMORY.md',
    'research/repo-index.md',
  ]
  // Add all pipelines/ and .claude/skills/ files
  const pipelinesDir = join(repoPath, 'pipelines')
  if (dirExists(pipelinesDir)) {
    for (const f of list(pipelinesDir).filter(f => f.endsWith('.md'))) {
      files.push(`pipelines/${f}`)
    }
  }
  const skillsDir = join(repoPath, '.claude/skills')
  if (dirExists(skillsDir)) {
    for (const f of list(skillsDir).filter(f => f.endsWith('.md'))) {
      files.push(`.claude/skills/${f}`)
    }
  }

  let totalChars = 0
  let totalCites = 0
  let filesRead = 0
  for (const f of files) {
    const c = read(join(repoPath, f))
    if (!c) continue
    totalChars += c.length
    totalCites += citationCount(c)
    filesRead++
  }

  if (totalChars === 0) return { id: 'S5', name: 'citation density', score: 0, evidence: 'no CRP files readable' }

  const densityPer1k = (totalCites / totalChars) * 1000
  // Target: ≥3 citations per 1000 chars. score = min(1, density/3)
  const score = Math.min(1, densityPer1k / 3)
  return {
    id: 'S5', name: 'citation density',
    score,
    evidence: `${totalCites} citations across ${(totalChars / 1000).toFixed(1)}k chars in ${filesRead} files = ${densityPer1k.toFixed(2)}/1k (target ≥3)`,
  }
}

export function scoreSharpness(repoPath: string): SharpnessReport {
  const rules = [
    scoreS1(repoPath),
    scoreS2(repoPath),
    scoreS3(repoPath),
    scoreS4(repoPath),
    scoreS5(repoPath),
  ]
  const sharpness = Math.round((rules.reduce((s, r) => s + r.score, 0) / rules.length) * 100)
  return { rules, sharpness }
}
