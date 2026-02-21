"use client";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClear?: () => void;
}

export function EmptyState({
  title = "No jobs match your filters.",
  description = "Try adjusting your search or clearing filters.",
  onClear,
}: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      {onClear && (
        <Button variant="outline" className="mt-4" onClick={onClear}>
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
