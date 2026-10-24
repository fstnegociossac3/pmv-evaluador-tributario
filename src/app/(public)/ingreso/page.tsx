import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ClipboardList,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { LoginForm } from "@/components/forms/login-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Acceso del personal interno",
  description:
    "Información sobre el acceso restringido al panel administrativo de la plataforma.",
};

const plannedModules = [
  "Clientes y empresas",
  "Reportes tributarios",
  "Programas y convocatorias",
  "Evaluaciones",
  "Seguimiento comercial",
  "Auditoría",
] as const;

const accessRequirements = [
  "Autenticación con Supabase",
  "Roles y permisos por módulo",
  "Registro de auditoría",
] as const;

export default function StaffAccessPage() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-soft fade-mask opacity-60"
      />
      <Container className="relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Badge variant="accent">
              <LockKeyhole aria-hidden="true" />
              Acceso del personal interno
            </Badge>
            <h1 className="mt-6 font-display text-heading-1 text-balance">
              Un panel privado para gestionar evaluaciones.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              El equipo interno administrará clientes, empresas, reportes,
              programas y seguimientos desde un entorno protegido, con permisos
              por rol y trazabilidad de cada acción.
            </p>

            <div className="mt-10">
              <p className="text-eyebrow uppercase text-muted-foreground">
                Módulos previstos
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {plannedModules.map((module) => (
                  <li
                    key={module}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                  >
                    {module}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <Button asChild variant="outline">
                <Link href={routes.home}>
                  <ArrowLeft aria-hidden="true" />
                  Volver al portal
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <LoginForm />

            <ul className="mt-6 space-y-3">
              {accessRequirements.map((requirement) => (
                <li
                  key={requirement}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent"
                  />
                  {requirement}
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-6 text-muted-foreground">
              <span className="flex flex-col items-center gap-2 text-center">
                <Users aria-hidden="true" className="size-4 text-accent" />
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wide">
                  Clientes
                </span>
              </span>
              <span className="flex flex-col items-center gap-2 text-center">
                <FileText aria-hidden="true" className="size-4 text-accent" />
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wide">
                  Reportes
                </span>
              </span>
              <span className="flex flex-col items-center gap-2 text-center">
                <Workflow aria-hidden="true" className="size-4 text-accent" />
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wide">
                  Reglas
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-3 border-t border-border/70 pt-10 sm:grid-cols-2">
          <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
            <Building2
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-accent"
            />
            <div>
              <p className="text-sm font-semibold">Operación centralizada</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Clientes, empresas, reportes y programas en un mismo entorno
                interno.
              </p>
            </div>
          </div>
          <div className="flex gap-4 rounded-xl border border-border bg-card p-5">
            <ClipboardList
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-accent"
            />
            <div>
              <p className="text-sm font-semibold">Control y trazabilidad</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                Cada evaluación y cambio quedará asociado a un usuario y a una
                versión de reglas.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
