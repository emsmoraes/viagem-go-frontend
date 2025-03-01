import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { ForgotPasswordService } from "@/shared/services/entities";

interface UseForgotPasswordMutationResult {
  isLoadingForgotPassword: boolean;
  forgotPassword: (email: string, redirectUrl: string) => void;
}

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useForgotPasswordMutation({ onSuccess, onError }: Props): UseForgotPasswordMutationResult {
  const { mutate, isPending } = useMutation<void, Error | AxiosError, { email: string }>({
    mutationFn: ({ email }) => {
      const redirectUrl = `${window.location.origin}/reset-password`;
      return ForgotPasswordService.forgotPassword(email, redirectUrl);
    },
    onSuccess,
    onError,
  });

  return {
    isLoadingForgotPassword: isPending,
    forgotPassword: (email: string) => mutate({ email }),
  };
}
