import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

export interface AddAgencyUserRequest {
  email: string;
  redirectUrl: string;
  agencyId: string;
}

const addAgencyUser = async (userData: AddAgencyUserRequest): Promise<void> => {
  try {
    await api.post("users", userData);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const AgencyUsersService = {
  addAgencyUser,
};
