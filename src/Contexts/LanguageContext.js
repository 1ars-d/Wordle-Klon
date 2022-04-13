import uuid from "react-uuid";
import React from "react";
import { useEffect, useState } from "react";

const LanguageContext = React.createContext({
  language: "",
  setLanguage: (newLanguage) => {},
});

export default LanguageContext;

const LANGUAGE_OPTIONS = [
  {
    id: uuid(),
    name: "Deutsch",
  },
  {
    id: uuid(),
    name: "English",
  },
];

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("WORDLE_LANG")
      ? localStorage.getItem("WORDLE_LANG")
      : LANGUAGE_OPTIONS[0]
  );

  useEffect(() => {
    localStorage.setItem("WORDLE_LANG", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
