import { Link } from "react-router-dom";

function PaginaNoEncontrada() {
  return (
    <main className="route-state">
      <h1>Ruta no encontrada</h1>
      <p>La pagina solicitada no existe en el sistema.</p>
      <Link to="/login">Volver al acceso</Link>
    </main>
  );
}

export default PaginaNoEncontrada;
