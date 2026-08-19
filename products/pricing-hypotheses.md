# Pricing Hypotheses

> Monetization map for each shipped playbook. Updated by `/lesson-ship` and the gap-closure pass.

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

### Editorial Commit Voice Escalation
- **Path**: `/products/playbooks/editorial-commit-voice-escalation.md`
- **Target buyer**: Solo AI-paired builders with 5+ LLM-tool-paired repos who run quarterly or monthly portfolio reviews and want a 30-second "is this repo still alive?" signal before spending 20 minutes on a deep audit.
- **Rework hours saved per session**: 2-5 hours per portfolio review (10-15 repo portfolio); 8-20 hours per year across 4 reviews; up to 6 hours per correctly-routed archive-vs-resume decision.
- **Suggested price range**: $29 – $59 USD
- **Pricing rationale**: 3.5 hours saved (midpoint) × $100/hr × 15% capture = $52 nominal. Discount because the rubric is partial-replaceable with a manual `git log` read (defensibility is medium-high, not high). Anchored on "the rubric pays for itself on a single quarterly review."
- **Distribution channel hypothesis**: Gumroad as a standalone $29 entry-tier playbook; ALSO included in the Lovable Resumption Trilogy bundle as a 4th item (raising bundle to $129 or as a free addition that lifts the bundle's perceived value). Substack feature for the "how I read git logs in 30 seconds" hook.
- **Confidence**: high — 5/5 audit score; 3-repo evidence (groundstate-protocol, cor-sys, chess-mind-patterns) including a clean negative control (core-unified-consciousness shows no escalation → abandonment).
- **Date shipped**: 2026-05-12

### AI Review Event Instrumentation (meta-playbook)
- **Path**: `/products/playbooks/ai-review-event-instrumentation.md`
- **Target buyer**: Solo builders who already own `ai-cross-review-setup.md` and want to convert anecdotal cross-review events into a personal dataset they can analyze, market, and learn from over a year.
- **Rework hours saved per session**: Per-event overhead is 30-60s; cumulative value over 12 months is 8-20 hours of analysis time + marketing/positioning value of owning the dataset.
- **Suggested price range**: Bundle-only at this stage. **Not sold standalone in v1.**
- **Pricing rationale**: The instrumentation playbook adds value only to operators who already have cross-review setup. Standalone sale is unjustified (the buyer would not yet have the source events to instrument). The right placement is as a *bonus* inside the Multi-AI Workflow Pack bundle, raising bundle perceived value without raising bundle price.
- **Distribution channel hypothesis**: Included free with the Multi-AI Workflow Pack bundle ($129). Promoted as the "compounding companion" — the playbook that makes the parent playbook better over time. After 6 months of bundle sales and observed adoption, revisit standalone pricing.
- **Confidence**: low — the playbook is a hypothesis (depends-on relationship; meta-pattern; self-fulfilling). It will only prove value after 12 months of operator adoption generate the dataset that confirms it. v1 ship is to *enable* future evidence, not to claim current confidence.
- **Date shipped**: 2026-05-12

## Pricing principles

1. **Anchor on rework hours saved** — if a playbook saves 4 hours and the buyer's rate is $100/hr, gross value is $400; price at 10-20% of value ($40-$80) for a digital playbook.
2. **Confidence multiplier** — high-confidence (evidence in ≥3 repos): full price. Medium (≥2 repos): 75%. Low (1 repo + theoretical generalization): 50% or hold.
3. **Distribution affects price** — Gumroad/Lemon Squeezy tolerates $20-$80 range without friction. Direct sale tolerates higher ($100-$500) with explicit positioning.
4. **Bundle discount** — bundle of 3 playbooks at 60% of sum-of-individual.
5. **Buyer-emotional-state premium** — playbooks the buyer reads at a moment of acute need (resumption sprint imminent) tolerate higher capture rates than playbooks read during portfolio audits (less acute).
6. **Meta-playbook rule (new)** — playbooks that depend on another playbook (e.g., `ai-review-event-instrumentation` depends on `ai-cross-review-setup`) ship bundle-only in v1. Standalone pricing waits until the parent playbook has ≥50 sales, so the addressable audience exists.

## Bundle proposals

### The Lovable Resumption Trilogy ($99 launch, $129 list)
- Publish-Button Intent Triage ($39-$79)
- Four-Feature Tier Classifier ($29-$59)
- Resumer Day Prep ($39-$79)
- Editorial Commit Voice Escalation ($29-$59) **— added in gap-closure round; positioned as the "30-second portfolio scanner" companion**
- **Combined value if bought separately**: $136 – $276
- **Bundle price**: $99 launch, $129 list
- **Bundle savings**: 27% – 64% depending on individual price points
- **Distribution**: Gumroad single SKU; cross-promote in indie-hacker newsletters

### The Multi-AI Workflow Pack ($129 launch, $179 list)
- Dual-AI-Surface Workflow ($49-$99)
- AI Cross-Review Setup ($59-$129)
- AI Review Event Instrumentation **— included free; turns the bundle into a compounding-value asset**
- **Combined value (paid components)**: $108 – $228
- **Bundle price**: $129 launch, $179 list
- **Distribution**: LinkedIn for the consultant buyer; GitHub README listings

## Refresh cadence

- **30 days after first launch**: Update Confidence column based on conversion data per `/products/launch-checklist.md` § Metric instrumentation.
- **90 days**: Major refresh. Cut any playbook with <5 sales in 90 days. Promote parking-lot candidates that have matured.
- **180 days**: Half-year retrospective. Decide on a 2nd-edition bundle structure.

---

## Claim-strength repricing — 2026-08-19

Every playbook now declares whether it may sell a mechanism or only a sorting rule
(`scripts/check-lessons-contract.py` R6, enforced against `may-assert-cause` on the backing
insights). Three of seven turned out to be observational, and one of those was selling a claim its
own measurement had refuted.

| Playbook | Claim strength | Effect on price |
|---|---|---|
| AI Cross-Review Setup | **causal** | unchanged — 6 repos, strongest pattern in the dataset |
| Resumer Day Prep | **causal** | unchanged |
| Editorial Commit Voice Escalation | **causal** | unchanged — confirmed in 4 repos |
| AI Review Event Instrumentation | causal, **inherited** | unchanged; bundle-only as before |
| Publish-Button Intent Triage | **observational** | hold price, change the pitch: it sorts repos, it does not explain them |
| Dual-AI-Surface Workflow | **observational** | hold price; the "never reverse the polarity" prohibition is an extrapolation from absence and is now labelled as one |
| Four-Feature Tier Classifier | **observational** | **the one that should move.** It shipped claiming it errs in only one direction and never over-rates. Measured 2026-08-19: every one of its 8 errors was an over-estimate. Either reprice down or ship F5 first |

**The rule this establishes.** A playbook's price rests on what it lets a buyer *decide*. A causal
playbook says "do X because it causes Y" and is worth the decision it enables. An observational one
says "repos like this tended to look like that" and is worth a sorting rule — real value, less of
it. Selling the second at the first's price is the failure `proofminer/docs/AUTHORITY.md` names:
*a weak trace should not become a confident outbound asset just because the interface can generate
one.*

No price is changed here. The claim each price rests on is now labelled, which is the precondition
for changing one honestly.
