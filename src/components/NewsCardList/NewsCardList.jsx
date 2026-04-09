import "./NewsCardList.css";
import { useState } from "react";
import { NewsCard } from "../NewsCard/NewsCard";

export const NewsCardList = ({ news, keyword }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleNews = news.slice(0, visibleCount);

  return (
    <div className="news-list">
      <h2 className="news-list__title"> Resultados de la busquedad</h2>

      <ul className="news-list__cards ">
        {visibleNews.map((article, index) => (
          <NewsCard
            key={article._id || index}
            article={article}
            keyword={keyword}
          />
        ))}
      </ul>

      {visibleCount < news.length && (
        <button className="news-list__button" onClick={handleShowMore}>
          Mostrar más
        </button>
      )}
    </div>
  );
};
