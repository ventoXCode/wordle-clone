"use client";

import { useEffect, useState } from "react";
import Guess from "./Guess";
import words from "@/words.json";
import Qwerty from "./Qwerty";

const WordleGrid = () => {
  let [rows, setRows] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [letter, setLetter] = useState(0);
  const [activeRow, setActiveRow] = useState(0);
  const [correctWord, setCorrectWord] = useState("");
  const [letterStatus, setLetterStatus] = useState(
    Array(6).fill(Array(5).fill(""))
  );
  const [gameRunning, setGameRunning] = useState(true);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [keyboardLetterStatus, setKeyboardLetterStatus] = useState<{
    [key: string]: string;
  }>({});

  const updateKeyboardLetterStatus = (newStatus) => {
    const updatedKeyboardStatus = { ...keyboardLetterStatus };
    newStatus[activeRow].forEach((status, index) => {
      const letter = rows[activeRow][index];
      if (
        status === "correct" ||
        (status === "present" && updatedKeyboardStatus[letter] !== "correct") ||
        !updatedKeyboardStatus[letter]
      ) {
        updatedKeyboardStatus[letter] = status;
      }
    });
    setKeyboardLetterStatus(updatedKeyboardStatus);
  };

  const generateNewWord = () => {
    const randomWord =
      words[Math.floor(Math.random() * words.length)].toUpperCase();
    setCorrectWord(randomWord);
    localStorage.setItem("correctWord", randomWord);
  };

  useEffect(() => {
    const storedWord = localStorage.getItem("correctWord");
    if (storedWord) {
      setCorrectWord(storedWord);
    } else {
      generateNewWord();
    }
  }, []);

  const handleKeyUp = (e: KeyboardEvent) => {
    const newRows = [...rows];
    if (gameRunning) {
      if (/^[A-Za-z]$/.test(e.key)) {
        if (letter < 5) {
          newRows[activeRow][letter] = e.key.toUpperCase();
          setRows(newRows);
          setLetter(letter + 1);
        }
      } else if (e.key === "Backspace") {
        if (letter > 0) {
          const newLetter = letter - 1;
          newRows[activeRow][newLetter] = "";

          setRows(newRows);
          setLetter(newLetter);
        }
      } else if (e.key === "Enter") {
        if (
          letter === 5 &&
          words.includes(newRows[activeRow].join("").toLowerCase())
        ) {
          const newStatus = letterStatus.map((row, rowIndex) => {
            if (rowIndex === activeRow) {
              const letterCount = {};
              let colorStatus = "";
              for (const letter of correctWord) {
                letterCount[letter] = (letterCount[letter] || 0) + 1;
              }

              const newRowStatus = row.map((status, colIndex) => {
                const currentLetter = newRows[activeRow][colIndex];
                if (currentLetter === correctWord[colIndex]) {
                  letterCount[currentLetter]--;
                  colorStatus = "correct";
                  return "correct";
                }
                return null;
              });

              return newRowStatus.map((status, colIndex) => {
                if (status === "correct") return status;

                const currentLetter = newRows[activeRow][colIndex];
                if (letterCount[currentLetter] > 0) {
                  letterCount[currentLetter]--;
                  colorStatus = "present";
                  return "present";
                }
                colorStatus = "absent";
                return "absent";
              });
            }
            return row;
          });

          setLetterStatus(newStatus);
          setLetterStatus(newStatus);
          updateKeyboardLetterStatus(newStatus);
          setActiveRow(activeRow + 1);
          setLetter(0);
          console.log(letterStatus);
          console.log();
        } else if (letter < 5) {
          setMessageColor("red");
          setMessage("Type at least 5 letters");

          setTimeout(() => {
            setMessage("");
          }, 5000);
        } else if (!words.includes(newRows[activeRow].join("").toLowerCase())) {
          setMessageColor("red");
          setMessage("Word is not in list");

          setTimeout(() => {
            setMessage("");
          }, 5000);
        }

        if (
          newRows[activeRow].join("") === localStorage.getItem("correctWord")
        ) {
          setMessageColor("green");
          setMessage(`You Won! The word was ${correctWord}`);
          setGameRunning(false);
        } else if (
          newRows[activeRow].join("") !== localStorage.getItem("correctWord") &&
          activeRow === 5
        ) {
          if (words.includes(newRows[activeRow].join("").toLowerCase())) {
            setMessageColor("red");
            setMessage(`You Lost! The word was ${correctWord}`);
            setGameRunning(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp]);

  return (
    <div className="flex flex-col items-center">
      {rows.map((row, index) => (
        <Guess key={index} row={rows[index]} status={letterStatus[index]} />
      ))}
      <p
        className={`my-4 font-bold text-2xl ${
          messageColor === "green"
            ? "text-[#538d4e]"
            : messageColor === "red"
            ? "text-red-500"
            : ""
        }`}
      >
        {message}
      </p>
      <button
        className={`${
          gameRunning ? "hidden" : "block"
        } mb-5 bg-[#538d4e] p-3 rounded-xl font-bold`}
        onClick={() => {
          window.location.reload();
          generateNewWord();
        }}
      >
        New Wordle
      </button>
      <div>
        <Qwerty letterStatuses={keyboardLetterStatus} />
      </div>
    </div>
  );
};

export default WordleGrid;
