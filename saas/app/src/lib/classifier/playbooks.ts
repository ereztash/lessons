import type { Tier, DormancyPattern } from './types'

type Prescription = {
  playbookName: string
  playbookUrl: string
  description: string
}

export function dormancyPlaybook(
  tier: Tier,
  pattern: DormancyPattern
): Prescription | null {
  if (tier === 'A') return null

  switch (pattern) {
    case 'publish-button-satisfied':
      return {
        playbookName: 'Publish-Button Intent Triage',
        playbookUrl: '/playbooks/publish-button-intent-triage',
        description:
          'This repo stopped after the Lovable/Bolt publish step. The playbook helps you decide: continue to production, archive it, or extract the idea into a new sprint.',
      }
    case 'operator-absent':
      return {
        playbookName: 'Resumer Day Prep',
        playbookUrl: '/playbooks/resumer-day-prep',
        description:
          "Claude built the system but the operator never resumed. The Resumer Day Prep playbook gives you a structured way to re-enter a sprint you didn't start.",
      }
    case 'bot-only':
      return {
        playbookName: 'Four-Feature Tier Classifier',
        playbookUrl: '/playbooks/four-feature-tier-classifier',
        description:
          'This repo has only bot commits and no human follow-up. Run the Tier Classifier manually to decide if the idea is worth continuing.',
      }
    case 'abandoned-early':
      return {
        playbookName: 'Resumer Day Prep',
        playbookUrl: '/playbooks/resumer-day-prep',
        description:
          'Fewer than 5 commits and dormant. Use the Resumer Day Prep playbook to decide if a 1-sprint rescue is worth attempting.',
      }
    case 'non-software':
      return {
        playbookName: 'Archive',
        playbookUrl: '#',
        description:
          'No code files detected. This appears to be a notes, data, or config repository. Consider archiving it on GitHub to reduce noise in your portfolio.',
      }
    case 'healthy':
    default:
      return null
  }
}
