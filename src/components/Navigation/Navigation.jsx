import { useContext } from "react";
import "./Navigation.css";
import { AppContext } from "../../context/AppContext";
import { removeToken } from "../../utils/token";
import { Link, useNavigate } from "react-router-dom";

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
          <Link to="/" className="nav__link">
            Inicio
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/saved-news" className="nav__link">
              Artículos guardados
            </Link>
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
