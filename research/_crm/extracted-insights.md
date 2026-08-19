# _crm — Raw Insight Candidates

> Phase 1 deep-dive, 2026-08-19. Repo: `ereztash/_crm` — the **Ownership Engine**: a deterministic
> NLP engine for detecting the moment a person internalizes an insight, decision or change in their
> own language. Coaching is the first vertical. Source of the `CRM_Google_ai` mirror.
> Verified locally: 257 commits (231 non-merge), 26 PRs, 70 docs, **127 test files**, 579 files.
> 230 of 231 commits landed in June 2026. Dormant 49 days. Tier B under the F5 rule.

---

## 2026-08-19 14:10 — A kill test that refuted the repo's own headline metric, and was published

**Dimension guess**: user-to-user
**Evidence**: `docs/G1_KILLTEST_2026-06-14.md`; harness `analytics/validation/heterogeneous_reliability.py`; scores persisted to `data/research/heterogeneous_scores.json`
**Observation**: The repo's central reliability claim was ICC(2,1)=0.89 on its differentiation score. G1 was built to ask whether that number is **construct reliability or Opus self-consistency**: five meetings spanning the score range, rated blind by three model families. Result — within-Opus 0.94, **cross-family ICC 0.115**, family variance 28%. On facilitation, cross-family ICC is **−0.037**. The document's own verdict: *"Downgrade the reliability claim from 'established construct reliability (ICC 0.89)' to 'Opus-and-expert-consistent, NOT yet shown to be model-independent.' This is a partial refutation / strong qualification — exactly the kind of self-kill the instrument exists to surface."*
**Mechanism hypothesis**: A test whose only possible outcomes are "confirmed" or "inconclusive" is decoration. This one could destroy the number the product is sold on, was run, and did. It is the strongest answer in the portfolio to the accuracy gap in `portfolio-as-one-mechanism.md` §6.1 — and it goes further than measuring accuracy: it measures whether the *measurement instrument itself* is an artifact of one model. Directly portable to `lessons`, whose pattern strengths are all scored by one model family in one session.

---

## 2026-08-19 14:13 — The refutation is itself refused the last step: three confounds, stated

**Dimension guess**: claude-to-user
**Evidence**: `docs/G1_KILLTEST_2026-06-14.md` §"Confounds — why this is a RED FLAG, not yet a verdict" — (1) rubric mismatch: Opus used the full rubric, Sonnet/Haiku a condensed one; (2) capability gap conflated with family, "a clean test needs comparable-capability models"; (3) n=5, single pass, within-vendor only, "the CI on these ICCs is very wide"
**Observation**: Having produced a result that damages its own product, the document then argues against over-reading it, and separates the part that is probably real — *"opus credits owned-but-entangled differentiation higher … so part of the gap is capability / provenance, not pure model-arbitrariness"* — from the part that is confounded.
**Mechanism hypothesis**: Symmetric honesty is rarer than the first kind. It is easy to be rigorous about a result you dislike by accepting it wholesale; the discipline is applying the same scepticism in both directions. The artifact this produces is a **qualified downgrade** rather than a retraction, which is what the evidence actually supports. `lessons` did the opposite today: it accepted a self-damaging measurement (groundstate trailers = 0) without checking the instrument, and the measurement was of the wrong repo (LOG anti-pattern 23).

---

## 2026-08-19 14:16 — A perfect result reported together with its own non-significance

**Dimension guess**: claude-to-user
**Evidence**: `docs/LOCO_PREDICTION_2026-06-14.md` — leave-one-client-out over [moves]→[ownership]→[outcome]. *"Both predictors rank the three finishers perfectly … **winner: TIED.** Honest ceiling: a perfect rank at n=3 is p~0.17 (not significant), and when both predictors rank the finishers perfectly they cannot be separated at the client level."*
**Observation**: A 1.0 rank-accuracy is reported in the same breath as the p-value that makes it meaningless, and the section that follows names the only place the two predictors *can* disagree at n=4. The document is anonymised by construction — clients appear by outcome class, "no names, no amounts (PII stays local; the module emits ranks / flags only)".
**Mechanism hypothesis**: Pairs with the pre-registered prediction this repo's sibling (`lessons`) registered today, and shows the discipline that one still lacks: a stated ceiling that travels with the number. A result of 1.0 with n=3 is the shape most likely to be quoted out of its confidence interval, so the interval is put in the same sentence rather than in a limitations section nobody reads.

---

## 2026-08-19 14:19 — Validated against a public corpus it did not produce

**Dimension guess**: user-to-user
**Evidence**: `tests/test_annomi_owning_signal.py`, `test_annomi_owned_differentiation.py`, `test_annomi_conversation_quality.py`, `test_annomi_interaction_quality.py`, `test_annomi_analysis.py`; README — *"AnnoMI — 133 English motivational-interviewing sessions (public dataset)"*; `data/research/craigslistbargain_agency.md`
**Observation**: Five test modules run the ownership detectors against AnnoMI, a public 133-session motivational-interviewing corpus, alongside a negotiation dataset. The only repo in the 40 that validates against data the operator did not create.
**Mechanism hypothesis**: Every other measurement in this portfolio — including all of `lessons` — is scored on artifacts the operator produced, which cannot distinguish "the instrument works" from "the instrument fits this author." A public corpus is the cheapest available break in that loop. For `lessons` the analogue exists and is unused: score the tier classifier against repos from someone else's GitHub account.

---

## 2026-08-19 14:22 — 211 commits carry a Claude trailer; nine name Claude as author

**Dimension guess**: claude-to-claude
**Evidence**: 231 non-merge commits; `Co-Authored-By: Claude Opus 4.8 (1M context)` ×153, `Co-Authored-By: Claude Opus 4.8` ×58; 9 authored by `Claude`; **0 cadence bursts**; author identity `Erez (COR-SYS)` — a third distinct human git identity after `Erez <Erez2812345@>` and `ereztash <erez2812345@>`
**Observation**: The largest attribution gap measured anywhere in the portfolio: **23×**. Unlike MATI and proofminer, no cadence burst exists to catch it — the commits are paced like human work. The trailer is the only surviving signal, and it is unusually rich: every one names the model version, and 153 of them record the **context window** as well.
**Mechanism hypothesis**: This is the cell of the authorship 2×2 (`authorship-attribution.md`) that neither detector reaches on its own: AI identity present but only in the trailer, human cadence, human author name. Had this repo followed the convention of `ampaign-craft` (session links) or `MATI` (nothing), 211 commits of AI-paired work would be unrecoverable. It is also the third and richest instance of `model-version-in-trailer` — and the only one that would let a future audit ask which *context window* produced a given decision.

---

## 2026-08-19 14:25 — A governance layer with model cards, a DPIA and a trust ledger, in a repo with no users

**Dimension guess**: user-to-user
**Evidence**: 70 docs including `MODEL_CARD_BLIND_RATER.md`, `MODEL_CARD_RECOGNITION.md`, `MODEL_CARD_U8.md`, `MODEL_REGISTRY.md`, `DPIA_DRAFT.md`, `CONSENT_POLICY.md`, `COMPLIANCE_POSTURE.md`, `ETHICAL_AI_GUIDELINES.md`, `INCIDENT_RESPONSE.md`, `ADVERSARIAL_SIMULATION_REPORT.md`, `AUDIT_RECONCILIATION_2026-06-11.md`, `DUE_DILIGENCE_RECONCILIATION_2026-06-21.md`; `tests/test_trust_ledger.py`, `tests/test_methodology_promotion.py`, `tests/test_no_pii_in_research_outputs.py`; PR branches `docs/mai-success-case` (#21) and `docs/aviad-selection-failure-readme` (#20)
**Observation**: Model cards, a data-protection impact assessment, an incident-response plan and a trust ledger with a test enforcing it — in a repo that scores F5=0 and has been dormant 49 days. Both a named client success case and a named client **failure** case were merged as documents, in consecutive PRs.
**Mechanism hypothesis**: The governance layer is not compliance theatre for an existing user base; there is no user base. It is the same move as `commercial-doc-as-spec` one level up — writing the constraints first so the code cannot quietly exceed them, with `test_no_pii_in_research_outputs.py` making one of them executable. The failure case shipped alongside the success case is the tell: a portfolio of case studies containing only wins is marketing, and this one is a dataset.
