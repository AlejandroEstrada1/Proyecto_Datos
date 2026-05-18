import { useState } from "react";
import EncabezadoPagina from "../../componentes/layout/EncabezadoPagina.jsx";
import FormularioInventario from "../../modulos/inventario/componentes/FormularioInventario.jsx";
import BusquedaInventario from "../../modulos/inventario/componentes/BusquedaInventario.jsx";
import PanelDeshacerInventario from "../../modulos/inventario/componentes/PanelDeshacerInventario.jsx";
import TablaInventario from "../../modulos/inventario/componentes/TablaInventario.jsx";
import { useInventario } from "../../modulos/inventario/hooks/useInventario.js";
import { useAutenticacion } from "../../contexto/ContextoAutenticacion.jsx";

function PaginaInventario() {
  const { user } = useAutenticacion();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const {
    accionParaDeshacer,
    createInventoryItem,
    deleteInventoryItem,
    error,
    filteredItems,
    loading,
    metrics,
    saving,
    suggestions,
    totalAccionesDeshacer,
    undoLastInventoryAction,
    updateInventoryItem,
  } = useInventario(user, searchTerm);

  async function handleSubmit(itemData) {
    if (editingItem) {
      await updateInventoryItem(editingItem.id, itemData, editingItem);
      setEditingItem(null);
      return;
    }

    await createInventoryItem(itemData);
  }

  async function handleDelete(item) {
    const shouldDelete = window.confirm(
      `Eliminar ${item.productName} del inventario? Podras revertirlo con Deshacer.`
    );

    if (shouldDelete) {
      await deleteInventoryItem(item);

      if (editingItem?.id === item.id) {
        setEditingItem(null);
      }
    }
  }

  return (
    <div className="inventory-page">
      <EncabezadoPagina
        eyebrow="Inventario"
        title="Control de inventario"
        description="Inventario en tiempo real con Firestore, CRUD de productos y busqueda inteligente con Arbol Trie."
      />

      <section className="inventory-summary" aria-label="Resumen de inventario">
        <article className="metric-card">
          <span>Productos</span>
          <strong>{metrics.totalProducts}</strong>
        </article>
        <article className="metric-card">
          <span>Stock total</span>
          <strong>{metrics.totalStock}</strong>
        </article>
        <article className="metric-card">
          <span>Bajo stock</span>
          <strong>{metrics.lowStock}</strong>
        </article>
        <article className="metric-card">
          <span>Agotados</span>
          <strong>{metrics.outOfStock}</strong>
        </article>
      </section>

      {error ? <p className="module-alert">{error}</p> : null}

      <section className="inventory-workspace">
        <FormularioInventario
          editingItem={editingItem}
          isSaving={saving}
          onCancelEdit={() => setEditingItem(null)}
          onSubmit={handleSubmit}
        />

        <div className="inventory-stack">
          <BusquedaInventario
            onSearchChange={setSearchTerm}
            onSuggestionSelect={setSearchTerm}
            searchTerm={searchTerm}
            suggestions={suggestions}
          />

          <PanelDeshacerInventario
            accionParaDeshacer={accionParaDeshacer}
            isSaving={saving}
            onUndo={undoLastInventoryAction}
            totalAccionesDeshacer={totalAccionesDeshacer}
          />

          {loading ? (
            <section className="inventory-panel">
              <p className="empty-state">Cargando inventario desde Firestore...</p>
            </section>
          ) : (
            <TablaInventario
              isSaving={saving}
              items={filteredItems}
              onDelete={handleDelete}
              onEdit={setEditingItem}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default PaginaInventario;
