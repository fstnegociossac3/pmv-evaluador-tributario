import Link from "next/link";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-soft fade-mask opacity-60"
      />
      <Container className="relative py-20">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <Logo />
          <p className="mt-10 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Error 404
          </p>
          <h1 className="mt-4 font-display text-heading-2 text-balance">
            Esta página no está disponible.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            La ruta que buscas no existe o todavía no forma parte de esta fase
            de la plataforma.
          </p>
          <Button asChild className="mt-8">
            <Link href={routes.home}>Volver al portal</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
