export default function StockCard({ data }: any) {
  if (!data) return null;

  const isPositive = Number(data.change) >= 0;

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {data.symbol}
        </h2>

        <span
          className={`text-lg font-semibold ${
            isPositive
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {isPositive ? "▲" : "▼"}{" "}
          {data.changePercent}
        </span>
      </div>

      {/* Current Price */}
      <div className="mt-4">
        <p className="text-slate-400 text-sm">
          Current Price
        </p>

        <p className="text-4xl font-bold mt-1">
          ${Number(data.price).toFixed(2)}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-slate-400 text-sm">
            Change
          </p>

          <p
            className={`text-lg font-semibold ${
              isPositive
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {Number(data.change).toFixed(2)}
          </p>
        </div>

        <div className="bg-slate-700 p-4 rounded-lg">
          <p className="text-slate-400 text-sm">
            Volume
          </p>

          <p className="text-lg font-semibold">
            {Number(data.volume).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}