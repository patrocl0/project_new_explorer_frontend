import "./SearchForm.css";
import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [search, setsearch] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      setError("Por favor, introduzca una palabra clave");
      return;
    }
    setError("");
    if (onSearch) {
      onSearch(search);
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Introduce un tema"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          aria-label="Buscar"
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </div>
      {error && <p className="search-error">{error}</p>}
    </form>
  );
};

export default SearchForm;
