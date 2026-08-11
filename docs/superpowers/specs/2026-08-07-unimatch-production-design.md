# UniMatch Ghana: Production Design

**Date:** 2026-08-07
**Status:** Draft for review
**Branch:** `takeover/production-rebuild`

---

## 1. Context

UniMatch Ghana helps Ghanaian SHS graduates discover which university programmes they
qualify for based on their WASSCE results. The project exists today as:

- A **Figma Make prototype** (9 designed screens, view-only access), the product intent.
- A **GitHub repo** (`EnamAbra/Unimatch`, 2 commits), a partial, non-building implementation
  of 4 of those 9 screens.

This document defines the target design for taking that from a broken UI shell to a
production product real students can rely on.

### Sources of truth

| Source | What it establishes |
|---|---|
| Figma Make prototype (screenshots) | Product scope, screen designs, copy, interaction states |
| Original Figma Make brief | Design tokens, typography, feature list, UX requirements |
| Repo root tree (`components/`, `pages/`, `lib/`, `types/`) | The Make code export, 27/30 components byte-identical to `src/` |
| Repo `src/` tree | Enam's Vite app: the export copied in, plus a hand-built landing page |

Where the prototype and correctness conflict, **correctness wins** (see §7).

---

## 2. Current state

### The app does not build

```
npx tsc --noEmit  → 40 errors
npx vite build    → fails at bundle time on missing exports
```

The pushed `main` branch is non-functional. `/` crashes on missing exports from
`src/data/landing.ts`; `/dashboard` crashes at runtime on `import Link from 'react-router-dom'`
(a default import of a module with no default export).

### Root causes

1. **Duplicated tree.** The Make export sits at the repo root; `src/` is a partial copy.
   `index.html` loads `/src/main.tsx` and `tsconfig.json` includes only `src`, so the root
   tree is dead, but it holds four files `src/` is missing (`ViewDetails.tsx`,
   `DeadlineCard.tsx`, `DeadlinesHeader.tsx`, `lib/statusColors.ts`) and five missing types
   (`DeadlineStatus`, `DeadlineEntry`, `StudentDetails`, `SavedProgrammeSummary`,
   `ChecklistItem`).
2. **`src/data/landing.ts` is a stub.** Created in the last commit with only `navLinks`;
   seven landing components import `heroImageUrl`, `faqs`, `features`, `footerColumns`,
   `stats`, `testimonials`, `universities`, `Testimonial`. No version in `.history` ever
   contained them.
3. **Navbar collision.** The marketing navbar replaced the app navbar in `src/`. The last
   commit "fixed" the resulting type errors by deleting `user={currentUser}` props rather
   than restoring the right component, so the signed-in dashboard renders a marketing
   navbar that says "Log in".
4. **Routing is half-wired.** `Deadlines` exists but is unrouted; `ViewDetails` doesn't
   exist in `src/` though every card links to `/programme/:id`; the sidebar links to
   `/saved`, `/comparison`, `/advisor`, none of which exist.

### The core product does not exist

There is no grade entry, no aggregate computation, and no eligibility engine.
`qualifies: boolean` is hand-typed per programme; `studentProfile.aggregate = 14` is
hardcoded; "Check My Eligibility" does nothing. The hardcoded data already contradicts
itself:

| Symptom | Cause |
|---|---|
| KNUST CS shows a green "Qualified" badge and a red aggregate | `qualifies: true` but cut-off `12` < student's `14` |
| Hero reads "3 Qualified" | 4 programmes have `qualifies: true` |
| Hero reads "7 Universities" | the dataset has 5 |
| Landing reads "23 programmes qualify" | 6 programmes exist |

### Everything else missing

No persistence (all `useState`, lost on refresh), no auth, no backend, no real cut-off data,
no tests, no CI, no deploy config, no SPA rewrite rule. `.history/` is committed.
Deadlines store a static `daysLeft` that can never count down, on an already-stale
2024/2025 calendar.

---

## 3. Product definition

Nine screens. Five of them have no code at all today.

| # | Screen | Route | Code today |
|---|---|---|---|
| 1 | Landing | `/` | Partial (data missing) |
| 2 | WASSCE Grade Entry | `/eligibility` | **None** |
| 3 | Results Dashboard | `/dashboard` | Yes (broken) |
| 4 | Programme Detail | `/programme/:id` | In dead tree only |
| 5 | What-if Grade Simulator | `/simulator` | **None** |
| 6 | Programme Comparison | `/compare` | **None** |
| 7 | AI Career Advisor | `/advisor` | **None** |
| 8 | Deadline Tracker | `/deadlines` | Yes (unrouted) |
| 9 | Student Profile | `/profile` | Yes (broken) |

Plus `/login`, `/signup`, and a real `*` → 404 (today it silently redirects).

---

## 4. Design principles

1. **The eligibility engine is the product.** It is pure, framework-free TypeScript with no
   React imports, and it is exhaustively tested. Everything else is delivery.
2. **Derive, never store, what can be computed.** `qualifies`, `daysLeft`, `status`,
   qualified counts, university counts, all derived. This deletes an entire class of
   data-contradiction bugs by construction.
3. **Never assert what isn't verified.** Every cut-off carries provenance. Unverified data
   is labelled in the UI. Marketing claims reflect reality (§8).
4. **Explain, don't just verdict.** "You miss this by 2 points" beats a red badge. The
   verdict type carries reasons.
5. **Durable infrastructure.** No runtime dependency on student-status benefits that expire.

---

## 5. Architecture

### 5.1 Repo consolidation

One tree under `src/`. The root duplicate is deleted after harvesting the four missing
files and five types, and it remains permanently recoverable from commit `172dd37`.
`.history/` deleted and added to `.gitignore`.

### 5.2 Shell

The prototype uses **one navbar with two states**, not two navbars. Same top nav
(Home / Universities / Cut-Off Points / Resources / About); anonymous shows
`Log in` + `Check Eligibility`, authenticated shows bell + avatar.

```
<Navbar user={user | null} />        one component, two states
MarketingLayout   → Navbar + Footer                    → /
AppLayout         → Navbar + Sidebar                   → all app routes
```

This removes the `min-h-screen / Navbar / flex / Sidebar` boilerplate currently
copy-pasted into all four pages.

### 5.3 The domain engine: `src/domain/`

No React. No imports from `src/components` or `src/pages`. 100% unit-test coverage target.

```
domain/wassce/
  grade.ts        Grade union A1..F9, toPoints (1..9), isCreditPass (A1 to C6)
  aggregate.ts    computeAggregate(results) → AggregateResult
  eligibility.ts  evaluate(programme, results) → Verdict
  inverse.ts      improvementsToQualify(programme, results) → Improvement[]
domain/advisor/
  intent.ts       parse(question) → Intent
  answer.ts       answer(Intent, dataset, results) → Answer
domain/deadlines/
  status.ts       statusOf(isoDate, now) → DeadlineStatus, daysUntil(...)
```

**Aggregate.** Best six: English + Core Maths + the better of (Integrated Science,
Social Studies) + the best three of up to four electives. Only A1 to C6 count as credit
passes. Range 6 (best) to 36.

**Verdict** is a three-state discriminated union, matching the prototype's badges:

```ts
type Verdict =
  | { status: 'qualified';     aggregate: number; margin: number }
  | { status: 'close-match';   aggregate: number; shortBy: number; shortfalls: Shortfall[] }
  | { status: 'not-eligible';  aggregate: number; shortfalls: Shortfall[] }
  | { status: 'incomplete';    missing: SubjectRequirement[] }

type Shortfall =
  | { kind: 'aggregate'; needed: number; actual: number; shortBy: number }
  | { kind: 'subject'; subject: string; needed: Grade; actual: Grade | null }
```

Thresholds, derived from the prototype (§7.2): `qualified` when `aggregate ≤ cutoff`;
`close-match` when `aggregate ≤ cutoff + 2`; otherwise `not-eligible`.

`incomplete` is load-bearing: if a student hasn't entered Physics, we say *"enter Physics
to check this"*, never *"you failed"*.

**Inverse solving** powers both the simulator and the advisor: given a programme the
student doesn't qualify for, compute the minimum set of grade improvements that would
change the verdict, ranked by how few grade steps they require.

### 5.4 Data layer with provenance and precedence

```
data/
  seed/       researched records, committed, provenance-stamped
  imports/    authoritative supplied records
       ↓  zod validate → merge by precedence → canonical
src/data/programmes.generated.ts     (static build)
supabase/seed.sql                    (same pipeline, second sink)
```

Every record carries:

```ts
interface Provenance {
  source: string          // "KNUST 2024 Admissions Brochure, p.12"
  sourceUrl?: string
  year: number
  lastVerified: string    // ISO date
  confidence: 'authoritative' | 'researched' | 'estimated'
}
```

**Precedence on collision (keyed by `programmeId` + `year`): `authoritative` > `researched`
> `estimated`.** Supplied authoritative data always supersedes researched seed data.
`npm run data:import <file>` validates and merges; CI fails on invalid records. The UI
badges anything below `authoritative`.

One source of truth, two sinks, so adding the backend doesn't rewrite the pipeline.

### 5.5 Persistence: repository pattern

```
ProfileRepository | SavedProgrammesRepository | ChecklistRepository | SearchHistoryRepository
        ↓ implemented by
LocalStorageRepository   (Phase 3)  →  SupabaseRepository   (Phase 4)
```

Swapped at a provider. Same interface, so Phase 4 changes no UI code.

### 5.6 Advisor: deterministic, not an LLM

Chosen over an LLM backend because it **cannot be wrong about eligibility**, costs nothing,
and returns instantly. An intent parser over the domain engine:

| Intent | Answer source |
|---|---|
| "What can I study with Aggregate N?" | engine across dataset at N, grouped by tier |
| "What grades do I need for X?" | `inverse.improvementsToQualify` |
| "Do I qualify for X?" | `evaluate` + shortfalls |
| "Which university is easiest to enter?" | aggregate cut-off statistics per university |
| "Compare X and Y" | comparison engine |
| "What careers fit my grades?" | career paths of qualified programmes, ranked |
| Superlatives (cheapest / highest salary / shortest) | dataset queries |
| Deadline queries | deadline engine |

Unmatched free text falls back to fuzzy programme/university matching, then to the four
suggested prompts. Every answer cites the data and its provenance.

### 5.7 Routes

`/` · `/eligibility` · `/dashboard` · `/programme/:id` · `/simulator` · `/compare` ·
`/advisor` · `/deadlines` · `/saved` · `/profile` · `/login` · `/signup` · `*` → 404

---

## 6. Design tokens

From the original brief. The current `index.css` has drifted (`--color-brand: #0d6d63`)
and most components use raw Tailwind `teal-700` / `blue-700` rather than tokens. To fix.

| Token | Value |
|---|---|
| Primary (deep teal) | `#0F766E` |
| Secondary (blue) | `#2563EB` |
| Accent (gold) | `#F59E0B` |
| Success | `#22C55E` |
| Background | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Text primary / secondary | `#0F172A` / `#475569` |

Inter. Hero 48 to 56px, section 32px, card title 20px, body 16px, caption 14px.
Radius 12 to 16px, 8-point spacing, WCAG AA contrast. Gradients only in hero/CTA bands.

---

## 7. Correctness decisions (deviations from the prototype)

### 7.1 The prototype's aggregate math contradicts the prototype's own stated rule

Confirmed against the Make source (`src/app/App.tsx`, `WhatIfSimulator`):

```ts
const [simGrades, setSimGrades] = useState<number[]>([2, 3, 3, 4, 2, 3, 4]);
const aggregate = simGrades.reduce((a, b) => a + b, 0);   // sums all 7 subjects
```

That yields **21**. But the same file's Programme Detail page states the rule explicitly,
twice:

> *"Note: Aggregate is sum of best 6 grades."*
> *"Based on best six subjects"*

So best-six is **the design's own documented rule**; the simulator is simply an
implementation bug that violates it. Correctly computed, English 2 + Maths 3 +
better of (Science 3, Social 4) + best three electives (2+3+4), that student's
aggregate is **17**.

This is not cosmetic. UDS Nursing has a cut-off of 20. At the true aggregate of 17 the
student **qualifies**; the simulator reports 21 and tells them they **do not**. The bug
inflates every student's aggregate and under-reports eligibility, the precise opposite of
the product's purpose.

**Decision: implement best-six. This aligns with the design's stated rule, and fixes the
prototype's implementation.**

### 7.2 Three-tier eligibility, margin 3

The prototype badges Qualified / Close Match / Not Eligible; the code has only two states.
The exact rule from the Make source (`ResultsDashboard`):

```ts
if (p.cutoff >= studentAggregate) return "qualified";
if (p.cutoff >= studentAggregate - 3) return "close";
return "not-eligible";
```

So `close-match ⟺ aggregate ≤ cutoff + 3`. (An earlier reading of the screenshots
inferred a margin of 2; the source is authoritative and the margin is **3**.) Made a
named constant, `CLOSE_MATCH_MARGIN = 3`, not a magic number.

### 7.2a Comparison superlatives are computed, not hardcoded

The Make source assigns comparison badges by hardcoded row id:

```ts
<Badge label={p.id === 2 ? "Most Competitive" : p.id === 3 ? "Lowest Fees" : "Best Employment"} />
```

These are computed across the compared set instead, so they remain correct for any
selection of programmes.

### 7.2b The advisor's answers are canned strings

The Make source's `AI_RESPONSES` is five hardcoded paragraphs keyed by substring match,
containing figures that drift from the dataset. Replaced by the deterministic engine
in §5.6, which computes every answer from the data.

### 7.3 Deadlines are computed

Store an ISO `deadlineDate`. Derive `status` and `daysLeft` from it against `now`.
Delete the stored fields. Closed deadlines render "Expired" per the prototype.

### 7.4 Dataset reconciliation

The prototype and the code disagree (prototype has Electrical Engineering; Law is UG
cut-off 10 vs the code's GIMPA 15; Medicine 8/GH₵8,600 vs 6/GH₵6,500; salaries are ranges
vs single values). Neither is authoritative. Both are treated as `estimated` until
replaced by researched or supplied records. The data model adopts salary **ranges**.

---

## 8. Integrity requirements

The product's positioning is trustworthiness, and its current copy is false.

| Claim | Reality | Action |
|---|---|---|
| "Trusted by 50,000+ students" | 0 users | Remove |
| "50,000+ Students Helped" | 0 | Remove |
| "99% Data Accuracy" | unverifiable | Remove |
| "78+ Programmes Listed" | 6 | Compute from dataset |
| "10 Universities Covered" | 5 | Compute from dataset |
| "Official cut-off data" | invented | Only once `authoritative` |
| FAQ: "sourced directly from official WASSCE releases and university admissions offices" | false | Rewrite to match actual provenance |
| 3 named student testimonials | fabricated | Remove, or label as illustrative |

Counts are bound to the data layer so they cannot drift again. This is a launch blocker,
not a nice-to-have: students make university application decisions on these numbers.

---

## 9. Testing

| Layer | Tool | Target |
|---|---|---|
| Domain (aggregate, eligibility, inverse, advisor, deadlines) | Vitest | 100% |
| Data validation & merge precedence | Vitest | 100% |
| Repositories | Vitest | 90% |
| Components | Vitest + Testing Library | key paths |
| E2E | Playwright | critical flows |
| Overall | | ≥ 80% |

E2E flows: enter grades → see correct matches; save → persists across reload; deep-link to
a programme; simulator changes verdicts live; advisor answers each suggested prompt;
signup/login.

Domain tests include a table of worked aggregate examples, explicitly covering the
best-six rule, the `incomplete` state, and the +2 close-match boundary.

---

## 10. Infrastructure

Deliberately avoiding runtime dependencies on GitHub Student Pack benefits, which expire
with student status. Pack benefits are used only where they create no lock-in.

| Concern | Choice | Why |
|---|---|---|
| Frontend hosting | Vercel free tier | SPA rewrites, preview deploys |
| Backend + DB + auth | Supabase free tier | 500MB Postgres, 50k MAU, does not expire |
| Email reminders | Resend free tier (3k/mo) | No pack offer exists for email |
| SMS reminders | Africa's Talking, behind env vars | Sandbox free; no production free tier |
| WhatsApp reminders | Behind env vars | Requires business verification |
| WhatsApp sharing | `wa.me` deep link | No API needed |
| Domain | Namecheap / .TECH via pack | Free year, no lock-in |
| Monitoring | Datadog via pack | Free 2 years, no lock-in |
| CI | GitHub Actions | typecheck, lint, test, data validation, build |

SMS and WhatsApp reminder toggles are built and persist, but render "coming soon" until
credentials are provisioned. No toggle silently does nothing.

---

## 11. Phases

**Phase 0: Make it run.** Consolidate to one tree, harvest the four missing files and five
types, delete the root duplicate and `.history/`, reconstruct `landing.ts` from the
prototype, unify the navbar into one two-state component, add the layouts, fix the `Link`
import, wire the full route table, align design tokens.
*Gate: `tsc --noEmit` and `vite build` both green.*

**Phase 1: The engine.** `domain/wassce/` with grade model, best-six aggregate, three-tier
verdict with shortfalls, inverse solving. Full unit tests first (TDD). Then the
`/eligibility` grade-entry flow, and `qualifies` becomes derived everywhere.
*Gate: 100% domain coverage; the four hardcoded contradictions in §2 are gone.*

**Phase 2: Trustworthy data.** Zod schemas, provenance fields, precedence merge, import
pipeline, CI validation. Research and seed real cut-off records. Fix all §8 claims.
Computed deadline status.
*Gate: every record has provenance; unverified data is badged; no false claims remain.*

**Phase 3: The missing screens + persistence.** Simulator, comparison with computed
superlatives, deterministic advisor, saved programmes, recent searches, working dark mode.
localStorage repositories.
*Gate: all 9 screens functional; state survives reload.*

**Phase 4: Accounts and delivery.** Supabase auth + schema + `SupabaseRepository`, email
reminders via Resend, SMS/WhatsApp behind env vars, WhatsApp sharing, Playwright E2E,
GitHub Actions CI, Vercel deploy with SPA rewrites, monitoring.
*Gate: deployed, CI green, E2E passing.*

---

## 12. Out of scope

- Native mobile apps
- Programme application submission (we link out; universities own this)
- Payment/premium tiers (the FAQ implies core-free + account-gated extras; no billing)
- Universities beyond Ghana
- LLM-backed advisor (deliberately replaced by the deterministic engine, §5.6)

---

## 13. Risks

| Risk | Mitigation |
|---|---|
| **Real cut-off data is the credibility of the product** and is hard to source authoritatively | Provenance is first-class; unverified data is visibly labelled; import pipeline lets authoritative data supersede |
| Cut-offs change annually and silently go stale | `year` + `lastVerified` on every record; surface staleness in the UI |
| Figma Make access is view-only | Design fully recovered from screenshots + the byte-identical code export; no further access needed |
| Student Pack benefits expire at graduation | Runtime built only on durable free tiers |
| Advisor cannot answer arbitrary questions | Honest fallback to suggested prompts rather than a wrong answer |
| Free-tier limits at scale | Supabase/Vercel/Resend limits are well above expected early usage; migration path documented before launch |

---

## 14. Open questions

None blocking. Decisions made under authority to proceed:

- Deterministic advisor over LLM (confirmed by owner)
- Email reminders only; SMS/WhatsApp behind env vars (confirmed by owner)
- Best-six aggregate, deviating from the prototype (§7.1)
- Salary modelled as a range (§7.4)
- Prototype and repo datasets both treated as `estimated` until superseded
