import { UpdateUserProfileRequest, UserProfileService } from "@/shared/services/entities";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

interface UseUpdateUserProfileMutationResult {
  isLoadingUpdate: boolean;
  updateUserProfile: (params: { userId: string; data: UpdateUserProfileRequest }) => void;
}

interface Props {
  onSuccess: () => void;
  onError: (error: Error | AxiosError) => void;
}

export function useUpdateUserProfileMutation({ onSuccess, onError }: Props): UseUpdateUserProfileMutationResult {
  const { mutate, isPending } = useMutation<
    void,
    Error | AxiosError,
    { userId: string; data: UpdateUserProfileRequest }
  >({
    mutationFn: ({ userId, data }) => UserProfileService.updateUserProfile(userId, data),
    onSuccess,
    onError,
  });

  return {
    isLoadingUpdate: isPending,
    updateUserProfile: mutate,
  };
}
