# 🧑‍💻 Windmark Job Portal

A job listing portal built with modern React architecture, advanced filtering, dual pagination modes, export features, and accessibility-first design.

---

## 🔗 Live Demo:

https://windmark-job-portal.vercel.app/

---

## ✨ Overview

This project implements a scalable, UX-focused job portal interface with:

- Advanced multi-layer filtering

- Server-side pagination

- Infinite scroll mode

- Debounced search

- Sorting engine

- CSV & PDF export

- System-aware persistent dark mode

- Accessibility compliance

- Smooth route transitions

The goal was to design a clean, maintainable, and production-ready frontend architecture.

---

## 🧱 Tech Stack

- Next.js 16 (App Router)

- TypeScript

- React Query (TanStack Query)

- Tailwind CSS

- shadcn/ui

- Framer Motion

- next-themes

- jsPDF + autoTable

- Vercel (Deployment)

---

## 🚀 Features

🔎 Advanced Filtering

- Search (debounced)

- Location

- Employment Type (multi-select)

- Job Category

- Remote Only

- Salary Range (min/max)

- Minimum Openings

- Created Within (date filter)

- Sort by:
  - Newest

  - Oldest

  - Salary (High → Low)

  - Salary (Low → High)

  - Most Openings

All filtering is performed via a dedicated useJobFilters hook to maintain separation of logic from UI.

---

## 📄 Dual Pagination Modes

Users can switch between:

- Traditional Pagination

- Infinite Scroll (Intersection Observer-based)

Pagination hides automatically when filtered results are zero to prevent logical UI contradictions.

---

## 📦 Export Capabilities

- Export CSV – exports currently filtered dataset

- Export PDF – structured, formatted table output

Exports reflect applied filters and sorting state.

---

## 🌗 Theme System

- System-aware (respects OS preference)

- Persisted in localStorage

- Hydration-safe (no flicker)

- Accessible toggle with aria-label

Implemented using next-themes with SSR-safe mounting.

---

## ⚡ Smooth Transitions

- Page transitions powered by Framer Motion

- Controlled animation to avoid UX disruption

- Layout-aware animation structure

---

## ♿ Accessibility

- aria-live for dynamic results count

- Accessible buttons and toggle controls

- Proper label associations

- Focus states preserved

- Logical keyboard navigation

---

## 🧠 State Handling Strategy

The UI explicitly separates:

```
| State   | Component    |
| ------- | ------------ |
| Loading | Skeleton     |
| Empty   | `EmptyState` |
| Error   | `ErrorState` |
| Results | `JobList`    |
```

This prevents ambiguous UI states and improves maintainability.

---

## 🏗 Architecture Decisions

1. Separation of Concerns

- Filtering logic extracted to useJobFilters

- State components (EmptyState, ErrorState) extracted from page

- Pagination & Infinite scroll logic separated

- UI components kept presentation-focused

2. Hydration & SSR Safety

- suppressHydrationWarning used appropriately

- Theme toggle guarded by mounted state

- No client/server mismatch warnings

- Avoided Date-based rendering inconsistencies

3. Infinite Scroll Stability

Implemented using:

- Custom useIntersection hook

- Controlled page increment

- De-duplication logic

- Reset handling on filter change

- Protection against infinite update loops

4. Performance Considerations

- Debounced search (500ms)

- Memoized filter + sort computation

- Controlled re-renders

- No unnecessary state mutation

---

## 🗂 Project Structure (Simplified)

```
src/
│
├── app/
│   ├── layout.tsx          # Root layout (Theme + Query providers)
│   ├── page.tsx            # Landing page
│   └── jobs/
│       └── page.tsx        # Main job portal page
│
├── components/
│   ├── filters/
│   │   ├── filter-panel.tsx
│   │   └── filter-summary.tsx
│   │
│   ├── jobs/
│   │   ├── job-card.tsx
│   │   ├── job-list.tsx
│   │   └── pagination-controls.tsx
│   │
│   ├── shared/
│   │   ├── job-card-skeleton.tsx
│   │   ├── page-transition.tsx
│   │   └── theme-toggle.tsx
│   │
│   ├── states/
│   │   ├── empty-state.tsx
│   │   └── error-state.tsx
│   │
│   └── ui/
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       └── switch.tsx
│
├── hooks/
│   ├── use-jobs.ts
│   ├── use-job-filters.ts
│   ├── use-debounced-value.ts
│   └── use-intersection.ts
│
├── lib/
│   ├── api.ts
│   ├── export-csv.ts
│   ├── export-pdf.ts
│   └── utils.ts
│
├── providers/
│   ├── query-provider.tsx
│   └── theme-provider.tsx
│
└── types/

```

---

## 🧪 Edge Cases Handled

- Empty filter results

- Network/API error state

- Hydration mismatch

- Infinite scroll reset on filter change

- Export with zero results (disabled)

- Theme persistence across refresh

- Page transition consistency

---

## 🛠 Running Locally

```bash
git clone <repo>
cd windmark-job-portal
npm install
npm run dev
```

Then visit:

```
http://localhost:3000

```

---

## 🎯 What This Demonstrates

- Strong React state management

- UX-focused thinking

- Clean architectural decisions

- Debugging ability (hydration, infinite loops, intersection issues)

- Accessibility awareness

📌 Final Notes

This project was built with emphasis on:

- Stability over flashiness

- Maintainability over quick hacks

- Clear state separation

- Professional UI consistency
