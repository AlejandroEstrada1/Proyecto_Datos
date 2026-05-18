const ACTION_LABELS = {
  crear: "Crear producto",
  actualizar: "Actualizar producto",
  eliminar: "Eliminar producto",
};

function PanelDeshacerInventario({
  accionParaDeshacer,
  isSaving,
  onUndo,
  totalAccionesDeshacer,
}) {
  return (
    <section className="inventory-undo-panel" aria-label="Pila de acciones de inventario">
      <div className="module-heading">
        <span>Pila LIFO</span>
        <h2>Deshacer inventario</h2>
      </div>

      {accionParaDeshacer ? (
        <div className="undo-action">
          <span>Ultima accion</span>
          <strong>
            {ACTION_LABELS[accionParaDeshacer.type]}: {accionParaDeshacer.label}
          </strong>
          <p>{totalAccionesDeshacer} accion(es) disponibles en la pila.</p>
        </div>
      ) : (
        <p className="empty-state">La pila guardara cambios de inventario para revertirlos.</p>
      )}

      <button
        className="secondary-button undo-button"
        disabled={isSaving || !accionParaDeshacer}
        onClick={onUndo}
        type="button"
      >
        Deshacer ultima accion
      </button>
    </section>
  );
}

export default PanelDeshacerInventario;
