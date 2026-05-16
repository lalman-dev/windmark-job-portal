"use client";

import { motion } from "framer-motion";
import type { Job } from "@/types/job";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { getEmploymentBadgeClass } from "@/lib/badge-utils";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Briefcase,
  Mail,
  Calendar,
  CheckCircle2,
  Wifi,
  IndianRupee,
  Tag,
  ExternalLink,
} from "lucide-react";

interface Props {
  job: Job;
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
  const diffDays = Math.ceil(
    (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
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

function MetaCard({
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
    <div className="flex items-start gap-3 rounded-xl border bg-card p-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {label}
        </p>
        <p
          className={`mt-0.5 text-sm font-semibold wrap-break-words ${accent ? "text-brand" : "text-foreground"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.35, ease: "easeOut" as const };

export function JobDetailView({ job }: Props) {
  const qualifications = parseQualifications(job.qualifications);
  const deadline = formatDeadline(job.application_deadline);
  const badgeClass = getEmploymentBadgeClass(job.employment_type);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="container mx-auto max-w-4xl flex items-center justify-between py-3.5 px-6">
          <Link
            href="/jobs"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All jobs
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          {/* Hero section */}
          <motion.div variants={itemVariants} transition={itemTransition}>
            <div className="flex flex-wrap gap-1.5 mb-4">
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

            <h1 className="text-3xl font-bold tracking-tight leading-snug">
              {job.title}
            </h1>

            <div className="mt-2 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="text-base">
                {job.company} · {job.location}
              </span>
            </div>

            {deadline.urgent && (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-destructive">
                <Clock className="h-3.5 w-3.5" />
                {deadline.label} — apply soon
              </p>
            )}
          </motion.div>

          {/* Meta grid */}
          <motion.div
            variants={itemVariants}
            transition={itemTransition}
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            <MetaCard
              icon={IndianRupee}
              label="Salary"
              value={formatSalary(job.salary_from, job.salary_to)}
              accent
            />
            <MetaCard
              icon={Users}
              label="Openings"
              value={`${job.number_of_opening} position${job.number_of_opening !== 1 ? "s" : ""}`}
            />
            <MetaCard icon={Clock} label="Deadline" value={deadline.label} />
            <MetaCard
              icon={Briefcase}
              label="Type"
              value={job.employment_type}
            />
            <MetaCard icon={Tag} label="Category" value={job.job_category} />
            <MetaCard
              icon={Calendar}
              label="Posted"
              value={formatDate(job.created_at)}
            />
          </motion.div>

          {/* Description */}
          <motion.section variants={itemVariants} transition={itemTransition}>
            <h2 className="text-lg font-semibold mb-3">About the role</h2>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </motion.section>

          {/* Qualifications */}
          {qualifications.length > 0 && (
            <motion.section variants={itemVariants} transition={itemTransition}>
              <h2 className="text-lg font-semibold mb-4">Qualifications</h2>
              <motion.ul
                className="space-y-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {qualifications.map((q, i) => (
                  <motion.li
                    key={i}
                    variants={itemVariants}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    className="flex items-start gap-3 text-foreground/80"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand mt-0.5" />
                    <span className="leading-relaxed">{q}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.section>
          )}

          {/* Contact & CTA */}
          <motion.section
            variants={itemVariants}
            transition={itemTransition}
            className="rounded-xl border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0">
                <Mail className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                  Contact
                </p>
                <p className="text-sm font-medium mt-0.5">{job.contact}</p>
              </div>
            </div>

            <Button
              className="bg-brand text-brand-foreground hover:bg-brand/90 gap-2 font-medium shrink-0"
              onClick={() => {
                window.location.href = `mailto:${job.contact}?subject=Application for ${encodeURIComponent(job.title)}`;
              }}
            >
              <ExternalLink className="h-4 w-4" />
              Apply via email
            </Button>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
