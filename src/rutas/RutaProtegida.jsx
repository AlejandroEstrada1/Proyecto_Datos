import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAutenticacion } from "../contexto/ContextoAutenticacion.jsx";

function RutaProtegida() {
  const { isAuthenticated, loading } = useAutenticacion();
  const location = useLocation();

  if (loading) {
    return <div className="route-state">Cargando...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}

export default RutaProtegida;
