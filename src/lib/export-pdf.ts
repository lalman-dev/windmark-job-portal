import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Job } from "@/types/job";
import type { JobFilters } from "@/types/filters";

export function exportJobsToPDF(jobs: Job[], filters: JobFilters) {
  if (!jobs.length) return;

  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Filtered Job Results", 14, 20);

  // Applied Filters Section
  doc.setFontSize(10);
  const filterEntries = Object.entries(filters)
    .filter(([_, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== "" && value !== null && value !== false;
    })
    .map(([key, value]) => {
      if (Array.isArray(value)) return `${key}: ${value.join(", ")}`;
      return `${key}: ${value}`;
    });

  let y = 28;

  if (filterEntries.length > 0) {
    doc.text("Applied Filters:", 14, y);
    y += 6;

    filterEntries.forEach((entry) => {
      doc.text(`• ${entry}`, 16, y);
      y += 5;
    });

    y += 4;
  }

  // Table Data
  const tableData = jobs.map((job) => [
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

  autoTable(doc, {
    startY: y,
    head: [
      [
        "Title",
        "Company",
        "Location",
        "Salary From",
        "Salary To",
        "Type",
        "Category",
        "Remote",
        "Openings",
        "Created At",
      ],
    ],
    body: tableData,
    styles: { fontSize: 7 },
    headStyles: { fillColor: [40, 40, 40] },
  });

  // Footer
  const finalY = (doc as any).lastAutoTable.finalY || 20;

  doc.setFontSize(9);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, finalY + 10);
  doc.text(`Total Results: ${jobs.length}`, 14, finalY + 16);
  doc.save(`filtered_jobs_${new Date().toISOString()}.pdf`);
}
