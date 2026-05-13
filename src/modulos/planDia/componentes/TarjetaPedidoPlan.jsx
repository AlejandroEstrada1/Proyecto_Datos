function TarjetaPedidoPlan({ pedido }) {
  return (
    <article className="tarjeta-pedido-plan">
      <p>{pedido.codigo}</p>
      <p>Cliente: {pedido.cliente}</p>
      <p>Producto: {pedido.producto}</p>
      <p>Prioridad: {pedido.prioridad}</p>
      <p>Estado: {pedido.estado}</p>
    </article>
  );
}

export default TarjetaPedidoPlan;