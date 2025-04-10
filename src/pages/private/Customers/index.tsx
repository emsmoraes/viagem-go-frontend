import { Button } from "@/shared/components/ui/button";
import CreateProposal from "../Proposals/components/CreateProposal";
import SearchCustomers from "./components/SearchCustomers";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "@/shared/hooks/usePageTitle";
import clsx from "clsx";
import { IoAddCircleOutline } from "react-icons/io5";

export function Customers() {
  const navigate = useNavigate();
  const { label } = usePageTitle();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";
  const pageValue = Number(searchParams.get("page")) || 1;

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between lg:pr-6">
        <SearchCustomers defaultValues={{ search: "" }} />
        <Button className="h-full max-h-full px-5 text-[16px] font-[400] [&_svg:not([class*='size-'])]:size-6" asChild>
          <Link className="flex" to={"new"}>
            <IoAddCircleOutline />
            Criar Cliente
          </Link>
        </Button>
      </div>

      {/* <div className={clsx("mt-4 flex-1 overflow-y-auto pb-6", totalPages > 1 && "lg:mr-4 lg:pr-4")}>
        <h1 className="mb-4 pt-3 text-xl font-medium">{label}</h1>
      </div> */}
    </div>
  );
}
