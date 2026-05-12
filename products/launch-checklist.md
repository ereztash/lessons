# Launch Checklist — Distribution Readiness for the Playbook Catalog

> Pre-launch and launch-sequence checklist for shipping the 6 playbooks (plus the meta-playbook) to paying customers. Closes the "Distribution unverified" gap from the Phase 4 report.

## Pre-launch (one-time setup, 2-4 hours)

### Storefront

1. [ ] Create Gumroad account (creator profile, payout details, tax form W-8BEN for non-US sellers)
2. [ ] Configure Gumroad workspace: payment provider, default product currency (USD), payout method, sales tax handling (Gumroad handles VAT for EU buyers — verify enabled)
3. [ ] Set up Gumroad product page templates: short description (≤160 chars), feature bullet list (5-7 items), 1 cover image (1280×720 minimum), 1 inline screenshot per playbook
4. [ ] Decide pricing currency strategy: USD-only for v1; revisit ILS / EUR pricing after 30 days of sales data
5. [ ] Create the 6 product listings as draft (do NOT publish yet):
   - Publish-Button Intent Triage ($39 launch, $79 list)
   - Four-Feature Tier Classifier ($29 launch, $59 list)
   - Dual-AI-Surface Workflow ($49 launch, $99 list)
   - AI Cross-Review Setup ($59 launch, $129 list)
   - Resumer Day Prep ($39 launch, $79 list)
   - Editorial Commit Voice Escalation ($29 launch, $59 list)
6. [ ] Create the 2 bundle listings as draft:
   - Lovable Resumption Trilogy ($79 launch, $99 list)
   - Multi-AI Workflow Pack ($99 launch, $129 list)

### Content packaging

7. [ ] Convert each playbook Markdown to PDF using `pandoc` with a custom template:
   ```bash
   pandoc <playbook>.md -o <playbook>.pdf --pdf-engine=xelatex --template=playbook.tex --metadata title="<title>" --metadata author="ereztash" --metadata date="2026-05-12"
   ```
8. [ ] Generate a cover image for each playbook (1280×720, consistent template, playbook title + 1-line tagline + author handle)
   - Use Figma or Canva; save .figma source under `/products/_assets/covers/`
   - Export PNG to `/products/_assets/covers/<playbook>.png`
9. [ ] Create a sample/preview PDF for each playbook (first 2 pages only — problem statement + first step of the playbook) as the Gumroad preview file
10. [ ] Bundle ZIPs: for the two bundles, package all included playbook PDFs + a 1-page "bundle map" PDF explaining the sequence to use them in

### Social proof scaffolding

11. [ ] Create empty `/products/_testimonials/<playbook>.md` for each playbook — placeholder structure for adding real testimonials after first 5 sales
12. [ ] Reserve 3 testimonial slots per playbook in the Gumroad description (markdown: `> [Testimonial slot — fill after first 5 sales]`)
13. [ ] Prepare a 1-question post-purchase email template (Gumroad's "thank you" message) asking buyers to reply with one-sentence feedback within 7 days

### Marketing surfaces

14. [ ] LinkedIn post drafts (3 drafts, one per pricing tier):
    - Tier 1 ($29-$39 entry): drive trial via low-friction price
    - Tier 2 ($49-$79 mid): emphasize hours saved
    - Tier 3 ($99-$129 bundle): emphasize compounding value
15. [ ] Substack hook draft (one essay, ~1500 words):
    - Title: "What I learned reading the git history of 5 of my own dormant repos"
    - Hook: the publish-button-satisfiability finding
    - CTA: bundle link
16. [ ] X (Twitter) thread draft (10-tweet thread):
    - Hook tweet: the four-zero prototype signature
    - 8 follow-up tweets: one playbook per tweet with 1-line value prop
    - Final tweet: bundle link
17. [ ] GitHub README polish (see `gap-7` in the Phase 4 closure brief)

## Launch sequence

### Week 1 — soft launch

- Day 1: Publish the 4 individual playbooks at *launch pricing* (lower end of the price range). Publish the Lovable Resumption Trilogy bundle. Do NOT publish the Multi-AI Workflow Pack yet — it requires the new editorial-commit-voice playbook to be settled.
- Day 1: Post the LinkedIn entry-tier draft (Tier 1).
- Day 1: Pin the launch announcement to the GitHub `lessons` repo README's top.
- Day 2: Reply to any LinkedIn comments; collect 1-2 sentences of feedback per replier.
- Day 3: Post the X thread.
- Day 4-7: Monitor Gumroad analytics (page views, add-to-cart, conversion). Goal: 10 page views per playbook, 1-2 sales.
- Day 7: First metric review (see § Metric instrumentation below).

### Week 2 — Substack and editorial push

- Day 8: Publish the Substack essay. Link to the bundle.
- Day 9: Post the LinkedIn mid-tier draft (Tier 2).
- Day 10: Add the 6th playbook (Editorial Commit Voice Escalation) to Gumroad. Publish the Multi-AI Workflow Pack bundle.
- Day 11-14: Monitor responses. Collect any feedback into `/products/_feedback/<date>.md` notes.

### Week 3 — pricing tier escalation

- Day 15: If conversion rate >2% at launch pricing, raise individual prices toward the list-price end. Keep bundles at launch pricing.
- Day 16: Post the LinkedIn high-tier draft (Tier 3 — bundle-focused).
- Day 17-21: A/B test cover images or descriptions on the 2 lowest-converting playbooks.

### Week 4 — first refresh

- Day 22-28: Collect 30-day metric data (see § Metric instrumentation). Update pricing-hypotheses.md confidence column based on actual data.
- Day 28: Write the first "month one in review" Substack post: what sold, what didn't, what surprised.
- Day 30: Decide on next-batch playbooks (which patterns from the parking lot to distill next).

## Metric instrumentation

Track the following per playbook per 30 days:

| Metric | Source | Update cadence | Pricing-impact |
|--------|--------|----------------|----------------|
| Page views | Gumroad analytics | daily | low |
| Add-to-cart rate | Gumroad analytics | weekly | medium |
| Conversion rate (purchases / views) | Gumroad analytics | weekly | high |
| Refund rate | Gumroad refunds tab | monthly | high — flag if >5% |
| Average rating (1-5) | Gumroad reviews | monthly | medium |
| Word-count of buyer feedback | post-purchase email replies | monthly | high — qualitative signal |
| Time-to-first-sale | Gumroad timeline | one-time | medium |
| Bundle attach rate | Gumroad bundle vs individual sales | monthly | high |
| LinkedIn impressions | LinkedIn post analytics | weekly | low |
| LinkedIn comment-to-sale | manual count | monthly | medium |

After 30 days, update `pricing-hypotheses.md` Confidence column based on:

- Conversion rate >2% → bump confidence one level
- Conversion rate <0.5% → lower confidence one level (or drop the playbook from bundle)
- Refund rate >5% → flag for content revision
- ≥3 buyer feedback messages mentioning the same friction → revise the playbook before next 30-day refresh

## Post-launch refresh cadence

- **30 days**: First pricing refresh. Update `pricing-hypotheses.md` Confidence column. Decide whether to raise launch pricing to list pricing.
- **60 days**: A/B test top 2 playbooks (cover image, headline). Decide whether to ship the next-batch playbooks from the parking lot.
- **90 days**: Major refresh. Re-evaluate the 6-playbook lineup. Cut any playbook with <5 sales in 90 days. Promote any parking-lot candidate that has matured (e.g., a second cross-review event observed, allowing the absorbed-rather-than-shipped pattern to promote).
- **180 days**: Half-year retrospective. Decide on a 2nd-edition bundle structure. Consider bilingual HE+EN versions if Israeli buyers are ≥10% of sales.

## Three highest-leverage items

1. **PDF tooling with `pandoc` + custom LaTeX template** (item 7). One-time setup; saves 10-15 minutes per playbook for 6 playbooks; reusable for every future playbook.
2. **Post-purchase 1-question email** (item 13). The single most valuable feedback channel; turns every sale into a data point on language, friction, and willingness-to-pay.
3. **Cover image template in Figma** (item 8). Consistent visual brand across the catalog; A/B testable; reusable for the bundle pages and LinkedIn posts.

## Open distribution questions

- [ ] Should bilingual (HE+EN) versions ship at v1 or wait for buyer demand? Default: English-only v1.
- [ ] Should the playbooks be available on Lemon Squeezy as a Gumroad backup? Default: skip until Gumroad is proven.
- [ ] Should a Substack paid tier ($10/mo) bundle with the playbook catalog? Default: skip for v1.
- [ ] Should there be a 30-day money-back guarantee? Default: yes, per Gumroad standard.
- [ ] Should affiliate tiers be enabled? Default: skip until >$1k total sales.

## Cross-references

- Pricing source: `/products/pricing-hypotheses.md`
- Playbook catalog: `/products/playbooks/`
- README front door: `/README.md`
- MEMORY snapshot: `/MEMORY.md`
