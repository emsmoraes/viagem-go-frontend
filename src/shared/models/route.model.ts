import { IconType } from "react-icons/lib";

export type RoutePath = "/" | "proposals" | "clients" | "agency";

export interface Route {
  pathname: RoutePath;
  Icon: IconType;
  label: string;
}
