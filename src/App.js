import { useState, useEffect, useReducer, useContext } from "react";
import Grid from "./components/Grid/Grid";
import Header from "./components/header/Header";
import Keyboard from "./components/keyboard/Keyboard";
import GameEnd from "./components/GameEnd/GameEnd";
import { CSSTransition } from "react-transition-group";
import AlertList from "./components/AlertList/AlertList";
import StatsModal from "./components/StatsModal/StatsModal";
import {
  INIT_END_MESSAGE_STATE,
  INIT_STATE,
  TARGET_WORDS_ENGLISH,
  TARGET_WORDS_DEUTSCH,
  DICTIONARY_DEUTSCH,
} from "./Data/DATA";

import { parseCase, reducer } from "./Data/Tilereducer";
import { Settingsmenu } from "./components/Menus/Settingsmenu";
import { useCreateKeys } from "./hooks/create-keys";
import LanguageContext from "./Contexts/LanguageContext";
import ManualMenu from "./components/Menus/ManualMenu";

function App() {
  const [restarting, setRestarting] = useState(false);
  const [hasUpdatedStorage, setHasUpdatedStorage] = useState(false);
  const [tiles, dispatchTiles] = useReducer(reducer, INIT_STATE);
  const [target, setTarget] = useState();
  const [hasEnded, setHasEnded] = useState({ ended: false, won: false });
  const [endMessage, setEndMessage] = useState(INIT_END_MESSAGE_STATE);
  const [showSettings, setShowSettings] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [devMode, setDevMode] = useState();
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [darkTheme, setDarkTheme] = useState();
  const { language } = useContext(LanguageContext);
  const TARGET_WORDS =
    language.name === "English" ? TARGET_WORDS_ENGLISH : TARGET_WORDS_DEUTSCH;

  useEffect(() => {
    const interval = setInterval(() => {
      if (tiles.errors.length > 0) {
        /* for (let i = 0; i < tiles.errors.length; i++) {
          if (Date.now() > tiles.errors[i].create + 500) {
            dispatchTiles({ type: "REMOVE_ERROR_SHOW", index: i, language });
            setTimeout(() => {
              dispatchTiles({ type: "REMOVE_ERROR", index: i, language });
            }, 200);
          }
        } */
        dispatchTiles({
          type: "REMOVE_ERROR_SHOW",
          index: 0,
          language,
        });
        setTimeout(() => {
          dispatchTiles({
            type: "REMOVE_ERROR",
            index: 0,
            language,
          });
        }, 300);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [tiles.errors]);

  useEffect(() => {
    restartGame();
  }, [language]);

  useEffect(() => {
    if (hasEnded.ended) {
      if (!hasUpdatedStorage) {
        if (hasEnded.won) {
          const wins = localStorage.getItem("WORDSLE_WINS");
          if (wins) {
            localStorage.setItem(
              "WORDSLE_WINS",
              (parseInt(wins) + 1).toString()
            );
          } else {
            localStorage.setItem("WORDSLE_WINS", "1");
          }
        }
        const played = localStorage.getItem("WORDSLE_PLAYED");
        if (played) {
          localStorage.setItem(
            "WORDSLE_PLAYED",
            (parseInt(played) + 1).toString()
          );
        } else {
          localStorage.setItem("WORDSLE_PLAYED", "1");
        }
        setHasUpdatedStorage(true);
      }
    }
  }, [hasEnded.ended]);

  useEffect(() => {
    if (hasEnded.ended) {
      return;
    }
    if (!restarting) {
      for (let i = 0; i < 7; i++) {
        const row = tiles.tiles.filter((item) => item.row === i && item.done);
        let word = "";
        row.forEach((item) => {
          word += item.value;
        });
        if (parseCase(word, language) === target) {
          setEndMessage({ won: true, target: target });
          return setTimeout(() => {
            endedHandler({ ended: true, won: true });
          }, 1400);
        }
      }
      if (tiles.tiles[29].done) {
        setEndMessage({ won: false, target: target });
        return setTimeout(() => {
          endedHandler({ ended: true, won: false });
        }, 1400);
      }
    }
  }, [tiles.tiles, target, hasEnded.ended]);

  const endedHandler = (data) => {
    console.log(restarting);
    if (!restarting) {
      setHasEnded(data);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      removeWiggle();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const stored_dev_mode = localStorage.getItem("WORDLE_2.0_DEV_MODE");
    const stored_dark_theme = localStorage.getItem("WORDLE_2.0_DARK_THEME");
    if (stored_dev_mode) {
      if (stored_dev_mode === "false") {
        setDevMode(false);
      } else {
        setDevMode(true);
      }
    } else {
      setDevMode(false);
    }
    if (stored_dark_theme) {
      if (stored_dark_theme === "false") {
        setDarkTheme(false);
      } else {
        setDarkTheme(true);
      }
    } else {
      setDarkTheme(false);
    }
    generateTarget();
  }, []);

  const keyAddHandler = (key) => {
    switch (key) {
      case "enter":
        dispatchTiles({ type: "ENTER", target: target, language });
        break;
      case "backspace":
        dispatchTiles({ type: "DELETE", language });
        break;
      default:
        if (key.toLowerCase().match(/[a-z]/i)) {
          dispatchTiles({ type: "ADD_KEY", key: key, language });
        }
    }
  };

  useCreateKeys(keyAddHandler, language.name === "Deutsch");

  const restartGame = () => {
    setRestarting(true);
    setHasUpdatedStorage(false);
    dispatchTiles({ type: "RESET", language });
    setHasEnded({ ended: false, won: false });
    generateTarget();
    setTimeout(() => {
      setEndMessage(INIT_END_MESSAGE_STATE);
      setTimeout(() => setRestarting(false), 500);
      setHasEnded({ ended: false, won: false });
    }, 1000);
  };

  const generateTarget = () => {
    const new_target =
      TARGET_WORDS[Math.floor(Math.random() * TARGET_WORDS.length)];
    if (localStorage.getItem("WORDLE_2.0_DEV_MODE") === "true") {
      console.log(`The target word is: ${new_target}`);
    }
    setTarget(new_target);
  };

  const removeWiggle = () => {
    dispatchTiles({ type: "REMOVE_WIGGLE", language });
  };
  return (
    <div className={`container ${darkTheme ? "dark-mode" : "white-mode"}`}>
      <AlertList alerts={tiles.errors} />
      <CSSTransition
        in={showSettings}
        timeout={100}
        classNames="menu"
        unmountOnExit
      >
        <Settingsmenu
          darkTheme={darkTheme}
          setDarkTheme={setDarkTheme}
          onClose={() => setShowSettings(false)}
          setDevMode={setDevMode}
          devMode={devMode}
        />
      </CSSTransition>
      <CSSTransition
        in={showManual}
        timeout={100}
        classNames="menu"
        unmountOnExit
      >
        <ManualMenu
          onClose={() => setShowManual(false)}
          setDevMode={setDevMode}
          devMode={devMode}
        />
      </CSSTransition>
      <CSSTransition
        in={hasEnded.ended && !restarting}
        timeout={300}
        classNames="game-end"
        unmountOnExit
      >
        <GameEnd
          value={endMessage.won}
          target={endMessage.target}
          onRestart={restartGame}
        />
      </CSSTransition>
      <CSSTransition
        in={showStatsModal}
        timeout={300}
        classNames="stats"
        unmountOnExit
      >
        <StatsModal onClose={() => setShowStatsModal(false)} />
      </CSSTransition>
      <Header
        darkTheme={darkTheme}
        setDarkTheme={setDarkTheme}
        onSettings={setShowSettings}
        showStats={() => setShowStatsModal(true)}
        onManual={setShowManual}
      />
      <Grid tiles={tiles.tiles} removeWiggle={removeWiggle} />
      <Keyboard onKey={keyAddHandler} tiles={tiles.tiles} />
    </div>
  );
}

export default App;
