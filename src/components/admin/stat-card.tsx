import * as React from "react";
import { Minus, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type StatTrend = "up" | "down" | "flat";

type StatCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  hint?: string;
  trend?: StatTrend;
  trendLabel?: string;
  className?: string;
};

const trendConfig = {
  up: { icon: TrendingUp, className: "text-success" },
  down: { icon: TrendingDown, className: "text-destructive" },
  flat: { icon: Minus, className: "text-muted-foreground" },
} as const;

function StatCard({
  label,
  value,
  icon: Icon,
  hint,
  trend,
  trendLabel,
  className,
}: StatCardProps) {
  const trendEntry = trend ? trendConfig[trend] : null;
  const TrendIcon = trendEntry?.icon;

  return (
    <article
      data-slot="stat-card"
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-soft",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
          <Icon aria-hidden className="size-4.5" />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-medium text-foreground">
        {value}
      </p>
      {(hint || (TrendIcon && trendEntry)) ? (
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          {TrendIcon && trendEntry ? (
            <span className={cn("inline-flex items-center gap-1 font-semibold", trendEntry.className)}>
              <TrendIcon aria-hidden className="size-3.5" />
              {trendLabel ?? null}
            </span>
          ) : null}
          {hint ? <span>{hint}</span> : null}
        </div>
      ) : null}
    </article>
  );
}

export { StatCard };
export type { StatCardProps, StatTrend };
