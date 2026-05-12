# Master Deep-Dive — Lessons Operating System

> נקודת כניסה מרכזית | Master entry point. Bilingual (HE + EN). Tier 1 — load only when task is multi-step or strategic.

## Step 0 — Load identity

קבצים שחייבים להיטען לפני קבלת החלטות אסטרטגיות:
- `profile/identity.md` — מי אני, מה התפקיד
- `profile/communication.md` — איך מתקשרים עם המשתמש
- `profile/workflow.md` — לולאת Plan-Validate-Capture-Distill

## Step 1 — Routing Table

מיפוי שמירת context: שאלת המשתמש → MOC + pipeline.

| Task shape | Signals | Route to MOC | Pipeline |
|------------|---------|--------------|----------|
| "איך claude יכול לתקשר טוב יותר?" | claude→user, communication, delivery | `MOC-CLAUDE-TO-USER.md` | `pipelines/insight-extraction.md` |
| "איך אני אכוון את claude טוב יותר?" | prompting, scoping, handoff | `MOC-USER-TO-CLAUDE.md` | `pipelines/insight-extraction.md` |
| "איך claude עובד עם עצמו?" | context, multi-agent, self-correction | `MOC-CLAUDE-TO-CLAUDE.md` | `pipelines/insight-extraction.md` |
| "איך אני אעבוד טוב יותר עם עצמי?" | personal workflow, leverage, retention | `MOC-USER-TO-USER.md` | `pipelines/insight-extraction.md` |
| "איזה insight שווה כסף?" | monetization, productize | `MOC-MONETIZATION.md` | `pipelines/monetization-audit.md` |
| "השווה pattern בין ריפוז" | cross-repo, generalize | `MOC-MONETIZATION.md` | `pipelines/cross-repo-diff.md` |

## Step 2 — Pre-flight Checklist

תמיד לפני pipeline activation:
- [ ] `pipelines/execution-rules.md` נטען (אסור fabrication)
- [ ] `LOG.md` נקרא בסשן הנוכחי
- [ ] `MEMORY.md` קונסיסטנטי עם השלב הנוכחי
- [ ] evidence pointer זמין (commit/file/PR) לכל observation שעומדת להירשם

## Step 3 — Quality Control

- **Grounding 80%** — לפחות 4 מתוך 5 הקריטריונים למונטיזציה צריכים לעבור
- **Evidence-or-defer** — אסור לרשום insight בלי evidence pointer
- **Two-layer split** — תוכן >200 מילים בעיקר ב-Human layer + 5 שורות ב-Claude layer
- **Post-session learning** — `/lesson-checkpoint` בסיום, מעדכן MEMORY.md ו-LOG.md session history

## MOCs (Maps of Content)

לכל מימד MOC משלו. ה-MOC מקשר insights פולנים (`/insights/<dim>/*`) ו-playbooks (`/products/playbooks/*`) של המימד.

- `index/MOC-CLAUDE-TO-USER.md` — מימד 1
- `index/MOC-USER-TO-CLAUDE.md` — מימד 2
- `index/MOC-CLAUDE-TO-CLAUDE.md` — מימד 3
- `index/MOC-USER-TO-USER.md` — מימד 4
- `index/MOC-MONETIZATION.md` — ראייה חוצת-מימדים, פוטנציאל מסחור

## Heuristic Skills (cascading)

ראה `skill.md` ל-quick reference. הקסקיידים:

```
workflow-archaeologist → insight-distiller → monetization-auditor → (pass) dimension folder | (fail) _parking-lot.md
cross-repo-comparator → patterns-matrix.md row
dimension-router → insight-distiller
```

## Phase Gates (enforced)

אסור לדלג שלב. Gate failure → לחזור ולמלא.

0. Skeleton + cross-refs resolve
1. 4 `extracted-insights.md` filled, ≥20 raw observations
2. `patterns-matrix.md` ≥8 rows, 4 MOCs populated with ≥3 patterns each
3. 5 skills + 6 commands tested via self-application on a hypothetical 6th repo
4. ≥3 playbooks shipped with target buyer + rework-hours-saved declared
