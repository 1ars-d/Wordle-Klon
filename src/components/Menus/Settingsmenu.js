import React from "react";
import Switch from "../UI/Switch";
import useKey from "../../hooks/use-key";
import { Link } from "react-router-dom";

export const Settingsmenu = (props) => {
   useKey("Escape", () => props.onClose(false));

   return (
      <div className="menu">
         <img alt="" src="/IMG/x.svg" onClick={() => props.onClose(false)} />
         <h4>SETTINGS</h4>
         <div className="menu-part">
            <p>Developer Mode</p>
            <Switch
               active={props.devMode}
               onClick={() => {
                  props.setDevMode(!props.devMode);
                  localStorage.setItem("WORDLE_2.0_DEV_MODE", !props.devMode);
               }}
            />
         </div>
         <div className="menu-part">
            <p>Dark Theme</p>
            <Switch
               active={props.darkTheme}
               onClick={() => {
                  props.setDarkTheme(!props.darkTheme);
                  localStorage.setItem(
                     "WORDLE_2.0_DARK_THEME",
                     !props.darkTheme
                  );
               }}
            />
         </div>
         <div className="footer">
            <span>
               <Link to="/privacy-policy">Privacy Policy</Link>
               <p>Copyright 2021-2022. All Rights Reserved.</p>
            </span>
            <span>
               <br />
               <p>Developed by Lars</p>
            </span>
         </div>
      </div>
   );
};
