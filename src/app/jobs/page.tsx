import { Suspense } from "react";
import JobsPageContent from "./JobsPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading jobs...</div>}>
      <JobsPageContent />
    </Suspense>
  );
}
