import React from "react";

const Key = (props) => {
  return (
    <button
      style={{ fontSize: props.enter ? "1.1rem" : "" }}
      tabIndex="-1"
      selectable="false"
      className={`key ${props.large ? "large" : ""} ${
        props.state ? props.state : ""
      }`}
      onClick={() => props.onPress(props.value)}
    >
      {props.children}
    </button>
  );
};

export default Key;
