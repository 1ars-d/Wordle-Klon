import React from "react";
import { CSSTransition } from "react-transition-group";

import classes from "./Selector.module.css";

const Selector = ({ active, setActive, options }) => {
  return <div className={classes.selector}></div>;
};

export default Selector;
