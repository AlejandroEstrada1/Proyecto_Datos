import { Outlet } from "react-router-dom";
import MenuLateral from "./MenuLateral";
import "../../estilos/layout.css";

function LayoutPrivado() {
  return (
    <div className="layout-privado">
      <MenuLateral />

      <section className="contenido-privado">
        <Outlet />
      </section>
    </div>
  );
}

export default LayoutPrivado;