// Ejemplo para userService.js
const API_URL = "http://localhost:8000/users"; // Cambia la URL

export default {
  async list() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar usuarios");
    return await response.json();
  },

  async create(data) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al crear usuario");
    return await response.json();
  },

  // Añade update() y delete() igual que en eventService
};
