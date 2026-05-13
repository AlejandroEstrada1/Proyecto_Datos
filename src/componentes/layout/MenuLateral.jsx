import { NavLink } from "react-router-dom";

function MenuLateral() {
  return (
    <aside className="menu-lateral">
      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/pedidos">Pedidos</NavLink>
        <NavLink to="/inventario">Inventario</NavLink>
        <NavLink to="/plan-dia">Plan del día</NavLink>
        <NavLink to="/rutas-despacho">Rutas de Despacho</NavLink>
      </nav>
    </aside>
  );
}

export default MenuLateral;