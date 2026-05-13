import TarjetaPedidoPlan from "./TarjetaPedidoPlan";

function PanelPlanDia({ pedidos, procesarSiguiente }) {
  return (
    <section className="panel-plan-dia">
      <h2>Pedidos priorizados para despacho</h2>

      <div className="lista-pedidos-plan">
        {pedidos.length > 0 ? (
          pedidos.map((pedido) => (
            <TarjetaPedidoPlan key={pedido.id} pedido={pedido} />
          ))
        ) : (
          <p className="mensaje-vacio">No hay pedidos pendientes para despacho.</p>
        )}
      </div>

      <button
        className="boton-procesar"
        type="button"
        onClick={procesarSiguiente}
        disabled={pedidos.length === 0}
      >
        Procesar siguiente pedido
      </button>
    </section>
  );
}

export default PanelPlanDia;