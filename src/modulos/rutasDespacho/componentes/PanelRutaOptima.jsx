function PanelRutaOptima({
  destinoSeleccionado,
  destinos,
  onDestinoSeleccionado,
  rutaOptima,
}) {
  return (
    <section className="route-result-panel">
      <div className="module-heading">
        <span>Dijkstra</span>
        <h2>Ruta optima</h2>
      </div>

      <label className="route-select">
        Destino
        <select
          onChange={(event) => onDestinoSeleccionado(event.target.value)}
          value={destinoSeleccionado}
        >
          {destinos.map((destino) => (
            <option key={destino.id} value={destino.id}>
              {destino.nombre}
            </option>
          ))}
        </select>
      </label>

      <div className="route-distance">
        <span>Distancia estimada</span>
        <strong>{rutaOptima.distancia} km</strong>
      </div>

      <div className="route-path">
        <strong>Secuencia</strong>
        <p>{rutaOptima.puntos.map((punto) => punto.nombre).join(" - ")}</p>
      </div>

      <div className="route-legs">
        <strong>Tramos</strong>
        {rutaOptima.tramos.map((tramo) => (
          <p key={`${tramo.origen}-${tramo.destino}`}>
            {tramo.origenNodo.nombre} - {tramo.destinoNodo.nombre}: {tramo.peso} km
          </p>
        ))}
      </div>
    </section>
  );
}

export default PanelRutaOptima;
