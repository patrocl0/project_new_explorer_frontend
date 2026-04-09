import { useContext, useEffect, useState } from "react";
import { NewsCard } from "../NewsCard/NewsCard";
import { AppContext } from "../../context/AppContext";
import * as articlesApi from "../../utils/articlesApi";

export const SavedNews = ({ news }) => {
  const { savedNews, setSavedNews } = useContext(AppContext);
  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleNews = savedNews.slice(0, visibleCount);

  useEffect(() => {
    articlesApi
      .getSavedArticles()
      .then((articles) => {
        setSavedNews(articles);
      })
      .catch((err) => console.log("Error cargando artículos:", err));
  }, [setSavedNews]);

  return (
    <div className="news-list">
      <h2 className="news-list__title"> Resultados de la busquedad</h2>

      <ul className="news-list__cards ">
        {visibleNews.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </ul>

      {visibleCount < savedNews.length && (
        <button className="news-list__button" onClick={handleShowMore}>
          Mostrar más
        </button>
      )}
    </div>
  );
};
