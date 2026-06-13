"use client";

import { useState, useEffect } from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SearchBar from "@/components/SearchBar";
import StockCard from "@/components/StockCard";
import StockChart from "@/components/StockChart";

import { getStock } from "@/lib/stockApi";

const mockHistory = [
  { date: "2026-06-01", price: 250 },
  { date: "2026-06-02", price: 255 },
  { date: "2026-06-03", price: 252 },
  { date: "2026-06-04", price: 260 },
  { date: "2026-06-05", price: 258 },
  { date: "2026-06-06", price: 265 },
  { date: "2026-06-07", price: 270 },
  { date: "2026-06-08", price: 268 },
  { date: "2026-06-09", price: 275 },
  { date: "2026-06-10", price: 272 },
  { date: "2026-06-11", price: 278 },
  { date: "2026-06-12", price: 272 },
];

export default function Home() {
  const messages = [
    "Welcome Back, Investor...",
    "Your Smart Guide to Smarter Investing...",
    "Navigate Markets with Confidence...",
    "Stay Ahead of the Market...",
    "Your Investments, Simplified...",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);
  const [stock, setStock] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [range, setRange] = useState("1M");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function handleSearch(symbol: string) {
    try {
      if (!symbol.trim()) return;

      const stockData = await getStock(symbol);

      setStock(stockData);

      // use mock chart data (until API is fixed)
      setHistory(mockHistory);

    } catch (error) {
      console.error("Search Error:", error);
    }
  }

  function filterData(data: any[], range: string) {
    switch (range) {
      case "1D":
        return data.slice(-1);
      case "1W":
        return data.slice(-5);
      case "1M":
        return data.slice(-22);
      case "1Y":
        return data.slice(-252);
      default:
        return data;
    }
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            {messages[currentMessage]}
          </h2>

          {/* Search */}
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Stock Info */}
          <StockCard data={stock} />

          {/* Chart */}
          {history.length > 0 && (
            <>
              <div className="flex gap-3 mt-6 mb-4">
                {["1D", "1W", "1M", "1Y"].map((r) => (
                  <button
                    key={r}
                    className={`px-4 py-2 rounded text-white ${
                      range === r
                        ? "bg-green-600"
                        : "bg-slate-700"
                    }`}
                    onClick={() => setRange(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <StockChart
                data={filterData(history, range)}
              />
            </>
          )}

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-slate-800 text-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">
                NIFTY 50
              </h3>
              <p className="mt-2 text-slate-300">
                Market Overview
              </p>
            </div>

            <div className="bg-slate-800 text-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">
                Top Gainers
              </h3>
              <p className="mt-2 text-slate-300">
                Best Performing Stocks
              </p>
            </div>

            <div className="bg-slate-800 text-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">
                Portfolio Value
              </h3>
              <p className="mt-2 text-slate-300">
                Track Investments
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}