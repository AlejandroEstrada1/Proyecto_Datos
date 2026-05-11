import {
  STOCK_STATUS,
  STOCK_STATUS_LABELS,
} from "../services/servicioInventario.js";

const statusClassNames = {
  [STOCK_STATUS.available]: "status-available",
  [STOCK_STATUS.low]: "status-low",
  [STOCK_STATUS.out]: "status-out",
};

function TablaInventario({ isSaving, items, onDelete, onEdit }) {
  if (!items.length) {
    return (
      <section className="inventory-panel">
        <div className="module-heading">
          <span>Listado</span>
          <h2>Productos en inventario</h2>
        </div>
        <p className="empty-state">No hay productos que coincidan con la busqueda.</p>
      </section>
    );
  }

  return (
    <section className="inventory-panel">
      <div className="module-heading">
        <span>Listado</span>
        <h2>Productos en inventario</h2>
      </div>

      <div className="table-scroll">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Categoria</th>
              <th>Stock</th>
              <th>Minimo</th>
              <th>Ubicacion</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.sku}</strong>
                </td>
                <td>{item.productName}</td>
                <td>{item.category}</td>
                <td>
                  {item.stock} {item.unit}
                </td>
                <td>
                  {item.minStock} {item.unit}
                </td>
                <td>{item.location}</td>
                <td>
                  <span className={`stock-pill ${statusClassNames[item.status]}`}>
                    {STOCK_STATUS_LABELS[item.status]}
                  </span>
                </td>
                <td>
                  <div className="inline-actions">
                    <button
                      className="secondary-button"
                      disabled={isSaving}
                      onClick={() => onEdit(item)}
                      type="button"
                    >
                      Editar
                    </button>
                    <button
                      className="danger-button"
                      disabled={isSaving}
                      onClick={() => onDelete(item)}
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

export default TablaInventario;
