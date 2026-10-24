import * as React from "react";

import { EmptyState } from "@/components/admin/empty-state";
import { cn } from "@/lib/utils";

type DataTableColumn<T> = {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  caption?: string;
  emptyMessage?: string;
  className?: string;
};

function DataTable<T>({
  columns,
  rows,
  rowKey,
  caption,
  emptyMessage = "No hay registros por mostrar.",
  className,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <EmptyState title="Sin registros" description={emptyMessage} className={className} />;
  }

  return (
    <div
      data-slot="data-table"
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          {caption ? (
            <caption className="sr-only">{caption}</caption>
          ) : null}
          <thead>
            <tr className="border-b border-border bg-muted/60">
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                    column.className,
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-border/70 last:border-0 hover:bg-muted/40"
              >
                {columns.map((column) => (
                  <td key={column.key} className={cn("px-4 py-3.5 align-middle", column.className)}>
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { DataTable };
export type { DataTableProps, DataTableColumn };
