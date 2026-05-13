#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { compile } from './compiler'
import { elicit } from './elicitor'

interface CliArgs {
  domain?: string
  intent?: string
  out: string
  dryRun: boolean
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = { out: './out', dryRun: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--domain' || a === '-d') args.domain = argv[++i]
    else if (a === '--intent' || a === '-i') args.intent = argv[++i]
    else if (a === '--out' || a === '-o') args.out = argv[++i]
    else if (a === '--dry-run') args.dryRun = true
    else if (a === '--help' || a === '-h') {
      printHelp()
      process.exit(0)
    }
  }
  return args
}

function printHelp(): void {
  console.log(`
genesis — RepoHealth forward-mode CLI (prototype)

Usage:
  npx tsx scripts/genesis/index.ts --domain <fixture-name> [--out <dir>]
  npx tsx scripts/genesis/index.ts --intent "<paragraph>" --out <dir>

Options:
  -d, --domain <name>   Use a built-in domain fixture (e.g. "kolzchut")
  -i, --intent <text>   Free-text intent (requires LLM elicitation, not in prototype)
  -o, --out <dir>       Output directory (default ./out)
      --dry-run         Validate and report only, don't write files
  -h, --help            Show this help

Examples:
  npx tsx scripts/genesis/index.ts -d kolzchut -o /tmp/kolzchut
  npx tsx scripts/genesis/index.ts -d kolzchut --dry-run
`)
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  if (!args.domain && !args.intent) {
    console.error('error: must provide --domain or --intent')
    printHelp()
    process.exit(2)
  }

  console.log(`[genesis] eliciting ProjectSpec from domain="${args.domain ?? 'intent'}"...`)
  const spec = await elicit({ domain: args.domain, intent: args.intent })

  console.log(`[genesis] compiling scaffold for project "${spec.meta.name}"...`)
  const output = compile(spec, resolve(args.out))

  console.log('')
  console.log('=== Validation Report ===')
  console.log(`Passed: ${output.validation.passed ? 'YES' : 'NO'}`)
  console.log(`Sharpness score: ${output.validation.scores.sharpnessScore}/100`)
  console.log(`F1 (non-template deps): ${output.validation.scores.f1}`)
  console.log(`F2 (human commit):      ${output.validation.scores.f2}`)
  console.log(`F3 (pull request):      ${output.validation.scores.f3}`)
  console.log(`F4 (documentation):     ${output.validation.scores.f4}`)

  if (output.validation.errors.length > 0) {
    console.log('')
    console.log(`Errors (${output.validation.errors.length}):`)
    for (const e of output.validation.errors) {
      console.log(`  [${e.code}] ${e.message}`)
    }
  }
  if (output.validation.warnings.length > 0) {
    console.log('')
    console.log(`Warnings (${output.validation.warnings.length}):`)
    for (const w of output.validation.warnings) {
      console.log(`  [${w.code}] ${w.message}`)
    }
  }

  if (!output.validation.passed) {
    console.error('')
    console.error('Compile failed. No files written.')
    process.exit(1)
  }

  if (args.dryRun) {
    console.log('')
    console.log(`[dry-run] Would write ${output.files.length} files to ${output.rootDir}`)
    for (const f of output.files) {
      console.log(`  ${f.path} (${f.content.length} bytes)`)
    }
    return
  }

  for (const file of output.files) {
    const dest = join(output.rootDir, file.path)
    mkdirSync(dirname(dest), { recursive: true })
    writeFileSync(dest, file.content, 'utf-8')
  }

  console.log('')
  console.log(`OK  Wrote ${output.files.length} files to ${output.rootDir}`)
  console.log(`OK  Tier A scaffold ready. Open ${output.rootDir} in Claude Code to start building.`)
}

main().catch((err: Error) => {
  console.error('[genesis] error:', err.message)
  process.exit(1)
})
