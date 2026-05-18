import {
  ORDER_PRIORITY,
  ORDER_PRIORITY_LABELS,
} from "../../pedidos/services/servicioPedidos.js";

const priorityClassNames = {
  [ORDER_PRIORITY.low]: "priority-low",
  [ORDER_PRIORITY.normal]: "priority-normal",
  [ORDER_PRIORITY.high]: "priority-high",
  [ORDER_PRIORITY.urgent]: "priority-urgent",
};

function formatDate(dateValue) {
  if (!dateValue) {
    return "Sin fecha";
  }

  return new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

function PanelPedidoPrioritario({ isSaving, onProcess, order }) {
  return (
    <section className="priority-panel" aria-label="Pedido prioritario">
      <div className="module-heading">
        <span>Heap</span>
        <h2>Pedido mas importante</h2>
      </div>

      {order ? (
        <div className="priority-next">
          <div>
            <span
              className={`priority-pill ${
                priorityClassNames[order.priority] ??
                priorityClassNames[ORDER_PRIORITY.normal]
              }`}
            >
              {ORDER_PRIORITY_LABELS[order.priority] ??
                ORDER_PRIORITY_LABELS[ORDER_PRIORITY.normal]}
            </span>
          </div>
          <strong>{order.orderCode}</strong>
          <p>{order.customerName}</p>
          <p>
            {order.productName} - {order.quantity} unidades -{" "}
            {formatDate(order.deliveryDate)}
          </p>
          <button disabled={isSaving} onClick={() => onProcess(order)} type="button">
            Mover a En proceso
          </button>
        </div>
      ) : (
        <p className="empty-state">No hay pedidos pendientes para priorizar.</p>
      )}
    </section>
  );
}

export default PanelPedidoPrioritario;
