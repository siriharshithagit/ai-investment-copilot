import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const symbol = searchParams.get("symbol");

    const apiKey = process.env.ALPHA_VANTAGE_KEY;

    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
    );

    const data = await response.json();

    console.log("Alpha Vantage Response:", data);

    if (!data["Time Series (Daily)"]) {
      return NextResponse.json(
        {
          error: "No historical data found",
          response: data,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      data["Time Series (Daily)"]
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}