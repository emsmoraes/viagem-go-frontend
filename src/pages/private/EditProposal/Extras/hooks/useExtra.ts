import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { CreateExtraRequest, ExtraService, UpdateExtraRequest } from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateExtraMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateExtra } = useMutation<
    void,
    Error | AxiosError,
    CreateExtraRequest
  >({
    mutationFn: ExtraService.createExtra,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateExtra,
    createExtra: createMutate,
  };
}

export function useUpdateExtraMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateExtra } = useMutation<
    void,
    Error | AxiosError,
    { extraId: string; proposalId: string; data: UpdateExtraRequest }
  >({
    mutationFn: ({ extraId, proposalId, data }) => ExtraService.updateExtra(extraId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateExtra,
    updateExtra: ({ extraId, proposalId, data }: { extraId: string; proposalId: string; data: UpdateExtraRequest }) =>
      updateMutate({ extraId, proposalId, data }),
  };
}

export function useDeleteExtraMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteExtra } = useMutation<
    void,
    Error | AxiosError,
    { extraId: string; proposalId: string }
  >({
    mutationFn: ({ extraId, proposalId }) => ExtraService.deleteExtra(extraId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteExtra,
    deleteExtra: ({ extraId, proposalId }: { extraId: string; proposalId: string }) =>
      deleteMutate({ extraId, proposalId }),
  };
}
