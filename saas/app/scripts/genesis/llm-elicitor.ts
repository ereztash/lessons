import Anthropic from '@anthropic-ai/sdk'
import type { ProjectSpec } from './types'
import { SYSTEM_PROMPT, PROMPT_VERSION, buildUserPrompt } from './elicitation-prompt'

const client = new Anthropic()

export interface LLMElicitOptions {
  intent: string
  questionAnswers?: Record<string, string>
  model?: string
}

export interface LLMElicitResult {
  spec: ProjectSpec
  promptVersion: string
  model: string
  inputTokens: number
  outputTokens: number
}

export async function elicitFromLLM(opts: LLMElicitOptions): Promise<LLMElicitResult> {
  const model = opts.model ?? 'claude-sonnet-4-6'
  const questionAnswers = opts.questionAnswers ?? {}

  const userPrompt = buildUserPrompt(opts.intent, questionAnswers)

  const message = await client.messages.create({
    model,
    max_tokens: 4096,
    temperature: 0, // temperature=0 is mandatory — any drift is prompt drift, not sampling noise
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''

  let spec: ProjectSpec
  try {
    spec = JSON.parse(text) as ProjectSpec
  } catch {
    throw new Error(
      `LLM returned non-JSON. First 300 chars: ${text.slice(0, 300)}`,
    )
  }

  spec.meta.createdAt = new Date().toISOString()

  return {
    spec,
    promptVersion: PROMPT_VERSION,
    model,
    inputTokens: message.usage.input_tokens,
    outputTokens: message.usage.output_tokens,
  }
}
