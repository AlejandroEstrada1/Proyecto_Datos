import {
  addDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  COLLECTIONS,
  getCollectionRef,
  getDocumentRef,
  serverTimestamp,
} from "../../../servicios/firebase/servicioFirestore.js";

export const ORDER_STATUS = Object.freeze({
  pending: "pendiente",
  inProgress: "en_proceso",
  dispatched: "despachado",
  canceled: "cancelado",
});

export const ORDER_STATUS_LABELS = Object.freeze({
  [ORDER_STATUS.pending]: "Pendiente",
  [ORDER_STATUS.inProgress]: "En proceso",
  [ORDER_STATUS.dispatched]: "Despachado",
  [ORDER_STATUS.canceled]: "Cancelado",
});

function normalizeOrder(documentSnapshot) {
  const data = documentSnapshot.data();

  return {
    id: documentSnapshot.id,
    ...data,
    createdAtDate: data.createdAt?.toDate?.() ?? null,
    updatedAtDate: data.updatedAt?.toDate?.() ?? null,
  };
}

function cleanOrderPayload(orderData) {
  return {
    orderCode: orderData.orderCode.trim(),
    customerName: orderData.customerName.trim(),
    productName: orderData.productName.trim(),
    quantity: Number(orderData.quantity),
    destination: orderData.destination.trim(),
    deliveryDate: orderData.deliveryDate,
    notes: orderData.notes.trim(),
  };
}

export function subscribeToOrders(onOrdersChange, onError) {
  const ordersQuery = query(
    getCollectionRef(COLLECTIONS.orders),
    orderBy("queuedAt", "asc")
  );

  return onSnapshot(
    ordersQuery,
    (snapshot) => {
      onOrdersChange(snapshot.docs.map(normalizeOrder));
    },
    onError
  );
}

export function createOrder(orderData, user) {
  const queuedAt = Date.now();
  const payload = cleanOrderPayload({
    ...orderData,
    orderCode: orderData.orderCode || `PED-${queuedAt}`,
  });

  return addDoc(getCollectionRef(COLLECTIONS.orders), {
    ...payload,
    status: ORDER_STATUS.pending,
    queuedAt,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: {
      uid: user?.uid ?? null,
      email: user?.email ?? "",
      displayName: user?.displayName ?? "",
    },
  });
}

export function updateOrder(orderId, orderData) {
  const payload = cleanOrderPayload(orderData);

  return updateDoc(getDocumentRef(COLLECTIONS.orders, orderId), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export function updateOrderStatus(orderId, status) {
  return updateDoc(getDocumentRef(COLLECTIONS.orders, orderId), {
    status,
    updatedAt: serverTimestamp(),
  });
}

export function deleteOrder(orderId) {
  return deleteDoc(getDocumentRef(COLLECTIONS.orders, orderId));
}
