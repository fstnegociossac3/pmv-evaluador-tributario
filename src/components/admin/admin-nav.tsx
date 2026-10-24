import * as React from "react";
import Link from "next/link";
import { PanelLeft } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type AdminNavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

type AdminNavProps = {
  items: AdminNavItem[];
  activeHref?: string;
  className?: string;
};

function AdminNav({ items, activeHref, className }: AdminNavProps) {
  return (
    <nav
      aria-label="Navegación administrativa"
      data-slot="admin-nav"
      className={cn(
        "flex items-center gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5 shadow-soft",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = item.href === activeHref;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <item.icon aria-hidden className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

type AdminMobileNavButtonProps = React.ComponentProps<"button">;

function AdminMobileNavButton({
  className,
  ...props
}: AdminMobileNavButtonProps) {
  return (
    <button
      type="button"
      data-slot="admin-mobile-nav-button"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-soft transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden",
        className,
      )}
      {...props}
    >
      <PanelLeft aria-hidden className="size-5" />
      <span className="sr-only">Abrir menú de secciones</span>
    </button>
  );
}

function AdminBrandMark({ className }: { className?: string }) {
  return (
    <span
      data-slot="admin-brand-mark"
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold text-foreground",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <span aria-hidden className="font-mono text-[0.625rem] font-bold">
          PMV
        </span>
      </span>
      {siteConfig.shortName}
    </span>
  );
}

export { AdminNav, AdminMobileNavButton, AdminBrandMark };
export type { AdminNavItem, AdminNavProps };
