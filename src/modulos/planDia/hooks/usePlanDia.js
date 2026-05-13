import { useMemo, useState } from "react";
import { pedidosIniciales } from "../../../utilidades/datosIniciales";
import {
  obtenerPedidosPriorizados,
  obtenerResumenPlanDia,
  procesarSiguientePedido,
} from "../services/servicioPlanDia";

export function usePlanDia() {
  const [pedidos, setPedidos] = useState(pedidosIniciales);
  const [historialProcesados, setHistorialProcesados] = useState([]);

  const pedidosPriorizados = useMemo(() => {
    return obtenerPedidosPriorizados(pedidos);
  }, [pedidos]);

  const resumen = useMemo(() => {
    return obtenerResumenPlanDia(pedidos);
  }, [pedidos]);

  const procesarSiguiente = () => {
    const resultado = procesarSiguientePedido(pedidos);

    if (!resultado.pedidoProcesado) {
      return;
    }

    setPedidos(resultado.pedidosRestantes);
    setHistorialProcesados((historialActual) => [
      resultado.pedidoProcesado,
      ...historialActual,
    ]);
  };

  return {
    pedidos,
    pedidosPriorizados,
    historialProcesados,
    resumen,
    procesarSiguiente,
  };
}