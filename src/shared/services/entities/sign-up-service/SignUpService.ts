import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export type SignUpRequest = {
  email: string;
  redirectUrl: string;
  agencyId?: string;
};

export type ActiveUserRequest = {
  name: string;
  password: string;
  passwordConfirm: string;
};

export type KeyInfoResponse = {
  id: string;
  key: string;
  type: string;
  user: {
    email: string;
  };
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

const activeUser = async (key: string, data: ActiveUserRequest): Promise<void> => {
  try {
    await api.patch(`users/${key}`, data);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const getUserKeyInfo = async (key: string): Promise<KeyInfoResponse> => {
  try {
    const response = await api.get(`keys/${key}`);
    return response.data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const SignUpService = {
  signup,
  activeUser,
  getUserKeyInfo,
};
