import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-4 rounded shadow">
              NIFTY 50
            </div>

            <div className="bg-white p-4 rounded shadow">
              Top Gainers
            </div>

            <div className="bg-white p-4 rounded shadow">
              Portfolio Value
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}