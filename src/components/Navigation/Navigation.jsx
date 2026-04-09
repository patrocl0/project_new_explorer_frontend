import { useContext } from "react";
import "./Navigation.css";
import { AppContext } from "../../context/AppContext";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";

export const Navigation = ({ onOpenLoginModal }) => {
  const { setIsLoggedIn, isLoggedIn, userData, setUserData } =
    useContext(AppContext);

  const navigate = useNavigate();

  function signOut() {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  }

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
          {isLoggedIn ? (
            <button className="header__mobile-button" onClick={signOut}>
              {userData?.username}{" "}
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="nav__link nav__button"
            >
              Iniciar Sesion
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
