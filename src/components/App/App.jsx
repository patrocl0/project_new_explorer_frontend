import { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Header } from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import * as auth from "../../utils/auth";
import { SavedNews } from "../SavedNews/SavedNews";
import { searchNews } from "../../utils/newsApi";
import { AppContext } from "../../context/AppContext";
import { InfoTooltip } from "../../tooltip/infoTooltip";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { getToken, setToken } from "../../utils/token";
import * as articlesApi from "../../utils/articlesApi";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";

export const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [news, setNews] = useState([]);
  const [savedNews, setSavedNews] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [textTooltip, setTextTooltip] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  // FORM STATE
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [serverError, setServerError] = useState("");

  // RESET FORM
  const resetForm = useCallback(() => {
    setData({
      email: "",
      password: "",
      username: "",
    });

    setErrors({});
    setIsValid(false);
    setServerError("");
  }, []);

  // VALIDACIÓN INSTANTÁNEA
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: e.target.validationMessage,
    }));

    setIsValid(e.target.closest("form").checkValidity());
  }, []);

  // MODALS
  const handleOpenLoginModal = useCallback(() => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
    resetForm();
  }, [resetForm]);

  const handleOpenRegisterModal = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
    resetForm();
  }, [resetForm]);

  const handleCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
    resetForm();
  }, [resetForm]);

  const handleCloseRegisterModal = useCallback(() => {
    setIsRegisterModalOpen(false);
    resetForm();
  }, [resetForm]);

  // LOGIN SUBMIT
  const handleLoginSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setServerError("");

      const { email, password } = data;

      auth
        .authorize(email, password)
        .then(async (data) => {
          if (data.token) {
            setToken(data.token);

            const userData = await auth.checkToken(data.token);

            setUserData(userData);
            setIsLoggedIn(true);
            setTextTooltip("¡Bienvenido!");
            setIsSuccess(true);
            setIsTooltipOpen(true);
            setIsLoginModalOpen(false);

            setTimeout(() => {
              setIsTooltipOpen(false);
            }, 1500);

            resetForm();
          }
        })
        .catch(() => {
          setServerError("Correo o contraseña incorrectos.");
        });
    },
    [data, resetForm],
  );

  // REGISTER SUBMIT
  const handleRegisterSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setServerError("");

      const { email, password, username } = data;

      auth
        .register(email, password, username)
        .then(() => {
          setIsRegisterModalOpen(false);
          resetForm();
          setTextTooltip("¡El registro se ah completado con exito!");
          setIsSuccess(true);
          setIsTooltipOpen(true);

          setTimeout(() => {
            setIsTooltipOpen(false);
          }, 1500);
        })
        .catch(() => {
          setServerError(
            "No se pudo registrar el usuario. Intenta nuevamente.",
          );
          setIsSuccess(false);
        });
    },
    [data, resetForm],
  );

  // SEARCH
  const handleSearch = useCallback(async (search) => {
    if (!search.trim()) return;

    setKeyword(search);
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchNews(search);
      setNews(results);
      setHasSearched(true);

      localStorage.setItem("news", JSON.stringify(results));
      localStorage.setItem("keyword", JSON.stringify(search));
    } catch (error) {
      console.error("Error al cargar noticias", error);
      setError(
        "Lo sentimos, algo ha salido mal durante la solicitud. Es posible que haya un problema de conexión o que el servidor no funcione. Por favor, inténtalo más tarde",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const news = localStorage.getItem("news");
    const keyword = localStorage.getItem("keyword");

    if (news) {
      setNews(JSON.parse(news));
      setHasSearched(true);
    }

    if (keyword) {
      setKeyword(JSON.parse(keyword));
    }

    const jwt = getToken();

    if (!jwt) {
      setIsAuthChecked(true);
      return;
    }

    auth
      .checkToken(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setUserData(data);

        return articlesApi.getSavedArticles();
      })
      .then((articles) => {
        setSavedNews(articles);
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        isAuthChecked,
        handleOpenLoginModal,
        savedNews,
        setSavedNews,
      }}
    >
      <div className="app">
        <Header
          onOpenLoginModal={handleOpenLoginModal}
          onSearch={handleSearch}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                news={news}
                keyword={keyword}
                hasSearched={hasSearched}
                isLoading={isLoading}
                error={error}
              />
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute>
                <SavedNews />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <Login
          isOpen={isLoginModalOpen}
          onClose={handleCloseLoginModal}
          onSubmit={handleLoginSubmit}
          onSwitchToRegister={handleOpenRegisterModal}
          data={data}
          handleChange={handleChange}
          errors={errors}
          isValid={isValid}
          serverError={serverError}
        />

        <Register
          isOpen={isRegisterModalOpen}
          onClose={handleCloseRegisterModal}
          onSubmit={handleRegisterSubmit}
          onSwitchToLogin={handleOpenLoginModal}
          data={data}
          handleChange={handleChange}
          errors={errors}
          isValid={isValid}
          serverError={serverError}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          success={isSuccess}
          onClose={() => setIsTooltipOpen(false)}
          text={textTooltip}
        />
      </div>
    </AppContext.Provider>
  );
};
