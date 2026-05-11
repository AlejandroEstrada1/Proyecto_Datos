import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ProveedorAutenticacion } from "./contexto/ContextoAutenticacion.jsx";
import "./estilos/variables.css";
import "./estilos/base.css";
import "./estilos/diseno.css";
import "./estilos/pedidos.css";
import "./estilos/inventario.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProveedorAutenticacion>
        <App />
      </ProveedorAutenticacion>
    </BrowserRouter>
  </React.StrictMode>
);
