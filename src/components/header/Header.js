import React from "react";

const Header = (props) => {
  return (
    <div className="header">
      <img
        alt=""
        src="/IMG/question-mark.svg"
        onClick={() =>
          (window.location.href =
            "https://www.cnet.com/how-to/wordle-explained-everything-you-need-to-know-about-the-viral-word-game/")
        }
      />
      <h1>WORDSLE</h1>
      <img
        alt=""
        src="/IMG/settings.svg"
        className="btn-settings"
        onClick={() => props.onSettings(true)}
      />
    </div>
  );
};

export default Header;
