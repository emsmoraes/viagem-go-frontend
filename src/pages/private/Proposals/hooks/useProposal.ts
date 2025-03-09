import { useQuery } from "@tanstack/react-query";
import { Proposal } from "@/shared/models/proposal.model";
import { ProposalService } from "@/shared/services/entities/proposal-service/ProposalService";
import type { AxiosError } from "axios";

interface UseProposalsQueryResult {
  proposals: Proposal[];
  total: number;
  currentPage: number;
  totalPages: number;
  isLoadingProposals: boolean;
  isErrorProposals: boolean;
  errorProposals: AxiosError | Error | null;
}

interface UseProposalsQueryProps {
  search: string;
  page: number;
}

export function useProposalsQuery({ search, page }: UseProposalsQueryProps): UseProposalsQueryResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["proposals", search, page],
    queryFn: () => ProposalService.getProposals(search, page),
  });

  return {
    proposals: data?.proposals ?? [],
    total: data?.total ?? 0,
    currentPage: data?.currentPage ?? 1,
    totalPages: data?.totalPages ?? 1,
    isLoadingProposals: isLoading,
    isErrorProposals: isError,
    errorProposals: error,
  };
}
