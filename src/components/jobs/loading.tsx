import { JobCardSkeleton } from "@/components/shared/job-card-skeleton";

export default function JobsLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="h-14.25 border-b bg-card/80" />

      <div className="container mx-auto max-w-7xl py-6 px-6">
        <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filter panel placeholder */}
          <div className="hidden lg:block rounded-xl border bg-card h-130 animate-pulse" />

          {/* Card grid skeleton */}
          <div className="min-w-0">
            {/* Toolbar placeholder */}
            <div className="mb-4 flex items-center justify-between">
              <div className="h-9 w-44 rounded-lg border bg-card animate-pulse" />
              <div className="h-9 w-44 rounded-lg border bg-card animate-pulse" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <JobCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
