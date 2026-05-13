import type { ProjectSpec } from './types'
import { kolzchutSpec } from './domains/kolzchut'

const FIXTURES: Record<string, ProjectSpec> = {
  kolzchut: kolzchutSpec,
}

export interface ElicitOptions {
  domain?: string
  intent?: string
}

export async function elicit(opts: ElicitOptions): Promise<ProjectSpec> {
  if (opts.intent && !opts.domain) {
    throw new Error(
      'LLM elicitation from free-text intent is not implemented in the prototype. ' +
      'Use --domain <fixture-name> instead. ' +
      'Available fixtures: ' + Object.keys(FIXTURES).join(', '),
    )
  }
  if (!opts.domain) {
    throw new Error('elicit() requires either --domain or --intent')
  }
  const spec = FIXTURES[opts.domain]
  if (!spec) {
    throw new Error(
      `No fixture for domain "${opts.domain}". Available: ${Object.keys(FIXTURES).join(', ')}`,
    )
  }
  return spec
}
