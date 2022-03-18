import React from "react";

const Switch = (props) => {
  return (
    <div
      className={`switch ${props.active ? "bg-green" : ""}`}
      onClick={props.onClick}
    >
      <div
        className={`inner-switch ${props.active ? "switch-active" : ""}`}
      ></div>
    </div>
  );
};

export default Switch;
