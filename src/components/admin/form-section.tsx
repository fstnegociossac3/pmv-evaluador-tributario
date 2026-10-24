import * as React from "react";

import { cn } from "@/lib/utils";

type FormSectionProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

function FormSection({ title, description, actions, children, className }: FormSectionProps) {
  return (
    <section
      data-slot="form-section"
      className={cn("rounded-2xl border border-border bg-card p-6 shadow-soft", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="font-display text-lg font-medium text-foreground">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </div>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

export { FormSection };
export type { FormSectionProps };
