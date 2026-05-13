function NodoRuta({ nodo }) {
  return (
    <div
      className={`nodo-ruta nodo-${nodo.tipo}`}
      style={{
        left: `${nodo.x}%`,
        top: `${nodo.y}%`,
      }}
    >
      {nodo.nombre.split("\n").map((linea) => (
        <span key={linea}>{linea}</span>
      ))}
    </div>
  );
}

export default NodoRuta;