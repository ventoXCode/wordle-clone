"use client";

import { useState } from "react";
import Guess from "./components/Guess";
import Qwerty from "./components/Qwerty";
import WordleGrid from "./components/WordleGrid";

export default function Home() {
  return (
    <div className="flex h-screen w-screen bg-[#121213] flex-col items-center p-3">
      <h1 className="text-white text-4xl font-bold mb-2">Wordle</h1>
      <WordleGrid />
    </div>
  );
}
