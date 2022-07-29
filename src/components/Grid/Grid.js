import React from "react";
import Tile from "./Tile";
import { useState, useEffect } from "react";

const Grid = (props) => {
  const [gridHeight, setGridHeight] = useState(document.body.offsetHeight - 50 - 210);

  useEffect(() => {
    setGridHeight(document.body.offsetHeight - 50 - 210);
    console.log("size set!")
  }, [window.screen.height]);

  return (
    <div className="board-container">
      <div
        className="guess-grid"
        style={{
          height: gridHeight.toString() + "px",
          width: (gridHeight * (5 / 6)).toString() + "px",
        }}
      >
        <div className="row-5">
          {props.tiles.slice(0, 5).map((tile, i) => {
            const index = i;
            return (
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
            );
          })}
        </div>
        <div className="row-5">
          {props.tiles.slice(5, 10).map((tile, i) => {
            const index = i + 5;
            return (
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
            );
          })}
        </div>
        <div className="row-5">
          {props.tiles.slice(10, 15).map((tile, i) => {
            const index = i + 10;
            return (
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
            );
          })}
        </div>
        <div className="row-5">
          {props.tiles.slice(15, 20).map((tile, i) => {
            const index = i + 15;
            return (
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
            );
          })}
        </div>
        <div className="row-5">
          {props.tiles.slice(20, 25).map((tile, i) => {
            const index = i + 20;
            return (
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
            );
          })}
        </div>
        <div className="row-5">
          {props.tiles.slice(25, 30).map((tile, i) => {
            const index = i + 25;
            return (
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Grid;
