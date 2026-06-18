import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart, ShieldCheck, Activity, Bell, Users, Smartphone, Cpu, Wifi,
  HeartPulse, AlertTriangle, ChevronDown, Phone, Mail,
  CheckCircle2, ArrowRight, Eye, Clock, Target, Lightbulb, HandHeart,
} from "lucide-react";
import heroImg from "@/assets/hero-watch.jpg";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VitalWatch — Monitoreo inteligente de salud para adultos mayores" },
      { name: "description", content: "Reloj inteligente que cuida a tus seres queridos: detecta caídas, monitorea el corazón y avisa a la familia ante cualquier emergencia." },
      { property: "og:title", content: "VitalWatch — Cuidado inteligente, tranquilidad real" },
      { property: "og:description", content: "Monitoreo de signos vitales y detección de caídas con alertas inmediatas a familiares." },
    ],
  }),
  component: Landing,
});

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-7xl px-6 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      {eyebrow && (
        <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-semibold text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground md:text-xl">{subtitle}</p>}
    </div>
  );
}

const alertColorMap: Record<string, string> = {
  destructive: "bg-destructive/10 text-destructive",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
};

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)]" />
        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-glow/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-primary shadow-[var(--shadow-soft)]">
              <span className="inline-block h-2 w-2 rounded-full bg-success pulse-ring" />
              847 familias protegidas en tiempo real
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
              Hace 2 minutos detectamos una caída.
              <br />
              <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                Ellos ya estaban avisados.
              </span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground md:text-2xl">
              Plataforma HealthTech para monitoreo preventivo, detección de caídas y respuesta
              temprana que alerta automáticamente a familiares y cuidadores.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-[image:var(--gradient-primary)] px-8 text-lg font-semibold text-primary-foreground shadow-[var(--shadow-medium)] transition hover:scale-[1.02]"
              >
                Ver el dashboard <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="#funciona"
                className="inline-flex h-14 items-center justify-center rounded-2xl border-2 border-border bg-card px-8 text-lg font-semibold text-foreground transition hover:border-primary"
              >
                Cómo funciona
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" /> Fácil de usar
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" /> Alertas inmediatas
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" /> Diseñado para mayores
              </span>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Monitoreo continuo</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">3</p>
                <p className="text-sm text-muted-foreground">Sensores principales</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">5s</p>
                <p className="text-sm text-muted-foreground">Tiempo de alerta</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-primary-glow/20 blur-3xl" />
            <div className="overflow-hidden rounded-[2rem] bg-card shadow-[var(--shadow-medium)] ring-1 ring-border">
              <img
                src={heroImg}
                alt="Reloj VitalWatch monitoreando los signos vitales de un adulto mayor"
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
            <div className="absolute -left-4 top-12 hidden rounded-2xl bg-card/95 p-4 shadow-[var(--shadow-medium)] ring-1 ring-border backdrop-blur md:flex md:items-center md:gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <HeartPulse className="h-6 w-6 heartbeat" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pulso</p>
                <p className="text-xl font-bold">
                  76 <span className="text-sm font-normal">bpm</span>
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 hidden rounded-2xl bg-card/95 p-4 shadow-[var(--shadow-medium)] ring-1 ring-border backdrop-blur md:flex md:items-center md:gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-success/10 text-success">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">SpO₂</p>
                <p className="text-xl font-bold">
                  98<span className="text-sm font-normal">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUÉ ES */}
      <Section id="que-es">
        <SectionTitle
          eyebrow="Qué es VitalWatch"
          title="Un guardián silencioso en su muñeca"
          subtitle="Un dispositivo discreto y cómodo que mide constantemente los signos vitales y alerta a la familia ante cualquier emergencia."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Heart, title: "Mide su salud", desc: "Frecuencia cardíaca y oxígeno en sangre minuto a minuto." },
            { icon: ShieldCheck, title: "Detecta caídas", desc: "Sensores inteligentes que reconocen impactos y movimientos peligrosos." },
            { icon: Bell, title: "Avisa a la familia", desc: "Envía alertas inmediatas a familiares y cuidadores en segundos." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl bg-[image:var(--gradient-card)] p-8 shadow-[var(--shadow-soft)] ring-1 ring-border transition hover:shadow-[var(--shadow-medium)]">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-soft)]">
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </div>
              <h3 className="mt-6 text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-lg text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* MISIÓN */}
      <section id="mision" className="bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Nuestra misión"
            title="Nació para proteger a quienes más queremos"
            subtitle="VitalWatch fue creado para ayudar a adultos mayores a mantenerse seguros y conectados con sus familias."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: Target, title: "Compromiso", desc: "Cada alerta puede salvar una vida. Diseñamos con responsabilidad y rigor médico para que las familias confíen en cada notificación." },
              { icon: Lightbulb, title: "Innovación", desc: "Sensores de última generación, inteligencia artificial y conectividad constante para anticiparse a las emergencias antes de que escalen." },
              { icon: HandHeart, title: "Confianza", desc: "Más de 847 familias ya confían en VitalWatch. Cada dato se encripta y cumple con los más altos estándares de privacidad de salud." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-3xl bg-card p-8 shadow-[var(--shadow-soft)] ring-1 ring-border text-center transition hover:shadow-[var(--shadow-medium)]">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-primary">
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-2xl font-bold">{title}</h3>
                <p className="mt-3 text-base text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <Section>
        <SectionTitle
          eyebrow="Problemas que resuelve"
          title="Tranquilidad para toda la familia"
          subtitle="Las emergencias no avisan. VitalWatch sí."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: AlertTriangle, title: "Caídas sin ayuda", desc: "Una caída sin asistencia puede ser grave. Detectamos y alertamos al instante." },
            { icon: Clock, title: "Soledad y emergencia", desc: "Cuando vive solo, cada minuto cuenta. Avisamos a la familia automáticamente." },
            { icon: HeartPulse, title: "Cambios en la salud", desc: "Detectamos variaciones en pulso y oxígeno antes de que sean un problema." },
            { icon: Eye, title: "Pérdida de conciencia", desc: "Si algo no está bien, generamos una alerta para que reciba atención rápida." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] ring-1 ring-border transition hover:shadow-[var(--shadow-medium)]">
              <Icon className="h-9 w-9 text-primary" strokeWidth={2} />
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-base text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CÓMO FUNCIONA */}
      <Section id="funciona">
        <SectionTitle
          eyebrow="Cómo funciona"
          title="Tres pasos simples"
          subtitle="Sin configuraciones complicadas. Solo colocarse el reloj y listo."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { n: "1", title: "Se coloca el reloj", desc: "Cómodo, ligero y fácil de usar. No requiere conocimientos técnicos." },
            { n: "2", title: "Mide constantemente", desc: "Pulso, oxígeno y movimientos se monitorean las 24 horas." },
            { n: "3", title: "Avisa si algo pasa", desc: "Familiares reciben una notificación con la información de la emergencia." },
          ].map((s) => (
            <div key={s.n} className="relative rounded-3xl bg-card p-8 shadow-[var(--shadow-soft)] ring-1 ring-border">
              <div className="absolute -top-6 left-8 grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-2xl font-bold text-primary-foreground shadow-[var(--shadow-medium)]">
                {s.n}
              </div>
              <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-lg text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* APP MÓVIL */}
      <section id="app" className="bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle
            eyebrow="Aplicación móvil"
            title="Control total desde tu celular"
            subtitle="Familiares y cuidadores pueden monitorear todo en tiempo real."
          />
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <ul className="space-y-5 text-lg">
                {[
                  "Frecuencia cardíaca en vivo",
                  "Oxígeno en sangre (SpO₂)",
                  "Historial médico completo",
                  "Alertas instantáneas por notificación",
                  "Geolocalización aproximada",
                  "Contactos de emergencia configurables",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[520px] w-[280px] rounded-[3rem] border-[3px] border-border bg-card shadow-[var(--shadow-medium)] overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-7 bg-muted/60 flex items-center justify-center">
                  <div className="h-2 w-20 rounded-full bg-border" />
                </div>
                <div className="flex flex-col items-center pt-12 pb-6 px-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">VitalWatch</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">En línea · Actualizado hace 5s</p>
                  <div className="mt-4 grid h-16 w-16 place-items-center rounded-full bg-destructive/10 text-destructive">
                    <HeartPulse className="h-8 w-8 heartbeat" />
                  </div>
                  <p className="mt-2 text-3xl font-bold">76 <span className="text-sm font-normal text-muted-foreground">bpm</span></p>
                  <p className="text-xs text-success font-medium">Normal</p>
                </div>
                <div className="mx-4 rounded-2xl bg-muted/50 p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">SpO₂</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-[image:var(--gradient-primary)]" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Actividad</span>
                    <span className="font-semibold">Tranquilo</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
                    <div className="h-full w-[30%] rounded-full bg-success" />
                  </div>
                </div>
                <div className="mx-4 mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-success/10 p-2.5 text-center">
                    <CheckCircle2 className="mx-auto h-4 w-4 text-success" />
                    <p className="mt-1 text-[10px] font-semibold">Estable</p>
                  </div>
                  <div className="rounded-xl bg-primary/10 p-2.5 text-center">
                    <Bell className="mx-auto h-4 w-4 text-primary" />
                    <p className="mt-1 text-[10px] font-semibold">0 Alertas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <Section id="beneficios">
        <SectionTitle eyebrow="Beneficios" title="Pensado para quienes más importan" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl bg-card p-10 shadow-[var(--shadow-soft)] ring-1 ring-border">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-primary">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Para adultos mayores</h3>
            </div>
            <ul className="mt-6 space-y-4 text-lg">
              {[
                "Botones grandes y fáciles de pulsar",
                "Texto claro y muy legible",
                "Cómodo de usar todo el día",
                "Independencia con seguridad",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-success" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-[image:var(--gradient-primary)] p-10 text-primary-foreground shadow-[var(--shadow-medium)]">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Para familiares</h3>
            </div>
            <ul className="mt-6 space-y-4 text-lg">
              {[
                "Alertas inmediatas en su celular",
                "Información clara del estado de salud",
                "Historial completo de signos vitales",
                "Tranquilidad las 24 horas del día",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CARACTERÍSTICAS TÉCNICAS */}
      <section id="tecnico" className="bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Tecnología" title="Componentes profesionales, uso simple" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Cpu, title: "ESP32", desc: "Microcontrolador potente y confiable" },
              { icon: HeartPulse, title: "MAX30102", desc: "Sensor de pulso y oxígeno en sangre" },
              { icon: Activity, title: "MPU6050", desc: "Detección de caídas e impactos" },
              { icon: Smartphone, title: "Pantallas TFT", desc: "Visualización clara ST7789 y ST7735" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 transition hover:border-primary hover:shadow-[var(--shadow-soft)]">
                <Icon className="h-8 w-8 text-primary" strokeWidth={2} />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SISTEMA DE ALERTAS */}
      <Section id="alertas">
        <SectionTitle
          eyebrow="Sistema de alertas"
          title="Cuando algo ocurre, todos se enteran"
          subtitle="Una red de notificaciones que conecta al usuario con quienes lo cuidan."
        />
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-5">
            {[
              { icon: HeartPulse, color: "destructive", title: "Caída detectada", time: "Hace 1 min" },
              { icon: Bell, color: "warning", title: "Pulso elevado", time: "Hace 8 min" },
              { icon: CheckCircle2, color: "success", title: "Signos normales", time: "Ahora" },
            ].map((a) => (
              <div key={a.title} className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)] ring-1 ring-border">
                <div className={`grid h-12 w-12 place-items-center rounded-xl ${alertColorMap[a.color]}`}>
                  <a.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold">{a.title}</p>
                  <p className="text-sm text-muted-foreground">{a.time}</p>
                </div>
                <ChevronDown className="h-5 w-5 -rotate-90 text-muted-foreground" />
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-3xl font-bold">Aviso instantáneo a familiares</h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Cada evento se envía por WiFi a los contactos configurados con la información
              esencial: tipo de alerta, hora y ubicación aproximada.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-border">
                <Wifi className="h-6 w-6 text-primary" />
                <span className="font-semibold">Conexión WiFi</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-border">
                <Phone className="h-6 w-6 text-primary" />
                <span className="font-semibold">Hasta 5 contactos</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq" className="bg-muted/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionTitle eyebrow="Preguntas frecuentes" title="Lo que todos quieren saber" />
          <Accordion type="single" collapsible className="mx-auto max-w-3xl space-y-3">
            {[
              { q: "¿Es difícil de usar para una persona mayor?", a: "No. VitalWatch está diseñado para usarse sin configuraciones. Solo se coloca como un reloj y funciona automáticamente." },
              { q: "¿Cómo recibe la familia las alertas?", a: "Las alertas llegan al celular de los familiares a través de la aplicación VitalWatch, mostrando el tipo de evento y el momento exacto." },
              { q: "¿Necesita internet permanente?", a: "Se conecta por WiFi para enviar alertas. Las mediciones se realizan localmente en el dispositivo todo el tiempo." },
              { q: "¿Cuánto dura la batería?", a: "La batería está diseñada para múltiples días de uso continuo bajo monitoreo activo." },
              { q: "¿Es resistente al agua?", a: "Soporta salpicaduras y uso diario. No se recomienda sumergirlo." },
            ].map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-2xl border border-border bg-card px-6">
                <AccordionTrigger className="py-5 text-left text-lg font-semibold hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="bg-[image:var(--gradient-primary)] py-20 text-primary-foreground md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Empieza a cuidar lo que más importa</h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl opacity-90">
            Hablemos sobre cómo VitalWatch puede acompañar a tu familia.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:proyectovitalwatch@gmail.com"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-card px-8 text-lg font-semibold text-foreground shadow-[var(--shadow-medium)] transition hover:scale-[1.02]"
            >
              <Mail className="h-5 w-5" /> proyectovitalwatch@gmail.com
            </a>
            <Link
              to="/dashboard"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-white/40 px-8 text-lg font-semibold transition hover:bg-white/10"
            >
              Ver VitalWatch <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
