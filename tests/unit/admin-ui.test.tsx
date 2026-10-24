import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { EmptyState } from "@/components/admin/empty-state";
import { StatCard } from "@/components/admin/stat-card";
import { StatusIndicator } from "@/components/admin/status-indicator";
import { Skeleton, StatCardSkeleton } from "@/components/admin/skeletons";
import { AdminNav } from "@/components/admin/admin-nav";
import { Database, Gauge } from "lucide-react";

describe("StatCard", () => {
  it("renderiza etiqueta, valor e icono", () => {
    const markup = renderToStaticMarkup(
      <StatCard label="Evaluaciones" value="24" icon={Gauge} hint="este mes" />,
    );

    expect(markup).toContain("Evaluaciones");
    expect(markup).toContain("24");
    expect(markup).toContain("este mes");
  });
});

describe("StatusIndicator", () => {
  it("renderiza el estado con el tono indicado", () => {
    const markup = renderToStaticMarkup(
      <StatusIndicator label="Pendiente" tone="warning" />,
    );

    expect(markup).toContain("Pendiente");
    expect(markup).toContain('data-tone="warning"');
  });
});

describe("EmptyState", () => {
  it("renderiza título y descripción", () => {
    const markup = renderToStaticMarkup(
      <EmptyState title="Sin datos" description="Aún no hay registros." />,
    );

    expect(markup).toContain("Sin datos");
    expect(markup).toContain("Aún no hay registros.");
  });
});

describe("Skeletons", () => {
  it("Skeleton usa animate-pulse solo con movimiento permitido", () => {
    const markup = renderToStaticMarkup(<Skeleton className="h-4 w-20" />);
    expect(markup).toContain("motion-safe:animate-pulse");
  });

  it("StatCardSkeleton renderiza bloques básicos", () => {
    const markup = renderToStaticMarkup(<StatCardSkeleton />);
    expect(markup).toContain('data-slot="stat-card-skeleton"');
  });
});

describe("AdminNav", () => {
  it("renderiza enlaces con marca activa", () => {
    const markup = renderToStaticMarkup(
      <AdminNav
        items={[
          { href: "/admin", label: "Panel", icon: Gauge },
          { href: "/admin/empresas", label: "Empresas", icon: Database },
        ]}
        activeHref="/admin"
      />,
    );

    expect(markup).toContain('aria-current="page"');
    expect(markup).toContain("Panel");
    expect(markup).toContain("Empresas");
    expect(markup).toContain('href="/admin"');
  });
});
