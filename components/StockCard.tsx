export default function StockCard({ data }: any) {
  if (!data) return null;

  const isPositive = Number(data.change) >= 0;

  return (
    <div className="bg-white p-4 rounded shadow mt-4 text-black">
      <h2 className="text-xl font-bold">
        {data.symbol}
      </h2>

      <p>
        Price: ₹{Number(data.price).toFixed(2)}
      </p>

      <p className={isPositive ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
        {isPositive ? "▲" : "▼"} Change: {Number(data.change).toFixed(2)} ({data.changePercent})
      </p>

      <p className="text-gray-700">
        Volume: {Number(data.volume).toLocaleString()}
      </p>
    </div>
  );
}