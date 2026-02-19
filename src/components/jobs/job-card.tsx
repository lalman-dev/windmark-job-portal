"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Job } from "@/types/job";

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const isRemote = job.is_remote_work === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="h-full transition-all hover:shadow-md">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold leading-tight">{job.title}</h3>

            {isRemote && (
              <Badge variant="secondary" className="shrink-0">
                Remote
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground">
            {job.company} • {job.location}
          </p>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {job.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">{job.job_category}</Badge>
            <Badge variant="outline">Openings: {job.number_of_opening}</Badge>
          </div>

          <div className="text-sm font-medium">
            ₹{job.salary_from.toLocaleString()} — ₹
            {job.salary_to.toLocaleString()}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
