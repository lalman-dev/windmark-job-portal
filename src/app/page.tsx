"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Download,
  ArrowRight,
  Layers,
} from "lucide-react";

const STATS = [
  { value: "1,200+", label: "Active listings" },
  { value: "80+", label: "Companies" },
  { value: "12", label: "Job categories" },
  { value: "CSV & PDF", label: "Export formats" },
];

const FEATURES = [
  {
    icon: Search,
    title: "Smart search & filters",
    description:
      "Debounced search across title, company, and description. Stack filters for salary range, remote work, openings, and recency.",
  },
  {
    icon: Layers,
    title: "Dual pagination modes",
    description:
      "Switch between traditional pagination and Intersection Observer–based infinite scroll. State resets cleanly on filter changes.",
  },
  {
    icon: SlidersHorizontal,
    title: "Multi-axis sorting",
    description:
      "Sort by newest, oldest, salary high-to-low, salary low-to-high, or most openings. Sorting composes with all active filters.",
  },
  {
    icon: Download,
    title: "Export filtered results",
    description:
      "Export your current filtered and sorted dataset as a structured CSV or a formatted PDF with applied filter metadata.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.4, ease: "easeOut" as const };

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Header */}
      <header className="container mx-auto flex max-w-7xl items-center justify-between py-5 px-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-brand flex items-center justify-center">
            <span className="text-xs font-bold text-brand-foreground leading-none">
              W
            </span>
          </div>
          <span className="text-sm font-semibold tracking-tight">Windmark</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <section className="container mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-muted px-3 py-1 text-xs font-medium text-brand-foreground dark:text-brand mb-6">
            Frontend assignment → Portfolio project
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground leading-[1.1]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.07, ease: "easeOut" }}
        >
          Find work that fits
          <br />
          <span className="text-brand">your ambitions.</span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-muted-foreground text-base sm:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: "easeOut" }}
        >
          Filter, sort, and export job listings with precision. Built on
          Next.js, TanStack Query, and Framer Motion — with real pagination,
          infinite scroll, and CSV/PDF export baked in.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.21, ease: "easeOut" }}
        >
          <Link href="/jobs">
            <Button
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90 gap-2 font-medium"
            >
              Browse jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 w-full max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              transition={itemTransition}
              className="flex flex-col items-center gap-1 rounded-xl border bg-card px-4 py-4"
            >
              <span className="text-xl font-bold text-brand">{stat.value}</span>
              <span className="text-xs text-muted-foreground text-center">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features */}
      <section className="container mx-auto max-w-5xl px-6 pb-20">
        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                transition={itemTransition}
                className="group rounded-xl border bg-card p-5 transition-colors hover:border-brand/40"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-muted">
                  <Icon className="h-4 w-4 text-brand" />
                </div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-5 text-center text-xs text-muted-foreground">
        Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
      </footer>
    </main>
  );
}
