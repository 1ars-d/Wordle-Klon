import React, { useContext } from "react";
import LanguageContext from "../../Contexts/LanguageContext";

const Header = (props) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="header">
      <img
        onClick={() => props.onManual(true)}
        title={language.name === "Deutsch" ? "anleitung" : "manual"}
        alt=""
        src="/IMG/question-mark.svg"
      />
      <h1>WORDSLE</h1>
      <img
        title={language.name === "Deutsch" ? "einstellungen" : "settings"}
        alt=""
        src="/IMG/settings.svg"
        className="btn-settings"
        onClick={() => props.onSettings(true)}
      />
    </div>
  );
};

export default Header;
