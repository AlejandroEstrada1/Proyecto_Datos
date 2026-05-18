import { useMemo, useState } from "react";
import {
  calcularRutaOptima,
  obtenerDestinosDespacho,
  obtenerMapaRutasDespacho,
} from "../services/servicioRutasDespacho.js";

export function useRutasDespacho() {
  const destinos = useMemo(() => obtenerDestinosDespacho(), []);
  const mapa = useMemo(() => obtenerMapaRutasDespacho(), []);
  const [destinoSeleccionado, setDestinoSeleccionado] = useState(
    destinos[0]?.id ?? ""
  );

  const rutaOptima = useMemo(() => {
    if (!destinoSeleccionado) {
      return {
        distancia: 0,
        nodos: [],
        puntos: [],
        tramos: [],
      };
    }

    return calcularRutaOptima(destinoSeleccionado);
  }, [destinoSeleccionado]);

  return {
    destinos,
    destinoSeleccionado,
    mapa,
    rutaOptima,
    setDestinoSeleccionado,
  };
}
