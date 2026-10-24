import * as React from "react";

import { cn } from "@/lib/utils";

type ErrorSummaryProps = {
  title?: string;
  errors: { fieldId: string; message: string }[];
  className?: string;
};

function ErrorSummary({
  title = "Revisa los campos marcados",
  errors,
  className,
}: ErrorSummaryProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div
      role="alert"
      data-slot="error-summary"
      className={cn(
        "rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3",
        className,
      )}
    >
      <p className="text-sm font-semibold text-destructive">{title}</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-destructive">
        {errors.map((error) => (
          <li key={error.fieldId}>
            <a href={`#${error.fieldId}`} className="underline underline-offset-2">
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { ErrorSummary };
export type { ErrorSummaryProps };
