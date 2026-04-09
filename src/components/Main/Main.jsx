import "./Main.css";
import { About } from "../About/About";
import { NewsCardList } from "../NewsCardList/NewsCardList";
import { Preloader } from "../Preloader/Preloader";

export const Main = ({ news, keyword, hasSearched, isLoading, error }) => {
  return (
    <main className="main">
      <div className="main__content">
        {error ? (
          <section className="notice notice_type_error">
            <p>{error}</p>
          </section>
        ) : isLoading ? (
          <section className="notice">
            <Preloader />
          </section>
        ) : hasSearched && news.length > 0 ? (
          <section className="notice">
            <NewsCardList news={news} keyword={keyword} />
          </section>
        ) : hasSearched && news.length === 0 ? (
          <section className="notice notice_type_empty">
            <p>No se ha encontrado nada</p>
          </section>
        ) : null}

        <About />
      </div>
    </main>
  );
};
