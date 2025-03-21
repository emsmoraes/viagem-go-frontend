import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Agency } from "@/shared/models/agency.model";

export interface AgencyResponse extends Agency {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAgencyRequest extends Agency {}

const getAgency = async (): Promise<AgencyResponse> => {
  try {
    const { data } = await api.get<AgencyResponse>("agencies/me");
    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const updateAgency = async (updateData: UpdateAgencyRequest): Promise<AgencyResponse> => {
  try {
    const { data } = await api.patch<AgencyResponse>("agencies/me", updateData);
    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const AgencyService = {
  getAgency,
  updateAgency,
};
