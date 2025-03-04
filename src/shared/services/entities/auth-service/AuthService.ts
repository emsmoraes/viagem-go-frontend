import type { AuthRequest, AuthResponse } from "@/shared/models";
import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

const signin = async (data: AuthRequest): Promise<AuthResponse> => {
  try {
    const { data: authentication } = await api.post<AuthResponse>("auth/login", data);
    return authentication;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const AuthService = {
  signin,
};
