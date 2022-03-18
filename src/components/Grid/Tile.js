import React, { useRef, useEffect } from "react";

const Tile = (props) => {
  const divRef = useRef();
  let first = false;

  useEffect(() => {
    divRef.current.style.animation = "reveal 0.2s ease";
    setTimeout(() => (divRef.current.style.animation = ""), 200);
    first = true;
  }, [first]);

  useEffect(() => {
    if (!first && divRef.current && divRef.current.style.animation === "") {
      divRef.current.style.animation = "";
      divRef.current.style.animation = "bounce 0.15s ease";
      setTimeout(() => (divRef.current.style.animation = ""), 200);
    }
  }, [props.value]);

  let classes = props.classes + "tile " + props.state;
  if (props.value !== "") {
    classes += " outline-dark";
  }
  if (classes.includes("animation-wiggle")) {
    divRef.current.style.animation = "wiggle 0.4s ease";
    setTimeout(() => (divRef.current.style.animation = ""), 400);
  }

  if (props.done) {
    classes = `tile animation-rotate ${props.state}`;
  }

  return (
    <div className={classes} ref={divRef}>
      {props.value}
    </div>
  );
};

export default Tile;
