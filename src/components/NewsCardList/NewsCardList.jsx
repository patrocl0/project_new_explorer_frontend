import React, { useState } from "react";
import { NewsCard } from "../NewsCard/NewsCard";

export const NewsCardList = ({ news }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleNews = news.slice(0, visibleCount);

  return (
    <div className="content__card">
      <h2> Resultados de la busquedad</h2>

      <ul className="cards__list">
        {visibleNews.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </ul>

      {visibleCount < news.length && (
        <button className="vermas" onClick={handleShowMore}>
          Mostrar más
        </button>
      )}
    </div>
  );
};
