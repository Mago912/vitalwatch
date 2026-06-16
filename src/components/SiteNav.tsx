import { Link } from "@tanstack/react-router";
import { HeartPulse } from "lucide-react";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <HeartPulse className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">VitalWatch</span>
        </Link>
        <div className="flex items-center gap-4 text-sm md:gap-8">
          <a href="/#funciona" className="text-base font-medium text-muted-foreground hover:text-foreground">Cómo funciona</a>
          <a href="/#beneficios"  className="text-base font-medium text-muted-foreground hover:text-foreground">Beneficios</a>
          <a href="/#app" className="text-base font-medium text-muted-foreground hover:text-foreground">App móvil</a>
          <a href="/#mision" className="text-base font-medium text-muted-foreground hover:text-foreground">Nuestra misión</a>
          <a href="/#faq" className="text-base font-medium text-muted-foreground hover:text-foreground">Preguntas</a>
          <Link to="/dashboard" className="text-base font-medium text-muted-foreground hover:text-foreground">Dashboard</Link>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] px-5 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95"
        >
          Probar VitalWatch
        </Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-primary)] text-primary-foreground">
              <HeartPulse className="h-5 w-5" />
            </div>
            <span className="font-semibold">VitalWatch</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 VitalWatch · Cuidado inteligente para quienes amas</p>
        </div>
      </div>
    </footer>
  );
}
