import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { PassengerService } from "@/shared/services/entities/proposal-service/passenger-service/PassengerService";

interface CreateProposalPassengerRequest {
  name: string;
  proposalId: string;
  customerId?: string;
}

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

interface DeletePassengerRequest {
  id: string;
  proposalId: string;
}

export function useCreatePassengerMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreatePassenger } = useMutation<
    void,
    Error | AxiosError,
    CreateProposalPassengerRequest
  >({
    mutationFn: PassengerService.createPassenger,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreatePassenger,
    createPassenger: createMutate,
  };
}

export function useDeletePassengerMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeletePassenger } = useMutation<
    void,
    Error | AxiosError,
    DeletePassengerRequest
  >({
    mutationFn: ({ id, proposalId }) => PassengerService.deletePassenger(id, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeletePassenger,
    deletePassenger: ({ id, proposalId }: { id: string; proposalId: string }) => deleteMutate({ id, proposalId }),
  };
}
