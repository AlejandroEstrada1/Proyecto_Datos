import EncabezadoPagina from "../../componentes/layout/EncabezadoPagina.jsx";
import GrafoDespacho from "../../modulos/rutasDespacho/componentes/GrafoDespacho.jsx";
import PanelRutaOptima from "../../modulos/rutasDespacho/componentes/PanelRutaOptima.jsx";
import { useRutasDespacho } from "../../modulos/rutasDespacho/hooks/useRutasDespacho.js";

function PaginaRutasDespacho() {
  const {
    destinos,
    destinoSeleccionado,
    mapa,
    rutaOptima,
    setDestinoSeleccionado,
  } = useRutasDespacho();

  return (
    <div className="dispatch-route-page">
      <EncabezadoPagina
        eyebrow="Rutas de despacho"
        title="Optimizacion de transporte"
        description="Grafo ponderado para calcular la ruta mas corta desde bodega hasta clientes de despacho."
      />

      <section className="dispatch-route-workspace">
        <PanelRutaOptima
          destinoSeleccionado={destinoSeleccionado}
          destinos={destinos}
          onDestinoSeleccionado={setDestinoSeleccionado}
          rutaOptima={rutaOptima}
        />

        <GrafoDespacho
          destinoSeleccionado={destinoSeleccionado}
          mapa={mapa}
          onDestinoSeleccionado={setDestinoSeleccionado}
          rutaOptima={rutaOptima}
        />
      </section>
    </div>
  );
}

export default PaginaRutasDespacho;
