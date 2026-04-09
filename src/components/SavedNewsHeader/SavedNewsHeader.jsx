import { useContext, useMemo } from "react";
import { AppContext } from "../../context/AppContext";

export const SavedNewsHeader = () => {
  const { userData, savedNews } = useContext(AppContext);

  const articlesCount = savedNews.length;

  const keywordsText = useMemo(() => {
    if (savedNews.length === 0) return "";

    // contar keywords
    const keywordsCount = {};

    savedNews.forEach((article) => {
      const keyword = article.keyword;
      keywordsCount[keyword] = (keywordsCount[keyword] || 0) + 1;
    });

    // ordenar por popularidad
    const sortedKeywords = Object.entries(keywordsCount)
      .sort((a, b) => b[1] - a[1])
      .map((item) => item[0]);

    if (sortedKeywords.length <= 3) {
      return sortedKeywords.join(", ");
    }

    return `${sortedKeywords[0]}, ${sortedKeywords[1]} y ${
      sortedKeywords.length - 2
    } más`;
  }, [savedNews]);

  return (
    <div className="header__saved_news">
      <div className="header__saved_news_text">
        <p>Artículos guardados</p>

        <h2 className="header__saved_news_title">
          {userData?.username}, tienes {articlesCount} artículos{" "}
          <span className="text-break-line">guardados</span>
        </h2>

        {savedNews.length > 0 && (
          <p>
            Por palabras clave: <b>{keywordsText}</b>
          </p>
        )}
      </div>
    </div>
  );
};

// import { useContext } from "react";
// import { AppContext } from "../../context/AppContext";

// export const SavedNewsHeader = () => {
//   const { userData, savedNews } = useContext(AppContext);

//   const countArticle = savedNews.length;

//   const keywords = [...new Set(savedNews.map((a) => a.keyword))];

//   const firstTwo = keywords.slice(0, 2);

//   const remaining = keywords.length - firstTwo.length;

//   return (
//     <div className="header__saved_news">
//       <div className="header__saved_news_text">
//         <p>Articulos Guardados</p>
//         <h2 className="header__saved_news_title">
//           {userData?.username} , tienes {countArticle} articulos{" "}
//           <span className="text-break-line">guardados</span>
//         </h2>
//         <p>
//           {" "}
//           Por palabras clave:{" "}
//           {keywords.length === 0
//             ? "No tienes palabras clave"
//             : remaining > 0
//               ? `${firstTwo.join(", ")} y ${remaining} más`
//               : firstTwo.join(", ")}
//         </p>
//       </div>
//     </div>
//   );
// };
