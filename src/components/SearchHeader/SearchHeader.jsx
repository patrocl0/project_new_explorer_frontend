import SearchForm from "../SearchForm/SearchForm";

export const SearchHeader = ({ onSearch }) => {
  return (
    <div className="header__content">
      <div className="header__text">
        <h2 className="heading__text-title">
          ¿Qué esta pasando{" "}
          <span className="text-break-line">en el mundo?</span>
        </h2>
        <p>
          Encuentra las últimas noticias sobre cualquier tema y guardalas en tu{" "}
          <span className="text-break-line">cuenta personal</span>
        </p>

        <SearchForm onSearch={onSearch} />
      </div>
    </div>
  );
};
