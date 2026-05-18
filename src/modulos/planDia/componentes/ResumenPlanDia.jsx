function ResumenPlanDia({ resumen }) {
  return (
    <section className="daily-plan-summary" aria-label="Resumen del plan del dia">
      <article className="metric-card">
        <span>Pendientes</span>
        <strong>{resumen.totalPendientes}</strong>
      </article>
      <article className="metric-card">
        <span>Urgentes</span>
        <strong>{resumen.urgentes}</strong>
      </article>
      <article className="metric-card">
        <span>Alta prioridad</span>
        <strong>{resumen.altaPrioridad}</strong>
      </article>
      <article className="metric-card">
        <span>En proceso</span>
        <strong>{resumen.listosParaDespacho}</strong>
      </article>
    </section>
  );
}

export default ResumenPlanDia;
