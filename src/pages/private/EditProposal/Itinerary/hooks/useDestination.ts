import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import {
  CreateProposalDestinationRequest,
  DestinationService,
  UpdateProposalDestinationRequest,
} from "@/shared/services/entities/proposal-service/destination-service/DestinationService";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateDestinationMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateDestination } = useMutation<
    void,
    Error | AxiosError,
    CreateProposalDestinationRequest
  >({
    mutationFn: DestinationService.createProposalDestination,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateDestination,
    createDestination: createMutate,
  };
}

export function useUpdateDestinationMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateDestination } = useMutation<
    void,
    Error | AxiosError,
    { id: string; data: UpdateProposalDestinationRequest }
  >({
    mutationFn: ({ id, data }) => DestinationService.updateProposalDestination(id, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateDestination,
    updateDestination: ({ id, data }: { id: string; data: UpdateProposalDestinationRequest }) =>
      updateMutate({ id, data }),
  };
}

export function useDeleteDestinationMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteDestination } = useMutation<
    void,
    Error | AxiosError,
    { id: string }
  >({
    mutationFn: ({ id }) => DestinationService.deleteProposalDestination(id),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteDestination,
    deleteDestination: ({ id }: { id: string }) => deleteMutate({ id }),
  };
}
