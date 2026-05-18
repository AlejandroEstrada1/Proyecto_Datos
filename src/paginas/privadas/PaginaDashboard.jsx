import TarjetaMarcador from "../../componentes/comunes/TarjetaMarcador.jsx";
import EncabezadoPagina from "../../componentes/layout/EncabezadoPagina.jsx";

function PaginaDashboard() {
  return (
    <>
      <EncabezadoPagina
        eyebrow="Dashboard"
        title="Panel operativo"
        description="Vista general del Sistema de Gestion de Estibas con pedidos, inventario, plan diario y rutas de despacho."
      />

      <section className="placeholder-grid">
        <TarjetaMarcador title="Pedidos">Modulo conectado a Firestore con cola FIFO para pedidos pendientes.</TarjetaMarcador>
        <TarjetaMarcador title="Inventario">Inventario en tiempo real con busqueda Arbol Trie y Pila para deshacer.</TarjetaMarcador>
        <TarjetaMarcador title="Plan del dia">Priorizacion con Heap para escoger pedidos urgentes primero.</TarjetaMarcador>
        <TarjetaMarcador title="Rutas">Grafo ponderado para optimizar recorridos de despacho.</TarjetaMarcador>
      </section>
    </>
  );
}

export default PaginaDashboard;
