import { Grafo } from "../../../estructuras/Grafo.js";
import {
  aristasRutaDespacho,
  destinosRutaDespacho,
  nodosRutaDespacho,
  RUTA_ORIGEN_ID,
} from "../../../utilidades/datosRutasDespacho.js";

export function crearGrafoDespacho() {
  return Grafo.desde({
    nodos: nodosRutaDespacho,
    aristas: aristasRutaDespacho,
  });
}

export function obtenerDestinosDespacho() {
  return destinosRutaDespacho;
}

export function calcularRutaOptima(destinoId) {
  const grafo = crearGrafoDespacho();
  const resultado = grafo.caminoMasCorto(RUTA_ORIGEN_ID, destinoId);

  return {
    ...resultado,
    puntos: resultado.nodos.map((nodoId) => grafo.obtenerNodo(nodoId)),
    tramos: resultado.tramos.map((tramo) => ({
      ...tramo,
      origenNodo: grafo.obtenerNodo(tramo.origen),
      destinoNodo: grafo.obtenerNodo(tramo.destino),
    })),
  };
}

export function obtenerMapaRutasDespacho() {
  return {
    origenId: RUTA_ORIGEN_ID,
    nodos: nodosRutaDespacho,
    aristas: aristasRutaDespacho,
  };
}
