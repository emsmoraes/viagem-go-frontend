import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { CreateInsuranceRequest, InsuranceService, UpdateInsuranceRequest } from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateInsuranceMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateInsurance } = useMutation<
    void,
    Error | AxiosError,
    CreateInsuranceRequest
  >({
    mutationFn: InsuranceService.createInsurance,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateInsurance,
    createInsurance: createMutate,
  };
}

export function useUpdateInsuranceMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateInsurance } = useMutation<
    void,
    Error | AxiosError,
    { insuranceId: string; proposalId: string; data: UpdateInsuranceRequest }
  >({
    mutationFn: ({ insuranceId, proposalId, data }) => InsuranceService.updateInsurance(insuranceId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateInsurance,
    updateInsurance: ({
      insuranceId,
      proposalId,
      data,
    }: {
      insuranceId: string;
      proposalId: string;
      data: UpdateInsuranceRequest;
    }) => updateMutate({ insuranceId, proposalId, data }),
  };
}

export function useDeleteInsuranceMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteInsurance } = useMutation<
    void,
    Error | AxiosError,
    { insuranceId: string; proposalId: string }
  >({
    mutationFn: ({ insuranceId, proposalId }) => InsuranceService.deleteInsurance(insuranceId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteInsurance,
    deleteInsurance: ({ insuranceId, proposalId }: { insuranceId: string; proposalId: string }) =>
      deleteMutate({ insuranceId, proposalId }),
  };
}
