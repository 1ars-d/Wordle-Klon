import React, { useContext } from "react";
import Switch from "../UI/Switch";
import useKey from "../../hooks/use-key";
import { Link } from "react-router-dom";
import uuid from "react-uuid";

import LanguageContext, {
  LANGUAGE_OPTIONS,
} from "../../Contexts/LanguageContext";
import Selector from "../UI/Selector/Selector";

export const Settingsmenu = (props) => {
  const { language, setLanguage } = useContext(LanguageContext);

  useKey("Escape", () => props.onClose(false));

  return (
    <div className="menu">
      <img alt="" src="/IMG/x.svg" onClick={() => props.onClose(false)} />
      <h4>{language.name === "Deutsch" ? "EINSTELLUNGEN" : "SETTINGS"}</h4>
      <div className="menu-part">
        <p>{language.name === "Deutsch" ? "Sprache" : "Language"}</p>
        <Selector
          active={language}
          setActive={setLanguage}
          options={LANGUAGE_OPTIONS}
        />
      </div>
      <div className="menu-part">
        <p>
          {language.name === "Deutsch" ? "Entwickler Modus" : "Developer Mode"}
        </p>
        <Switch
          active={props.devMode}
          onClick={() => {
            props.setDevMode(!props.devMode);
            localStorage.setItem("WORDLE_2.0_DEV_MODE", !props.devMode);
          }}
        />
      </div>
      <div className="menu-part">
        <p>{language.name === "Deutsch" ? "Nachtmodus" : "Dark Theme"}</p>
        <Switch
          active={props.darkTheme}
          onClick={() => {
            props.setDarkTheme(!props.darkTheme);
            localStorage.setItem("WORDLE_2.0_DARK_THEME", !props.darkTheme);
          }}
        />
      </div>
    </div>
  );
};
