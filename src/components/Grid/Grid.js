import React from "react";
import Tile from "./Tile";

const Grid = (props) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="guess-grid">
        {props.tiles.map((tile, index) => (
          <Tile
            active={
              index === 0
                ? tile.value === ""
                : index % 5 === 0
                ? tile.value === "" && props.tiles[index - 1].done
                : tile.value === "" && props.tiles[index - 1].value !== ""
            }
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
