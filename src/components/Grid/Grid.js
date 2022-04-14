import React from "react";
import Tile from "./Tile";

const Grid = (props) => {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <div className="guess-grid">
        {props.tiles.map((tile) => (
          <Tile
            id={tile.id}
            value={tile.value}
            key={tile.id}
            classes={tile.class}
            state={tile.state}
            done={tile.done}
          />
        ))}
      </div>
    </div>
  );
};

export default Grid;
