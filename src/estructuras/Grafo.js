export class Grafo {
  constructor() {
    this.nodos = new Map();
    this.adyacencias = new Map();
  }

  agregarNodo(id, data = {}) {
    if (!this.nodos.has(id)) {
      this.nodos.set(id, { id, ...data });
      this.adyacencias.set(id, []);
    }

    return this.nodos.get(id);
  }

  agregarArista(origen, destino, peso, data = {}, bidireccional = true) {
    this.validarNodo(origen);
    this.validarNodo(destino);

    const arista = { origen, destino, peso: Number(peso), ...data };
    this.adyacencias.get(origen).push(arista);

    if (bidireccional) {
      this.adyacencias.get(destino).push({
        origen: destino,
        destino: origen,
        peso: Number(peso),
        ...data,
      });
    }

    return arista;
  }

  obtenerNodo(id) {
    return this.nodos.get(id) ?? null;
  }

  obtenerNodos() {
    return Array.from(this.nodos.values());
  }

  obtenerVecinos(id) {
    return [...(this.adyacencias.get(id) ?? [])];
  }

  obtenerAristas() {
    const vistas = new Set();
    const aristas = [];

    for (const [origen, vecinos] of this.adyacencias.entries()) {
      vecinos.forEach((arista) => {
        const key = [origen, arista.destino].sort().join("->");

        if (!vistas.has(key)) {
          vistas.add(key);
          aristas.push(arista);
        }
      });
    }

    return aristas;
  }

  caminoMasCorto(origen, destino) {
    this.validarNodo(origen);
    this.validarNodo(destino);

    const distancias = new Map();
    const anteriores = new Map();
    const noVisitados = new Set(this.nodos.keys());

    for (const nodoId of this.nodos.keys()) {
      distancias.set(nodoId, Infinity);
      anteriores.set(nodoId, null);
    }

    distancias.set(origen, 0);

    while (noVisitados.size) {
      const actual = this.obtenerNodoNoVisitadoMasCercano(noVisitados, distancias);

      if (!actual || distancias.get(actual) === Infinity) {
        break;
      }

      noVisitados.delete(actual);

      if (actual === destino) {
        break;
      }

      for (const vecino of this.obtenerVecinos(actual)) {
        if (!noVisitados.has(vecino.destino)) {
          continue;
        }

        const nuevaDistancia = distancias.get(actual) + vecino.peso;

        if (nuevaDistancia < distancias.get(vecino.destino)) {
          distancias.set(vecino.destino, nuevaDistancia);
          anteriores.set(vecino.destino, actual);
        }
      }
    }

    if (distancias.get(destino) === Infinity) {
      return {
        distancia: Infinity,
        nodos: [],
        tramos: [],
      };
    }

    const nodos = this.reconstruirCamino(origen, destino, anteriores);

    return {
      distancia: distancias.get(destino),
      nodos,
      tramos: this.obtenerTramos(nodos),
    };
  }

  obtenerNodoNoVisitadoMasCercano(noVisitados, distancias) {
    let nodoMasCercano = null;
    let menorDistancia = Infinity;

    for (const nodoId of noVisitados) {
      const distancia = distancias.get(nodoId);

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        nodoMasCercano = nodoId;
      }
    }

    return nodoMasCercano;
  }

  reconstruirCamino(origen, destino, anteriores) {
    const camino = [];
    let actual = destino;

    while (actual) {
      camino.unshift(actual);

      if (actual === origen) {
        break;
      }

      actual = anteriores.get(actual);
    }

    return camino;
  }

  obtenerTramos(nodos) {
    const tramos = [];

    for (let index = 0; index < nodos.length - 1; index += 1) {
      const origen = nodos[index];
      const destino = nodos[index + 1];
      const tramo = this.obtenerVecinos(origen).find(
        (arista) => arista.destino === destino
      );

      if (tramo) {
        tramos.push(tramo);
      }
    }

    return tramos;
  }

  validarNodo(id) {
    if (!this.nodos.has(id)) {
      throw new Error(`El nodo "${id}" no existe en el grafo.`);
    }
  }

  static desde({ nodos = [], aristas = [] }) {
    const grafo = new Grafo();
    nodos.forEach((nodo) => grafo.agregarNodo(nodo.id, nodo));
    aristas.forEach((arista) =>
      grafo.agregarArista(
        arista.origen,
        arista.destino,
        arista.peso,
        arista,
        arista.bidireccional ?? true
      )
    );
    return grafo;
  }
}
