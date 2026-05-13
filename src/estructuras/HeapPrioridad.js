class HeapPrioridad {
  constructor() {
    this.heap = [];
  }

  obtenerIndicePadre(indice) {
    return Math.floor((indice - 1) / 2);
  }

  obtenerIndiceIzquierdo(indice) {
    return 2 * indice + 1;
  }

  obtenerIndiceDerecho(indice) {
    return 2 * indice + 2;
  }

  intercambiar(indiceA, indiceB) {
    [this.heap[indiceA], this.heap[indiceB]] = [
      this.heap[indiceB],
      this.heap[indiceA],
    ];
  }

  obtenerValorPrioridad(prioridad) {
    const prioridades = {
      ALTA: 3,
      MEDIA: 2,
      BAJA: 1,
    };

    return prioridades[prioridad] || 0;
  }

  insertar(elemento) {
    this.heap.push(elemento);
    this.heapifyUp();
  }

  heapifyUp() {
    let indiceActual = this.heap.length - 1;

    while (indiceActual > 0) {
      const indicePadre = this.obtenerIndicePadre(indiceActual);

      const prioridadActual = this.obtenerValorPrioridad(
        this.heap[indiceActual].prioridad
      );

      const prioridadPadre = this.obtenerValorPrioridad(
        this.heap[indicePadre].prioridad
      );

      if (prioridadActual > prioridadPadre) {
        this.intercambiar(indiceActual, indicePadre);
        indiceActual = indicePadre;
      } else {
        break;
      }
    }
  }

  extraerMaximo() {
    if (this.estaVacio()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const maximo = this.heap[0];

    this.heap[0] = this.heap.pop();

    this.heapifyDown();

    return maximo;
  }

  heapifyDown() {
    let indiceActual = 0;

    while (this.obtenerIndiceIzquierdo(indiceActual) < this.heap.length) {
      let indiceMayor = this.obtenerIndiceIzquierdo(indiceActual);

      const indiceDerecho = this.obtenerIndiceDerecho(indiceActual);

      if (
        indiceDerecho < this.heap.length &&
        this.obtenerValorPrioridad(
          this.heap[indiceDerecho].prioridad
        ) >
          this.obtenerValorPrioridad(
            this.heap[indiceMayor].prioridad
          )
      ) {
        indiceMayor = indiceDerecho;
      }

      if (
        this.obtenerValorPrioridad(
          this.heap[indiceActual].prioridad
        ) <
        this.obtenerValorPrioridad(
          this.heap[indiceMayor].prioridad
        )
      ) {
        this.intercambiar(indiceActual, indiceMayor);
        indiceActual = indiceMayor;
      } else {
        break;
      }
    }
  }

  obtenerMaximo() {
    return this.heap[0] || null;
  }

  estaVacio() {
    return this.heap.length === 0;
  }

  obtenerElementos() {
    return [...this.heap];
  }

  tamanio() {
    return this.heap.length;
  }
}

export default HeapPrioridad;