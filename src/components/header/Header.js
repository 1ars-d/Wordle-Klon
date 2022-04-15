import React, { useContext } from "react";
import LanguageContext from "../../Contexts/LanguageContext";

const Header = (props) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="header">
      <div className="header-link-container">
        <img
          onClick={() => props.onManual(true)}
          title={language.name === "Deutsch" ? "anleitung" : "manual"}
          alt=""
          src="/IMG/question-mark.svg"
        />
      </div>
      <h1>WORDSLE</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
        className="header-link-container"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          title={language.name === "Deutsch" ? "statistiken" : "statistics"}
          onClick={props.showStats}
        >
          <path d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z"></path>
        </svg>
        <img
          title={language.name === "Deutsch" ? "einstellungen" : "settings"}
          alt=""
          src="/IMG/settings.svg"
          className="btn-settings"
          onClick={() => props.onSettings(true)}
        />
      </div>
    </div>
  );
};

export default Header;
