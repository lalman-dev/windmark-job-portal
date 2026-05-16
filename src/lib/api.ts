import type { PaginatedJobsResponse, Job } from "@/types/job";

const BASE_URL = "https://jsonfakery.com";

export async function fetchJobs(
  page = 1,
  limit = 10,
): Promise<PaginatedJobsResponse> {
  const res = await fetch(
    `${BASE_URL}/jobs/paginated?page=${page}&per_page=${limit}`,
    { cache: "no-store" },
  );

  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

export async function fetchJobById(id: string): Promise<Job | null> {
  const res = await fetch(`${BASE_URL}/jobs/paginated?page=1&per_page=100`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch job");

  const data: PaginatedJobsResponse = await res.json();
  return data.data.find((job) => job.id === id) ?? null;
}
