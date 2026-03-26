import React from "react";
import fondo from "../../images/fondo-header.jpg";

export const NewsCard = ({ article }) => {
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

      <button aria-label="Search card" className="card__search" type="button">
        {" "}
        search
      </button>

      <button
        aria-label="Delete card"
        className="card__delete-info"
        type="button"
      >
        Remove from saved
      </button>

      <button aria-label="Delete card" className="card__delete" type="button">
        <i className="fa-solid fa-trash"></i>
      </button>

      <div className="card__info">
        <p className="card__date">{formatDate(article.publishedAt)}</p>
        <h2 className="card__title">{article.title}</h2>
        <p className="card__description">{article.description}</p>
        <span className="card__source">{article.source.name}</span>
      </div>
    </li>
  );
};
