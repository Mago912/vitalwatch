import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Heart, Activity, AlertTriangle, CheckCircle2, Pill, Clock,
  HeartPulse, TrendingUp, Bell, Calendar, Phone, User, MapPin, RefreshCw,
} from "lucide-react";

import { obtenerDatosPaciente } from "../services/api";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — VitalWatch" },
      { name: "description", content: "Visualiza signos vitales, alertas, historial y medicación en tiempo real." },
    ],
  }),
  component: Dashboard,
});

const alertColorMap: Record<string, string> = {
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  primary: "bg-primary/15 text-primary",
  destructive: "bg-destructive/15 text-destructive",
};

function Dashboard() {
  const [paciente, setPaciente] = useState<any>(null);
  const [lecturas, setLecturas] = useState<any[]>([]);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Declarada aquí para que sea accesible en todo el componente y en el botón onClick
  async function cargarDatos() {
    console.log("-> Intentando conectar con el backend...");
    const res = await obtenerDatosPaciente(1);
    console.log("-> Respuesta recibida del backend:", res);
    
    if (res) {
      if (res.paciente) setPaciente(res.paciente);
      if (Array.isArray(res.lecturas)) setLecturas(res.lecturas);
      if (Array.isArray(res.alertas)) setAlertas(res.alertas);
    }
    setLoading(false);
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  // Extraer última lectura o asignar por defecto si la lista está vacía
  const ultimaLectura = lecturas.length > 0 ? lecturas[0] : { bpm: 76, spo2: 98 };

  // Construir arreglos para los gráficos dinámicos (últimas lecturas)
  const heartData = lecturas.length > 0 
    ? lecturas.slice(0, 12).map((l) => l.bpm).reverse()
    : [72, 75, 74, 78, 76, 79, 77, 76, 78, 75, 76, 74];

  const spo2Data = lecturas.length > 0 
    ? lecturas.slice(0, 12).map((l) => l.spo2).reverse()
    : [97, 98, 97, 98, 99, 98, 97, 98, 98, 97, 98, 98];

  const heartMax = Math.max(...heartData);
  const heartMin = Math.min(...heartData);
  const spo2Max = Math.max(...spo2Data);
  const spo2Min = Math.min(...spo2Data);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Navegación Principal */}
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">VitalWatch</span>
        </div>
        <button 
          onClick={cargarDatos}
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline cursor-pointer"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Recargar datos
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Encabezado del paciente */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Paciente</p>
            <h1 className="mt-1 truncate text-3xl font-bold sm:text-4xl">
              {paciente?.nombre ? `${paciente.nombre} ${paciente.apellido || ""}` : "Don Roberto Méndez"}
            </h1>
            <p className="mt-1 text-base text-muted-foreground">
              {paciente?.edad ? `${paciente.edad} años` : "78 años"} · {loading ? "Cargando..." : "Última lectura en tiempo real"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-success/10 px-5 py-3 text-success">
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-lg font-bold">Estado normal</span>
          </div>
        </div>

        {/* Tarjetas de Signos Vitales */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <VitalCard
            icon={HeartPulse}
            label="Frecuencia cardíaca"
            value={String(ultimaLectura.bpm ?? 76)}
            unit="bpm"
            color="destructive"
            range="60 – 100 bpm"
            animated
          />
          <VitalCard
            icon={Activity}
            label="Oxígeno (SpO₂)"
            value={String(ultimaLectura.spo2 ?? 98)}
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

        {/* Gráfico de Corazón y Lista de Alertas */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Gráfico Corazón */}
          <div className="rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border lg:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Historial del corazón</h2>
                <p className="text-base text-muted-foreground">Últimas lecturas obtenidas</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-sm font-semibold text-primary">
                <Clock className="h-4 w-4" /> En vivo
              </div>
            </div>
            <div className="flex h-56 items-end gap-2">
              {heartData.map((v, i) => {
                const diff = heartMax - heartMin || 1;
                const h = Math.max(15, Math.min(100, ((v - heartMin + 2) / (diff + 4)) * 100));
                return (
                  <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground opacity-0 transition group-hover:opacity-100">{v}</span>
                    <div
                      className="w-full rounded-t-xl bg-primary transition hover:opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              <span>Reciente</span><span>Anterior</span>
            </div>
          </div>

          {/* Alertas dinámicas */}
          <div className="rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border">
            <div className="mb-5 flex items-center gap-3">
              <Bell className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Alertas</h2>
            </div>
            <ul className="space-y-3">
              {alertas.length > 0 ? (
                alertas.slice(0, 4).map((a, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${alertColorMap[a.tipo] || alertColorMap.primary}`}>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{a.descripcion || a.tipo || "Alerta registrada"}</p>
                      <p className="text-sm text-muted-foreground">Paciente ID: {a.paciente_id}</p>
                    </div>
                  </li>
                ))
              ) : (
                [
                  { icon: CheckCircle2, color: "success", title: "Signos normales", time: "Hace 5 min" },
                  { icon: AlertTriangle, color: "warning", title: "Pulso ligeramente alto", time: "Hace 2 h" },
                  { icon: CheckCircle2, color: "success", title: "Medicación tomada", time: "Hace 4 h" },
                ].map((a, i) => (
                  <li key={i} className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${alertColorMap[a.color]}`}>
                      <a.icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{a.title}</p>
                      <p className="text-sm text-muted-foreground">{a.time}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Gráfico de SpO2 */}
        <div className="mt-8 rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Historial de oxígeno (SpO₂)</h2>
              <p className="text-base text-muted-foreground">Porcentaje de saturación</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-1.5 text-sm font-semibold text-primary">
              <Clock className="h-4 w-4" /> En vivo
            </div>
          </div>
          <div className="flex h-40 items-end gap-2">
            {spo2Data.map((v, i) => {
              const diff = spo2Max - spo2Min || 1;
              const h = Math.max(15, Math.min(100, ((v - spo2Min + 1) / (diff + 2)) * 100));
              return (
                <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-muted-foreground opacity-0 transition group-hover:opacity-100">{v}%</span>
                  <div
                    className="w-full rounded-t-xl bg-success transition hover:opacity-80"
                    style={{ height: `${h}%` }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Medicación y Contactos */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border lg:col-span-2">
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
                    {m.taken ? <CheckCircle2 className="h-7 w-7 text-success" /> : <Clock className="h-7 w-7 text-muted-foreground" />}
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

          <div className="rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border">
            <div className="mb-5 flex items-center gap-3">
              <Phone className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Contactos</h2>
            </div>
            <ul className="space-y-3">
              {[
                { name: "María Méndez", role: "Hija" },
                { name: "Carlos Méndez", role: "Hijo" },
                { name: "Dr. Fernández", role: "Médico" },
              ].map((c) => (
                <li key={c.name} className="flex items-center gap-3 rounded-2xl bg-muted/50 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <footer className="border-t bg-card py-6 text-center text-sm text-muted-foreground">
        © VitalWatch — Monitoreo de Signos Vitales
      </footer>
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
    <div className="rounded-3xl bg-card p-6 shadow-sm ring-1 ring-border transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className={`grid h-11 w-11 place-items-center rounded-xl ${colorMap[color]}`}>
          <Icon className={`h-5 w-5 ${animated ? "animate-pulse" : ""}`} />
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