import { Button } from "@/shared/components/ui/button";
import SearchCustomers from "./components/SearchCustomers";
import { Link, useLocation, useNavigate } from "react-router-dom";
import usePageTitle from "@/shared/hooks/usePageTitle";
import clsx from "clsx";
import { IoAddCircleOutline } from "react-icons/io5";
import { useCustomersQuery } from "./hooks/useCustomer";
import Skeletons from "@/shared/components/Skeletons";
import CustomerItem from "./components/CustomerItem";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/shared/components/ui/pagination";

export function Customers() {
  const navigate = useNavigate();
  const { label } = usePageTitle();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";
  const pageValue = Number(searchParams.get("page")) || 1;

  const { customers, totalPages, isLoadingCustomers, isErrorCustomers, errorCustomers } = useCustomersQuery({
    search: searchValue,
    page: pageValue,
  });

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`?${searchParams.toString()}`);
  };

  console.log(customers);

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

      <div className={clsx("mt-4 flex-1 overflow-y-auto pb-6", totalPages > 1 && "lg:mr-4 lg:pr-4")}>
        <h1 className="mb-4 pt-3 text-xl font-medium">{label}</h1>

        {isLoadingCustomers && (
          <div className="flex-1 overflow-y-auto pb-6">
            <Skeletons
              itemCount={10}
              containerClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              cardClassName="w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 h-[300px]"
            />
          </div>
        )}

        {isErrorCustomers && <p>Erro ao carregar: {errorCustomers?.message}</p>}

        <div className="text-muted-foreground mt-4 grid grid-cols-5 gap-2 px-4 text-sm font-semibold">
          <span>Cliente</span>
          <span>Email</span>
          <span>Telefone</span>
          <span>Data de criação</span>
          <span>Ações</span>
        </div>

        {customers?.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {customers.map((customer) => (
              <CustomerItem key={customer.id} customer={customer} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination className="mt-4">
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink isActive={pageNumber === pageValue} onClick={() => handlePageChange(pageNumber)}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
