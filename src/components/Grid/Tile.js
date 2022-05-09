import React, { useRef, useEffect } from "react";
import { Transition } from "react-transition-group";

const getTimeout = (id) => {
  if (id === 1) {
    return 0;
  }
  if (id === 2) {
    return 200;
  }
  if (id === 3) {
    return 400;
  }
  if (id === 4) {
    return 600;
  }
  if (id === 5) {
    return 800;
  }
  if (id === 6) {
    return 0;
  }
  if (id === 7) {
    return 200;
  }
  if (id === 8) {
    return 400;
  }
  if (id === 9) {
    return 600;
  }
  if (id === 10) {
    return 800;
  }
  if (id === 11) {
    return 0;
  }
  if (id === 12) {
    return 200;
  }
  if (id === 13) {
    return 400;
  }
  if (id === 14) {
    return 600;
  }
  if (id === 15) {
    return 800;
  }
  if (id === 16) {
    return 0;
  }
  if (id === 17) {
    return 200;
  }
  if (id === 18) {
    return 400;
  }
  if (id === 19) {
    return 600;
  }
  if (id === 20) {
    return 800;
  }
  if (id === 21) {
    return 0;
  }
  if (id === 22) {
    return 200;
  }
  if (id === 23) {
    return 400;
  }
  if (id === 24) {
    return 600;
  }
  if (id === 25) {
    return 800;
  }
  if (id === 26) {
    return 0;
  }
  if (id === 27) {
    return 200;
  }
  if (id === 28) {
    return 400;
  }
  if (id === 29) {
    return 600;
  }
  if (id === 30) {
    return 800;
  }
};

const Tile = (props) => {
  const divRef = useRef();
  let first = false;

  useEffect(() => {
    divRef.current.style.animation = "reveal 0.2s ease";
    setTimeout(() => (divRef.current.style.animation = ""), 200);
    first = true;
  }, [first]);

  useEffect(() => {
    if (
      props.value !== "" &&
      !first &&
      divRef.current &&
      divRef.current.style.animation === ""
    ) {
      divRef.current.style.animation = "";
      divRef.current.style.animation = "bounce 0.15s ease";
      setTimeout(() => (divRef.current.style.animation = ""), 200);
    }
  }, [props.value]);

  let classes = `${props.classes} tile ${props.active ? "active-tile" : ""}`;
  if (props.value !== "") {
    classes += " outline-dark";
  }
  if (classes.includes("animation-wiggle")) {
    divRef.current.style.animation = "wiggle 0.4s ease";
    setTimeout(() => (divRef.current.style.animation = ""), 400);
  }

  const timeout = getTimeout(props.id);

  return (
    <Transition in={!props.done} timeout={250 + timeout}>
      {(state) => {
        if (state === "exited") {
          classes = `tile ${props.state} animation-rotate-${timeout}`;
        }
        if (state === "exiting") {
          classes = `tile animation-rotate-${timeout} tile-shadow`;
        }
        return (
          <div className={classes} ref={divRef}>
            {props.value}
          </div>
        );
      }}
    </Transition>
  );
};

export default Tile;
