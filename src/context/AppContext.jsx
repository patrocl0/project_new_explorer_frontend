import { createContext } from "react";

export const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userData: null,
  setUserData: () => {},
  handleOpenLoginModal: () => {},
  isAuthChecked: false,
  savedNews: null,
  setSavedNews: () => {},
});
