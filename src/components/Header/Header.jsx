import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { SearchHeader } from "../SearchHeader/SearchHeader";
import { SavedNewsHeader } from "../SavedNewsHeader/SavedNewsHeader";
import { AppContext } from "../../context/AppContext";

export const Header = ({ onOpenLoginModal, onSearch }) => {
  const { setIsLoggedIn, isLoggedIn } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";
  setIsLoggedIn(true);
  console.log(isLoggedIn);

  return (
    <div
      className={`header ${
        isLoggedIn && isOnSavedNews
          ? "header--saved-news"
          : "header--search-news"
      } ${isMenuOpen ? "header_opened" : ""}`}
    >
      {/* 
    <div className={`header ${isMenuOpen ? "header_opened" : ""}`}>
      {isMenuOpen && (
        <div className="header__mobile-menu">
          <p className="header__email">{userData.email}</p>
          <button className="header__logout" onClick={signOut}>
            Cerrar sesión
          </button>
          <hr className="header__line" />
        </div>
      )} */}

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
              <button
                onClick={onOpenLoginModal}
                className="nav__link nav__button"
              >
                Iniciar Sesion
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="header__mobile-menu">
        <a href="/" className="header__mobile-link">
          Inicio
        </a>

        {isLoggedIn && (
          <a href="/saved-news" className="header__mobile-link">
            Articulos guardados
          </a>
        )}

        <button onClick={onOpenLoginModal} className="header__mobile-button">
          Iniciar Sesion
        </button>
      </div>

      {/* <hr className="header__line" /> */}

      {isOnSavedNews ? (
        <SavedNewsHeader />
      ) : (
        <SearchHeader onSearch={onSearch} />
      )}
    </div>
  );
};
