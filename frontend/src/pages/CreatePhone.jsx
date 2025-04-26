import React, { useState } from "react";
import phoneService from "../api/phoneService"; // asegúrate de tener este servicio
import { useNavigate } from "react-router-dom";

export default function CreatePhone() {
  const [form, setForm] = useState({
    brand: "",
    model: "",
    price: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.brand || !form.model || !form.price) {
      setError("Todos los campos son requeridos");
      return;
    }

    try {
      const phoneData = {
        _id: null, // igual que en evento
        brand: form.brand.trim(),
        model: form.model.trim(),
        price: parseFloat(form.price), // Asegurarse de que price sea número
      };

      console.log("Enviando teléfono al backend:", phoneData);

      await phoneService.create(phoneData);
      navigate("/phones"); // redirige al listado de teléfonos
    } catch (err) {
      console.error("Error creando teléfono:", err);
      setError(err.message || "Error al crear teléfono");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Teléfono</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Marca*</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Modelo*</label>
          <input
            type="text"
            name="model"
            value={form.model}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Precio*</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Crear Teléfono
        </button>
      </form>
    </div>
  );
}
