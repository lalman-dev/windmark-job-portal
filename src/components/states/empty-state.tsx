"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onClear?: () => void;
}

export function EmptyState({
  title = "No jobs match your filters",
  description = "Try adjusting your search terms or clearing some filters to see more results.",
  onClear,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-6 w-6 text-muted-foreground" />
      </div>

      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {onClear && (
        <Button variant="outline" size="sm" className="mt-5" onClick={onClear}>
          Clear all filters
        </Button>
      )}
    </motion.div>
  );
}
