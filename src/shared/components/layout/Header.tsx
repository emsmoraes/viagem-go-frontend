import { useState, useRef, useEffect } from "react";
import { CiSettings } from "react-icons/ci";
import { LuUser } from "react-icons/lu";
import { MdKeyboardArrowDown, MdLogout } from "react-icons/md";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center h-[7vh] relative">
      <div className="w-[15%] h-full shadow-[0_4px_6px_rgba(0,0,0,0.1)] flex items-center justify-center">
        <h1 className="text-[22px] font-bold text-[var(--primary)]">ViagemGO</h1>
      </div>

      <div className="flex items-center justify-between w-[85%] px-4 relative">
        <h2 className="text-[18px] font-semibold text-[#1d1d1d]">Dashboard</h2>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="flex items-center gap-2 bg-white px-4 py-2 hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 bg-[#E3F2FF] rounded-full flex items-center justify-center">
              <LuUser className="w-5 h-5 text-[var(--primary)]" />
            </div>

            <p>João da Silva</p>
            <MdKeyboardArrowDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden">
              <button className="w-full flex gap-2 items-center text-left px-4 py-2 hover:bg-gray-100">
                <LuUser />
                Meu Perfil
              </button>
              <button className="w-full flex gap-2 items-center text-left px-3.5 py-2 hover:bg-gray-100">
                <CiSettings className="w-5 h-5" />
                Configurações
              </button>
              <button className="w-full flex gap-2 items-center text-left px-4 py-2 hover:bg-red-100 text-red-600">
                <MdLogout />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
