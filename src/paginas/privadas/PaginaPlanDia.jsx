import EncabezadoPagina from "../../componentes/layout/EncabezadoPagina.jsx";
import ListaPedidosPriorizados from "../../modulos/planDia/componentes/ListaPedidosPriorizados.jsx";
import PanelPedidoPrioritario from "../../modulos/planDia/componentes/PanelPedidoPrioritario.jsx";
import ResumenPlanDia from "../../modulos/planDia/componentes/ResumenPlanDia.jsx";
import { usePlanDia } from "../../modulos/planDia/hooks/usePlanDia.js";

function PaginaPlanDia() {
  const {
    error,
    loading,
    pedidosPriorizados,
    procesarPedidoPrioritario,
    resumen,
    saving,
    siguientePedido,
  } = usePlanDia();

  return (
    <div className="daily-plan-page">
      <EncabezadoPagina
        eyebrow="Plan del dia"
        title="Priorizacion diaria"
        description="Pedidos pendientes ordenados con Heap/Priority Queue segun urgencia, fecha requerida y entrada a la cola."
      />

      <ResumenPlanDia resumen={resumen} />

      {error ? <p className="module-alert">{error}</p> : null}

      <section className="daily-plan-workspace">
        <PanelPedidoPrioritario
          isSaving={saving}
          onProcess={procesarPedidoPrioritario}
          order={siguientePedido}
        />

        {loading ? (
          <section className="priority-list-panel">
            <p className="empty-state">Cargando pedidos pendientes...</p>
          </section>
        ) : (
          <ListaPedidosPriorizados pedidos={pedidosPriorizados} />
        )}
      </section>
    </div>
  );
}

export default PaginaPlanDia;
