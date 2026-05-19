"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchJobs } from "@/lib/api";
import { useQueryStates } from "nuqs";
import { filterParsers } from "@/lib/search-params";
import { useJobs } from "@/hooks/use-jobs";
import { JobList } from "@/components/jobs/job-list";
import { JobDrawer } from "@/components/jobs/job-drawer";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useJobFilters } from "@/hooks/use-job-filters";
import type { Job } from "@/types/job";
import type { SortOption, JobFilters } from "@/types/filters";
import { FilterPanel } from "@/components/filters/filter-panel";
import { FilterSummary } from "@/components/filters/filter-summary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationControls } from "@/components/jobs/pagination-controls";
import { Button } from "@/components/ui/button";
import { useIntersection } from "@/hooks/use-intersection";
import { exportJobsToCSV } from "@/lib/export-csv";
import { exportJobsToPDF } from "@/lib/export-pdf";
import { EmptyState } from "@/components/states/empty-state";
import { ErrorState } from "@/components/states/error-state";
import Link from "next/link";
import { ArrowLeft, Download, FileText } from "lucide-react";

export default function JobsPage() {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: true,
  });

  const [viewMode, setViewMode] = useState<"pagination" | "infinite">(
    "pagination",
  );
  const [page, setPage] = useState(1);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const isAccumulating = useRef(false);

  const queryClient = useQueryClient();
  const limit = 10;
  const { data, isLoading, isError } = useJobs(page, limit);

  const jobs = data?.data ?? [];
  const sourceJobs = viewMode === "infinite" ? allJobs : jobs;

  const filtersAsJobFilters: JobFilters = {
    ...filters,
    salaryMin: filters.salaryMin ?? null,
    salaryMax: filters.salaryMax ?? null,
    minOpenings: filters.minOpenings ?? null,
    createdWithinDays: filters.createdWithinDays ?? null,
    sortBy: filters.sortBy as SortOption,
  };

  const filteredJobs = useJobFilters(sourceJobs, filtersAsJobFilters);

  const currentPage = data?.current_page ?? 1;
  const totalPages = data?.last_page ?? 1;
  const hasNextPage = Boolean(data?.next_page_url);
  const locations = Array.from(new Set(jobs.map((j) => j.location)));
  const categories = Array.from(new Set(jobs.map((j) => j.job_category)));
  const employmentTypes = Array.from(
    new Set(jobs.map((j) => j.employment_type)),
  );

  useEffect(() => {
    if (viewMode !== "infinite") {
      setAllJobs(jobs);
      return;
    }

    if (page === 1) {
      setAllJobs(jobs);
      isAccumulating.current = false;
      return;
    }

    setAllJobs((prev) => {
      const map = new Map(prev.map((j) => [j.id, j]));
      jobs.forEach((j) => map.set(j.id, j));
      return Array.from(map.values());
    });
    isAccumulating.current = false;
  }, [data, viewMode]);

  useEffect(() => {
    if (viewMode !== "infinite") return;
    if (!hasNextPage) return;

    queryClient.prefetchQuery({
      queryKey: ["jobs", page + 1, limit],
      queryFn: () => fetchJobs(page + 1, limit),

      staleTime: 30_000,
    });
  }, [page, hasNextPage, viewMode, queryClient, limit]);

  const handleLoadMore = useCallback(() => {
    if (viewMode !== "infinite") return;
    if (!hasNextPage) return;
    if (isLoading) return;
    setPage((p) => p + 1);
  }, [viewMode, hasNextPage, isLoading]);

  const loadMoreRef = useIntersection(
    handleLoadMore,
    viewMode === "infinite" && hasNextPage,
  );

  // Reset when filters change in infinite mode
  const filterKey = JSON.stringify(filters);
  useEffect(() => {
    if (viewMode !== "infinite") return;
    isAccumulating.current = true;
    setPage(1);
    setAllJobs([]);
  }, [filterKey, viewMode]);

  function clearAllFilters() {
    setFilters({
      search: "",
      location: "",
      employmentTypes: [],
      jobCategory: "",
      remoteOnly: false,
      salaryMin: null,
      salaryMax: null,
      minOpenings: null,
      createdWithinDays: null,
      sortBy: "newest",
    });
  }

  return (
    <main className="min-h-screen">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto max-w-7xl flex items-center justify-between py-3.5 px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Back</span>
            </Link>

            <div className="h-4 w-px bg-border" />

            <div>
              <h1 className="text-sm font-semibold leading-none">
                Windmark Jobs
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                {isLoading
                  ? "Loading…"
                  : `${filteredJobs.length} result${filteredJobs.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => exportJobsToCSV(filteredJobs)}
              disabled={!filteredJobs.length}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">CSV</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => exportJobsToPDF(filteredJobs, filtersAsJobFilters)}
              disabled={!filteredJobs.length}
            >
              <FileText className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </Button>

            <div className="h-4 w-px bg-border" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-7xl py-6 px-6">
        <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
          <FilterPanel
            locations={locations}
            categories={categories}
            employmentTypes={employmentTypes}
          />

          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1 rounded-lg border bg-card p-1">
                <Button
                  variant={viewMode === "pagination" ? "default" : "ghost"}
                  size="sm"
                  className={`h-7 px-3 text-xs ${
                    viewMode === "pagination"
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : ""
                  }`}
                  onClick={() => setViewMode("pagination")}
                >
                  Paginated
                </Button>
                <Button
                  variant={viewMode === "infinite" ? "default" : "ghost"}
                  size="sm"
                  className={`h-7 px-3 text-xs ${
                    viewMode === "infinite"
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : ""
                  }`}
                  onClick={() => setViewMode("infinite")}
                >
                  Infinite
                </Button>
              </div>

              <Select
                value={filters.sortBy}
                onValueChange={(v) => setFilters({ sortBy: v as SortOption })}
              >
                <SelectTrigger className="h-9 w-44 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                  <SelectItem value="salary_high">
                    Salary: high → low
                  </SelectItem>
                  <SelectItem value="salary_low">Salary: low → high</SelectItem>
                  <SelectItem value="openings">Most openings</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FilterSummary />

            <JobList
              jobs={filteredJobs}
              isLoading={
                isLoading || (viewMode === "infinite" && isAccumulating.current)
              }
              isError={isError}
              onJobClick={setSelectedJob}
            />

            {isError && <ErrorState onRetry={() => window.location.reload()} />}

            {!isLoading &&
              !isError &&
              !isAccumulating.current &&
              filteredJobs.length === 0 && (
                <EmptyState onClear={clearAllFilters} />
              )}

            {viewMode === "infinite" && hasNextPage && (
              <div ref={loadMoreRef} className="h-10" />
            )}

            {viewMode === "pagination" && filteredJobs.length > 0 && (
              <PaginationControls
                page={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>

      <JobDrawer job={selectedJob} onClose={() => setSelectedJob(null)} />
    </main>
  );
}
