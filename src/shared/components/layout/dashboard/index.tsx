import { Outlet } from "react-router-dom";
import AppBar from "../../app-bar";

export const Dashboard = () => {
  return (
    <div className="block lg:flex lg:h-screen py-3">
      <AppBar />
      <div className="pr-3 w-full">
        <div className="w-full lg:h-full bg-[#F9F9F9] rounded-3xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
