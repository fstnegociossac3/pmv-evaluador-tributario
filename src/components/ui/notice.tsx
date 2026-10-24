import * as React from "react";
import { CircleCheck, Info, ShieldCheck, TriangleAlert } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const noticeVariants = cva(
  "flex gap-3 rounded-xl border p-4 text-sm leading-relaxed",
  {
    variants: {
      tone: {
        info: "border-accent/20 bg-accent/5 text-foreground",
        warning: "border-gold-500/35 bg-gold-100/60 text-foreground",
        success: "border-success/20 bg-success/5 text-foreground",
        confidential: "border-night-900/10 bg-muted text-foreground",
      },
    },
    defaultVariants: {
      tone: "info",
    },
  },
);

const toneIcons = {
  info: Info,
  warning: TriangleAlert,
  success: CircleCheck,
  confidential: ShieldCheck,
} as const;

type NoticeProps = React.ComponentProps<"div"> &
  VariantProps<typeof noticeVariants> & {
    title?: string;
  };

function Notice({
  className,
  tone = "info",
  title,
  children,
  ...props
}: NoticeProps) {
  const Icon = toneIcons[tone ?? "info"];

  return (
    <div
      data-slot="notice"
      className={cn(noticeVariants({ tone }), className)}
      {...props}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "mt-0.5 size-4 shrink-0",
          tone === "warning" ? "text-gold-600" : "text-accent",
        )}
      />
      <div className="space-y-1">
        {title ? <p className="font-semibold">{title}</p> : null}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export { Notice, noticeVariants };
export type { NoticeProps };
