import { ForgotPasswordService } from "@/shared/services/entities";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseUpdatePasswordMutationResult {
  isLoadingUpdatePassword: boolean;
  updatePassword: (key: string, password: string, passwordConfirm: string) => void;
}

interface UpdatePasswordProps {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUpdatePasswordMutation({
  onSuccess,
  onError,
}: UpdatePasswordProps): UseUpdatePasswordMutationResult {
  const { mutate, isPending } = useMutation<
    void,
    Error | AxiosError,
    { key: string; password: string; passwordConfirm: string }
  >({
    mutationFn: ({ key, password, passwordConfirm }) =>
      ForgotPasswordService.updatePassword(key, password, passwordConfirm),
    onSuccess,
    onError,
  });

  return {
    isLoadingUpdatePassword: isPending,
    updatePassword: (key: string, password: string, passwordConfirm: string) =>
      mutate({ key, password, passwordConfirm }),
  };
}
