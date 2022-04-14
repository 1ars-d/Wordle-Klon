import React from "react";
import { Transition } from "react-transition-group";

const Key = (props) => {
  return (
    <Transition in={!props.state} timeout={1200}>
      {(state) => {
        return (
          <button
            style={{ fontSize: props.enter ? "1.1rem" : "" }}
            tabIndex="-1"
            selectable="false"
            className={`key ${props.large ? "large" : ""} ${
              state === "exited" ? props.state : ""
            }`}
            onClick={() => props.onPress(props.value)}
          >
            {props.children}
          </button>
        );
      }}
    </Transition>
  );
};

export default Key;
