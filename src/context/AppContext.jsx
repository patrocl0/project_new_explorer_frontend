import { createContext } from "react";

export const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  //   user: null,
  //   setUser: () => {},
});
