#!/usr/bin/env node
/**
 * crp-lint CLI — npx crp-lint [path]
 */
import { lint } from './index'
import { existsSync } from 'fs'
import { resolve } from 'path'

const repoPath = process.argv[2] ?? '.'
if (!existsSync(repoPath)) {
  console.error(`crp-lint: path not found: ${repoPath}`)
  process.exit(2)
}

const result = lint(repoPath)
const bar = '='.repeat(60)
const sub = '-'.repeat(60)

console.log(`\nCRP Linter v0.1`)
console.log(`Repository: ${result.repoPath}`)
console.log(bar)
console.log('\nRequired Rules:')
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
console.log('\n' + bar)
console.log(`Required: ${result.score.required}`)
console.log(`Optional: ${result.score.optional}`)
const failedReq = result.rules.filter(r => !r.passed)
if (result.compliant) {
  console.log('RESULT: ✓ CRP-COMPLIANT')
} else {
  console.log(`RESULT: ✗ NOT COMPLIANT — failed: ${failedReq.map(r => r.id).join(', ')}`)
  console.log(`\nNext step: read https://github.com/ereztash/lessons/blob/main/products/playbooks/crp-discipline.md`)
}
console.log('')

process.exit(result.compliant ? 0 : 1)
