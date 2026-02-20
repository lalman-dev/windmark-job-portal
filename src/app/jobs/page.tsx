"use client";

import { useState } from "react";
import { useJobs } from "@/hooks/use-jobs";
import { JobList } from "@/components/jobs/job-list";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useJobFilters } from "@/hooks/use-job-filters";

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

  const [page] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useJobs(page, limit);
  const filteredJobs = useJobFilters(data?.data, filters);

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
      <JobList jobs={filteredJobs} isLoading={isLoading} isError={isError} />
    </main>
  );
}
