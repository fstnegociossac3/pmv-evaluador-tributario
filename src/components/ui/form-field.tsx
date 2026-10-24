import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function fieldIds(id: string) {
  return {
    hintId: `${id}-hint`,
    errorId: `${id}-error`,
    messageId: `${id}-message`,
  } as const;
}

type FormFieldProps = {
  id: string;
  label: React.ReactNode;
  hint?: React.ReactNode;
  error?: string | null;
  required?: boolean;
  children: (ids: ReturnType<typeof fieldIds>) => React.ReactNode;
  className?: string;
};

function FormField({
  id,
  label,
  hint,
  error,
  required = false,
  children,
  className,
}: FormFieldProps) {
  const ids = fieldIds(id);

  return (
    <div data-slot="form-field" className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-destructive">
            *
          </span>
        ) : null}
      </Label>
      {hint ? (
        <p id={ids.hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {children(ids)}
      {error ? (
        <p id={ids.errorId} className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { FormField, fieldIds };
export type { FormFieldProps };
