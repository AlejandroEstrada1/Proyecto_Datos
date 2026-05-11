import { Outlet } from "react-router-dom";

function PlantillaPublica() {
  return (
    <main className="public-layout">
      <section className="auth-panel" aria-label="Acceso al sistema">
        <div className="brand-block">
          <span className="brand-mark">SGE</span>
          <div>
            <p className="brand-kicker">Sistema de Gestion de Estibas</p>
            <h1>Operacion diaria de pedidos, inventario y despachos</h1>
          </div>
        </div>
        <Outlet />
      </section>
    </main>
  );
}

export default PlantillaPublica;
