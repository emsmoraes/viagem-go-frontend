import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { CreateCruiseRequest, CruiseService, UpdateCruiseRequest } from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateCruiseMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateCruise } = useMutation<
    void,
    Error | AxiosError,
    CreateCruiseRequest
  >({
    mutationFn: CruiseService.createCruise,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateCruise,
    createCruise: createMutate,
  };
}

export function useUpdateCruiseMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateCruise } = useMutation<
    void,
    Error | AxiosError,
    { cruiseId: string; proposalId: string; data: UpdateCruiseRequest }
  >({
    mutationFn: ({ cruiseId, proposalId, data }) => CruiseService.updateCruise(cruiseId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateCruise,
    updateCruise: ({
      cruiseId,
      proposalId,
      data,
    }: {
      cruiseId: string;
      proposalId: string;
      data: UpdateCruiseRequest;
    }) => updateMutate({ cruiseId, proposalId, data }),
  };
}

export function useDeleteCruiseMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteCruise } = useMutation<
    void,
    Error | AxiosError,
    { cruiseId: string; proposalId: string }
  >({
    mutationFn: ({ cruiseId, proposalId }) => CruiseService.deleteCruise(cruiseId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteCruise,
    deleteCruise: ({ cruiseId, proposalId }: { cruiseId: string; proposalId: string }) =>
      deleteMutate({ cruiseId, proposalId }),
  };
}
