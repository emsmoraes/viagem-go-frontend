import { routes } from "@/shared/constants/links";
import LoggedUser from "../../logged-user";
import LinkButton from "./link-button";

export function Desktop() {
  return (
    <div className="hidden h-full w-[260px] flex-col bg-white px-4 pt-6 pb-7 lg:flex">
      <div className="flex-1">
        <h1 className="text-4xl font-medium text-center ">
          VIAGEM<span className="text-primary">GO</span>
        </h1>
        <div className="flex flex-col gap-4 mt-10">
          {routes.map((route) => (
            <LinkButton key={route.pathname} route={route} />
          ))}
        </div>
      </div>

      <LoggedUser />
    </div>
  );
}

export default Desktop;
