# Windmark Job Portal

A job listing interface built as a frontend production-grade project — each phase independently reviewable, testable, and meaningful.

**Live:** https://windmark-job-portal.vercel.app

---

## What it does

Browse, filter, sort, and export job listings from a paginated REST API. The interface is built to handle real-world edge cases: empty states, API errors, hydration safety, infinite scroll de-duplication, and export of filtered datasets — not just the happy path.

---

## Stack

| Layer         | Choice                       |
| ------------- | ---------------------------- |
| Framework     | Next.js — App Router         |
| Language      | TypeScript (strict)          |
| Data fetching | TanStack Query v5            |
| Styling       | Tailwind CSS v4 + shadcn/ui  |
| Animation     | Framer Motion v12            |
| Theme         | next-themes (SSR-safe)       |
| Export        | jsPDF + autoTable, PapaParse |
| Deployment    | Vercel                       |

---

## Architecture decisions worth knowing

**Filtering is a pure hook, not a component concern.**
`useJobFilters(jobs, filters)` takes data and filter state as inputs and returns sorted, filtered output. It has no side effects and no knowledge of the UI. This makes it trivially testable and means the filter panel can be completely replaced without touching filter logic.

**The `employmentTypes` dep array trick.**
Inside `useJobFilters`, the `useMemo` dep array uses `filters.employmentTypes.join("|")` instead of the array reference. Arrays are new objects on every render even when contents are identical — joining to a primitive gives `useMemo` something stable to diff against. The comment in the code explains this explicitly.

**Infinite scroll de-duplication.**
When switching pages in infinite scroll mode, new jobs are merged into a `Map` keyed by `job.id` before converting back to an array. This prevents duplicates if the API returns overlapping results across pages — a real pagination bug that most implementations miss.

**`React.memo` with a custom comparator.**
`JobCard` is memoized with a field-level `areEqual` function rather than the default shallow comparison. The default would never bail out because the `job` object reference changes on every filter/sort cycle even when the underlying data hasn't. The comparator checks only the 11 fields the card actually renders.

**App Router `loading.tsx` / `error.tsx`.**
These files are server-rendered by Next.js before any JS reaches the browser. The skeleton in `loading.tsx` mirrors the real page layout so there's no layout shift on hydration. The `error.tsx` boundary must be a Client Component — that's a React constraint, not a framework preference.

**`qualifications` parsing.**
The API returns `qualifications` as a stringified JSON array. `parseQualifications()` in the drawer wraps `JSON.parse` in a try/catch and handles three cases: valid array, valid non-array JSON, and plain non-JSON text. Defensive without being verbose.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — Theme + Query providers
│   ├── page.tsx                # Landing page
│   └── jobs/
│       ├── page.tsx            # Main jobs page (client)
│       ├── loading.tsx         # App Router skeleton boundary
│       └── error.tsx           # App Router error boundary
│
├── components/
│   ├── filters/
│   │   ├── filter-panel.tsx    # Sticky sidebar, mobile-collapsible
│   │   └── filter-summary.tsx  # Active filter chips with AnimatePresence
│   ├── jobs/
│   │   ├── job-card.tsx        # Memoized, accessible, color-coded badges
│   │   ├── job-drawer.tsx      # Slide-over detail panel
│   │   ├── job-list.tsx        # Grid with AnimatePresence wrapper
│   │   └── pagination-controls.tsx
│   ├── shared/
│   │   ├── job-card-skeleton.tsx
│   │   ├── page-transition.tsx
│   │   └── theme-toggle.tsx    # Animated sun/moon with SSR guard
│   └── states/
│       ├── empty-state.tsx
│       └── error-state.tsx
│
├── hooks/
│   ├── use-jobs.ts             # TanStack Query wrapper
│   ├── use-job-filters.ts      # Pure filter + sort logic
│   ├── use-debounced-value.ts  # Custom — no lodash
│   └── use-intersection.ts    # IntersectionObserver for infinite scroll
│
├── lib/
│   ├── api.ts
│   ├── badge-utils.ts          # Shared employment type → CSS class mapping
│   ├── export-csv.ts
│   └── export-pdf.ts
│
├── providers/
│   ├── query-provider.tsx
│   └── theme-provider.tsx
│
└── types/
    ├── job.ts
    └── filters.ts
```

---

## How the commit history was structured

The project was upgraded from assignment to portfolio in deliberate stages. Each commit is independently reviewable:

```
refactor: tighten TypeScript, remove dead deps, fix ts-ignore
polish:   redesign UI with amber accent system, animated landing, richer job cards
feat:     add job detail drawer with parsed qualifications and full job info
perf:     memoize JobCard, add App Router loading/error boundaries, harden next.config
docs:     rewrite README with architecture notes and roadmap
```

This sequence shows a real working pattern: clean first, then build features, then optimise, then document.

---

## Running locally

```bash
git clone https://github.com/lalman-dev/windmark-job-portal.git
cd windmark-job-portal
npm install
npm run dev
```

```bash
npm run type-check
npm run lint
npm run build
```

---

## What I'd build next

**URL-driven filter state** — filters currently live in React state. Moving them to URL search params (via `nuqs` or `useSearchParams`) would make results shareable and bookmarkable, and filters would survive a page refresh. This is the single highest-leverage architectural change remaining.

**Job detail page (`/jobs/[id]`)** — the drawer works well for quick preview, but a dedicated route would enable direct linking, better SEO via `generateMetadata`, and a richer layout without the width constraints of a slide-over panel.

**Server-side filtering** — the current filter logic runs entirely on the client against one page of data at a time. Moving filtering to the API layer (if the API supported query params) would make results accurate across the full dataset rather than just the current page.

**Saved searches** — persist a filter state to localStorage with a name, restore it on demand. Straightforward to build on top of the existing `JobFilters` type.

**Authentication + saved jobs** — a thin auth layer (NextAuth or Clerk) would unlock a "saved jobs" feature with a separate view. The existing drawer's "Apply via email" CTA is a natural entry point.

---

## About

Built by **Lalman** — frontend engineer working with React, Next.js, and TypeScript.

Open to frontend and product-focused roles where ownership, performance, and UX quality matter. Based in Lucknow, India. Available for remote roles.
