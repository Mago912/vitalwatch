const API_URL = import.meta.env.VITE_API_URL || 'https://vitalwatch-fastify.onrender.com';

export async function obtenerDatosPaciente(id = 1) {
  try {
    const [resPaciente, resLecturas, resAlertas] = await Promise.all([
      fetch(`${API_URL}/api/pacientes/${id}`),
      fetch(`${API_URL}/api/lecturas/${id}`),
      fetch(`${API_URL}/api/alertas/${id}`)
    ]);

    const paciente = await resPaciente.json();
    const rawLecturas = await resLecturas.json();
    const rawAlertas = await resAlertas.json();

    // Normalizar asegurando minúsculas por si el backend responde con mayúsculas
    const lecturas = Array.isArray(rawLecturas) ? rawLecturas : (rawLecturas.Lecturas || rawLecturas.lecturas || []);
    const alertas = Array.isArray(rawAlertas) ? rawAlertas : (rawAlertas.Alertas || rawAlertas.alertas || []);

    return { 
      paciente: paciente.paciente || paciente.Paciente || paciente || {}, 
      lecturas, 
      alertas 
    };
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    return null;
  }
}