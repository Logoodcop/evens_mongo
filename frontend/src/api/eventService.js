// src/api/eventService.js
const API_URL = 'http://127.0.0.1:8000/events';

export default {
  async create(event) {
    console.log("Enviando a backend:", event); // Debug
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    if (!response.ok) throw new Error("Error al crear");
    return await response.json();
  },

  async delete(id) {
    console.log("Eliminando evento ID:", id); // Debug
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error("Error al eliminar");
    return true;
  },

  async update(id, event) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    });
    if (!response.ok) throw new Error("Error al actualizar");
    return await response.json();
  },

  async list() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar");
    return await response.json();
  }
};