"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Job } from "@/types/job";
import { MapPin, Clock, Users, ArrowUpRight } from "lucide-react";
import { getEmploymentBadgeClass } from "@/lib/badge-utils";

interface JobCardProps {
  job: Job;
  index?: number;
  onClick?: (job: Job) => void;
}

function formatDeadline(dateStr: string): string {
  const date = new Date(dateStr);
  const diffDays = Math.ceil(
    (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays < 0) return "Closed";
  if (diffDays === 0) return "Closes today";
  if (diffDays <= 7) return `${diffDays}d left`;
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function formatSalary(from: number, to: number): string {
  const fmt = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
  return `${fmt(from)} – ${fmt(to)}`;
}

export function JobCard({ job, index = 0, onClick }: JobCardProps) {
  const isRemote = job.is_remote_work === 1;
  const badgeClass = getEmploymentBadgeClass(job.employment_type);
  const deadline = formatDeadline(job.application_deadline);
  const isUrgent =
    deadline !== "Closed" &&
    deadline !== "Closes today" &&
    deadline.includes("d left") &&
    parseInt(deadline) <= 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: "easeOut" }}
      className="group h-full"
    >
      <Card
        className="h-full cursor-pointer border transition-all duration-200 ease-out hover:border-brand/50 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
        onClick={() => onClick?.(job)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.(job);
          }
        }}
        aria-label={`View details for ${job.title} at ${job.company}`}
      >
        <CardHeader className="pb-3 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-base font-semibold leading-snug group-hover:text-brand transition-colors duration-150">
              {job.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-150 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-0.5" />
          </div>

          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {job.company} · {job.location}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3.5 pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
            {job.description}
          </p>

          {/* Badge row */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${badgeClass}`}
            >
              {job.employment_type}
            </span>

            <Badge variant="outline" className="text-xs font-normal">
              {job.job_category}
            </Badge>

            {isRemote && (
              <Badge
                variant="secondary"
                className="text-xs font-normal bg-brand-muted text-brand border-brand/20"
              >
                Remote
              </Badge>
            )}
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-0.5 border-t border-border/60">
            <span className="text-sm font-semibold text-foreground">
              {formatSalary(job.salary_from, job.salary_to)}
            </span>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {job.number_of_opening}
              </span>
              <span
                className={`flex items-center gap-1 ${isUrgent ? "text-destructive font-medium" : ""}`}
              >
                <Clock className="h-3 w-3" />
                {deadline}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
