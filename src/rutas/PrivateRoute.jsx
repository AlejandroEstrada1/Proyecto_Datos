import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const modoVistaPrevia = import.meta.env.VITE_ENABLE_ROUTE_PREVIEW !== "false";

  if (!modoVistaPrevia) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;