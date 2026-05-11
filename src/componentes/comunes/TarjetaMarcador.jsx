function TarjetaMarcador({ title, children }) {
  return (
    <article className="placeholder-card">
      <h2>{title}</h2>
      <p>{children}</p>
    </article>
  );
}

export default TarjetaMarcador;
