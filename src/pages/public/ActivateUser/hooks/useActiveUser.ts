import { ActiveUserRequest, KeyInfoResponse, SignUpService } from "@/shared/services/entities";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseActiveUserMutationResult {
  isLoadingActiveUser: boolean;
  activeUser: (key: string, data: ActiveUserRequest) => void;
}

interface UseGetUserKeyInfoMutationResult {
  isLoadingGetUserKeyInfo: boolean;
  getUserKeyInfo: (key: string) => void;
  userKeyResponse?: KeyInfoResponse;
}

interface ActiveUserProps {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

interface GetUserKeyInfoProps {
  onSuccess: (data: KeyInfoResponse) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useActiveUserMutation({ onSuccess, onError }: ActiveUserProps): UseActiveUserMutationResult {
  const { mutate, isPending, data } = useMutation<void, Error | AxiosError, { key: string; data: ActiveUserRequest }>({
    mutationFn: ({ key, data }) => SignUpService.activeUser(key, data),
    onSuccess,
    onError,
  });

  return {
    isLoadingActiveUser: isPending,
    activeUser: (key, data) => mutate({ key, data }),
  };
}

export function useGetUserKeyInfoMutation({
  onSuccess,
  onError,
}: GetUserKeyInfoProps): UseGetUserKeyInfoMutationResult {
  const { mutate, isPending, data } = useMutation<KeyInfoResponse, Error | AxiosError, string>({
    mutationFn: SignUpService.getUserKeyInfo,
    onSuccess,
    onError,
  });

  return {
    isLoadingGetUserKeyInfo: isPending,
    getUserKeyInfo: mutate,
    userKeyResponse: data,
  };
}
