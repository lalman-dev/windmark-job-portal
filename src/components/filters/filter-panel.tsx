"use client";

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
import type { JobFilters } from "@/types/filters";

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
  // Safe updater

  function update<K extends keyof JobFilters>(key: K, value: JobFilters[K]) {
    if (filters[key] === value) return; // 🔒 prevents render loops
    onChange({ ...filters, [key]: value });
  }

  // Employment toggle

  function toggleEmployment(type: string) {
    const exists = filters.employmentTypes.includes(type);

    const next = exists
      ? filters.employmentTypes.filter((t) => t !== type)
      : [...filters.employmentTypes, type];

    // shallow compare to avoid useless updates
    if (
      next.length === filters.employmentTypes.length &&
      next.every((v, i) => v === filters.employmentTypes[i])
    ) {
      return;
    }

    update("employmentTypes", next);
  }

  return (
    <div className="space-y-6 rounded-lg border bg-card p-4">
      {/* Search */}

      <div className="space-y-2">
        <Label>Search</Label>
        <Input
          placeholder="Search jobs or companies..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Location */}

      <div className="space-y-2">
        <Label>Location</Label>
        <Select
          value={filters.location || "all"}
          onValueChange={(value) => {
            const nextValue = value === "all" ? "" : value;
            if (nextValue === filters.location) return;
            update("location", nextValue);
          }}
        >
          <SelectTrigger>
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

      <div className="space-y-3">
        <Label>Employment Type</Label>
        <div className="space-y-2">
          {employmentTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={filters.employmentTypes.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked === undefined) return;
                  toggleEmployment(type);
                }}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Category */}

      <div className="space-y-2">
        <Label>Job Category</Label>
        <Select
          value={filters.jobCategory || "all"}
          onValueChange={(value) => {
            const nextValue = value === "all" ? "" : value;
            if (nextValue === filters.jobCategory) return;
            update("jobCategory", nextValue);
          }}
        >
          <SelectTrigger>
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
        <Label>Remote Only</Label>
        <Switch
          checked={filters.remoteOnly}
          onCheckedChange={(checked) => update("remoteOnly", Boolean(checked))}
        />
      </div>

      {/* Salary Range */}

      <div className="space-y-2">
        <Label>Salary Range</Label>
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
          />
        </div>
      </div>

      {/* Minimum Openings */}
      <div className="space-y-2">
        <Label>Minimum Openings</Label>
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
        />
      </div>

      {/* Created Within */}
      <div className="space-y-2">
        <Label>Created Within</Label>
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
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any time</SelectItem>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
