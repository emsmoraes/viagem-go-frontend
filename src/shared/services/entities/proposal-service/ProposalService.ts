import api from "@/shared/services/axios/api";
import { ApiException } from "@/shared/services/api-exception/ApiException";
import { Proposal } from "@/shared/models/proposal.model";

interface GetProposalsResponse {
  proposals: Proposal[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface CreateProposalRequest {
  title: string;
}

export interface CreateProposalResponse extends Proposal {}

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

const createProposal = async (proposal: CreateProposalRequest): Promise<CreateProposalResponse> => {
  try {
    const { data } = await api.post<CreateProposalResponse>("proposal", proposal);
    return data;
  } catch (error) {
    throw new ApiException(error instanceof Error ? error.message : "Erro desconhecido");
  }
};

export const ProposalService = {
  getProposals,
  createProposal,
};
