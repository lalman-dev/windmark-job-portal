"use client";

import { useState } from "react";
import { useJobs } from "@/hooks/use-jobs";
import { JobList } from "@/components/jobs/job-list";

export default function JobsPage() {
  const [page] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useJobs(page, limit);

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Job Listings</h1>

      <JobList jobs={data?.data} isLoading={isLoading} isError={isError} />
    </main>
  );
}
