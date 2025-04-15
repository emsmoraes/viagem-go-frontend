import { IconType } from "react-icons/lib";

export type RoutePath = "/" | "proposals" | "customers" | "agency";

export interface Route {
  pathname: RoutePath;
  Icon: IconType;
  label: string;
}
