import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { User } from "@/shared/models";

export type UpdateUserProfileRequest = Pick<
  User,
  "name" | "phone" | "proposalThankYouMessageSubtitle" | "proposalThankYouMessageTitle"
>;

export type UpdateUserProfileResponse = User;

const updateUserProfile = async (
  userId: string,
  data: UpdateUserProfileRequest,
): Promise<UpdateUserProfileResponse> => {
  try {
    const response = await api.patch<UpdateUserProfileResponse>(`user-profile/${userId}`, data);
    return response.data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const UserProfileService = {
  updateUserProfile,
};
