import GrafoDespacho from "../../modulos/rutasDespacho/componentes/GrafoDespacho";
import PanelRutaOptima from "../../modulos/rutasDespacho/componentes/PanelRutaOptima";
import { useRutasDespacho } from "../../modulos/rutasDespacho/hooks/useRutasDespacho";
import "../../estilos/rutasDespacho.css";

function PaginaRutasDespacho() {
  const {
    nodos,
    conexiones,
    destinoSeleccionado,
    setDestinoSeleccionado,
    rutaSeleccionada,
    rutaTexto,
  } = useRutasDespacho();

  return (
    <main className="pagina-rutas-despacho">
      <header className="encabezado-vista">
        <h1>Sistema de Gestión de Estibas</h1>
        <p>Rutas de Despacho</p>
      </header>

      <GrafoDespacho nodos={nodos} conexiones={conexiones} />

      <PanelRutaOptima
        nodos={nodos}
        destinoSeleccionado={destinoSeleccionado}
        setDestinoSeleccionado={setDestinoSeleccionado}
        rutaSeleccionada={rutaSeleccionada}
        rutaTexto={rutaTexto}
      />
    </main>
  );
}

export default PaginaRutasDespacho;