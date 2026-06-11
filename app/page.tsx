"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const messages = [
    "Welcome Back, Investor...",
    "Your Smart Guide to Smarter Investing...",
    "Navigate Markets with Confidence...",
    "Stay Ahead of the Market...",
    "Your Investments, Simplified...",

  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000); // changes every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-200 min-h-screen">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-black">
            {messages[currentMessage]}
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-500 p-4 rounded shadow">
              NIFTY 50
            </div>

            <div className="bg-gray-500 p-4 rounded shadow">
              Top Gainers
            </div>

            <div className="bg-gray-500 p-4 rounded shadow">
              Portfolio Value
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}