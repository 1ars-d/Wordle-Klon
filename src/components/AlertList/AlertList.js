import React from "react";
import Alert from "../UI/Alert";
import { CSSTransition } from "react-transition-group";

const AlertList = (props) => {
  if (props.alerts.length === 0) {
    return <></>;
  }

  let alerts_copy = [...props.alerts];
  alerts_copy.reverse();

  const alerts = alerts_copy.map((alert, index) => (
    <CSSTransition
      key={index}
      in={alert.show}
      timeout={300}
      classNames="alert"
      unmountOnExit
    >
      <Alert value={alert.value} onClick={() => props.onDelete(index)} />
    </CSSTransition>
  ));

  return <div className="alert-list">{alerts}</div>;
};

export default AlertList;
