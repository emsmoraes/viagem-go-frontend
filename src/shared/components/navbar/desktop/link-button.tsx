import { Route } from "@/shared/models/route.model";
import { NavLink } from "react-router-dom";

interface LinkButtonProps {
  route: Route;
}

const LinkButton = ({ route }: LinkButtonProps) => {
  const currentLinkStyle =
    "flex items-center font-[400] text-white front-semibold text-[16px] gap-2 bg-primary p-2 px-3 rounded-full duration-300";
  const linkStyle =
    "flex items-center font-[400] text-black text-[16px] gap-2 p-2 px-3 duration-200 hover:bg-gray-100 hover:opacity-80 rounded-full";

  return (
    <NavLink className={({ isActive }) => (isActive ? currentLinkStyle : linkStyle)} to={route.pathname}>
      {route.Icon && <route.Icon size={25} />}
      {route.label}
    </NavLink>
  );
};

export default LinkButton;
