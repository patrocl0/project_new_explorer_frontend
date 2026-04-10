import "./header.css";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchHeader } from "../SearchHeader/SearchHeader";
import { SavedNewsHeader } from "../SavedNewsHeader/SavedNewsHeader";
import { AppContext } from "../../context/AppContext";
import { Navigation } from "../Navigation/Navigation";
import { removeToken } from "../../utils/token";

export const Header = ({ onOpenLoginModal, onSearch }) => {
  const { setIsLoggedIn, isLoggedIn, userData } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  function signOut() {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <div
      className={`header ${
        isLoggedIn && isOnSavedNews
          ? "header--saved-news"
          : "header--search-news"
      } ${isMenuOpen ? "header_opened" : ""}`}
    >
      <div className="header__top">
        <div className="header__logo">
          <h1 className="header__title">New Explorer</h1>
        </div>

        <button
          className="header__menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMenuOpen ? (
            <i className="fa-solid fa-xmark"></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
        </button>

        <Navigation onOpenLoginModal={onOpenLoginModal} />
      </div>

      <div className="header__mobile-menu">
        <Link to="/" className="header__mobile-link">
          Inicio
        </Link>

        {isLoggedIn && (
          <Link to="/saved-news" className="header__mobile-link">
            Articulos guardados
          </Link>
        )}

        {isLoggedIn ? (
          <button className="header__mobile-button" onClick={signOut}>
            {userData?.username}{" "}
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        ) : (
          <button onClick={onOpenLoginModal} className="header__mobile-button">
            Iniciar Sesion
          </button>
        )}
      </div>

      {isOnSavedNews && isLoggedIn ? (
        <SavedNewsHeader />
      ) : (
        <SearchHeader onSearch={onSearch} />
      )}
    </div>
  );
};
