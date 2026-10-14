const API_URL = import.meta.env.VITE_API_URL || 'https://vitalwatch-fastify.onrender.com';

export async function obtenerDatosPaciente(id = 1) {
  try {
    const [resPaciente, resLecturas, resAlertas] = await Promise.all([
      fetch(`${API_URL}/api/pacientes/${id}`),
      fetch(`${API_URL}/api/lecturas/${id}`),
      fetch(`${API_URL}/api/alertas/${id}`)
    ]);

    const paciente = await resPaciente.json();
    const lecturas = await resLecturas.json();
    const alertas = await resAlertas.json();

    console.log("Datos crudos del backend:", { paciente, lecturas, alertas });

    return { 
      paciente: paciente || {}, 
      lecturas: Array.isArray(lecturas) ? lecturas : [], 
      alertas: Array.isArray(alertas) ? alertas : [] 
    };
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    return null;
  }
}