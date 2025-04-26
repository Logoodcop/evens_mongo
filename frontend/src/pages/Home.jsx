import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import eventService from '../api/eventService';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const data = await eventService.list();
      // Asegúrate de mapear _id a id si es necesario
      const formattedData = data.map(event => ({
        ...event,
        id: event._id || event.id // Usa _id si existe, sino id
      }));
      setEvents(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setError('ID no válido');
      return;
    }

    if (window.confirm('¿Eliminar este evento?')) {
      try {
        await eventService.delete(id);
        // Filtra usando _id o id según corresponda
        setEvents(prev => prev.filter(event => (event._id || event.id) !== id));
      } catch (err) {
        console.error('Error eliminando:', err);
        setError(err.message || 'Error al eliminar');
      }
    }
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Eventos</h1>
      
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar eventos..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => navigate('/events/new')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Nuevo Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvents.map(event => (
          <div key={event._id || event.id} className="border p-4 rounded shadow">
            <h2 className="font-bold text-lg">{event.name}</h2>
            <p className="text-gray-600 my-2">{event.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.start_time).toLocaleDateString()}
            </p>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/events/edit/${event._id || event.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(event._id || event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}