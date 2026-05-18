export class Pila {
  constructor(initialItems = []) {
    this.items = [...initialItems];
  }

  apilar(item) {
    this.items.push(item);
    return this.tamano();
  }

  desapilar() {
    return this.items.pop() ?? null;
  }

  cima() {
    return this.items[this.items.length - 1] ?? null;
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
    return new Pila(items);
  }
}
