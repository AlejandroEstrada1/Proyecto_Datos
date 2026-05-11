import { useCallback, useEffect, useMemo, useState } from "react";
import { ArbolTrie, normalizarTextoTrie } from "../../../estructuras/ArbolTrie.js";
import {
  createInventoryItem as createInventoryItemInFirestore,
  deleteInventoryItem as deleteInventoryItemFromFirestore,
  STOCK_STATUS,
  subscribeToInventory,
  updateInventoryItem as updateInventoryItemInFirestore,
} from "../services/servicioInventario.js";

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

  const createInventoryItem = useCallback(
    async (itemData) => {
      setSaving(true);
      setError("");

      try {
        await createInventoryItemInFirestore(itemData, user);
      } catch (firestoreError) {
        console.error("Error al crear producto", firestoreError);
        setError("No se pudo crear el producto en inventario.");
        throw firestoreError;
      } finally {
        setSaving(false);
      }
    },
    [user]
  );

  const updateInventoryItem = useCallback(async (itemId, itemData) => {
    setSaving(true);
    setError("");

    try {
      await updateInventoryItemInFirestore(itemId, itemData);
    } catch (firestoreError) {
      console.error("Error al actualizar producto", firestoreError);
      setError("No se pudo actualizar el producto.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, []);

  const deleteInventoryItem = useCallback(async (itemId) => {
    setSaving(true);
    setError("");

    try {
      await deleteInventoryItemFromFirestore(itemId);
    } catch (firestoreError) {
      console.error("Error al eliminar producto", firestoreError);
      setError("No se pudo eliminar el producto.");
      throw firestoreError;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    items,
    filteredItems,
    suggestions,
    loading,
    error,
    saving,
    metrics,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
  };
}
