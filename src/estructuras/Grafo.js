class Grafo {
  constructor() {
    this.listaAdyacencia = {};
  }

  agregarVertice(vertice) {
    if (!this.listaAdyacencia[vertice]) {
      this.listaAdyacencia[vertice] = [];
    }
  }

  agregarArista(origen, destino, peso) {
    this.agregarVertice(origen);
    this.agregarVertice(destino);

    this.listaAdyacencia[origen].push({
      nodo: destino,
      peso,
    });

    this.listaAdyacencia[destino].push({
      nodo: origen,
      peso,
    });
  }

  obtenerVecinos(vertice) {
    return this.listaAdyacencia[vertice] || [];
  }

  obtenerVertices() {
    return Object.keys(this.listaAdyacencia);
  }

  obtenerAristas() {
    const aristas = [];
    const visitadas = new Set();

    for (const origen in this.listaAdyacencia) {
      this.listaAdyacencia[origen].forEach((conexion) => {
        const claveA = `${origen}-${conexion.nodo}`;
        const claveB = `${conexion.nodo}-${origen}`;

        if (!visitadas.has(claveA) && !visitadas.has(claveB)) {
          aristas.push({
            origen,
            destino: conexion.nodo,
            peso: conexion.peso,
          });

          visitadas.add(claveA);
        }
      });
    }

    return aristas;
  }

  dijkstra(origen) {
    const distancias = {};
    const anteriores = {};
    const noVisitados = new Set(this.obtenerVertices());

    this.obtenerVertices().forEach((vertice) => {
      distancias[vertice] = Infinity;
      anteriores[vertice] = null;
    });

    distancias[origen] = 0;

    while (noVisitados.size > 0) {
      let verticeActual = null;

      noVisitados.forEach((vertice) => {
        if (
          verticeActual === null ||
          distancias[vertice] < distancias[verticeActual]
        ) {
          verticeActual = vertice;
        }
      });

      if (verticeActual === null || distancias[verticeActual] === Infinity) {
        break;
      }

      noVisitados.delete(verticeActual);

      this.obtenerVecinos(verticeActual).forEach((vecino) => {
        const distanciaNueva = distancias[verticeActual] + vecino.peso;

        if (distanciaNueva < distancias[vecino.nodo]) {
          distancias[vecino.nodo] = distanciaNueva;
          anteriores[vecino.nodo] = verticeActual;
        }
      });
    }

    return {
      distancias,
      anteriores,
    };
  }

  obtenerRutaMasCorta(origen, destino) {
    const resultado = this.dijkstra(origen);
    const ruta = [];
    let actual = destino;

    while (actual !== null) {
      ruta.unshift(actual);
      actual = resultado.anteriores[actual];
    }

    if (ruta[0] !== origen) {
      return {
        ruta: [],
        distancia: Infinity,
      };
    }

    return {
      ruta,
      distancia: resultado.distancias[destino],
    };
  }
}

export default Grafo;