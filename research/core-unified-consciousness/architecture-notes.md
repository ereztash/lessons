# core-unified-consciousness — Architecture Notes

> Dense survey of the codebase at HEAD `ecd8b5c` (2026-03-09 08:41 UTC). The repo is small (~10 source files outside `components/ui/`) but the contents reveal a precise picture of what Lovable's gpt-engineer-app produces when prompted toward an abstract concept ('consciousness') without a real product anchor.

## Top-level layout

```
.gitignore                 (253 B)
README.md                  (2102 B, unchanged Lovable template, contains 'REPLACE_WITH_PROJECT_ID' x3)
bun.lock                   (119 KB)
bun.lockb                  (245 KB — binary)
components.json            (shadcn-ui config, 414 B)
eslint.config.js           (765 B)
index.html                 (1470 B, 'Lovable App' title, TODO comments unfilled)
package.json               (2935 B, name='vite_react_shadcn_ts')
package-lock.json          (238 KB — npm lockfile *in addition* to bun.lock)
postcss.config.js          (81 B)
public/
  favicon.ico              (20 KB, Lovable default)
  placeholder.svg          (3 KB, template default)
  robots.txt               (160 B)
src/
  App.css                  (606 B)
  App.tsx                  (1821 B — 3-route + 6-redirect router)
  index.css                (3424 B)
  main.tsx                 (161 B)
  vite-env.d.ts            (38 B)
  components/
    NavLink.tsx            (751 B — single hand-styled component)
    ui/                    (shadcn-ui primitives — ~40 generated files)
  context/
    LangContext.tsx        (750 B — en/he toggle with isRTL)
    SimulationContext.tsx  (9214 B — state machine for the demo)
  engine/
    alma.ts                (3264 B)
    ella.ts                (692 B)
    emotional.ts           (1684 B)
    erez.ts                (469 B)
    kora.ts                (2264 B)
    ml-analyzer.ts         (24109 B — largest engine file)
    narrative.ts           (1493 B)
    roee.ts                (2508 B)
    shahar.ts              (2773 B)
  hooks/
    (template defaults; not modified)
  lib/
    utils.ts               (169 B — shadcn cn() helper, untouched)
  pages/
    Analysis.tsx           (26037 B — DEAD CODE, route removed)
    Architecture.tsx       (8704 B — DEAD CODE, route removed)
    Dashboard.tsx          (10526 B — DEAD CODE, route removed)
    DeepDive.tsx           (36397 B — active, /deep-dive)
    Demo.tsx               (12435 B — active, /demo)
    Index.tsx              (13705 B — active, /)
    KoraPlayground.tsx     (9563 B — DEAD CODE, route removed)
    NotFound.tsx           (727 B — active, /*)
    Playground.tsx         (6810 B — DEAD CODE, route removed)
    Research.tsx           (25430 B — DEAD CODE, route removed)
  test/
    example.test.ts        (143 B — template placeholder)
    setup.ts               (353 B — template default)
tailwind.config.ts
tsconfig*.json (3 files)
vite.config.ts
vitest.config.ts
```

## Dead-code load

Six `.tsx` pages survive on disk with no route in `App.tsx`. `App.tsx:18-26` declares `<Navigate>` redirects pointing the old paths (`/dashboard`, `/playground`, `/architecture`, `/analysis`, `/research`, `/kora`) at the three surviving pages. **Total dead code: 86,070 bytes (84 KB)** of `.tsx` source that is included in the bundle but never reachable through the router. This represents ~25% of the entire `src/` tree by byte count. The dead files came from the original 10-page plan that the bot consolidated at 17:45 UTC (`Cleaned to a 3-page plan`, commit `2228be1`). The bot did not delete the files — only the routes. This is consistent with chess-mind-patterns' pattern: **the bot adds, the bot rarely subtracts**.

## Engine layer — the project's notional core

`src/engine/` contains 9 TypeScript files totaling ~40 KB. Their names are mostly Hebrew given names:

| File | Bytes | Inferred role | Notes |
|---|---|---|---|
| `alma.ts` | 3264 | Memory / association engine | Hebrew given name |
| `ella.ts` | 692 | Smallest engine, likely a stub | Hebrew given name |
| `emotional.ts` | 1684 | Affect simulation | Common-noun, not a name |
| `erez.ts` | 469 | 'Reflective Core' — emits `Inner Frequency` | Operator's own name (Erez Tash) appears here |
| `kora.ts` | 2264 | 'KORA + MetaBoard' — a tiny code generator + multi-agent scorer | Contains `MetaBoardOptimizedByX` with 5 named agents (Yonatan, Shakhar, Roee, Erez, Ella) and fixed efficiency/speed/accuracy/understanding stats |
| `ml-analyzer.ts` | 24109 | Largest file in the repo. Despite the name, no actual ML library — pure rule-based heuristics over typed inputs | The session's 'ML' arc terminated here |
| `narrative.ts` | 1493 | Story / event-log generator | |
| `roee.ts` | 2508 | Decision agent — Hebrew given name | |
| `shahar.ts` | 2773 | Sense / perception agent — Hebrew given name | |

**The engine is a personification system**: the operator named each module after a person, then gave each one a slot in `kora.ts`'s `MetaBoardOptimizedByX.agents` array with hand-tuned skill weights. Reading `erez.ts` and `kora.ts` directly confirms the design — `ErezCore` exposes `innerTremor`, `lastRpf`, `lastConcept` and a `reflect()` method that returns `'Inner Frequency: <n> | Concept: <s>'`. `KORA.generate(concept)` returns a four-line stub function regardless of input (`return inputData.map(x => x > 0.5 ? x * 0.92 + 0.08 : x * 0.85)`). There is no real computation here — only the *shape* of a multi-agent reasoning system.

This matters because: (a) chess-mind-patterns had `chess.js` doing actual chess logic; (b) cor-sys has database / API integrations doing actual work; (c) core-unified-consciousness has **only the appearance of computation**, with toy values stitched together into UI labels. The dependency tree confirms this — there is no math library, no tensor library, no ML library, no statistics library, no NLP library. The 'ML' in `ml-analyzer.ts` is the operator's framing, not the code's behaviour.

## Page layer

- **Index.tsx (13.7 KB)** — Landing page. After the final commit's `Added product verticals to landing`, it includes three verticals (Mental Health AI, Autonomous Decisions, Adaptive Education) with translated text and Lucide icons.
- **Demo.tsx (12.4 KB)** — Live demo of the simulation. Wraps `SimulationContext.tsx` (9.2 KB), which is the only place in the codebase where engine state is actually wired through to UI.
- **DeepDive.tsx (36.4 KB)** — The largest page, with consolidated architecture explanation, research framing, and Kora playground content merged together post-consolidation.
- **NotFound.tsx (0.7 KB)** — Template default.

The `<Navigate>` redirects in `App.tsx` route the six abandoned page paths back into `/demo` or `/deep-dive`. This is a defensible UX choice — it preserves any external links — but it is operationally the only sign that the 17:45 consolidation was deliberate rather than accidental.

## Dependencies — template defaults, untouched

`package.json` lists 51 production dependencies and 22 devDependencies. **All of them are Vite + React + shadcn-ui + framer-motion + react-query + react-router-dom template defaults.** Notable absences:

- No state-management library beyond `useState`/`useContext` and `@tanstack/react-query` (template default).
- No animation library beyond `framer-motion` (template default).
- No charting library beyond `recharts` (template default).
- No ML, no tensor, no math, no NLP.
- No backend, no Supabase, no Firebase, no Convex.
- No PWA, no service worker, no manifest.
- No external API client (no `axios`, no domain-specific SDK).
- No analytics, no Sentry, no telemetry.
- No i18n library — the en/he toggle in `LangContext.tsx` is hand-rolled with a literal-string map.

The **only** non-template-default in `devDependencies` is `lovable-tagger`, which is Lovable's own build-time component-tagger — present in every Lovable repo. The `bun.lock` and `package-lock.json` both ship, indicating the operator's environment uses bun for installs but the lockfile dual-publish is a Lovable template convention.

## Routing and navigation

`App.tsx` (1.8 KB) sets up the React Router tree:

- 3 active routes: `/`, `/demo`, `/deep-dive`
- 6 redirect routes: `/dashboard`, `/playground`, `/architecture`, `/analysis`, `/research`, `/kora`
- 1 wildcard: `*` → `NotFound`

The two context providers nest as `LangProvider > SimulationProvider`. The `LangProvider` (750 B) holds a single state variable (`lang: 'en' | 'he'`) and applies `dir={isRTL ? 'rtl' : 'ltr'}` to the wrapped tree. The `SimulationProvider` (9.2 KB) is the actual state machine — drives the demo page's animated agent connections.

## Test infrastructure — inherited but unused

`vitest.config.ts`, `src/test/example.test.ts` (143 bytes), `src/test/setup.ts` (353 bytes). These are byte-identical to the chess-mind-patterns template scaffold (same SHA family). Vitest 3.2.4 is in devDependencies. **Zero test files exist beyond the template placeholder.** No commit subject mentions tests. This matches chess-mind's pattern: Lovable bootstraps with Vitest scaffolding that no operator ever uses.

## Internationalisation

The `LangContext.tsx` is a minimal en/he toggle. It does not load translation files; the literal English and Hebrew strings are inlined in the page components. This is workable for a small site but does not scale. The choice of `he` (Hebrew) confirms the operator's primary language and matches the chess-mind-patterns operator profile — the same person built both repos.

## Build / config / CI

- Vite 5.4.19, `@vitejs/plugin-react-swc` for fast refresh.
- TypeScript 5.8.3, strict mode (per `tsconfig.app.json`).
- ESLint 9 with `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh`.
- **No GitHub Actions workflow.** No `.github/workflows/`.
- **No CI of any kind.** Build verification happens only inside Lovable's preview sandbox.
- **No Dockerfile, no docker-compose.**
- **No deploy config beyond Lovable's internal publish flow.**

## Documentation

- `README.md` — Lovable template default, three `REPLACE_WITH_PROJECT_ID` placeholders, never customised.
- No `CLAUDE.md`, no `AGENTS.md`, no `CONTRIBUTING.md`, no `docs/` directory.
- No inline comments beyond the engine files' one-line `// Engine Name - Role` header (e.g., `// Erez Core - Reflective Core`, `// KORA + MetaBoard`).
- No commit-message bodies beyond Lovable's auto-generated descriptions.

## Architectural verdict

core-unified-consciousness is a **structurally complete Lovable demo** — every wiring decision is internally consistent, every page renders, every context provider is mounted in the right order, the redirect-from-old-routes pattern is correct, the i18n toggle works. But it has **no anchor in the external world**: no API, no database, no PWA shell, no analytics, no real data, no real ML, no chess-engine analogue, no Supabase analogue. The 'consciousness' framing is **expressed entirely through naming** (file names, class names, comments) without any computational substance. This is the architecture of a *concept slide deck rendered as a React app* — and that is consistent with the operator's behaviour after publish: nothing remained to ship, because the entire product was the demonstration of the framing.

*Evidence pointers:* `core-unified-consciousness@ecd8b5c:src/` listing, `core-unified-consciousness@ecd8b5c:src/App.tsx`, `core-unified-consciousness@ecd8b5c:src/engine/erez.ts`, `core-unified-consciousness@ecd8b5c:src/engine/kora.ts`, `core-unified-consciousness@ecd8b5c:src/context/LangContext.tsx`, `core-unified-consciousness@ecd8b5c:package.json`, `core-unified-consciousness@ecd8b5c:README.md`, `core-unified-consciousness@ecd8b5c:index.html`.
