import { useMemo, useState } from "react";
import {
  obtenerDatosGrafoDespacho,
  obtenerNombreNodo,
  obtenerRutaOptima,
} from "../services/servicioRutasDespacho";

export function useRutasDespacho() {
  const [destinoSeleccionado, setDestinoSeleccionado] = useState("cliente-a");

  const datosGrafo = useMemo(() => {
    return obtenerDatosGrafoDespacho();
  }, []);

  const rutaSeleccionada = useMemo(() => {
    return obtenerRutaOptima("bodega", destinoSeleccionado);
  }, [destinoSeleccionado]);

  const rutaTexto = useMemo(() => {
    if (!rutaSeleccionada.ruta.length) {
      return "No existe ruta disponible";
    }

    return rutaSeleccionada.ruta.map(obtenerNombreNodo).join(" → ");
  }, [rutaSeleccionada]);

  return {
    nodos: datosGrafo.nodos,
    conexiones: datosGrafo.conexiones,
    rutasOptimas: datosGrafo.rutasOptimas,
    destinoSeleccionado,
    setDestinoSeleccionado,
    rutaSeleccionada,
    rutaTexto,
  };
}