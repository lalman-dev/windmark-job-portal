"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/lib/api";
import type { PaginatedJobsResponse } from "@/types/job";

export function useJobs(page: number, limit: number) {
  return useQuery<PaginatedJobsResponse>({
    queryKey: ["jobs", page, limit],
    queryFn: () => fetchJobs(page, limit),
    placeholderData: (prev) => prev,
  });
}
