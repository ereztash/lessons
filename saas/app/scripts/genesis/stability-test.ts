/**
 * Stability test for the elicitation instrument.
 *
 * Runs LLM elicitation N times on the same intent paragraph and measures
 * how consistent the extracted ProjectSpec IR is across runs.
 *
 * Thresholds for "publishable" (system-review-level research):
 *   entityJaccard  >= 0.80  (entity set overlap across all pairs)
 *   sharpnessStdDev <= 5.0  (sharpness score spread)
 *
 * Usage:
 *   npx tsx stability-test.ts "<intent paragraph>" <domain-label> [runs=5]
 *
 * Exit 0 = stable (publishable). Exit 1 = unstable (tune the prompt first).
 */
import { elicitFromLLM } from './llm-elicitor'
import { validate } from './validator'
import type { ProjectSpec } from './types'

export interface StabilityRun {
  runIndex: number
  sharpnessScore: number
  entityNames: string[]
  antiPatternCount: number
  invariantCount: number
  inputTokens: number
  outputTokens: number
}

export interface StabilityReport {
  domain: string
  intent: string
  runs: number
  promptVersion: string
  model: string
  entityJaccard: number
  sharpnessMean: number
  sharpnessStdDev: number
  antiPatternCountVariance: number
  stable: boolean
  runDetails: StabilityRun[]
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  const intersection = new Set([...a].filter(x => b.has(x)))
  const union = new Set([...a, ...b])
  return union.size === 0 ? 1 : intersection.size / union.size
}

function mean(vals: number[]): number {
  return vals.reduce((s, v) => s + v, 0) / vals.length
}

function stdDev(vals: number[]): number {
  const m = mean(vals)
  return Math.sqrt(mean(vals.map(v => (v - m) ** 2)))
}

function variance(vals: number[]): number {
  const m = mean(vals)
  return mean(vals.map(v => (v - m) ** 2))
}

export async function runStabilityTest(
  intent: string,
  domain: string,
  runs = 5,
  model = 'claude-sonnet-4-6',
): Promise<StabilityReport> {
  const runDetails: StabilityRun[] = []
  let promptVersion = 'unknown'

  for (let i = 0; i < runs; i++) {
    process.stderr.write(`  Run ${i + 1}/${runs}...\n`)
    const result = await elicitFromLLM({ intent, model })
    promptVersion = result.promptVersion
    const report = validate(result.spec)
    runDetails.push({
      runIndex: i,
      sharpnessScore: report.scores.sharpnessScore,
      entityNames: result.spec.entities.map(e => e.name),
      antiPatternCount: result.spec.antiPatterns.length,
      invariantCount: result.spec.invariants.length,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
    })
  }

  const jaccards: number[] = []
  for (let i = 0; i < runDetails.length; i++) {
    for (let j = i + 1; j < runDetails.length; j++) {
      const a = new Set(runDetails[i].entityNames)
      const b = new Set(runDetails[j].entityNames)
      jaccards.push(jaccardSimilarity(a, b))
    }
  }

  const sharpnessScores = runDetails.map(r => r.sharpnessScore)
  const entityJaccard = jaccards.length > 0 ? mean(jaccards) : 1
  const sharpnessMean = mean(sharpnessScores)
  const sharpnessStdDev = stdDev(sharpnessScores)
  const antiPatternCounts = runDetails.map(r => r.antiPatternCount)
  const antiPatternCountVariance = variance(antiPatternCounts)

  return {
    domain,
    intent,
    runs,
    promptVersion,
    model,
    entityJaccard,
    sharpnessMean,
    sharpnessStdDev,
    antiPatternCountVariance,
    stable: entityJaccard >= 0.8 && sharpnessStdDev <= 5,
    runDetails,
  }
}

if (process.argv[1]?.endsWith('stability-test.ts')) {
  const intent = process.argv[2]
  const domain = process.argv[3] ?? 'unknown'
  const runs = parseInt(process.argv[4] ?? '5', 10)

  if (!intent) {
    console.error('Usage: npx tsx stability-test.ts "<intent>" <domain> [runs=5]')
    process.exit(1)
  }

  runStabilityTest(intent, domain, runs).then(report => {
    console.log(JSON.stringify(report, null, 2))
    console.log('\n--- Stability Summary ---')
    console.log(`Prompt version : ${report.promptVersion}`)
    console.log(`Entity Jaccard : ${(report.entityJaccard * 100).toFixed(1)}%  (threshold ≥80%)`)
    console.log(`Sharpness      : ${report.sharpnessMean.toFixed(1)} ± ${report.sharpnessStdDev.toFixed(1)}  (threshold stdDev ≤5)`)
    console.log(`AP count var   : ${report.antiPatternCountVariance.toFixed(2)}`)
    console.log(`Result         : ${report.stable ? '✓ STABLE — instrument publishable' : '✗ UNSTABLE — tune prompt before publishing'}`)
    process.exit(report.stable ? 0 : 1)
  }).catch(err => {
    console.error(err)
    process.exit(1)
  })
}
