import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 h-full min-h-0">
        <Sidebar />

        <div className="flex flex-col flex-1 gap-4 p-8 bg-[#F7F7F7] overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
