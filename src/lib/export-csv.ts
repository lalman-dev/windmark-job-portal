import type { Job } from "@/types/job";

export function exportJobsToCSV(jobs: Job[]) {
  if (!jobs.length) return;

  const headers = [
    "Title",
    "Company",
    "Location",
    "Salary From",
    "Salary To",
    "Employment Type",
    "Job Category",
    "Remote",
    "Openings",
    "Created At",
  ];

  const rows = jobs.map((job) => [
    job.title,
    job.company,
    job.location,
    job.salary_from,
    job.salary_to,
    job.employment_type,
    job.job_category,
    job.is_remote_work === 1 ? "Yes" : "No",
    job.number_of_opening,
    job.created_at,
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) =>
        row
          .map((field) =>
            `"${String(field).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute(
    "download",
    `filtered_jobs_${new Date().toISOString()}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}