import type { ProjectSpec } from './types'
import { kolzchutSpec } from './domains/kolzchut'
import { elicitFromLLM } from './llm-elicitor'

const FIXTURES: Record<string, ProjectSpec> = {
  kolzchut: kolzchutSpec,
}

export interface ElicitOptions {
  domain?: string
  intent?: string
}

export async function elicit(opts: ElicitOptions): Promise<ProjectSpec> {
  if (opts.domain) {
    const spec = FIXTURES[opts.domain]
    if (!spec) {
      throw new Error(
        `No fixture for domain "${opts.domain}". Available: ${Object.keys(FIXTURES).join(', ')}`,
      )
    }
    return spec
  }
  if (opts.intent) {
    const result = await elicitFromLLM({ intent: opts.intent })
    return result.spec
  }
  throw new Error('elicit() requires either --domain <fixture> or --intent "<paragraph>"')
}
