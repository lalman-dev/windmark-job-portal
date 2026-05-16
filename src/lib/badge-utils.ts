export function getEmploymentBadgeClass(type: string): string {
  const t = type.toLowerCase().replace(/[^a-z]/g, "");
  if (t.includes("fulltime") || t === "full") return "badge-full-time";
  if (t.includes("parttime") || t === "part") return "badge-part-time";
  if (t.includes("contract") || t.includes("freelance"))
    return "badge-contract";
  if (t.includes("intern")) return "badge-internship";
  return "badge-default";
}
