import React from "react";
import { About } from "../About/About";
import { NewsCard } from "../NewsCard/NewsCard";
import { NewsCardList } from "../NewsCardList/NewsCardList";
import { Preloader } from "../Preloader/Preloader";

export const Main = ({ news, hasSearched, isLoading, error }) => {
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
            <NewsCardList news={news} />
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
