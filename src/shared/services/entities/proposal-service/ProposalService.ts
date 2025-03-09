import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Proposal } from "@/shared/models/proposal.model";

interface GetProposalsResponse {
  proposals: Proposal[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const getProposals = async (search: string, page: number = 1): Promise<GetProposalsResponse> => {
  try {
    const { data } = await api.get<GetProposalsResponse>("proposal", {
      params: { search, page },
    });

    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const ProposalService = {
  getProposals,
};
