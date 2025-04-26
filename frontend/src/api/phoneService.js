// src/api/phoneService.js
const API_URL = "http://127.0.0.1:8000/phones";

export default {
  async create(phone) {
    console.log("Enviando a backend:", phone); // Debug
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(phone),
    });
    if (!response.ok) throw new Error("Error al crear teléfono");
    return await response.json();
  },

  async delete(id) {
    console.log("Eliminando teléfono ID:", id); // Debug
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar teléfono");
    return true;
  },

  async update(id, phone) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(phone),
    });
    if (!response.ok) throw new Error("Error al actualizar teléfono");
    return await response.json();
  },

  async list() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar teléfonos");
    return await response.json();
  },
};
