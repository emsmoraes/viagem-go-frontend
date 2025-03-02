import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

const forgotPassword = async (email: string, redirectUrl: string): Promise<void> => {
  try {
    await api.post("forgot-password", { email, redirectUrl });
  } catch (error: any) {
    throw new ApiException(
      error?.response?.data?.message ?? (error instanceof Error ? error.message : "Erro desconhecido"),
    );
  }
};

const updatePassword = async (key: string, password: string, passwordConfirm: string): Promise<void> => {
  try {
    await api.patch(`forgot-password/${key}`, { password, passwordConfirm });
  } catch (error: any) {
    throw new ApiException(
      error?.response?.data?.message ?? (error instanceof Error ? error.message : "Erro desconhecido"),
    );
  }
};

export const ForgotPasswordService = {
  forgotPassword,
  updatePassword,
};
