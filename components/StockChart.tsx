"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface StockChartProps {
  data: {
    date: string;
    price: number;
  }[];
}

export default function StockChart({
  data,
}: StockChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg p-6 mt-6 text-white">
        No chart data available
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 mt-6 h-[400px]">
      <h3 className="text-white text-lg font-semibold mb-4">
        Stock Price History
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="date"
            tick={{ fill: "#ffffff" }}
          />

          <YAxis
            tick={{ fill: "#ffffff" }}
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}