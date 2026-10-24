import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";

const navigation = [
  { label: "Portal público", href: routes.home },
  { label: "Proceso de evaluación", href: routes.evaluation },
  { label: "Acceso del personal", href: routes.staffAccess },
] as const;

const scope = [
  "Arquitectura modular",
  "Identidad y RBAC previstos",
  "Integraciones sin conexión",
  "Sin datos ni migraciones",
] as const;

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-night-950 text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.9fr]">
          <div>
            <Logo inverted />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Evaluación preliminar de reportes tributarios para emprendimientos
              innovadores, con separación estricta entre información pública y
              gestión interna.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-white/60">
              <span className="size-1.5 rounded-full bg-gold-500" />
              {siteConfig.phase} · Arquitectura inicial
            </p>
          </div>

          <nav aria-label="Navegación del pie de página">
            <h2 className="text-eyebrow uppercase text-white/55">Navegación</h2>
            <ul className="mt-5 space-y-3">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow uppercase text-white/55">
              Alcance de esta versión
            </h2>
            <ul className="mt-5 space-y-3">
              {scope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-white/65"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {siteConfig.name}. Todos los derechos reservados.</p>
          <p>
            Información confidencial. Los resultados preliminares no constituyen
            asesoría tributaria definitiva.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
