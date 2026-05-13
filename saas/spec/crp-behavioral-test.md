# CRP Behavioral Test — v0.3 Design Doc

> **Status**: design only, not implemented. Implementation requires `ANTHROPIC_API_KEY`
> and an SDK harness. Captured as the ground-truth measure for the CRP claim.

## What the CRP claim actually is

"Claude Code can bootstrap a working session on this repo in under 3,000 tokens of
reading, and produce useful output on a representative task without asking
clarifying questions."

This is **behavioral**, not structural. The v0.1 (structure) and v0.2 (content
quality) lints are proxies. v0.3 measures the thing itself.

## Why the proxies aren't enough

- **v0.1 (structural)**: passes stubs. Killed by the migration test.
- **v0.2 (content + structural)**: catches obvious stubs via density, citations,
  placeholder words. But cannot detect: (a) content that's specific but irrelevant,
  (b) content that has the right shape but is wrong about the project.

The behavioral test cuts past both proxies. If a fresh Claude can start work without
clarifications, the repo is CRP-ready by definition.

## Protocol

### Inputs

- A target repo path
- A representative task description ("implement a new endpoint that returns the
  resilience score for a given organization ID")
- A ground-truth file (operator's expected response: what conventions to follow,
  what files to touch, what NOT to do)

### Procedure

1. Spawn a fresh Anthropic API session (no system prompt context except "you are
   Claude Code, starting work on a repo at $PATH; you have not seen this repo
   before")
2. Provide the task description
3. Track all tool calls. Cap at 5,000 tokens of reading before requiring output
4. Allow the model to produce its proposal
5. Score the proposal against the ground-truth file

### Measurements

- **Tokens-to-first-output**: how many tokens of reading occurred before the
  model produced its proposal. Target: <3,000.
- **Clarifying-questions**: did the model ask the operator anything? Target: 0.
- **Convention alignment**: does the proposal cite real files from the repo and
  follow the conventions in CLAUDE.md/LOG.md? Score 0-1 against ground truth.
- **Anti-pattern avoidance**: does the proposal avoid the anti-patterns listed in
  LOG.md or CLAUDE.md? Score 0-1.

### Pass criteria

A repo is **CRP-BEHAVIORALLY-COMPLIANT** when:
- Tokens-to-first-output ≤ 3,000
- Clarifying questions = 0
- Convention alignment ≥ 0.8
- Anti-pattern avoidance ≥ 0.8

## Cost model

Per behavioral test run:
- Input tokens (repo content read): ~5,000 max
- Output tokens (proposal): ~1,000
- Claude Sonnet 4.6 pricing: ~$0.02-0.05 per run

For RepoHealth Pro: budget 10 runs/month per repo = $0.20-0.50/repo/month in
API cost. Sustainable as a Pro feature, not Free.

## Implementation sketch

```typescript
import Anthropic from '@anthropic-ai/sdk'

export interface BehavioralTestResult {
  repoPath: string
  tokensToFirstOutput: number
  clarifyingQuestions: number
  conventionAlignment: number
  antiPatternAvoidance: number
  passed: boolean
}

export async function behavioralTest(
  repoPath: string,
  task: string,
  groundTruth: string,
): Promise<BehavioralTestResult> {
  const client = new Anthropic()

  // 1. Provide the model with a virtual filesystem of the repo (or grant read-only
  //    access via tool use). Track tokens consumed in the file reads.
  // 2. Ask it to propose how to implement `task`.
  // 3. After receiving the proposal, score against `groundTruth`.

  // Implementation TBD — requires either:
  //   (a) Streaming file-read tool that counts tokens
  //   (b) Pre-loading select files and measuring which the model would read

  throw new Error('Not yet implemented — see saas/spec/crp-behavioral-test.md')
}
```

## What this changes for the product

- **Free tier**: `npx crp-lint` (v0.2 structural + content). Local, instant, $0.
- **Pro tier**: behavioral test runs nightly. Tracks repo trajectory over time.
  Alerts when a repo's behavioral score drops.

The free lint is necessary but not sufficient. The behavioral test is sufficient
but costs API tokens. This is the natural tier split for a SaaS.

## Critical residual question

Even with behavioral test: the task and ground-truth come from the operator. If
the operator picks an easy task or a generous ground truth, the test is gameable.

To close this: use Genesis Mode's IR as the ground truth. The ProjectSpec from
Genesis contains anti-patterns, vocabulary, invariants — all testable. A behavioral
test that uses a Genesis-extracted IR as the ground truth is operator-independent.

This makes Genesis and the behavioral test mutually reinforcing:
- Genesis produces the spec
- Behavioral test verifies the repo behaves as the spec predicts
- Sharpness lint verifies the repo files match the spec content quality

Three independent measures of the same underlying claim. That's a real protocol.
