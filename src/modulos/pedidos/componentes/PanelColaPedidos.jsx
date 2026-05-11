import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
} from "../services/servicioPedidos.js";

function PanelColaPedidos({ cola, isSaving, onProcessNext }) {
  const nextOrder = cola.primero();
  const queuedOrders = cola.aArreglo();

  return (
    <section className="queue-panel" aria-label="Cola de pedidos pendientes">
      <div className="module-heading">
        <span>Cola FIFO</span>
        <h2>Flujo FIFO de pedidos</h2>
      </div>

      <div className="queue-next">
        <span>Siguiente pedido</span>
        {nextOrder ? (
          <>
            <strong>{nextOrder.orderCode}</strong>
            <p>
              {nextOrder.customerName} · {nextOrder.productName} ·{" "}
              {nextOrder.quantity} unidades
            </p>
            <button
              disabled={isSaving}
              onClick={() => onProcessNext(nextOrder)}
              type="button"
            >
              Tomar siguiente pedido
            </button>
          </>
        ) : (
          <p>No hay pedidos pendientes en cola.</p>
        )}
      </div>

      <div className="queue-list">
        <div className="queue-list-header">
          <strong>Pedidos en cola</strong>
          <span>{cola.tamano()}</span>
        </div>

        {queuedOrders.length ? (
          queuedOrders.map((order, index) => (
            <div className="queue-row" key={order.id}>
              <span>{index + 1}</span>
              <div>
                <strong>{order.orderCode}</strong>
                <p>
                  {order.customerName} · {ORDER_STATUS_LABELS[ORDER_STATUS.pending]}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-state">La cola se llena con pedidos pendientes.</p>
        )}
      </div>
    </section>
  );
}

export default PanelColaPedidos;
