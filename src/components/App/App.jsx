import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { ModalWithForm } from "../ModalWithForm";
import { SavedNews } from "../SavedNews/SavedNews";
import { searchNews } from "../../utils/newsApi";
import { AppContext } from "../../context/AppContext";
import { InfoTooltip } from "../../tooltip/infoTooltip";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [news, setNews] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const savedNews = localStorage.getItem("news");
    if (savedNews) {
      setNews(JSON.parse(savedNews));
      setHasSearched(true);
    }
  }, []);

  const handleOpenLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    console.log("Datos de login:", data);

    if (!data.email || !data.password) {
      console.log("error: Por favor, complete todos los campos");
    }

    // Aquí agregamos la lógica de autenticación
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);

    setIsSuccess(true);
    setIsTooltipOpen(true);

    // setTimeout(() => {
    //   setIsSuccess(false);
    //   setIsTooltipOpen(false);
    // }, 1500);
  };

  const handleRegisterSubmit = (data) => {
    console.log("Datos de registro:", data);
    // Aquí agregamos la lógica de registro
    setIsLoggedIn(true);
    setIsRegisterModalOpen(false);
  };

  const handleSearch = async (search) => {
    if (!search.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchNews(search);
      setNews(results);
      setHasSearched(true);
      localStorage.setItem("news", JSON.stringify(results));
    } catch (error) {
      console.error("Error al cargar noticias", error);
      setError(
        "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="app">
        <Header
          onOpenLoginModal={handleOpenLoginModal}
          onSearch={handleSearch}
        />

        {/* {isLoading && <Preloader />} */}

        <Routes>
          <Route
            path="/"
            element={
              <Main
                news={news}
                hasSearched={hasSearched}
                isLoading={isLoading}
                error={error}
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews news={news} />} />
        </Routes>

        <Footer />

        <ModalWithForm
          isOpen={isLoginModalOpen}
          onClose={handleCloseLoginModal}
          onSubmit={handleLoginSubmit}
          title="Iniciar Sesión"
        >
          <label className="popup_text" htmlFor="register-email">
            Correo Electronico
          </label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="popup__input"
            value={data.email}
            onChange={handleChange}
            id="login-email"
            required
          />
          <label className="popup_text" htmlFor="login-password">
            Contraseña
          </label>
          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            className="popup__input"
            value={data.password}
            onChange={handleChange}
            id="login-password"
            required
          />

          <button type="submit" className="button popup__button">
            Iniciar Sesion
          </button>
          <p style={{ textAlign: "center" }}>
            o{" "}
            <button
              type="button"
              className="link-button"
              onClick={handleOpenRegisterModal}
            >
              inscribirse
            </button>
          </p>
        </ModalWithForm>

        <ModalWithForm
          isOpen={isRegisterModalOpen}
          onClose={handleCloseRegisterModal}
          onSubmit={handleRegisterSubmit}
          title="Registrarse"
        >
          <label className="popup_text" htmlFor="register-email">
            Correo Electronico
          </label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="popup__input"
            id="register-email"
          />
          <label className="popup_text" htmlFor="register-password">
            Contraseña
          </label>
          <input
            name="password"
            placeholder="Contraseña"
            type="password"
            className="popup__input"
            id="register-password"
          />

          <label className="popup_text" htmlFor="register-username">
            Nombre de usuario
          </label>
          <input
            name="username"
            placeholder="Introduce tu nombre de usuario"
            type="text"
            className="popup__input"
            id="register-username"
          />

          <button type="submit" className="button popup__button">
            Inscribirse
          </button>
          <p style={{ textAlign: "center" }}>
            o{" "}
            <button
              type="button"
              className="link-button"
              onClick={handleOpenLoginModal}
            >
              Inicia sesion
            </button>
          </p>
        </ModalWithForm>

        <InfoTooltip
          isOpen={isTooltipOpen}
          success={isSuccess}
          onClose={() => setIsTooltipOpen(false)}
        />
      </div>
    </AppContext.Provider>
  );
};
