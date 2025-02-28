import { IconType } from "react-icons/lib";

export type RoutePath = "/" | "proposals" | "clients" | "pre-attendance";

export interface Route {
  pathname: RoutePath;
  Icon: IconType;
  label: string;
}
