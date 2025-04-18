import SearchProposals from "./components/SearchProposals";
import { useLocation, useNavigate } from "react-router-dom";
import { useProposalsQuery } from "./hooks/useProposal";
import { ProposalItem } from "./components/ProposalItem";
import usePageTitle from "@/shared/hooks/usePageTitle";
import Skeletons from "@/shared/components/Skeletons";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/shared/components/ui/pagination";
import clsx from "clsx";
import CreateProposal from "./components/CreateProposal";

export function Proposals() {
  const navigate = useNavigate();
  const { label } = usePageTitle();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";
  const pageValue = Number(searchParams.get("page")) || 1;

  const { proposals, totalPages, isLoadingProposals, isErrorProposals, errorProposals } = useProposalsQuery({
    search: searchValue,
    page: pageValue,
  });

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between lg:pr-6">
        <SearchProposals defaultValues={{ search: searchValue }} />
        <CreateProposal />
      </div>

      <div className={clsx("mt-4 flex-1 overflow-y-auto pb-6", totalPages > 1 && "lg:mr-4 lg:pr-4")}>
        <h1 className="mb-4 pt-3 text-xl font-medium">{label}</h1>

        {isLoadingProposals && (
          <div className="flex-1 overflow-y-auto pb-6">
            <Skeletons
              itemCount={10}
              containerClassName="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              cardClassName="w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-transform duration-300 h-[300px]"
            />
          </div>
        )}

        {isErrorProposals && <p>Erro ao carregar: {errorProposals?.message}</p>}

        {proposals?.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {proposals.map((proposal) => (
              <ProposalItem key={proposal.id} proposal={proposal} />
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
