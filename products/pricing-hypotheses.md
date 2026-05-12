# Pricing Hypotheses

> Monetization map for each shipped playbook. Updated by `/lesson-ship`.

## Format

```markdown
## <Playbook Name>
- **Path**: `/products/playbooks/<name>.md`
- **Target buyer**: <named segment>
- **Rework hours saved per session**: N
- **Suggested price range**: $X – $Y USD
- **Pricing rationale**: <hours × $/hr × confidence multiplier>
- **Distribution channel hypothesis**: <Gumroad / LinkedIn / Substack / direct>
- **Confidence**: low | medium | high
- **Date shipped**: YYYY-MM-DD
```

## Playbooks

### Publish-Button Intent Triage
- **Path**: `/products/playbooks/publish-button-intent-triage.md`
- **Target buyer**: Solo AI-paired builders who have started ≥3 Lovable/Bolt/v0 repos and abandoned at least one without ever opening a local editor.
- **Rework hours saved per session**: 2-6 hours per misallocated repo; 8-15 hours per 10-repo portfolio.
- **Suggested price range**: $39 – $79 USD
- **Pricing rationale**: 4 hours saved (midpoint) × $100/hr indie rate × 20% capture rate = $80 nominal. Discount 25% for low buyer-research friction (clear self-classification), arriving at $39-$79. Anchored on "a single decision saves more than the price of the playbook."
- **Distribution channel hypothesis**: Gumroad first (low friction); X/LinkedIn organic posts in indie-hacker channels; cross-sell into the Tier Classifier bundle. Substack newsletter feature for the editorial pull.
- **Confidence**: high — strongest single predictor in the dataset (H2 confirmed across 4 repos), 5/5 audit score, generalizes to non-Lovable platforms.
- **Date shipped**: 2026-05-12

### Four-Feature Tier Classifier
- **Path**: `/products/playbooks/four-feature-tier-classifier.md`
- **Target buyer**: Solo AI-paired builders with portfolios of 5+ LLM-tool-paired repos who feel overwhelmed during portfolio review.
- **Rework hours saved per session**: 1-3 hours per portfolio review (10-repo portfolio); 8-20 hours per year cumulative.
- **Suggested price range**: $29 – $59 USD
- **Pricing rationale**: 2 hours saved (midpoint) × $100/hr × 15% capture = $30 nominal. Slight premium for the bundled CLI/Action script ($59 top-end). Anchored on "one quarterly review pays for the playbook."
- **Distribution channel hypothesis**: Gumroad bundle with Intent Triage playbook (60% of sum-of-individuals). GitHub Marketplace listing for the Action variant. Indie-hacker newsletters for the CLI variant.
- **Confidence**: high — 5/5 audit score, evidence in all 4 repos, easily verifiable via the CSV-output schema.
- **Date shipped**: 2026-05-12

### Dual-AI-Surface Workflow
- **Path**: `/products/playbooks/dual-ai-surface-workflow.md`
- **Target buyer**: Solo builders paying for BOTH a visual-preview AI (Lovable / Bolt / v0) and a code-writing AI (Claude Code / Cursor) who suspect they're under-using one.
- **Rework hours saved per session**: 3-8 hours per project; 2-3 stuck projects per year converted to shipped.
- **Suggested price range**: $49 – $99 USD
- **Pricing rationale**: 5 hours saved (midpoint) × $100/hr × 12% capture = $60 nominal. The buyer is paying for both subscriptions (~$40-$60/mo combined), so they have already proven willingness to spend; price at 1-2x monthly subscription cost.
- **Distribution channel hypothesis**: LinkedIn organic for the consultant-buyer angle; X for the indie-hacker angle. Bundle with AI Cross-Review setup for builders who already own both subscriptions.
- **Confidence**: medium-high — 5/5 audit score; evidence in 2 repos but the recognition-signature template (interleaved commit authors) makes the pattern self-verifying for any buyer who runs `git log` on their own repo.
- **Date shipped**: 2026-05-12

### AI Cross-Review Setup
- **Path**: `/products/playbooks/ai-cross-review-setup.md`
- **Target buyer**: Solo builders shipping production-adjacent code with a single AI who have recently shipped a bug a second pair of eyes would have caught.
- **Rework hours saved per session**: 2-4 hours per caught bug; 4-12 hours per quarter (2-3 caught bugs).
- **Suggested price range**: $59 – $129 USD
- **Pricing rationale**: 8 hours saved (midpoint, quarterly) × $100/hr × 12% capture = $96 nominal. Premium for the two distinct templates (concurrent + batch). Anchored on "one caught P1 bug pays for the playbook."
- **Distribution channel hypothesis**: LinkedIn (consulting / dev-lead angle); GitHub README for repos showcasing the multi-AI signatures. Direct sale at the high end ($129) bundled with a 30-minute consult; Gumroad at the low end ($59) self-serve.
- **Confidence**: medium — 5/5 audit score on procedural reusability, but evidence is one concurrent event + one batch event (n=2). The defensibility argument is strong (Codex+Claude pairing is not widely documented elsewhere) but n=2 limits confidence on the per-bug rate.
- **Date shipped**: 2026-05-12

### Resumer Day Prep
- **Path**: `/products/playbooks/resumer-day-prep.md`
- **Target buyer**: Solo Lovable-builders on month 2+ with one or more dormant repos who want to resume the most promising one in a single sitting.
- **Rework hours saved per session**: 1-3 hours per resumption attempt; 12-36 hours per year if one failed attempt is converted to shipped per month.
- **Suggested price range**: $39 – $79 USD
- **Pricing rationale**: 2 hours saved (midpoint) × $100/hr × 18% capture (urgent buyer at a moment of attempted resumption) = $36 nominal. Premium for the time-boxed phase breakdown ($79 top-end). The buyer is in an emotional moment ("I want to come back to this project"); willingness-to-pay is elevated.
- **Distribution channel hypothesis**: Gumroad as a single playbook; bundle with Intent Triage + Tier Classifier as "the Lovable Resumption Trilogy" at $99 combined. Substack feature for editorial reach.
- **Confidence**: high — 5/5 audit score; evidence cleanly anchored to chess-mind-patterns' 72-minute sprint and groundstate-protocol's pivot. The time-budget framing is unique to the dataset and not on the first Google page.
- **Date shipped**: 2026-05-12

## Pricing principles

1. **Anchor on rework hours saved** — if a playbook saves 4 hours and the buyer's rate is $100/hr, gross value is $400; price at 10-20% of value ($40-$80) for a digital playbook.
2. **Confidence multiplier** — high-confidence (evidence in ≥3 repos): full price. Medium (≥2 repos): 75%. Low (1 repo + theoretical generalization): 50% or hold.
3. **Distribution affects price** — Gumroad/Lemon Squeezy tolerates $20-$80 range without friction. Direct sale tolerates higher ($100-$500) with explicit positioning.
4. **Bundle discount** — bundle of 3 playbooks at 60% of sum-of-individual. The "Lovable Resumption Trilogy" bundle (Intent Triage + Tier Classifier + Resumer Day Prep) at $99 vs $107-$217 sum.
5. **Buyer-emotional-state premium** — playbooks the buyer reads at a moment of acute need (resumption sprint imminent) tolerate higher capture rates than playbooks read during portfolio audits (less acute).

## Bundle proposals

### The Lovable Resumption Trilogy ($99)
- Publish-Button Intent Triage ($39-$79)
- Four-Feature Tier Classifier ($29-$59)
- Resumer Day Prep ($39-$79)
- **Combined value if bought separately**: $107 – $217
- **Bundle price**: $99
- **Bundle savings**: 8% – 54% depending on individual price points
- **Distribution**: Gumroad single SKU; cross-promote in indie-hacker newsletters

### The Multi-AI Workflow Pack ($129)
- Dual-AI-Surface Workflow ($49-$99)
- AI Cross-Review Setup ($59-$129)
- **Combined value**: $108 – $228
- **Bundle price**: $129
- **Distribution**: LinkedIn for the consultant buyer; GitHub README listings
