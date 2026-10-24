import * as React from "react";

import { cn } from "@/lib/utils";

type SkeletonProps = React.ComponentProps<"div">;

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "motion-safe:animate-pulse rounded-lg bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      data-slot="stat-card-skeleton"
      className={cn("rounded-2xl border border-border bg-card p-5 shadow-soft", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="size-9 rounded-lg" />
      </div>
      <Skeleton className="mt-4 h-8 w-20" />
      <Skeleton className="mt-3 h-3 w-24" />
    </div>
  );
}

function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div
      data-slot="table-skeleton"
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
    >
      <div className="border-b border-border bg-muted/60 px-4 py-3">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="divide-y divide-border/70">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4 px-4 py-3.5" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                className={cn("h-4", colIndex === 0 ? "w-3/4" : "w-1/2")}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function FormSectionSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div
      data-slot="form-section-skeleton"
      className="rounded-2xl border border-border bg-card p-6 shadow-soft"
    >
      <Skeleton className="h-5 w-44" />
      <div className="mt-6 grid gap-5">
        {Array.from({ length: fields }).map((_, index) => (
          <div key={index} className="grid gap-2">
            <Skeleton className="h-3.5 w-32" />
            <Skeleton className="h-11 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export { Skeleton, StatCardSkeleton, TableSkeleton, FormSectionSkeleton };
