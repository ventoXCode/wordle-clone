import { useState } from "react";

const Qwerty = ({ letterStatuses }) => {
  const [keyboard, setKeyboard] = useState([
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ]);

  const handleButtonClick = (key) => {
    window.dispatchEvent(
      new KeyboardEvent("keyup", {
        key: key,
      })
    );
  };

  const getKeyColor = (letter) => {
    const status = letterStatuses[letter];
    switch (status) {
      case "correct":
        return "bg-[#538d4e]";
      case "present":
        return "bg-[#b59f3b]";
      case "absent":
        return "bg-[#3a3a3c]";
      default:
        return "bg-[#818384]";
    }
  };
  return (
    <div className="flex flex-col items-center">
      {keyboard.map((row, rowIndex) => (
        <div key={rowIndex} className="flex mb-2">
          {rowIndex === 1 && <div className="w-5 h-14"></div>}
          {rowIndex === 2 && (
            <button
              className="outline-none w-16 h-14 bg-[#818384] flex justify-center items-center mr-2 rounded cursor-pointer font-bold"
              onClick={() => handleButtonClick("Enter")}
            >
              Enter
            </button>
          )}
          {row.map((letter, index) => (
            <button
              className={`outline-none w-11 h-14 ${getKeyColor(
                letter
              )} flex justify-center items-center mr-2 rounded cursor-pointer font-bold`}
              onClick={() => handleButtonClick(letter)}
              key={index}
            >
              {letter}
            </button>
          ))}
          {rowIndex === 2 && (
            <button
              className="outline-none w-16 h-14 bg-[#818384] flex justify-center items-center rounded cursor-pointer font-bold"
              onClick={() => handleButtonClick("Backspace")}
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 0 24 24"
                width="20"
                className="game-icon"
                data-testid="icon-backspace"
              >
                <path
                  fill="white"
                  d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                ></path>
              </svg>
            </button>
          )}
          {rowIndex === 1 && <div className="w-5 h-14"></div>}
        </div>
      ))}
    </div>
  );
};

export default Qwerty;
