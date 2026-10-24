import * as React from "react";

import { cn } from "@/lib/utils";

type StatusTone = "neutral" | "info" | "success" | "warning" | "danger";

type StatusIndicatorProps = {
  label: string;
  tone?: StatusTone;
  className?: string;
};

const toneStyles: Record<StatusTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-accent/10 text-teal-700",
  success: "bg-success/10 text-success",
  warning: "bg-gold-100 text-warning",
  danger: "bg-destructive/10 text-destructive",
} as const;

function StatusIndicator({ label, tone = "neutral", className }: StatusIndicatorProps) {
  return (
    <span
      data-slot="status-indicator"
      data-tone={tone}
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wide",
        toneStyles[tone],
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

export { StatusIndicator, toneStyles };
export type { StatusIndicatorProps, StatusTone };
