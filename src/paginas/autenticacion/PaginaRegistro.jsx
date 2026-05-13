import { Link } from "react-router-dom";

function PaginaRegistro() {
  return (
    <main className="pagina-autenticacion">
      <section className="tarjeta-autenticacion">
        <h1>Sistema de Gestión de Estibas</h1>
        <p>Registro de usuario</p>

        <input type="text" placeholder="Nombre completo" />
        <input type="email" placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />

        <Link className="boton-principal" to="/plan-dia">
          Registrarse
        </Link>

        <Link className="enlace-secundario" to="/login">
          Ya tengo cuenta
        </Link>
      </section>
    </main>
  );
}

export default PaginaRegistro;