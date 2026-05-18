import { useCallback, useEffect, useMemo, useState } from "react";
import { ArbolTrie, normalizarTextoTrie } from "../../../estructuras/ArbolTrie.js";
import { Pila } from "../../../estructuras/Pila.js";
import {
  createInventoryItem as createInventoryItemInFirestore,
  deleteInventoryItem as deleteInventoryItemFromFirestore,
  STOCK_STATUS,
  subscribeToInventory,
  updateInventoryItem as updateInventoryItemInFirestore,
} from "../services/servicioInventario.js";

const MAX_UNDO_ACTIONS = 10;

function buildSearchIndex(items) {
  const trie = new ArbolTrie();

  items.forEach((item) => {
    trie.insertar(item.productName, {
      id: item.id,
      label: item.productName,
      type: "Producto",
    });
    trie.insertar(item.sku, {
      id: item.id,
      label: item.sku,
      type: "Codigo",
    });
    trie.insertar(item.category, {
      id: item.id,
      label: item.category,
      type: "Categoria",
    });
  });

  return trie;
}

function filterItemsBySearch(items, searchTerm, trie) {
  const normalizedTerm = normalizarTextoTrie(searchTerm);

  if (!normalizedTerm) {
    return items;
  }

  const suggestionIds = new Set(
    trie.buscar(normalizedTerm, 20).map((suggestion) => suggestion.value.id)
  );

  return items.filter((item) => {
    if (suggestionIds.has(item.id)) {
      return true;
    }

    return [item.productNameLower, item.skuLower, item.categoryLower, item.location]
      .map(normalizarTextoTrie)
      .some((value) => value.includes(normalizedTerm));
  });
}

function getUniqueSuggestions(searchTerm, trie) {
  const seen = new Set();

  return trie.buscar(searchTerm, 10).filter((suggestion) => {
    const key = `${suggestion.value.id}-${suggestion.value.label}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function useInventario(user, searchTerm) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [historialAcciones, setHistorialAcciones] = useState([]);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeToInventory(
      (currentItems) => {
        setItems(currentItems);
        setError("");
        setLoading(false);
      },
      (firestoreError) => {
        console.error("Error al escuchar inventario", firestoreError);
        setError("No se pudo cargar el inventario desde Firestore.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const trie = useMemo(() => buildSearchIndex(items), [items]);
  const filteredItems = useMemo(
    () => filterItemsBySearch(items, searchTerm, trie),
    [items, searchTerm, trie]
  );
  const suggestions = useMemo(
    () => getUniqueSuggestions(searchTerm, trie),
    [searchTerm, trie]
  );

  const metrics = useMemo(
    () => ({
      totalProducts: items.length,
      totalStock: items.reduce((total, item) => total + Number(item.stock), 0),
      lowStock: items.filter((item) => item.status === STOCK_STATUS.low).length,
      outOfStock: items.filter((item) => item.status === STOCK_STATUS.out).length,
    }),
    [items]
  );

  const registrarAccion = useCallback((action) => {
    setHistorialAcciones((currentActions) => {
      const pila = Pila.desde(currentActions.slice(-MAX_UNDO_ACTIONS + 1));
      pila.apilar({
        ...action,
        createdAt: new Date().toISOString(),
      });
      return pila.aArreglo();
    });
  }, []);

  const createInventoryItem = useCallback(
    async (itemData) => {
      setSaving(true);
      setError("");

      try {
        const documentReference = await createInventoryItemInFirestore(itemData, user);
        registrarAccion({
          type: "crear",
          itemId: documentReference.id,
          label: itemData.productName,
        });
      } catch (firestoreError) {
        console.error("Error al crear producto", firestoreError);
        setError("No se pudo crear el producto en inventario.");
        throw firestoreError;
      } finally {
        setSaving(false);
      }
    },
    [registrarAccion, user]
  );

  const updateInventoryItem = useCallback(async (itemId, itemData, previousItem) => {
    setSaving(true);
    setError("");

    try {
      await updateInventoryItemInFirestore(itemId, itemData);
      if (previousItem) {
        registrarAccion({
          type: "actualizar",
          itemId,
          label: previousItem.productName,
          previousItem,
        });
      }
    } catch (firestoreError) {
      console.error("Error al actualizar producto", firestoreError);
      setError("No se pudo actualizar el producto.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, [registrarAccion]);

  const deleteInventoryItem = useCallback(async (item) => {
    setSaving(true);
    setError("");

    try {
      const itemId = typeof item === "string" ? item : item.id;
      await deleteInventoryItemFromFirestore(itemId);
      if (typeof item !== "string") {
        registrarAccion({
          type: "eliminar",
          itemId,
          label: item.productName,
          previousItem: item,
        });
      }
    } catch (firestoreError) {
      console.error("Error al eliminar producto", firestoreError);
      setError("No se pudo eliminar el producto.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, [registrarAccion]);

  const undoLastInventoryAction = useCallback(async () => {
    const pila = Pila.desde(historialAcciones);
    const lastAction = pila.desapilar();

    if (!lastAction) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (lastAction.type === "crear") {
        await deleteInventoryItemFromFirestore(lastAction.itemId);
      }

      if (lastAction.type === "actualizar") {
        await updateInventoryItemInFirestore(lastAction.itemId, lastAction.previousItem);
      }

      if (lastAction.type === "eliminar") {
        await createInventoryItemInFirestore(lastAction.previousItem, user);
      }

      setHistorialAcciones(pila.aArreglo());
    } catch (firestoreError) {
      console.error("Error al deshacer accion de inventario", firestoreError);
      setError("No se pudo deshacer la ultima accion de inventario.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, [historialAcciones, user]);

  return {
    items,
    filteredItems,
    suggestions,
    loading,
    error,
    saving,
    metrics,
    accionParaDeshacer: historialAcciones[historialAcciones.length - 1] ?? null,
    totalAccionesDeshacer: historialAcciones.length,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    undoLastInventoryAction,
  };
}
