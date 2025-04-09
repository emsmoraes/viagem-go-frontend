import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { SummaryService, CreateSummaryRequest, UpdateSummaryRequest } from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateSummaryMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateSummary } = useMutation<
    void,
    Error | AxiosError,
    CreateSummaryRequest
  >({
    mutationFn: SummaryService.createSummary,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateSummary,
    createSummary: createMutate,
  };
}

export function useUpdateSummaryMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateSummary } = useMutation<
    void,
    Error | AxiosError,
    { summaryId: string; proposalId: string; data: UpdateSummaryRequest }
  >({
    mutationFn: ({ summaryId, proposalId, data }) => SummaryService.updateSummary(summaryId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateSummary,
    updateSummary: ({
      summaryId,
      proposalId,
      data,
    }: {
      summaryId: string;
      proposalId: string;
      data: UpdateSummaryRequest;
    }) => updateMutate({ summaryId, proposalId, data }),
  };
}

export function useDeleteSummaryMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteSummary } = useMutation<
    void,
    Error | AxiosError,
    { summaryId: string; proposalId: string }
  >({
    mutationFn: ({ summaryId, proposalId }) => SummaryService.deleteSummary(summaryId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteSummary,
    deleteSummary: ({ summaryId, proposalId }: { summaryId: string; proposalId: string }) =>
      deleteMutate({ summaryId, proposalId }),
  };
}
