import { HeapPrioridad } from "../../../estructuras/HeapPrioridad.js";
import {
  ORDER_PRIORITY,
  ORDER_STATUS,
} from "../../pedidos/services/servicioPedidos.js";

const PRIORITY_SCORE = {
  [ORDER_PRIORITY.urgent]: 4,
  [ORDER_PRIORITY.high]: 3,
  [ORDER_PRIORITY.normal]: 2,
  [ORDER_PRIORITY.low]: 1,
};

function getPriorityScore(order) {
  return PRIORITY_SCORE[order.priority] ?? PRIORITY_SCORE[ORDER_PRIORITY.normal];
}

function getDeliveryTime(order) {
  if (!order.deliveryDate) {
    return Number.MAX_SAFE_INTEGER;
  }

  return new Date(`${order.deliveryDate}T00:00:00`).getTime();
}

export function compararPedidosPlanDia(firstOrder, secondOrder) {
  const priorityDifference =
    getPriorityScore(secondOrder) - getPriorityScore(firstOrder);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  const dateDifference = getDeliveryTime(firstOrder) - getDeliveryTime(secondOrder);

  if (dateDifference !== 0) {
    return dateDifference;
  }

  return Number(firstOrder.queuedAt ?? 0) - Number(secondOrder.queuedAt ?? 0);
}

export function construirHeapPlanDia(orders) {
  const pendingOrders = orders.filter(
    (order) => order.status === ORDER_STATUS.pending
  );

  return HeapPrioridad.desde(pendingOrders, compararPedidosPlanDia);
}

export function priorizarPedidosPendientes(orders) {
  return construirHeapPlanDia(orders).aArregloOrdenado();
}

export function calcularResumenPlanDia(orders) {
  const pendingOrders = orders.filter(
    (order) => order.status === ORDER_STATUS.pending
  );

  return {
    totalPendientes: pendingOrders.length,
    urgentes: pendingOrders.filter(
      (order) => order.priority === ORDER_PRIORITY.urgent
    ).length,
    altaPrioridad: pendingOrders.filter(
      (order) => order.priority === ORDER_PRIORITY.high
    ).length,
    listosParaDespacho: orders.filter(
      (order) => order.status === ORDER_STATUS.inProgress
    ).length,
  };
}
