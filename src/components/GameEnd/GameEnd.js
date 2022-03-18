import React from "react";
import { Fragment } from "react/cjs/react.production.min";

const GameEnd = (props) => {
  let btn_class = "bg-green";
  let text = "YOU WON!";
  if (!props.value) {
    text = "YOU LOST!";
    btn_class = "bg-red";
  }
  return (
    <Fragment>
      <div className="game-end">
        <h2>{text}</h2>
        <span>
          <p>The correct word was </p>
          <p className="target">{props.target}.</p>
        </span>
        <button className={"btn-play " + btn_class} onClick={props.onRestart}>
          Play Again
        </button>
      </div>
      <div className="backdrop"></div>
    </Fragment>
  );
};

export default GameEnd;
