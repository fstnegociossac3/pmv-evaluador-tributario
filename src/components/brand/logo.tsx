import { cn } from "@/lib/utils";

interface LogoProps {
  inverted?: boolean;
  className?: string;
}

function Logo({ inverted = false, className }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-3", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 44 44"
        className="size-10 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="44"
          height="44"
          rx="13"
          fill={inverted ? "#F5F7FA" : "#14263D"}
        />
        <path
          d="M11.5 30.5V14h4.9L22 22.7 27.6 14h4.9v16.5h-4.4v-8.9L22 30.2l-6.1-8.6v8.9h-4.4Z"
          fill={inverted ? "#14263D" : "#F5F7FA"}
        />
        <circle cx="33.5" cy="11.5" r="3.25" fill="#D6A34D" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.35rem] font-semibold tracking-tight",
            inverted ? "text-white" : "text-foreground",
          )}
        >
          PMV
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.55rem] font-bold uppercase tracking-[0.24em]",
            inverted ? "text-white/55" : "text-muted-foreground",
          )}
        >
          Evaluador tributario
        </span>
      </span>
    </span>
  );
}

export { Logo };
export type { LogoProps };
