export function normalizarTextoTrie(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

class NodoTrie {
  constructor() {
    this.children = new Map();
    this.values = [];
    this.isEnd = false;
  }
}

export class ArbolTrie {
  constructor() {
    this.root = new NodoTrie();
  }

  insertar(term, value) {
    const normalizedTerm = normalizarTextoTrie(term);

    if (!normalizedTerm) {
      return;
    }

    let currentNode = this.root;

    for (const character of normalizedTerm) {
      if (!currentNode.children.has(character)) {
        currentNode.children.set(character, new NodoTrie());
      }

      currentNode = currentNode.children.get(character);
    }

    currentNode.isEnd = true;
    currentNode.values.push({
      term,
      value,
    });
  }

  buscar(prefix, limit = 8) {
    const normalizedPrefix = normalizarTextoTrie(prefix);

    if (!normalizedPrefix) {
      return [];
    }

    let currentNode = this.root;

    for (const character of normalizedPrefix) {
      if (!currentNode.children.has(character)) {
        return [];
      }

      currentNode = currentNode.children.get(character);
    }

    const results = [];
    this.recolectarValores(currentNode, results, limit);
    return results;
  }

  recolectarValores(node, results, limit) {
    if (results.length >= limit) {
      return;
    }

    if (node.isEnd) {
      for (const value of node.values) {
        if (results.length >= limit) {
          return;
        }

        results.push(value);
      }
    }

    for (const childNode of node.children.values()) {
      this.recolectarValores(childNode, results, limit);

      if (results.length >= limit) {
        return;
      }
    }
  }

  limpiar() {
    this.root = new NodoTrie();
  }
}
