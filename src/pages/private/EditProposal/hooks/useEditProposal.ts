import { useQuery, useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Proposal } from "@/shared/models/proposal.model";
import { ProposalService, UpdateProposalRequest } from "@/shared/services/entities/proposal-service/ProposalService";

interface UseProposalQueryResult {
  proposal: Proposal | null;
  isLoadingProposal: boolean;
  isErrorProposal: boolean;
  errorProposal: AxiosError | Error | null;
}

export function useGetProposal(proposalId: string): UseProposalQueryResult {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["proposal", proposalId],
    queryFn: () => ProposalService.getProposalById(proposalId),
    enabled: !!proposalId,
  });

  return {
    proposal: data ?? null,
    isLoadingProposal: isLoading,
    isErrorProposal: isError,
    errorProposal: error,
  };
}

interface UseUpdateProposalMutationResult {
  isLoadingUpdateProposal: boolean;
  updateProposal: (proposalId: string, data: UpdateProposalRequest) => void;
}

interface UpdateProposalProps {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUpdateProposalMutation({
  onSuccess,
  onError,
}: UpdateProposalProps): UseUpdateProposalMutationResult {
  const { mutate, isPending } = useMutation<
    void,
    Error | AxiosError,
    { proposalId: string; data: UpdateProposalRequest }
  >({
    mutationFn: ({ proposalId, data }) => ProposalService.updateProposal(proposalId, data),
    onSuccess,
    onError,
  });

  return {
    isLoadingUpdateProposal: isPending,
    updateProposal: (proposalId, data) => mutate({ proposalId, data }),
  };
}
