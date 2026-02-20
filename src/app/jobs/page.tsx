"use client";

import { useState, useEffect } from "react";
import { useJobs } from "@/hooks/use-jobs";
import { JobList } from "@/components/jobs/job-list";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useJobFilters } from "@/hooks/use-job-filters";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

export default function JobsPage() {
  const [filters, setFilters] = useState({
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
          <h1 className="text-2xl font-bold tracking-tight">Job Listings</h1>
          <p className="text-sm text-muted-foreground">
            Discover opportunities tailored for you
          </p>
        </div>
      </div>
      <div className="mb-6 max-w-md">
        <input
          className="w-full rounded-md border px-3 py-2 text-sm"
          placeholder="Search jobs, companies..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <label className="mb-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={filters.remoteOnly}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              remoteOnly: e.target.checked,
            }))
          }
        />
        Remote only (debug)
      </label>

      <JobList jobs={filteredJobs} isLoading={isLoading} isError={isError} />
    </main>
  );
}
