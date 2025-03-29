import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import {
  DayByDayService,
  UpdateProposalDayByDayRequest,
} from "@/shared/services/entities/proposal-service/day-by-day-service/DayByDayService";

interface CreateProposalDayByDayRequest {
  title: string;
  proposalId: string;
  description?: string;
  departureDate?: string;
  returnDate?: string;
  images?: File[];
}

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

interface DeleteDayByDayRequest {
  id: string;
}

export function useCreateDayByDayMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateDayByDay } = useMutation<
    void,
    Error | AxiosError,
    CreateProposalDayByDayRequest
  >({
    mutationFn: DayByDayService.createProposalDayByDay,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateDayByDay,
    createDayByDay: createMutate,
  };
}

export function useUpdateDayByDayMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateDayByDay } = useMutation<
    void,
    Error | AxiosError,
    { id: string; data: UpdateProposalDayByDayRequest }
  >({
    mutationFn: ({ id, data }) => DayByDayService.updateProposalDayByDay(id, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateDayByDay,
    updateDayByDay: ({ data, id }: {id: string, data: UpdateProposalDayByDayRequest}) => updateMutate({ id, data }),
  };
}

export function useDeleteDayByDayMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteDayByDay } = useMutation<
    void,
    Error | AxiosError,
    DeleteDayByDayRequest
  >({
    mutationFn: ({ id }) => DayByDayService.deleteProposalDayByDay(id),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteDayByDay,
    deleteDayByDay: ({ id }: { id: string }) => deleteMutate({ id }),
  };
}
