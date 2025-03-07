import { Outlet } from "react-router-dom";
import AppBar from "../../app-bar";

export const Dashboard = () => {
  return (
    <div className="flex h-screen flex-col py-0 lg:flex-row lg:py-3">
      <AppBar />
      <div className="h-full w-full pr-3 pl-3 lg:pl-0">
        <div className="h-full w-full rounded-3xl bg-transparent p-0 pt-6 lg:mt-0 lg:bg-[#F9F9F9] lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
