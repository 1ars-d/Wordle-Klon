import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import ReactDOM from "react-dom";

import { CSSTransition } from "react-transition-group";

import classes from "./Selector.module.css";

const Selector = ({ active, setActive, options }) => {
  const [showOptions, setShowOptions] = useState(false);

  console.log(active, options);

  return (
    <div className={classes.selector}>
      {showOptions &&
        ReactDOM.createPortal(
          <div
            className={classes.backdrop}
            onClick={() => setShowOptions(false)}
          ></div>,
          document.getElementById("backdrops")
        )}
      <CSSTransition
        in={showOptions}
        timeout={100}
        classNames="selector"
        unmountOnExit
      >
        <div className={classes.options}>
          {options.map((option) => {
            return (
              <div
                key={option.id}
                onClick={() => {
                  setActive(option);
                  setShowOptions(false);
                }}
                className={active.id === option.id ? classes.activeblue : ""}
              >
                <p>{option.name}</p>
                {active.id === option.id && <BsCheck2 />}
              </div>
            );
          })}
        </div>
      </CSSTransition>

      <div
        className={
          classes.active + (showOptions ? " " + classes.activeActive : "")
        }
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <p>{active.name}</p>
        <MdExpandMore />
      </div>
    </div>
  );
};

export default Selector;
