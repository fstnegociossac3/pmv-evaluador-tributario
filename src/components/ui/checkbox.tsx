import * as React from "react";

import { cn } from "@/lib/utils";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type"> & {
  label: React.ReactNode;
  description?: React.ReactNode;
};

function Checkbox({
  className,
  label,
  description,
  id,
  ...props
}: CheckboxProps) {
  return (
    <div data-slot="checkbox" className={cn("grid gap-1.5", className)}>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 text-sm leading-snug text-foreground"
      >
        <input
          id={id}
          type="checkbox"
          className="brand-checkbox mt-0.5"
          {...props}
        />
        <span>{label}</span>
      </label>
      {description ? (
        <p className="pl-[1.75rem] text-xs text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { Checkbox };
export type { CheckboxProps };
