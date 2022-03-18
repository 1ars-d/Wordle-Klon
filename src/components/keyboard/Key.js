import React from "react";

const Key = (props) => {
  return (
    <button
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
