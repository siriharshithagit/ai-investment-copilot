export async function getStock(symbol: string) {
  const res = await fetch(`/api/stock?symbol=${symbol}`);

  if (!res.ok) {
    throw new Error("Failed to fetch stock data");
  }

  return res.json();
}