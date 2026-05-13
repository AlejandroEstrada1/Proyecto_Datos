import { Link } from "react-router-dom";

function PaginaLogin() {
  return (
    <main className="pagina-autenticacion">
      <section className="tarjeta-autenticacion">
        <h1>Sistema de Gestión de Estibas</h1>
        <p>Inicio de sesión</p>

        <input type="email" placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />

        <Link className="boton-principal" to="/plan-dia">
          Ingresar
        </Link>

        <Link className="enlace-secundario" to="/registro">
          Crear cuenta
        </Link>
      </section>
    </main>
  );
}

export default PaginaLogin;