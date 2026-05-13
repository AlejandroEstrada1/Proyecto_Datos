function PanelRutaOptima({
  nodos,
  destinoSeleccionado,
  setDestinoSeleccionado,
  rutaTexto,
  rutaSeleccionada,
}) {
  const clientes = nodos.filter((nodo) => nodo.tipo === "cliente");

  return (
    <section className="panel-ruta-optima">
      <h3>Ruta óptima desde bodega</h3>

      <label htmlFor="destino">Seleccionar destino</label>

      <select
        id="destino"
        value={destinoSeleccionado}
        onChange={(evento) => setDestinoSeleccionado(evento.target.value)}
      >
        {clientes.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre}
          </option>
        ))}
      </select>

      <div className="resultado-ruta">
        <p>
          <strong>Ruta:</strong> {rutaTexto}
        </p>

        <p>
          <strong>Tiempo total:</strong>{" "}
          {rutaSeleccionada.distancia === Infinity
            ? "No disponible"
            : `${rutaSeleccionada.distancia} min`}
        </p>
      </div>
    </section>
  );
}

export default PanelRutaOptima;