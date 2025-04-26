import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import PhoneHome from "./pages/PhoneHome"; // ✅ Lista de teléfonos
import CreatePhone from "./pages/CreatePhone"; // ✅ Crear nuevo teléfono

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white p-4 shadow mb-6 flex gap-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Eventos
        </Link>
        <Link to="/create" className="text-blue-600 hover:underline">
          Crear Evento
        </Link>
        <Link to="/phones" className="text-green-600 hover:underline">
          Teléfonos
        </Link>
        <Link to="/phones/new" className="text-green-600 hover:underline">
          Crear Teléfono
        </Link>
      </nav>

      <div className="px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/phones" element={<PhoneHome />} />
          <Route path="/phones/new" element={<CreatePhone />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
