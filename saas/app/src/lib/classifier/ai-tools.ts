import type { AITool, CommitSummary } from './types'

type BotFingerprint = {
  tool: AITool
  emailPatterns: RegExp[]
  namePatterns: RegExp[]
  messagePatterns: RegExp[]
}

const BOT_FINGERPRINTS: BotFingerprint[] = [
  {
    tool: 'lovable',
    emailPatterns: [/lovable-dev\[bot\]/i, /lovable@/i],
    namePatterns: [/lovable/i],
    messagePatterns: [],
  },
  {
    tool: 'claude-code',
    emailPatterns: [/noreply@anthropic\.com/i],
    namePatterns: [/^claude$/i],
    messagePatterns: [],
  },
  {
    tool: 'cursor',
    emailPatterns: [/cursor/i],
    namePatterns: [/cursor/i],
    messagePatterns: [/^\[cursor\]/i],
  },
  {
    tool: 'bolt',
    emailPatterns: [/bolt\[bot\]/i, /bolt@/i],
    namePatterns: [/^bolt$/i],
    messagePatterns: [],
  },
  {
    tool: 'v0',
    emailPatterns: [/v0-dev\[bot\]/i],
    namePatterns: [/^v0$/i],
    messagePatterns: [],
  },
  {
    tool: 'copilot',
    emailPatterns: [/github-actions\[bot\]/i, /copilot.*@github\.com/i],
    namePatterns: [/github copilot/i],
    messagePatterns: [],
  },
]

export function isBot(commit: CommitSummary): boolean {
  return BOT_FINGERPRINTS.some((fp) => matchesFingerprint(commit, fp))
}

export function detectAITools(commits: CommitSummary[]): AITool[] {
  const detected = new Set<AITool>()

  for (const commit of commits) {
    for (const fp of BOT_FINGERPRINTS) {
      if (matchesFingerprint(commit, fp)) {
        detected.add(fp.tool)
      }
    }
    // Check for unknown bots (GitHub Actions, Dependabot, etc.)
    if (
      !detected.size &&
      (commit.authorEmail.includes('[bot]') ||
        commit.authorName.toLowerCase().includes('[bot]'))
    ) {
      detected.add('unknown-bot')
    }
  }

  return Array.from(detected)
}

export function humanCommitRatio(commits: CommitSummary[]): number {
  if (commits.length === 0) return 0
  const humanCount = commits.filter((c) => !isBot(c)).length
  return humanCount / commits.length
}

function matchesFingerprint(
  commit: CommitSummary,
  fp: BotFingerprint
): boolean {
  return (
    fp.emailPatterns.some((p) => p.test(commit.authorEmail)) ||
    fp.namePatterns.some((p) => p.test(commit.authorName)) ||
    fp.messagePatterns.some((p) => p.test(commit.message))
  )
}
