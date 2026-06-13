"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import StockCard from "@/components/StockCard";
import { getStock } from "@/lib/stockApi";

export default function Home() {
  // Animated messages
  const messages = [
    "Welcome Back, Investor...",
    "Your Smart Guide to Smarter Investing...",
    "Navigate Markets with Confidence...",
    "Stay Ahead of the Market...",
    "Your Investments, Simplified...",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  // Stock state
  const [stock, setStock] = useState<any>(null);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Stock search handler
  async function handleSearch(symbol: string) {
    const data = await getStock(symbol);
    setStock(data);
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {/* Animated Heading */}
          <h2 className="text-3xl font-bold text-white mb-6">
            {messages[currentMessage]}
          </h2>

          {/* Stock Search */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Stock Result */}
          <StockCard data={stock} />

          {/* Dashboard Cards */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-500 text-white p-4 rounded shadow">
              NIFTY 50
            </div>

            <div className="bg-gray-500 text-white p-4 rounded shadow">
              Top Gainers
            </div>

            <div className="bg-gray-500 text-white p-4 rounded shadow">
              Portfolio Value
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}