import { Navigate, Route, Routes } from "react-router-dom";

import LayoutPrivado from "../componentes/layout/LayoutPrivado";
import PrivateRoute from "./PrivateRoute";

import PaginaDashboard from "../paginas/privadas/PaginaDashboard";
import PaginaPedidos from "../paginas/privadas/PaginaPedidos";
import PaginaInventario from "../paginas/privadas/PaginaInventario";
import PaginaPlanDia from "../paginas/privadas/PaginaPlanDia";
import PaginaRutasDespacho from "../paginas/privadas/PaginaRutasDespacho";

import PaginaLogin from "../paginas/autenticacion/PaginaLogin";
import PaginaRegistro from "../paginas/autenticacion/PaginaRegistro";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/plan-dia" replace />} />

      <Route path="/login" element={<PaginaLogin />} />
      <Route path="/registro" element={<PaginaRegistro />} />

      <Route
        element={
          <PrivateRoute>
            <LayoutPrivado />
          </PrivateRoute>
        }
      >
        <Route path="/dashboard" element={<PaginaDashboard />} />
        <Route path="/pedidos" element={<PaginaPedidos />} />
        <Route path="/inventario" element={<PaginaInventario />} />
        <Route path="/plan-dia" element={<PaginaPlanDia />} />
        <Route path="/rutas-despacho" element={<PaginaRutasDespacho />} />
      </Route>

      <Route path="*" element={<Navigate to="/plan-dia" replace />} />
    </Routes>
  );
}

export default AppRoutes;