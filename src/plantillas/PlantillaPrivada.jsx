import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAutenticacion } from "../contexto/ContextoAutenticacion.jsx";

const navItems = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/pedidos", label: "Pedidos" },
  { to: "/app/inventario", label: "Inventario" },
  { to: "/app/plan-dia", label: "Plan del dia" },
  { to: "/app/rutas-despacho", label: "Rutas" },
];

function PlantillaPrivada() {
  const navigate = useNavigate();
  const { authActionLoading, signOut, user } = useAutenticacion();
  const userName = user?.displayName || user?.email || "Usuario";

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-layout">
      <aside className="sidebar" aria-label="Navegacion principal">
        <div className="sidebar-brand">
          <span className="brand-mark">SGE</span>
          <div>
            <strong>Estibas</strong>
            <span>Gestion operativa</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <span>Sesion activa</span>
            <strong>{userName}</strong>
          </div>
          <button
            className="logout-button"
            disabled={authActionLoading}
            onClick={handleSignOut}
            type="button"
          >
            {authActionLoading ? "Cerrando..." : "Cerrar sesion"}
          </button>
        </div>
      </aside>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
}

export default PlantillaPrivada;
