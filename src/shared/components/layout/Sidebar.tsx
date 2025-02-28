import { useState } from "react";
import { RxDoubleArrowRight } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

import { routes } from "@/shared/constants/links";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`flex flex-col h-[93vh] transition-all duration-300 py-4 ${isCollapsed ? "w-[3.5%]" : "w-[15%]"}`}
    >
      <nav className="flex flex-col">
        {routes.map(({ label, Icon, pathname }) => (
          <Link
            key={label}
            to={pathname}
            className={
              "flex items-center gap-2 w-full p-2 px-4 text-[14px] hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition"
            }
          >
            {Icon && <Icon size={26} />}
            {!isCollapsed && label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto p-2 flex items-center justify-center h-[50px] shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
        <button
          aria-label="Recolher menu"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full mt-4 text-center py-2 text-[14px] text-[#A7A6A6] bg-[#F7F7F7] hover:bg-[#D0D0D0] hover:text-[#585858]"
        >
          {isCollapsed ? <RxDoubleArrowRight className="w-5 h-5 mx-auto hover:text-[#585858]" /> : "Recolher"}
        </button>
      </div>
    </aside>
  );
}
