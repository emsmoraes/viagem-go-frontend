import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";

interface CreateProposalPassengerRequest {
  name: string;
  proposalId: string;
  PassengerId?: string;
}

const createPassenger = async (data: CreateProposalPassengerRequest): Promise<void> => {
  try {
    await api.post("passengers", data);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

const deletePassenger = async (id: string, proposalId: string): Promise<void> => {
  try {
    await api.delete(`passengers/${id}/proposal/${proposalId}`);
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const PassengerService = {
  createPassenger,
  deletePassenger,
};
