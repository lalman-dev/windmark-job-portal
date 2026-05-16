"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="h-9 px-3 gap-1.5"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Prev
      </Button>

      <span className="rounded-md border bg-card px-4 py-2 text-xs text-muted-foreground font-medium tabular-nums">
        {page} / {totalPages}
      </span>

      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="h-9 px-3 gap-1.5"
      >
        Next
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
