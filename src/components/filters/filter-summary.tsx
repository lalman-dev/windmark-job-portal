"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobFilters } from "@/types/filters";

interface Props {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
}

export function FilterSummary({ filters, onChange }: Props) {
  const chips: { label: string; onRemove: () => void }[] = [];

  // Search
  if (filters.search) {
    chips.push({
      label: `Search: ${filters.search}`,
      onRemove: () => onChange({ ...filters, search: "" }),
    });
  }

  // Location
  if (filters.location) {
    chips.push({
      label: filters.location,
      onRemove: () => onChange({ ...filters, location: "" }),
    });
  }

  // Employment types
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

  // Category
  if (filters.jobCategory) {
    chips.push({
      label: filters.jobCategory,
      onRemove: () => onChange({ ...filters, jobCategory: "" }),
    });
  }

  // Remote
  if (filters.remoteOnly) {
    chips.push({
      label: "Remote Only",
      onRemove: () => onChange({ ...filters, remoteOnly: false }),
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
    });
  }

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {chips.map((chip, i) => (
        <Badge
          key={i}
          variant="secondary"
          className="cursor-pointer"
          onClick={chip.onRemove}
        >
          {chip.label} ✕
        </Badge>
      ))}

      <Button variant="ghost" size="sm" className="h-7" onClick={clearAll}>
        Clear all
      </Button>
    </div>
  );
}
