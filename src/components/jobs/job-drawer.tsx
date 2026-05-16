"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Job } from "@/types/job";
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  Mail,
  Calendar,
  CheckCircle2,
  X,
  Wifi,
  IndianRupee,
  Tag,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getEmploymentBadgeClass } from "@/lib/badge-utils";
import Link from "next/link";

interface JobDrawerProps {
  job: Job | null;
  onClose: () => void;
}

function formatSalary(from: number, to: number): string {
  const fmt = (n: number) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
  return `${fmt(from)} – ${fmt(to)} / year`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDeadline(dateStr: string): { label: string; urgent: boolean } {
  const date = new Date(dateStr);
  const diffDays = Math.ceil(
    (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays < 0) return { label: "Closed", urgent: false };
  if (diffDays === 0) return { label: "Closes today", urgent: true };
  if (diffDays <= 3) return { label: `${diffDays} days left`, urgent: true };
  return { label: formatDate(dateStr), urgent: false };
}

function parseQualifications(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
    if (typeof parsed === "string") return [parsed];
    return [String(parsed)];
  } catch {
    return raw ? [raw] : [];
  }
}

function MetaRow({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
          {label}
        </p>
        <p
          className={`text-sm font-medium wrap-break-words ${accent ? "text-brand" : "text-foreground"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

export function JobDrawer({ job, onClose }: JobDrawerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (job) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [job]);

  const qualifications = job ? parseQualifications(job.qualifications) : [];
  const deadline = job ? formatDeadline(job.application_deadline) : null;
  const badgeClass = job ? getEmploymentBadgeClass(job.employment_type) : "";

  return (
    <AnimatePresence>
      {job && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.aside
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label={job.title}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col bg-background shadow-2xl border-l"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b px-6 py-5">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold leading-snug line-clamp-2">
                  {job.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.company}
                  <span className="mx-1.5 opacity-40">·</span>
                  {job.location}
                </p>

                {/* Badge row */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${badgeClass}`}
                  >
                    {job.employment_type}
                  </span>

                  <Badge variant="outline" className="text-xs font-normal">
                    {job.job_category}
                  </Badge>

                  {job.is_remote_work === 1 && (
                    <Badge
                      variant="secondary"
                      className="gap-1 text-xs font-normal bg-brand-muted text-brand border-brand/20"
                    >
                      <Wifi className="h-3 w-3" />
                      Remote
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
              {/* Key meta */}
              <section>
                <MetaRow
                  icon={IndianRupee}
                  label="Salary"
                  value={formatSalary(job.salary_from, job.salary_to)}
                  accent
                />
                <MetaRow
                  icon={Users}
                  label="Openings"
                  value={`${job.number_of_opening} position${job.number_of_opening !== 1 ? "s" : ""}`}
                />
                <MetaRow icon={MapPin} label="Location" value={job.location} />
                <MetaRow
                  icon={Briefcase}
                  label="Employment type"
                  value={job.employment_type}
                />
                <MetaRow icon={Tag} label="Category" value={job.job_category} />
                <MetaRow
                  icon={Calendar}
                  label="Posted on"
                  value={formatDate(job.created_at)}
                />
                <MetaRow
                  icon={Clock}
                  label="Application deadline"
                  value={deadline?.label ?? "—"}
                />
                <MetaRow icon={Mail} label="Contact" value={job.contact} />
              </section>

              {/* Description */}
              <section>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  About the role
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
                  {job.description}
                </p>
              </section>

              {/* Qualifications */}
              {qualifications.length > 0 && (
                <section>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Qualifications
                  </h3>
                  <motion.ul
                    className="space-y-2"
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.04 } },
                    }}
                  >
                    {qualifications.map((q, i) => (
                      <motion.li
                        key={i}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          show: { opacity: 1, x: 0 },
                        }}
                        transition={{ duration: 0.2 }}
                        className="flex items-start gap-2.5 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-brand mt-0.5" />
                        <span className="leading-relaxed">{q}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </section>
              )}
            </div>

            {/* Footer CTA */}
            <div className="border-t px-6 py-4 bg-card/80 backdrop-blur-sm space-y-2">
              {deadline?.urgent && (
                <p className="text-xs font-medium text-destructive flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {deadline.label} — apply soon
                </p>
              )}
              <Button
                className="w-full bg-brand text-brand-foreground hover:bg-brand/90 font-medium"
                onClick={() => {
                  window.location.href = `mailto:${job.contact}?subject=Application for ${encodeURIComponent(job.title)}`;
                }}
              >
                Apply via email
              </Button>
              {/* Link to the full detail page — better for sharing and SEO */}
              <Link
                href={`/jobs/${job.id}`}
                className="flex items-center justify-center gap-1.5 w-full h-9 rounded-md border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Open full page
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
