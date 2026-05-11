import { Navigate, Route, Routes } from "react-router-dom";
import PlantillaPublica from "../plantillas/PlantillaPublica.jsx";
import PlantillaPrivada from "../plantillas/PlantillaPrivada.jsx";
import RutaProtegida from "./RutaProtegida.jsx";
import PaginaLogin from "../paginas/autenticacion/PaginaLogin.jsx";
import PaginaRegistro from "../paginas/autenticacion/PaginaRegistro.jsx";
import PaginaDashboard from "../paginas/privadas/PaginaDashboard.jsx";
import PaginaPedidos from "../paginas/privadas/PaginaPedidos.jsx";
import PaginaInventario from "../paginas/privadas/PaginaInventario.jsx";
import PaginaNoEncontrada from "../paginas/PaginaNoEncontrada.jsx";

function RutasAplicacion() {
  return (
    <Routes>
      <Route element={<PlantillaPublica />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
      </Route>

      <Route element={<RutaProtegida />}>
        <Route path="/app" element={<PlantillaPrivada />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<PaginaDashboard />} />
          <Route path="pedidos" element={<PaginaPedidos />} />
          <Route path="inventario" element={<PaginaInventario />} />
        </Route>
      </Route>

      <Route path="*" element={<PaginaNoEncontrada />} />
    </Routes>
  );
}

export default RutasAplicacion;
