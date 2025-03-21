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

export type UpdateUserAvatarResponse = {
  avatarUrl: string;
};

const updateUserAvatar = async (avatar: File): Promise<UpdateUserAvatarResponse> => {
  try {
    const formData = new FormData();
    formData.append("avatar", avatar);

    const response = await api.patch<UpdateUserAvatarResponse>("user-avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteUserAvatar = async (): Promise<void> => {
  try {
    await api.delete("user-avatar");
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const UserProfileService = {
  updateUserProfile,
  updateUserAvatar,
  deleteUserAvatar,
};
