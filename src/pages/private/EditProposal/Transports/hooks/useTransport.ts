import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { CreateTransportRequest, TransportService, UpdateTransportRequest } from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateTransportMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateTransport } = useMutation<
    void,
    Error | AxiosError,
    CreateTransportRequest
  >({
    mutationFn: TransportService.createTransport,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateTransport,
    createTransport: createMutate,
  };
}

export function useUpdateTransportMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateTransport } = useMutation<
    void,
    Error | AxiosError,
    { transportId: string; proposalId: string; data: UpdateTransportRequest }
  >({
    mutationFn: ({ transportId, proposalId, data }) => TransportService.updateTransport(transportId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateTransport,
    updateTransport: ({
      transportId,
      proposalId,
      data,
    }: {
      transportId: string;
      proposalId: string;
      data: UpdateTransportRequest;
    }) => updateMutate({ transportId, proposalId, data }),
  };
}

export function useDeleteTransportMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteTransport } = useMutation<
    void,
    Error | AxiosError,
    { transportId: string; proposalId: string }
  >({
    mutationFn: ({ transportId, proposalId }) => TransportService.deleteTransport(transportId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteTransport,
    deleteTransport: ({ transportId, proposalId }: { transportId: string; proposalId: string }) =>
      deleteMutate({ transportId, proposalId }),
  };
}
