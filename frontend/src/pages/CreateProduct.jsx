import React, { useState } from "react";
import productService from "../api/productService";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock_quantity: "",
    image_url: "",
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

    // Validación básica
    if (!form.name || !form.price || !form.category || !form.stock_quantity) {
      setError("Nombre, precio, categoría y cantidad son requeridos");
      return;
    }

    try {
      // Prepara los datos para el backend
      const productData = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: parseFloat(form.price),
        category: form.category.trim(),
        stock_quantity: parseInt(form.stock_quantity),
        image_url: form.image_url.trim() || null,
      };

      console.log("Enviando producto:", productData);
      await productService.create(productData);

      // Éxito: redirigir
      navigate("/products");
    } catch (err) {
      console.error("Error creando producto:", err);
      setError(err.message || "Error al crear producto");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Producto</h2>

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
            <label className="block mb-1">Precio*</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Cantidad en Stock*</label>
            <input
              type="number"
              min="0"
              name="stock_quantity"
              value={form.stock_quantity}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Categoría*</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">URL de Imagen</label>
          <input
            type="url"
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Crear Producto
        </button>
      </form>
    </div>
  );
}
