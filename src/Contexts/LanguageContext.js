import uuid from "react-uuid";
import React from "react";
import { useEffect, useState } from "react";

const LanguageContext = React.createContext({
  language: "",
  setLanguage: (newLanguage) => {},
});

export default LanguageContext;

export const LANGUAGE_OPTIONS = [
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
    localStorage.getItem("WORDSLE_LANG")
      ? JSON.parse(localStorage.getItem("WORDSLE_LANG"))
      : LANGUAGE_OPTIONS[0]
  );

  const setLanguageHandler = (newLanguage) => {
    localStorage.setItem("WORDSLE_LANG", JSON.stringify(newLanguage));
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language: language, setLanguage: setLanguageHandler }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
