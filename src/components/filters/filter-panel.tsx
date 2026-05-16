"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { JobFilters } from "@/types/filters";

const DEFAULT_FILTERS: JobFilters = {
  search: "",
  location: "",
  employmentTypes: [],
  jobCategory: "",
  remoteOnly: false,
  salaryMin: null,
  salaryMax: null,
  minOpenings: null,
  createdWithinDays: null,
  sortBy: "newest",
};

interface FilterPanelProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  searchInput: string;
  onSearchChange: (value: string) => void;
  locations: string[];
  categories: string[];
  employmentTypes: string[];
}

export function FilterPanel({
  filters,
  onChange,
  searchInput,
  onSearchChange,
  locations,
  categories,
  employmentTypes,
}: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function update<K extends keyof JobFilters>(key: K, value: JobFilters[K]) {
    if (filters[key] === value) return;
    onChange({ ...filters, [key]: value });
  }

  function toggleEmployment(type: string) {
    const exists = filters.employmentTypes.includes(type);
    const next = exists
      ? filters.employmentTypes.filter((t) => t !== type)
      : [...filters.employmentTypes, type];

    if (
      next.length === filters.employmentTypes.length &&
      next.every((v, i) => v === filters.employmentTypes[i])
    ) {
      return;
    }
    update("employmentTypes", next);
  }

  const hasActiveFilters =
    filters.location ||
    filters.employmentTypes.length > 0 ||
    filters.jobCategory ||
    filters.remoteOnly ||
    filters.salaryMin !== null ||
    filters.salaryMax !== null ||
    filters.minOpenings !== null ||
    filters.createdWithinDays !== null;

  const panelContent = (
    <div className="space-y-5">
      {/* Search */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Search
        </Label>
        <Input
          placeholder="Title, company, or keyword…"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 text-sm"
        />
      </div>

      {/* Location */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Location
        </Label>
        <Select
          value={filters.location || "all"}
          onValueChange={(value) => {
            const nextValue = value === "all" ? "" : value;
            if (nextValue === filters.location) return;
            update("location", nextValue);
          }}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="All locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Employment Type */}
      {employmentTypes.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Employment type
          </Label>
          <div className="space-y-2">
            {employmentTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2.5 text-sm cursor-pointer group"
              >
                <Checkbox
                  checked={filters.employmentTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked === undefined) return;
                    toggleEmployment(type);
                  }}
                  className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                />
                <span className="group-hover:text-foreground transition-colors text-muted-foreground">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Category */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Category
        </Label>
        <Select
          value={filters.jobCategory || "all"}
          onValueChange={(value) => {
            const nextValue = value === "all" ? "" : value;
            if (nextValue === filters.jobCategory) return;
            update("jobCategory", nextValue);
          }}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Remote Only */}
      <div className="flex items-center justify-between">
        <Label className="text-sm cursor-pointer">Remote only</Label>
        <Switch
          checked={filters.remoteOnly}
          onCheckedChange={(checked) => update("remoteOnly", Boolean(checked))}
          className="data-[state=checked]:bg-brand"
        />
      </div>

      {/* Salary Range */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Salary range (₹)
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={filters.salaryMin ?? ""}
            onChange={(e) =>
              update(
                "salaryMin",
                e.target.value ? Number(e.target.value) : null,
              )
            }
            className="h-9 text-sm"
          />
          <Input
            type="number"
            placeholder="Max"
            value={filters.salaryMax ?? ""}
            onChange={(e) =>
              update(
                "salaryMax",
                e.target.value ? Number(e.target.value) : null,
              )
            }
            className="h-9 text-sm"
          />
        </div>
      </div>

      {/* Min Openings */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Min. openings
        </Label>
        <Input
          type="number"
          placeholder="e.g. 3"
          value={filters.minOpenings ?? ""}
          onChange={(e) =>
            update(
              "minOpenings",
              e.target.value ? Number(e.target.value) : null,
            )
          }
          className="h-9 text-sm"
        />
      </div>

      {/* Created Within */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Posted within
        </Label>
        <Select
          value={
            filters.createdWithinDays === null
              ? "all"
              : String(filters.createdWithinDays)
          }
          onValueChange={(value) => {
            const nextValue = value === "all" ? null : Number(value);
            if (nextValue === filters.createdWithinDays) return;
            update("createdWithinDays", nextValue);
          }}
        >
          <SelectTrigger className="h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any time</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset button — visible when filters are active */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() =>
                onChange({
                  ...DEFAULT_FILTERS,
                  sortBy: filters.sortBy,
                })
              }
            >
              Reset filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Desktop — sticky sidebar */}
      <aside className="hidden lg:block sticky top-6 self-start rounded-xl border bg-card p-5 space-y-0">
        <div className="flex items-center gap-2 mb-5">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
              {
                [
                  filters.location,
                  ...filters.employmentTypes,
                  filters.jobCategory,
                  filters.remoteOnly ? "r" : null,
                  filters.salaryMin,
                  filters.salaryMax,
                  filters.minOpenings,
                  filters.createdWithinDays,
                ].filter(Boolean).length
              }
            </span>
          )}
        </div>
        {panelContent}
      </aside>

      {/* Mobile — collapsible */}
      <div className="lg:hidden rounded-xl border bg-card overflow-hidden">
        <button
          className="flex w-full items-center justify-between px-5 py-4 text-sm font-medium"
          onClick={() => setMobileOpen((p) => !p)}
          aria-expanded={mobileOpen}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            Filters
            {hasActiveFilters && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                •
              </span>
            )}
          </div>
          <motion.div
            animate={{ rotate: mobileOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border-t px-5 py-5">{panelContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
