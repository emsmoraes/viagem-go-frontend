import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import {
  CreateAccommodationRequest,
  UpdateAccommodationRequest,
  AccommodationService,
} from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateAccommodationMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateAccommodation } = useMutation<
    void,
    Error | AxiosError,
    CreateAccommodationRequest
  >({
    mutationFn: AccommodationService.createAccommodation,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateAccommodation,
    createAccommodation: createMutate,
  };
}

export function useUpdateAccommodationMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateAccommodation } = useMutation<
    void,
    Error | AxiosError,
    { accommodationId: string; proposalId: string; data: UpdateAccommodationRequest }
  >({
    mutationFn: ({ accommodationId, proposalId, data }) =>
      AccommodationService.updateAccommodation(accommodationId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateAccommodation,
    updateAccommodation: ({
      accommodationId,
      proposalId,
      data,
    }: {
      accommodationId: string;
      proposalId: string;
      data: UpdateAccommodationRequest;
    }) => updateMutate({ accommodationId, proposalId, data }),
  };
}

export function useDeleteAccommodationMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteAccommodation } = useMutation<
    void,
    Error | AxiosError,
    { accommodationId: string; proposalId: string }
  >({
    mutationFn: ({ accommodationId, proposalId }) =>
      AccommodationService.deleteAccommodation(accommodationId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteAccommodation,
    deleteAccommodation: ({ accommodationId, proposalId }: { accommodationId: string; proposalId: string }) =>
      deleteMutate({ accommodationId, proposalId }),
  };
}
