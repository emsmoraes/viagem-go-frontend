import { useQuery } from "@tanstack/react-query";
import { Proposal } from "@/shared/models/proposal.model";
import { ProposalService } from "@/shared/services/entities/proposal-service/ProposalService";
import type { AxiosError } from "axios";

interface UseProposalsQueryResult {
  proposals: Proposal[];
  isLoadingProposals: boolean;
  isErrorProposals: boolean;
  errorProposals: AxiosError | Error | null;
}

interface UseProposalsQueryProps {
  search: string;
}

export function useProposalsQuery({ search }: UseProposalsQueryProps): UseProposalsQueryResult {
  const { data, isLoading, isError, error } = useQuery<Proposal[], AxiosError>({
    queryKey: ["proposals", search],
    queryFn: () => ProposalService.getProposals(search),
  });

  return {
    proposals: data ?? [],
    isLoadingProposals: isLoading,
    isErrorProposals: isError,
    errorProposals: error,
  };
}
