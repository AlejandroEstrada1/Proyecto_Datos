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

function ListaPedidosPriorizados({ pedidos }) {
  return (
    <section className="priority-list-panel">
      <div className="module-heading">
        <span>Agenda</span>
        <h2>Orden recomendado</h2>
      </div>

      {pedidos.length ? (
        <div className="priority-list">
          {pedidos.map((order, index) => (
            <article className="priority-row" key={order.id}>
              <span className="priority-index">{index + 1}</span>
              <div>
                <strong>{order.orderCode}</strong>
                <p>{order.customerName}</p>
                <p>{order.productName}</p>
              </div>
              <span
                className={`priority-pill ${
                  priorityClassNames[order.priority] ??
                  priorityClassNames[ORDER_PRIORITY.normal]
                }`}
              >
                {ORDER_PRIORITY_LABELS[order.priority] ??
                  ORDER_PRIORITY_LABELS[ORDER_PRIORITY.normal]}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <p className="empty-state">Los pedidos pendientes apareceran aqui.</p>
      )}
    </section>
  );
}

export default ListaPedidosPriorizados;
