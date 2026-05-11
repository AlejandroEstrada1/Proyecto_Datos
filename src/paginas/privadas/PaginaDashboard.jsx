import TarjetaMarcador from "../../componentes/comunes/TarjetaMarcador.jsx";
import EncabezadoPagina from "../../componentes/layout/EncabezadoPagina.jsx";

function PaginaDashboard() {
  return (
    <>
      <EncabezadoPagina
        eyebrow="Dashboard"
        title="Panel operativo"
        description="Vista base para consultar pedidos e inventario dentro del alcance actual del sistema."
      />

      <section className="placeholder-grid">
        <TarjetaMarcador title="Pedidos">Modulo conectado a Firestore con cola FIFO para pedidos pendientes.</TarjetaMarcador>
        <TarjetaMarcador title="Inventario">Modulo conectado a Firestore en tiempo real con busqueda Arbol Trie.</TarjetaMarcador>
      </section>
    </>
  );
}

export default PaginaDashboard;
