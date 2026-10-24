import * as React from "react";

import { AdminMobileNavButton, AdminNav, type AdminNavItem } from "@/components/admin/admin-nav";
import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  navItems?: AdminNavItem[];
  activeHref?: string;
  className?: string;
};

function AdminHeader({
  title,
  description,
  actions,
  navItems,
  activeHref,
  className,
}: AdminHeaderProps) {
  return (
    <header
      data-slot="admin-header"
      className={cn("rounded-2xl border border-border bg-card p-6 shadow-soft", className)}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-medium text-foreground">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
        ) : null}
      </div>

      {navItems && navItems.length > 0 ? (
        <div className="mt-5 flex items-center gap-3">
          <AdminMobileNavButton />
          <AdminNav items={navItems} activeHref={activeHref} className="hidden lg:flex" />
        </div>
      ) : null}
    </header>
  );
}

export { AdminHeader };
export type { AdminHeaderProps };
