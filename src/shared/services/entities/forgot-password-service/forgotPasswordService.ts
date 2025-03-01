import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

const forgotPassword = async (email: string, redirectUrl: string): Promise<void> => {
  try {
    await api.post("forgot-password", { email, redirectUrl });
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const ForgotPasswordService = {
  forgotPassword,
};
