import { NavLink } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPlane,
  FaHotel,
  FaShip,
  FaCar,
  FaHeart,
  FaShieldAlt,
  FaStar,
  FaClipboardList,
} from "react-icons/fa";

function StagesNav({ proposalId }: { proposalId: string }) {
  const stages = [
    { title: "Roteiro", icon: FaMapMarkerAlt, path: `/proposals/${proposalId}/itinerary` },
    { title: "Passagem", icon: FaPlane, path: `/proposals/${proposalId}/flights` },
    { title: "Hospedagem", icon: FaHotel, path: `/proposals/${proposalId}/accommodations` },
    { title: "Cruzeiro", icon: FaShip, path: `/proposals/${proposalId}/cruise` },
    { title: "Transporte", icon: FaCar, path: `/proposals/${proposalId}/transport` },
    { title: "Experiências", icon: FaHeart, path: `/proposals/${proposalId}/experiences` },
    { title: "Seguros", icon: FaShieldAlt, path: `/proposals/${proposalId}/insurance` },
    { title: "Extras", icon: FaStar, path: `/proposals/${proposalId}/extras` },
    { title: "Resumo", icon: FaClipboardList, path: `/proposals/${proposalId}/summary` },
  ];

  return (
    <div className="flex w-full flex-wrap items-center gap-10 rounded-xl bg-white p-4 shadow-md">
      {stages.map((stage, index) => (
        <NavLink
          key={index}
          to={stage.path}
          className={({ isActive }) =>
            isActive
              ? "text-primary flex flex-col items-center"
              : "flex flex-col items-center text-gray-400 [&>div]:hidden"
          }
        >
          <stage.icon size={24} />
          <span className="mt-1 text-sm font-medium">{stage.title}</span>
          <div className="bg-primary mt-1 h-1 w-full rounded-full"></div>
        </NavLink>
      ))}
    </div>
  );
}

export default StagesNav;
