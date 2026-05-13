import PanelPlanDia from "../../modulos/planDia/componentes/PanelPlanDia";
import { usePlanDia } from "../../modulos/planDia/hooks/usePlanDia";
import "../../estilos/planDia.css";

function PaginaPlanDia() {
  const { pedidosPriorizados, historialProcesados, procesarSiguiente } =
    usePlanDia();

  return (
    <main className="pagina-plan-dia">
      <header className="encabezado-vista">
        <h1>Sistema de Gestión de Estibas</h1>
        <p>Plan del día</p>
      </header>

      <PanelPlanDia
        pedidos={pedidosPriorizados}
        procesarSiguiente={procesarSiguiente}
      />

      {historialProcesados.length > 0 && (
        <section className="historial-plan-dia">
          <h3>Pedidos procesados</h3>

          {historialProcesados.map((pedido) => (
            <p key={pedido.id}>
              {pedido.codigo} - {pedido.cliente} - {pedido.estado}
            </p>
          ))}
        </section>
      )}
    </main>
  );
}

export default PaginaPlanDia;