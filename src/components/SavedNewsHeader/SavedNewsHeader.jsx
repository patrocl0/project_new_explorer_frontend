import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const SavedNewsHeader = () => {
  const { userData, savedNews } = useContext(AppContext);

  const countArticle = savedNews.length;

  const keywords = [...new Set(savedNews.map((a) => a.keyword))];

  const firstTwo = keywords.slice(0, 2);

  const remaining = keywords.length - firstTwo.length;

  return (
    <div className="header__saved_news">
      <div className="header__saved_news_text">
        <p>Articulos Guardados</p>
        <h2 className="header__saved_news_title">
          {userData?.username} , tienes {countArticle} articulos{" "}
          <span className="text-break-line">guardados</span>
        </h2>
        <p>
          {" "}
          Por palabras clave:{" "}
          {keywords.length === 0
            ? "No tienes palabras clave"
            : remaining > 0
              ? `${firstTwo.join(", ")} y ${remaining} más`
              : firstTwo.join(", ")}
        </p>
      </div>
    </div>
  );
};
