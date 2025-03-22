import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Agency } from "@/shared/models/agency.model";

export interface AgencyResponse extends Agency {}

export type UpdateAgencyRequest = Omit<Agency, "id" | "logoUrl" | "createdAt" | "updatedAt">;

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

const updateAgencyLogo = async (file: File): Promise<{ logoUrl: string }> => {
  try {
    const formData = new FormData();
    formData.append("logo", file);
    const { data } = await api.patch<{ logoUrl: string }>("agency-logo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deleteAgencyLogo = async (): Promise<void> => {
  try {
    await api.delete("agency-logo");
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const AgencyService = {
  getAgency,
  updateAgency,
  updateAgencyLogo,
  deleteAgencyLogo,
};
