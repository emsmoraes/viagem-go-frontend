import { Route } from "../models/route.model";
import { GoHome } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { BsPhone } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";

export const routes: Route[] = [
  {
    label: "Início",
    pathname: "/",
    Icon: GoHome,
  },
  {
    label: "Propostas",
    pathname: "proposals",
    Icon: CgNotes,
  },
  {
    label: "Clientes",
    pathname: "clients",
    Icon: LuUsers,
  },
  {
    label: "Pre-atendimento",
    pathname: "pre-attendance",
    Icon: BsPhone,
  },
];
