import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { SignUpRequest, SignUpService } from "@/shared/services/entities";

interface UseSignupMutationResult {
  isLoadingSignup: boolean;
  signup: (data: SignUpRequest) => void;
}

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useSignupMutation({ onSuccess, onError }: Props): UseSignupMutationResult {
  const { mutate, isPending } = useMutation<void, Error | AxiosError, SignUpRequest>({
    mutationFn: SignUpService.signup,
    onSuccess,
    onError,
  });

  return {
    isLoadingSignup: isPending,
    signup: mutate,
  };
}
