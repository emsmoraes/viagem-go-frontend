import { IconType } from "react-icons/lib";

export type RoutePath = "/" | "agents" | "simulations";

export interface Route {
  pathname: RoutePath;
  Icon: IconType;
  label: string;
  description: string;
}
