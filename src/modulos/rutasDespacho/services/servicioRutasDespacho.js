import Grafo from "../../../estructuras/Grafo";
import {
  conexionesRutaDespacho,
  nodosRutaDespacho,
} from "../../../utilidades/datosIniciales";

export function construirGrafoDespacho() {
  const grafo = new Grafo();

  nodosRutaDespacho.forEach((nodo) => {
    grafo.agregarVertice(nodo.id);
  });

  conexionesRutaDespacho.forEach((conexion) => {
    grafo.agregarArista(conexion.origen, conexion.destino, conexion.peso);
  });

  return grafo;
}

export function obtenerRutaOptima(origen, destino) {
  const grafo = construirGrafoDespacho();

  return grafo.obtenerRutaMasCorta(origen, destino);
}

export function obtenerRutasOptimasDesdeBodega() {
  const grafo = construirGrafoDespacho();

  const clientes = nodosRutaDespacho.filter((nodo) => nodo.tipo === "cliente");

  return clientes.map((cliente) => {
    const resultado = grafo.obtenerRutaMasCorta("bodega", cliente.id);

    return {
      clienteId: cliente.id,
      clienteNombre: cliente.nombre,
      ruta: resultado.ruta,
      distancia: resultado.distancia,
    };
  });
}

export function obtenerNombreNodo(idNodo) {
  const nodo = nodosRutaDespacho.find((item) => item.id === idNodo);

  if (!nodo) {
    return idNodo;
  }

  return nodo.nombre.replace("\n", " ");
}

export function obtenerDatosGrafoDespacho() {
  return {
    nodos: nodosRutaDespacho,
    conexiones: conexionesRutaDespacho,
    rutasOptimas: obtenerRutasOptimasDesdeBodega(),
  };
}