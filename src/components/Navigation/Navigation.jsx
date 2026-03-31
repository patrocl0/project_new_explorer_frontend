import "./Navigation.css";

export const Navigation = ({ isLoggedIn, onOpenLoginModal }) => {
  return (
    <nav className="nav">
      <ul className="nav__links">
        <li>
          <a href="/" className="nav__link">
            Inicio
          </a>
        </li>
        {isLoggedIn && (
          <li>
            <a href="/saved-news" className="nav__link">
              Articulos guardados
            </a>
          </li>
        )}
        <li>
          <button onClick={onOpenLoginModal} className="nav__link nav__button">
            Iniciar Sesion
          </button>
        </li>
      </ul>
    </nav>
  );
};
