import {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
} from "../services/servicioPedidos.js";

const statusOptions = Object.values(ORDER_STATUS);

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

function TablaPedidos({ isSaving, onDelete, onEdit, onStatusChange, orders }) {
  if (!orders.length) {
    return (
      <section className="orders-panel">
        <div className="module-heading">
          <span>Listado</span>
          <h2>Pedidos registrados</h2>
        </div>
        <p className="empty-state">Aun no hay pedidos registrados.</p>
      </section>
    );
  }

  return (
    <section className="orders-panel">
      <div className="module-heading">
        <span>Listado</span>
        <h2>Pedidos registrados</h2>
      </div>

      <div className="table-scroll">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Destino</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>
                  <strong>{order.orderCode}</strong>
                </td>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.destination}</td>
                <td>{formatDate(order.deliveryDate)}</td>
                <td>
                  <select
                    className="status-select"
                    disabled={isSaving}
                    onChange={(event) => onStatusChange(order.id, event.target.value)}
                    value={order.status}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {ORDER_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="inline-actions">
                    <button
                      className="secondary-button"
                      disabled={isSaving}
                      onClick={() => onEdit(order)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="danger-button"
                      disabled={isSaving}
                      onClick={() => onDelete(order)}
                      type="button"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TablaPedidos;
