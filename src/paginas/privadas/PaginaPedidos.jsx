import { useMemo, useState } from "react";
import EncabezadoPagina from "../../componentes/layout/EncabezadoPagina.jsx";
import FormularioPedido from "../../modulos/pedidos/componentes/FormularioPedido.jsx";
import PanelColaPedidos from "../../modulos/pedidos/componentes/PanelColaPedidos.jsx";
import TablaPedidos from "../../modulos/pedidos/componentes/TablaPedidos.jsx";
import { usePedidos } from "../../modulos/pedidos/hooks/usePedidos.js";
import { ORDER_STATUS } from "../../modulos/pedidos/services/servicioPedidos.js";
import { useAutenticacion } from "../../contexto/ContextoAutenticacion.jsx";

function PaginaPedidos() {
  const { user } = useAutenticacion();
  const {
    createOrder,
    deleteOrder,
    error,
    loading,
    orders,
    colaPendientes,
    saving,
    updateOrder,
    updateOrderStatus,
  } = usePedidos(user);
  const [editingOrder, setEditingOrder] = useState(null);

  const metrics = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((order) => order.status === ORDER_STATUS.pending).length,
      inProgress: orders.filter((order) => order.status === ORDER_STATUS.inProgress)
        .length,
      dispatched: orders.filter((order) => order.status === ORDER_STATUS.dispatched)
        .length,
    }),
    [orders]
  );

  async function handleSubmit(orderData) {
    if (editingOrder) {
      await updateOrder(editingOrder.id, orderData);
      setEditingOrder(null);
      return;
    }

    await createOrder(orderData);
  }

  async function handleProcessNext(order) {
    await updateOrderStatus(order.id, ORDER_STATUS.inProgress);
  }

  async function handleDelete(order) {
    const shouldDelete = window.confirm(
      `Eliminar el pedido ${order.orderCode}? Esta accion no se puede deshacer.`
    );

    if (shouldDelete) {
      await deleteOrder(order.id);
      if (editingOrder?.id === order.id) {
        setEditingOrder(null);
      }
    }
  }

  return (
    <div className="orders-page">
      <EncabezadoPagina
        eyebrow="Pedidos"
        title="Gestion de pedidos"
        description="CRUD conectado a Firestore con flujo FIFO mediante Cola para atender pedidos pendientes."
      />

      <section className="orders-summary" aria-label="Resumen de pedidos">
        <article className="metric-card">
          <span>Total</span>
          <strong>{metrics.total}</strong>
        </article>
        <article className="metric-card">
          <span>Pendientes</span>
          <strong>{metrics.pending}</strong>
        </article>
        <article className="metric-card">
          <span>En proceso</span>
          <strong>{metrics.inProgress}</strong>
        </article>
        <article className="metric-card">
          <span>Despachados</span>
          <strong>{metrics.dispatched}</strong>
        </article>
      </section>

      {error ? <p className="module-alert">{error}</p> : null}

      <section className="orders-workspace">
        <FormularioPedido
          editingOrder={editingOrder}
          isSaving={saving}
          onCancelEdit={() => setEditingOrder(null)}
          onSubmit={handleSubmit}
        />

        <div className="orders-stack">
          <PanelColaPedidos
            isSaving={saving}
            onProcessNext={handleProcessNext}
            cola={colaPendientes}
          />

          {loading ? (
            <section className="orders-panel">
              <p className="empty-state">Cargando pedidos desde Firestore...</p>
            </section>
          ) : (
            <TablaPedidos
              isSaving={saving}
              onDelete={handleDelete}
              onEdit={setEditingOrder}
              onStatusChange={updateOrderStatus}
              orders={orders}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default PaginaPedidos;
