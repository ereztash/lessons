# Dual-AI-Surface Workflow — Lovable Renders, Claude Writes

> Tagline: Two AI surfaces, two cognitive moments, one clean cadence — never reverse the polarity.

## Target buyer

**Solo builders who are paying for both a visual-preview AI (Lovable, Bolt.new, v0.dev) and a code-writing AI (Claude Code, Cursor) and feel uncertain about which to use when.**

More specifically: indie hackers and consultants on month 2+ of paid AI subscriptions who suspect they're under-using one tool because they default to the other.

## Rework hours saved per session

**3-8 hours per project** — the cost of either (a) running Lovable-only on a behavioral-success project and hitting the Publish-button wall, or (b) running Claude-only on a brand-surface project and shipping code without ever rendering it for stakeholders.

Over a year of building, the dual-surface cadence converts roughly 2-3 stuck projects into shipped ones.

## Problem statement

Lovable and Claude Code are non-substitutable for distinct cognitive moments. Lovable is the *render-and-review* surface: the operator opens the editor, sees the rendered page, asks for visual tweaks, and shows the result to a stakeholder. Claude Code is the *write-and-commit* surface: the operator authors precise commits with conventional prefixes, opens PRs as decision checkpoints, and integrates external systems. Used together, each surface compensates for the other's weakness. Used singly, each surface forces the operator into the other's failure mode — Lovable-only loses to opaque commits and limited external integration; Claude-only loses to the absence of a live preview for stakeholder iteration. The cadence rule is simple but rarely articulated: open Lovable to see what you built; open Claude Code to change what you built; never reverse the polarity.

## The playbook

### The cadence rules (the polarity)

1. **When you want to look**: open Lovable. Use it as a rendered preview. Show the URL to a stakeholder.
2. **When you want to change**: open Claude Code. Use it as a write surface. Author a commit with a `feat:` or `fix:` prefix.
3. **When you want a stakeholder to interact**: open Lovable's published URL.
4. **When you want to integrate with an external system (API, PWA, third-party SaaS)**: open Claude Code. Lovable cannot handle the integration; Claude Code can.
5. **When you want a no-op preview confirmation**: commit through Lovable's editor (it will create a `Update site info for publish` or `Lovable update: ...` commit). Do not fight this — it's a feature, not a bug; the no-op commit is the operator's mental bookmark.

### The recognition signature (audit your own repos)

In a repo using the dual-surface cadence, you will see alternating commit authors when you run `git log --pretty=format:'%an %s'`:

```
Claude <noreply@anthropic.com>     feat: add Lichess deep-link in PracticePanel
lovable-dev[bot]                    Update site info for publish
Claude <noreply@anthropic.com>     fix: handle PWA install prompt on iOS
lovable-dev[bot]                    Lovable update: check the new text
```

The interleaving within hours (not days) is the diagnostic. A repo with ONLY Claude commits is single-surface (write only — likely missing the stakeholder preview loop). A repo with ONLY Lovable commits is single-surface (render only — likely a Tier-C demo).

### Decision tree at the start of each session

- Do I need to SEE the rendered output? → Open Lovable.
- Do I need a stakeholder to see it? → Open Lovable's published URL.
- Do I need to CHANGE the code precisely (a specific component, a specific commit message, a specific PR title)? → Open Claude Code.
- Do I need to ADD an external integration (form-to-email, analytics, scheduling, real API)? → Open Claude Code.
- Do I need to verify a Lovable preview matches my spec? → Open Lovable, then commit a no-op `Lovable update: check the new text` via Lovable's editor as a bookmark.

### Cadence templates

**Session-start checklist (paste in your day-start note):**

```markdown
## <date> session start
- [ ] I have classified this session as: see / change / integrate / show-stakeholder
- [ ] If see/show-stakeholder: I will open Lovable first.
- [ ] If change/integrate: I will open Claude Code first.
- [ ] I will not reverse the polarity mid-session unless explicitly switching cognitive moments.
```

**Session-end audit (paste in your day-end note):**

```markdown
## <date> session end
- [ ] My commit log shows interleaved Claude + lovable-dev[bot] authors (dual-surface cadence)
- [ ] If only one author appears today, I will note WHY (single cognitive moment only, or polarity error)
- [ ] I have a published Lovable URL to send a stakeholder if asked
```

## Evidence

- **groundstate-protocol** — `e8a12bc` (2026-05-06 12:57) is a no-op preview-check commit by lovable-dev[bot] that lands between Claude PR#8 merge and PR#9 start. The operator opened Lovable to check the rendered output, then returned to Claude Code for PR#9. Reference: groundstate-protocol@11:01.
- **groundstate-protocol** — full alternation throughout the 9-week editorial period: Claude authors `feat: ...` and `Tune landing copy...` commits; lovable-dev[bot] interleaves preview-check commits hours later. Reference: groundstate-protocol@11:00.
- **chess-mind-patterns** — analytics built by bot (33 widgets, 24 engines via Lovable); actions added by human/Claude (8 action widgets backed by 6 engines). 4:1 ratio is the diagnostic of parallel construction rather than sequential refactor. Reference: chess-mind-patterns@11:04.
- **chess-mind-patterns** — wiring file (Index.tsx) became the integration seam where action widgets plug into analytics engines, preserving Lovable's bot work as immutable substrate. Reference: chess-mind-patterns@11:09.

## When to use

- Projects with both a visual stakeholder (someone who wants to see the rendered URL) and a behavioral success condition (something requiring external integration)
- Consulting funnel landing pages (groundstate-protocol shape)
- Skill-improvement tools that need both a polished UI and deep external integrations (chess-mind-patterns shape)
- Any project where you have already paid for both Lovable and Claude Code subscriptions

## When NOT to use

- Pure brand-surface repos with no behavioral success condition (use Lovable-only; the write surface adds cost without value)
- Pure backend / infrastructure / library code with no visual surface (use Claude-only; Lovable adds nothing)
- Single-cognitive-moment sessions (don't force the cadence if you're only going to see OR only going to change)

## Adoption checklist

1. [ ] I have both Lovable and Claude Code accounts active and authenticated.
2. [ ] I have classified each cognitive moment (see / change / integrate / show-stakeholder) for my next 3 sessions.
3. [ ] I have run `git log --pretty=format:'%an'` against my last 3 repos and observed which are single-surface vs dual-surface.
4. [ ] I have committed at least one no-op preview-check commit via Lovable in a Claude-active repo as a deliberate cadence test.
5. [ ] I have set my session-start checklist as a daily note template.
6. [ ] I have not reversed the polarity (changing code via Lovable UI, or rendering for stakeholder via Claude's commit log) for 5 consecutive sessions.
7. [ ] I have a published Lovable URL handy for at least one active project.

## Cross-references

- Insight source: `/insights/user-to-user/dual-ai-surface-workflow.md`
- Companion playbook: `/products/playbooks/ai-cross-review-setup.md` (the multi-AI write-side review pattern)
- Companion playbook: `/products/playbooks/resumer-day-prep.md` (the resumer respects the Lovable-bot substrate)
- Pricing row: `/products/pricing-hypotheses.md`
