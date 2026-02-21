"use client";
import { motion } from "framer-motion";
import { JobCard } from "./job-card";
import { JobCardSkeleton } from "@/components/shared/job-card-skeleton";
import type { Job } from "@/types/job";

interface JobListProps {
  jobs?: Job[];
  isLoading: boolean;
  isError: boolean;
}

export function JobList({ jobs, isLoading, isError }: JobListProps) {
  if (isError) {
    return (
      <div className="py-10 text-center text-sm text-red-500">
        Failed to load jobs. Please try again.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!jobs?.length) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        No jobs found.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </motion.div>
  );
}
