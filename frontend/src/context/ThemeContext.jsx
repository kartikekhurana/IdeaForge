import { createContext, useContext, useEffect, useState } from "react";
const Themecontext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkmode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkmode]);
  return (
    <Themecontext.Provider value={{ darkmode, setDarkMode }}>
      {children}
    </Themecontext.Provider>
  );
};

export const useTheme = () => useContext(Themecontext);
