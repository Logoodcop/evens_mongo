import React, { useState } from 'react';
import eventService from '../api/eventService';
import { useNavigate } from 'react-router-dom';

export default function CreateEvent() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_time: '',
    end_time: '',
    location: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!form.name || !form.start_time || !form.end_time) {
      setError('Nombre y fechas son requeridos');
      return;
    }

    try {
      // Prepara los datos para el backend
      const eventData = {
        _id: null,  // ← Importante para tu backend
        name: form.name.trim(),
        description: form.description.trim(),
        start_time: new Date(form.start_time).toISOString(), // Formato ISO
        end_time: new Date(form.end_time).toISOString(),
        location: form.location.trim()
      };

      console.log('Enviando a backend:', eventData); // Para debug

      await eventService.create(eventData);
      
      // Éxito: redirigir y limpiar
      navigate('/');
    } catch (err) {
      console.error('Error creando evento:', err);
      setError(err.message || 'Error al crear evento');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Evento</h2>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre*</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Descripción</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Inicio*</label>
            <input
              type="datetime-local"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Fin*</label>
            <input
              type="datetime-local"
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Ubicación</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Crear Evento
        </button>
      </form>
    </div>
  );
}