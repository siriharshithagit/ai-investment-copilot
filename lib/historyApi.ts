export async function getHistory(symbol: string) {
  const res = await fetch(
    `/api/history?symbol=${symbol}`
  );

  const text = await res.text();

  alert(`Status: ${res.status}`);

  if (!res.ok) {
    alert(text);
    throw new Error(
      `Failed to fetch history data (${res.status})`
    );
  }

  return JSON.parse(text);
}