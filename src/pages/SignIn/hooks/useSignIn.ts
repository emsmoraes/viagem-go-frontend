import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import type { AuthRequest, AuthResponse } from "@/shared/models";
import { AuthService } from "@/shared/services/entities/auth-service/AuthService";

interface UseSigninMutationResult {
  isLoadingSignin: boolean;
  signin: (data: AuthRequest) => void;
  response?: AuthResponse;
}

interface Props {
  onSuccess: (data: AuthResponse) => void;
  onError: (error: Error | AxiosError) => void;
}

export function useSigninMutation({ onSuccess, onError }: Props): UseSigninMutationResult {
  const { mutate, isPending, data } = useMutation<AuthResponse, Error | AxiosError, AuthRequest>({
    mutationFn: AuthService.signin,
    onSuccess,
    onError,
  });

  return {
    isLoadingSignin: isPending,
    signin: mutate,
    response: data,
  };
}
