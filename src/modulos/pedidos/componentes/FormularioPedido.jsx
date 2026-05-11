import { useEffect, useState } from "react";

const EMPTY_FORM = {
  orderCode: "",
  customerName: "",
  productName: "",
  quantity: "",
  destination: "",
  deliveryDate: "",
  notes: "",
};

function buildFormState(order) {
  if (!order) {
    return EMPTY_FORM;
  }

  return {
    orderCode: order.orderCode ?? "",
    customerName: order.customerName ?? "",
    productName: order.productName ?? "",
    quantity: order.quantity ?? "",
    destination: order.destination ?? "",
    deliveryDate: order.deliveryDate ?? "",
    notes: order.notes ?? "",
  };
}

function FormularioPedido({ editingOrder, isSaving, onCancelEdit, onSubmit }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const isEditing = Boolean(editingOrder);

  useEffect(() => {
    setFormData(buildFormState(editingOrder));
    setFormError("");
  }, [editingOrder]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    if (Number(formData.quantity) <= 0) {
      setFormError("La cantidad debe ser mayor que cero.");
      return;
    }

    await onSubmit(formData);

    if (!isEditing) {
      setFormData(EMPTY_FORM);
    }
  }

  return (
    <section className="order-form-card" aria-label="Formulario de pedidos">
      <div className="module-heading">
        <span>{isEditing ? "Edicion" : "Nuevo pedido"}</span>
        <h2>{isEditing ? "Actualizar pedido" : "Registrar pedido"}</h2>
      </div>

      <form className="order-form" onSubmit={handleSubmit}>
        <div className="order-form-grid">
          <label>
            Codigo
            <input
              disabled={isSaving}
              name="orderCode"
              onChange={handleChange}
              placeholder="PED-001"
              type="text"
              value={formData.orderCode}
            />
          </label>

          <label>
            Cliente
            <input
              disabled={isSaving}
              name="customerName"
              onChange={handleChange}
              placeholder="Empresa cliente"
              required
              type="text"
              value={formData.customerName}
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
            Cantidad
            <input
              disabled={isSaving}
              min="1"
              name="quantity"
              onChange={handleChange}
              placeholder="100"
              required
              type="number"
              value={formData.quantity}
            />
          </label>

          <label>
            Destino
            <input
              disabled={isSaving}
              name="destination"
              onChange={handleChange}
              placeholder="Zona industrial / ciudad"
              required
              type="text"
              value={formData.destination}
            />
          </label>

          <label>
            Fecha requerida
            <input
              disabled={isSaving}
              name="deliveryDate"
              onChange={handleChange}
              required
              type="date"
              value={formData.deliveryDate}
            />
          </label>

          <label className="field-span-2">
            Observaciones
            <textarea
              disabled={isSaving}
              name="notes"
              onChange={handleChange}
              placeholder="Detalles de cargue, contacto o restricciones"
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
                : "Crear pedido"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioPedido;
