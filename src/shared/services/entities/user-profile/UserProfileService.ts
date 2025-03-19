import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { User } from "@/shared/models";

export type UpdateUserProfileRequest = Pick<
  User,
  "name" | "phone" | "proposalThankYouMessageSubtitle" | "proposalThankYouMessageTitle"
> & {};

const updateUserProfile = async (userId: string, data: UpdateUserProfileRequest): Promise<void> => {
  try {
    await api.patch(`user-profile/${userId}`, data);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const UserProfileService = {
  updateUserProfile,
};
