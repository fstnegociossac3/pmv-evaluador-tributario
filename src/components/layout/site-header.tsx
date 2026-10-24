import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

const navigation = [
  { label: "Portal", href: routes.home },
  { label: "Evaluación", href: routes.evaluation },
] as const;

const mobileNavigation = [
  ...navigation,
  { label: "Acceso interno", href: routes.staffAccess },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          href={routes.home}
          aria-label="PMV Evaluador Tributario, ir al inicio"
          className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href={routes.staffAccess}>Acceso interno</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={routes.evaluation}>
              Iniciar evaluación
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <MobileNav items={mobileNavigation} />
      </Container>
    </header>
  );
}

export { SiteHeader };
