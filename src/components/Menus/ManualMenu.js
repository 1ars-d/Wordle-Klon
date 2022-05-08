import React, { useContext } from "react";
import useKey from "../../hooks/use-key";
import LanguageContext from "../../Contexts/LanguageContext";

const ManualMenu = (props) => {
  const { language } = useContext(LanguageContext);
  useKey("Escape", () => props.onClose(false));

  const isGerman = language.name === "Deutsch";

  return (
    <div className="menu manual">
      <img alt="" src="/IMG/x.svg" onClick={() => props.onClose()} />
      <h4>{language.name === "Deutsch" ? "ANLEITUNG" : "MANUAL"}</h4>
      <div style={{ fontSize: "1.1rem" }}>
        {language.name === "Deutsch" ? (
          <>
            <p
              style={{
                marginBottom: "10px",
              }}
            >
              Errate das <span style={{ fontWeight: "bold" }}>Wordle</span> in 6
              Versuchen.
            </p>
            <p style={{ marginBottom: "10px" }}>
              Jeder Versuch muss ein echtes fünf Buchstaben langes Wort sein.
              Clicke den "ENTER" Button zum Bestätigen.
            </p>
            <p>
              Nach jedem Versuch verändert sich die Farbe von den Kästchen, um
              zu zeigen wie nah dein Versuch war.
            </p>
          </>
        ) : (
          <>
            <p
              style={{
                marginBottom: "10px",
              }}
            >
              Guess the <span style={{ fontWeight: "bold" }}>Wordle</span> in 6
              tries.
            </p>
            <p style={{ marginBottom: "10px" }}>
              Each guess must be a valid five-letter word. Hit the enter button
              to submit.
            </p>
            <p>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </p>
          </>
        )}
        <div className={"line"}></div>
        <p style={{ fontWeight: "bold" }}>
          {language.name === "Deutsch" ? "Beispiel" : "Examples"}
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "8px" }}>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              animation: "rotate .5s ease",
              background: "var(--main-green)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
              color: "rgb(243, 243, 243)",
            }}
          >
            {isGerman ? "L" : "W"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            E
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "B" : "A"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "E" : "R"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "N" : "Y"}
          </div>
        </div>
        {isGerman ? (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Der Buchstabe <span style={{ fontWeight: "bold" }}>L</span> ist im
            Wort und an der richtigen Stelle.
          </p>
        ) : (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            The letter <span style={{ fontWeight: "bold" }}>W</span> is in the
            word and in the correct spot.
          </p>
        )}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "8px" }}>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "G" : "P"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              animation: "rotate .5s ease",
              color: "rgb(243, 243, 243)",
              background: "var(--main-orange)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "E" : "I"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "R" : "L"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "N" : "L"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "E" : "S"}
          </div>
        </div>
        {isGerman ? (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Der Buchstabe <span style={{ fontWeight: "bold" }}>E</span> ist im
            Wort aber an der falschen Stelle.
          </p>
        ) : (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            The letter <span style={{ fontWeight: "bold" }}>I</span> is in the
            word but in the wrong spot.
          </p>
        )}
        <div style={{ marginTop: "1.5rem", display: "flex", gap: "8px" }}>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "J" : "V"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            A
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "C" : "G"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              animation: "rotate .5s ease",
              height: "3rem",
              color: "rgb(243, 243, 243)",
              background: "var(--main-gray)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            {isGerman ? "K" : "U"}
          </div>
          <div
            style={{
              borderRadius: "2px",
              width: "3rem",
              height: "3rem",
              border: "1px solid gray",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "2rem",
            }}
          >
            E
          </div>
        </div>
        {isGerman ? (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            Der Buchstabe <span style={{ fontWeight: "bold" }}>K</span> ist
            nicht im Wort.
          </p>
        ) : (
          <p
            style={{
              marginTop: "10px",
            }}
          >
            The letter <span style={{ fontWeight: "bold" }}>U</span> is not in
            the word in any spot.
          </p>
        )}
      </div>
    </div>
  );
};

export default ManualMenu;
