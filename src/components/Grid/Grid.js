import React from "react";
import Tile from "./Tile";

const Grid = (props) => {
  return (
    <div className="guess-grid">
      {props.tiles.map((tile) => (
        <Tile
          value={tile.value}
          key={tile.id}
          classes={tile.class}
          state={tile.state}
          done={tile.done}
        />
      ))}
    </div>
  );
};

export default Grid;
