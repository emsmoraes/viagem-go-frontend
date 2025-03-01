import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type SignUpRequest = {
  email: string;
  redirectUrl: string;
  agencyId?: string;
};

const signup = async (data: SignUpRequest): Promise<void> => {
  try {
    const { agencyId, ...payload } = data;
    const requestData = agencyId ? { ...payload, agencyId } : payload;

    await api.post("users", requestData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const SignUpService = {
  signup,
};
