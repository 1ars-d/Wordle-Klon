import { INIT_STATE, DICTIONARY } from "./DATA";

export const reducer = ({ tiles: state, errors }, action) => {
  switch (action.type) {
    case "ADD_KEY":
      if (state[29].value === "") {
        const next_empty = state.find((tile) => tile.value === "");
        const index = next_empty.id - 1;
        if (index !== 0 && index % 5 === 0 && !state[index - 1].done) {
          let new_state = [...state];
          for (let i = index - 5; i < index; i++) {
            new_state[i] = {
              id: new_state[i].id,
              value: new_state[i].value,
              row: new_state[i].row,
              done: new_state[i].done,
              class: new_state[i].class + "animation-wiggle ",
            };
          }
          return { tiles: new_state, errors };
        }
        let new_state = [...state];
        new_state[index] = {
          id: next_empty.id,
          value: action.key,
          row: next_empty.row,
          done: false,
          class: next_empty.class + "animation-bounce ",
        };
        return { tiles: new_state, errors };
      } else {
        let new_state = [...state];
        for (let i = 30 - 5; i < 30; i++) {
          new_state[i] = {
            id: new_state[i].id,
            value: new_state[i].value,
            row: new_state[i].row,
            done: new_state[i].done,
            class: new_state[i].class + "animation-wiggle ",
          };
        }
        return { tiles: new_state, errors };
      }
    case "DELETE":
      let next_empty;
      let index;
      if (state[29].value === "") {
        next_empty = state.find((tile) => tile.value === "");
        index = next_empty.id - 1;
      } else {
        index = 30;
      }
      if (index === 0 || state[index - 1].done) {
        return { tiles: state, errors };
      }
      let new_state = [...state];
      new_state[index - 1] = {
        id: new_state[index - 1].id,
        value: "",
        row: new_state[index - 1].row,
        done: false,
        class: "",
      };
      return { tiles: new_state, errors };
    case "REMOVE_WIGGLE":
      return {
        tiles: state.map((item) => {
          return {
            ...item,
            class: item.class
              .split(" ")
              .filter((item) => item !== "animation-wiggle")
              .join(" "),
          };
        }),
        errors,
      };
    case "ENTER":
      const target = action.target;
      const prev = [...state];
      let enter_empty;
      let row;
      if (state[29].value === "") {
        enter_empty = state.find((tile) => tile.value === "");
        row = enter_empty.row;
      } else {
        let copy = prev.slice();
        if (
          !DICTIONARY.includes(
            (
              copy[25].value +
              copy[26].value +
              copy[27].value +
              copy[28].value +
              copy[29].value
            ).toLowerCase()
          )
        ) {
          copy[25].class += "animation-wiggle ";
          copy[26].class += "animation-wiggle ";
          copy[27].class += "animation-wiggle ";
          copy[28].class += "animation-wiggle ";
          copy[29].class += "animation-wiggle ";
          let errors_copy = [...errors];
          const time = Date.now();
          errors_copy.push({ show: true, value: "Not in word list" });
          return { tiles: copy, errors: errors_copy, create: time };
        }
        for (let i = 25; i < 30; i++) {
          const letter = copy[i].value.toLowerCase();
          if (target.includes(letter)) {
            if (target.indexOf(letter) === i - 25) {
              copy[i].state = "correct";
            } else {
              copy[i].state = "wrong-location";
              let matches = [];
              for (let j = 0; j < 5; j++) {
                if (letter === target[j]) {
                  matches.push(letter);
                } else {
                  matches.push("");
                }
              }
              for (let x = 0; x < 5; x++) {
                if (matches.indexOf(letter) === i - 25) {
                  copy[i].state = "correct";
                }
                matches[x] = "";
              }
            }
          } else {
            copy[i].state = "wrong";
          }
          copy[i].class += "animation-rotate ";
          copy[i].done = true;
        }
        return { tiles: copy, errors };
      }
      if (
        (enter_empty.id === 6 && prev[4].value !== "") ||
        (row !== 1 && enter_empty.id !== 6 && prev[row * 5 - 1].value !== "") ||
        (row !== 1 &&
          enter_empty.id !== 6 &&
          (enter_empty.id === 11 ||
            enter_empty.id === 16 ||
            enter_empty.id === 21 ||
            enter_empty.id === 26) &&
          prev[(row - 1) * 5 - 1].value !== "")
      ) {
        let copy = prev.slice();
        if (
          !DICTIONARY.includes(
            (
              copy[enter_empty.id - 6].value +
              copy[enter_empty.id - 5].value +
              copy[enter_empty.id - 4].value +
              copy[enter_empty.id - 3].value +
              copy[enter_empty.id - 2].value
            ).toLowerCase()
          )
        ) {
          copy[enter_empty.id - 2].class += "animation-wiggle ";
          copy[enter_empty.id - 3].class += "animation-wiggle ";
          copy[enter_empty.id - 4].class += "animation-wiggle ";
          copy[enter_empty.id - 5].class += "animation-wiggle ";
          copy[enter_empty.id - 6].class += "animation-wiggle ";
          let errors_copy = [...errors];
          const time = Date.now();
          errors_copy.push({
            show: true,
            value: "Not in word list",
            create: time,
          });
          return { tiles: copy, errors: errors_copy };
        }

        for (let i = 1; i < 6; i++) {
          const letter = copy[(row - 1) * 5 - 6 + i].value.toLowerCase();
          if (target.includes(letter)) {
            if (target.indexOf(letter) === i - 1) {
              copy[(row - 1) * 5 - 6 + i].state = "correct";
            } else {
              copy[(row - 1) * 5 - 6 + i].state = "wrong-location";
            }
            let matches = [];
            for (let j = 0; j < 5; j++) {
              if (letter === target[j]) {
                matches.push(letter);
              } else {
                matches.push("");
              }
            }
            for (let x = 0; x < 5; x++) {
              if (matches.indexOf(letter) === i - 1) {
                copy[(row - 1) * 5 - 6 + i].state = "correct";
              }
              matches[x] = "";
            }
          } else {
            copy[(row - 1) * 5 - 6 + i].state = "wrong";
          }
          copy[(row - 1) * 5 - 6 + i].class += "animation-rotate ";
          copy[(row - 1) * 5 - 6 + i].done = true;
        }
        return { tiles: copy, errors };
      }
      const new_errors = [...errors];
      const time = Date.now();
      new_errors.push({
        show: true,
        value: "Not enough letters",
        create: time,
      });
      return { tiles: state, errors: new_errors };
    case "RESET":
      return INIT_STATE;
    case "REMOVE_ERROR_SHOW":
      if (errors.length === 0) {
        return { tiles: state, errors };
      }
      let copy = [...errors];
      copy[action.index].show = false;
      return { tiles: state, errors: copy };
    case "REMOVE_ERROR":
      let remove_copy = [...errors];
      remove_copy.splice(action.index, 1);
      return { tiles: state, errors: remove_copy };
    default:
      return { tiles: state, errors };
  }
};
