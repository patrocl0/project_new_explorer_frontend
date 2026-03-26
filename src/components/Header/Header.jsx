import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { SearchHeader } from "../SearchHeader/SearchHeader";
import { SavedNewsHeader } from "../SavedNewsHeader/SavedNewsHeader";
import { AppContext } from "../../context/AppContext";

export const Header = ({ onOpenLoginModal, onSearch }) => {
  const { setIsLoggedIn, isLoggedIn } = useContext(AppContext);

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";
  setIsLoggedIn(true);
  console.log(isLoggedIn);

  return (
    <header
      className={`header ${
        isLoggedIn && isOnSavedNews
          ? "header--saved-news"
          : "header--search-news"
      }`}
    >
      <nav className="nav">
        <h1 className="header__title">New Explorer</h1>
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
            <button
              onClick={onOpenLoginModal}
              className="nav__link nav__button"
            >
              Iniciar Sesion
            </button>
          </li>
        </ul>
      </nav>
      <hr className="header__line" />

      {isOnSavedNews ? (
        <SavedNewsHeader />
      ) : (
        <SearchHeader onSearch={onSearch} />
      )}
    </header>
  );
};
