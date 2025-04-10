import { IconType } from "react-icons/lib";

export type RoutePath = "/" | "proposals" | "costumers" | "agency";

export interface Route {
  pathname: RoutePath;
  Icon: IconType;
  label: string;
}
