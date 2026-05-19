"use client";

import { motion } from "framer-motion";
import { JobCard } from "./job-card";
import { JobCardSkeleton } from "@/components/shared/job-card-skeleton";
import type { Job } from "@/types/job";

interface JobListProps {
  jobs?: Job[];
  isLoading: boolean;
  isError: boolean;
  onJobClick?: (job: Job) => void;
}

export function JobList({
  jobs,
  isLoading,
  isError,
  onJobClick,
}: JobListProps) {
  if (isError) return null;

  if (isLoading && !jobs?.length) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!jobs?.length) return null;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job, index) => (
        <JobCard key={job.id} job={job} index={index} onClick={onJobClick} />
      ))}
    </div>
  );
}
