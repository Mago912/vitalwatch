import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Heart, Activity, AlertTriangle, CheckCircle2, Pill, Clock, ArrowLeft,
  HeartPulse, TrendingUp, Bell, Calendar,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — VitalWatch" },
      { name: "description", content: "Visualiza signos vitales, alertas, historial y medicación en tiempo real." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const heartData = [72, 75, 74, 78, 76, 79, 77, 76, 78, 75, 76, 74];
  const max = Math.max(...heartData), min = Math.min(...heartData);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="inline-flex items-center gap-2 text-base font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" /> Volver
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-success pulse-ring" />
            <span className="font-semibold">En línea</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Patient header */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Paciente</p>
            <h1 className="mt-1 truncate text-3xl font-bold sm:text-4xl">Don Roberto Méndez</h1>
            <p className="mt-1 text-base text-muted-foreground">78 años · Última lectura hace 12 segundos</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-success/10 px-5 py-3 text-success">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-lg font-bold">Estado normal</span>
          </div>
        </div>

        {/* Vital stats */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <VitalCard
            icon={HeartPulse}
            label="Frecuencia cardíaca"
            value="76"
            unit="bpm"
            color="destructive"
            range="60 – 100 bpm"
            animated
          />
          <VitalCard
            icon={Activity}
            label="Oxígeno (SpO₂)"
            value="98"
            unit="%"
            color="primary"
            range="Normal: ≥ 95%"
          />
          <VitalCard
            icon={TrendingUp}
            label="Actividad"
            value="Tranquilo"
            unit=""
            color="success"
            range="Sin movimientos bruscos"
          />
          <VitalCard
            icon={Heart}
            label="Estado general"
            value="Estable"
            unit=""
            color="primary"
            range="Todo en orden"
          />
        </div>

        {/* Chart + Alerts */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-card p-7 shadow-[var(--shadow-soft)] ring-1 ring-border lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Historial del corazón</h2>
                <p className="text-base text-muted-foreground">Últimas 12 horas</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-sm font-semibold text-primary">
                <Clock className="h-4 w-4" /> Hoy
              </div>
            </div>
            <div className="flex h-56 items-end gap-2">
              {heartData.map((v, i) => {
                const h = ((v - min + 4) / (max - min + 8)) * 100;
                return (
                  <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground opacity-0 transition group-hover:opacity-100">{v}</span>
                    <div
                      className="w-full rounded-t-xl bg-[image:var(--gradient-primary)] transition hover:opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>8 AM</span><span>12 PM</span><span>4 PM</span><span>8 PM</span>
            </div>
          </div>

          <div className="rounded-3xl bg-card p-7 shadow-[var(--shadow-soft)] ring-1 ring-border">
            <div className="mb-5 flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Alertas</h2>
            </div>
            <ul className="space-y-3">
              {[
                { icon: CheckCircle2, color: "success", title: "Signos normales", time: "Hace 5 min" },
                { icon: AlertTriangle, color: "warning", title: "Pulso ligeramente alto", time: "Hace 2 h" },
                { icon: CheckCircle2, color: "success", title: "Medicación tomada", time: "Hace 4 h" },
                { icon: Activity, color: "primary", title: "Caminata detectada", time: "Ayer" },
              ].map((a, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4">
                  <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-${a.color}/15 text-${a.color}`}>
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{a.title}</p>
                    <p className="text-sm text-muted-foreground">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Medication */}
        <div className="mt-8 rounded-3xl bg-card p-7 shadow-[var(--shadow-soft)] ring-1 ring-border">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Pill className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Medicación de hoy</h2>
            </div>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Losartán", dose: "50 mg", time: "08:00", taken: true },
              { name: "Aspirina", dose: "100 mg", time: "13:00", taken: true },
              { name: "Metformina", dose: "500 mg", time: "20:00", taken: false },
            ].map((m) => (
              <div key={m.name} className={`rounded-2xl border-2 p-5 transition ${m.taken ? "border-success/30 bg-success/5" : "border-border bg-muted/40"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xl font-bold">{m.name}</p>
                    <p className="text-base text-muted-foreground">{m.dose}</p>
                  </div>
                  {m.taken ? (
                    <CheckCircle2 className="h-7 w-7 text-success" />
                  ) : (
                    <Clock className="h-7 w-7 text-muted-foreground" />
                  )}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm font-semibold text-muted-foreground">{m.time}</span>
                  <span className={`text-sm font-bold ${m.taken ? "text-success" : "text-warning"}`}>
                    {m.taken ? "Tomada" : "Pendiente"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

function VitalCard({
  icon: Icon, label, value, unit, color, range, animated,
}: {
  icon: any; label: string; value: string; unit: string;
  color: "destructive" | "primary" | "success"; range: string; animated?: boolean;
}) {
  const colorMap = {
    destructive: "bg-destructive/10 text-destructive",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
  };
  return (
    <div className="rounded-3xl bg-card p-6 shadow-[var(--shadow-soft)] ring-1 ring-border transition hover:shadow-[var(--shadow-medium)]">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${colorMap[color]}`}>
          <Icon className={`h-5 w-5 ${animated ? "heartbeat" : ""}`} />
        </div>
      </div>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-5xl font-bold tracking-tight">{value}</span>
        {unit && <span className="text-xl font-medium text-muted-foreground">{unit}</span>}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{range}</p>
    </div>
  );
}
