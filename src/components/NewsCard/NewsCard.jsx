import "./NewsCard.css";
import { useContext, useState } from "react";
import fondo from "../../images/news.jpg";
import { AppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

export const NewsCard = ({ article }) => {
  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  const [isSaved, setIsSaved] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleToggle = () => {
    setIsSaved(!isSaved);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={article.urlToImage || fondo}
        alt={article.title}
      />

      {/* <button aria-label="Search card" className="card__search" type="button">
        {" "}
        search
      </button> */}

      {/* hover */}
      <p className="card__tooltip">
        {isOnSavedNews
          ? "Remove from saved"
          : "Inicia sesión para guardar artículos"}
      </p>

      <button
        className={`card__action ${
          isSaved ? "card__action--active" : ""
        } ${isOnSavedNews ? "card__action--remove" : "card__action--save"}`}
        onClick={handleToggle}
        type="button"
        aria-label={isOnSavedNews ? "Eliminar artículo" : "Guardar artículo"}
      >
        <i
          className={
            isOnSavedNews
              ? "fa-regular fa-trash-can"
              : isSaved
                ? "fa-solid fa-bookmark"
                : "fa-regular fa-bookmark"
          }
        ></i>
      </button>

      {/* {isOnSavedNews ? (
        <button
          className={`card__icon ${isSaved ? "card__icon--active" : ""}`}
          onClick={handleToggle}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          type="button"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      ) : (
        <button
          className={`card__icon ${isSaved ? "card__icon--active" : ""}`}
          onClick={handleToggle}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          type="button"
        >
          <i
            className={
              isSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"
            }
          ></i>
        </button>
      )} */}

      <div className="card__content">
        <p className="card__date">{formatDate(article.publishedAt)}</p>
        <h2 className="card__title">{article.title}</h2>
        <p className="card__description">{article.description}</p>
        <span className="card__source">{article.source.name}</span>
      </div>
    </li>
  );
};
