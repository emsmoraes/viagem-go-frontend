import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  AgencyUsersService,
  AddAgencyUserRequest,
} from "@/shared/services/entities/agency-users-service/AgencyUsersService";

interface UseAddAgencyUserMutationResult {
  isLoadingAddUser: boolean;
  addAgencyUser: (data: AddAgencyUserRequest) => void;
}

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useAddAgencyUserMutation({ onSuccess, onError }: Props): UseAddAgencyUserMutationResult {
  const { mutate, isPending } = useMutation<void, Error | AxiosError, AddAgencyUserRequest>({
    mutationFn: AgencyUsersService.addAgencyUser,
    onSuccess,
    onError,
  });

  return {
    isLoadingAddUser: isPending,
    addAgencyUser: mutate,
  };
}
