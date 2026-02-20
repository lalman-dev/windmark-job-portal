"use client";

import { useState, useEffect } from "react";
import type { JobFilters } from "@/types/filters";
import { useJobs } from "@/hooks/use-jobs";
import { JobList } from "@/components/jobs/job-list";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useJobFilters } from "@/hooks/use-job-filters";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { FilterPanel } from "@/components/filters/filter-panel";

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
  });

  const [searchInput, setSearchInput] = useState("");

  const [page] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useJobs(page, limit);
  const filteredJobs = useJobFilters(data?.data, filters);

  const jobs = data?.data ?? [];

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
          <h1 className="text-3xl font-bold tracking-tight">WindMark Job Listings</h1>
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
        <JobList jobs={filteredJobs} isLoading={isLoading} isError={isError} />
      </div>
    </main>
  );
}
