import SearchProposals from "./components/SearchProposals";
import { useLocation } from "react-router-dom";
import { useProposalsQuery } from "./hooks/useProposal";
import { ProposalItem } from "./components/ProposalItem";
import usePageTitle from "@/shared/hooks/usePageTitle";
import { Skeleton } from "@/shared/components/ui/skeleton";
import Skeletons from "@/shared/components/Skeletons";
import AirplaneLoading from "@/shared/components/AirplaneLoading";

export function Proposals() {
  const { label } = usePageTitle();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("search") || "";
  const pageValue = Number(searchParams.get("page")) || 1;

  const { proposals, totalPages, isLoadingProposals, isErrorProposals, errorProposals } = useProposalsQuery({
    search: searchValue,
    page: pageValue,
  });

  return (
    <div className="flex h-full flex-col">
      <SearchProposals defaultValues={{ search: searchValue }} />

      <h1 className="mt-7 mb-4 text-xl font-medium">{label}</h1>

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
    </div>
  );
}
