import { getToken } from "./token";
const BASE_URL = import.meta.env.VITE_API_URL;

const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

export const getSavedArticles = () => {
  const token = getToken();

  return fetch(`${BASE_URL}/articles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const saveArticle = (articleData) => {
  const token = getToken();

  return fetch(`${BASE_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(articleData),
  }).then(checkResponse);
};

export const deleteArticle = (articleId) => {
  const token = getToken();

  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
