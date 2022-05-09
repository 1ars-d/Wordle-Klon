import React from "react";

const Alert = (props) => {
  return (
    <div className="alert" onClick={props.onClick}>
      {props.value}
    </div>
  );
};

export default Alert;
