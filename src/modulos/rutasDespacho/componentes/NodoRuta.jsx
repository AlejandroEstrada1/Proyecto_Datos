function NodoRuta({ activo, esDestino, esOrigen, nodo, onSelect }) {
  const isSelectable = nodo.tipo === "cliente";

  return (
    <button
      className={[
        "route-node",
        activo ? "route-node-active" : "",
        esOrigen ? "route-node-origin" : "",
        esDestino ? "route-node-destination" : "",
      ].join(" ")}
      disabled={!isSelectable}
      onClick={() => isSelectable && onSelect(nodo.id)}
      style={{ left: `${nodo.x}%`, top: `${nodo.y}%` }}
      title={nodo.nombre}
      type="button"
    >
      <span>{nodo.nombre}</span>
    </button>
  );
}

export default NodoRuta;
