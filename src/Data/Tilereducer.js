import { INIT_STATE, DICTIONARY_ENGLISH, DICTIONARY_DEUTSCH } from "./DATA";

export const reducer = ({ tiles: state, errors }, action) => {
  const DICTIONARY =
    action.language.name === "English"
      ? DICTIONARY_ENGLISH
      : DICTIONARY_DEUTSCH;

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
              class: new_state[i].class + "",
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
            class: new_state[i].class + "",
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
            parseCase(
              copy[25].value +
                copy[26].value +
                copy[27].value +
                copy[28].value +
                copy[29].value,
              action.language
            )
          )
        ) {
          copy[25].class += "animation-wiggle ";
          copy[26].class += "animation-wiggle ";
          copy[27].class += "animation-wiggle ";
          copy[28].class += "animation-wiggle ";
          copy[29].class += "animation-wiggle ";
          let errors_copy = [...errors];
          const time = Date.now();
          errors_copy.push({
            show: true,
            value:
              action.language.name === "English"
                ? "Not in word list"
                : "Wort nicht in Liste",
          });
          return { tiles: copy, errors: errors_copy, create: time };
        }
        let letterCount = {};
        for (let i = 25; i < 30; i++) {
          const letter = parseCase(copy[i].value, action.language);
          if (letterCount[letter]) {
            letterCount[letter] += 1;
          } else {
            letterCount[letter] = 1;
          }
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
          copy[i].done = true;
        }
        let targetCount = {};
        for (let i = 0; i < target.length; i++) {
          const letter = target[i];
          if (targetCount[letter]) {
            targetCount[letter] += 1;
          } else {
            targetCount[letter] = 1;
          }
        }
        let hasRemovedOrange = false;
        for (let i = 25; i < 30; i++) {
          const letter = parseCase(copy[i].value, action.language);
          let hasCorrect = false;
          for (let i = 25; i < 30; i++) {
            const l = parseCase(copy[i].value, action.language);
            if (l === letter && copy[i].state === "correct") {
              hasCorrect = true;
            }
          }
          if (
            letterCount[letter] > 1 &&
            letterCount[letter] > countLetters(target, letter)
          ) {
            if (hasCorrect && copy[i].state !== "correct") {
              copy[i].state = "wrong";
            } else if (!hasRemovedOrange && !hasCorrect) {
              copy[i].state = "wrong";
              hasRemovedOrange = true;
            }
          }
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
            parseCase(
              copy[enter_empty.id - 6].value +
                copy[enter_empty.id - 5].value +
                copy[enter_empty.id - 4].value +
                copy[enter_empty.id - 3].value +
                copy[enter_empty.id - 2].value,
              action.language
            )
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
            value:
              action.language.name === "English"
                ? "Not in word list"
                : "Wort nicht in Liste",
            create: time,
          });
          return { tiles: copy, errors: errors_copy };
        }
        let letterCount = {};
        for (let i = 1; i < 6; i++) {
          const letter = parseCase(
            copy[(row - 1) * 5 - 6 + i].value,
            action.language
          );
          if (letterCount[letter]) {
            letterCount[letter] += 1;
          } else {
            letterCount[letter] = 1;
          }
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
          copy[(row - 1) * 5 - 6 + i].done = true;
        }
        let targetCount = {};
        for (let i = 0; i < target.length; i++) {
          const letter = target[i];
          if (targetCount[letter]) {
            targetCount[letter] += 1;
          } else {
            targetCount[letter] = 1;
          }
        }
        let hasRemovedOrange = false;
        for (let i = 1; i < 6; i++) {
          const letter = parseCase(
            copy[(row - 1) * 5 - 6 + i].value,
            action.language
          );
          let hasCorrect = false;
          for (let i = 1; i < 6; i++) {
            const l = parseCase(
              copy[(row - 1) * 5 - 6 + i].value,
              action.language
            );
            if (
              l === letter &&
              copy[(row - 1) * 5 - 6 + i].state === "correct"
            ) {
              hasCorrect = true;
            }
          }
          if (
            letterCount[letter] > 1 &&
            letterCount[letter] > countLetters(target, letter)
          ) {
            if (hasCorrect && copy[(row - 1) * 5 - 6 + i].state !== "correct") {
              copy[(row - 1) * 5 - 6 + i].state = "wrong";
            } else if (!hasRemovedOrange && !hasCorrect) {
              copy[(row - 1) * 5 - 6 + i].state = "wrong";
              hasRemovedOrange = true;
            }
          }
        }
        return { tiles: copy, errors };
      }
      const new_errors = [...errors];
      const time = Date.now();
      new_errors.push({
        show: true,
        value:
          action.language.name === "English"
            ? "Not enough letters"
            : "Zu wenige Buchstaben",
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

export const parseCase = (word, language) => {
  if (language.name === "Deutsch") {
    return word.toUpperCase();
  } else {
    return word.toLowerCase();
  }
};

const countLetters = (word, letter) => {
  let count = 0;
  for (let i in word) {
    if (word[i] === letter) {
      count += 1;
    }
  }
  return count;
};
