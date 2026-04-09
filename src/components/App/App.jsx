import { useState, useEffect } from "react";
import "./App.css";
import { Header } from "../Header/Header";
import { Route, Routes } from "react-router-dom";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { ModalWithForm } from "../ModalWithForm";
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
  const [hasSearched, setHasSearched] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOpenLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
    resetForm();
  };

  const handleOpenRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
    resetForm();
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    resetForm();
  };
  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
    resetForm();
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const { email, password } = data;

    auth
      .authorize(email, password)
      .then(async (data) => {
        if (data.token) {
          setToken(data.token);

          const userData = await auth.checkToken(data.token);
          setUserData(userData);
          setIsLoggedIn(true);
          setIsLoginModalOpen(false);

          setTimeout(() => {
            setIsSuccess(true);
            setIsTooltipOpen(true);
          }, 1500);

          resetForm();
        }
      })
      .catch((error) => {
        console.log(error);

        setTimeout(() => {
          setIsSuccess(false);
          setIsTooltipOpen(true);
        }, 1500);
      });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    console.log("Datos de registro:", data);
    const { email, password, username } = data;

    auth
      .register(email, password, username)
      .then(() => {
        setIsSuccess(true);
        setIsTooltipOpen(true);
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  };

  const handleSearch = async (search) => {
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
  };

  const resetForm = () => {
    setData({
      email: "",
      password: "",
      username: "",
    });
  };

  useEffect(() => {
    const savedNews = localStorage.getItem("news");
    const keyword = localStorage.getItem("keyword");
    if (savedNews) {
      setNews(JSON.parse(savedNews));
      setHasSearched(true);
    }

    if (keyword) {
      setKeyword(JSON.parse(keyword));
    }

    const jwt = getToken();
    if (!jwt) return;

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

        {/* {isLoading && <Preloader />} */}

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
                <SavedNews news={savedNews} />
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
        />

        <Register
          isOpen={isRegisterModalOpen}
          onClose={handleCloseRegisterModal}
          onSubmit={handleRegisterSubmit}
          onSwitchToLogin={handleOpenLoginModal}
          data={data}
          handleChange={handleChange}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          success={isSuccess}
          onClose={() => setIsTooltipOpen(false)}
        />
      </div>
    </AppContext.Provider>
  );
};
