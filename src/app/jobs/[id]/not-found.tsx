import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function JobNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-6">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-6 w-6 text-muted-foreground" />
      </div>

      <h2 className="text-base font-semibold">Job not found</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
        This listing may have expired or the link might be incorrect.
      </p>

      <Link href="/jobs">
        <Button variant="outline" size="sm" className="mt-6">
          Back to listings
        </Button>
      </Link>
    </main>
  );
}
