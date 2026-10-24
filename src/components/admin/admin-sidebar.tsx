"use client";

import * as React from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { AdminBrandMark, type AdminNavItem } from "@/components/admin/admin-nav";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  items: AdminNavItem[];
  activeHref?: string;
  className?: string;
};

function AdminSidebar({ items, activeHref, className }: AdminSidebarProps) {
  const [expanded, setExpanded] = React.useState(true);

  return (
    <aside
      data-slot="admin-sidebar"
      data-expanded={expanded}
      className={cn(
        "sticky top-24 hidden h-fit shrink-0 flex-col rounded-2xl border border-border bg-card shadow-soft transition-[width] duration-200 lg:flex",
        expanded ? "w-64" : "w-[4.75rem]",
        className,
      )}
      aria-label="Panel lateral administrativo"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border p-4">
        {expanded ? <AdminBrandMark /> : null}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Contraer menú" : "Expandir menú"}
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            !expanded && "mx-auto",
          )}
        >
          {expanded ? (
            <PanelLeftClose aria-hidden className="size-4.5" />
          ) : (
            <PanelLeftOpen aria-hidden className="size-4.5" />
          )}
        </button>
      </div>

      <nav aria-label="Secciones" className="grid gap-1 p-3">
        {items.map((item) => {
          const isActive = item.href === activeHref;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={!expanded ? item.label : undefined}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                expanded ? "justify-start" : "justify-center",
                isActive
                  ? "bg-accent/10 text-teal-700"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon aria-hidden className="size-4 shrink-0" />
              {expanded ? <span className="truncate">{item.label}</span> : null}
              {!expanded ? <span className="sr-only">{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export { AdminSidebar };
export type { AdminSidebarProps };
