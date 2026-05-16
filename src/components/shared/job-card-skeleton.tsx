import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 space-y-2.5">
        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-4 w-4 shrink-0 rounded" />
        </div>
        {/* Company · location */}
        <Skeleton className="h-4 w-3/5" />
      </CardHeader>

      <CardContent className="space-y-3.5 pt-0">
        {/* Description lines */}
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>

        {/* Badges */}
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between border-t border-border/60 pt-2">
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-3">
            <Skeleton className="h-3.5 w-6" />
            <Skeleton className="h-3.5 w-14" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
