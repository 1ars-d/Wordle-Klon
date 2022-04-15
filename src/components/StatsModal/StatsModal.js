import React from "react-dom";
import { useContext } from "react";

import { MdOutlineClose } from "react-icons/md";

import "./StatsModal.css";
import LanguageContext from "../../Contexts/LanguageContext";

const StatsModal = (props) => {
  const gamesPlayed = localStorage.getItem("WORDSLE_PLAYED");
  const wins = localStorage.getItem("WORDSLE_WINS");

  const { language } = useContext(LanguageContext);
  const isGerman = language.name === "Deutsch";

  return (
    <>
      <div className="stats-modal" style={{ background: "var(--game-end-bg)" }}>
        <MdOutlineClose onClick={props.onClose} />
        <h4>{isGerman ? "STATISTIKEN" : "STATISTICS"}</h4>
        <div className="stats">
          <div>
            <p className="value">{gamesPlayed ? gamesPlayed : "0"}</p>
            <p>{isGerman ? "Gespielt" : "Played"}</p>
          </div>
          <div>
            <p className="value">
              {wins && gamesPlayed
                ? Math.round((wins / gamesPlayed) * 100)
                : "0"}
            </p>
            <p>{isGerman ? "Gewonnen %" : "Win %"}</p>
          </div>
        </div>
      </div>
      {React.createPortal(
        <div className={"backdrop"} onClick={props.onClose}></div>,
        document.getElementById("backdrops")
      )}
    </>
  );
};

export default StatsModal;
