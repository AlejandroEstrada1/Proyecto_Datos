import { useEffect, useState } from "react";

const EMPTY_FORM = {
  sku: "",
  productName: "",
  category: "",
  stock: "",
  minStock: "",
  unit: "unidades",
  location: "",
  supplier: "",
  notes: "",
};

function buildFormState(item) {
  if (!item) {
    return EMPTY_FORM;
  }

  return {
    sku: item.sku ?? "",
    productName: item.productName ?? "",
    category: item.category ?? "",
    stock: item.stock ?? "",
    minStock: item.minStock ?? "",
    unit: item.unit ?? "unidades",
    location: item.location ?? "",
    supplier: item.supplier ?? "",
    notes: item.notes ?? "",
  };
}

function FormularioInventario({ editingItem, isSaving, onCancelEdit, onSubmit }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const isEditing = Boolean(editingItem);

  useEffect(() => {
    setFormData(buildFormState(editingItem));
    setFormError("");
  }, [editingItem]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (Number(formData.stock) < 0) {
      setFormError("El stock no puede ser negativo.");
      return;
    }

    if (Number(formData.minStock) < 0) {
      setFormError("El stock minimo no puede ser negativo.");
      return;
    }

    await onSubmit(formData);

    if (!isEditing) {
      setFormData(EMPTY_FORM);
    }
  }

  return (
    <section className="inventory-form-card" aria-label="Formulario de inventario">
      <div className="module-heading">
        <span>{isEditing ? "Edicion" : "Nuevo producto"}</span>
        <h2>{isEditing ? "Actualizar producto" : "Registrar producto"}</h2>
      </div>

      <form className="inventory-form" onSubmit={handleSubmit}>
        <div className="inventory-form-grid">
          <label>
            Codigo
            <input
              disabled={isSaving}
              name="sku"
              onChange={handleChange}
              placeholder="EST-MAD-A"
              required
              type="text"
              value={formData.sku}
            />
          </label>

          <label>
            Producto
            <input
              disabled={isSaving}
              name="productName"
              onChange={handleChange}
              placeholder="Estiba madera tipo A"
              required
              type="text"
              value={formData.productName}
            />
          </label>

          <label>
            Categoria
            <input
              disabled={isSaving}
              name="category"
              onChange={handleChange}
              placeholder="Madera / Plastico"
              required
              type="text"
              value={formData.category}
            />
          </label>

          <label>
            Unidad
            <input
              disabled={isSaving}
              name="unit"
              onChange={handleChange}
              placeholder="unidades"
              required
              type="text"
              value={formData.unit}
            />
          </label>

          <label>
            Stock actual
            <input
              disabled={isSaving}
              min="0"
              name="stock"
              onChange={handleChange}
              placeholder="250"
              required
              type="number"
              value={formData.stock}
            />
          </label>

          <label>
            Stock minimo
            <input
              disabled={isSaving}
              min="0"
              name="minStock"
              onChange={handleChange}
              placeholder="40"
              required
              type="number"
              value={formData.minStock}
            />
          </label>

          <label>
            Ubicacion
            <input
              disabled={isSaving}
              name="location"
              onChange={handleChange}
              placeholder="Bodega A - Rack 3"
              required
              type="text"
              value={formData.location}
            />
          </label>

          <label>
            Proveedor
            <input
              disabled={isSaving}
              name="supplier"
              onChange={handleChange}
              placeholder="Proveedor principal"
              type="text"
              value={formData.supplier}
            />
          </label>

          <label className="field-span-2">
            Observaciones
            <textarea
              disabled={isSaving}
              name="notes"
              onChange={handleChange}
              placeholder="Condiciones, lote o notas de reposicion"
              rows="3"
              value={formData.notes}
            />
          </label>
        </div>

        {formError ? <p className="module-alert">{formError}</p> : null}

        <div className="form-actions">
          {isEditing ? (
            <button
              className="secondary-button"
              disabled={isSaving}
              onClick={onCancelEdit}
              type="button"
            >
              Cancelar
            </button>
          ) : null}
          <button disabled={isSaving} type="submit">
            {isSaving
              ? "Guardando..."
              : isEditing
                ? "Guardar cambios"
                : "Crear producto"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioInventario;
