import axios from "axios";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let symbol = searchParams.get("symbol");

    if (!symbol) {
      return Response.json(
        { error: "Symbol is required" },
        { status: 400 }
      );
    }

    // 🔥 FIX 1: Normalize symbol (important for Indian stocks)
    const symbolMap: Record<string, string> = {
      TCS: "TCS.BSE",
      INFY: "INFY.BSE",
      RELIANCE: "RELIANCE.BSE",
      HDFCBANK: "HDFCBANK.BSE",
    };

    const finalSymbol =
      symbolMap[symbol.toUpperCase()] || symbol.toUpperCase();

    const apiKey = process.env.ALPHA_VANTAGE_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "Missing API key" },
        { status: 500 }
      );
    }

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${finalSymbol}&apikey=${apiKey}`;

    const res = await axios.get(url);

    const data = res.data?.["Global Quote"];

    // 🔥 FIX 2: Detect API limit / empty response
    if (!data || Object.keys(data).length === 0) {
      return Response.json(
        { error: "No data found or API limit reached" },
        { status: 429 }
      );
    }

    // 🔥 FIX 3: Safe parsing
    const price = parseFloat(data["05. price"] || "0");
    const change = parseFloat(data["09. change"] || "0");
    const volume = parseInt(data["06. volume"] || "0");

    return Response.json({
      symbol: data["01. symbol"],
      price: isNaN(price) ? null : price,
      change: isNaN(change) ? null : change,
      changePercent: data["10. change percent"] || "0%",
      volume: isNaN(volume) ? null : volume,
      currency: "USD", // Alpha Vantage default
    });

  } catch (error: any) {
    return Response.json(
      {
        error: "Server error",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}