const BASE_URL = import.meta.env.VITE_API_URL;
// const BASE_URL = "https://newsapi.org/v2";
const NEWS_API_KEY = import.meta.env.NEWS_API_KEY;

export const searchNews = async (search) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    const from = sevenDaysAgo.toISOString().split("T")[0];
    const to = today.toISOString().split("T")[0];

    const response = await fetch(
      `${BASE_URL}/news?q=${search}&from=${from}&to=${to} `,
    );

    if (!response.ok) {
      throw new Error("Error en búsqueda");
    }

    const data = await response.json();

    return data.articles;
  } catch (error) {
    throw new Error("Error en búsqueda");
  }
};
