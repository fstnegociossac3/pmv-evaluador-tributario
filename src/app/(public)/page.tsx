import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardList,
  FileUp,
  Lightbulb,
  ListChecks,
  LockKeyhole,
  ScanSearch,
  ScanText,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  Users,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { routes } from "@/config/routes";

const principles = [
  {
    icon: LockKeyhole,
    title: "Confidencialidad por diseño",
    description:
      "Separación entre el portal público y la información interna del caso.",
  },
  {
    icon: ScanText,
    title: "Extracción asistida",
    description:
      "La IA estructura los datos del reporte para su posterior validación.",
  },
  {
    icon: ListChecks,
    title: "Reglas auditables",
    description:
      "Un motor independiente aplica criterios explícitos y versionados.",
  },
  {
    icon: UserCheck,
    title: "Revisión humana",
    description:
      "El equipo interno conserva el control sobre cada evaluación.",
  },
] as const;

const steps = [
  {
    icon: ClipboardList,
    title: "Completar datos",
    description:
      "Contacto, empresa y consentimientos en un formulario guiado.",
  },
  {
    icon: FileUp,
    title: "Adjuntar reporte tributario",
    description:
      "Carga del documento en PDF desde un formulario con validación visual.",
  },
  {
    icon: ScanSearch,
    title: "Analizar información",
    description:
      "Extracción asistida y contraste determinista con reglas versionadas.",
  },
  {
    icon: Lightbulb,
    title: "Conocer oportunidades potenciales",
    description:
      "Resumen preliminar de compatibilidad, sin datos identificables.",
  },
] as const;

const preliminaryResults = [
  {
    icon: TrendingUp,
    title: "Nivel de compatibilidad",
    description:
      "Indicador general de coincidencia entre el reporte y los criterios evaluados.",
  },
  {
    icon: ListChecks,
    title: "Criterios observados",
    description:
      "Detalle de los criterios que aportan y de los que requieren mayor información.",
  },
  {
    icon: Workflow,
    title: "Siguientes pasos sugeridos",
    description:
      "Orientación preliminar para la revisión interna del caso.",
  },
] as const;

const privacyPrinciples = [
  {
    title: "Dominio aislado",
    description:
      "Las reglas de negocio no dependen de React ni de la infraestructura.",
  },
  {
    title: "Resultados mínimos",
    description:
      "El portal público recibe solo la proyección autorizada del resultado.",
  },
  {
    title: "Reglas versionadas",
    description:
      "Los criterios y operadores podrán evolucionar sin reescribir el motor.",
  },
  {
    title: "Acceso trazable",
    description:
      "Roles, permisos y auditoría se aplicarán antes de habilitar el panel.",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="relative border-b border-border/70">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-soft opacity-70"
        />
        <Container className="relative py-16 lg:py-24 xl:py-28">
          <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="flex items-center gap-3 text-eyebrow uppercase text-accent">
                <span aria-hidden="true" className="h-px w-8 bg-gold-500" />
                Evaluación preliminar · Emprendimientos innovadores
              </p>
              <h1 className="mt-6 font-display text-display text-balance text-foreground">
                Claridad tributaria antes de dar el siguiente paso.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Evaluamos la compatibilidad preliminar de tu reporte tributario
                con programas de apoyo, combinando extracción asistida por IA,
                reglas explícitas y revisión humana.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={routes.evaluation}>
                    Conocer el proceso
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={routes.staffAccess}>Acceso interno</Link>
                </Button>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
                Información tratada de forma confidencial y con trazabilidad.
              </p>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-accent via-teal-500 to-gold-500"
                />
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold">Marco de evaluación</p>
                  <Badge variant="gold">Preparación</Badge>
                </div>
                <div className="mt-8 space-y-3">
                  {steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="flex gap-4 rounded-xl border border-border/70 bg-background/60 p-4"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                        <step.icon aria-hidden="true" className="size-5" />
                      </span>
                      <div>
                        <p className="font-mono text-[0.6875rem] text-muted-foreground">
                          0{index + 1}
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {step.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-night-950 p-5 text-white">
                  <div className="flex items-center gap-2 text-gold-500">
                    <ShieldCheck aria-hidden="true" className="size-4" />
                    <span className="text-eyebrow uppercase">Trazabilidad</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    Cada evaluación futura conservará la versión de reglas, la
                    evidencia aplicada y el registro de cambios.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        aria-label="Principios de la plataforma"
        className="border-b border-border/70 bg-card"
      >
        <Container className="py-10 lg:py-12">
          <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((principle) => (
              <li key={principle.title} className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-accent">
                  <principle.icon aria-hidden="true" className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">{principle.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-section-sm lg:py-section">
        <Container>
          <SectionHeading
            eyebrow="Ruta de evaluación"
            title="Un proceso ordenado, de la carga al seguimiento."
            description="La plataforma separa la extracción de datos, la aplicación de reglas y la gestión interna para que cada etapa pueda revisarse y auditarse."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                  <step.icon
                    aria-hidden="true"
                    className="size-5 text-accent transition-transform group-hover:-translate-y-0.5"
                  />
                </div>
                <h3 className="mt-8 font-display text-xl font-medium">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
          <Notice tone="info" className="mt-8" title="Etapa de preparación">
            Estas capacidades están planificadas. En la Fase 00-B no hay
            formulario activo, autenticación ni procesamiento de documentos.
          </Notice>
        </Container>
      </section>

      <section className="border-y border-border/70 bg-card py-section-sm lg:py-section">
        <Container>
          <SectionHeading
            eyebrow="Resultados preliminares"
            title="Un primer vistazo, sin exponer lo sensible."
            description="El resumen público ofrecerá una referencia inicial de compatibilidad. Nunca será un dictamen ni reemplazará una revisión tributaria o legal definitiva."
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {preliminaryResults.map((result) => (
              <li
                key={result.title}
                className="rounded-2xl border border-border bg-background/70 p-6 shadow-soft"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <result.icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-xl font-medium">
                  {result.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {result.description}
                </p>
              </li>
            ))}
          </ul>
          <Notice tone="warning" className="mt-8" title="Alcance del resultado">
            Los resultados preliminares no constituyen asesoría tributaria,
            no garantizan la aceptación en ningún programa y no están
            formalizados con entidades públicas. Son una referencia para la
            revisión interna del caso.
          </Notice>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-night-950 py-section-sm text-white lg:py-section">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-inverse opacity-60"
        />
        <Container className="relative">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-eyebrow uppercase text-gold-500">
              <span aria-hidden="true" className="h-px w-8 bg-gold-500" />
              Dos ambientes, un mismo criterio
            </p>
            <h2 className="mt-4 font-display text-heading-2 text-balance">
              Un portal público claro. Un panel interno bajo control.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              La información pública y la operación interna se mantienen
              separadas desde el diseño, no solo en la interfaz.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-teal-500/15 text-teal-100">
                  <Users aria-hidden="true" className="size-5" />
                </span>
                <span className="text-eyebrow uppercase text-white/55">
                  Público
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium">
                Portal de evaluación
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Registro de contacto, carga del reporte y consulta de resultados
                resumidos.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/70">
                {[
                  "Formulario guiado para emprendedores",
                  "Carga segura del reporte tributario",
                  "Resultado preliminar sin datos sensibles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
                Nunca se mostrarán nombres, identificadores internos ni
                condiciones específicas de los programas.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="flex size-11 items-center justify-center rounded-xl bg-gold-500/15 text-gold-500">
                  <Building2 aria-hidden="true" className="size-5" />
                </span>
                <span className="text-eyebrow uppercase text-white/55">
                  Interno
                </span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-medium">
                Panel administrativo
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                Gestión de clientes, empresas, reportes, programas,
                evaluaciones y seguimiento comercial.
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/70">
                {[
                  "Acceso restringido con roles y permisos",
                  "Trazabilidad de cada evaluación",
                  "Auditoría de cambios y configuración",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
                Este panel no está habilitado en la Fase 00-B y no existe aún
                ninguna ruta administrativa accesible.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="py-section-sm lg:py-section">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionHeading
                eyebrow="Confidencialidad"
                title="La privacidad no es una capa final. Es parte de la arquitectura."
                description="El diseño separa el dominio, la aplicación, la presentación y la infraestructura para reducir la exposición de datos y facilitar la auditoría."
              />
              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {privacyPrinciples.map((principle) => (
                  <li
                    key={principle.title}
                    className="rounded-xl border border-border bg-card p-5 shadow-soft"
                  >
                    <ShieldCheck
                      aria-hidden="true"
                      className="size-5 text-accent"
                    />
                    <p className="mt-4 text-sm font-semibold">
                      {principle.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {principle.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-8 shadow-card lg:sticky lg:top-28">
              <Badge variant="accent">Fase 00-B</Badge>
              <h2 className="mt-5 font-display text-2xl font-medium">
                Preparando la siguiente etapa
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                La arquitectura, los tokens visuales, los formularios de
                demostración y las rutas públicas ya están definidos. La
                autenticación y las integraciones se habilitarán en fases
                posteriores con sus respectivos controles.
              </p>
              <Button asChild variant="accent" className="mt-7 w-full">
                <Link href={routes.evaluation}>
                  Revisar el alcance
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                No se solicitan datos ni documentos en esta versión.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
