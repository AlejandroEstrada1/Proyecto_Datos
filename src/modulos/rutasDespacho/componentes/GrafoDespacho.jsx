import LineaRuta from "./LineaRuta.jsx";
import NodoRuta from "./NodoRuta.jsx";

function getEdgeKey(origen, destino) {
  return [origen, destino].sort().join("-");
}

function GrafoDespacho({
  destinoSeleccionado,
  mapa,
  onDestinoSeleccionado,
  rutaOptima,
}) {
  const nodeById = new Map(mapa.nodos.map((nodo) => [nodo.id, nodo]));
  const activeNodes = new Set(rutaOptima.nodos);
  const activeEdges = new Set(
    rutaOptima.tramos.map((tramo) => getEdgeKey(tramo.origen, tramo.destino))
  );

  return (
    <section className="route-map-panel" aria-label="Grafo de rutas de despacho">
      <div className="module-heading">
        <span>Grafo</span>
        <h2>Red de despacho</h2>
      </div>

      <div className="route-canvas">
        {mapa.aristas.map((arista) => (
          <LineaRuta
            activa={activeEdges.has(getEdgeKey(arista.origen, arista.destino))}
            destino={nodeById.get(arista.destino)}
            key={getEdgeKey(arista.origen, arista.destino)}
            origen={nodeById.get(arista.origen)}
            peso={arista.peso}
            via={arista.via}
          />
        ))}

        {mapa.nodos.map((nodo) => (
          <NodoRuta
            activo={activeNodes.has(nodo.id)}
            esDestino={nodo.id === destinoSeleccionado}
            esOrigen={nodo.id === mapa.origenId}
            key={nodo.id}
            nodo={nodo}
            onSelect={onDestinoSeleccionado}
          />
        ))}
      </div>
    </section>
  );
}

export default GrafoDespacho;
