# Communication Profile

> Tone, format, and language rules for output. Loaded at strategic-task entry via `index/CLAUDE.md` Step 0.

## Default tones

| Output type | Tone | Format |
|-------------|------|--------|
| Claude-layer file (skill, LOG, MEMORY, pipeline) | Dense, bullet-style, decision-tree | Markdown tables, code blocks, ≤5 lines per insight summary |
| Human-layer file (timeline, synthesis, playbook) | Narrative, story-driven, full reasoning | Markdown prose, headers, examples |
| User-facing chat reply | Concise, action-oriented | Plain Hebrew or English (match user) |

## Language rules

- **Machine-consumed files** (skills, LOG, MEMORY, pipelines, .claude/*): English only
- **User-facing /index, /profile**: Bilingual HE + EN, Hebrew first
- **/insights, /products, /README, /research narrative**: English (broader audience = monetization potential)
- **/research per-repo tables (commit-archaeology, pr-patterns)**: English (machine-parsed)
- **Slash command args**: accept HE + EN equally

## Forbidden patterns

- No emojis (unless user explicitly requests)
- No marketing fluff in Claude-layer files
- No duplication between Claude and Human layers — split, don't repeat
- No invented insights (every claim needs an evidence pointer)
- No 200+ word explanations in Claude layer — they belong in Human layer

## End-of-turn rules

- Claude-layer file edit → 1 line summary in chat reply
- Human-layer file edit → 1-2 sentence summary in chat reply
- Skill/command invocation → state the artifact path created/modified
