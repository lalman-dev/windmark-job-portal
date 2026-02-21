"use client";

import { useMemo } from "react";
import type { Job } from "@/types/job";
import type { JobFilters } from "@/types/filters";

export function useJobFilters(jobs: Job[] | undefined, filters: JobFilters) {
  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    const filtered = jobs.filter((job) => {
      // Search filter
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const matchesSearch =
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.description.toLowerCase().includes(q);

        if (!matchesSearch) return false;
      }

      // Location filter
      if (filters.location) {
        if (
          !job.location.toLowerCase().includes(filters.location.toLowerCase())
        ) {
          return false;
        }
      }

      // Employment type filter
      if (filters.employmentTypes.length > 0) {
        if (!filters.employmentTypes.includes(job.employment_type)) {
          return false;
        }
      }

      // Category filter
      if (filters.jobCategory) {
        if (job.job_category !== filters.jobCategory) {
          return false;
        }
      }

      // Remote category filter
      if (filters.remoteOnly) {
        if (job.is_remote_work !== 1) return false;
      }

      // filter by Salary range
      if (filters.salaryMin !== null) {
        if (job.salary_to < filters.salaryMin) return false;
      }

      if (filters.salaryMax !== null) {
        if (job.salary_from > filters.salaryMax) return false;
      }

      // filter by Minimum openings
      if (filters.minOpenings !== null) {
        if (job.number_of_opening < filters.minOpenings) return false;
      }

      // filter by Created within days
      if (filters.createdWithinDays !== null) {
        const created = new Date(job.created_at).getTime();
        const now = Date.now();
        const diffDays = (now - created) / (1000 * 60 * 60 * 24);

        if (diffDays > filters.createdWithinDays) return false;
      }

      return true;
    });

    // SORTING LAYER
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );

        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );

        case "salary_high":
          return b.salary_to - a.salary_to;

        case "salary_low":
          return a.salary_from - b.salary_from;

        case "openings":
          return b.number_of_opening - a.number_of_opening;

        default:
          return 0;
      }
    });

    return sorted;
  }, [
    jobs,
    filters.search,
    filters.location,
    filters.employmentTypes.join("|"),
    filters.jobCategory,
    filters.remoteOnly,
    filters.salaryMin,
    filters.salaryMax,
    filters.minOpenings,
    filters.createdWithinDays,
    filters.sortBy,
  ]);

  return filteredJobs;
}
