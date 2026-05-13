#!/usr/bin/env node
/**
 * crp-lint CLI — npx crp-lint [path]
 */
import { lint } from './index'
import { scoreSharpness } from './sharpness'
import { existsSync } from 'fs'
import { resolve } from 'path'

const repoPath = process.argv[2] ?? '.'
if (!existsSync(repoPath)) {
  console.error(`crp-lint: path not found: ${repoPath}`)
  process.exit(2)
}

const result = lint(repoPath)
const sharp = scoreSharpness(repoPath)
const bar = '='.repeat(60)
const sub = '-'.repeat(60)

console.log(`\nCRP Linter v0.2 (structural + content sharpness)`)
console.log(`Repository: ${result.repoPath}`)
console.log(bar)
console.log('\nTier 1 — Structural (R1-R4):')
console.log(sub)
for (const r of result.rules) {
  const icon = r.passed ? '✓' : '✗'
  const tag = r.passed ? 'PASS' : 'FAIL'
  console.log(`[${tag}] ${icon} ${r.id}: ${r.name}`)
  console.log(`       ${r.message}`)
}
console.log('\nOptional (warnings if absent):')
console.log(sub)
for (const w of result.warnings) {
  const icon = w.passed ? '✓' : '⚠'
  const tag = w.passed ? 'PASS' : 'WARN'
  console.log(`[${tag}] ${icon} ${w.id}: ${w.name}`)
  console.log(`       ${w.message}`)
}
console.log('\nTier 2 — Content Sharpness (S1-S5):')
console.log(sub)
for (const r of sharp.rules) {
  const icon = r.score >= 0.7 ? '✓' : r.score >= 0.3 ? '~' : '✗'
  console.log(`[${(r.score * 100).toFixed(0).padStart(3)}] ${icon} ${r.id}: ${r.name}`)
  console.log(`       ${r.evidence}`)
}

console.log('\n' + bar)
console.log(`Structural: ${result.score.required} required + ${result.score.optional} optional`)
console.log(`Sharpness : ${sharp.sharpness}/100  (target ≥70)`)

const compliantFull = result.compliant && sharp.sharpness >= 70
const failedReq = result.rules.filter(r => !r.passed)

if (compliantFull) {
  console.log('RESULT: ✓ CRP-COMPLIANT (structural + content)')
} else if (result.compliant && sharp.sharpness < 70) {
  console.log(`RESULT: ⚠ STRUCTURAL ONLY — sharpness ${sharp.sharpness}/100 (need ≥70)`)
  console.log('         Files exist but lack content density / citations / specifics.')
  console.log('         This is the "stub-pass" failure mode. Files satisfy linter, not goal.')
} else {
  console.log(`RESULT: ✗ NOT COMPLIANT — failed structural: ${failedReq.map(r => r.id).join(', ')}`)
}
console.log('')

process.exit(compliantFull ? 0 : 1)
