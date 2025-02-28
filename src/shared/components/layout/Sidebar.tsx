import { useState } from "react";
import { CiChat1, CiClock2, CiSettings } from "react-icons/ci";
import { FaRegBuilding, FaRegFileAlt } from "react-icons/fa";
import { FiHome, FiUsers } from "react-icons/fi";
import { LuDatabase } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxDoubleArrowRight } from "react-icons/rx";
import { SiGoogleanalytics } from "react-icons/si";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenus((prev) => (prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]));
  };

  const isActive = (button: string) => (activeButton === button ? "bg-[#E3F2FF] text-[#0A77D0]" : "text-[#585858]");

  return (
    <aside
      className={`flex flex-col h-[93vh] transition-all duration-300 py-4 ${isCollapsed ? "w-[3.5%]" : "w-[15%]"}`}
    >
      <nav className="flex flex-col">
        <button
          aria-label="Ir para Dashboard"
          className={`flex items-center gap-2 w-full p-2 px-4 text-[14px] ${isActive(
            "Dashboard",
          )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
          onClick={() => setActiveButton("Dashboard")}
        >
          <FiHome className="w-5 h-5" />
          {!isCollapsed && "Dashboard"}
        </button>

        <button
          aria-label="Gerenciar agentes"
          className={`flex items-center gap-2 w-full p-2 px-4 text-[14px] ${isActive(
            "Gerenciar agentes",
          )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
          onClick={() => setActiveButton("Gerenciar agentes")}
        >
          <CiChat1 className="w-5 h-5" />
          {!isCollapsed && "Gerenciar agentes"}
        </button>

        <button
          aria-label="Abrir simulador"
          className={`flex items-center gap-2 w-full p-2 px-4 text-[14px] ${isActive(
            "Simulador",
          )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
          onClick={() => setActiveButton("Simulador")}
        >
          <CiChat1 className="w-5 h-5" />
          {!isCollapsed && "Simulador"}
        </button>

        {/* Analytics */}
        <button
          aria-label="Abrir analytics"
          className={`flex items-center gap-2 justify-between w-full p-2 px-4 text-[14px] ${isActive(
            "Analytics",
          )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
          onClick={() => toggleSubmenu("Analytics")}
        >
          <div className="flex items-center gap-2">
            <SiGoogleanalytics className="w-5 h-5" />
            {!isCollapsed && "Analytics"}
          </div>
          {!isCollapsed && (
            <MdKeyboardArrowDown
              className={`transition-transform ${openSubmenus.includes("Analytics") ? "rotate-180" : "rotate-0"}`}
            />
          )}
        </button>
        {openSubmenus.includes("Analytics") && !isCollapsed && (
          <div className="flex flex-col pl-12">
            <button
              className={`w-full p-2 px-4 text-[14px] flex items-center gap-2 ${isActive(
                "Visão Geral",
              )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
              onClick={() => setActiveButton("Visão Geral")}
            >
              <CiClock2 className="w-5 h-5" /> Visão Geral
            </button>
            <button
              className={`w-full p-2 px-4 text-[14px] flex items-center gap-2 ${isActive(
                "Logs de Conversas",
              )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
              onClick={() => setActiveButton("Logs de Conversas")}
            >
              <FaRegFileAlt className="w-5 h-5" /> Logs de Conversas
            </button>
          </div>
        )}

        {/* Configurações */}
        <button
          aria-label="Abrir configurações"
          className={`flex items-center gap-2 justify-between w-full p-2 px-4 text-[14px] ${isActive(
            "Configurações",
          )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
          onClick={() => toggleSubmenu("Configurações")}
        >
          <div className="flex items-center gap-2">
            <CiSettings className="w-5 h-5" />
            {!isCollapsed && "Configurações"}
          </div>
          {!isCollapsed && (
            <MdKeyboardArrowDown
              className={`transition-transform ${openSubmenus.includes("Configurações") ? "rotate-180" : "rotate-0"}`}
            />
          )}
        </button>
        {openSubmenus.includes("Configurações") && !isCollapsed && (
          <div className="flex flex-col pl-12">
            <button
              className={`w-full p-2 px-4 text-[14px] flex items-center gap-2 ${isActive(
                "Dados da Empresa",
              )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
              onClick={() => setActiveButton("Dados da Empresa")}
            >
              <FaRegBuilding className="w-5 h-5" /> Dados da Empresa
            </button>
            <button
              className={`w-full p-2 px-4 text-[14px] flex items-center gap-2 ${isActive(
                "Roteamento",
              )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
              onClick={() => setActiveButton("Roteamento")}
            >
              <LuDatabase className="w-5 h-5" /> Roteamento
            </button>
            <button
              className={`w-full p-2 px-4 text-[14px] flex items-center gap-2 ${isActive(
                "Usuários",
              )} hover:bg-[#E3F2FF] hover:text-[#0A77D0] transition`}
              onClick={() => setActiveButton("Usuários")}
            >
              <FiUsers className="w-5 h-5" /> Usuários
            </button>
          </div>
        )}
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
