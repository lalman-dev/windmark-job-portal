import type { PaginatedJobsResponse } from "@/types/job";

const BASE_URL = "https://jsonfakery.com";

export async function fetchJobs(
  page = 1,
  limit = 10
): Promise<PaginatedJobsResponse> {
  const res = await fetch(
    `${BASE_URL}/jobs/paginated?page=${page}&per_page=${limit}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  return res.json();
}
