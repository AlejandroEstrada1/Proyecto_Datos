export class Cola {
  constructor(initialItems = []) {
    this.items = [...initialItems];
  }

  encolar(item) {
    this.items.push(item);
    return this.tamano();
  }

  desencolar() {
    return this.items.shift() ?? null;
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

  static desde(items) {
    return new Cola(items);
  }
}
