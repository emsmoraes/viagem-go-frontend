import { Header } from "@/shared/components/layout/Header";
import { Sidebar } from "@/shared/components/layout/Sidebar";

export function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 h-full min-h-0">
        <Sidebar />

        <div className="flex flex-col flex-1 gap-4 p-4 bg-[#F7F7F7] overflow-y-auto h-full">
          <h1 className="my-2 text-[24px] font-bold text-[#1D1D1D]">Dashboard</h1>
        </div>
      </div>
    </div>
  );
}
