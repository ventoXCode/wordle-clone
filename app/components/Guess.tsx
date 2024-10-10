"use client";

import { useState, useEffect } from "react";

const Guess = ({ row, status }) => {
  const [word, setWord] = useState(["", "", "", "", ""]);

  return (
    <div className={`flex gap-2 mt-2`}>
      {word.map((item, index) => (
        <div
          key={index}
          className={`w-14 h-14 bg-[#121213] border-2 border-[#3a3a3c] flex items-center justify-center text-white text-2xl font-bold
            ${
              status[index] === "correct"
                ? "bg-[#538d4e] border-[#538d4e]"
                : status[index] === "present"
                ? "bg-[#b59f3b] border-[#b59f3b]"
                : status[index] === "absent"
                ? "bg-[#3a3a3c]"
                : ""
            }`}
        >
          {row[index]}
        </div>
      ))}
    </div>
  );
};

export default Guess;
