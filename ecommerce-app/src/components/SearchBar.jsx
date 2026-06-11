function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Buscar producto..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar;