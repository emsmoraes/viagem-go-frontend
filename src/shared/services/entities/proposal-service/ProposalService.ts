import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Proposal } from "@/shared/models/proposal.model";

const getProposals = async (search: string): Promise<Proposal[]> => {
  try {
    const { data: proposals } = await api.get<Proposal[]>(`proposal?search=${search}`);
    return proposals;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const ProposalService = {
  getProposals,
};
