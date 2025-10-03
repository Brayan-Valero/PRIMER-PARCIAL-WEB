const API_BASE = "https://24a0dac0-2579-4138-985c-bec2df4bdfcc-00-3unzo70c406dl.riker.replit.dev";

async function login(codigo, password) {
  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo, clave: password })
    });
    if (!response.ok) throw new Error("Error en la petición");
    return await response.json();
  } catch (err) {
    console.error("Error en login:", err);
    return null;
  }
}
async function getNotas(codigo) {
  try {
    const response = await fetch(`${API_BASE}/students/${codigo}/notas`);
    if (!response.ok) throw new Error("Error al obtener notas");
    return await response.json();
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}
async function getAllStudents() {
  try {
    const response = await fetch(`${API_BASE}/students`);
    if (!response.ok) throw new Error("Error al obtener estudiantes");
    return await response.json();
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}