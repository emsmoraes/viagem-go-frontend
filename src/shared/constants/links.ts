import { BsLayoutTextSidebarReverse, BsViewList } from "react-icons/bs";
import { HiOutlineHome } from "react-icons/hi";
import { Route } from "../models/route.model";

export const routes: Route[] = [
  {
    label: "Início",
    pathname: "/",
    Icon: HiOutlineHome,
    description: "Página inicial",
  },
  {
    label: "Agentes",
    pathname: "agents",
    Icon: BsLayoutTextSidebarReverse,
    description: "Agentes de IA",
  },
  {
    label: "Simulações",
    pathname: "simulations",
    Icon: BsViewList,
    description: "Simulações de IA",
  },
];
