import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-eyebrow uppercase text-accent",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gold-500" />
          {eyebrow}
        </p>
      ) : null}
      <Heading className="mt-4 font-display text-heading-2 text-balance text-foreground">
        {title}
      </Heading>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export { SectionHeading };
export type { SectionHeadingProps };
