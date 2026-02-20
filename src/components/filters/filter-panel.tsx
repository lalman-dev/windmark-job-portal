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
  function update<K extends keyof JobFilters>(key: K, value: JobFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  function toggleEmployment(type: string) {
    const exists = filters.employmentTypes.includes(type);
    const next = exists
      ? filters.employmentTypes.filter((t) => t !== type)
      : [...filters.employmentTypes, type];

    update("employmentTypes", next);
  }

  return (
    <div className="space-y-6 rounded-lg border bg-card/80 p-4">
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
          onValueChange={(v) => update("location", v === "all" ? "" : v)}
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

      {/* Employment type */}
      <div className="space-y-3">
        <Label>Employment Type</Label>
        <div className="space-y-2">
          {employmentTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={filters.employmentTypes.includes(type)}
                onCheckedChange={() => toggleEmployment(type)}
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
          onValueChange={(v) => update("jobCategory", v === "all" ? "" : v)}
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

      {/* Remote */}
      <div className="flex items-center justify-between">
        <Label>Remote Only</Label>
        <Switch
          checked={filters.remoteOnly}
          onCheckedChange={(v) => update("remoteOnly", Boolean(v))}
        />
      </div>

      {/* 💰 Salary Range */}
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
      {/* 👥 Minimum Openings */}
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
      {/* 📅 Created Within */}
      <div className="space-y-2">
        <Label>Created Within</Label>
        <Select
          value={
            filters.createdWithinDays
              ? String(filters.createdWithinDays)
              : "all"
          }
          onValueChange={(v) =>
            update("createdWithinDays", v === "all" ? null : Number(v))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Any time" />
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
