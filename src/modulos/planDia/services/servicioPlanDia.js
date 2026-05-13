import HeapPrioridad from "../../../estructuras/HeapPrioridad";
import ListaEnlazada from "../../../estructuras/ListaEnlazada";

export function obtenerPedidosPriorizados(pedidos) {
  const heap = new HeapPrioridad();

  pedidos.forEach((pedido) => {
    heap.insertar(pedido);
  });

  const pedidosOrdenados = [];

  while (!heap.estaVacio()) {
    pedidosOrdenados.push(heap.extraerMaximo());
  }

  return pedidosOrdenados;
}

export function construirListaPlanDia(pedidos) {
  const lista = new ListaEnlazada();

  pedidos.forEach((pedido) => {
    lista.insertarAlFinal(pedido);
  });

  return lista;
}

export function procesarSiguientePedido(pedidos) {
  const pedidosPriorizados = obtenerPedidosPriorizados(pedidos);

  if (pedidosPriorizados.length === 0) {
    return {
      pedidoProcesado: null,
      pedidosRestantes: [],
    };
  }

  const pedidoProcesado = {
    ...pedidosPriorizados[0],
    estado: "Procesado para despacho",
  };

  const pedidosRestantes = pedidosPriorizados.slice(1);

  return {
    pedidoProcesado,
    pedidosRestantes,
  };
}

export function obtenerResumenPlanDia(pedidos) {
  return {
    total: pedidos.length,
    prioridadAlta: pedidos.filter((pedido) => pedido.prioridad === "ALTA")
      .length,
    prioridadMedia: pedidos.filter((pedido) => pedido.prioridad === "MEDIA")
      .length,
    prioridadBaja: pedidos.filter((pedido) => pedido.prioridad === "BAJA")
      .length,
  };
}