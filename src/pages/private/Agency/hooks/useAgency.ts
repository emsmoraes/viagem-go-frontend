import {
  AgencyResponse,
  AgencyService,
  UpdateAgencyRequest,
} from "@/shared/services/entities/agency-service/AgencyService";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseUpdateAgencyMutationResult {
  isLoadingUpdate: boolean;
  updateAgency: (data: UpdateAgencyRequest) => void;
}

interface UseGetAgencyQueryResult {
  isLoadingAgency: boolean;
  agency: AgencyResponse | undefined;
}

interface Props {
  onSuccess: (data: AgencyResponse) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUpdateAgencyMutation({ onSuccess, onError }: Props): UseUpdateAgencyMutationResult {
  const { mutate, isPending } = useMutation<AgencyResponse, Error | AxiosError, UpdateAgencyRequest>({
    mutationFn: AgencyService.updateAgency,
    onSuccess,
    onError,
  });

  return {
    isLoadingUpdate: isPending,
    updateAgency: mutate,
  };
}

export function useGetAgencyQuery(): UseGetAgencyQueryResult {
  const { data, isLoading } = useQuery<AgencyResponse, AxiosError>({
    queryKey: ["agency"],
    queryFn: AgencyService.getAgency,
  });

  return {
    isLoadingAgency: isLoading,
    agency: data,
  };
}
