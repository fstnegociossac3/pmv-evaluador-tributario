import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Clock3,
  FileText,
  LockKeyhole,
  Mail,
  Plus,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { IntakeForm } from "@/components/forms/intake-form";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Notice } from "@/components/ui/notice";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Evaluación preliminar",
  description:
    "Conoce el alcance, los requisitos y la ruta prevista para la evaluación preliminar de reportes tributarios.",
};

const requirements = [
  {
    icon: Mail,
    title: "Datos de contacto",
    description: "Nombre, correo electrónico y teléfono de la persona responsable.",
  },
  {
    icon: Building2,
    title: "Datos de la empresa",
    description: "Información básica de la empresa o emprendimiento.",
  },
  {
    icon: FileText,
    title: "Reporte tributario",
    description: "Documento en PDF disponible para su carga segura.",
  },
  {
    icon: LockKeyhole,
    title: "Autorización",
    description: "Consentimiento para el tratamiento confidencial de la información.",
  },
] as const;

const plannedSteps = [
  {
    title: "Verificación del contacto",
    description:
      "Validación de los datos de la persona y de la empresa antes de iniciar el caso.",
  },
  {
    title: "Carga y extracción",
    description:
      "Almacenamiento del reporte y extracción asistida de la información tributaria relevante.",
  },
  {
    title: "Aplicación de reglas",
    description:
      "Contraste determinista con los criterios vigentes de los programas disponibles.",
  },
  {
    title: "Resultado preliminar",
    description:
      "Resumen público sin datos sensibles y revisión interna del expediente.",
  },
] as const;

const faqs = [
  {
    question: "¿El resultado será vinculante?",
    answer:
      "No. La evaluación es una referencia preliminar y no reemplaza una revisión tributaria, legal o financiera definitiva.",
  },
  {
    question: "¿Quién podrá ver mi información?",
    answer:
      "Solo el personal autorizado. El portal público mostrará un resumen sin nombres, identificadores internos ni condiciones específicas de los programas.",
  },
  {
    question: "¿Cuándo estará disponible el formulario?",
    answer:
      "La carga de documentos se habilitará cuando estén implementados la autenticación, el almacenamiento seguro, la extracción y los controles de privacidad correspondientes.",
  },
] as const;

export default function EvaluationPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/70 bg-card">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-grid-soft fade-mask opacity-50"
        />
        <Container className="relative py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <Badge variant="gold">
                <Clock3 aria-hidden="true" />
                Módulo en preparación
              </Badge>
              <h1 className="mt-6 font-display text-heading-1 text-balance">
                Evaluación preliminar de tu reporte tributario.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Un proceso confidencial que combina extracción asistida por IA y
                reglas explícitas para estimar la compatibilidad con programas de
                apoyo a emprendimientos innovadores.
              </p>

              <div className="mt-12">
                <h2 className="font-display text-2xl font-medium">
                  Qué vas a necesitar
                </h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {requirements.map((requirement) => (
                    <li
                      key={requirement.title}
                      className="rounded-xl border border-border bg-background/70 p-5"
                    >
                      <requirement.icon
                        aria-hidden="true"
                        className="size-5 text-accent"
                      />
                      <p className="mt-4 text-sm font-semibold">
                        {requirement.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {requirement.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-5">
              <IntakeForm />

              <Notice tone="confidential" title="Tratamiento confidencial">
                La información del reporte se utilizará únicamente para la
                evaluación preliminar y el seguimiento del caso. Los resultados
                públicos nunca incluirán datos identificables.
              </Notice>

              <Button asChild variant="ghost" className="w-full">
                <Link href={routes.home}>
                  <ArrowLeft aria-hidden="true" />
                  Volver al portal
                </Link>
              </Button>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-section-sm lg:py-section">
        <Container>
          <SectionHeading
            eyebrow="Ruta prevista"
            title="Cómo funcionará la evaluación."
            description="Cada etapa tendrá validaciones propias y podrá auditarse de forma independiente. Ninguna regla de negocio vivirá dentro de los componentes visuales."
          />
          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {plannedSteps.map((step, index) => (
              <li
                key={step.title}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/5 font-mono text-xs font-semibold text-teal-700">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-3 lg:grid-cols-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-border bg-card p-5 shadow-soft"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  {faq.question}
                  <Plus
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck aria-hidden="true" className="size-4 text-accent" />
            Los resultados preliminares no constituyen asesoría tributaria
            definitiva.
          </div>
        </Container>
      </section>
    </>
  );
}
