import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import phoneService from "../api/phoneService";

export default function PhoneHome() {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchPhones = async () => {
    try {
      const data = await phoneService.list();
      const formattedData = data.map((phone) => ({
        ...phone,
        id: phone._id || phone.id,
      }));
      setPhones(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setError("ID no válido");
      return;
    }
    if (window.confirm("¿Eliminar este teléfono?")) {
      try {
        await phoneService.delete(id);
        setPhones((prev) =>
          prev.filter((phone) => (phone._id || phone.id) !== id)
        );
      } catch (err) {
        console.error("Error eliminando:", err);
        setError(err.message || "Error al eliminar");
      }
    }
  };

  const filteredPhones = phones.filter((phone) =>
    phone.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teléfonos</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar marca..."
          className="flex-1 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => navigate("/phones/new")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Nuevo Teléfono
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPhones.map((phone) => (
          <div
            key={phone._id || phone.id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-bold text-lg">{phone.brand}</h2>
            <p className="text-gray-600">{phone.model}</p>
            <p className="text-sm text-gray-500">${phone.price}</p>

            <div className="flex gap-2 mt-4">
              {/* Botón eliminar */}
              <button
                onClick={() => handleDelete(phone._id || phone.id)}
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
