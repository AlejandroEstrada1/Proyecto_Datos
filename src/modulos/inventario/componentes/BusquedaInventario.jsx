function BusquedaInventario({ onSearchChange, onSuggestionSelect, searchTerm, suggestions }) {
  return (
    <section className="inventory-search-panel" aria-label="Busqueda de inventario">
      <div className="module-heading">
        <span>Arbol Trie</span>
        <h2>Busqueda inteligente</h2>
      </div>

      <label className="inventory-search">
        Buscar producto, codigo o categoria
        <input
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Escribe para autocompletar"
          type="search"
          value={searchTerm}
        />
      </label>

      <div className="suggestions-list">
        {searchTerm && suggestions.length ? (
          suggestions.map((suggestion) => (
            <button
              key={`${suggestion.value.id}-${suggestion.value.label}`}
              onClick={() => onSuggestionSelect(suggestion.value.label)}
              type="button"
            >
              <span>{suggestion.value.type}</span>
              <strong>{suggestion.value.label}</strong>
            </button>
          ))
        ) : (
          <p>
            {searchTerm
              ? "Sin coincidencias por ahora."
              : "El autocomplete se alimenta del inventario en tiempo real."}
          </p>
        )}
      </div>
    </section>
  );
}

export default BusquedaInventario;
