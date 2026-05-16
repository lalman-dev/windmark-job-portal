"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function JobsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[JobsError]", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-6">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>

      <h2 className="text-base font-semibold">Failed to load jobs</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
        Something went wrong while fetching the listings. This is usually a
        network issue — try again.
      </p>

      {error.digest && (
        <p className="mt-2 font-mono text-xs text-muted-foreground/60">
          {error.digest}
        </p>
      )}

      <Button variant="outline" size="sm" className="mt-6" onClick={reset}>
        Try again
      </Button>
    </main>
  );
}
