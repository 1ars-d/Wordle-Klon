import React, { useContext } from "react";
import { Fragment } from "react/cjs/react.production.min";
import LanguageContext from "../../Contexts/LanguageContext";

const GameEnd = (props) => {
  const { language } = useContext(LanguageContext);

  let btn_class;
  let text;

  if (language.name === "English") {
    btn_class = "bg-green";
    text = "YOU WON!";
    if (!props.value) {
      text = "YOU LOST!";
      btn_class = "bg-red";
    }
  } else {
    btn_class = "bg-green";
    text = "GEWONNEN!";
    if (!props.value) {
      text = "VERLOREN!";
      btn_class = "bg-red";
    }
  }

  return (
    <Fragment>
      <div className="game-end">
        <h2>{text}</h2>
        <span>
          <p>
            {language.name === "English"
              ? "The correct word was"
              : "Das richtige Wort war"}
          </p>
          <p className="target">{props.target}.</p>
        </span>
        <button className={"btn-play " + btn_class} onClick={props.onRestart}>
          {language.name === "English" ? "Play Again" : "Nochmal Spielen"}
        </button>
      </div>
      <div className="backdrop"></div>
    </Fragment>
  );
};

export default GameEnd;
