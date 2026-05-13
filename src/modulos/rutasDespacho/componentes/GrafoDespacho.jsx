import NodoRuta from "./NodoRuta";

function GrafoDespacho({ nodos, conexiones }) {
  const obtenerNodoPorId = (id) => {
    return nodos.find((nodo) => nodo.id === id);
  };

  return (
    <section className="contenedor-grafo">
      <h2>Mapa de rutas de despacho</h2>

      <div className="area-grafo">
        <svg className="svg-rutas" viewBox="0 0 100 100" preserveAspectRatio="none">
          {conexiones.map((conexion) => {
            const origen = obtenerNodoPorId(conexion.origen);
            const destino = obtenerNodoPorId(conexion.destino);

            if (!origen || !destino) {
              return null;
            }

            const medioX = (origen.x + destino.x) / 2;
            const medioY = (origen.y + destino.y) / 2;

            return (
              <g key={`${conexion.origen}-${conexion.destino}`}>
                <line
                  x1={origen.x}
                  y1={origen.y}
                  x2={destino.x}
                  y2={destino.y}
                  className="linea-ruta"
                />

                <text
                  x={medioX}
                  y={medioY}
                  className="texto-peso-ruta"
                  textAnchor="middle"
                >
                  {conexion.peso} min
                </text>
              </g>
            );
          })}
        </svg>

        {nodos.map((nodo) => (
          <NodoRuta key={nodo.id} nodo={nodo} />
        ))}
      </div>

      <p className="descripcion-grafo">
        Las rutas de despacho se modelan mediante grafos ponderados. Cada nodo
        representa una ubicación y cada arista representa el tiempo de
        desplazamiento entre dos puntos.
      </p>
    </section>
  );
}

export default GrafoDespacho;