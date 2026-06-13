"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: any) {
  const [symbol, setSymbol] = useState("");

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 rounded w-64"
        placeholder="Enter stock (e.g. TCS, AAPL)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={() => onSearch(symbol)}
      >
        Search
      </button>
    </div>
  );
}