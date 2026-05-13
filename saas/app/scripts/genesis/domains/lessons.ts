import type { ProjectSpec } from '../types'

export const lessonsSpec: ProjectSpec = {
  meta: {
    name: 'lessons',
    description: 'A research methodology system that extracts monetizable workflow insights from AI-paired git repositories and compiles them into playbooks, then into a SaaS product.',
    domain: 'research-methodology',
    language: 'mixed',
    createdAt: new Date().toISOString(),
  },
  actors: [
    { name: 'Operator',  role: 'researcher and curator of insights',      frequency: 'daily',   criticality: 'primary' },
    { name: 'Claude',    role: 'AI pair — executes research + compiles',  frequency: 'daily',   criticality: 'primary' },
    { name: 'Buyer',     role: 'consumer of Playbooks',                   frequency: 'rare',    criticality: 'secondary' },
  ],
  entities: [
    { name: 'Repo',      plural: 'Repos',      hebrewName: 'ריפוזיטורי' },
    { name: 'Insight',   plural: 'Insights',   hebrewName: 'ממצא' },
    { name: 'Pattern',   plural: 'Patterns',   hebrewName: 'דפוס' },
    { name: 'Playbook',  plural: 'Playbooks',  hebrewName: 'ספר-משחק' },
    { name: 'Portfolio', plural: 'Portfolios', hebrewName: 'ספרייה',   ownedBy: 'Operator' },
  ],
  transactions: [
    { verb: 'observe',  subject: 'Operator',  object: 'Repo',     invariantRefs: ['INV-001'] },
    { verb: 'distill',  subject: 'Claude',    object: 'Insight',  invariantRefs: ['INV-001', 'INV-003'] },
    { verb: 'promote',  subject: 'Claude',    object: 'Pattern',  invariantRefs: ['INV-003'] },
    { verb: 'ship',     subject: 'Operator',  object: 'Playbook', invariantRefs: ['INV-002'] },
    { verb: 'classify', subject: 'Claude',    object: 'Repo',     invariantRefs: ['INV-004'] },
  ],
  invariants: [
    {
      id: 'INV-001',
      statement: 'Every Insight must cite a source Repo by file path or commit SHA',
      scope: 'Insight',
      severity: 'hard',
    },
    {
      id: 'INV-002',
      statement: 'A Playbook cannot ship without a monetization score of 4 out of 5 or higher',
      scope: 'Playbook',
      severity: 'hard',
    },
    {
      id: 'INV-003',
      statement: 'A Pattern cannot be promoted without evidence from at least two distinct Repos',
      scope: 'Pattern',
      severity: 'hard',
    },
    {
      id: 'INV-004',
      statement: 'Every Repo in the Portfolio must have an entry in the repo-index',
      scope: 'Portfolio',
      severity: 'hard',
    },
    {
      id: 'INV-005',
      statement: 'A Repo classified as Tier D cannot appear as target audience in any Playbook',
      scope: 'Playbook',
      severity: 'hard',
    },
  ],
  antiPatterns: [
    {
      name: 'Bot-authored LOG.md',
      description:
        'Treating a Lovable-generated LOG.md in a Repo as human-authored anti-pattern memory. ' +
        'A Repo with a bot-authored LOG.md does not satisfy the F4 documentation feature — ' +
        'the LOG.md was prompted into existence, not grown from operator friction.',
      citesEntity: 'Repo',
      severity: 'critical',
    },
    {
      name: 'Evidence-free Insight',
      description:
        'Promoting an Insight that describes a Repo behavior without citing a commit SHA or ' +
        'file path. An Insight without an evidence pointer is an opinion, not a finding. ' +
        'Every Insight must trace back to a specific Repo artifact.',
      citesEntity: 'Insight',
      severity: 'critical',
    },
    {
      name: 'Tier D Playbook contamination',
      description:
        'Including a non-software Repo in the target audience of a Playbook without applying ' +
        'the Tier D pre-filter. A Playbook written for Tier D Repos will reach operators who ' +
        'never intended to build runnable software.',
      citesEntity: 'Playbook',
      severity: 'major',
    },
    {
      name: 'Template-inflated F4 score',
      description:
        'Scoring a Repo\'s F4 feature as satisfied based on template-generated docs/ rather than ' +
        'operator-authored content. The nextjs-ai-chatbot Repo is the canonical case: docs/ ' +
        'came from a Vercel template, not from the operator.',
      citesEntity: 'Repo',
      severity: 'major',
    },
  ],
  vocabulary: [
    {
      domainTerm: 'ממצא',
      genericTerm: 'insight',
      definition: 'A falsifiable observation extracted from a Repo artifact — commit, PR, file — with an evidence pointer',
    },
    {
      domainTerm: 'מפעיל',
      genericTerm: 'operator',
      definition: 'The human who commits to a Repo alongside Claude; the person who bears resumption cost',
    },
    {
      domainTerm: 'דפוס',
      genericTerm: 'pattern',
      definition: 'A ממצא that appears in ≥2 Repos at strength ≥2 — promoted from candidate to cross-repo',
    },
    {
      domainTerm: 'ספרייה',
      genericTerm: 'portfolio',
      definition: 'The full set of Repos under one operator — the unit of analysis for the Tier classifier',
    },
  ],
  voiceSamples: {
    good: [
      'דפוס P-017 (publish-button-satisfiability) הועלה ל-MOC: מאומת ב-Repos ampaign-craft@a3f9 ו-groundstate-protocol@7b2c — שניהם מראים Lovable publish event לפני 90 יום dormancy.',
      'Playbook "Resumer Day Prep" נדחה בשער מוניטיזציה: קריטריון evidence-anchored נכשל — ממצא מצטט Repo אחד בלבד. חוזר לשלב דפוס עד Repo שני.',
      'סריקת ספרייה n=25: 9 Repos מקבלים 0/4 על Tier classifier. הופעל Tier D pre-filter — כל 9 חסרים קוד שניתן להרצה. הוסרו מקהל היעד של Playbook.',
      'הפרת INV-003 נתפסה: דפוס "מפעיל-נעדר" הועלה מ-Repo אחד (keepath). הורד לרמת מועמד עד שייצפה Repo שני.',
    ],
    bad: [
      'Updated the docs.',
      'Added some new insights to the research.',
      'Fixed issues with the playbook.',
    ],
  },
}
