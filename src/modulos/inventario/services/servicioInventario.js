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
import { normalizarTextoTrie } from "../../../estructuras/ArbolTrie.js";

export const STOCK_STATUS = Object.freeze({
  available: "disponible",
  low: "bajo_stock",
  out: "agotado",
});

export const STOCK_STATUS_LABELS = Object.freeze({
  [STOCK_STATUS.available]: "Disponible",
  [STOCK_STATUS.low]: "Bajo stock",
  [STOCK_STATUS.out]: "Agotado",
});

export function getStockStatus(stock, minStock) {
  const currentStock = Number(stock);
  const minimumStock = Number(minStock);

  if (currentStock <= 0) {
    return STOCK_STATUS.out;
  }

  if (currentStock <= minimumStock) {
    return STOCK_STATUS.low;
  }

  return STOCK_STATUS.available;
}

function normalizeInventoryItem(documentSnapshot) {
  const data = documentSnapshot.data();

  return {
    id: documentSnapshot.id,
    ...data,
    createdAtDate: data.createdAt?.toDate?.() ?? null,
    updatedAtDate: data.updatedAt?.toDate?.() ?? null,
  };
}

function cleanInventoryPayload(itemData) {
  const stock = Number(itemData.stock);
  const minStock = Number(itemData.minStock);
  const productName = String(itemData.productName ?? "").trim();
  const sku = String(itemData.sku ?? "").trim();
  const category = String(itemData.category ?? "").trim();

  return {
    sku,
    skuLower: normalizarTextoTrie(sku),
    productName,
    productNameLower: normalizarTextoTrie(productName),
    category,
    categoryLower: normalizarTextoTrie(category),
    stock,
    minStock,
    unit: String(itemData.unit ?? "").trim(),
    location: String(itemData.location ?? "").trim(),
    supplier: String(itemData.supplier ?? "").trim(),
    notes: String(itemData.notes ?? "").trim(),
    status: getStockStatus(stock, minStock),
  };
}

export function subscribeToInventory(onInventoryChange, onError) {
  const inventoryQuery = query(
    getCollectionRef(COLLECTIONS.inventory),
    orderBy("productNameLower", "asc")
  );

  return onSnapshot(
    inventoryQuery,
    (snapshot) => {
      onInventoryChange(snapshot.docs.map(normalizeInventoryItem));
    },
    onError
  );
}

export function createInventoryItem(itemData, user) {
  const payload = cleanInventoryPayload(itemData);

  return addDoc(getCollectionRef(COLLECTIONS.inventory), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: {
      uid: user?.uid ?? null,
      email: user?.email ?? "",
      displayName: user?.displayName ?? "",
    },
  });
}

export function updateInventoryItem(itemId, itemData) {
  const payload = cleanInventoryPayload(itemData);

  return updateDoc(getDocumentRef(COLLECTIONS.inventory, itemId), {
    ...payload,
    updatedAt: serverTimestamp(),
  });
}

export function deleteInventoryItem(itemId) {
  return deleteDoc(getDocumentRef(COLLECTIONS.inventory, itemId));
}
