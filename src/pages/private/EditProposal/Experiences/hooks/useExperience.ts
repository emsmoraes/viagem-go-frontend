import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { CreateExperienceRequest, ExperienceService, UpdateExperienceRequest } from "@/shared/services/entities";

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useCreateExperienceMutation({ onSuccess, onError }: Props) {
  const { mutate: createMutate, isPending: isLoadingCreateExperience } = useMutation<
    void,
    Error | AxiosError,
    CreateExperienceRequest
  >({
    mutationFn: ExperienceService.createExperience,
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingCreateExperience,
    createExperience: createMutate,
  };
}

export function useUpdateExperienceMutation({ onSuccess, onError }: Props) {
  const { mutate: updateMutate, isPending: isLoadingUpdateExperience } = useMutation<
    void,
    Error | AxiosError,
    { experienceId: string; proposalId: string; data: UpdateExperienceRequest }
  >({
    mutationFn: ({ experienceId, proposalId, data }) =>
      ExperienceService.updateExperience(experienceId, proposalId, data),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingUpdateExperience,
    updateExperience: ({
      experienceId,
      proposalId,
      data,
    }: {
      experienceId: string;
      proposalId: string;
      data: UpdateExperienceRequest;
    }) => updateMutate({ experienceId, proposalId, data }),
  };
}

export function useDeleteExperienceMutation({ onSuccess, onError }: Props) {
  const { mutate: deleteMutate, isPending: isLoadingDeleteExperience } = useMutation<
    void,
    Error | AxiosError,
    { experienceId: string; proposalId: string }
  >({
    mutationFn: ({ experienceId, proposalId }) => ExperienceService.deleteExperience(experienceId, proposalId),
    onSuccess,
    onError: (error) => {
      const message = error instanceof ApiException ? error.message : "Erro desconhecido";
      onError(new Error(message));
    },
  });

  return {
    isLoadingDeleteExperience,
    deleteExperience: ({ experienceId, proposalId }: { experienceId: string; proposalId: string }) =>
      deleteMutate({ experienceId, proposalId }),
  };
}
