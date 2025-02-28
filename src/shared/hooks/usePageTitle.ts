import { routes } from "@/shared/constants/links";
import { useLocation } from "react-router-dom";

const usePageTitle = () => {
  const location = useLocation().pathname;
  const currentPath = location === "/" ? "/" : location.split("/")[1];

  const currentRoute = routes.find((route) => route.pathname === currentPath);

  return currentRoute?.label || "";
};

export default usePageTitle;
