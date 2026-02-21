"use client";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong.",
  description = "We couldn’t load the jobs. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="py-20 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
}
