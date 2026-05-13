class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class ListaEnlazada {
  constructor() {
    this.cabeza = null;
    this.longitud = 0;
  }

  insertarAlFinal(valor) {
    const nuevoNodo = new Nodo(valor);

    if (this.cabeza === null) {
      this.cabeza = nuevoNodo;
    } else {
      let actual = this.cabeza;

      while (actual.siguiente !== null) {
        actual = actual.siguiente;
      }

      actual.siguiente = nuevoNodo;
    }

    this.longitud++;
  }

  insertarAlInicio(valor) {
    const nuevoNodo = new Nodo(valor);
    nuevoNodo.siguiente = this.cabeza;
    this.cabeza = nuevoNodo;
    this.longitud++;
  }

  eliminarPorId(id) {
    if (this.cabeza === null) {
      return null;
    }

    if (this.cabeza.valor.id === id) {
      const eliminado = this.cabeza.valor;
      this.cabeza = this.cabeza.siguiente;
      this.longitud--;
      return eliminado;
    }

    let actual = this.cabeza;

    while (actual.siguiente !== null) {
      if (actual.siguiente.valor.id === id) {
        const eliminado = actual.siguiente.valor;
        actual.siguiente = actual.siguiente.siguiente;
        this.longitud--;
        return eliminado;
      }

      actual = actual.siguiente;
    }

    return null;
  }

  buscarPorId(id) {
    let actual = this.cabeza;

    while (actual !== null) {
      if (actual.valor.id === id) {
        return actual.valor;
      }

      actual = actual.siguiente;
    }

    return null;
  }

  obtenerPrimero() {
    if (this.cabeza === null) {
      return null;
    }

    return this.cabeza.valor;
  }

  estaVacia() {
    return this.cabeza === null;
  }

  tamanio() {
    return this.longitud;
  }

  convertirArreglo() {
    const elementos = [];
    let actual = this.cabeza;

    while (actual !== null) {
      elementos.push(actual.valor);
      actual = actual.siguiente;
    }

    return elementos;
  }

  limpiar() {
    this.cabeza = null;
    this.longitud = 0;
  }
}

export default ListaEnlazada;