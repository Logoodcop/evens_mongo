import React, { useEffect, useState } from "react";
import phoneService from "../api/phoneService";

function PhonePage() {
  const [phones, setPhones] = useState([]);
  const [newPhone, setNewPhone] = useState({
    id: "",
    brand: "",
    model: "",
    description: "",
  });

  useEffect(() => {
    loadPhones();
  }, []);

  async function loadPhones() {
    const data = await phoneService.list();
    setPhones(data);
  }

  async function handleCreate() {
    await phoneService.create(newPhone);
    setNewPhone({ id: "", brand: "", model: "", description: "" });
    loadPhones();
  }

  async function handleDelete(id) {
    await phoneService.delete(id);
    loadPhones();
  }

  return (
    <div>
      <h1>Teléfonos</h1>

      <input
        type="text"
        placeholder="ID"
        value={newPhone.id}
        onChange={(e) => setNewPhone({ ...newPhone, id: e.target.value })}
      />
      <input
        type="text"
        placeholder="Marca"
        value={newPhone.brand}
        onChange={(e) => setNewPhone({ ...newPhone, brand: e.target.value })}
      />
      <input
        type="text"
        placeholder="Modelo"
        value={newPhone.model}
        onChange={(e) => setNewPhone({ ...newPhone, model: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={newPhone.description}
        onChange={(e) =>
          setNewPhone({ ...newPhone, description: e.target.value })
        }
      />
      <button onClick={handleCreate}>Crear Teléfono</button>

      <ul>
        {phones.map((phone) => (
          <li key={phone.id}>
            {phone.brand} {phone.model} - {phone.description}
            <button onClick={() => handleDelete(phone.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PhonePage;
