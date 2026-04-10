import "./NewsCard.css";
import { useContext, useState } from "react";
import fondo from "../../images/news.jpg";
import { useLocation } from "react-router-dom";
import * as articlesApi from "../../utils/articlesApi";
import { AppContext } from "../../context/AppContext";

export const NewsCard = ({ article, keyword }) => {
  const { isLoggedIn, handleOpenLoginModal, savedNews, setSavedNews } =
    useContext(AppContext);

  const location = useLocation();
  const isOnSavedNews = location.pathname === "/saved-news";

  const [isSaved, setIsSaved] = useState(false);

  const saveKeyword = article.keyword;
  const title = article.title;
  const description = article.description || article.text;
  const date = article.publishedAt || article.date;
  const image = article.urlToImage || article.image || fondo;
  const link = article.url || article.link;
  const source = article.source?.name || article.source;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleToggle = async () => {
    if (!isLoggedIn) {
      handleOpenLoginModal(); // abre modal si no está logueado
      return;
    }
    setIsSaved(!isSaved);

    if (isOnSavedNews) {
      try {
        await articlesApi.deleteArticle(article._id);
        setSavedNews((prev) => prev.filter((a) => a._id !== article._id));
      } catch (error) {
        console.log("Error eliminando artículo:", error);
      }
      return;
    }

    if (!isSaved) {
      const articleData = {
        keyword: keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      };

      try {
        const savedArticle = await articlesApi.saveArticle(articleData);
        console.log("Guardado en BD:", savedArticle);
        setIsSaved(true);
      } catch (error) {
        console.log("Error guardando artículo:", error);
      }
    }
  };

  return (
    <li className="card">
      {isOnSavedNews && <p className="card__keyword">{saveKeyword}</p>}

      <a href={link} target="_blank" rel="noopener noreferrer">
        <img className="card__image" src={image} alt={title} />
      </a>

      <button
        className={`card__action ${
          !isLoggedIn ? "card__action--disabled" : ""
        } ${isSaved ? "card__action--active" : ""}`}
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

      {!isLoggedIn ? (
        <p className="card__tooltip">Inicia sesión para guardar artículos</p>
      ) : (
        <p className="card__tooltip">
          {isOnSavedNews ? "Remove from saved" : "Desea guardar este articulo"}
        </p>
      )}

      <div className="card__content">
        <p className="card__date">{formatDate(date)}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <h2 className="card__title">{title}</h2>
        </a>
        <p className="card__description">{description}</p>
        <span className="card__source">{source}</span>
      </div>
    </li>
  );
};
