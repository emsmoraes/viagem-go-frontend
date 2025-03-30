import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { CreateFlightRequest, FlightService, UpdateFlightRequest } from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateFlightMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateFlight } = useMutation<
    void,
    Error | AxiosError,
    CreateFlightRequest
  >({
    mutationFn: FlightService.createFlight,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateFlight,
    createFlight: createMutate,
  };
}

export function useUpdateFlightMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateFlight } = useMutation<
    void,
    Error | AxiosError,
    { ticketId: string; proposalId: string; data: UpdateFlightRequest }
  >({
    mutationFn: ({ ticketId, proposalId, data }) => FlightService.updateFlight(ticketId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateFlight,
    updateFlight: ({
      ticketId,
      proposalId,
      data,
    }: {
      ticketId: string;
      proposalId: string;
      data: UpdateFlightRequest;
    }) => updateMutate({ ticketId, proposalId, data }),
  };
}

export function useDeleteFlightMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteFlight } = useMutation<
    void,
    Error | AxiosError,
    { ticketId: string; proposalId: string }
  >({
    mutationFn: ({ ticketId, proposalId }) => FlightService.deleteFlight(ticketId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteFlight,
    deleteFlight: ({ ticketId, proposalId }: { ticketId: string; proposalId: string }) =>
      deleteMutate({ ticketId, proposalId }),
  };
}
