# UniMatch Ghana

Helps Ghanaian SHS graduates find every university programme they qualify for, from their
WASSCE grades — and, where they fall short, exactly what would change it.

```bash
npm install
npm run dev
```

No API keys, no database, no account required. It works out of the box.

---

## What it does

Enter your grades → see every programme ranked by whether you qualify, with reasons. Compare
shortlisted programmes, simulate better grades, track deadlines, and ask an advisor questions
that are answered from the data rather than guessed.

| Screen | Route | Needs grades? |
|---|---|---|
| Landing | `/` | no |
| **Cut-off points browser** | `/cut-off-points` | no |
| **Universities index** | `/universities` | no |
| **University profile** | `/university/:id` | no |
| Programme detail | `/programme/:id` | no |
| WASSCE grade entry | `/eligibility` | — |
| Results dashboard | `/dashboard` | yes |
| What-if simulator | `/simulator` | no |
| Comparison | `/compare` | no |
| Career advisor | `/advisor` | better with |
| Deadline tracker | `/deadlines` | no |
| Saved shortlist | `/saved` | no |
| Profile | `/profile` | no |

The public pages matter: students search "KNUST cut off points" long before they're
ready to enter eight grades. Everything above marked "no" is browsable and crawlable
without a form or an account.

## Mobile

Most Ghanaian students arrive on a phone, so mobile is the primary target rather than a
fallback:

- A **bottom tab bar** replaces the sidebar below `lg` — previously the sidebar was simply
  `hidden` on phones, leaving no in-app navigation at all
- Tables become **card lists** rather than squeezed columns
- Touch targets are ≥44px; the tab bar clears the iOS home indicator
- Layout is verified at a Pixel 7 viewport in CI, including an assertion that **no page
  scrolls sideways**

## SEO

Each route sets its own `<title>`, description, canonical, Open Graph tags and JSON-LD via
`src/components/Seo.tsx` (React 19 hoists these natively — no helmet library).
`npm run build` regenerates `sitemap.xml` and `robots.txt` from the catalogue, so every
programme and university has a crawlable URL.

## How the aggregate is computed

The WASSCE aggregate is the **sum of the best six**:

```
English Language
+ Core Mathematics
+ the better of (Integrated Science, Social Studies)
+ the best three electives
```

A1 = 1 … F9 = 9, so **lower is better** and 6 is the best possible score. Only credit passes
(A1–C6) satisfy a requirement.

This matters: the original prototype summed all seven entered subjects, which inflated every
student's aggregate by roughly one grade and told them they didn't qualify for programmes they
did. `src/domain/wassce/aggregate.test.ts` locks the correct behaviour in place.

Eligibility is a three-tier verdict, not a boolean:

| Verdict | Meaning |
|---|---|
| **Qualified** | Aggregate meets the cut-off *and* every subject requirement is met |
| **Close Match** | Within `CLOSE_MATCH_MARGIN` (3) points of the cut-off |
| **Not Eligible** | Beyond that margin |
| **Incomplete** | Not enough grades entered to judge — never rendered as a failure |

Each verdict carries the reasons behind it, and the inverse solver turns those into an action:
*"Raise Chemistry from C4 to B2 and you unlock Computer Science at KNUST."*

## Architecture

```
src/
  domain/          Pure TypeScript. No React, no DOM. This is the product.
    wassce/        grades, aggregate, eligibility, inverse solver
    advisor/       intent parsing and data-driven answers
    deadlines/     status and countdown derived from ISO dates
    catalogue/     programme, university and provenance types
  data/            zod schemas + the generated catalogue
  state/           repository-backed persistence (local or account)
  components/      ui primitives, layout, programme cards
  pages/           one file per route
```

The domain layer never imports from the UI, is unit-tested to 100%, and is where every rule
lives. Everything above it is delivery.

Persistence goes through a `StudentRepository` interface with two implementations —
`LocalStorageStudentRepository` and `SupabaseStudentRepository` — so adding accounts changed no
UI code.

## Data and provenance

Cut-off points decide where students apply. An unsourced figure is therefore treated as a
defect, not a placeholder.

Every record carries where it came from, when it was last checked, and how much to trust it:

| Confidence | Meaning | Shown as |
|---|---|---|
| `authoritative` | From the university's own published admissions list | **Official** |
| `researched` | From a credible secondary source, unconfirmed | **Unconfirmed** |
| `estimated` | Our own estimate | **Estimate** |

Anything below `authoritative` is visibly badged in the UI.

```
data/seed/       researched + estimated records, committed
data/imports/    authoritative records supplied by whoever holds the source
      ↓ validate → merge by precedence → generate
src/data/catalogue.generated.ts
```

**Higher confidence always wins**, so dropping an official list into `data/imports/` supersedes
the seed data without editing it by hand:

```bash
npm run data:import -- ./path/to/programmes.json   # validate, merge, regenerate
npm run data:validate                              # check without writing
npm run data:build                                 # regenerate the catalogue
```

CI fails if a record is malformed, references an unknown university, or if a headline cut-off
disagrees with its own trend chart.

### External links

Every link out of the app is verified against the live site rather than derived from a pattern.
The catalogue previously built all nineteen "official admissions page" links from the same
guess, `<domain>/admissions`; seventeen led nowhere, including four universities that had
changed domain and one whose page redirected to a job advert.

```
scripts/link-registry.ts                  admissions / programmes / cut-off page per university
data/authoritative/programme-urls.json    194 programmes that have their own official page
```

Where a university publishes a page for the exact programme, the app links to it. Where it does
not, the link falls back to that university's programme catalogue, which is labelled as a list so
nobody expects a single programme. Nothing is guessed from a URL template.

```bash
npm run data:audit-links   # fetch every external URL, fail on any that is dead
npm run data:apply-links   # stamp the registry onto the seed data (idempotent)
```

`data:audit-links` deliberately runs slowly — several of these hosts rate-limit, and an impatient
check reports healthy pages as dead. `src/data/links.test.ts` covers the structural half of this
on every commit without touching the network.

## Commands

| Command | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Typecheck + production build |
| `npm run verify` | Typecheck + data validation + tests — run before pushing |
| `npm run test` | Unit and integration tests |
| `npm run test:coverage` | With coverage thresholds (domain is held at 100%) |
| `npm run test:e2e` | Playwright, against the real production build |
| `npm run data:validate` | Validate the catalogue |
| `npm run data:audit-links` | Fetch every external URL and report the dead ones |

## Configuration

Everything is optional — see `.env.example`.

- **Supabase** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) enables accounts so a shortlist
  follows a student between devices. Apply `supabase/migrations/0001_student_state.sql` first;
  row-level security is what protects the data, since the anon key is public by design.
- **Email reminders** run as a Supabase Edge Function on `pg_cron`, 06:00 UTC each Monday, sending
  through Resend from `noreply@unimatchgh.app`. A student is mailed only about universities they
  have saved a programme at; anyone who has saved nothing is skipped. Every mail carries a signed
  one-click unsubscribe that needs no sign-in. See "Reminder setup" below.
- **SMS and WhatsApp reminders** are built but disabled. They need a Ghanaian provider
  (Africa's Talking has a free sandbox but no production free tier). The toggles say "Coming
  soon" rather than silently doing nothing.

### Reminder setup

Already done on the live project: migrations pushed, both functions deployed, the schedule
running, and `REMINDER_UNSUBSCRIBE_SECRET` set. **One thing is outstanding — `RESEND_API_KEY`:**

```bash
npx supabase secrets set RESEND_API_KEY=re_xxx --project-ref fttzuizvvwekmjtdqgmh
```

Until it is set the function authenticates, finds its recipients, and then fails before sending.
Nothing is mailed and nothing is lost, because no student is opted in yet either: migration 0002
cleared the opt-ins that were never a real choice.

There is no vault SQL to paste and no cron secret to invent. Migration 0004 has the database
generate its own secret into Vault; `pg_cron` reads it to sign the call and the function checks it
back through `verify_reminder_secret()`, so the value exists in exactly one place and no human
ever holds a copy.

To redeploy after a change:

```bash
npm run data:functions   # only if the catalogue or deadlines changed
npx supabase db push
npm run functions:deploy
```

`npm run data:functions` must be re-run whenever the catalogue or deadlines change, or the
function will keep mailing last week's dates.

## Deployment

The app is a static SPA, so it needs a rewrite rule sending unknown paths to `index.html` —
without one, refreshing on `/dashboard` returns a 404.

- **Vercel** — `vercel.json` is committed, including cache and security headers
- **Netlify** — `public/_redirects` is committed
- **Heroku** — `Procfile` serves `dist/`; run `npm run build` in the release step

## Known limits

- Coverage is **26 programmes across 8 institutions**, not every programme in Ghana.
- Fees, salary ranges and employment rates are **indicative estimates**, not published figures.
- Deadlines are marked estimated until confirmed against each university's portal.
- Cut-offs move every year with the pass rate and available places. UniMatch is a guide;
  the university decides.
