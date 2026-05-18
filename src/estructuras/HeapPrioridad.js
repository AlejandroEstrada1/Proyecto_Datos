function defaultComparator(firstItem, secondItem) {
  return firstItem - secondItem;
}

export class HeapPrioridad {
  constructor(comparator = defaultComparator) {
    this.items = [];
    this.comparator = comparator;
  }

  insertar(item) {
    this.items.push(item);
    this.subir(this.items.length - 1);
    return this.tamano();
  }

  extraer() {
    if (this.estaVacia()) {
      return null;
    }

    if (this.items.length === 1) {
      return this.items.pop();
    }

    const root = this.items[0];
    this.items[0] = this.items.pop();
    this.bajar(0);
    return root;
  }

  primero() {
    return this.items[0] ?? null;
  }

  estaVacia() {
    return this.items.length === 0;
  }

  tamano() {
    return this.items.length;
  }

  limpiar() {
    this.items = [];
  }

  aArreglo() {
    return [...this.items];
  }

  aArregloOrdenado() {
    const heapTemporal = HeapPrioridad.desde(this.items, this.comparator);
    const orderedItems = [];

    while (!heapTemporal.estaVacia()) {
      orderedItems.push(heapTemporal.extraer());
    }

    return orderedItems;
  }

  subir(index) {
    let currentIndex = index;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.comparator(this.items[currentIndex], this.items[parentIndex]) >= 0) {
        break;
      }

      this.intercambiar(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  bajar(index) {
    let currentIndex = index;

    while (true) {
      const leftIndex = currentIndex * 2 + 1;
      const rightIndex = currentIndex * 2 + 2;
      let priorityIndex = currentIndex;

      if (
        leftIndex < this.items.length &&
        this.comparator(this.items[leftIndex], this.items[priorityIndex]) < 0
      ) {
        priorityIndex = leftIndex;
      }

      if (
        rightIndex < this.items.length &&
        this.comparator(this.items[rightIndex], this.items[priorityIndex]) < 0
      ) {
        priorityIndex = rightIndex;
      }

      if (priorityIndex === currentIndex) {
        break;
      }

      this.intercambiar(currentIndex, priorityIndex);
      currentIndex = priorityIndex;
    }
  }

  intercambiar(firstIndex, secondIndex) {
    const currentItem = this.items[firstIndex];
    this.items[firstIndex] = this.items[secondIndex];
    this.items[secondIndex] = currentItem;
  }

  static desde(items, comparator = defaultComparator) {
    const heap = new HeapPrioridad(comparator);
    items.forEach((item) => heap.insertar(item));
    return heap;
  }
}
