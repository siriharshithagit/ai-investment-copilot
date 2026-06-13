export async function getStock(symbol: string) {
  const res = await fetch(
    `/api/stock?symbol=${encodeURIComponent(symbol)}`
  );

  const text = await res.text();

  console.log("Stock Status:", res.status);
  console.log("Stock Response:", text);

  if (!res.ok) {
    throw new Error(
      `Stock API failed (${res.status}): ${text}`
    );
  }

  return JSON.parse(text);
}