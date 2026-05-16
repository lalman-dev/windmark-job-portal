import {
  parseAsString,
  parseAsBoolean,
  parseAsInteger,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs/server";
import type { SortOption } from "@/types/filters";

const SORT_OPTIONS = [
  "newest",
  "oldest",
  "salary_high",
  "salary_low",
  "openings",
] as const satisfies readonly SortOption[];

export const filterParsers = {
  search: parseAsString.withDefault(""),
  location: parseAsString.withDefault(""),
  employmentTypes: parseAsArrayOf(parseAsString).withDefault([]),
  jobCategory: parseAsString.withDefault(""),
  remoteOnly: parseAsBoolean.withDefault(false),
  salaryMin: parseAsInteger,
  salaryMax: parseAsInteger,
  minOpenings: parseAsInteger,
  createdWithinDays: parseAsInteger,
  sortBy: parseAsStringLiteral(SORT_OPTIONS).withDefault("newest"),
};
