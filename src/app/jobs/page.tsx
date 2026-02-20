"use client";

import { useState, useEffect } from "react";
import { useJobs } from "@/hooks/use-jobs";
import { JobList } from "@/components/jobs/job-list";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useJobFilters } from "@/hooks/use-job-filters";
import type { JobFilters } from "@/types/filters";
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

export default function JobsPage() {
  const [filters, setFilters] = useState<JobFilters>({
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

  const [searchInput, setSearchInput] = useState("");
  const [viewMode, setViewMode] = useState<"pagination" | "infinite">(
    "pagination",
  );
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useJobs(page, limit);
  const filteredJobs = useJobFilters(data?.data, filters);

  const jobs = data?.data ?? [];
  const currentPage = data?.current_page ?? 1;
  const totalPages = data?.last_page ?? 1;
  const hasNextPage = Boolean(data?.next_page_url);
  const locations = Array.from(new Set(jobs.map((j) => j.location)));
  const categories = Array.from(new Set(jobs.map((j) => j.job_category)));
  const employmentTypes = Array.from(
    new Set(jobs.map((j) => j.employment_type)),
  );

  const debouncedSearch = useDebouncedValue(searchInput, 500);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: debouncedSearch,
    }));
  }, [debouncedSearch]);

  return (
    <main className="container mx-auto max-w-7xl py-8 px-4">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <ThemeToggle />
          <h1 className="text-3xl font-bold tracking-tight">
            WindMark Job Listings
          </h1>
          <p className="text-md text-muted-foreground">
            Discover opportunities tailored for you
          </p>
        </div>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr]">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          searchInput={searchInput}
          onSearchChange={setSearchInput}
          locations={locations}
          categories={categories}
          employmentTypes={employmentTypes}
        />

        <div className="min-w-0">
          <FilterSummary filters={filters} onChange={setFilters} />

          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredJobs.length} results
            </p>

            <Select
              value={filters.sortBy}
              onValueChange={(v) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: v as any,
                }))
              }
            >
              <SelectTrigger className="w-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="salary_high">Salary High → Low</SelectItem>
                <SelectItem value="salary_low">Salary Low → High</SelectItem>
                <SelectItem value="openings">Most Openings</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mb-4 flex items-center gap-2">
            <Button
              variant={viewMode === "pagination" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("pagination")}
            >
              Pagination
            </Button>

            <Button
              variant={viewMode === "infinite" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("infinite")}
            >
              Infinite Scroll
            </Button>
          </div>
          <JobList
            jobs={filteredJobs}
            isLoading={isLoading}
            isError={isError}
          />
          {viewMode === "pagination" && (
            <PaginationControls
              page={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
