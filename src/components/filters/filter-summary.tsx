"use client";

import { useQueryStates } from "nuqs";
import { filterParsers } from "@/lib/search-params";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function FilterSummary() {
  const [filters, setFilters] = useQueryStates(filterParsers, {
    shallow: true,
  });

  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  if (filters.search) {
    chips.push({
      key: "search",
      label: `"${filters.search}"`,
      onRemove: () => setFilters({ search: "" }),
    });
  }

  if (filters.location) {
    chips.push({
      key: "location",
      label: filters.location,
      onRemove: () => setFilters({ location: "" }),
    });
  }

  filters.employmentTypes.forEach((type) => {
    chips.push({
      key: `emp-${type}`,
      label: type,
      onRemove: () =>
        setFilters({
          employmentTypes: filters.employmentTypes.filter((t) => t !== type),
        }),
    });
  });

  if (filters.jobCategory) {
    chips.push({
      key: "category",
      label: filters.jobCategory,
      onRemove: () => setFilters({ jobCategory: "" }),
    });
  }

  if (filters.remoteOnly) {
    chips.push({
      key: "remote",
      label: "Remote only",
      onRemove: () => setFilters({ remoteOnly: false }),
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
      key: "salary",
      label: `Salary: ${label}`,
      onRemove: () => setFilters({ salaryMin: null, salaryMax: null }),
    });
  }

  if (filters.minOpenings !== null) {
    chips.push({
      key: "openings",
      label: `Min ${filters.minOpenings} openings`,
      onRemove: () => setFilters({ minOpenings: null }),
    });
  }

  if (filters.createdWithinDays !== null) {
    chips.push({
      key: "days",
      label: `Last ${filters.createdWithinDays} days`,
      onRemove: () => setFilters({ createdWithinDays: null }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      <AnimatePresence initial={false}>
        {chips.map((chip) => (
          <motion.button
            key={chip.key}
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
        onClick={() =>
          setFilters({
            search: "",
            location: "",
            employmentTypes: [],
            jobCategory: "",
            remoteOnly: false,
            salaryMin: null,
            salaryMax: null,
            minOpenings: null,
            createdWithinDays: null,
          })
        }
      >
        Clear all
      </Button>
    </div>
  );
}
