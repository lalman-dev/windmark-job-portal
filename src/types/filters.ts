export interface JobFilters {
  search: string;
  location: string;
  employmentTypes: string[];
  jobCategory: string;
  remoteOnly: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  minOpenings: number | null;
  createdWithinDays: number | null;
}
