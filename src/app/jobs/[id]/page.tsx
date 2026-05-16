import { fetchJobById } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JobDetailView } from "./job-detail-view";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await fetchJobById(id);

  if (!job) {
    return { title: "Job not found — Windmark" };
  }

  return {
    title: `${job.title} at ${job.company} — Windmark`,
    description: job.description.slice(0, 160),
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description.slice(0, 160),
      type: "website",
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await fetchJobById(id);

  if (!job) notFound();

  return <JobDetailView job={job} />;
}
