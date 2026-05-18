import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ORDER_STATUS,
  subscribeToOrders,
  updateOrderStatus,
} from "../../pedidos/services/servicioPedidos.js";
import {
  calcularResumenPlanDia,
  construirHeapPlanDia,
  priorizarPedidosPendientes,
} from "../services/servicioPlanDia.js";

export function usePlanDia() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [processedOrders, setProcessedOrders] = useState([]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeToOrders(
      (currentOrders) => {
        setOrders(currentOrders);
        setError("");
        setLoading(false);
      },
      (firestoreError) => {
        console.error("Error al cargar el plan del dia", firestoreError);
        setError("No se pudo cargar el plan del dia desde Firestore.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const heapPlanDia = useMemo(() => construirHeapPlanDia(orders), [orders]);
  const pedidosPriorizados = useMemo(
    () => priorizarPedidosPendientes(orders),
    [orders]
  );
  const resumen = useMemo(() => calcularResumenPlanDia(orders), [orders]);
  const siguientePedido = heapPlanDia.primero();

  const procesarPedidoPrioritario = useCallback(async (order) => {
    if (!order) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateOrderStatus(order.id, ORDER_STATUS.inProgress);
      setProcessedOrders((currentOrders) => [
        {
          id: order.id,
          orderCode: order.orderCode,
          customerName: order.customerName,
          processedAt: new Date().toISOString(),
        },
        ...currentOrders,
      ]);
    } catch (firestoreError) {
      console.error("Error al procesar pedido prioritario", firestoreError);
      setError("No se pudo mover el pedido prioritario a En proceso.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    loading,
    error,
    saving,
    resumen,
    pedidosPriorizados,
    siguientePedido,
    processedOrders,
    procesarPedidoPrioritario,
  };
}
