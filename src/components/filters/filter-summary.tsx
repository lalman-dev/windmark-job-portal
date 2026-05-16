"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import type { JobFilters } from "@/types/filters";

interface Props {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export function FilterSummary({ filters, onChange }: Props) {
  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.search) {
    chips.push({
      label: `"${filters.search}"`,
      onRemove: () => onChange({ ...filters, search: "" }),
    });
  }

  if (filters.location) {
    chips.push({
      label: filters.location,
      onRemove: () => onChange({ ...filters, location: "" }),
    });
  }

  filters.employmentTypes.forEach((type) => {
    chips.push({
      label: type,
      onRemove: () =>
        onChange({
          ...filters,
          employmentTypes: filters.employmentTypes.filter((t) => t !== type),
        }),
    });
  });

  if (filters.jobCategory) {
    chips.push({
      label: filters.jobCategory,
      onRemove: () => onChange({ ...filters, jobCategory: "" }),
    });
  }

  if (filters.remoteOnly) {
    chips.push({
      label: "Remote only",
      onRemove: () => onChange({ ...filters, remoteOnly: false }),
    });
  }

  if (filters.salaryMin !== null || filters.salaryMax !== null) {
    const label = [
      filters.salaryMin !== null
        ? `₹${filters.salaryMin.toLocaleString()}`
        : "Any",
      filters.salaryMax !== null
        ? `₹${filters.salaryMax.toLocaleString()}`
        : "Any",
    ].join(" – ");

    chips.push({
      label: `Salary: ${label}`,
      onRemove: () =>
        onChange({ ...filters, salaryMin: null, salaryMax: null }),
    });
  }

  if (filters.minOpenings !== null) {
    chips.push({
      label: `Min ${filters.minOpenings} openings`,
      onRemove: () => onChange({ ...filters, minOpenings: null }),
    });
  }

  if (filters.createdWithinDays !== null) {
    chips.push({
      label: `Last ${filters.createdWithinDays} days`,
      onRemove: () => onChange({ ...filters, createdWithinDays: null }),
    });
  }

  if (chips.length === 0) return null;

  function clearAll() {
    onChange({
      search: "",
      location: "",
      employmentTypes: [],
      jobCategory: "",
      remoteOnly: false,
      salaryMin: null,
      salaryMax: null,
      minOpenings: null,
      createdWithinDays: null,
      sortBy: filters.sortBy,
    });
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      <AnimatePresence initial={false}>
        {chips.map((chip) => (
          <motion.button
            key={chip.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            onClick={chip.onRemove}
            className="inline-flex items-center gap-1.5 rounded-md border border-brand/30 bg-brand-muted px-2.5 py-1 text-xs font-medium text-brand-foreground dark:text-brand hover:border-brand/60 transition-colors"
          >
            {chip.label}
            <X className="h-3 w-3 opacity-60" />
          </motion.button>
        ))}
      </AnimatePresence>

      <Button
        variant="ghost"
        size="sm"
        className="h-7 text-xs text-muted-foreground hover:text-foreground"
        onClick={clearAll}
      >
        Clear all
      </Button>
    </div>
  );
}
