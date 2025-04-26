const API_URL = "http://127.0.0.1:8000/products";

export default {
  async create(product) {
    // Prepara los datos para el backend
    const productData = {
      ...product,
      created_at: product.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al crear producto");
    }

    const result = await response.json();
    console.log("Producto creado:", result); // Debug
    return result;
  },

  async list() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Error al cargar productos");
    }
    const products = await response.json();
    console.log("Productos recibidos:", products); // Debug
    return products;
  },
};
