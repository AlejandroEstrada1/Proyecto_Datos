import { useCallback, useEffect, useMemo, useState } from "react";
import { Cola } from "../../../estructuras/Cola.js";
import {
  createOrder as createOrderInFirestore,
  deleteOrder as deleteOrderFromFirestore,
  ORDER_STATUS,
  subscribeToOrders,
  updateOrder as updateOrderInFirestore,
  updateOrderStatus as updateOrderStatusInFirestore,
} from "../services/servicioPedidos.js";

export function usePedidos(user) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeToOrders(
      (currentOrders) => {
        setOrders(currentOrders);
        setError("");
        setLoading(false);
      },
      (firestoreError) => {
        console.error("Error al escuchar pedidos", firestoreError);
        setError("No se pudieron cargar los pedidos desde Firestore.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const colaPendientes = useMemo(() => {
    const pendingOrders = orders
      .filter((order) => order.status === ORDER_STATUS.pending)
      .sort((firstOrder, secondOrder) => firstOrder.queuedAt - secondOrder.queuedAt);

    return Cola.desde(pendingOrders);
  }, [orders]);

  const createOrder = useCallback(
    async (orderData) => {
      setSaving(true);
      setError("");

      try {
        await createOrderInFirestore(orderData, user);
      } catch (firestoreError) {
        console.error("Error al crear pedido", firestoreError);
        setError("No se pudo crear el pedido.");
        throw firestoreError;
      } finally {
        setSaving(false);
      }
    },
    [user]
  );

  const updateOrder = useCallback(async (orderId, orderData) => {
    setSaving(true);
    setError("");

    try {
      await updateOrderInFirestore(orderId, orderData);
    } catch (firestoreError) {
      console.error("Error al actualizar pedido", firestoreError);
      setError("No se pudo actualizar el pedido.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (orderId, status) => {
    setSaving(true);
    setError("");

    try {
      await updateOrderStatusInFirestore(orderId, status);
    } catch (firestoreError) {
      console.error("Error al cambiar estado del pedido", firestoreError);
      setError("No se pudo cambiar el estado del pedido.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteOrder = useCallback(async (orderId) => {
    setSaving(true);
    setError("");

    try {
      await deleteOrderFromFirestore(orderId);
    } catch (firestoreError) {
      console.error("Error al eliminar pedido", firestoreError);
      setError("No se pudo eliminar el pedido.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    saving,
    colaPendientes,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder,
  };
}
