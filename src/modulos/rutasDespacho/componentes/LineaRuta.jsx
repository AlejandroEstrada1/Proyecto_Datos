function getLineStyle(origen, destino) {
  const deltaX = destino.x - origen.x;
  const deltaY = destino.y - origen.y;
  const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return {
    left: `${origen.x}%`,
    top: `${origen.y}%`,
    width: `${length}%`,
    transform: `rotate(${angle}deg)`,
  };
}

function LineaRuta({ activa, destino, origen, peso, via }) {
  return (
    <div
      className={`route-line ${activa ? "route-line-active" : ""}`}
      style={getLineStyle(origen, destino)}
    >
      <span>
        {via} - {peso} km
      </span>
    </div>
  );
}

export default LineaRuta;
