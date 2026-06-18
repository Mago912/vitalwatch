import { Link, useLocation } from "@tanstack/react-router";
import { HeartPulse, Menu, Mail, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/#funciona", label: "Cómo funciona" },
  { href: "/#beneficios", label: "Beneficios" },
  { href: "/#app", label: "App móvil" },
  { href: "/#mision", label: "Misión" },
  { href: "/#faq", label: "Preguntas" },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return false;
}

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <HeartPulse className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">VitalWatch</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              isActivePath(location.pathname, "/dashboard")
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            Dashboard
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            to="/dashboard"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] px-5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
          >
            Probar VitalWatch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-foreground transition hover:bg-secondary md:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 p-0">
            <SheetHeader className="border-b border-border px-6 py-5">
              <SheetTitle className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <span className="font-bold">VitalWatch</span>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link
                  to="/dashboard"
                  className="mt-2 rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
              </SheetClose>
            </div>
            <div className="border-t border-border px-6 py-5">
              <SheetClose asChild>
                <Link
                  to="/dashboard"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[image:var(--gradient-primary)] py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
                  onClick={() => setOpen(false)}
                >
                  Probar VitalWatch
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="font-bold">VitalWatch</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Monitoreo inteligente de salud para adultos mayores. Detecta caídas, monitorea el
              corazón y avisa a la familia ante cualquier emergencia.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Producto
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#funciona" className="text-muted-foreground transition hover:text-foreground">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="/#beneficios" className="text-muted-foreground transition hover:text-foreground">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="/#app" className="text-muted-foreground transition hover:text-foreground">
                  App móvil
                </a>
              </li>
              <li>
                <a href="/#tecnico" className="text-muted-foreground transition hover:text-foreground">
                  Tecnología
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Soporte
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/#faq" className="text-muted-foreground transition hover:text-foreground">
                  Preguntas frecuentes
                </a>
              </li>
              <li>
                <a href="/#contacto" className="text-muted-foreground transition hover:text-foreground">
                  Contacto
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">Documentación</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                proyectovitalwatch@gmail.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                +54 11 0000-0000
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-center sm:text-left md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 VitalWatch &middot; Cuidado inteligente para quienes amas
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="cursor-pointer transition hover:text-foreground">Privacidad</span>
            <span className="cursor-pointer transition hover:text-foreground">Términos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
