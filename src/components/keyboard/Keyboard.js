import React from "react";
import Key from "./Key";

const Keyboard = (props) => {
  const tiles = [...props.tiles];
  let colors = [];
  tiles.forEach((tile) => {
    if (tile.done) {
      colors.push({ letter: tile.value, state: tile.state });
    }
  });

  let groups = [];
  const letters = [
    ["Q", "W", "E", "R", "T", "Z", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Y", "X", "C", "V", "B", "N", "M"],
  ];
  letters.forEach((list) => {
    groups.push(
      list.map((letter) => {
        const found = colors.find(
          (item) => item.letter.toLowerCase() === letter.toLowerCase()
        );
        if (found) {
          return (
            <Key value={letter} onPress={props.onKey} state={found.state}>
              {letter}
            </Key>
          );
        } else {
          return (
            <Key value={letter} onPress={props.onKey}>
              {letter}
            </Key>
          );
        }
      })
    );
  });

  return (
    <div className="keyboard">
      {groups[0]}
      <div className="space"></div>
      {groups[1]}
      <div className="space"></div>
      <Key value="enter" large onPress={props.onKey}>
        Enter
      </Key>
      {groups[2]}
      <Key value="backspace" large onPress={props.onKey}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path
            fill="var(--color-tone-1)"
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
          ></path>
        </svg>
      </Key>
    </div>
  );
};

export default Keyboard;
